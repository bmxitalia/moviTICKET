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

  var percorso = window.localStorage.getItem("percorso_server");
    
  var azienda = "<strong>Azienda</strong>: " + codazienda;
    
  var utente =  "<strong>Utente</strong>: " + codutente;
   
  // Uploading data on the dynamic header 
  $("#codiceAzienda").html(azienda); 
    
  $("#codiceUtente").html(utente);
  
  // Sending data for office's list to the server using jQuery.$post 
  $.post("http://13.74.155.237:80/WebService/moviTicket/sedi.php", {codiceutente: codutente, path: percorso}).done(function(userSedi){
    
  // Start receiving data for office's list from the server via jquery ---  
    
      console.log("sedi relative = " + userSedi);    
      
      if(userSedi == 0){  // No matching
              
        navigator.notification.alert("Nessuna sede soddisfa la ricerca!", alertDismissed, "Informazione", "OK");
              
      }
              
      else{ 
              
        // data conversion
        var sedi = JSON.parse(userSedi);
      
        console.log("sedi trovate  = " + sedi.length);
              
        var returnData = "";
                
        if (sedi.length > 0){  // Matching
                
          returnData =  '<ul id="elencoSedi" class="table-view">';
           
          // DownLoad office's list information          
          for(var i = 0; i < sedi.length; i++){ 
          
            //returnData += '<li class="table-view-cell"><a class="navigate-right" data-ignore="push">' +  sedi[i].codicesede.toUpperCase() + ' | ' + sedi[i].descrizionesede.toUpperCase() + ' | ' + sedi[i].indirizzo.toLowerCase() + ' | ' + sedi[i].localita.toUpperCase() + ' | ' + sedi[i].provincia.toUpperCase() + '</li>';
             returnData += '<li class="table-view-cell"><a class="navigate-right" data-ignore="push"> <strong>Codice</strong>: ' +  sedi[i].codicesede.toUpperCase() + '<br/><strong>Descrizione</strong>: ' + sedi[i].descrizionesede.toUpperCase() + '<br/><strong>Indirizzo</strong>: ' + sedi[i].indirizzo.toLowerCase() + ', ' + sedi[i].localita.toUpperCase() + ' (' + sedi[i].provincia.toUpperCase() + ')</li>';

          }
                    
          returnData += '</ul>';
               
        } 
                          
        else{ 
                
          returnData += " Nessun risultato trovato"; 
               
        } 
           
        // UpLoad  office's list information          
        $("#elencoSedi").html(returnData);
        
        }
                     
  }, "json");
  
  // --- End receiving data for office's list from the server via jquery 
   
  $('#elencoSedi').on('click', 'li', function(){  // EventListener for office's list clcik


      var target = $(this).text();
      
      console.log("sede selezionata  = " + target);
                    
      var codsede = target.substr(9,5);
            
      console.log("sede selezionata  = " + codsede);
      
      // transmitting data to the local storage


        window.localStorage.setItem("codice_sede", codsede);
        window.location.href="apparati.html";  // User redirection




  });
  
   $('#search1').on('search', function(){  // EventListener for search1 form
          
      var codutente = window.localStorage.getItem("codice_utente");
      
      // Start cleaning of user-entered data ---  
         
      var searchd = $("#search1").val();
              
      var searchdt = $.trim(searchd);
              
      var searchdd = String(searchdt);
      
      var searchl = $("#search2").val();
              
      var searchlt = $.trim(searchl);
              
      var searchld = String(searchlt);
      
      // --- End cleaning of user-entered data
              // inizio istruzioni per la ricerca
      if(searchdd == ""){
      
        // Sending data for office's list filtering to the server using jQuery.$post     
        $.post("http://13.74.155.237:80/WebService/moviTicket/sedifilter.php", {codiceutente: codutente, descrizionesede: searchdd, localita: searchld, path: percorso}).done(function(userSedi){
    
  // Start receiving data for office's list filtering from the server via jquery ---
    
        console.log("sedi relative = " + userSedi);
        
        // data conversion
        var sedi = JSON.parse(userSedi);
      
        console.log("sedi trovate  = " + sedi.length);
              
        var returnData = "";
                
        if (sedi.length > 0){  // Matching
                
          returnData =  '<ul id="elencoSedi" class="table-view">';
          
          // DownLoad office's list filtered information         
          for(var i = 0; i < sedi.length; i++){ 
          
             returnData += '<li class="table-view-cell"><a class="navigate-right" data-ignore="push"> <strong>Codice</strong>: ' +  sedi[i].codicesede.toUpperCase() + '<br/><strong>Descrizione</strong>: ' + sedi[i].descrizionesede.toUpperCase() + '<br/><strong>Indirizzo</strong>: ' + sedi[i].indirizzo.toLowerCase() + ', ' + sedi[i].localita.toUpperCase() + ' (' + sedi[i].provincia.toUpperCase() + ')</li>';
                    
          }
                    
          returnData += '</ul>';
               
        } 
                          
        else{ 
                
          returnData += " Nessun risultato trovato"; 
               
        } 
        
        // UpLoad  office's list filtered information          
        $("#elencoSedi").html(returnData);
                     
        }, "json");
        
              
      }
           //se ricerca per descrizione non è vuoto
      else{
      
          // Sending data for office's list filtering to the server using jQuery.$post       
          $.post("http://13.74.155.237:80/WebService/moviTicket/sedifilter.php", {codiceutente: codutente, descrizionesede: searchdd, localita:searchld, path: percorso}).done(function(userSedi){
    
            console.log("sedi relative = " + userSedi);  
            
            if(userSedi == 0){  // No matching
              
              navigator.notification.alert("Nessuna sede soddisfa la ricerca!", alertDismissed, "Informazione", "OK");
              
            }
              
            else{ 
            
              // data conversion
              var sedi = JSON.parse(userSedi);
      
              console.log("sedi trovate  = " + sedi.length);
              
              var returnData = "";
                
              if (sedi.length > 0){  // Matching
                
                returnData =  '<ul id="elencoSedi" class="table-view">';
                
                // DownLoad office's list filtered information   
                for(var i = 0; i < sedi.length; i++){ 
          
             returnData += '<li class="table-view-cell"><a class="navigate-right" data-ignore="push"> <strong>Codice</strong>: ' +  sedi[i].codicesede.toUpperCase() + '<br/><strong>Descrizione</strong>: ' + sedi[i].descrizionesede.toUpperCase() + '<br/><strong>Indirizzo</strong>: ' + sedi[i].indirizzo.toLowerCase() + ', ' + sedi[i].localita.toUpperCase() + ' (' + sedi[i].provincia.toUpperCase() + ')</li>';
                    
                }
                    
                returnData += '</ul>';
               
              } 
                          
              else{ 
                
                returnData += " Nessun risultato trovato"; 
               
              } 
              
              // UpLoad  office's list filtered information   
              $("#elencoSedi").html(returnData);
              
            }
                     
          }, "json"); 
          
 // --- End receiving data for office's list filtering from the server via jquery
              
      } 
              
  });
          
  $('#search2').on('search', function(){   // EventListener for search2 form
          
      var codutente = window.localStorage.getItem("codice_utente");
      
      // Start cleaning of user-entered data ---   
        
      var searchl = $("#search2").val();
              
      var searchlt = $.trim(searchl);
              
      var searchld = String(searchlt);
      
      var searchd = $("#search1").val();
              
      var searchdt = $.trim(searchd);
              
      var searchdd = String(searchdt);
      
      // --- End cleaning of user-entered data
              
      if(searchld == ""){
      
        // Sending data for office's list filtering to the server using jQuery.$post        
        $.post("http://13.74.155.237:80/WebService/moviTicket/sedifilter.php", {codiceutente: codutente, descrizionesede: searchdd, localita: searchld, path: percorso}).done(function(userSedi){
  
  // Start receiving data for office's list filtering from the server via jquery ---
    
        console.log("sedi relative = " + userSedi);
         
        // data conversion      
        var sedi = JSON.parse(userSedi);
      
        console.log("sedi trovate  = " + sedi.length);
              
        var returnData = "";
                
        if (sedi.length > 0){  // Matching
                
          returnData =  '<ul id="elencoSedi" class="table-view">';
          
          // DownLoad office's list filtered information          
          for(var i = 0; i < sedi.length; i++){ 
          
             returnData += '<li class="table-view-cell"><a class="navigate-right" data-ignore="push"> <strong>Codice</strong>: ' +  sedi[i].codicesede.toUpperCase() + '<br/><strong>Descrizione</strong>: ' + sedi[i].descrizionesede.toUpperCase() + '<br/><strong>Indirizzo</strong>: ' + sedi[i].indirizzo.toLowerCase() + ', ' + sedi[i].localita.toUpperCase() + ' (' + sedi[i].provincia.toUpperCase() + ')</li>';
                    
          }
                    
          returnData += '</ul>';
               
        } 
                          
        else{ 
                
          returnData += " Nessun risultato trovato"; 
               
        } 
        
        // UpLoad  office's list filtered information           
        $("#elencoSedi").html(returnData);
                     
        }, "json");
              
      }
              
      else{
      
          // Sending data for office's list filtering to the server using jQuery.$post      
          $.post("http://13.74.155.237:80/WebService/moviTicket/sedifilter.php", {codiceutente: codutente, descrizionesede: searchdd, localita: searchld, path: percorso}).done(function(userSedi){
    
            console.log("sedi relative = " + userSedi);
            
            if(userSedi == 0){  // No matching
              
              navigator.notification.alert("Nessuna sede soddisfa la ricerca!", alertDismissed, "Informazione", "OK");
              
            }
              
            else{
            
              // data conversion
              var sedi = JSON.parse(userSedi);
      
              console.log("sedi trovate  = " + sedi.length);
              
              var returnData = "";
                
              if (sedi.length > 0){  // Matching
                
                returnData =  '<ul id="elencoSedi" class="table-view">';
                
                // DownLoad office's list filtered information      
                for(var i = 0; i < sedi.length; i++){ 
          
             returnData += '<li class="table-view-cell"><a class="navigate-right" data-ignore="push"> <strong>Codice</strong>: ' +  sedi[i].codicesede.toUpperCase() + '<br/><strong>Descrizione</strong>: ' + sedi[i].descrizionesede.toUpperCase() + '<br/><strong>Indirizzo</strong>: ' + sedi[i].indirizzo.toLowerCase() + ', ' + sedi[i].localita.toUpperCase() + ' (' + sedi[i].provincia.toUpperCase() + ')</li>';
                    
                }
                    
                returnData += '</ul>';
               
              } 
                          
              else{ 
                
                returnData += " Nessun risultato trovato"; 
               
              } 
              
              // UpLoad  office's list filtered information   
              $("#elencoSedi").html(returnData);   
              
            }
                     
          }, "json"); 
          
 // --- End receiving data for office's list filtering from the server via jquery ---
              
      }
            
  });
                              
}           
    
