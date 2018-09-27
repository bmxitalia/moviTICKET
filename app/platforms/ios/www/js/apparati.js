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

  /* var networkState = navigator.connection.type;
              
     console.log(networkState);
            
     if((networkState == "none") || (networkState == "unknown")){
            
        navigator.notification.alert("Connessione ad Internet non disponibile!", alertDismissed, "Attenzione", "Ok");
              
  } */
  disableBack();
  // Receiving data from local storage       
  var codazienda = window.localStorage.getItem("codice_azienda");
    
  var codutente = window.localStorage.getItem("codice_utente");
    
  var codsede = window.localStorage.getItem("codice_sede");

  var percorsoserver = window.localStorage.getItem("percorso_server");
    
  var azienda = "<strong>Azienda</strong>: " + codazienda;
    
  var utente = "<strong>Utente</strong>: " + codutente;
    
  var sede = "<strong>Sede</strong>: " + codsede;
  
  // Uploading data on the dynamic header     
  $("#codiceAzienda").html(azienda); 
    
  $("#codiceUtente").html(utente);
    
  $("#codiceSede").html(sede);
  
  // Sending data for product's list to the server using jQuery.$post      
  $.post("http://13.74.155.237:80/WebService/moviTicket/apparati.php", {codicesede: codsede, codiceutente: codutente, path: percorsoserver}).done(function(userApparati){
    
  // Start receiving data for product's list from the server via jquery ---      
    
      console.log("apparati relativi = " + userApparati);
              
      if(userApparati == 0){  // No matching

          navigator.notification.alert("Nessun apparato presente per la sede selezionata!", alertDismissed, "Informazione", "OK");
              
      }
              
      else{
      
          // data conversion        
          var apparati = JSON.parse(userApparati);
          
          console.log("apparati trovati  = " + apparati.length);
              
          var returnData = "";
                
          if (apparati.length > 0){  // Matching
                
              returnData =  '<ul id="elencoApparati" class="table-view">';
               
              // DownLoad product's list information   
              for(var i = 0; i < apparati.length; i++){
               
                  returnData += '<li class="table-view-cell"><a class="navigate-right"  data-ignore="push"><strong>Modello</strong>: ' + apparati[i].codicemodello + '<br/><strong>Matricola</strong>: ' + apparati[i].codicematricola + '<br/><strong>Descrizione modello</strong>: ' + apparati[i].descrizionemodello + '<br/><strong>Descrizione matricola</strong>: ' + apparati[i].descrizionematricola + '<br/><strong>Ubicazione</strong>: ' + apparati[i].ubicazione + '<br/><strong>Barcode</strong>: ' + apparati[i].codiceabarre + '</li>' ;
                        
                  var emailSede = apparati[0].emailSede;
                    
              }  
                    
              returnData += '</ul>';
               
          } 
          
          // UpLoad  product's list information      
          $("#elencoApparati").html(returnData); 
                     
          console.log("Email della sede selezionata = " + emailSede);  
          
          // transmitting data to the local storage       
          window.localStorage.setItem("email_sede", emailSede); 
               
      }    
                     
  }, "json");
  
  // --- End receiving data for product's list from the server via jquery   
    
  $('#elencoApparati').on('click', 'li', function(){  // EventListener for product's list clcik
            
      var target2 = $(this).text();
  
      console.log("apparato selezionato  = " + target2);
               
      var codmodello = target2.substring(9,target2.indexOf("Matricola:"));

      var partenza = target2.indexOf("Matricola:");
      partenza = partenza + 11;
            
      var codmatricola = target2.substring(partenza,target2.indexOf("Descrizione modello:"));
            
      console.log("codice modello selezionato = " + codmodello);
  
      console.log("codice matricola selezionato = " + codmatricola);
      
      // transmitting data to the local storage 
      window.localStorage.setItem("codice_modello", codmodello);
  
      window.localStorage.setItem("codice_matricola", codmatricola);
  
      window.location.href="dettaglioApparato.html";  // User redirection  
            
  });    
  
  $('#search').on('search', function(){  // EventListener for search form
          
      var codsede = window.localStorage.getItem("codice_sede");
      
      // Start cleaning of user-entered data ---     
          
      var searchdm = $("#search").val();
              
      var searchdmt = $.trim(searchdm);
              
      var searchudmd = String(searchdmt);
      
      var searchu = $("#search1").val();
              
      var searchut = $.trim(searchu);
              
      var searchud = String(searchut);
      
      var searchcb = $("#search2").val();
              
      var searchcbt = $.trim(searchcb);
              
      var searchcbd = String(searchcbt);
      
      // --- End cleaning of user-entered data
              
      if(searchudmd == ""){
      
        // Sending data for product's list filtering to the server using jQuery.$post      
        $.post("http://13.74.155.237:80/WebService/moviTicket/apparatifilter.php", {codicesede: codsede, codiceutente: codutente, descrizionemodello: searchudmd, ubicazione: searchud, barcode: searchcbd, path: percorsoserver}).done(function(userApparati){
    
  // Start receiving data for product's list filtering from the server via jquery ---    
    
        console.log("apparati relativi = " + userApparati);
        
        // data conversion      
        var apparati = JSON.parse(userApparati);
          
        console.log("apparati trovati  = " + apparati.length);
              
        var returnData = "";
                
        if (apparati.length > 0){  // Matching
                
          returnData =  '<ul id="elencoApparati" class="table-view">';
          
          // DownLoad product's list filtered information         
          for(var i = 0; i < apparati.length; i++){
               
                  returnData += '<li class="table-view-cell"><a class="navigate-right"  data-ignore="push"><strong>Modello</strong>: ' + apparati[i].codicemodello + '<br/><strong>Matricola</strong>: ' + apparati[i].codicematricola + '<br/><strong>Descrizione modello</strong>: ' + apparati[i].descrizionemodello + '<br/><strong>Descrizione matricola</strong>: ' + apparati[i].descrizionematricola + '<br/><strong>Ubicazione</strong>: ' + apparati[i].ubicazione + '<br/><strong>Barcode</strong>: ' + apparati[i].codiceabarre + '</li>' ;

            var emailSede = apparati[0].emailSede;
                    
          }  
                    
           returnData += '</ul>';
               
        } 
        
        // UpLoad  office's list filtered information          
        $("#elencoApparati").html(returnData); 
                     
        console.log("Email della sede selezionata = " + emailSede);  
        
        // transmitting data to the local storage         
        window.localStorage.setItem("email_sede", emailSede);  
                     
        }, "json");  
              
      }
              
      else{
      
          // Sending data for product's list filtering to the server using jQuery.$post       
          $.post("http://13.74.155.237:80/WebService/moviTicket/apparatifilter.php", {codicesede: codsede, codiceutente: codutente, descrizionemodello: searchudmd, ubicazione: searchud, barcode: searchcbd, path: percorsoserver}).done(function(userApparati){
    
              console.log("apparati relativi = " + userApparati);
              
              if(userApparati == 0){  // No matching
              
                  navigator.notification.alert("Nessun apparato soddisfa la ricerca!", alertDismissed, "Informazione", "OK");
              
              }
              
              else{
              
                  // data conversion
                  var apparati = JSON.parse(userApparati);
                  
                  console.log("apparati trovati  = " + apparati.length);
              
                  var returnData = "";
                
                  if (apparati.length > 0){  // Matching
                
                      returnData =  '<ul id="elencoApparati" class="table-view">';
                  
                      // DownLoad product's list filtered information 
                      for(var i = 0; i < apparati.length; i++){
                       
                  returnData += '<li class="table-view-cell"><a class="navigate-right"  data-ignore="push"><strong>Modello</strong>: ' + apparati[i].codicemodello + '<br/><strong>Matricola</strong>: ' + apparati[i].codicematricola + '<br/><strong>Descrizione modello</strong>: ' + apparati[i].descrizionemodello + '<br/><strong>Descrizione matricola</strong>: ' + apparati[i].descrizionematricola + '<br/><strong>Ubicazione</strong>: ' + apparati[i].ubicazione + '<br/><strong>Barcode</strong>: ' + apparati[i].codiceabarre + '</li>' ;
                        
                        var emailSede = apparati[0].emailSede;
                   
                      } 
                     
                      returnData += '</ul>';
                  } 
                  
                  // UpLoad  product's list filtered information
                  $("#elencoApparati").html(returnData); 
                     
                  console.log("Email della sede selezionata = " + emailSede); 
                   
                  // transmitting data to the local storage  
                  window.localStorage.setItem("email_sede", emailSede);  
                
              }   
                     
          }, "json");
          
 // --- End receiving data for product's list filtering from the server via jquery          
          
       } 
              
  });
             
  $('#search1').on('search', function(){  // EventListener for search1 form
          
      var codsede = window.localStorage.getItem("codice_sede");
      
      // Start cleaning of user-entered data ---
      
      var searchdm = $("#search").val();
              
      var searchdmt = $.trim(searchdm);
              
      var searchudmd = String(searchdmt);
      
      var searchu = $("#search1").val();
              
      var searchut = $.trim(searchu);
              
      var searchud = String(searchut);
      
      var searchcb = $("#search2").val();
              
      var searchcbt = $.trim(searchcb);
              
      var searchcbd = String(searchcbt);
      
      // --- End cleaning of user-entered data
              
      if(searchud == ""){
      
        // Sending data for product's list filtering to the server using jQuery.$post     
        $.post("http://13.74.155.237:80/WebService/moviTicket/apparatifilter.php", {codicesede: codsede, codiceutente: codutente, descrizionemodello: searchudmd, ubicazione: searchud, barcode: searchcbd, path: percorsoserver}).done(function(userApparati){
    
  // Start receiving data for product's list filtering from the server via jquery ---    
    
        console.log("apparati relativi = " + userApparati);
        
        // data conversion        
        var apparati = JSON.parse(userApparati);
          
        console.log("apparati trovati  = " + apparati.length);
              
        var returnData = "";
                
        if (apparati.length > 0){  // Matching
                
          returnData =  '<ul id="elencoApparati" class="table-view">';
          
          // DownLoad product's list filtered information        
          for(var i = 0; i < apparati.length; i++){
               
                  returnData += '<li class="table-view-cell"><a class="navigate-right"  data-ignore="push"><strong>Modello</strong>: ' + apparati[i].codicemodello + '<br/><strong>Matricola</strong>: ' + apparati[i].codicematricola + '<br/><strong>Descrizione modello</strong>: ' + apparati[i].descrizionemodello + '<br/><strong>Descrizione matricola</strong>: ' + apparati[i].descrizionematricola + '<br/><strong>Ubicazione</strong>: ' + apparati[i].ubicazione + '<br/><strong>Barcode</strong>: ' + apparati[i].codiceabarre + '</li>' ;
                        
            var emailSede = apparati[0].emailSede;
                    
          }  
                    
           returnData += '</ul>';
               
        } 
        
        // UpLoad  office's list filtered information         
        $("#elencoApparati").html(returnData); 
                     
        console.log("Email della sede selezionata = " + emailSede);
          
        // transmitting data to the local storage          
        window.localStorage.setItem("email_sede", emailSede);  
                     
        }, "json");
              
      }
              
      else{
      
          // Sending data for product's list filtering to the server using jQuery.$post      
          $.post("http://13.74.155.237:80/WebService/moviTicket/apparatifilter.php", {codicesede: codsede, codiceutente: codutente, descrizionemodello: searchudmd, ubicazione: searchud, barcode: searchcbd, path: percorsoserver}).done(function(userApparati){
    
              console.log("apparati relativi = " + userApparati);
              
              if(userApparati == 0){  // No matching
              
                  navigator.notification.alert("Nessun apparato soddisfa la ricerca!", alertDismissed, "Informazione", "OK");
              
              }
              
              else{
              
                  // data conversion
                  var apparati = JSON.parse(userApparati);
                  
                  console.log("apparati trovati  = " + apparati.length);
              
                  var returnData = "";
                
                  if (apparati.length > 0){  // Matching
                
                      returnData =  '<ul id="elencoApparati" class="table-view">';
                      
                      // DownLoad product's list filtered information 
                      for(var i = 0; i < apparati.length; i++){
                       
                  returnData += '<li class="table-view-cell"><a class="navigate-right"  data-ignore="push"><strong>Modello</strong>: ' + apparati[i].codicemodello + '<br/><strong>Matricola</strong>: ' + apparati[i].codicematricola + '<br/><strong>Descrizione modello</strong>: ' + apparati[i].descrizionemodello + '<br/><strong>Descrizione matricola</strong>: ' + apparati[i].descrizionematricola + '<br/><strong>Ubicazione</strong>: ' + apparati[i].ubicazione + '<br/><strong>Barcode</strong>: ' + apparati[i].codiceabarre + '</li>' ;
                        
                        var emailSede = apparati[0].emailSede;
                   
                      } 
                     
                      returnData += '</ul>';
                  } 
                  
                  // UpLoad  office's list filtered information  
                  $("#elencoApparati").html(returnData); 
                     
                  console.log("Email della sede selezionata = " + emailSede);
                    
                  // transmitting data to the local storage 
                  window.localStorage.setItem("email_sede", emailSede);  
                
              }   
                     
          }, "json");
          
  // --- End receiving data for product's list filtering from the server via jquery 
              
      } 
              
  });
          
  $('#search2').on('search', function(){  // EventListener for search2 form
          
      var codsede = window.localStorage.getItem("codice_sede");
      
      // Start cleaning of user-entered data ---
          
      var searchdm = $("#search").val();
              
      var searchdmt = $.trim(searchdm);
              
      var searchudmd = String(searchdmt);
      
      var searchu = $("#search1").val();
              
      var searchut = $.trim(searchu);
              
      var searchud = String(searchut);
      
      var searchcb = $("#search2").val();
              
      var searchcbt = $.trim(searchcb);
              
      var searchcbd = String(searchcbt);
      
      // --- End cleaning of user-entered data
              
      if(searchcbd == ""){
      
        // Sending data for product's list filtering to the server using jQuery.$post     
        $.post("http://13.74.155.237:80/WebService/moviTicket/apparatifilter.php", {codicesede: codsede, codiceutente: codutente, descrizionemodello: searchudmd, ubicazione: searchud, barcode: searchcbd, path: percorsoserver}).done(function(userApparati){
    
  // Start receiving data for product's list filtering from the server via jquery ---   
    
        console.log("apparati relativi = " + userApparati);
        
        // data conversion      
        var apparati = JSON.parse(userApparati);
          
        console.log("apparati trovati  = " + apparati.length);
              
        var returnData = "";
                
        if (apparati.length > 0){  // Matching
                
          returnData =  '<ul id="elencoApparati" class="table-view">';
          
          // DownLoad product's list filtered information         
          for(var i = 0; i < apparati.length; i++){
               
                  returnData += '<li class="table-view-cell"><a class="navigate-right"  data-ignore="push"><strong>Modello</strong>: ' + apparati[i].codicemodello + '<br/><strong>Matricola</strong>: ' + apparati[i].codicematricola + '<br/><strong>Descrizione modello</strong>: ' + apparati[i].descrizionemodello + '<br/><strong>Descrizione matricola</strong>: ' + apparati[i].descrizionematricola + '<br/><strong>Ubicazione</strong>: ' + apparati[i].ubicazione + '<br/><strong>Barcode</strong>: ' + apparati[i].codiceabarre + '</li>' ;
                        
            var emailSede = apparati[0].emailSede;
                    
          }  
                    
           returnData += '</ul>';
               
        } 
        
        // UpLoad  office's list filtered information         
        $("#elencoApparati").html(returnData); 
                     
        console.log("Email della sede selezionata = " + emailSede); 
         
        // transmitting data to the local storage        
        window.localStorage.setItem("email_sede", emailSede);  
                     
        }, "json");
              
      }
              
      else{
      
          // Sending data for product's list filtering to the server using jQuery.$post     
          $.post("http://13.74.155.237:80/WebService/moviTicket/apparatifilter.php", {codicesede: codsede, codiceutente: codutente, descrizionemodello: searchudmd, ubicazione: searchud, barcode: searchcbd, path: percorsoserver}).done(function(userApparati){
    
              console.log("apparati relativi = " + userApparati);
              
              if(userApparati == 0){  // No matching
              
                  navigator.notification.alert("Nessun apparato soddisfa la ricerca!", alertDismissed, "Informazione", "OK");
              
              }
              
              else{
              
                  // data conversion
                  var apparati = JSON.parse(userApparati);
              
                  console.log("apparati trovati  = " + apparati.length);
              
                  var returnData = "";
                
                  if (apparati.length > 0){  // Matching
                
                  returnData =  '<ul id="elencoApparati" class="table-view">';
                  
                  // DownLoad product's list filtered information 
                  for(var i = 0; i < apparati.length; i++){
                   
                  returnData += '<li class="table-view-cell"><a class="navigate-right"  data-ignore="push"><strong>Modello</strong>: ' + apparati[i].codicemodello + '<br/><strong>Matricola</strong>: ' + apparati[i].codicematricola + '<br/><strong>Descrizione modello</strong>: ' + apparati[i].descrizionemodello + '<br/><strong>Descrizione matricola</strong>: ' + apparati[i].descrizionematricola + '<br/><strong>Ubicazione</strong>: ' + apparati[i].ubicazione + '<br/><strong>Barcode</strong>: ' + apparati[i].codiceabarre + '</li>' ;
                        
                      var emailSede = apparati[0].emailSede;
                    
                  } 
                   
                  returnData += '</ul>';
                  
                  } 
                  
                  // UpLoad  office's list filtered information 
                  $("#elencoApparati").html(returnData); 
                     
                  console.log("Email della sede selezionata = " + emailSede);
                    
                  // transmitting data to the local storage
                  window.localStorage.setItem("email_sede", emailSede); 
                
              }    
                     
          }, "json");
          
  // --- End receiving data for product's list filtering from the server via jquery           
              
      }
            
  });
  
