//Funcion para capturar la posición
navigator.geolocation.getCurrentPosition(geoSucess, geoError);

let lat = 33.9151129;
let lon = 82.8269445;
var zoom = 13;

var mapa = L.map('mapa').setView((lat,lon),zoom);
var marker = L.marker[(lat,lon)].addTo(mapa)
    .bindPopup("Oscar guapo")
    .openPopup();


L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

mapa.on("click", onMapClick);


// let url = "https://api.openweathermap.org/data/2.5/weather?lat=37.9917394&lon=-1.1600667&appid=bbc924beff0322045dd777be98a06d40&units=metric"

async function getWeatherData(ciudad) {
  // lat, lon
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=bbc924beff0322045dd777be98a06d40&units=metric`;
  // let url = ` https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=bbc924beff0322045dd777be98a06d40&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    // console.log(json.cnt);

    //grafico
    const ctx = document.getElementById("temp35");
    
    var etiquetas = [];
    var valores = [];
    var sensacion = [];
    for (var i = 0; i < json.cnt; i++) {
      etiquetas.push(json.list[i].dt_txt);
      valores.push(json.list[i].main.temp);
      sensacion.push(json.list[i].main.feels_like);
    }

    new Chart(ctx, {
      type: "line",
      data: {
        labels: etiquetas,
        datasets: [
          {
            label: "Temperatura",
            data: valores,
            borderWidth: 1,
          },
          {
            label: "Sensacion",
            data: sensacion,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(error.message);
  }
}

function geoSucess(pos) {
  const crd = pos.coords;

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  lat = crd.latitude;
  lon = crd.longitude;
  getWeatherData(lat, lon);
  mostrarUbicacionEnMapa(lat, lon);
  getWeatherDataNow(lat,lon);
  showMap(lat,lon);
}

function  showMap(lat,lon){ 
  map.invalidateSize();
  mapa.setView((lat,lon),zoom);
}
function onMapClick(e){
  lat = e.latlng.lat;
  lon = e.latlng.lng;
  marker.setLating(new L.lating(lat,lon).openPopup() );
  getWeatherData(lat, lon);
}

function geoError(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  getWeatherData(lat, lon);
}




function mostrarUbicacionEnMapa(lat, lon) {

  var map = L.map("map").setView([lat, lon], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([lat, lon])
    .addTo(map)
    .bindPopup("Viva Murcia!!.<br> Ponme un 10!!.")
    .openPopup();
}

/***********************ahora *******************/
async function getWeatherDataNow(lat, lon) {

  let url = ` https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bbc924beff0322045dd777be98a06d40&units=metric`
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    console.log(json);
    console.log("ahora");

    //grafico
    const ctx = document.getElementById('tempNow');

    console.log(json.weather[0].description);
    

    let mensaje = `<h2>En ${json}</h2>`
  //  new Chart(ctx, {
  //    type: 'line',
  //    data: {
  //      labels: etiquetas,
  //      datasets: [{
  //        label: '# of Votes',
  //        data: valores,
  //        borderWidth: 1
  //      },
  //      {
  //        label: '# of Votes',
  //       data: sensacion,
  //        borderWidth: 1
  //      }]
  //    },
  //    options: {
  //      scales: {
  //        y: {
  //          beginAtZero: true
  //        }
  //      }
  //    }
  //  });

     } catch (error) {
       console.error(error.message);
     }
   }

//   mapa
// let first = 51.505;
// let sec = -0.09
// var map = L.map('map').setView([lat, lon], 13);
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// L.marker([lat, lon]).addTo(map)
// .bindPopup('A pretty CSS popup.<br> Easily customizable.')
// .openPopup();

// // const espacio = document.getElementById("espacio");

// // const url='https://api.openweathermap.org/data/2.5/weather?lat=37.9917394&lon=-1.1600667&appid=bbc924beff0322045dd777be98a06d40'

// // const request = new XMLHttpRequest();
// // request.open("GET", url);
// // request.responseType = "json";
// // request.send();

// // request.onload = function () {
// //     const superHeroes = request.response;
// //     populateHeader(superHeroes);
// //     showHeroes(superHeroes);
// //   };

//   const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=37.9917394&lon=-1.1600667&appid=bbc924beff0322045dd777be98a06d40';  // Cambia esta URL por la URL de tu API

//         // Hacer una solicitud a la API
//         fetch(apiUrl)
//             .then(response => {
//                 // Verificar que la solicitud fue exitosa (código 200)
//                 if (!response.ok) {
//                     throw new Error('Error al obtener los datos de la API');
//                 }
//                 return response.json(); // Convertir la respuesta en formato JSON
//             })
//             .then(data => {
//                 // Procesar los datos recibidos
//                 console.log(data); // Imprimir los datos en la consola (opcional)

//                 // Seleccionar el contenedor donde se mostrarán los datos
//                 const contenidoDiv = document.getElementById('espacio');

//                 // Crear una lista para mostrar los datos
//                 const lista = document.createElement('ul');

//                 // Suponiendo que los datos son un arreglo (ajusta según tu estructura)
//                 data.forEach(item => {
//                     const li = document.createElement('li');
//                     li.textContent = item.nombre; // Aquí pones el nombre o el dato que quieres mostrar
//                     lista.appendChild(li);
//                 });

//                 // Agregar la lista al div
//                 contenidoDiv.appendChild(lista);
//             })
//             .catch(error => {
//                 // Manejo de errores
//                 console.error('Hubo un problema con la solicitud Fetch:', error);
//             });
