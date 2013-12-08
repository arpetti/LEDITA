// Registration
module.exports.FIRST_NAME_REQUIRED = 'Il nome è necessario.';
module.exports.FIRST_NAME_LENGTH = 'Il nome deve essere lungo tra 2 e 20 caratteri.';
module.exports.FIRST_NAME_ALLOWED_CHARS = 'Il nome può contenere solo lettere.';
module.exports.SURNAME_REQUIRED = 'Il cognome è necessario.';
module.exports.SURNAME_LENGTH = 'Il cognome deve essere lungo tra 2 e 20 caratteri.';
module.exports.SURNAME_ALLOWED_CHARS = 'Il cognome può contenere solo lettere.';
module.exports.EMAIL_REQUIRED = 'L\'indirizzo email è necessario.';
module.exports.EMAIL_LENGTH = 'L\'indirizzo email deve essere lungo meno di 255 caratteri.';
module.exports.EMAIL_FORMAT = 'Per favore, inserisci un email valido.';
module.exports.PASSWORD_REQUIRED = 'La password è necessaria.';
module.exports.PASSWORD_LENGTH = 'La password deve essere lunga tra 8 e 40 caratteri.';
module.exports.TERMS = 'Devi concordare con i termini e condizioni e la politica sulla privacy.';
module.exports.USERNAME_EXISTS = 'Questo indirizzo email è già registrato.';

// Login
module.exports.UNABLE_TO_RETRIEVE_USER = 'Impossibile recuperare i dettagli dell\'utente in questo momento, per favore, tenta più tardi.';
module.exports.INVALID_USERNAME_PASSWORD = 'Email o password invalidi.';
module.exports.LOGIN_SUCCESS = "Login effetuato con successo.";

// Learning Design Retrieval
module.exports.UNABLE_TO_RETRIEVE_LDS = 'Impossibile recuperare i progetti in questo momento, per favore, tenta più tardi.';
module.exports.LD_NOT_FOUND = "Impossibile trovare questo progetto.";
module.exports.LD_DETAIL_NOT_FOUND = "Non è possibile trovare i dettagli di questo progetto";
module.exports.UNABLE_TO_CREATE_LD = "Impossibile creare un progetto in questo momento, per favore, tenta più tardi.";

// Activities Retrieval
module.exports.UNABLE_TO_RETRIEVE_LD_NODES = "Impossibile recuperare le attività del progetto in questo momento, per favore, tenta più tardi.";
module.exports.NO_LD_NODES_FOUND = "Questo progetto non ha contenuti";
module.exports.UNABLE_TO_RETRIEVE_ACTIVITIES = "Impossibile recuperare le attività in questo momento, per favore, tenta più tardi.";
module.exports.NO_ACTIVITIES_FOUND = "Questo progetto non ha attività.";

// Reference Data
module.exports.UNABLE_TO_RETRIEVE_QCERS = "Impossibile recuperare i livelli QCER in questo momento, per favore, tenta più tardi.";
module.exports.QCERS_NOT_FOUND = "Nessun livello QCER trovato, per favore contattare l\'amministratore del sistema.";
module.UNABLE_TO_RETRIEVE_SCOPES= "Impossibile recuperare gli ambiti in questo momento, per favore, tenta più tardi.";
module.UNABLE_TO_RETRIEVE_SUBJECTS = "Impossibile recuperare gli argomenti in questo momento, per favore, tenta più tardi.";
module.UNABLE_TO_RETRIEVE_OBJECTIVES = "Impossibile recuperare gli obiettivi in questo momento, per favore, tenta più tardi.";
module.UNABLE_TO_RETRIEVE_TECHNOLOGIES = "Impossibile recuperare le tecnologie in questo momento, per favore, tenta più tardi.";

// User Profile
module.exports.USER_DETAIL_NOT_FOUND = "Impossibile trovare i dettagli del profilo utente";
module.exports.USER_NOT_FOUND = "Impossibile trovare l\'utente.";

// Learning Design Creation - nome
module.exports.LD_NAME_REQUIRED = 'Il nome del progetto è necessario.';
module.exports.LD_NAME_LENGTH = 'Il nome del progetto deve essere lungo tra 1-50 caratteri.';
module.exports.LD_NAME_ALLOWED_CHARS = 'Il nome del progetto può contenere solo lettere e numeri.';

// Learning Design Creation - Qcers
module.exports.LD_QCER_SELECTED = 'Selezionare almeno un livello QCER.';

