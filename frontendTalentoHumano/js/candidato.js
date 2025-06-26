function cargarCandidatos() {
  fetch(`${BASE_URL}/api/Candidatos/lista`)
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.querySelector("#tablaCandidatos tbody");
      tbody.innerHTML = "";

      data.forEach((candidato) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                      <td>${candidato.id}</td>
                      <td>${candidato.nombreCompleto}</td>
                      <td>${candidato.correo}</td>
                      <td>${candidato.telefono}</td>
                      <td>
                          <button class="action-button delete-button" onclick="eliminarCandidato(${candidato.id})">Eliminar</button>
                      </td>
                  `;
        tbody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error al cargar candidatos:", error));
}
function crearCandidato() {
  const nombreCompleto = document.getElementById("candidatoNombre").value;
  const correo = document.getElementById("candidatoCorreo").value;
  const telefono = document.getElementById("candidatoTelefono").value;
  const educacion = document.getElementById("candidatoEducacion").value;
  const experiencia = document.getElementById("candidatoExperiencia").value;
  const habilidades = document.getElementById("candidatoHabilidades").value;
  const idiomas = document.getElementById("candidatoIdiomas").value;
  const referencias = document.getElementById("candidatoReferencias").value;

  const url = `${BASE_URL}/api/Candidatos/crear?nombreCompleto=${encodeURIComponent(
    nombreCompleto
  )}&correo=${encodeURIComponent(correo)}&telefono=${encodeURIComponent(
    telefono
  )}&educacion=${encodeURIComponent(
    educacion
  )}&experiencia=${encodeURIComponent(
    experiencia
  )}&habilidades=${encodeURIComponent(
    habilidades
  )}&idiomas=${encodeURIComponent(idiomas)}&referencias=${encodeURIComponent(
    referencias
  )}`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.mensaje);
      cargarCandidatos();
      limpiarFormularioCandidato();
    })
    .catch((error) => console.error("Error al crear candidato:", error));
}
function eliminarCandidato(id) {
  if (confirm("¿Está seguro de eliminar este candidato?")) {
    fetch(`${BASE_URL}/api/Candidatos/eliminar/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.mensaje);
        cargarCandidatos();
      })
      .catch((error) => console.error("Error al eliminar candidato:", error));
  }
}
function limpiarFormularioCandidato() {
  document.getElementById("candidatoNombre").value = "";
  document.getElementById("candidatoCorreo").value = "";
  document.getElementById("candidatoTelefono").value = "";
  document.getElementById("candidatoEducacion").value = "";
  document.getElementById("candidatoExperiencia").value = "";
  document.getElementById("candidatoHabilidades").value = "";
  document.getElementById("candidatoIdiomas").value = "";
  document.getElementById("candidatoReferencias").value = "";
}
