using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoTalentoHumano.Data;
using ProyectoTalentoHumano.Models;

namespace ProyectoTalentoHumano.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostulacionesController : ControllerBase
    {
        private readonly ProyectoTalentoHumanoContext _context;

        public PostulacionesController(ProyectoTalentoHumanoContext context)
        {
            _context = context;
        }
        [HttpGet("lista")]
        public async Task<IActionResult> ObtenerPostulaciones()
        {
            var datos = await _context.Postulaciones
                .Where(p => p.Estado == "Activo")
                .Include(p => p.Candidato)
                .Include(p => p.Vacante)
                .Select(p => new
                {
                    p.Id,
                    Candidato = p.Candidato.NombreCompleto,
                    Vacante = p.Vacante.Titulo,
                    p.EstadoPostulacion,
                    p.ObservacionEntrevista
                }).ToListAsync();

            return Ok(datos);
        }

        [HttpPost("crear")]
        public async Task<IActionResult> CrearPostulacion([FromQuery] int candidatoId, 
            [FromQuery] int vacanteId, 
            [FromQuery] string observacionEntrevista)
        {
            var postulacion = new Postulacion
            {
                CandidatoId = candidatoId,
                VacanteId = vacanteId,
                ObservacionEntrevista = observacionEntrevista,
                EstadoPostulacion = "Pendiente"
            };

            await _context.Postulaciones.AddAsync(postulacion);
            await _context.SaveChangesAsync();
            return Ok(new { mensaje = "Postulación registrada." });
        }   

        [HttpPut("actualizar/{id}")]
        public async Task<IActionResult> ActualizarPostulacion(int id, 
            [FromQuery] string estadoPostulacion, 
            [FromQuery] string observacionEntrevista)
        {
            var postulacion = await _context.Postulaciones.FindAsync(id);
            if (postulacion == null) return NotFound();

            postulacion.EstadoPostulacion = estadoPostulacion;
            postulacion.ObservacionEntrevista = observacionEntrevista;
            await _context.SaveChangesAsync();
            return Ok(new { mensaje = "Postulación actualizada." });
        }
    }
}
