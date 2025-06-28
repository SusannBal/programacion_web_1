using System.ComponentModel.DataAnnotations;

namespace ProyectoTalentoHumano.Models
{
    public class Reporte
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Tipo { get; set; }

        [Required]
        public string GeneradoPor { get; set; }

        public DateTime FechaGenerado { get; set; } = DateTime.Now;

        public string Estado { get; set; } = "Activo";
    }
}
