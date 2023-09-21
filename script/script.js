function seleccionarPalabra() {
    const palabraDefinida = {
        palabraFacil: "CURSO",
        palabraMedia: "PROGRAMACION",
        palabraDificil: "JAVASCRIPT"
    }

    function elegirPalabraAleatoria(array){
        const indice = Math.ceil(Math.random() * array.length);
        return array [indice];
    }

    const palabraAleatoria = ["CURSO","PROGRAMACION","JAVASCRIPT","DESARROLLO","TECNOLOGIA","FRONTEND","BACKEND","SERVIDOR","NAVEGADOR","SITIO","WEB","HTML","CSS","FRAMEWORK","DISEÑO","DATOS","RESPONSIVE","INTERFAZ","API","DOM","FUNCION"];
    const palabraAleatoriaElegida = elegirPalabraAleatoria(palabraAleatoria)

    var entrada = prompt ('Bienvenido! Escoja el nivel de dificultad entre 1, 2 o 3. Si quiere una palabra al azar ingrese 4')

    while (entrada<1 || entrada>4) {
        var entrada = prompt ('Ups, debes elegir entre 1, 2 y 3. Puede elegir 4 si quiere una palabra al azar')
    }

    if (entrada == 1){
        palabraSecreta = palabraDefinida.palabraFacil;
    } else if (entrada == 2) {
        palabraSecreta = palabraDefinida.palabraMedia;
    } else if (entrada == 3) {
        palabraSecreta = palabraDefinida.palabraDificil;
    } else {
        palabraSecreta = palabraAleatoriaElegida;
    }

    return palabraSecreta;
}

function ocultarPalabra(palabra) {
    return "_".repeat(palabra.length);
}

function mostrarEstado(palabraAdivinada, intentosRestantes) {
    alert("La palabra tiene: " + palabraSecreta.length +" letras" + "\nPalabra a adivinar: " + palabraAdivinada + "\nIntentos restantes: " + intentosRestantes);
}

function jugarAhorcado() {
    var palabraSecreta = seleccionarPalabra();
    var palabraAdivinada = ocultarPalabra(palabraSecreta);
    var intentosMaximos = 6;
    var intentos = 0;

    while (intentos < intentosMaximos) {
        mostrarEstado(palabraAdivinada, intentosMaximos - intentos);

        var letra = prompt("Ingresa una letra:").toUpperCase();

        if (palabraSecreta.includes(letra)) {
            for (var i = 0; i < palabraSecreta.length; i++) {
                if (palabraSecreta[i] == letra) {
                    palabraAdivinada = palabraAdivinada.substr(0, i) + letra + palabraAdivinada.substr(i + 1);
                }
            }

            if (palabraAdivinada == palabraSecreta) {
                mostrarEstado(palabraAdivinada, intentosMaximos - intentos);
                alert("¡Felicidades! Adivinaste la palabra: " + palabraSecreta);
                jugarAhorcado();
                break;
            }
        } else {
            intentos++;
        }
    }

    if (intentos == intentosMaximos) {
        mostrarEstado(palabraAdivinada, 0);
        alert("¡Se acabaron los intentos! La palabra era: " + palabraSecreta);
        jugarAhorcado();
    }
}

jugarAhorcado();