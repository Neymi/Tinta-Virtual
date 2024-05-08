//Aquí están los models, primero el de bienvenida

function modalBienvenida() {
    document.getElementById("modalBienvenida").style.display="block";
    document.getElementById("tituloEncabezado").style.animationPlayState="paused";
    document.getElementById("subtituloEncabezado").style.animationPlayState="paused";
}

function cerrarModal() {
    document.getElementById("modalNewsletter").style.display="none";
    document.documentElement.style.overflowy="auto";
}

function cerrarMBB() {
    document.getElementById("modalBienvenida").style.display="none";
    document.getElementById("tituloEncabezado").style.animationPlayState="running";
    document.getElementById("subtituloEncabezado").style.animationPlayState="running";
    document.documentElement.style.overflowy="auto";
    setInterval(slideshowAnim, 5000);
    
}


//Y aquí el modal de la Newsletter

function modalNewsletter() {
    document.getElementById("modalNewsletter").style.display="block";
    document.documentElement.style.overflow="hidden";

    var nombre = document.getElementById("newsletterNombre").value;
    var telefono= document.getElementById("newsletterTelefono").value;
    var email = document.getElementById("newsletterCorreo").value;

    var mensaje;
    
    (function formCheck() {
        if(!document.getElementById("newsletterNombre").checkValidity()){
            mensaje ="Introduce un nombre correcto.";
        }
        else if (!document.getElementById("newsletterTelefono").checkValidity() || isNaN(telefono)){
            mensaje ="Introduce un número correcto.";
        }
        else if (!document.getElementById("newsletterCorreo").checkValidity()){
            mensaje ="Introduce un correo correcto.";
        }
        else{
            mensaje = "Apreciado/a " + nombre + ", te confirmamos que hemos registrado correctamente tu número de teléfono " + telefono + " y tu correo electronico " + email + " .";
        }
        
        document.getElementById("mensajeNewsletter").innerHTML = mensaje;

    })();

}


//Código para el carrousel de las Hero Image

var bgCounter=0;

function heroSlideshow() {
    var listaImgBg = [
        "url('img/fondo1.jpg')",
        "url('img/fondo2.jpg')",
        "url('img/fondo3.jpg')"
    ];

    bgCounter++;

    if  (bgCounter==listaImgBg.length){
        bgCounter = 0;
    }

    document.getElementById("encabezado").style.backgroundImage = "linear-gradient(rgba(240, 231, 229, 0.4), rgba(240, 231, 229, 0.4))," + listaImgBg[bgCounter];
}

var counterNext =0;
var counterMain =0;

function slideshowAnim() {
    var listaImBgAnim = document.getElementsByClassName("fondosHero");
    counterNext++;
    counterMain = counterNext-1;

    if(counterNext==listaImBgAnim.length) {
        counterNext =0;
    }

    if(counterMain <0) {
        counterMain= listaImBgAnim.length-1;
    }

    for (var i=0; i<listaImBgAnim.length; i++) {
        listaImBgAnim[i].classList.remove("nextSlide");
        listaImBgAnim[i].classList.remove("mainSlide");
        listaImBgAnim[i].classList.remove("hiddenSlide");

        if (i==counterNext) {
            listaImBgAnim[i].classList.add("nextSlide");
        }
        else if (i==counterMain) {
            listaImBgAnim[i].classList.add("mainSlide");
        }
        else {
            listaImBgAnim[i].classList.add("hiddenSlide");
        }
    }
}


//Código para el menú y el submenú

var posPreviaScroll = document.documentElement.scrollTop;

window.onscroll = function() {esconderMostrarMenu()};

