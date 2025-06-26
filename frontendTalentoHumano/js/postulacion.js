function cargarPostulaciones() {
  fetch(`${BASE_URL}/api/Postulaciones/lista`)
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.querySelector("#tablaPostulaciones tbody");
      tbody.innerHTML = "";

      data.forEach((postulacion) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                      <td>${postulacion.id}</td>
                      <td>${postulacion.candidato}</td>
                      <td>${postulacion.vacante}</td>
                      <td>${postulacion.estadoPostulacion}</td>
                      <td>
                          <button class="action-button update-button" onclick="actualizarPostulacion(${postulacion.id})">Actualizar Estado</button>
                      </td>
                  `;
        tbody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error al cargar postulaciones:", error));
}
function cargarSelectCandidatos() {
  fetch(`${BASE_URL}/api/Candidatos/lista`)
    .then((response) => response.json())
    .then((data) => {
      const select = document.getElementById("postulacionCandidato");
      select.innerHTML = '<option value="">Seleccione un candidato</option>';

      data.forEach((candidato) => {
        const option = document.createElement("option");
        option.value = candidato.id;
        option.textContent = candidato.nombreCompleto;
        select.appendChild(option);
      });
    })
    .catch((error) =>
      console.error("Error al cargar candidatos para select:", error)
    );
}
function cargarSelectVacantes() {
  fetch(`${BASE_URL}/api/Vacantes/lista`)
    .then((response) => response.json())
    .then((data) => {
      const select = document.getElementById("postulacionVacante");
      select.innerHTML = '<option value="">Seleccione una vacante</option>';

      data.forEach((vacante) => {
        const option = document.createElement("option");
        option.value = vacante.id;
        option.textContent = vacante.titulo;
        select.appendChild(option);
      });
    })
    .catch((error) =>
      console.error("Error al cargar vacantes para select:", error)
    );
}
function crearPostulacion() {
  const candidatoId = document.getElementById("postulacionCandidato").value;
  const vacanteId = document.getElementById("postulacionVacante").value;
  const observacion = document.getElementById("postulacionObservacion").value;

  if (!candidatoId || !vacanteId) {
    alert("Por favor seleccione un candidato y una vacante");
    return;
  }
  const url = `${BASE_URL}/api/Postulaciones/crear?candidatoId=${candidatoId}&vacanteId=${vacanteId}&observacionEntrevista=${encodeURIComponent(
    observacion
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
      cargarPostulaciones();
      limpiarFormularioPostulacion();
    })
    .catch((error) => console.error("Error al crear postulación:", error));
}
function actualizarPostulacion(id) {
  const nuevoEstado = prompt(
    "Ingrese el nuevo estado de la postulación (Pendiente/Aceptada/Rechazada):"
  );
  if (
    nuevoEstado &&
    ["Pendiente", "Aceptada", "Rechazada"].includes(nuevoEstado)
  ) {
    const observacion = prompt("Ingrese observaciones (opcional):");
    const url = `${BASE_URL}/api/Postulaciones/actualizar/${id}?estadoPostulacion=${encodeURIComponent(
      nuevoEstado
    )}&observacionEntrevista=${encodeURIComponent(observacion || "")}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.mensaje);
        cargarPostulaciones();
      })
      .catch((error) =>
        console.error("Error al actualizar postulación:", error)
      );
  } else {
    alert("Estado no válido. Debe ser Pendiente, Aceptada o Rechazada.");
  }
}
function limpiarFormularioPostulacion() {
  document.getElementById("postulacionCandidato").value = "";
  document.getElementById("postulacionVacante").value = "";
  document.getElementById("postulacionObservacion").value = "";
}
