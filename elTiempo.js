
const result = document.getElementById("result");
const form = document.getElementById("formulario");
const ciudad = document.getElementById("ciudad");
const buscar = document.getElementById("buscar");
const error = document.getElementById("error");

buscar.addEventListener("click",()=>{

    
    if( ciudad.value === ""){
        mostrarError("Tienes que introducir una ciudad");
        return;
    }else{
        console.log(ciudad.value);
    }
    
    callAPI(ciudad.value);
    form.reset();
    
});



function callAPI(ciudad){
    let city = ciudad;
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=bbc924beff0322045dd777be98a06d40&units=metric`;
    console.log(url);
    
    fetch(url)
        .then(data =>{
            return data.json();
        })
        .then(dataJSON =>{
            if(dataJSON.cod === '404'){
                mostrarError("Ciudad no encontrada");
            }else{
                mostrarTiempo(dataJSON)
            }
            // console.log(dataJSON);
            
        })
        .catch(error =>{
            console.log(error);
            
        })
}

function mostrarTiempo(data){
    const {name, main:{temp, temp_min, temp_max,humidity},weather:[arr]} = data;
    
    const conetido = document.createElement("DIV");
    conetido.innerHTML = `
            <h2 class="elTiempo__ciudad">${name}</h2>
            <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="">
            <h2 class="elTiempo__grados">Temperatura : ${temp}°C</h2>
            <h3 class="elTiempo__max">Maxima : ${temp_max}°C</h3>
            <h3 class="elTiempo__min">Minima : ${temp_min}°C</h3>
            <h3 class="elTiempo__humedad">Humedad : ${humidity}</h3>
        `;
    result.appendChild(conetido);
    
    console.log("nombre :"+name);
    console.log("temperatura :"+temp);
    console.log("t_max :"+temp_max);
    console.log("arreglo :"+arr.icon);
    
    
    
}

function mostrarError(elError){
    console.log(elError);
    const alert = document.createElement('P');
    alert.classList.add('alert-error');
    alert.innerHTML = elError;

    form.appendChild(alert);
    setTimeout(()=>{
        alert.remove();

    },3000);
    
}









