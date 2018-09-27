// JavaScript Document
window.onload = onLoad;

function onLoad(){

  if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/))
  
      document.addEventListener("deviceready", onDeviceReady, false);
    
  else
  
      onDeviceReady();
    
}

function disableBack(){
	history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };
}

function off(){
    navigator.notification.alert("Non sei più connesso ad Internet! L'applicazione è inutilizzabile. Attendere la connessione o chiudere l'app.",null,"Errore");
}

document.addEventListener("offline", off, false);

function onDeviceReady(){

  disableBack();
  document.getElementById("send").style.display = "none";  // Button visible only to the complete written applications
            
  /* var networkState = navigator.connection.type;
              
     console.log(networkState);
            
     if((networkState == "none") || (networkState == "unknown")){
            
        navigator.notification.alert("Connessione ad Internet non disponibile!", alertDismissed, "Attenzione", "Ok");
              
  } */
  
  // Receiving data from local storage              
  var codazienda = window.localStorage.getItem("codice_azienda");
    
  var codutente = window.localStorage.getItem("codice_utente");
    
  var codsede = window.localStorage.getItem("codice_sede");
    
  var codmodello = window.localStorage.getItem("codice_modello");
    
  var codmatricola = window.localStorage.getItem("codice_matricola");
    
  var codcausale = window.localStorage.getItem("codice_causale");
    
  var descausale = window.localStorage.getItem("descrizione_causale");
    
  var emailAzienda = window.localStorage.getItem("email_azienda");
    
  var emailUtente = window.localStorage.getItem("email_utente");
    
  var emailSede = window.localStorage.getItem("email_sede");
    
  var azienda = "<strong>Azienda</strong>: " + codazienda;
    
  var utente = "<strong>Utente</strong>: " + codutente;
    
  var sede = "<strong>Sede</strong>: " + codsede;
    
  var modello = "<strong>Modello apparato</strong>: " + codmodello;
    
  var matricola = "<strong>Matricola apparato</strong>: " + codmatricola;
    
  var causale ="<strong>Causale</strong>: " + descausale;

  var percorsoserver = window.localStorage.getItem("percorso_server");

  // Uploading data on the dynamic header     
  $("#codiceAzienda").html(azienda); 
    
  $("#codiceUtente").html(utente);
    
  $("#codiceSede").html(sede);
    
  $("#codiceModello").html(modello);
    
  $("#codiceMatricola").html(matricola);
    
  $("#descrizioneCausale").html(causale);
 
  $('#send').on('click', function(){  // EventListener button send clcik
  
      // Receiving data from local storage           
      var codutente = window.localStorage.getItem("codice_utente");
    
      var codsede = window.localStorage.getItem("codice_sede");
    
      var codmodello = window.localStorage.getItem("codice_modello");
    
      var codmatricola = window.localStorage.getItem("codice_matricola");
    
      var codcausale = window.localStorage.getItem("codice_causale");
            
      var emailAzienda = window.localStorage.getItem("email_azienda");
            
      var emailSede = window.localStorage.getItem("email_sede");
            
      var emailUtente = window.localStorage.getItem("email_utente");
      
  // Start data preparation for sending the request to the server ---
               
      var codutente2 = String(codutente);
            
      console.log(codutente2);
    
      var codsede2 = String(codsede);
            
      console.log(codsede2);
    
      var codmodello2 = String(codmodello);
            
      console.log(codmodello2);
    
      var codmatricola2 = String(codmatricola);
            
      console.log(codmatricola2);
    
      var data = new Date();
      
      data.setTime(data.getTime()- (data.getTimezoneOffset() * 60000));
            
      var data2 = data.toISOString();
      
      var data3 = data2.substr(0,13);
      
      var data4 = data2.substr(14,2);
      
      var data5 = data2.substr(17);
      
      var data6 = String(data3 + data4 + data5);
            
      console.log(data2);
      
      console.log(data6);
    
      var codcausale2 = String(codcausale);
            
      console.log(codcausale2);
    
      var text = $("#text").val();
            
      var text2 = String(text);
            
      console.log(text2);
            
      var emailAzienda2 = String(emailAzienda);
            
      console.log(emailAzienda2);
            
      var emailSede2 = String(emailSede);
            
      console.log(emailSede2);
            
      var emailUtente2 = String(emailUtente);
            
      console.log(emailUtente2);
      
      var nameImage = codutente2 + codmatricola + data6;
      
      var nameImage2 = String(nameImage);
      
      console.log("nome immagine = " + nameImage2);
      
  // --- End data preparation for sending the request to the server 
  
      // Sending data for opening codes to the server using jQuery.$post         
      $.post("http://13.74.155.237:80/WebService/moviTicket/ticket.php", {codiceutente: codutente2, codicesede: codsede2, codicemodello: codmodello2, codicematricola: codmatricola2, datainserimento: data2, codicecausale: codcausale2, descrizioneguasto: text2, immagine: nameImage2, emailazienda: emailAzienda2, emailsede: emailSede2, emailutente: emailUtente2, path: percorsoserver}).done(function(status){
    
  // Start saving the image in the appropriate directory ---  
    
          console.log(status);
             
          if(status == 1){  // Macthing 
          
              var options = new FileUploadOptions();
    
              options.fileKey = "file";
    
              options.fileName = nameImage2;
    
              options.mimeType = "image/jpeg";
    
              var params = new Object();
              
              params.fileKey = "file"; 
        
              options.params = {};
              
              options.chunkedMode = false;
    
              var ft = new FileTransfer();
              
              // Sends the image to the server
              ft.upload(sPicData, "http://13.74.155.237:80/WebService/moviTicket/upload.php", win, fail, options);
                 
              navigator.notification.alert("Richiesta d'assistenza inviata correttamente!", chiudi, "Informazione", "OK");
             
          }
             
          else if(status == 0){  // No matching
              
              navigator.notification.alert("Richiesta d'assistenza fallita! Si prega di riprovare.", alertDismissed, "Informazione", "OK");
             
          }
                     
      }, "json");
      
  // --- End saving the image in the appropriate directory
       
  });
    
}

