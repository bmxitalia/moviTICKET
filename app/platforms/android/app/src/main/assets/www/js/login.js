// JavaScript Document
window.onload = onLoad;

function onLoad(){

  if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/))
  
      document.addEventListener("deviceready", onDeviceReady, false);
    
  else
  
      onDeviceReady();
    
}

function onDeviceReady(){   
            
  $('#btn1').on('click', function () {  // EventListener for btn1 button
            
  var networkState = navigator.connection.type;
              
  console.log(networkState);
            
  if((networkState == "none") || (networkState == "unknown")){  // Statement for CHECK the connection
            
      navigator.notification.alert("Connessione ad Internet non disponibile!", alertDismissed, "Attenzione", "OK");
              
  } 
            
  else{   
  
  // Start cleaning of user-entered data ---  
         
  var us = $("#textinput").val().toUpperCase();
            
  var usert = $.trim(us);
            
  var usert2 = String(usert);    
                                
  console.log("codice inserito dall'utente = " + usert2);
                                
  var pw = $("#passwordinput").val();
            
  var pwd = $.trim(pw);
            
  var pwd2 = String(pwd); 
            
  console.log("password inserita dall'utente = " + pwd2); 
           
  var codazienda = usert.substr(0,11);
                                
  console.log("azienda utente = " + codazienda);
            
  var userd = usert.substr(0,18);
                                
  console.log("codice autenticazione utente = " + userd);                   
                              
  var userl = usert.length;
            
  console.log("lunghezza stringa inserita dall'utente = " + userl);
            
  if(userl == "18"){
            
      var coduser = usert.substr(12);
              
      console.log("codice utente = " + coduser);
              
  }
            
  if(userl == "23"){
            
      var coduser = usert.substr(12, 6);
                                
      console.log("codice utente = " + coduser);
              
      var codsede = usert.substr(18);
              
      console.log("codice sede = " + codsede);
            
  }
            
  if(usert == "" && pwd == ""){
      navigator.notification.alert("Inserire nome utente e password!", alertDismissed, "Attenzione", "OK");
  }else if(usert == ""){
      navigator.notification.alert("Inserire il nome utente!", alertDismissed, "Attenzione", "OK");
  }else if(pwd == ""){
      navigator.notification.alert("Inserire la password!", alertDismissed, "Attenzione", "OK");
  }

  // --- End cleaning of user-entered data
            
  else{
  
  // Sending data to the server using jQuery.$post
            
      $.post("http://13.74.155.237:80/WebService/moviTicket/login.php", {username: usert2 , password: pwd2 }).done(function(status){
      
  // Start receiving data from the server via jquery ---
  
          if(status == "0"){
              navigator.notification.alert("Nome utente errato!", alertDismissed, "Autenticazione fallita", "OK");
          }else if(status == "1"){
              navigator.notification.alert("Password errata!", alertDismissed, "Autenticazione fallita", "OK");
          }else{
             
              console.log("status= " + status);
              
              // data conversion
              var utente = JSON.parse(status);
              
              console.log("Numero di utenti torvati  = " + utente.length); 

              if (utente.length > 0){

                  // DownLoad information
                  for(var i = 0; i < utente.length; i++){

                      var percorsoServer = utente[i].percorsoServer;
                
                      var emailAzienda = utente[i].emailAzienda;
                        
                      var emailUtente = utente[i].emailUtente;

                  }

              }

              console.log("Percorso Server = " + percorsoServer);

              console.log("Email dell'azienda = " + emailAzienda);

              console.log("Email dell'utente = " + emailUtente);
              
              // transmitting data to the local storage
              window.localStorage.setItem("percorso_server", percorsoServer);
              
              window.localStorage.setItem("email_azienda", emailAzienda);
              
              window.localStorage.setItem("email_utente", emailUtente);
              
              if(userl == "18"){  // The user has not set specifications on the office
              
                  console.log("status= " + status);
                     
                  window.localStorage.setItem("codice_azienda", codazienda);
                    
                  window.localStorage.setItem("codice_utente", coduser);
                        
                  window.location.href="sedi.html"; // User redirection                  
              
              }  
                   
              if(userl == "23"){  // The user has set specifications on the office
              
                  console.log("status= " + status);
               
                  window.localStorage.setItem("codice_azienda", codazienda);
                
                  window.localStorage.setItem("codice_utente", coduser);
                
                  window.localStorage.setItem("codice_sede", codsede);
                
                  window.location.href="apparati.html"; // User redirection                      
              
              } 
              
          }
                   
      }, "json"); 
      
  // --- End receiving data from the server via jquery 
               
    }   
            
    }
                
    });
           
}
    
function alertDismissed() {
           
    return;
        
}
        
    
