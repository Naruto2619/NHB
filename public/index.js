var emailfield = document.getElementById("emailfield");
var signupbutt = document.getElementById("signup");
var newdiv  = document.createElement('div');
newdiv.setAttribute("id","usernamefield");

function showSign(){
    newdiv.innerHTML = `<br><div class="form-group">
<label for="exampleInputPassword1">Username</label>
<input type="text" class="form-control" id="username" name="username" placeholder="Username">
</div>`
    emailfield.insertAdjacentElement('afterend',newdiv);
    signupbutt.disabled=true;
}
function hideSign(){
    var unamefield = document.getElementById("usernamefield");
    unamefield.parentNode.removeChild(unamefield);
    signupbutt.disabled=false;
}
