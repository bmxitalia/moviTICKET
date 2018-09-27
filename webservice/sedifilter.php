<?php   

header('content-type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$PATH = $_POST['path'];

// Inizio acquisizione dati inseriti dall'utente ---

$UTENTE = $_POST['codiceutente']; 

$DESCRIZIONESEDE = $_POST['descrizionesede'];  

$LOCALITA = $_POST['localita'];  

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

// Inizio interrogazioni che restituiscono le sedi relative in funzione dei filtri utilizzati dall'utente ---

// 1) Caso in cui non sono stati specificati filtri
if($DESCRIZIONESEDE == "" and $LOCALITA == ""){

  $stmt3 = sqlsrv_query( $connessione, "Select S.codsede, S.dessede, S.indirizzo, S.localita, S.prov  From sedi as S inner join clienti as C on S.codcliente = C.codcliente Where C.codcliente = '$UTENTE'");

  if( $rows3 = sqlsrv_has_rows( $stmt3 )){

    while( $row3 = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_ASSOC) ) {

    $userSedi[] = array("codicesede" => $row3['codsede'] , "descrizionesede" => $row3['dessede'] , "indirizzo" => $row3['indirizzo'] , "localita" => $row3['localita'], "provincia" => $row3['prov']);

    } 
  
    echo json_encode($userSedi);
  
  }

  else{

    $userSedi = 0;

    echo json_encode($userSedi);

  }  

}


// 2) Caso in cui sono stati specificati filtri di tipo desrizioneSede
if($DESCRIZIONESEDE != "" and $LOCALITA ==""){
               
  $stmt3 = sqlsrv_query( $connessione, "Select S.codsede, S.dessede, S.indirizzo, S.localita, S.prov  From sedi as S inner join clienti as C on S.codcliente = C.codcliente Where C.codcliente = '$UTENTE' and S.dessede like '%$DESCRIZIONESEDE%'");

  if( $rows3 = sqlsrv_has_rows( $stmt3 )){

    while( $row3 = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_ASSOC) ) {

      $userSedi[] = array("codicesede" => $row3['codsede'] , "descrizionesede" => $row3['dessede'] , "indirizzo" => $row3['indirizzo'] , "localita" => $row3['localita'], "provincia" => $row3['prov']);
  
    }          

    echo json_encode($userSedi);

  }

  else{

    $userSedi = 0;

    echo json_encode($userSedi);

  }

}

// 3) Caso in cui sono stati specificati filtri di tipo localita
if($DESCRIZIONESEDE == "" and $LOCALITA != ""){

  $stmt3 = sqlsrv_query( $connessione, "Select S.codsede, S.dessede, S.indirizzo, S.localita, S.prov  From sedi as S inner join clienti as C on S.codcliente = C.codcliente Where C.codcliente = '$UTENTE' and S.localita like '%$LOCALITA%'");

  if( $rows3 = sqlsrv_has_rows( $stmt3 )){

    while( $row3 = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_ASSOC) ) {

      $userSedi[] = array("codicesede" => $row3['codsede'] , "descrizionesede" => $row3['dessede'] , "indirizzo" => $row3['indirizzo'] , "localita" => $row3['localita'], "provincia" => $row3['prov']);

    }          

    echo json_encode($userSedi);
  
  }
  
  else{

    $userSedi = 0;

    echo json_encode($userSedi);

  }

}

// 4) Caso in cui sono stati specificati filtri di tipo descrizioneSede e  localita
if($DESCRIZIONESEDE != "" and $LOCALITA != ""){

  $stmt3 = sqlsrv_query( $connessione, "Select S.codsede, S.dessede, S.indirizzo, S.localita, S.prov  From sedi as S inner join clienti as C on S.codcliente = C.codcliente Where C.codcliente = '$UTENTE' and S.dessede like '%$DESCRIZIONESEDE%' and S.localita like '%$LOCALITA%'");

  if( $rows3 = sqlsrv_has_rows( $stmt3 )){

    while( $row3 = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_ASSOC) ) {

      $userSedi[] = array("codicesede" => $row3['codsede'] , "descrizionesede" => $row3['dessede'] , "indirizzo" => $row3['indirizzo'] , "localita" => $row3['localita'], "provincia" => $row3['prov']);

    }          

    echo json_encode($userSedi);
  
  }
  
  else{

    $userSedi = 0;

    echo json_encode($userSedi);

  }

}

// --- Fine interrogazioni che restituiscono le sedi relative in funzione dei filtri utilizzati dall'utente ---

// Libera la risorsa utilizzata per la comunicazione con la base di dati MoviticketDB
sqlsrv_free_stmt($stmt3); 

// Libera la connessione con la base di dati MoviticketDB
sqlsrv_close($connessione); 

?>