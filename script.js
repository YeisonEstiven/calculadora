let historial = [];

function calcularEdad() {
    const fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
    const fechaActual = new Date();

    if (isNaN(fechaNacimiento.getTime())) {
        alert('Por favor, introduce una fecha válida.');
        return;
    }
    if (fechaNacimiento > fechaActual) {
        alert('La fecha no puede ser futura.');
        return;
    }

    const diferencia = fechaActual - fechaNacimiento;
    const añosVividos = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365.25));
    const mesesVividos = Math.floor((diferencia % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const horasVividas = Math.floor(diferencia / (1000 * 60 * 60));

    const resultado = `Han pasado ${añosVividos} años, ${mesesVividos} meses y ${horasVividas} horas.`;
    document.getElementById('resultado').innerHTML = resultado;

    historial.push({ fechaNacimiento: fechaNacimiento.toISOString().split('T')[0], resultado });
    actualizarHistorial();
}

function actualizarHistorial() {
    const historialLista = document.getElementById('historial');
    historialLista.innerHTML = ''; 

    historial.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `Fecha: ${entry.fechaNacimiento}, Resultado: ${entry.resultado}`;

        // Botón para eliminar
        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.onclick = () => eliminarEntrada(index);

        // Botón para editar
        const editarBtn = document.createElement('button');
        editarBtn.textContent = "Editar";
        editarBtn.onclick = () => editarEntrada(index);

        li.appendChild(eliminarBtn);
        li.appendChild(editarBtn);
        historialLista.appendChild(li);
    });

    localStorage.setItem('historial', JSON.stringify(historial));
}

function eliminarEntrada(index) {
    historial.splice(index, 1);
    actualizarHistorial();
}

function editarEntrada(index) {
    const nuevaFecha = prompt("Introduce la nueva fecha (YYYY-MM-DD):", historial[index].fechaNacimiento);
    if (nuevaFecha && !isNaN(new Date(nuevaFecha).getTime())) {
        const nuevaFechaObj = new Date(nuevaFecha);
        const fechaActual = new Date();

        if (nuevaFechaObj > fechaActual) {
            alert('La fecha no puede ser futura.');
            return;
        }

        const diferencia = fechaActual - nuevaFechaObj;
        const añosVividos = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365.25));
        const mesesVividos = Math.floor((diferencia % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
        const horasVividas = Math.floor(diferencia / (1000 * 60 * 60));

        historial[index].fechaNacimiento = nuevaFechaObj.toISOString().split('T')[0];
        historial[index].resultado = `Han pasado ${añosVividos} años, ${mesesVividos} meses y ${horasVividas} horas.`;

        actualizarHistorial();
    } else {
        alert("Fecha no válida. Inténtalo de nuevo.");
    }
}

window.onload = function() {
    const storedHistorial = localStorage.getItem('historial');
    if (storedHistorial) {
        historial = JSON.parse(storedHistorial);
        actualizarHistorial();
    }
};
