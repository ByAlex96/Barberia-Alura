var miBoton = document.getElementById("enviar");
var miForm = document.getElementById("form");

miBoton.addEventListener("click", (evento) => {
    evento.preventDefault(); /*No envía el formulario */
    valido = validar();

    if (valido == true) {
        miForm.submit();
    }
})

function validar() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var telefono = document.getElementById("telefono").value;
    var email = document.getElementById("email").value;
    var privacidad = document.getElementById("privacidad");

    let mensaje = "";
    let correcto = true;

    if (nombre == null || nombre == "") {
        mensaje = "El campo nombre está en blanco.\n";
        correcto = false;
    } else {
        let name_re = /^([A-Za-zÑñÁáÉéÍíÓóÚú]{2,15})$/;
        if (!name_re.exec(nombre)) {
            mensaje += "El nombre solo puede estar compuesto de letras.\n";
            correcto = false;
        }
    }


    /********  DIRECCIÓN  ***************/

    if (apellido == null || apellido == "") {
        mensaje += "El campo apellido está en blanco.\n";
        correcto = false;
    } else {
        let ape_re = /^[A-Za-zÑñÁáÉéÍíÓóÚú]{2,40}$/;
        if (!ape_re.exec(apellido)) {
            mensaje += "El apellido solo puede estar compuesto de letras.\n";
            correcto = false;
        }
    }


    /********  TELEFONO  ***************/

    if (telefono == null || telefono == "") {
        mensaje += "El campo telefono está en blanco.\n";
        correcto = false;
    } else {
        let tel_re = /^[\d]{9}$/;
        if (!tel_re.exec(telefono)) {
            mensaje += "Introduce número de 9 dígitos.\n";
            correcto = false;
        }
    }


    /********  EMAIL  ***************/

    if (email == null || email == "") {
        mensaje += "El campo email está en blanco.\n";
        correcto = false;
    } else {
        let ema_re = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/;
        if (!ema_re.exec(email)) {
            mensaje += "Cumpla con un formato valido.\n";
            correcto = false;
        }
    }


    /*********** PRIVACIDA ***************/

    if (!privacidad.checked) {
        mensaje += "Tiene que aceptar las condiciones de privacidad.\n";
        correcto = false;
    }

    if (correcto == true) {
        return true;
    } else {
        alert(mensaje);
        return false;
    }


};

let precioTotal = 0;
let productoSeleccionado = '';
const productoCategoria = document.getElementById("categoria");
const plazo = document.getElementById("plazo");
const extras = document.querySelectorAll("input[name='extras']");
const precioF = document.getElementById("precioF");

productoCategoria.addEventListener('change', (evt) => {
    const nameProducto = evt.target.value;
    // Cuando el producto aún no se ha seleccionado
    if (!productoSeleccionado) {
        productoSeleccionado = nameProducto;
        precioTotal += getPrecioProducto(nameProducto);
    } // Cuando el producto seleccionado es igual que el nuevo producto seleccionado no debe hacer nada
    else if (productoSeleccionado === nameProducto) return;
    // Cuando es distinto el precio debe actualizar, borrar el anterior y sumar el nuevo.
    else {
        const precioProductoAnterior = getPrecioProducto(productoSeleccionado);
        precioTotal -= precioProductoAnterior;
        productoSeleccionado = nameProducto; // Actualizar productoSeleccionado con el nuevo producto
        const precioProductoChange = getPrecioProducto(nameProducto);
        precioTotal += precioProductoChange;
    }
    actualizarExtrasPrecio(); // Recalcular extras
    actualizarPrecioFinal(); // Actualizar precio total mostrado
});

plazo.addEventListener('change', (evt) => {
    actualizarPrecioFinal(); // Recalcular y mostrar precio con descuento
});

extras.forEach((checkbox) => {
    checkbox.addEventListener('change', (evt) => {
        actualizarExtrasPrecio();
        actualizarPrecioFinal();
    });
});

function actualizarExtrasPrecio() {
    extrasPrice = 0;
    extras.forEach((checkbox) => {
        if (checkbox.checked) {
            extrasPrice += getPrecioExtra(checkbox.value);
        }
    });
}

function actualizarPrecioFinal() {
    let discount = 0;
    const plazo1 = parseInt(plazo.value);
    if (plazo1 > 0 && plazo1 <= 30) {
        discount = 0.05; // 5% de descuento para entregas dentro de 30 días
    } else if (plazo1 > 30 && plazo1 <= 60) {
        discount = 0.1; // 10% de descuento para entregas dentro de 60 días
    } else if (plazo1 > 60) {
        discount = 0.15; // 15% de descuento para entregas más allá de 60 días
    }
    const precioConExtras = precioTotal + extrasPrice;
    const precioDescuento = precioConExtras * discount;
    const precioFinal = precioConExtras - precioDescuento;
    precioF.value = `${precioFinal.toFixed(2)}`;
}

function getPrecioExtra(namePrecioExtra) {
    let precio = 0;
    if (namePrecioExtra === 'barba') precio = 5;
    if (namePrecioExtra === 'shampoo') precio = 3;
    if (namePrecioExtra === 'masaje') precio = 7;
    return precio;
}

function getPrecioProducto(nameProducto) {
    let precio = 0;
    if (nameProducto === 'clasico') precio = 20;
    if (nameProducto === 'degrado') precio = 25;
    if (nameProducto === 'skin') precio = 30;
    return precio;
}
