function seleccionarPalabra() {
    const palabraFacil = "CURSO";
    const palabraMedia = "PROGRAMACION";
    const palabraDificil = "JAVASCRIPT";

    var entrada = prompt ('Bienvenido! Escoja el nivel de dificultad entre 1, 2 y 3')

    while (entrada<1 || entrada>3) {
        var entrada = prompt ('Ups, debes elegir entre 1, 2 y 3')
    }

    if (entrada == 1){
        palabraSecreta = palabraFacil;
    } else if (entrada == 2) {
        palabraSecreta = palabraMedia;
    } else {
        palabraSecreta = palabraDificil;
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