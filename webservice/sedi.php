<?php   

header('content-type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');


// Acuisizione dati inseriti dall'utente
$UTENTE = $_POST['codiceutente'];  
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

               
// Interrogazione che restituisce le sedi relative all'azienda du cui fa parte l'utente autenticato 
$stmt = sqlsrv_query( $connessione, "Select S.codsede, S.dessede, S.indirizzo, S.localita, S.prov  From sedi as S inner join clienti as C on S.codcliente = C.codcliente Where C.codcliente = '$UTENTE'");

// Statements che verificano i risultati dell'interrogazione precedente, li inseriscono in un array associativo e li inviano alla parte logica dell'applicazione
if( $rows = sqlsrv_has_rows( $stmt )){

  while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {

  $userSedi[] = array("codicesede" => $row['codsede'] , "descrizionesede" => $row['dessede'] , "indirizzo" => $row['indirizzo'] , "localita" => $row['localita'], "provincia" => $row['prov']);

  } 
  
  
}else{
  $userSedi = 0;
}   

echo json_encode($userSedi);
      
// Libera la risorsa utilizzata per la comunicazione con la base di dati MoviticketDB
sqlsrv_free_stmt($stmt); 

// Libera la connessione con la base di dati MoviticketDB
sqlsrv_close($connessione); 

?>
