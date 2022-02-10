var email = getCookie("Email");
var pass = getCookie("Pass");

var userEmail = document.getElementById("email");
var userPass = document.getElementById("password");

var emailDiv = document.getElementById("email-div");
var passDiv = document.getElementById("pass-div");

var emailError = document.createElement("label");
emailError.textContent = "This email isn't exist!.";

var passError = document.createElement("label");
passError.textContent = "Wrong password!."

var body = document.getElementById("container");

function logIn(e){
    e.preventDefault();
    if(userEmail.value !== email){
        emailDiv.appendChild(emailError);
    }else if(userPass.value !== pass){
        passDiv.appendChild(passError);
    }else{
        var c = 5;
        setInterval(function(){
            body.innerHTML = "<h1>The exam will start after "+ c +" seconds</h1>";
            c--;
            if(c < 0){
                clearInterval;
                window.location.replace("exam.html");
            }
        },1000);
        
    }
}
