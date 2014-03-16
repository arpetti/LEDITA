USE `ledita-web-app` ;

INSERT INTO `image` (`id`, `name`, `size`, `uri`, `mime`)
VALUES
('6', 'user6.png', '287', 'avatar/user6.png', 'image/png');

INSERT INTO `user` (`id`, `image_id`, `name`, `last_name`, `email`, `hash`, `workplace`, `city`, `country`)
VALUES
('6', '6', 'Alessandro', 'Arpetti', 'arpetti@gmail.com', '$2a$10$/MWGZW7cmwNdle.jiFJb9OiWqVZjxbgJxYNpEraHkwzZ2muBHL7Gm', 'ProfessoreItaliano', 'Campinas', 'Brasile');

INSERT INTO `scope` (`id`, `name`)
VALUES ('1', 'Modulo'),
('2', 'Attività'),
('3', 'Semestre'),
('4', 'Lezione');

INSERT INTO `ld`(`id`, `user_id`, `ld_model_id`, `name`, `scope_id`, `publication`, `students_profile`, `creation_date`, `last_edit_date`)
VALUES
               ('31','6', NULL,'Parole Dolci','4','1','8 studenti adulti, tutti brasiliani, corso di 4 ore a settimana','2011-09-16 22:21:26', '2011-09-16 22:21:26');

INSERT INTO `subject` (`id`, `name`)
VALUES
('6', 'Sentimenti');


INSERT INTO `concerns` (`subject_id`, `ld_id`)
VALUES
  ('6','31');


INSERT INTO `objective` (`id`, `descr`)
VALUES
('7', 'Espressione dei sentimenti'),
('8', 'Frasi idiomatiche sui sentimenti'),
('9', 'La sfera degli affetti in Italia'),
('10', 'Lessico relativo ai sentimenti'),
('11', 'Registro formale e informale con i sentimenti'),
('12', 'A1'),
('13', 'Lessico relativo al cibo');

INSERT INTO `aims` (`ld_id`, `objective_id`)
VALUES
('31','7'),
('31','8'),
('31','9'),
('31','10'),
('31','11');

INSERT INTO `needs` (`id`, `ld_id`, `ld_requisite_id`,`objective_id`)
VALUES
('12', '31', NULL , '12' ),
('13', '31', NULL , '13' );





INSERT INTO `students` (`id`, `type`, `group_number`, `people_per_group`)
VALUES
('1','1',NULL,NULL),
('2','2',NULL,NULL),
('3','3',NULL,NULL),
('4','4','3',NULL),
('5','4','4',NULL),
('6','4',NULL,'3'),
('7','4',NULL,'4'),
('8','4','2','6'),
('9','4','3','4'),
('10','4','5','3');

INSERT INTO `activity` (`id`, `students_id`, `name`, `dur_min`, `dur_hh`, `dur_dd`, `dur_mon`, `pract_descr`, `edu_descr`, `modality`)
VALUES
('51','1','Brainstorming','2','0','0','0','Quali sono le parole che conoscete per indicare dolci?','Fare un brainstorming con gli studenti chiedendogli tutte le parole di cibi dolci che conoscono. Scrivere le parole alla lavagna.','1'),
('52','3','Striscia senza dialoghi','8','0','0','0','Scrivere i dialoghi per la striscia usando almeno 3 parole tra quelle scritte alla lavagna.','Mostrare la striscia senza il testo e, in coppia, chiedere agli studenti di inventare i dialoghi usando almeno 3 parole tra quelle scritte alla lavagna.','1'),
('53','1','Lettura strisce degli studenti','5','0','0','0','Quali dialoghi avete creato? Leggiamo insieme.','Presentare i dialoghi creati dagli studenti in plenum, cercando di portare l\'attenzione sulle parole dolci usate.','1'),
('54','3','Battuta e apelto','5','0','0','0','Leggete il testo della striscia e provate a descrivere cosa significano le parole "battuta" e "apelto".','Distribuire agli studenti, divisi in coppie diverse dalle precedenti, la striscia con il testo originale e chiedergli di tentare di descrivere il significato di “battuta” e “apelto”.','1'),
('55','1','Verifica comprensione','5','0','0','0','Vediamo insieme, cosa significano secondo voi "battuta" e "apelto".','Controllo in plenum e verifica della comprensione.','1'),
('56','2','Esercizio su lessico sentimenti','7','0','0','0','Fare l\'esercizio di pagina 20 n. 1a.','Individualmente, distribuire le fotocopie del libro e fare l\'esercizio a pag. 20 n. 1a per introdurre i verbi e le parole usate per esprimere i sentimenti.','1'),
('57','1','Correzione esercizio','3','0','0','0','Correzione con la classe dell\'esercizio svolto.','Controllo in plenum.','1'),
('58','3','Esercizio su espressioni idiomatiche','7','0','0','0','Fare in coppia l\'esercizio di pagina 20 n. 1b.','In coppia, fare l\'esercizio a pag. 20 n. 1b per la comprensione di espressioni idiomatiche sui sentimenti.','1'),
('59','1','Correzione esercizio','3','0','0','0','Correzione con la classe dell\'esercizio svolto.','Controllo in plenum.','1'),
('60','1','Esercizio su sentimenti contrari','10','0','0','0','Fare l\'esercizio di pagina 23 n. 4.','In plenum, fare l\'esercizio a pag. 23 n. 4 delle fotocopie per dividere i verbi con significato positivo da quelli con significato negativo. Es. Amare – odiare.','1'),
('61','2','Produzione frasi','10','0','0','0','Scrivere tre frasi con le parole studiate in questa lezione e specificare in che situazioni possono essere usate.','Individualmente, scrivere 3 frasi usando i verbi e le parole studiate, mostrando specificamente in che situazioni sono usate.','1'),
('62','1','Commento frasi degli studenti','5','0','0','0','Con la classe, leggere e commentare le frasi scritte.','Controllo in plenum.','1'),
('63','7','Domande sull\'uso del lessico sui sentimenti','20','0','0','0','In gruppi di 4, rispondere alla seguenti domande: esistono differenze nell\'uso delle parole e dei verbi che esprimono sentimenti tra l\'italiano e il portoghese? Secondo voi, quali parole è meglio evitare? Quali parole si possono usare con: la famiglia, il partner, gli amici o con le altre persone? Quali parole si possono usare in situazioni formali?','Passeggiare tra i gruppi cercando di stimolare la produzione spontanea degli studenti.','1'),
('64','1','Discussione sulle risposte','10','0','0','0','Commentare con la classe le varie risposte proposte dagli studenti.','Controllo in plenum e discussione. Se gli studenti non riescono ad evidenziare gli aspetti importanti, aiutarli ad esplicitarli.','1'),
('65','3','Creazione di una striscia','15','0','0','0','Creare la descrizione testuale di una striscia, descrivendo specificamente il luogo di ambientazione e i personaggi presenti e usando almeno 3 frasi che esprimono i sentimenti e 1 frase idiomatica tra quelle studiate precedentemente.','Aiutare gli studenti con evenutali difficoltà nella creazione, cercando di farli concentrare sull\'uso delle parole e delle frasi sui sentimenti.','1'),
('66','1','Correzione frasi','5','0','0','0','Presentare la striscia alla classe.','Concentrare la correzione sugli aspetti importanti della lezione e verificare gli obiettivi progettati.','1');

