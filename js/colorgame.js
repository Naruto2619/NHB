var colors=generaterand(6);
var life = 5;
var squares= document.getElementsByClassName('square');
var pickedcolor = generatecolor();
var message=document.getElementById('message');
var pick = document.getElementById('picked');
var head = document.getElementById('head');
var reset= document.querySelector("#reset");
reset.addEventListener("click", function() {
	colors=generaterand(6);
	pickedcolor = generatecolor();
	pick.textContent=colors[pickedcolor];
	for(var i=0;i<squares.length;i++)
		squares[i].style.backgroundColor=colors[i];
	head.style.backgroundColor="rgb(197, 57, 56)";
	message.textContent="";
	})
pick.textContent=colors[pickedcolor];
for(var i=0;i<squares.length;i++)
{
	squares[i].style.backgroundColor=colors[i];
	squares[i].addEventListener("click",function(){
	if(this.style.backgroundColor===colors[pickedcolor])
	{
		message.textContent="Correct";
		changeall(colors[pickedcolor]); 
	}
	else{
		if(life>1){
			life--;
			this.style.backgroundColor= "black";
			message.textContent="Try Again";
		}
		else{
			message.textContent="";
			document.getElementById("container").innerHTML="<br><br>game over";
			reset.disabled=true;
		}
	}
})
}
function changeall(rcolor){
	for(var i=0;i<squares.length;i++)
	{
		squares[i].style.backgroundColor=rcolor;
	}
	head.style.backgroundColor=rcolor;
} 
function generatecolor()
{
	return Math.floor(Math.random()*colors.length);
}
function generaterand(num){
	var arr=[];
	for(var i=0;i<num;i++)
	{
		var r = Math.floor(Math.random()*256);
		var g = Math.floor(Math.random()*256);
		var b = Math.floor(Math.random()*256);
		arr[i]="rgb("+r+", "+g+", "+b+")";
	}
	return arr;
}
