var rgb = document.getElementById("rgb");
var type = document.getElementById("type");
var nuem =document.getElementById("nuem");
rgb.onclick = function(){
    window.location.href = "http://localhost:3000/rgb";
}
type.onclick = function(){
    window.location.href = "http://localhost:3000/typing";
}
nuem.onclick = function(){
    window.location.href = "http://localhost:3000/nummem";
}