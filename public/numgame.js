var start = document.getElementById("start");
var display = document.getElementById("disnum");
var progress = document.getElementById("progress");
var bar = document.getElementById("bar");
var reset = 0;
var input = document.getElementById("input");
var actual = document.getElementById("actual");
var butt = document.getElementById("butt");
var w = 100;
var level=1;
function begin(){
	start.style.visibility = "hidden";
	actual.style.visibility = "visible";
	w=100;
	input.disabled=true;
	var res = generate(level);
	display.style.visibility="visible";
	display.textContent=res;
	progress.style.visibility="visible";
	var timer = 10*(level+1);
	if(reset==0){
		var id = setInterval(fill,timer);
		function fill(){
		if(w<=0){
			clearInterval(id);
			display.style.visibility="hidden";
			input.disabled=false;
			progress.style.visibility="hidden";
			butt.style.visibility="visible";
			reset=0;
		}
		else{
			w--;
			input
			bar.style.width=w+"%";
		}
	}
	}

}
function generate(limit){
	var upper = Math.pow(10,limit);
	var val = Math.floor(Math.random()*upper);
	return val;
}
function check(){

	if(parseInt(display.textContent)===parseInt(input.value)){
		input.value="";
		level++;
		begin();
	}
	else{
		start.style.visibility="hidden";
		input.style.visibility="hidden";
		butt.style.visibility="hidden";
		container.innerHTML=`<h1>GAME OVER</h1><br><br><h3>Your High Score ${level}
		</h3>
		<div id = "nav">
		<button type="button" class="btn btn-outline-warning"><a href ="/" style = "color:black;text-decoration:none">Go To Home Page</a></button>
		<button type="button" class="btn btn-outline-danger"><a href ="/" style = "color:black;text-decoration:none">Retry</a></button>
		</div>`
	}

}