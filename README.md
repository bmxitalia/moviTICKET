# Progetto moviTICKET
Il progetto consiste nella realizzazione di una piattaforma mobile per l'invio di richieste di assistenza online. Le aziende clienti dell'azienda VISIONEIMPRESA possono distribuire ai propri clienti l'applicazione. L'applicazione si collega direttamente al database sul server cloud di Vision o al database dell'azienda stessa. Su questi database sono contenuti i dati degli apparati di cui l'utente può richiede assistenza tramite l'applicazione. In fase di login, l'autenticazione è gestita tramite un unico database presente sul server cloud di Vision, contenente i dati per l'autenticazione degli utenti e le stringhe di connessione ai database delle aziende che distribuiscono gli apparati. <br/>
Per la realizzazione dell'applicazione è stato utilizzato il framework PhoneGap. Sono presenti i sorgenti dell'applicazione per Android e iOS.<br/>
Per il funzionamento dell'applicazione è stato realizzato un web service scritto in PHP, installato su un server IIS presente su un server Azure dell'azienda. Tramite JavaScript vengono effettuate richieste HTTP POST al web service che risponde tramite dei file JSON. Le risposte del web service vengono interpretate dal codice JavaScript che produce dei risultati sull'applicazione.
