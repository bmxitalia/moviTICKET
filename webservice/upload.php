<?php

//Puntatore alla directory in cui salvare l'immagine scattata o caricata dall'utente             
$target_dir = 'imageTicket/';

// Puntatore al file immagine di servizio 
$target_file = $target_dir . basename($_FILES['file']['name']);

// Puntatore al nome dell'immagine di servizio
$temp_name = $_FILES['file']['tmp_name'];  

// Sposta il file immagine nella directory opportuna
move_uploaded_file($temp_name, "$target_file");

?>