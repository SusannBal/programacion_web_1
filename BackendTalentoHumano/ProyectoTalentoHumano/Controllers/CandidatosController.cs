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
    public class CandidatosController : ControllerBase
    {
        private readonly ProyectoTalentoHumanoContext _context;

        public CandidatosController(ProyectoTalentoHumanoContext context)
        {
            _context = context;
        }
        [HttpGet("lista")]
        public async Task<IActionResult> ObtenerCandidatos()
        {
            var candidatos = await _context.Candidatos.Where(c => c.Estado == "Activo").ToListAsync();
            return Ok(candidatos);
        }

        [HttpPost("crear")]
        public async Task<IActionResult> CrearCandidato(
            [FromQuery] string nombreCompleto, 
            [FromQuery] string correo, 
            [FromQuery] string telefono,
            [FromQuery] string educacion, 
            [FromQuery] string experiencia, 
            [FromQuery] string habilidades, 
            [FromQuery] string idiomas, 
            [FromQuery] string referencias)
        {
            if (_context.Candidatos.Any(c => c.Correo == correo && c.Estado == "Activo"))
                return BadRequest(new { mensaje = "Ya existe un candidato con ese correo." });

            var candidato = new Candidato
            {
                NombreCompleto = nombreCompleto,
                Correo = correo,
                Telefono = telefono,
                Educacion = educacion,
                Experiencia = experiencia,
                Habilidades = habilidades,
                Idiomas = idiomas,
                Referencias = referencias
            };

            await _context.Candidatos.AddAsync(candidato);
            await _context.SaveChangesAsync();
            return Ok(new { mensaje = "Candidato registrado exitosamente." });
        }

        [HttpDelete("eliminar/{id}")]
        public async Task<IActionResult> EliminarCandidato(int id)
        {
            var candidato = await _context.Candidatos.FindAsync(id);
            if (candidato == null) 
                return NotFound();

            candidato.Estado = "Borrado";
            await _context.SaveChangesAsync();
            return Ok(new { mensaje = "Candidato eliminado lógicamente." });
        }
    }
}
