//progress bar
var progressBar = document.getElementById("progress-bar");
var progress = 0;
setInterval(function(){
    if(progressBar.style.width !== "100%"){
        progressBar.style.width = progress + "%";
        progress += 0.5;
    }else{
        clearInterval();
    }
},1500);

//Timer
var time = document.getElementById("time");
var timeProgressMinutes = "5";
var timeProgressSeconds = "00";
var t = 9;
time.textContent = timeProgressMinutes + ":" + timeProgressSeconds;
setInterval(function(){
    if(timeProgressMinutes >= 0){
        if(timeProgressSeconds !== "00"){
            if(timeProgressSeconds <= 10){
                    timeProgressSeconds = "0" + t;
                    t--;
            }else{
                timeProgressSeconds -= 1;
            }    
        }else{
            timeProgressMinutes--;
            timeProgressSeconds = "59";
            t = 9;
        }
        if(timeProgressMinutes != -1){
            time.textContent = timeProgressMinutes + ":" + timeProgressSeconds;
        }
        }else{
        clearInterval();
        var b = document.getElementsByTagName("body")[0];
        var container = "container";
        b.innerHTML = "<div class=" +container +"><h1>You missed the time.</h1></div>";
    }
},1000);

// Question object
function Question(body,a,b,c,d,correct){
    this.body = body;
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.correct = correct;
    this.selected = "";
    this.mark = false;
}
var questions = [new Question("Who is the president of US?","Parak Obama","Donald Tramp","George Bosh","Joe Bayden","d"),
new Question("The result of 1 + 3 = __","5","4","6","7","b"),
new Question("Which team has the most African cup titels?","Ghana","Cameroon","Egypt","Tunisia","c"),
new Question("The result of 5 * 5 * 6 = __","150","125","175","200","a"),
new Question("What is the most used programming language in 2022","Python","C","C#","Java Script","d")];

//Shuffling the questions array
questions.sort(()=>Math.random() - 0.5);

//Setting Question
var questionBody = document.getElementById("question-body");
var lblA = document.getElementById("a-label");
var lblB = document.getElementById("b-label");
var lblC = document.getElementById("c-label");
var lblD = document.getElementById("d-label");

var allInputs = document.getElementsByTagName("input");

var markButton = document.getElementById("mark");

var previousButton = document.getElementById("previous");
var questionNumber = document.getElementById("question-number");
var nextButton = document.getElementById("next");

function setQuestion(x){
    questionBody.textContent = questions[x].body;
    lblA.textContent = questions[x].a;
    lblB.textContent = questions[x].b;
    lblC.textContent = questions[x].c;
    lblD.textContent = questions[x].d;
}

var currentQuestion = 0; //to select the question

setQuestion(0);

function saveSsolution(){
    for(var i = 0;i < allInputs.length; i++){
        if(allInputs[i].checked == true){
            questions[currentQuestion].selected = allInputs[i].id;
        }
    }
}


function resetInputs(){
    for(var i = 0; i < allInputs.length; i++){
        allInputs[i].checked = false;
    }
}


function restoreSolution(x){
    for(var i = 0; i < allInputs.length; i++){
        if(allInputs[i].id == x){
            allInputs[i].checked = true;
        }
    }
}
// Style
function design(){
    if(currentQuestion == 0){
        previousButton.style.opacity = 0.5;
    }else{
        previousButton.style.opacity = 1;
    }
    if(currentQuestion == questions.length-1){
        nextButton.style.opacity = 0.5;
    }else{
        nextButton.style.opacity = 1;
    }
    if(questions[currentQuestion].mark){
        markButton.style.opacity = 1;
    }else{
        markButton.style.opacity = 0.5;
    }
}
design();
//Next button
function next(){
    if(currentQuestion < questions.length-1){
        saveSsolution();
        currentQuestion++;
        var x = questions[currentQuestion].selected;
        if(x){
            restoreSolution(x);
        }else{
            resetInputs();
        }
        setQuestion(currentQuestion);
        questionNumber.textContent = currentQuestion+1;
    }else{
        saveSsolution();
    }
    design();
}

//Previous button

function previous(){
    if(currentQuestion > 0){
        saveSsolution();
        currentQuestion--;
        var x = questions[currentQuestion].selected;
        if(x){
            restoreSolution(x);
        }else{
            resetInputs();
        }
        setQuestion(currentQuestion);
        questionNumber.textContent = currentQuestion+1;
    }
    design();
}

//Mark Question
var markArea = document.getElementById("mrk-question");

function mark(){
    if(!questions[currentQuestion].mark){
        markButton.style.opacity = 1;
        var markDiv = document.createElement("div");
        markArea.appendChild(markDiv);
        var m = eval(currentQuestion + "+1");
        markDiv.textContent = "Question " + m;
        markDiv.setAttribute("class","mrk");
        markDiv.setAttribute("id",currentQuestion);
        markDiv.setAttribute("onclick","getMarkedQuestion(this.id);")
        questions[currentQuestion].mark = true;
    }else{
        markButton.style.opacity=0.8;
        var children = markArea.children;
        var child;
        questions[currentQuestion].mark = false;
        for(var i = 0; i < children.length; i++){
            child = children[i];
            if(child.id == currentQuestion){
                markArea.removeChild(child);
            }
       }
    }
}

function getMarkedQuestion(b){
    currentQuestion = b;
    var z = eval(currentQuestion + "+1");   
    questionNumber.textContent = z; 
    var x = questions[currentQuestion].selected;
    if(x){
        restoreSolution(x);
    }else{
        resetInputs();
    }
    setQuestion(currentQuestion);
    design();
}

//Submit
function isAllAnswered(){
    var c = 0;
    for(var i = 0;i < questions.length; i++){
        if(questions[i].selected){
            c++;
        }
    }
    if(c < 4){
        return false;
    }else{
        return true;
    }
}
function submit(){
    if(isAllAnswered()){
        submitProcess();
    }else{
        var confirm = window.confirm("You did not answer all the questions do u want to submit?");
        if(confirm){
            submitProcess();
        }
    }
}

function submitProcess(){
    var result = 0;
    var i = 0;
    do{
        if(questions[i].selected == questions[i].correct){
            result++;
        }
        i++;
    }while(i < questions.length); 
    var b = document.getElementsByTagName("body")[0];
    var container = "container";
    b.innerHTML = "<div class=" +container +"><h1>"+ getCookie("Fname")+" "+ getCookie("Lname")+" you got " + result +".</h1></div>";
}
