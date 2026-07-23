function mostrarmsj(){
    alert("hola, jvscript")
    console.log("gordo botoncin presionado")
}

function cambiarcolor(){
    alert("cambiando colorcito")
    console.log("colorcito")
    document.body.style.backgroundColor = "#ffcf4a"
}

function cambiartitulo(){
    const titulo = document.getElementById("titulin");
    titulo.textContent = "titulin cambiado // ejercicio3"
}

function sumarnumeros(){
    let a = 5
    let b = 3

    let resultado = a + b
    alert("la suma es: " + resultado) // pueden usarse template literals con '' en vez de "" para texto y ${variable} para variables
}

function validar(){
    let valor = document.getElementById("campo").value;
    if(valor === ""){
        alert("el campo no puede estar vacío")
    }
    else alert("texto ingresado correctamente")
}