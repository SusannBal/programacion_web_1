function cargarVacantes() {
  fetch(`${BASE_URL}/api/Vacantes/lista`)
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.querySelector("#tablaVacantes tbody");
      tbody.innerHTML = "";
      data.forEach((vacante) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                      <td>${vacante.id}</td>
                      <td>${vacante.titulo}</td>
                      <td>${vacante.departamento}</td>
                      <td>
                          <button class="action-button edit-button" onclick="editarVacante(${vacante.id})">Editar</button>
                          <button class="action-button delete-button" onclick="eliminarVacante(${vacante.id})">Eliminar</button>
                      </td>
                  `;
        tbody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error al cargar vacantes:", error));
}
function crearVacante() {
  const titulo = document.getElementById("vacanteTitulo").value;
  const descripcion = document.getElementById("vacanteDescripcion").value;
  const departamento = document.getElementById("vacanteDepartamento").value;

  const url = `${BASE_URL}/api/Vacantes/crear?titulo=${encodeURIComponent(
    titulo
  )}&descripcion=${encodeURIComponent(
    descripcion
  )}&departamento=${encodeURIComponent(departamento)}`;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.mensaje);
      cargarVacantes();
      limpiarFormularioVacante();
    })
    .catch((error) => console.error("Error al crear vacante:", error));
}
function editarVacante(id) {
  const titulo = prompt("Nuevo título:");
  const descripcion = prompt("Nueva descripción:");
  const departamento = prompt("Nuevo departamento:");

  if (titulo && descripcion && departamento) {
    const url = `${BASE_URL}/api/Vacantes/actualizar/${id}?titulo=${encodeURIComponent(
      titulo
    )}&descripcion=${encodeURIComponent(
      descripcion
    )}&departamento=${encodeURIComponent(departamento)}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.mensaje);
        cargarVacantes();
      })
      .catch((error) => console.error("Error al actualizar vacante:", error));
  } else {
    alert("Todos los campos son requeridos");
  }
}
function eliminarVacante(id) {
  if (confirm("¿Está seguro de eliminar esta vacante?")) {
    fetch(`${BASE_URL}/api/Vacantes/eliminar/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.mensaje);
        cargarVacantes();
      })
      .catch((error) => console.error("Error al eliminar vacante:", error));
  }
}
function limpiarFormularioVacante() {
  document.getElementById("vacanteTitulo").value = "";
  document.getElementById("vacanteDescripcion").value = "";
  document.getElementById("vacanteDepartamento").value = "";
}
