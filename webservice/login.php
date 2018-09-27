<?php
  
header('content-type: text/html; charset=utf-8');  
header('Access-Control-Allow-Origin: *');


/* Inizializzazione dei parametri per la connessione al server principale(quello che contiene il CommonDB) */
$serverName = "vision.cloudapp.net,1500";
$connectionInfo = array( "Database"=>"mvt_CommonDB", "UID"=>"sa", "PWD"=>"Vision2015", "CharacterSet" => "UTF-8");

/* Avviamento della connessione con il server e selezione del CommonDB */
$connessione = sqlsrv_connect( $serverName, $connectionInfo);

$USERNAME = $_POST['username'];

$PASSWORD = $_POST['password']; 

//Esecuzione della query che identifica l'utente e restituisce gli estremi per la connessione al MoviticketDB 
$stmt = sqlsrv_query( $connessione, "Select A.Path, A.EmailA, U.EmailU  From Aziende as A inner join  Users as U on U.codazienda = A.codazienda Where U.UserName = '$USERNAME' and U.Password = '$PASSWORD' ");

// Statement che verifica i risultati dell'interrogazione precedente, li inserisce in un array associativo e li invia alla parte logica dell'applicazione
if( $rows = sqlsrv_has_rows( $stmt )){

  while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {

    $status[] = array("percorsoServer" => $row['Path'] , "emailAzienda" => $row['EmailA'] , "emailUtente" => $row['EmailU']);

  }

}else{

	$stmt = sqlsrv_query($connessione,"Select * from Users where UserName = '$USERNAME'");

	if( $rows = sqlsrv_has_rows( $stmt )){

  		$status = 1; //significa password errata
  	}else{
  		$status = 0; //significa username errata 
  	}
}

echo json_encode($status); //fornisco la risposta alla logica applicativa

// Libera la risosrsa utilizzata per l'autenticazione 
sqlsrv_free_stmt($stmt); 

// Libera la connessione con il server principale, ovvero il CommonDB 
sqlsrv_close($connessione);   
  
?>