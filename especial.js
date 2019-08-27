var form = document.getElementById("form-id");
var authSi = document.getElementById("si");
var authNo = document.getElementById("no");
var btn = document.getElementById("btn2");
validateAuth();


btn.onclick = function() {
    modal.style.display = "block";
}

document.getElementById("save").addEventListener("click",function(){
    console.log("Save");
    document.getElementById("enviar").value="save";
    document.getElementsByClassName("form-control").required=false;
    form.submit();
});

document.getElementById("logOut").addEventListener("click",function(){
    console.log("Log Out");
    document.getElementById("form-logOut").submit();
});

document.getElementById("new").addEventListener("click", function(){
    document.getElementById("enviar").value="new";
    form.submit();
});

function upperCase(element){    
    element.value = element.value.toString().toUpperCase();
}

function validateAuth(){
    if(authSi.checked){
        document.getElementById("submitButton").disabled=false;
    }else{
        document.getElementById("submitButton").disabled=true;
    }
}

function ValidateSingleInput(oInput,...files) {
    var _validFileExtensions = files;  
    
    if (oInput.type == "file") {
        var sFileName = oInput.value;
         if (sFileName.length > 0) {
            var blnValid = false;
            for (var j = 0; j < _validFileExtensions.length; j++) {
                var sCurExtension = _validFileExtensions[j];
                if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                    blnValid = true;
                    break;
                }
            }
             
            if (!blnValid) {
                alert("Formato incorrecto, las extensiones permitidas son: " + _validFileExtensions.join(", "));
                oInput.value = "";
                return false;
            }
        }
    }
    var fileSize = oInput.files[0].size/1000;
    if(fileSize > 5000){
        alert("El archivo excede el peso máximo");
        oInput.value = "";
        return false;
    }

    return true;
}