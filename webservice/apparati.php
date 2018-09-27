<?php   

header('Content-type: text/html; charset: utf-8');
header('Access-Control-Allow-Origin: *');

$PATH = $_POST['path'];

// Inizio acquisizione dei dati inseriti dall'utente ---

$SEDE = $_POST['codicesede'];  

$UTENTE = $_POST['codiceutente'];  

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

// --- Fine acquisizione dei dati inseriti dall'utente          

// Interrogazione che restituisce gli apparati relativi alla sede selezionata dall'utente
$stmt4 = sqlsrv_query( $connessione, "Select A.codmodello, A.codmatricola, A.desmodello, A.desmatricola, A.ubicazione, A.barcode, S.emailS From apparati as A inner join sedi as S on (A.codcliente = S.codcliente) AND (A.codsede = S.codsede) Where S.codsede ='$SEDE' and A.codcliente = '$UTENTE' order by codmodello, codmatricola");

// Statement che verifica i risultati dell'interrogazione precedente, li inserisce in un array associativo e li invia alla parte logica dell'applicazione
if( $rows4 = sqlsrv_has_rows( $stmt4 )){

  while( $row4 = sqlsrv_fetch_array( $stmt4, SQLSRV_FETCH_ASSOC) ) {

    $userApparati[] = array("codicemodello" => $row4['codmodello'] , "codicematricola" => $row4['codmatricola'] , "descrizionemodello" => $row4['desmodello'] , "descrizionematricola" => $row4['desmatricola'] , "ubicazione" => $row4['ubicazione'] , "codiceabarre" => $row4['barcode'] , "emailSede" => $row4['emailS']);

  }        

}else{

  $userApparati = 0;

}

echo json_encode($userApparati);

// Libera la risorsa utilizzata per la comunicazione con la base di dati MoviticketDB
sqlsrv_free_stmt($stmt4); 

// Libera la connessione con la base di dati MoviticketDB
sqlsrv_close($connessione); 

?>
