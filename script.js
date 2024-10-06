// Variables globales
let modoOscuro = false;

// Función para calcular el gasto calórico
function calcularGastoCalorico() {
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    const edad = document.getElementById('edad').value;
    const genero = document.getElementById('genero').value;
    const actividad = document.getElementById('actividad').value;
    const resultadoCalorico = document.getElementById('resultado-calorico');
    const errorMensajes = validarFormulario(peso, altura, edad);

    // Si hay errores, no continuar con el cálculo
    if (errorMensajes.length > 0) {
        mostrarErrores(errorMensajes);
        return;
    }

    // Fórmula para la tasa metabólica basal
    let tasaMetabolicaBasal;
    if (genero === "hombre") {
        tasaMetabolicaBasal = 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * edad);
    } else {
        tasaMetabolicaBasal = 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * edad);
    }

    // Ajuste por nivel de actividad
    let factorActividad;
    switch (actividad) {
        case "sedentario":
            factorActividad = 1.2;
            break;
        case "ligero":
            factorActividad = 1.375;
            break;
        case "moderado":
            factorActividad = 1.55;
            break;
        case "activo":
            factorActividad = 1.725;
            break;
        case "muy-activo":
            factorActividad = 1.9;
            break;
    }

    const gastoCaloricoTotal = tasaMetabolicaBasal * factorActividad;
    resultadoCalorico.innerText = `Tu gasto calórico diario estimado es: ${gastoCaloricoTotal.toFixed(2)} calorías.`;
    resultadoCalorico.style.display = 'block';

    // Consejos basados en el resultado
    mostrarConsejos(gastoCaloricoTotal);
}

// Validación del formulario
function validarFormulario(peso, altura, edad) {
    let errores = [];
    if (!peso || peso <= 0) {
        errores.push("Por favor, ingresa un peso válido.");
    }
    if (!altura || altura <= 0) {
        errores.push("Por favor, ingresa una altura válida.");
    }
    if (!edad || edad <= 0) {
        errores.push("Por favor, ingresa una edad válida.");
    }
    return errores;
}

// Mostrar errores en el formulario
function mostrarErrores(errores) {
    const errorContainer = document.getElementById('errores');
    errorContainer.innerHTML = ''; // Limpiar errores previos
    errores.forEach(error => {
        const p = document.createElement('p');
        p.style.color = 'red';
        p.innerText = error;
        errorContainer.appendChild(p);
    });
}

// Mostrar consejos personalizados basados en el gasto calórico
function mostrarConsejos(gastoCalorico) {
    const consejos = document.getElementById('consejos-dinamicos');
    consejos.innerHTML = ''; // Limpiar consejos previos

    if (gastoCalorico < 2000) {
        consejos.innerHTML = `
            <p>Tu gasto calórico es bajo. Es importante mantener una dieta balanceada con suficientes proteínas y carbohidratos para evitar la pérdida de masa muscular.</p>
        `;
    } else if (gastoCalorico >= 2000 && gastoCalorico <= 2500) {
        consejos.innerHTML = `
            <p>Tu gasto calórico está en un rango moderado. Mantén un equilibrio entre el consumo y el gasto calórico para evitar el aumento de peso innecesario.</p>
        `;
    } else {
        consejos.innerHTML = `
            <p>Tu gasto calórico es alto. Asegúrate de consumir suficientes calorías y nutrientes para mantener tu energía y rendimiento físico.</p>
        `;
    }
}

// Modo oscuro - cambia el estilo de la página
function cambiarModoOscuro() {
    const body = document.body;
    modoOscuro = !modoOscuro;
    if (modoOscuro) {
        body.classList.add('modo-oscuro');
    } else {
        body.classList.remove('modo-oscuro');
    }
}

// Escuchar los cambios de los inputs del formulario para proporcionar interacciones
document.querySelectorAll('input, select').forEach(elemento => {
    elemento.addEventListener('focus', () => {
        elemento.style.border = '2px solid #6c63ff';
    });
    elemento.addEventListener('blur', () => {
        elemento.style.border = '2px solid #ccc';
    });
});

// Agregar evento al botón de modo oscuro
document.getElementById('boton-modo-oscuro').addEventListener('click', cambiarModoOscuro);
// Función para mostrar información adicional de un alimento
function mostrarInformacionAlimento(alimento) {
    const infoAlimento = document.getElementById('info-alimento');
    switch (alimento) {
        case 'mantequilla de maní':
            infoAlimento.innerHTML = `<h4>Mantequilla de maní</h4><p>Una excelente fuente de energía y proteínas, ideal para quienes buscan aumentar de peso.</p>`;
            break;
        case 'aguacate':
            infoAlimento.innerHTML = `<h4>Aguacate</h4><p>Rico en grasas saludables, aporta nutrientes esenciales y es perfecto para una dieta equilibrada.</p>`;
            break;
        case 'pechuga de pollo':
            infoAlimento.innerHTML = `<h4>Pechuga de pollo</h4><p>Una fuente magra de proteínas que ayuda a construir masa muscular.</p>`;
            break;
        case 'arroz integral':
            infoAlimento.innerHTML = `<h4>Arroz integral</h4><p>Proporciona carbohidratos complejos que brindan energía sostenida.</p>`;
            break;
        case 'pescado (salmón)':
            infoAlimento.innerHTML = `<h4>Pescado (salmón)</h4><p>Contiene ácidos grasos omega-3, esenciales para la salud del corazón.</p>`;
            break;
        case 'yogur griego':
            infoAlimento.innerHTML = `<h4>Yogur griego</h4><p>Alto en proteínas y bajo en carbohidratos, ideal para mantener el peso.</p>`;
            break;
        case 'avena':
            infoAlimento.innerHTML = `<h4>Avena</h4><p>Un excelente desayuno que proporciona energía y fibra para mantenerte lleno.</p>`;
            break;
        case 'batata':
            infoAlimento.innerHTML = `<h4>Batata</h4><p>Una opción rica en nutrientes y antioxidantes, ideal para una dieta balanceada.</p>`;
            break;
        case 'brócoli':
            infoAlimento.innerHTML = `<h4>Brócoli</h4><p>Bajo en calorías y alto en fibra, es perfecto para quienes buscan perder peso.</p>`;
            break;
        case 'pechuga de pavo':
            infoAlimento.innerHTML = `<h4>Pechuga de pavo</h4><p>Alta en proteínas y baja en grasas, ideal para una dieta saludable.</p>`;
            break;
        case 'claras de huevo':
            infoAlimento.innerHTML = `<h4>Claras de huevo</h4><p>Excelente fuente de proteínas sin las grasas de la yema.</p>`;
            break;
        case 'zanahorias':
            infoAlimento.innerHTML = `<h4>Zanahorias</h4><p>Ricas en vitaminas y bajas en calorías, perfectas para picar.</p>`;
            break;
        default:
            infoAlimento.innerHTML = `<p>Selecciona un alimento para ver más información.</p>`;
    }
}

// Asignar evento de clic a cada alimento de las tablas
document.querySelectorAll('.lista-alimentos table tbody tr').forEach(row => {
    row.addEventListener('click', () => {
        const alimento = row.cells[0].innerText;
        mostrarInformacionAlimento(alimento);
    });
});
