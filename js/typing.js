var header = $("#head")[0];
var input = $("#input")[0];
var generate = $("#generate")[0];
var sentencenum = 0;
var index = 0;
var time = 60;
var timer;
var correct=0;
var wrong = 0;
var wrongr = document.getElementById("wrongr");
var cor = $("#correct")[0];
var wro = $("#wrong")[0];
var scoreboard = $("#scoreboard")[0];
var gameover = document.getElementById("gameover");
var success = document.getElementById("success");
var sentences=["Topic sentences are similar to mini thesis",
 "statements Like a thesis statement She wondered ",
 "if the note had reached him She",
 "scolded herself for not handing it to",
 "him in person She trusted her friend",
 "but so much could happen She waited",
  "impatiently for word."
 ];
function start(){
$("#corr")[0].hidden=false;
$("#wron")[0].hidden=false;
scoreboard.style.right=0;
if(!timer) {
	timer = window.setInterval(function() { 
	end();
	}, 1000);
}
input.disabled=false;
var result = sentences[sentencenum].split(" ");
generate.textContent=sentences[sentencenum];	
	$("#start")[0].style.visibility="hidden";
$("#input").on("keypress",function(event){
	generate.style.color="white";
	if(sentencenum===7){
		generate.textContent="GREAT JOB";
		input.disabled=true;
		success.play();
	}
	if(event.which==32){
		checkword();
	}
	if(index===7){
		sentencenum++;
		result = sentences[sentencenum].split(" ");
		generate.textContent=sentences[sentencenum];
		index=0;
	}
});
function clearinput(){
	input.value="";
}
function checkword(){
	var val = input.value;
	val=val.replace(" ","");
	console.log(val,result[index]);
	if(val===result[index]){
		generate.style.color="green";
		index++;
		clearinput();
		correct++;
		cor.textContent=correct;
	}
	else{
		generate.style.color="red";
		wrong++;
		wro.textContent=wrong;
		wrongr.play();
		console.log(randomWords());
	}

}
function end(){
	if(time<=60)
		$("#timer")[0].textContent=time;
	if(time>10)
		time--;
	else if(time<=10 && time>0){
		$("#timer")[0].style.color="red";
		time--;
	}
	else{
		clearInterval(timer);
		input.disabled=true;
		input.value="";
		gameover.play();
		generate.textContent="GAME OVER";
	}
}
}