// Learning Design Creation - Scope
module.exports.LD_SCOPE_REQUIRED = 'L\'ambito del progetto è necessario.';
module.exports.LD_SCOPE_LENGTH = 'L\'ambito del progetto deve essere lungo tra 1-50 caratteri.';
module.exports.LD_SCOPE_ALLOWED_CHARS = 'L\'ambito del progetto può contenere solo lettere e numeri.';

// Learning Design Creation - Topic
module.exports.LD_TOPIC_SELECTED = 'Almeno un argomento deve essere selezionato.';
module.exports.LD_TOPIC_EMPTY = "L\'argomento non può essere vuoto";
module.exports.LD_TOPIC_LENGTH = 'L\'argomento deve essere lungo tra 1-255 caratteri.';
module.exports.LD_TOPIC_ALLOWED_CHARS = 'L\'argomento può contenere solo lettere e numeri.';

// Learning Design Creation - Objective
module.exports.LD_OBJECTIVE_SELECTED = 'Almeno un obiettivo deve essere lungo tra selected.';
module.exports.LD_OBJECTIVE_EMPTY = "L\'obiettivo non può essere vuoto";
module.exports.LD_OBJECTIVE_LENGTH = 'L\'obiettivo deve essere lungo tra 1-255 caratteri.';
module.exports.LD_OBJECTIVE_ALLOWED_CHARS = 'L\'obiettivo può contenere solo lettere e numeri.';

// Learning Design Creation - Prerequisites
module.exports.LD_PREREQ_EMPTY = "I prerequisiti non possono essere vuoti.";
module.exports.LD_PREREQ_LENGTH = 'Un prerequisito deve essere lungo tra 1-255 caratteri.';
module.exports.LD_PREREQ_ALLOWED_CHARS = 'Un prerequisito può contenere solo lettere e numeri.';

// Learning Design Creation - Students Description
module.exports.LD_STUDENTS_DESC_REQUIRED = 'La descrizione degli studenti è necessario.';
module.exports.LD_STUDENTS_DESC_LENGTH = 'La descrizione degli studenti deve essere lunga tra 1-500 caratteri.';
module.exports.LD_STUDENTS_DESC_ALLOWED_CHARS = 'La descrizione degli studenti può contenere solo lettere e numeri.';

// Learning Design Edits
module.exports.LD_NAME_UPDATE_FAIL = 'Il nome del progetto non può essere aggiornato in questo momento, per favore, tenta più tardi.';
module.exports.LD_SCOPE_UPDATE_FAIL = 'L\'ambito del progetto non può essere aggiornato in questo momento, per favore, tenta più tardi.';
module.exports.STUDENTS_DESCR_UPDATE_FAIL = 'La descrizione degli studenti non può essere aggiornata in questo momento, per favore, tenta più tardi.';
module.exports.LD_PUBLICATION_UPDATE_FAIL = 'La pubblicazione del progetto non può essere aggiornata in questo momento, per favore, tenta più tardi.';
module.exports.QCER_UPDATE_FAIL = 'I livelli QCER non possono essere aggiornati in questo momento, per favore, tenta più tardi.';
module.exports.TOPIC_REMOVE_FAIL = 'L\'argomento non può essere rimosso.';
module.exports.OBJECTIVE_REMOVE_FAIL = 'L\'obiettivo non può essere rimosso.';
module.exports.PREREQUISITE_REMOVE_FAIL = 'I prerequisiti non possono essere rimossi.';

// Activity Creation
module.exports.ACTIVITY_STUDENTS_TYPE_FIND_ERROR = 'Error occurred finding students organization.'
module.exports.ACTIVITY_STUDENTS_TYPE_INVALID = 'Invalid students organization.';
module.exports.ACTIVITY_STUDENTS_TYPE_INSERT_FAIL = 'Could not insert students type.';

// Drag and Drop Activity Structure
module.exports.DRAG_DROP_FAIL = 'Non è possibile spostare l\'attività, per favore, tenta più tardi.';
module.exports.DRAG_DROP_INVALID = 'Spostamento non valido.';
module.exports.INVALID_MOVE_MAX_POSITION = 'Non è possibile muovere nella posizione massima quando il livello è pieno.';
module.exports.INVALID_MOVE_LEVEL_POSITION_LEFT = 'Non è possibile spostare un\'attività alla sua immediata sinistra.';
module.exports.INVALID_MOVE_LEVEL_POSITION_RIGHT = 'Non è possibile spostare un\'attività alla sua immediata destra.';