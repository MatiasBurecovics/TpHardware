var fechaHoraElemento = document.getElementById("fecha-hora");

function obtenerFechaHora() {
  var fechaHora = new Date();
  var fecha = fechaHora.toLocaleDateString();
  var hora = fechaHora.toLocaleTimeString();

  return fecha + " - " + hora;
}




var ubicacionElemento = document.getElementById("ubicacion");

function actualizarFechaHora() {
  const fechaHoraElemento = document.getElementById('fecha-hora');
  fechaHoraElemento.textContent = obtenerFechaHora();
}

actualizarFechaHora();

setInterval(actualizarFechaHora, 1000);

var ciudadActual = ""; 

function obtenerUbicacion() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitud = position.coords.latitude;
      var longitud = position.coords.longitude;
  
      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitud}&longitude=${longitud}&localityLanguage=es`;
  
      fetch(geoApiUrl)
        .then(res => res.json())
        .then(data => {
        console.log(data)
          var city = data.locality + " - " + data.city;
          var ciudad = data.city
          ciudadActual = ciudad;
          obtenerTiempo(ciudadActual);
          ubicacionElemento.textContent = city;
        })
        .catch(error => {
          ubicacionElemento.textContent = "Error al obtener la ubicación";
          console.log(error);
        });
    }, function(error) {
      ubicacionElemento.textContent = "No se pudo obtener la ubicación";
    });
  }
  
  obtenerUbicacion();

function pedirUsuario() {

  var nombreUsuarioValido1 = "Julio";
  var nombreUsuarioValido2 = "Oscar";
  var nombreUsuario = "";

  

  var boton = document.querySelector(".boton-logout");
  
  if (boton.classList.contains("log-out")) {
    boton.classList.remove("log-out");
    boton.classList.add("log-in");
    boton.innerHTML = `
      <span class="material-symbols-outlined">
        login
      </span>
      <p>Log in</p>
    `;
    var nombreUsuarioContainer = document.getElementById("nombreUsuarioContainer");
    nombreUsuarioContainer.textContent = "";
    var fotoPerfil = document.getElementById("fotoPerfil");
    fotoPerfil.src = "";
    var saludoElement = document.querySelector(".saludo");
    saludoElement.textContent = "";
    var fotoPerfilElement = document.getElementById("fotoPerfil");
    fotoPerfilElement.src = "";
    
    fotoPerfilElement.style.opacity = "0";

  } else {
    boton.classList.remove("log-in");
    boton.classList.add("log-out");
    boton.innerHTML = `
      <span class="material-symbols-outlined">
        logout
      </span>
      <p>Log out</p>
    `;

    while (nombreUsuario !== nombreUsuarioValido1 && nombreUsuario !== nombreUsuarioValido2) {
      nombreUsuario = prompt("Ingrese su nombre de usuario:");

      if (nombreUsuario) {
          if (nombreUsuario === nombreUsuarioValido1 || nombreUsuario === nombreUsuarioValido2) {
              var nombreUsuarioContainer = document.getElementById("nombreUsuarioContainer");
              nombreUsuarioContainer.textContent = nombreUsuario;

              var fotoPerfil = document.getElementById("fotoPerfil");
              var saludoElement = document.querySelector(".saludo");
              if (nombreUsuario === "Julio") {
                  fotoPerfil.src = "foto-perfil.png";
                  fotoPerfil.style.opacity = "1";
                  saludoElement.textContent = "Bienvenido";
              } else if (nombreUsuario === "Oscar") {
                  fotoPerfil.src = "foto-perfil-2.png";
                  fotoPerfil.style.opacity = "1";
                  saludoElement.textContent = "Bienvenido";
              }
          } else {
              alert("Nombre de usuario incorrecto. Por favor, inténtelo nuevamente.");
          }
      } else {
          alert("Debe ingresar un nombre de usuario válido. Por favor, inténtelo nuevamente.");
      }
  }
  }
}

function transparente(){
  var fotoPerfilElement = document.getElementById("fotoPerfil");
  fotoPerfilElement.style.opacity = "0";
  var saludoElement = document.querySelector(".saludo");
    saludoElement.textContent = "";
}

function obtenerTiempo(ciudad) {
  const apiKey = '531e953f71c1c38732467c375145a095'; 
  
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&lang=es&units=metric`;
  
  fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
      console.log(data);
      var temperatura = data.main.temp;
      var descripcion = data.weather[0].description;
      var tempMax = data.main.temp_max;
      var tempMin = data.main.temp_min;
      var presion = data.main.pressure;
      var viento = data.wind.speed;
      var img = data.weather[0].icon
      
      var contenidoElemento = document.querySelector('.contenido');
      contenidoElemento.innerHTML = `<div class="ajustado" id="ajustado"><img src="http://openweathermap.org/img/wn/${img}@2x.png" alt="error" class="imagen">
      <div class="linea-1">La temperatura actual en <span class="ciudad">${ciudad}</span> es de ${temperatura}°C. El clima es ${descripcion}.</div>
      <div class="linea-2">
      <div class="temperatura-min">
      <p>
      <span class="material-symbols-outlined" id="abajo">
      arrow_downward
      </span> 
      ${tempMin}°C
      </p> 
      </div>
      <div class="temperatura-max">
      <p>
      <span class="material-symbols-outlined" id="arriba">
      arrow_upward
      </span> ${tempMax}°C
      </p>
      </div>
      </div>
      <div class="linea-3">
      <div class="presion">
      <p>
      <span class="material-symbols-outlined" id="pressure">
      altitude
      </span>
      ${presion} hPa
      </p>
      </div>
      <div class="viento">
      <p>
      <span class="material-symbols-outlined" id="aire">
      air
      </span>
      ${viento} Km/h
      </p>
      </div>
      </div>
      <div id="inputContainer">
      </div>
      </div>`;

      divPrincipal();
      
  })
  .catch(error => {
      console.log("Error al obtener los datos meteorológicos:", error);
  });
}



function toggleModoOscuro() {
  const toggleButton = document.getElementById('toggle-modo');
  const body = document.body;
  body.classList.toggle('modo-oscuro');
}

toggleButton.addEventListener('click', toggleModoOscuro);

var inputContainerShown = false;

function mostrarInput() {

  inputContainerShown = true;

  var inputContainer = document.getElementById("inputContainer");

  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Localizacion");
  input.setAttribute("class", "input-texto");

  var boton = document.createElement("button");
  boton.setAttribute("class", "input-boton");

  var span = document.createElement("span");
  span.setAttribute("class", "material-symbols-outlined");
  span.innerText = "location_searching";

  boton.appendChild(span);

  inputContainer.appendChild(input);
  inputContainer.appendChild(boton);

  function obtenerTiempoConTexto() {
    var ciudad = input.value;
    obtenerTiempo(ciudad);
  }

  boton.addEventListener("click", function() {
    obtenerTiempoConTexto();
    inputContainerShown = false;
  });

  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      inputContainerShown = false;
      obtenerTiempoConTexto();
    }
  });
}

function comprobarMostrarInput() {
  if (!inputContainerShown) {
    mostrarInput();
  }
}

function animacion() {
  var inputContainer = document.getElementById("inputContainer");
  
  inputContainer.style.opacity = 1;
  inputContainer.style.transform = "scale(1)";
};

function divPrincipal() {
  var div = document.getElementById("ajustado");
  
  setTimeout(function() {
    div.style.opacity = 1;
    div.style.transform = "scale(1)";
  }, 10); 
}