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

// Caricamento dell libreria di servizio utilizzata per gestire la spedizione delle mail
require_once('class.phpmailer.php');

require_once('class.smtp.php');

// Inizio acquisizione dei dati inseriti dall'utente ---

$UTENTE = $_POST['codiceutente'];

$SEDE = $_POST['codicesede'];

$CODMODELLO = $_POST['codicemodello'];

$CODMATRICOLA = $_POST['codicematricola'];

$DATA = $_POST['datainserimento'];

$CODCAUSALE = $_POST['codicecausale'];

$DESCRIZIONE = $_POST['descrizioneguasto'];

$IMMAGINE = $_POST['immagine'];

$MAILAZIENDA = $_POST['emailazienda'];

$MAILSEDE = $_POST['emailsede'];

$MAILUTENTE = $_POST['emailutente'];

// --- Fine acquisizione dati inseriti dall'utente

// Interrogazione che inserisce i dati inseriti dall'utente durante tutto il ciclo di vita dell'applicazione all'interno della tabella ticket della base di dati MoviticketDB
$stmt7 = sqlsrv_query($connessione, "INSERT INTO ticket (codcliente, codsede, codmodello, codmatricola, data, codcausale, descrizione, immagine) VALUES ('$UTENTE','$SEDE','$CODMODELLO','$CODMATRICOLA','$DATA','$CODCAUSALE','$DESCRIZIONE','$IMMAGINE')");

// Creazione template mail da inviare in triplice copia
if($stmt7){

  $body = "<html>"; 

  $body .= "<body style=\"font-family:Verdana, Verdana, Geneva, sans-serif;\">";

  $body .= "E' stata registrata una richiesta di assistenza da parte del cliente <strong>".$UTENTE."</strong>, in data <strong>".substr($DATA,0,10)."</strong>, dalla sede <strong>".$SEDE."</strong>.<br/><hr/><br/>";

  $body .= "Dettaglio dell'apparato che necessita di assistenza:<br/><br/>";

  $body .= "<table style=\"text-align:center; border-collapse: collapse;\"><tr>";

  $body .= "<th style=\"border: 1px solid black;\">Modello</th><th style=\"border: 1px solid black;\">Matricola</th><th style=\"border: 1px solid black;\">Causale</th><th style=\"border: 1px solid black;\">Descrizione</th></tr>";

  $body .= "<tr><td style=\"border: 1px solid black;\">".$CODMODELLO."</td><td style=\"border: 1px solid black;\">".$CODMATRICOLA."</td><td style=\"border: 1px solid black;\">".$CODCAUSALE."</td><td style=\"border: 1px solid black;\">".$DESCRIZIONE."</td></tr></table>";

  $body .= "</body>"; 

  $body .= "</html>"; 

  $mail = new PHPMailer(); // create a new object

  $mail->IsSMTP(true); // enable SMTP 

  $mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only

  $mail->SMTPAuth = true; // authentication enabled

  $mail->Host = "mailgate.officegroup.it";

  $mail->Port = 25; // or 587

  $mail->IsHTML(true);

  $mail->Username = "vision.movidat";

  $mail->Password = "Ofnmhyd76.£sm12-A!";

  $mail->SetFrom("noreply@movidat.com");

  $mail->Subject = "moviTICKET: richiesta di assistenza del cliente ".$UTENTE;

  $mail->Body = $body;

  $mail->AddAddress($MAILAZIENDA);

  $mail->AddAddress($MAILUTENTE);
  
  //$mail->AddAttachment($IMMAGINE); ----> Nel caso in cui si volesso inserire l'immagine come allegato occore caricarla, decodificarla e farla puntare dalla variabile omonima
$file=fopen("try.txt", 'w');
  if(!$mail->send()) 
{
    
    $status = 0;
} 
else 
{
  $status = 1;
}

}

else{

  $status = 0;
  

}    

echo json_encode($status);
// Libera la risorsa utilizzata per la comunicazione con la base di dati MoviticketDB 
sqlsrv_free_stmt($stmt7); 

// Libera la connessione con la base di dati MoviticketDB
sqlsrv_close($connessione); 
 
?>