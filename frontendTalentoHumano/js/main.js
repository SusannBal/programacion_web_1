const BASE_URL = "https://localhost:7094";
let { jsPDF } = window.jspdf;
function openTab(tabName) {
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("active");
  }
  const tabButtons = document.getElementsByClassName("tab-button");
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }
  document.getElementById(tabName).classList.add("active");
  event.currentTarget.classList.add("active");
  switch (tabName) {
    case "candidatos":
      cargarCandidatos();
      break;
    case "postulaciones":
      cargarPostulaciones();
      cargarSelectCandidatos();
      cargarSelectVacantes();
      break;
    case "vacantes":
      cargarVacantes();
      break;
    case "reportes":
      cargarHistorialReportes();
      break;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  cargarCandidatos();
  cargarPostulaciones();
  cargarVacantes();
  cargarHistorialReportes();
  cargarSelectCandidatos();
  cargarSelectVacantes();
});
