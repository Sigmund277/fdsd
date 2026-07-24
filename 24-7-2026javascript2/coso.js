function validaredad(){
    if(document.getElementById("edad").value >= 18){
        alert("sos mayor de edad")
    }
    else{
        alert("sos menor de edad")
    }
}
function verificarclave(){
    let clavecorrecta = "1234"
    let clave = document.getElementById("clave").value

    if(clave === clavecorrecta){
        alert("acceso permitido")
    }
    else{
        alert("acceso denegado")
        for(let i = 0; i<99; i++){
            alert("protocolo protocolo")
        }
    }
}
function aplicarcolor(){
    let color = document.getElementById("color")
    let colorelegido = color.value
    document.body.style.backgroundColor = colorelegido;
}
function evaluarnota(){
    let nota = document.getElementById("nota").value;
    if(nota >= 6 & nota <= 10){
        alert("aprobado")
    }
    else if(nota <=5){
        alert("chancho mamon desaprobado")
    }
    else{
        alert("pon un numerito como la gente infame depravado")
    }
}
function mostrarsaludo(){
    let hora = new Date().getHours()
    if(hora >= 6 && hora <= 12){
        alert("buenos días")
    }
    else if(hora >= 13 && hora <= 19){
        alert("buenas tardes")
    }
    else if(hora >=20 || hora <= 5){
        alert("buenas noches")
    }
}