INSERT INTO `activity_group` (`id`, `name`)
VALUES
('11','Motivazione'),
('12','Globalità'),
('13','Analisi'),
('14','Riflessione linguistica'),
('15','Riflessione socioculturale'),
('16','Verifica finale');

INSERT INTO `participates` (`id`, `activity_group_id`, `activity_id`, `ld_is_part_id`, `level`, `position`)
VALUES

('34','11','51',NULL,'1','1'),
('35','11','52',NULL,'2','1'),
('36','11','53',NULL,'3','1'),
('37','12','54',NULL,'1','1'),
('38','12','55',NULL,'2','1'),
('39','13','56',NULL,'1','1'),
('40','13','57',NULL,'2','1'),
('41','13','58',NULL,'3','1'),
('42','13','59',NULL,'4','1'),
('43','14','60',NULL,'1','1'),
('44','14','61',NULL,'2','1'),
('45','14','62',NULL,'3','1'),
('46','15','63',NULL,'1','1'),
('47','15','64',NULL,'2','1'),
('48','16','65',NULL,'1','1'),
('49','16','66',NULL,'2','1');

INSERT INTO `composes` (`id`, `ld_id`, `activity_id`, `ld_part_id`, `activity_group_id`, `level`, `position`)
VALUES
('37','31',NULL,NULL,'11','1','1'),
('38','31',NULL,NULL,'12','2','1'),
('39','31',NULL,NULL,'13','3','1'),
('40','31',NULL,NULL,'14','4','1'),
('41','31',NULL,NULL,'15','5','1'),
('42','31',NULL,NULL,'16','6','1');


INSERT INTO `technology` (`id`, `name`)
VALUES
('1','Tablet'),
('2','PC'),
('3','Smartphone'),
('4','Lavagna'),
('5','Internet');


INSERT INTO `resource` (`id`, `activity_id`, `name`, `type`, `descr`, `link`, `copy`)
VALUES
('21','52','Striscia senza dialoghi','image','Striscia con i dialoghi cancellati.',NULL,NULL),
('22','54','Striscia con dialoghi','image','Striscia con i dialoghi.',NULL,NULL),
('23','56','Le parole italiane','document','Fotocopie dal libro “Le parole italiane” di Alma Edizioni (Unità 3 – Personalità e sentimenti, p. 20).',NULL,NULL),
('24','58','Le parole italiane','document','Fotocopie dal libro “Le parole italiane” di Alma Edizioni (Unità 3 – Personalità e sentimenti, p. 20).',NULL,NULL),
('25','60','Le parole italiane','document','Fotocopie dal libro “Le parole italiane” di Alma Edizioni (Unità 3 – Personalità e sentimenti, p. 23).',NULL,NULL);


INSERT INTO `file` (`id`, `resource_id`, `name`, `size`, `uri`, `mime` )
VALUES
('11','21','Striscia senza dialoghi','355','/img/avatar_sample.png','image/png'),
('12','22','Striscia con dialoghi','355','/img/avatar_sample.png','image/png'),
('13','23','Fotocopie libro','355','','application/pdf'),
('14','24','Fotocopie libro','355','','application/pdf'),
('15','25','Fotocopie libro','355','','application/pdf');


INSERT INTO `classificates` (`ld_id`, `qcer_id`)
VALUES
('31','2'),
('31','3');