$('#scan').on('click', function(){  // EventListener for scan button

  cordova.plugins.barcodeScanner.scan(

     function(result){

        if(result.cancelled == true){
            navigator.notification.alert("Scansione cancellata dall'utente!", alertDismissed, "Informazione", "OK");
        }else{


            var barcode = result.text;

            var barcoded = String(barcode);

            console.log("barcode = " + barcoded);

            // Sending data for barCode scanning to the server using jQuery.$post
            $.post("http://13.74.155.237:80/WebService/moviTicket/searchBarCode.php", {codiceabarre: barcoded, path: percorsoserver}).done(function(BarCode){

      // Start receiving data for barCode scanning from the server via jquery ---

                  console.log("Elemento trovato = " + BarCode);

                  if(BarCode == 0){  // No matching

                      navigator.notification.alert("Nessun apparato presenta il codice a barre scansionato!", alertDismissed, "Informazione", "OK");

                  }

                  else{

                    // data conversion
                    var barCode = JSON.parse(BarCode);

                    console.log("apparati trovati  = " + barCode.length);

                    if (barcode.length > 0){  // Matching

                      // DownLoad scan filtered information
                      for(var i = 0; i < barcode.length; i++){

                        var codmodello = "" + barCode[i].modello;

                        var codmatricola = "" +  barCode[i].matricola;

                        // transmitting data to the local storage
                        window.localStorage.setItem("codice_modello", codmodello);

                        window.localStorage.setItem("codice_matricola", codmatricola);

                        // User redirection
                        window.location.href="dettaglioApparato.html";

                      }

                    }

                  }

              }, "json");

      // --- End receiving data for barCode scanning from the server via jquery
        }
    },
        
    function(error){  // Error 
    
      navigator.notification.alert("Scansione fallita: " + error, alertDismissed, "Errore", "OK");
      
    },
    {
        preferFrontCamera : false, // iOS and Android
        showFlipCameraButton : false, // iOS and Android
        showTorchButton : true, // iOS and Android
        torchOn: false, // Android, launch with the torch switched on (if available)
        saveHistory: true, // Android, save scan history (default false)
        prompt : "Centra il codice a barre o il QR dentro l'area di rilevamento.", // Android
        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
        formats : "EAN_13,QR_CODE,EAN_8,CODE_39,UPC_A,UPC_E", // default: all but PDF_417 and RSS_EXPANDED
        orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
        disableAnimations : true, // iOS
        disableSuccessBeep: false // iOS and Android
    }
    
  );
  
});
          
}
    
