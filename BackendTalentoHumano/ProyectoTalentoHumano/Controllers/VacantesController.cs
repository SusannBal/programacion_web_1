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
    public class VacantesController : ControllerBase
    {
        private readonly ProyectoTalentoHumanoContext _context;

        public VacantesController(ProyectoTalentoHumanoContext context)
        {
            _context = context;
        }
        [HttpGet("lista")]
        public async Task<IActionResult> ObtenerVacantes()
        {
            var vacantes = await _context.Vacantes.Where(v => v.Estado == "Activo").ToListAsync();
            return Ok(vacantes);
        }

        [HttpPost("crear")]
        public async Task<IActionResult> CrearVacante([FromQuery] string titulo, 
            [FromQuery] string descripcion, 
            [FromQuery] string departamento)
        {
            if (_context.Vacantes.Any(v => v.Titulo == titulo && v.Estado == "Activo"))
                return BadRequest(new { mensaje = "Ya existe una vacante con ese título." });

            var vacante = new Vacante { Titulo = titulo, Descripcion = descripcion, Departamento = departamento };
            await _context.Vacantes.AddAsync(vacante);
            await _context.SaveChangesAsync();
            return Ok(new { mensaje = "Vacante creada correctamente." });
        }

        [HttpPut("actualizar/{id}")]
        public async Task<IActionResult> ActualizarVacante(int id, 
            [FromQuery] string titulo,
            [FromQuery] string descripcion,
            [FromQuery] string departamento)
        {
            var vacante = await _context.Vacantes.FindAsync(id);
            if (vacante == null) return NotFound();

            vacante.Titulo = titulo;
            vacante.Descripcion = descripcion;
            vacante.Departamento = departamento;
            await _context.SaveChangesAsync();
            return Ok(new { mensaje = "Vacante actualizada." });
        }

        [HttpDelete("eliminar/{id}")]
        public async Task<IActionResult> EliminarVacante(int id)
        {
            var vacante = await _context.Vacantes.FindAsync(id);
            if (vacante == null) return NotFound();

            vacante.Estado = "Borrado";
            await _context.SaveChangesAsync();
            return Ok(new { mensaje = "Vacante eliminada lógicamente." });
        }

    }

}
