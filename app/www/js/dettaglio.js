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
  /* var networkState = navigator.connection.type;
              
     console.log(networkState);
            
     if((networkState == "none") || (networkState == "unknown")){
            
        navigator.notification.alert("Connessione ad Internet non disponibile!", alertDismissed, "Attenzione", "Ok");
              
  } */ 
  
  // Receiving data from local storage   
  var codazienda = window.localStorage.getItem("codice_azienda");
    
  var codutente = window.localStorage.getItem("codice_utente");
    
  var codsede = window.localStorage.getItem("codice_sede");
    
  var codmodello= window.localStorage.getItem("codice_modello");
    
  var codmatricola = window.localStorage.getItem("codice_matricola");
     
  var codmodello2 = String(codmodello);
     
  var codmatricola2 = String(codmatricola);
    
  var azienda = "<strong>Azienda</strong>: " + codazienda;
    
  var utente = "<strong>Utente</strong>: " + codutente;
    
  var sede = "<strong>Sede</strong>: " + codsede;
    
  var modello = "<strong>Modello apparato</strong>: " + codmodello;
    
  var matricola = "<strong>Matricola apparato</strong>: " + codmatricola;

  var percorsoserver = window.localStorage.getItem("percorso_server");
  
  // Uploading data on the dynamic header   
  $("#codiceAzienda").html(azienda); 
    
  $("#codiceUtente").html(utente);
    
  $("#codiceSede").html(sede);
    
  $("#codiceModello").html(modello);
    
  $("#codiceMatricola").html(matricola);
  
  // Sending data for product's details to the server using jQuery.$post  
  $.post("http://13.74.155.237:80/WebService/moviTicket/dettaglioApparato.php", {codicemodello: codmodello2 , codicematricola: codmatricola2, path: percorsoserver }).done(function(APPARATO){
    
  // Start receiving data for product's detail from thes server via jquery ---  
  
      console.log("descrizione apparato = " + APPARATO);
      
      // data conversion        
      var apparato = JSON.parse(APPARATO);
      
      console.log("apparati trovati  = " + apparato.length);
            
      if (apparato.length > 0){
      
          // DownLoad product's detail information                  
          for(var i = 0; i < apparato.length; i++){ 
                    
              var descrizioneModello = "<strong>Descrizione modello</strong>: " +  apparato[i].descrizionemodello;
                        
              var descrizioneMatricola = "<strong>Descrizione matricola</strong>: " + apparato[i].descrizionematricola;
                        
              var codiceAbarre = "<strong>Codice a barre</strong>: " + apparato[i].codiceAbarre;
                        
              var ubicazioneApparato = "<strong>Ubicazione</strong>: " + apparato[i].ubicazioneApparato;
                        
              var noteApparato = "<strong>Note</strong>: " + apparato[i].noteApparato;
          }  
                    
      }
         
      // UpLoad product's detail information            
      $("#desModello").html(descrizioneModello);
    
      $("#desMatricola").html(descrizioneMatricola);
    
      $("#barCode").html(codiceAbarre);
    
      $("#ubicazione").html(ubicazioneApparato);
    
      $("#note").html(noteApparato);
                     
  }, "json");
  
  // --- End receiving data for product's detail from the server via jquery 
    
}
            
function alertDismissed() {
            
    return;
        
}
