<?php   

header('content-type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$PATH = $_POST['path'];

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
                
// Interrogazione che restituisce le causali relative all'azienda di appartenenza dell'utente autenticato
$stmt5 = sqlsrv_query( $connessione, "Select codcausale, descausale From causali");

// Statement che verifica i risultati dell'interrogazione precedente, li inserisce in un array associativo e li invia alla parte logica dell'applicazione
while( $row5 = sqlsrv_fetch_array( $stmt5, SQLSRV_FETCH_ASSOC) ) {

  $causale[] = array("codicecausale" => $row5['codcausale'] , "descrizionecausale" => $row5['descausale']);

}          

echo json_encode($causale);

// Libera la risorsa utilizzata per la comunicazione con la base di dati MoviticketDB
sqlsrv_free_stmt($stmt5); 

// Libera la connessione con la base di dati MoviticketDB
sqlsrv_close($connessione); 

?>