function esconderMostrarMenu() {

    var posActualScroll = document.documentElement.scrollTop;

    if (posPreviaScroll>posActualScroll) {
        document.getElementById("navbar").style.top = "0";

        if (posActualScroll>200) {
            document.getElementById("navbar").style.height = "50px";
            document.getElementById("navbar").style.fontSize = "20px";
            document.getElementById("menu").style.lineHeight = "50px";
        }
        else {
            document.getElementById("navbar").style.height = "150px";
            document.getElementById("navbar").style.fontSize = "32px";
            document.getElementById("menu").style.lineHeight = "150px";
            
        }
    }
    else{

        if (posActualScroll<200) {
            document.getElementById("navbar").style.height = "50px";
            document.getElementById("navbar").style.fontSize = "20px";
            document.getElementById("menu").style.lineHeight = "50px";
        }
        else {
            document.getElementById("navbar").style.top = "-150px";
        }
    }

    posPreviaScroll = posActualScroll;
}

function marcarPestana(contenedorAMostrar, tabClicada) {

    var listaConPestanas = document.getElementsByClassName("contenedorLibros");

    for (var i=0; i<listaConPestanas.length; i++) {
        listaConPestanas[i].style.display="none";
    }

    document.getElementById(contenedorAMostrar).style.display="block";

    var tabLinks= document.getElementsByClassName("etiquetaPestanas");

    for (var i=0; i<tabLinks.length; i++) {
        tabLinks[i].classList.remove("pestanaActiva");
    }

    document.getElementById(tabClicada).classList.add("pestanaActiva")

    var libro= document.getElementsByClassName("libro");

    for (var i=0; i<libro.length; i++) {
        libro[i].classList.remove("libroAnimado");
    }

    var libroC = document.getElementById(contenedorAMostrar).children;

    for (var i=0; i<libroC.length; i++) {
        libroC[i].classList.add("libroAnimado");
    }

}

//Aqui empieza el código para la parte de "Novedades". 
//Primero tenemos el Ligthbox

var listaRutaImgGal = [];
var numeroIMG =0;


function readyLightbox() {
    var listaImgGal = document.getElementsByClassName("imagenLibro2");
    

    for (var i=0; i<listaImgGal.length; i++) {
        var imgTag = listaImgGal[i].getElementsByTagName('img')[0];
        listaRutaImgGal.push(imgTag.src);
    }

    for (var i=0; i<listaImgGal.length; i++) {
        listaImgGal[i].addEventListener('click', openLightbox);
    }

    function openLightbox(event) {
        var rutaImgClicada = event.currentTarget.getElementsByTagName('img')[0].src;
        numeroIMG = listaRutaImgGal.indexOf(rutaImgClicada)
        document.getElementById("imageToShow").innerHTML = "<img class='imageLightbox' src=" + listaRutaImgGal[numeroIMG] +">";
        document.getElementById("modalLightBoxG").style.display = "block";
        document.documentElement.style.overflow = 'hidden';
        closeLightbox();
    }

    function closeLightbox() {
        window.addEventListener("click", function(event) {
            if (!event.target.matches(".imageLightbox") && !event.target.matches(".imagenLibro2 img") && !event.target.matches(".lbButtons") && !event.target.matches(".fas")){
                document.getElementById("modalLightBoxG").style.display = "none";
                document.documentElement.style.overflowY = 'auto';
            }
        });

    }


}

function nextImgGal() {
    numeroIMG++;

    if (numeroIMG ==listaRutaImgGal.length){
        numeroIMG =0;
    }
    document.getElementById("imageToShow").innerHTML = "<img class='imageLightbox' src=" + listaRutaImgGal[numeroIMG] +">";
}

function prevImgGal() {
    numeroIMG--;

    if (numeroIMG < 0 ){
        numeroIMG = listaRutaImgGal.length-1;
    }
    document.getElementById("imageToShow").innerHTML = "<img class='imageLightbox' src=" + listaRutaImgGal[numeroIMG] +">";
}


//Y aquí está el código para el tooltip

function toolTip() {
    document.getElementById("imgMarina").title = 'Marina';
    document.getElementById("imgMujerDiosaReina").title = 'Mujer, Diosa, Reina';
    document.getElementById("imgVertigo").title = 'Vertigo';
    document.getElementById("imgHeartStopper").title = 'Heartstopper';
    document.getElementById("imgAlasDeHierro").title = 'Alas de Hierro';
}