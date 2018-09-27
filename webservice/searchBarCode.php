<?php   

header('content-type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$PATH = $_POST['path'];

$BARCODE = $_POST['codiceabarre'];    

//istruzioni per prelevare i parametri dalla path
list($srv, $db, $usr, $pwd) = explode(";", $PATH);
list($host,$port) = explode(":", $srv);
list($dbn,$dbName) = explode("=", $db);
list($usn,$uid) = explode("=", $usr);
list($pw,$pwdfinal) = explode("=", $pwd);
$serverName = $host.",".$port;
$connectionInfo = array( "Database"=>$dbName, "UID"=>$uid, "PWD"=>$pwdfinal, "CharacterSet" => "UTF-8");

/* Avviamento della connessione con il server e selezione del database dell'azienda */
$connessione = sqlsrv_connect( $serverName, $connectionInfo);               

// Interrogazione che restituisce l'apparato il cui barCode è uguale a quello scansionato dall'utente
$stmt8 = sqlsrv_query( $connessione, "Select codmodello, codmatricola From apparati Where barcode = '$BARCODE' ");

// Statements che verificano i risultati dell'interrogazione precedente, li inseriscono in un array associativo e li inviano alla parte logica dell'applicazione
if( $rows8 = sqlsrv_has_rows( $stmt8 )){

  while( $row8 = sqlsrv_fetch_array( $stmt8, SQLSRV_FETCH_ASSOC) ) {
  
    $BarCode[] = array("modello" => $row8['codmodello'] , "matricola" => $row8['codmatricola']);
  
  }          

  echo json_encode($BarCode);

}

else{

  $BarCode = 0;

  echo json_encode($BarCode);

}

// Libera la risorsa utilizzata per la comunicazione con la base di dati MoviticketDB
sqlsrv_free_stmt($stmt8);
 
// Libera la connessione con la base di dati MoviticketDB 
sqlsrv_close($connessione); 

?>
