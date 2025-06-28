using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProyectoTalentoHumano.Models;

namespace ProyectoTalentoHumano.Data
{
    public class ProyectoTalentoHumanoContext : DbContext
    {
        public ProyectoTalentoHumanoContext (DbContextOptions<ProyectoTalentoHumanoContext> options)
            : base(options)
        {
        }   
        public DbSet<Candidato> Candidatos { get; set; } = default!;
        public DbSet<Vacante> Vacantes { get; set; } = default!;
        public DbSet<Postulacion> Postulaciones { get; set; } = default!;
        public DbSet<Reporte> Reportes { get; set; } = default!;
    }
}
