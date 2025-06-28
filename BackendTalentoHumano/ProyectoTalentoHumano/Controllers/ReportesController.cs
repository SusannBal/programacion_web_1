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
    public class ReportesController : ControllerBase
    {
        private readonly ProyectoTalentoHumanoContext _context;

        public ReportesController(ProyectoTalentoHumanoContext context)
        {
            _context = context;
        }
        [HttpPost("registrar")]
        public async Task<IActionResult> Registrar([FromQuery] string tipo, 
            [FromQuery] string generadoPor)
        {
            var reporte = new Reporte { Tipo = tipo, GeneradoPor = generadoPor };
            await _context.Reportes.AddAsync(reporte);
            await _context.SaveChangesAsync();
            return Ok(new { mensaje = "Reporte registrado" });
        }

        [HttpGet("historial")]
        public IActionResult Historial()
        {
            var historial = _context.Reportes.Where(r => r.Estado == "Activo").ToList();
            return Ok(historial);
        }
    }
}
