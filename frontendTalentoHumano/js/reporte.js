function cargarHistorialReportes() {
  fetch(`${BASE_URL}/api/Reportes/historial`)
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.querySelector("#tablaReportes tbody");
      tbody.innerHTML = "";

      data.forEach((reporte) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                      <td>${reporte.id}</td>
                      <td>${reporte.tipo}</td>
                      <td>${reporte.generadoPor}</td>
                      <td>${new Date(
                        reporte.fechaGenerado
                      ).toLocaleString()}</td>
                  `;
        tbody.appendChild(row);
      });
    })
    .catch((error) =>
      console.error("Error al cargar historial de reportes:", error)
    );
}
function generarReporte() {
  const tipo = document.getElementById("reporteTipo").value;
  const generadoPor = document.getElementById("reporteGeneradoPor").value;
  if (!generadoPor) {
    alert("Por favor ingrese su nombre");
    return;
  }
  const url = `${BASE_URL}/api/Reportes/registrar?tipo=${encodeURIComponent(
    tipo
  )}&generadoPor=${encodeURIComponent(generadoPor)}`;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.mensaje);
      cargarHistorialReportes();
      document.getElementById("reporteGeneradoPor").value = "";
    })
    .catch((error) => console.error("Error al generar reporte:", error));
}
function generarPDF() {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text("Reporte de Talento Humano", 105, 20, { align: "center" });
  doc.setFontSize(12);
  doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 105, 30, {
    align: "center",
  });
  doc.setFontSize(16);
  doc.text("Candidatos", 14, 40);
  fetch(`${BASE_URL}/api/Candidatos/lista`)
    .then((response) => response.json())
    .then((data) => {
      const candidatosData = data.map((c) => [
        c.id,
        c.nombreCompleto,
        c.correo,
        c.telefono,
      ]);
      doc.autoTable({
        startY: 45,
        head: [["ID", "Nombre", "Correo", "Teléfono"]],
        body: candidatosData,
        margin: { left: 14 },
      });
      doc.setFontSize(16);
      doc.text("Vacantes", 14, doc.autoTable.previous.finalY + 20);
      return fetch(`${BASE_URL}/api/Vacantes/lista`);
    })
    .then((response) => response.json())
    .then((data) => {
      const vacantesData = data.map((v) => [
        v.id,
        v.titulo,
        v.departamento,
        v.descripcion,
      ]);
      doc.autoTable({
        startY: doc.autoTable.previous.finalY + 25,
        head: [["ID", "Título", "Departamento", "Descripción"]],
        body: vacantesData,
        margin: { left: 14 },
      });
      doc.setFontSize(16);
      doc.text("Postulaciones", 14, doc.autoTable.previous.finalY + 20);
      return fetch(`${BASE_URL}/api/Postulaciones/lista`);
    })
    .then((response) => response.json())
    .then((data) => {
      const postulacionesData = data.map((p) => [
        p.id,
        p.candidato,
        p.vacante,
        p.estadoPostulacion,
      ]);
      doc.autoTable({
        startY: doc.autoTable.previous.finalY + 25,
        head: [["ID", "Candidato", "Vacante", "Estado"]],
        body: postulacionesData,
        margin: { left: 14 },
      });
      doc.save(
        `Reporte_Talento_Humano_${new Date().toISOString().slice(0, 10)}.pdf`
      );
    })
    .catch((error) => console.error("Error al generar PDF:", error));
}
