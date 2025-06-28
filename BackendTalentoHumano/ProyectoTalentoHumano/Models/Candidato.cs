using System.ComponentModel.DataAnnotations;

namespace ProyectoTalentoHumano.Models
{
    public class Candidato
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string NombreCompleto { get; set; }

        [Required, EmailAddress, StringLength(100)]
        public string Correo { get; set; }

        [Required, StringLength(20)]
        public string Telefono { get; set; }

        [StringLength(300)]
        public string Educacion { get; set; }

        [StringLength(300)]
        public string Experiencia { get; set; }

        [StringLength(300)]
        public string Habilidades { get; set; }

        [StringLength(300)]
        public string Idiomas { get; set; }

        [StringLength(300)]
        public string Referencias { get; set; }

        public string Estado { get; set; } = "Activo";

        public ICollection<Postulacion> Postulaciones { get; set; }
    }
}
