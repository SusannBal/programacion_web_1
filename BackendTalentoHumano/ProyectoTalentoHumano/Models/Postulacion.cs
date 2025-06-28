using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProyectoTalentoHumano.Models
{
    public class Postulacion
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Candidato")]
        public int CandidatoId { get; set; }
        public Candidato Candidato { get; set; }

        [ForeignKey("Vacante")]
        public int VacanteId { get; set; }
        public Vacante Vacante { get; set; }

        [StringLength(200)]
        public string ObservacionEntrevista { get; set; }

        [Required]
        public string EstadoPostulacion { get; set; } = "Pendiente";

        public string Estado { get; set; } = "Activo";
    }
}
