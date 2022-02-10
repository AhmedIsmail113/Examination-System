function setCookie(key,value,date){
    if(key && value){
        if(date){
        document.cookie = key+"="+value+";expires="+date;
        }else{
            document.cookie = key+"="+value+";";
        }
    }else{
        throw("pls set key and value");
    }
}

function getCookie(key){
    var data = document.cookie.split("; ");
    var result = "Not Found";
    for(var i = 0; i< data.length; i++){
        if(data[i].split("=")[0] == key)
            {
                result = data[i].split("=")[1].split(",")[0];
            }
    }
    return result;
}

function deleteCookie(key){
    var date = new Date("3-11-2000");
    if(getCookie(key) !== "Not Found"){
        setCookie(key,"Safawy",date);
    }
}

function hasCookie(key){
    if(getCookie(key) !== "Not Found"){
        return true;
    }else{
        return false;
    }
}

function allCookieList(){
    return document.cookie.split("; ");
}
    