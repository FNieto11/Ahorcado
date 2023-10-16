let palabraElegida;
let errores;
let aciertos;
let jugados;
let ganados;
let perdidos;

localStorage.getItem('jugados') === null ? jugados = 0 : jugados = localStorage.getItem('jugados');
localStorage.getItem('jugados') === null ? ganados = 0 : ganados = localStorage.getItem('ganados');
localStorage.getItem('jugados') === null ? perdidos = 0 : perdidos = localStorage.getItem('perdidos');

function id (str){
    return document.getElementById(str);
}

const palabras = ['CURSO','PROGRAMACION','JAVASCRIPT','DESARROLLO','TECNOLOGIA','FRONTEND','BACKEND','SERVIDOR','NAVEGADOR','SITIO','WEB','HTML','CSS','FRAMEWORK','DISEÑO','DATOS','RESPONSIVE','INTERFAZ','API','DOM','FUNCION','CODERHOUSE','OBJETOS','CONDICION','ARREGLOS','ESTILOS','DOCUMENTO','INTERVALO','LOGICA','RENDERIZAR','BOOTSTRAP'];

const botonLetras = document.querySelectorAll('#letras button');

id('palabraRapida').addEventListener('click', iniciarRapido);

function iniciarRapido(){
    const valor = Math.floor(Math.random() * palabras.length);
    sessionStorage.setItem('palabraElegida',palabras[valor]);
    juego();
}

id('palabraAleatoria').addEventListener('click', iniciarAleatorio);

function iniciarAleatorio(){
    fetch('https://clientes.api.greenborn.com.ar/public-random-word')
    .then(response => response.json())
    .then(data => 
        {sessionStorage.setItem('palabraElegida',...data);
        juego();
    });
}

id('palabraEscrita').addEventListener('click', iniciarEscrita);

function iniciarEscrita(){
    Swal.fire({
        title: 'Ingrese palabra a adivinar',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Adivinar',
        cancelButtonText: 'Cancelar',
        preConfirm: (login) => {
            sessionStorage.setItem('palabraElegida',login)
        }
    }).then((result)=>{
        if (result.isConfirmed){
            juego();
        } else if (result.isDenied){
            gameOver();
        }
    })
}

function juego(){
    id ('imagenAhorcado').src = './img/0_fallos.png'
    id('palabraRapida').disabled=true;
    id('palabraAleatoria').disabled=true;
    id('palabraEscrita').disabled=true;
    for(let i=0; i<botonLetras.length; i++){
        botonLetras[i].disabled=false;
    }
    id('resultado').innerHTML = '';
    errores = 0;
    aciertos = 0;
    const palabraOculta = id('palabraOculta');
    palabraOculta.innerHTML = '';
    palabraElegida = sessionStorage.getItem('palabraElegida').toUpperCase( ).normalize("NFD").replace(/[\u0300-\u036f]/g,"");
    for(let i=0; i<palabraElegida.length; i++){
        palabraOculta.appendChild(document.createElement('span'));
    }
}

for(let i=0; i<botonLetras.length; i++){
    botonLetras[i].addEventListener('click', clickLetras);
}

function clickLetras (event){
    const posicion = document.querySelectorAll('#palabraOculta span')
    const botonLetra = event.target;
    botonLetra.disabled = true;
    const letra = botonLetra.innerHTML.toUpperCase( );
    const palabra = palabraElegida.toUpperCase( );

    let intento = false;
    for( let i = 0; i < palabra.length;  i++ ){
        if( letra == palabra[i] ){
            posicion[i].innerHTML = letra;
            aciertos++;
            intento = true;
        }
    }

    if(intento==false){
        errores++;
        id ('imagenAhorcado').src = `./img/${errores}_fallos.png`;
    }

    if(errores == 7){
        id('resultado').innerHTML = 'Perdiste, la palabra era '+palabraElegida;
        jugados++;
        perdidos++;
        gameOver();
    }else if(aciertos == palabraElegida.length){
        id('resultado').innerHTML = 'FELICIDADES, GANASTE!!!';
        id ('imagenAhorcado').src = `./img/ganador.png`;
        jugados++;
        ganados++;
        gameOver();
    }
}

function gameOver(){
    for(let i=0; i<botonLetras.length; i++){
        botonLetras[i].disabled=true;
    }
    id('palabraRapida').disabled=false;
    id('palabraAleatoria').disabled=false;
    id('palabraEscrita').disabled=false;
    localStorage.setItem('jugados',jugados);
    localStorage.setItem('ganados',ganados);
    localStorage.setItem('perdidos',perdidos);
    id('jugados').innerHTML = 'Partidas Jugadas: '+jugados;
    id('ganados').innerHTML = 'Partidas ganadas: '+ganados;
    id('perdidos').innerHTML = 'Partidas perdidas: '+perdidos;
}

id('reiniciarEstadistica').addEventListener('click', reiniciarEstadistica);

function reiniciarEstadistica(){
    Swal.fire({
        title: 'Reiniciar Estadística',
        text: '¿Seguro que quieres Reiniciar la estadística?',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'Sí',
        denyButtonText: 'No',
    }).then((result)=>{
        if (result.isConfirmed){
            jugados = 0;
            ganados = 0;
            perdidos = 0;
            localStorage.setItem('jugados',jugados);
            localStorage.setItem('ganados',ganados);
            localStorage.setItem('perdidos',perdidos);
            id('jugados').innerHTML = 'Partidas Jugadas: '+jugados;
            id('ganados').innerHTML = 'Partidas ganadas: '+ganados;
            id('perdidos').innerHTML = 'Partidas perdidas: '+perdidos;
        } else if (result.isDenied){
            id('jugados').innerHTML = 'Partidas Jugadas: '+jugados;
            id('ganados').innerHTML = 'Partidas ganadas: '+ganados;
            id('perdidos').innerHTML = 'Partidas perdidas: '+perdidos;
        }
    
    })
}

gameOver();

