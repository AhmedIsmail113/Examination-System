var fName = document.getElementById("Fname");
var lName = document.getElementById("Lname");
var email = document.getElementById("email");
var pass = document.getElementById("password");
var confirmedPass = document.getElementById("confirm-password");
var confirmDiv = document.getElementById("confirm-div");
var confirmError = document.createElement("label");
confirmError.textContent = "This password didn't match the password that entered before";
function signUp(e){
    e.preventDefault();
    if(pass.value !== confirmedPass.value){
        confirmDiv.appendChild(confirmError);
    }else{
        setCookie("Fname",fName.value);
        setCookie("Lname",lName.value);
        setCookie("Email",email.value);
        setCookie("Pass",pass.value);
        window.location.replace("logIn.html");
    }
}