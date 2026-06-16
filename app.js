// Modelos BMW
var servicios = [
  { id: 1, nombre: "BMW Serie 3", categoria: "Sedan", precio: "$890,000", motor: "2.0L Turbo", img: "BMW Serie 3.jpg" },
  { id: 2, nombre: "BMW Serie 5", categoria: "Sedan", precio: "$1,250,000", motor: "3.0L", img: "BMW Serie 5.jpg" },
  { id: 3, nombre: "BMW X5", categoria: "SUV", precio: "$1,450,000", motor: "3.0L xDrive", img: "bmw-x5-l-01.jpg" },
  { id: 4, nombre: "BMW X3", categoria: "SUV", precio: "$980,000", motor: "2.0L", img: "BMW X3.jpg" },
  { id: 5, nombre: "BMW M4", categoria: "Deportivo", precio: "$1,890,000", motor: "3.0L M", img: "BMW M4.jpg" },
  { id: 6, nombre: "BMW i4", categoria: "Electrico", precio: "$1,350,000", motor: "590 km autonomia", img: "BMW i4.jpg" },
  { id: 7, nombre: "BMW Z4", categoria: "Deportivo", precio: "$1,100,000", motor: "2.0L", img: "BMW M4.jpg" },
  { id: 8, nombre: "BMW iX", categoria: "Electrico", precio: "$1,780,000", motor: "630 km autonomia", img: "BMW Z4.jpg" }
];

// Galeria de autos BMW
var galeria = [
  { src: "BMW Serie 3.jpg", titulo: "BMW Serie 3", categoria: "sedan" },
  { src: "bmw-x5-l-01.jpg", titulo: "BMW X5", categoria: "suv" },
  { src: "BMW M4.jpg", titulo: "BMW M4", categoria: "deportivo" },
  { src: "BMW i4.jpg", titulo: "BMW i4", categoria: "electrico" },
  { src: "BMW Serie 5.jpg", titulo: "BMW Serie 5", categoria: "sedan" },
  { src: "BMW iX.jpg", titulo: "BMW iX", categoria: "electrico" }
];

function mostrarModelos() {
  var contenedor = document.getElementById("modelsContainer");
  if (!contenedor) return;

  var html = "";
  for (var i = 0; i < servicios.length; i++) {
    var s = servicios[i];
    html += '<article class="col-md-6 col-lg-3">';
    html += '<div class="card model-card h-100">';
    html += '<img src="' + s.img + '" class="card-img-top" alt="' + s.nombre + '">';
    html += '<div class="card-body">';
    html += '<h3 class="h6">' + s.nombre + '</h3>';
    html += '<p class="model-price mb-2">' + s.precio + '</p>';
    html += '<ul class="model-features">';
    html += '<li><strong>Categoria:</strong> ' + s.categoria + '</li>';
    html += '<li><strong>Motor:</strong> ' + s.motor + '</li>';
    html += '</ul>';
    html += '<a href="contacto.html" class="btn btn-accent btn-sm w-100">Solicitar info</a>';
    html += '</div></div></article>';
  }

  contenedor.innerHTML = html;
}

function mostrarTabla(lista) {
  var tbody = document.getElementById("servicesTableBody");
  if (!tbody) return;

  var html = "";
  for (var i = 0; i < lista.length; i++) {
    var s = lista[i];
    html += "<tr>";
    html += "<td>" + s.nombre + "</td>";
    html += "<td>" + s.categoria + "</td>";
    html += "<td>" + s.precio + "</td>";
    html += "<td>" + s.motor + "</td>";
    html += "</tr>";
  }

  tbody.innerHTML = html;
}

function validarCampo(id, condicion) {
  var input = document.getElementById(id);
  var error = document.getElementById(id + "-error");

  if (condicion) {
    input.classList.remove("input-error");
    error.classList.remove("visible");
    return true;
  } else {
    input.classList.add("input-error");
    error.classList.add("visible");
    return false;
  }
}

function enviarFormulario(event) {
  event.preventDefault();

  var nombre = document.getElementById("nombre").value.trim();
  var email = document.getElementById("email").value.trim();
  var telefono = document.getElementById("telefono").value.trim();
  var asunto = document.getElementById("asunto").value.trim();
  var mensaje = document.getElementById("mensaje").value.trim();
  var feedback = document.getElementById("formFeedback");

  var ok1 = validarCampo("nombre", nombre.length >= 3);
  var ok2 = validarCampo("email", email.indexOf("@") !== -1 && email.indexOf(".") !== -1);
  var ok3 = validarCampo("telefono", telefono.length >= 7);
  var ok4 = validarCampo("asunto", asunto.length >= 5);
  var ok5 = validarCampo("mensaje", mensaje.length >= 10);

  if (ok1 && ok2 && ok3 && ok4 && ok5) {
    feedback.className = "alert alert-success mt-3";
    feedback.textContent = "Solicitud enviada. Un asesor BMW te contactara pronto.";
    feedback.classList.remove("d-none");
    document.getElementById("contactForm").reset();
  } else {
    feedback.className = "alert alert-danger mt-3";
    feedback.textContent = "Corrige los errores del formulario.";
    feedback.classList.remove("d-none");
  }
}

function mostrarGaleria(filtro) {
  var contenedor = document.getElementById("galleryContainer");
  if (!contenedor) return;

  var html = "";
  for (var i = 0; i < galeria.length; i++) {
    var item = galeria[i];
    if (filtro !== "todos" && item.categoria !== filtro) {
      continue;
    }

    html += '<div class="col-md-4">';
    html += '<div class="gallery-item" onclick="abrirImagen(\'' + item.src + '\', \'' + item.titulo + '\')">';
    html += '<img src="' + item.src + '" alt="' + item.titulo + '">';
    html += '<div class="gallery-overlay">' + item.titulo + '</div>';
    html += '</div></div>';
  }

  contenedor.innerHTML = html;
}

function abrirImagen(src, titulo) {
  document.getElementById("galleryModalTitle").textContent = titulo;
  document.getElementById("galleryModalImg").src = src;
  var modal = new bootstrap.Modal(document.getElementById("galleryModal"));
  modal.show();
}

function filtrarGaleria(filtro, boton) {
  var botones = document.querySelectorAll("[data-filter]");
  for (var i = 0; i < botones.length; i++) {
    botones[i].classList.remove("active");
  }
  boton.classList.add("active");
  mostrarGaleria(filtro);
}

function iniciarContadores() {
  var contadores = document.querySelectorAll("[data-contador]");
  for (var i = 0; i < contadores.length; i++) {
    var el = contadores[i];
    var valor = el.getAttribute("data-contador");
    var sufijo = el.getAttribute("data-sufijo") || "";
    el.textContent = valor + sufijo;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("modelsContainer")) {
    mostrarModelos();
    mostrarTabla(servicios);
  }

  if (document.getElementById("contactForm")) {
    document.getElementById("contactForm").addEventListener("submit", enviarFormulario);
  }

  if (document.getElementById("galleryContainer")) {
    mostrarGaleria("todos");
  }

  if (document.querySelector("[data-contador]")) {
    iniciarContadores();
  }
});