function chiudi(){
    location.replace("sedi.html");
}

function takephoto(){  // Function that handles the click of a photo
        
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,destinationType: Camera.DestinationType.DATA_URL});
        
}

        
function onSuccess(imageData) {  // Function that handles the image taken by the user
            
    var image = document.getElementById('myImage');
      
    image.src = "data:image/jpeg;base64," + imageData;
    
    sPicData = image.src;
    
    console.log(sPicData);
      
    /* document.getElementById("text1").innerHTML = imageData; */
      
    document.getElementById("send").style.display = "block";
        
}
    
function onFail(message) {  // Function that handles errors generated by the click of a photo

    navigator.notification.alert("Fallito per: "+ message, alertDismissed, "Errore", "OK");
    
}

                    
function alertDismissed() {
            
    return;
        
}

function win(r){  // Function that manages the information generated by a properly taking a picture

    console.log("Codice = " + r.responseCode);
    
    console.log("Esito = " + r.response);
    
    console.log("Inviati = " + r.bytesSent);

}

function fail(error){  // Function that manages the information generated by inaccurate taking a picture

    console.log("Codice d'errore = " + error.source);
    
    console.log("Causa dell'errore = " + error.target);

}



function takephoto2(){  // Function that handles the click of a photo
        
    navigator.camera.getPicture(onSuccess, onFail2, { quality: 50, destinationType: Camera.DestinationType.DATA_URL, sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM});
    
}
    
function onSuccess2(imageData){  // Function that handles the image taken by the user  
        
    var image = document.getElementById('myImage');
      
    window.localStorage.setItem("Immagine", image);
      
    image.src = "data:image/jpeg;base64," + imageData;
      
    /* document.getElementById("text1").innerHTML = imageData; */
      
    document.getElementById("send").style.display = "block";
    
}
        
function onFail2(message){  // Function that handles errors generated by the click of a photo

    navigator.notification.alert("Fallito per: " + message, alertDismissed, "Errore", "OK");
    
}

