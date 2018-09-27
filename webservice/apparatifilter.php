<?php   

header('content-type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$PATH = $_POST['path'];

// Inizio acuisizione dati inseriti dall'utente ---

$SEDE = $_POST['codicesede']; 

$UTENTE = $_POST['codiceutente']; 

$DESCRIZIONEMODELLO = $_POST['descrizionemodello']; 

$UBICAZIONE = $_POST['ubicazione'];   

$BARCODE = $_POST['barcode'];   

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

// Inizio interrogazioni che restituiscono gli apparati relativi in funzione dei filtri utilizzati dall'utente ---

// 1) Caso in cui non sono stati specificati filtri
if($DESCRIZIONEMODELLO == "" and $UBICAZIONE == "" and $BARCODE == ""){

  $stmt5 = sqlsrv_query( $connessione, "Select A.codmodello, A.codmatricola, A.desmodello, A.desmatricola, A.ubicazione, A.barcode, S.emailS From apparati as A inner join sedi as S on (A.codcliente = S.codcliente) AND (A.codsede = S.codsede) Where S.codsede ='$SEDE' and A.codcliente = '$UTENTE' order by codmodello, codmatricola");

  if( $rows5 = sqlsrv_has_rows( $stmt5 )){

    while( $row5 = sqlsrv_fetch_array( $stmt5, SQLSRV_FETCH_ASSOC) ) {
    
      $userApparati[] = array("codicemodello" => $row5['codmodello'] , "codicematricola" => $row5['codmatricola'] , "descrizionemodello" => $row5['desmodello'] , "descrizionematricola" => $row5['desmatricola'] , "ubicazione" => $row5['ubicazione'] , "codiceabarre" => $row5['barcode'] , "emailSede" => $row5['emailS']);

    }          

    echo json_encode($userApparati);

  }

  else{

    $userApparati = 0;
    
    echo json_encode($userApparati);

  }

}

// 1) Caso in cui sono stati specificati filtri di tipo descrizioneModello
if($DESCRIZIONEMODELLO != "" and $UBICAZIONE == "" and $BARCODE == ""){

  $stmt5 = sqlsrv_query( $connessione, "Select A.codmodello, A.codmatricola, A.desmodello, A.desmatricola, A.ubicazione, A.barcode, S.emailS From apparati as A inner join sedi as S on (A.codcliente = S.codcliente) AND (A.codsede = S.codsede) Where S.codsede ='$SEDE' and A.codcliente = '$UTENTE' and A.desmodello like '%$DESCRIZIONEMODELLO%' order by codmodello, codmatricola");

  if( $rows5 = sqlsrv_has_rows( $stmt5 )){

    while( $row5 = sqlsrv_fetch_array( $stmt5, SQLSRV_FETCH_ASSOC) ) {
    
      $userApparati[] = array("codicemodello" => $row5['codmodello'] , "codicematricola" => $row5['codmatricola'] , "descrizionemodello" => $row5['desmodello'] , "descrizionematricola" => $row5['desmatricola'] , "ubicazione" => $row5['ubicazione'] , "codiceabarre" => $row5['barcode'] , "emailSede" => $row5['emailS']);

    }          

    echo json_encode($userApparati);

  }

  else{

    $userApparati = 0;
    
    echo json_encode($userApparati);

  }

}

// 2) Caso in cui sono stati specificati filtri di tipo ubicazione
if($DESCRIZIONEMODELLO == "" and $UBICAZIONE != "" and $BARCODE == ""){

  $stmt5 = sqlsrv_query( $connessione, "Select A.codmodello, A.codmatricola, A.desmodello, A.desmatricola, A.ubicazione, A.barcode, S.emailS From apparati as A inner join sedi as S on (A.codcliente = S.codcliente) AND (A.codsede = S.codsede) Where S.codsede ='$SEDE' and A.codcliente = '$UTENTE' and A.ubicazione like '%$UBICAZIONE%' order by codmodello, codmatricola");

  if( $rows5 = sqlsrv_has_rows( $stmt5 )){

    while( $row5 = sqlsrv_fetch_array( $stmt5, SQLSRV_FETCH_ASSOC) ) {
    
      $userApparati[] = array("codicemodello" => $row5['codmodello'] , "codicematricola" => $row5['codmatricola'] , "descrizionemodello" => $row5['desmodello'] , "descrizionematricola" => $row5['desmatricola'] , "ubicazione" => $row5['ubicazione'] , "codiceabarre" => $row5['barcode'] , "emailSede" => $row5['emailS']);

    }          

    echo json_encode($userApparati);

  }

  else{

    $userApparati = 0;
    
    echo json_encode($userApparati);

  }

}

// 3) Caso in cui sono stati specificati filtri di tipo barCode
if($DESCRIZIONEMODELLO == "" and $UBICAZIONE == "" and $BARCODE != ""){

  $stmt5 = sqlsrv_query( $connessione, "Select A.codmodello, A.codmatricola, A.desmodello, A.desmatricola, A.ubicazione, A.barcode, S.emailS From apparati as A inner join sedi as S on (A.codcliente = S.codcliente) AND (A.codsede = S.codsede) Where S.codsede ='$SEDE' and A.codcliente = '$UTENTE' and A.barcode like '%$BARCODE%' order by codmodello, codmatricola");

  if( $rows5 = sqlsrv_has_rows( $stmt5 )){

    while( $row5 = sqlsrv_fetch_array( $stmt5, SQLSRV_FETCH_ASSOC) ) {
    
      $userApparati[] = array("codicemodello" => $row5['codmodello'] , "codicematricola" => $row5['codmatricola'] , "descrizionemodello" => $row5['desmodello'] , "descrizionematricola" => $row5['desmatricola'] , "ubicazione" => $row5['ubicazione'] , "codiceabarre" => $row5['barcode'] , "emailSede" => $row5['emailS']);

    }          

    echo json_encode($userApparati);

  }

  else{

    $userApparati = 0;
    
    echo json_encode($userApparati);

  }

}

// 4) Caso in cui sono stati specificati filtri di tipo descrizioneModello e ubicazione
if($DESCRIZIONEMODELLO != "" and $UBICAZIONE != "" and $BARCODE == ""){

  $stmt5 = sqlsrv_query( $connessione, "Select A.codmodello, A.codmatricola, A.desmodello, A.desmatricola, A.ubicazione, A.barcode, S.emailS From apparati as A inner join sedi as S on (A.codcliente = S.codcliente) AND (A.codsede = S.codsede) Where S.codsede ='$SEDE' and A.codcliente = '$UTENTE' and A.desmodello like '%$DESCRIZIONEMODELLO%' and A.ubicazione like '%$UBICAZIONE%' order by codmodello, codmatricola");

  if( $rows5 = sqlsrv_has_rows( $stmt5 )){

    while( $row5 = sqlsrv_fetch_array( $stmt5, SQLSRV_FETCH_ASSOC) ) {
    
      $userApparati[] = array("codicemodello" => $row5['codmodello'] , "codicematricola" => $row5['codmatricola'] , "descrizionemodello" => $row5['desmodello'] , "descrizionematricola" => $row5['desmatricola'] , "ubicazione" => $row5['ubicazione'] , "codiceabarre" => $row5['barcode'] , "emailSede" => $row5['emailS']);

    }          

    echo json_encode($userApparati);

  }

  else{

    $userApparati = 0;
    
    echo json_encode($userApparati);

  }

}

// 5) Caso in cui sono stati specificati filtri di tipo descrizioneModello e barCode
if($DESCRIZIONEMODELLO != "" and $UBICAZIONE == "" and $BARCODE != ""){

  $stmt5 = sqlsrv_query( $connessione, "Select A.codmodello, A.codmatricola, A.desmodello, A.desmatricola, A.ubicazione, A.barcode, S.emailS From apparati as A inner join sedi as S on (A.codcliente = S.codcliente) AND (A.codsede = S.codsede) Where S.codsede ='$SEDE' and A.codcliente = '$UTENTE' and A.desmodello like '%$DESCRIZIONEMODELLO%' and A.barcode like '%$BARCODE%' order by codmodello, codmatricola");

  if( $rows5 = sqlsrv_has_rows( $stmt5 )){

    while( $row5 = sqlsrv_fetch_array( $stmt5, SQLSRV_FETCH_ASSOC) ) {
    
      $userApparati[] = array("codicemodello" => $row5['codmodello'] , "codicematricola" => $row5['codmatricola'] , "descrizionemodello" => $row5['desmodello'] , "descrizionematricola" => $row5['desmatricola'] , "ubicazione" => $row5['ubicazione'] , "codiceabarre" => $row5['barcode'] , "emailSede" => $row5['emailS']);

    }          

    echo json_encode($userApparati);

  }

  else{

    $userApparati = 0;
    
    echo json_encode($userApparati);

  }

}

// 6) Caso in cui sono stati specificati filtri di tipo ubicazione e barCode
if($DESCRIZIONEMODELLO == "" and $UBICAZIONE != "" and $BARCODE != ""){

  $stmt5 = sqlsrv_query( $connessione, "Select A.codmodello, A.codmatricola, A.desmodello, A.desmatricola, A.ubicazione, A.barcode, S.emailS From apparati as A inner join sedi as S on (A.codcliente = S.codcliente) AND (A.codsede = S.codsede) Where S.codsede ='$SEDE' and A.codcliente = '$UTENTE' and A.ubicazione like '%$UBICAZIONE%' and A.barcode like '%$BARCODE%' order by codmodello, codmatricola");

  if( $rows5 = sqlsrv_has_rows( $stmt5 )){

    while( $row5 = sqlsrv_fetch_array( $stmt5, SQLSRV_FETCH_ASSOC) ) {
    
      $userApparati[] = array("codicemodello" => $row5['codmodello'] , "codicematricola" => $row5['codmatricola'] , "descrizionemodello" => $row5['desmodello'] , "descrizionematricola" => $row5['desmatricola'] , "ubicazione" => $row5['ubicazione'] , "codiceabarre" => $row5['barcode'] , "emailSede" => $row5['emailS']);

    }          

    echo json_encode($userApparati);

  }

  else{

    $userApparati = 0;
    
    echo json_encode($userApparati);

  }

}

// 7) Caso in cui sono stati specificati filtri di tipo descrizioneModello, ubicazione e barCode
if($DESCRIZIONEMODELLO != "" and $UBICAZIONE != "" and $BARCODE != ""){

  $stmt5 = sqlsrv_query( $connessione, "Select A.codmodello, A.codmatricola, A.desmodello, A.desmatricola, A.ubicazione, A.barcode, S.emailS From apparati as A inner join sedi as S on (A.codcliente = S.codcliente) AND (A.codsede = S.codsede) Where S.codsede ='$SEDE' and A.codcliente = '$UTENTE' and A.desmodello like '%$DESCRIZIONEMODELLO%' and A.ubicazione like '%$UBICAZIONE%' and A.barcode like '%$BARCODE%' order by codmodello, codmatricola");

  if( $rows5 = sqlsrv_has_rows( $stmt5 )){

    while( $row5 = sqlsrv_fetch_array( $stmt5, SQLSRV_FETCH_ASSOC) ) {
    
      $userApparati[] = array("codicemodello" => $row5['codmodello'] , "codicematricola" => $row5['codmatricola'] , "descrizionemodello" => $row5['desmodello'] , "descrizionematricola" => $row5['desmatricola'] , "ubicazione" => $row5['ubicazione'] , "codiceabarre" => $row5['barcode'] , "emailSede" => $row5['emailS']);

    }          

    echo json_encode($userApparati);

  }

  else{

    $userApparati = 0;
    
    echo json_encode($userApparati);

  }

}

// --- Fine interrogazioni che restituiscono gli apparati relativi in funzione dei filtri utilizzati dall'utente ---

// Libera la risorsa utilizzata per la comunicazione con la base di dati MoviticketDB
sqlsrv_free_stmt($stmt5); 

// Libera la connessione con la base di dati MoviticketDB
sqlsrv_close($connessione); 

?>
