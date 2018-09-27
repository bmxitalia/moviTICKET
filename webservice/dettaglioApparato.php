<?php   

header('content-type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$PATH = $_POST['path'];

// Inizio acquisizione dati inseriti dall'utente ---

$CODMODELLO = $_POST['codicemodello'];
 
$CODMATRICOLA = $_POST['codicematricola']; 

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

// --- Fine acquisizione dati inseriti dall'utente

// Interrogazione che restituisce i dettagli relativi all'apparato selezionato dall'utente
$stmt6 = sqlsrv_query( $connessione, "Select  codmodello, codmatricola, desmodello, desmatricola, barcode, ubicazione, note  From apparati Where codmodello = '$CODMODELLO' and codmatricola = '$CODMATRICOLA' ");

// Statement che verifica i risultati dell'interrogazione precedente, li inserisce in un array associativo e li invia alla parte logica dell'applicazione
while( $row6 = sqlsrv_fetch_array( $stmt6, SQLSRV_FETCH_ASSOC) ) {

  $APPARATO[] = array("codicemodello" => $row6['codmodello'] ,"codicematricola" => $row6['codmatricola'] , "descrizionemodello" => $row6['desmodello'] , "descrizionematricola" => $row6['desmatricola'] , "codiceAbarre" => $row6['barcode'] , "ubicazioneApparato" => $row6['ubicazione'] , "noteApparato" => $row6['note']);

}          

echo json_encode($APPARATO);

// Libera la risorsa utilizzata per la comunicazione con la base di dati MoviticketDB
sqlsrv_free_stmt($stmt6); 

// Libera la connessione con la base di dati MoviticketDB
sqlsrv_close($connessione); 

?>