function alertDismissed() {
            
  return;
        
}

function checkPresenzaApparati(codice,percorso) {
    $.post("http://13.74.155.237:80/WebService/moviTicket/checkSede.php", {codicesede: codice, path: percorso}).done(function(check){
        if(check == 1){
            return true;
        }else{
            return false;
        }
    }, "json");
}

function resetSearch() {
    var prima = document.getElementById("search1");
    prima.value = "";
    var seconda = document.getElementById("search2");
    seconda.value = "";
    var codice = window.localStorage.getItem("codice_utente");
    var percorso = window.localStorage.getItem("percorso_server");
    $.post("http://13.74.155.237:80/WebService/moviTicket/sedi.php", {codiceutente: codice, path: percorso}).done(function(userSedi){

      // Start receiving data for office's list from the server via jquery ---

          console.log("sedi relative = " + userSedi);

          if(userSedi == 0){  // No matching

            navigator.notification.alert("Nessuna sede soddisfa la ricerca!", alertDismissed, "Informazione", "OK");

          }

          else{

            // data conversion
            var sedi = JSON.parse(userSedi);

            console.log("sedi trovate  = " + sedi.length);

            var returnData = "";

            if (sedi.length > 0){  // Matching

              returnData =  '<ul id="elencoSedi" class="table-view">';

              // DownLoad office's list information
              for(var i = 0; i < sedi.length; i++){

                //returnData += '<li class="table-view-cell"><a class="navigate-right" data-ignore="push">' +  sedi[i].codicesede.toUpperCase() + ' | ' + sedi[i].descrizionesede.toUpperCase() + ' | ' + sedi[i].indirizzo.toLowerCase() + ' | ' + sedi[i].localita.toUpperCase() + ' | ' + sedi[i].provincia.toUpperCase() + '</li>';
                 returnData += '<li class="table-view-cell"><a class="navigate-right" data-ignore="push"> <strong>Codice</strong>: ' +  sedi[i].codicesede.toUpperCase() + '<br/><strong>Descrizione</strong>: ' + sedi[i].descrizionesede.toUpperCase() + '<br/><strong>Indirizzo</strong>: ' + sedi[i].indirizzo.toLowerCase() + ', ' + sedi[i].localita.toUpperCase() + ' (' + sedi[i].provincia.toUpperCase() + ')</li>';

              }

              returnData += '</ul>';

            }

            else{

              returnData += " Nessun risultato trovato";

            }

            // UpLoad  office's list information
            $("#elencoSedi").html(returnData);

            }

      }, "json");
}


        
    