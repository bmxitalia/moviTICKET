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
    
  var codmodello = window.localStorage.getItem("codice_modello");
    
  var codmatricola = window.localStorage.getItem("codice_matricola");
    
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
  
  // Sending data for opening codes to the server using jQuery.$post   
  $.post("http://13.74.155.237:80/WebService/moviTicket/causale.php", {path: percorsoserver}).done(function(causale){
  
  // Start receiving data for opening codes from the server via jquery --- 
    
      console.log("causali aziendali = " + causale);
      
       // data conversion         
      var causali = JSON.parse(causale);
      
      console.log("causali trovate  = " + causali.length);
              
      var returnData = "";
      
      // DownLoad opening codes information            
      if (causali.length > 0){
                
          returnData =  '<ul id="elencoCausali" class="table-view">';
                  
          for(var i = 0; i < causali.length; i++){ 
                       
              returnData += '<li class="table-view-cell"><a class="navigate-right"  data-ignore="push"><strong>Codice</strong>: ' + causali[i].codicecausale + '<br/><strong>Descrizione</strong>: ' + causali[i].descrizionecausale + '</li>' ;
                    
          }
                    
          returnData += '</ul>';
                
      } 
                
      else{ 
                
          returnData += " Nessun risultato trovato"; 
               
      } 
       
      // UpLoad opening codes information          
      $("#elencoCausali").html(returnData); 
                     
  }, "json");
  
  // --- End receiving data for office's list from the server via jquery   
   
  $('#elencoCausali').on('click', 'li', function(){  // EventListener for opening codes clcik
            
      var target = $(this).text();
                    
      var codcausale = target.substring(8,target.indexOf("Descrizione:"));
                    
      var descausale = target.substr(target.indexOf("Descrizione:")+13, target.length);
            
      console.log("codice causale selezionato = " + codcausale)
            
      console.log("causale selezionata  = " + descausale);
      
      // transmitting data to the local storage                 
      window.localStorage.setItem("codice_causale", codcausale);        
            
      window.localStorage.setItem("descrizione_causale", descausale);
           
      window.location.href="assistenza.html";  
           
  });
            
}
                  
function alertDismissed() {
            
    return;
        
}