function alertDismissed() {

    return;
        
}

function resetSearchApparati() {
    var codutente = window.localStorage.getItem("codice_utente");
        var codsede = window.localStorage.getItem("codice_sede");
        var percorsoserver = window.localStorage.getItem("percorso_server");

        $.post("http://13.74.155.237:80/WebService/moviTicket/apparati.php", {codicesede: codsede, codiceutente: codutente, path: percorsoserver}).done(function(userApparati){

          // Start receiving data for product's list from the server via jquery ---

              console.log("apparati relativi = " + userApparati);

              if(userApparati == 0){  // No matching

                  navigator.notification.alert("Nessun apparato presente per la sede selezionata!", alertDismissed, "Informazione", "OK");

              }

              else{

                  // data conversion
                  var apparati = JSON.parse(userApparati);

                  console.log("apparati trovati  = " + apparati.length);

                  var returnData = "";

                  if (apparati.length > 0){  // Matching

                      returnData =  '<ul id="elencoApparati" class="table-view">';

                      // DownLoad product's list information
                      for(var i = 0; i < apparati.length; i++){

                          returnData += '<li class="table-view-cell"><a class="navigate-right"  data-ignore="push"><strong>Modello</strong>: ' + apparati[i].codicemodello + '<br/><strong>Matricola</strong>: ' + apparati[i].codicematricola + '<br/><strong>Descrizione modello</strong>: ' + apparati[i].descrizionemodello + '<br/><strong>Descrizione matricola</strong>: ' + apparati[i].descrizionematricola + '<br/><strong>Ubicazione</strong>: ' + apparati[i].ubicazione + '<br/><strong>Barcode</strong>: ' + apparati[i].codiceabarre + '</li>' ;

                          var emailSede = apparati[0].emailSede;

                      }

                      returnData += '</ul>';

                  }

                  // UpLoad  product's list information
                  $("#elencoApparati").html(returnData);

                  console.log("Email della sede selezionata = " + emailSede);

                  // transmitting data to the local storage
                  window.localStorage.setItem("email_sede", emailSede);

              }

          }, "json");
    var prima = document.getElementById("search");
    prima.value = "";
    var seconda = document.getElementById("search1");
    seconda.value = "";
}



