using System.ComponentModel.DataAnnotations;

namespace ProyectoTalentoHumano.Models
{
    public class Vacante
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string Titulo { get; set; }

        [Required, StringLength(200)]
        public string Descripcion { get; set; }

        [Required, StringLength(100)]
        public string Departamento { get; set; }

        public string Estado { get; set; } = "Activo";

        public ICollection<Postulacion> Postulaciones { get; set; }
    }
}
