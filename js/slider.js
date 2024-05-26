completo = crear()
if (completo) {
    var indexValue = 1;
    showImg(indexValue);

    const izq = document.querySelector(".left");
    const dcha = document.querySelector(".right");

    izq.addEventListener("click", () => {
        showImg(indexValue += -1)

    })

    dcha.addEventListener("click", () => {
        showImg(indexValue += 1)

    })

    let array = document.querySelectorAll(".btn");

    array.forEach((item, index) => {
        item.addEventListener("click", (e) => {
            /*console.log(e.target.id.substr(-1));*/
            showImg(indexValue = e.target.id.substr(-1))

        })

    })
}
function showImg(foto) {


    var i;
    const galeria = document.querySelectorAll(".galeria");
    const slider = document.querySelectorAll(".btm-slides span");

    if (foto > galeria.length) {
        indexValue = 1;
    }
    if (foto < 1) {
        indexValue = galeria.length;
    }
    for (i = 0; i < galeria.length; i++) {
        galeria[i].style.display = "none";
    }
    for (i = 0; i < slider.length; i++) {
        slider[i].style.background = "rgba(255,255,255,0.1)";
    }
    galeria[indexValue - 1].style.display = "block";
    slider[indexValue - 1].style.background = "white";

}

function crear() {
    const slider = document.querySelector(".contenido")
    /*------ Flecha Izquierda ------*/
    let div = document.createElement('div')
    div.className = "sliders";
    div.className += " left";

    let span = document.createElement('span');
    span.className = "fa-sharp fa-solid fa-angle-left"
    div.append(span);
    slider.append(div)

    /*------ Flecha Derecha ------*/
    let div2 = document.createElement('div')
    div2.className = "sliders";
    div2.className += " right";

    let span2 = document.createElement('span');
    span2.className = "fa-sharp fa-solid fa-angle-right"
    div2.append(span2);
    slider.append(div2)

    /*------ Botones ------*/

    let div3 = document.createElement('div');
    div3.className = "btm-slides";
    slider.append(div3)

    const imagenes = document.querySelectorAll('.galeria');

    for (var i = 1; i <= imagenes.length; i++) {
        let span3 = document.createElement('span');
        span3.className = "btn";
        span3.id = "btn-" + i;
        div3.append(span3);
    }

    return true;
}
