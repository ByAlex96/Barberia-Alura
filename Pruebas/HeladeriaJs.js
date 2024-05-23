window.onload = function () {

    //Hacemos referencia a los objetos en el formulario.
    const selectElement = document.forms[0].categoria;

    //Accedemos a algunos objetos por su id.
    const container = document.getElementById("container");
    const container2 = document.getElementById("sabores");

    //El boton de envio.
    const sendButton = document.getElementById("send-button");

    const finish = document.getElementById("finish");

    //Utilizaremos dos eventos, cuando se envie el formulario
    sendButton.addEventListener('click', validate);

    finish.addEventListener('click', completarCompra);

    //Cuando se cambie el primer campo, la categoria, el elemento select
    selectElement.addEventListener('change', showProducts);

    product_list = [];
    var ids = 0;

    var elementos = document.forms[0].elements;

    function validate(e) {
        //Creamos nuestra funcion de validacion
        e.preventDefault();

        //Expresión regular para hallar espacios en blanco
        var patron = /^\s+/;
        var opciones = ["Chocolate", "Fresa", "Vainilla", "Mantecado", "Limón"];
        let categoria = elementos[0];
        //Eliminar espacios vacíos en el input de texto llamado sabor.
        let sabor = elementos[1].value.trim();

        var cantidad = elementos[2].value;
        //El sabor nuestro segundo campo no puede ser nulo, no puede tener longitud de 0, la tercera condicion indica que no pueden ser solo espacios vacios

        if (categoria.selectedIndex == 0) {

            return false; //Cancela
        }
        else if (!opciones.includes(sabor)) {
            console.log("Opción inválida");

            return false; //No envía
        }
        //Condición: Si el sabor no es nulo, O escribimos algo O no colocamos solo espacios en blanco o mientras sea texto y no un número.
        else if (sabor == null || sabor.length == 0 || patron.test(sabor) || /\d+/.test(sabor)) {

            return false; //No envía

        } else if (cantidad == null || isNaN(cantidad) || cantidad <= 0 || cantidad > 99) {

            return false; //No envía

        } else {
            //Si todo sale bien, se añade un producto
            addProduct();
            //e.preventDefault();
        }
        //Cambiar el estilo CSS de la lista de productos
        if (product_list.length > 0) {
            finish.style.display = "block";
        }
    }

    function showProducts() {
        if (selectElement.value == "Helado") {
            container2.textContent = "Chocolate (14.0), Vainilla (12.0), Fresa (9.98), Limón (6.0), Mantecado (7.5)";
        }
        else if (selectElement.value == "Torta") {
            container2.textContent = "Chocolate (14.0), Vainilla (12.0), Fresa (9.98), Limón (6.0)";
        }
    }

    function addProduct() {
        //event.preventDefault(); 
        var id = ids;
        let sabor = elementos[1].value.trim();
        var categoria = elementos[0].value;
        var size = document.forms[0].size.value;

        var c1 = document.getElementById("mani");
        var c2 = document.getElementById("chocolate");
        var c3 = document.getElementById("chispas");
        var c4 = document.getElementById("leche");

        var complementos = [c1, c2, c3, c4];

        var producto = new Producto(id, categoria, sabor, elementos[2].value, size, complementos);
        console.log(producto.id);
        ids += 1;

        //Crear un div vacío
        const element = document.createElement('div');
        //añadir la clase card al elemento creado
        element.className = "card";

        //Siempre colocar este par de comillas especiales ` `
        element.innerHTML =
            `<p>
            <strong>${categoria} de ${producto.sabor}</strong>
            <br>
            Cantidad: ${producto.cantidad}   
            Precio: ${producto.precio}   
            Complementos: ${producto.extras} 4 c/u
            Total a pagar: ${producto.getTotal()}
        </p>
        <input type="button" class="button" name="delete" value="Eliminar">
        `;

        //Añadir elemento en la pantalla
        container.appendChild(element);

        //Añadir un nuevo producto a la lista interna del programa
        product_list.push(producto);

        //Borrar el formulario
        document.forms[0].reset();

        //Mostrar la lista de producto
        console.log(product_list);

        //Esta función se añadió para evitar un error y clicks infinitos
        container.removeEventListener("click", deleteProduct);

        container.addEventListener("click", function (e) {
            console.log(e.target + ": " + e.target.name + " " + producto.id);
            if (e.target.name === 'delete') {
                deleteProduct(e.target, producto.id);
            } else {
                return;
            }
        });

        return false;
    }

    //Calcular el monto total de la compra
    function completarCompra() {
        var total = 0;
        for (i = 0; i < product_list.length; i++) {
            console.log(product_list[i]);
            total += product_list[i].getTotal();
        }
        alert("Monto total a pagar: " + total);
    }


    //Función para borrar un producto recibiendo su ID (numérico)
    function deleteProduct(element, id) {
        if (element.name === 'delete') {
            element.parentElement.remove();
            if (product_list.length > 0) {
                //console.log("Eliminado: "+ product_list[id].tipo +" de "+ product_list[id].sabor);
                product_list.splice(id, 1);
                ids -= 1;
            }
            console.log("Productos: " + product_list.length);
        } else {
            return;
        }
    }

    //Función producto, en realidad es como si crearamos un OBJETO
    function Producto(id, tipo, sabor, cantidad, size, complementos) {
        this.id = id;
        this.tipo = tipo;
        this.sabor = sabor;
        this.cantidad = cantidad;
        this.size = size;
        this.extras = "";

        console.log("ID: " + id);

        switch (sabor) {
            case "Chocolate":
                this.precio = 14.00;
                break;
            case "Vainilla":
                this.precio = 12.00;
                break;
            case "Fresa":
                this.precio = 9.98;
                break;
            case "Mantecado":
                this.precio = 7.50;
                break;
            case "Limón":
                this.precio = 6.0;
                break;
        }

        this.subtotal = this.cantidad * this.precio;

        var envase = 0;

        if (this.size == "pequeño") {
            envase += 2.00;
        }
        else if (this.size == "mediano") {
            envase += 5.00;
        } else {
            envase += 7.00;
        }

        var adicional = 0;

        for (var i = 0; i < complementos.length; i++) {
            if (complementos[i].checked == true) {
                adicional += 4.00;
                this.extras += complementos[i].value + ", ";
            }
        }

        this.getTotal = function () {
            var total = this.subtotal + envase + adicional;
            return total;
        }
        //LLave para cerrrar la función producto 
    }

    //Llave para cerrar el función del inicio
}