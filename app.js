$(document).ready(function () {
    $('.number, .operator, .clear, #btnEquals, #btnDecimal, #btnSign, #btnBackspace').click(manejarClicBoton);
    let inputActual = '';
    let operadorActual = '';
    let memoriaValor = '';
    let expresionEnPantalla = '';

    function actualizarPantalla() {
        $('#resultadoFinal').val(expresionEnPantalla);
    }

    function mostrarOperacionYResultado() {
        const operacionYResultado = `${expresionEnPantalla} = ${memoriaValor}`;
        $('#resultadoFinal').val(operacionYResultado);
    }

    function manejarClicBoton() {
        const valorBoton = $(this).text();

        if (valorBoton === 'C') {
            limpiarCalculadora();
        } else if (valorBoton === '=') {
            console.log('Botón "=" presionado');
            realizarOperacion();
            mostrarOperacionYResultado(); // Mostrar la operación y el resultado
        } else if (esOperador(valorBoton)) {
            manejarOperador(valorBoton);
        } else if (valorBoton === '.') {
            manejarDecimal();
        } else if (valorBoton === '+/-') {
            cambiarSigno();
        } else if (valorBoton === '←') {
            borrarUltimoDigito();
        } else {
            inputActual += valorBoton;
            expresionEnPantalla += valorBoton;
            actualizarPantalla();
        }
    }

    function manejarOperador(operador) {
        if (inputActual !== '') {
            if (operadorActual) {
                expresionEnPantalla = `(${expresionEnPantalla}) ${operador} `;
            } else {
                expresionEnPantalla = `${inputActual} ${operador} `;
            }

            inputActual = '';
            operadorActual = operador;
            actualizarPantalla();
        }
    }

    function realizarOperacion() {
        if (inputActual !== '' && operadorActual && memoriaValor !== '') {
            expresionEnPantalla += ` ${inputActual}`;
            try {
                const resultado = eval(expresionEnPantalla);
                const operacionCompleta = `${expresionEnPantalla} = ${resultado}`;
                $('#resultadoFinal').val(operacionCompleta);
                // Reiniciar las variables
                inputActual = resultado.toString(); // Guardar el resultado actual como entrada para nuevas operaciones
                operadorActual = '';
                memoriaValor = '';
                expresionEnPantalla = resultado.toString(); // Actualizar la expresión con el resultado
            } catch (error) {
                $('#resultadoFinal').val('Error');
            }
        }
    }
    
    
    
    

    function esOperador(valor) {
        return ['+', '-', '*', '/'].includes(valor);
    }

    function manejarDecimal() {
        if (inputActual === '') {
            inputActual = '0';
            expresionEnPantalla += '0';
        }
        if (!inputActual.includes('.')) {
            inputActual += '.';
            expresionEnPantalla += '.';
            actualizarPantalla();
        }
    }

    function cambiarSigno() {
        if (inputActual !== '') {
            inputActual = (parseFloat(inputActual) * -1).toString();
            expresionEnPantalla = `(${expresionEnPantalla})`;
            actualizarPantalla();
        }
    }

    function borrarUltimoDigito() {
        inputActual = inputActual.slice(0, -1);
        expresionEnPantalla = expresionEnPantalla.slice(0, -1);
        actualizarPantalla();
    }

    function limpiarCalculadora() {
        inputActual = '';
        operadorActual = '';
        memoriaValor = '';
        expresionEnPantalla = '';
        actualizarPantalla();
    }

    $(document).keydown(function (event) {
        const tecla = event.key;
        const teclasPermitidas = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', '=', 'Enter', 'Backspace'];

        if (teclasPermitidas.includes(tecla)) {
            event.preventDefault();
            $(`button:contains('${tecla}')`).click();
        }
    });

    $('#resultadoFinal').on('input', function () {
        if ($(this).outerWidth() > $('.calculadora').innerWidth()) {
            $(this).css('width', '100%');
        }
    }); })
