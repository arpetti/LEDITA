USE `ledita-test` ;

INSERT INTO `ledita-test`.`image` (`id`, `name`, `size`, `uri`, `mime`)
VALUES ('1', 'mario.png', '287', 'http://localhost/ledita/img/usr/mario.png', 'png'),
        ('2', 'lucia.png', '347', 'http://localhost/ledita/img/usr/lucia.png', 'png'),
('3', 'antonio.png', '287', 'http://localhost/ledita/img/usr/antonio.png', 'jpg'),
('4', 'sara.png', '287', 'http://localhost/ledita/img/usr/sara.png', 'gif'),
('5', 'silvia.png', '287', 'http://localhost/ledita/img/usr/silvia.png', 'png');

INSERT INTO `ledita-test`.`user` (`id`, `image_id`, `name`, `last_name`, `gender`, `email`, `salt`, `hash`, `workplace`, `city`, `country`)
VALUES ('1', '1', 'Mario', 'Rossi', 'M', 'mario@email.it', 'salt', 'hash', 'Scuola A', 'Roma', 'Italia'),
('2', '2', 'Lucia', 'Bianchi', 'F', 'lucia@email.it', 'salt', 'hash', 'Scuola B', 'Parigi', 'Francia'),
('3', '3', 'Antonio', 'Verdi', 'M', 'antonio@email.it', 'salt', 'hash', 'Scuola C', 'Berlino', 'Germania'),
('4', '4', 'Sara', 'Neri', 'F', 'sara@email.it', 'salt', 'hash', 'Scuola D', 'Los Angeles', 'Stati Uniti'),
('5', '5', 'Silvia', 'Rosa', 'F', 'silvia@email.it', 'salt', 'hash', 'Scuola E', 'Pechino', 'Cina');

INSERT INTO `ld`(`id`, `user_id`, `ld_model_id`, `name`, `scope`, `publication`, `students_profile`, `creation_date`, `last_edit_date`)
VALUES ('1','1', NULL,'LD Demo 1','Lesson','1','20 studenti adolescenti di livello B1',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2','1', '1','LD Demo 2','Module','0','20 studenti adolescenti di livello B1',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('3','2', NULL,'LD Demo 3','Semester','1','20 studenti adolescenti di livello B1',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('4','3', NULL,'LD Demo 4','Lesson','1','20 studenti adolescenti di livello B1',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('5','4', NULL,'LD Demo 5','Semester','1','20 studenti adolescenti di livello B1',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('6','4', NULL,'LD Demo 6','Module','0','20 studenti adolescenti di livello B1',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('7','4', '5','LD Demo 7','Lesson','1','20 studenti adolescenti di livello B1',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('8','5', NULL,'LD Demo 8','Lesson','1','20 studenti adolescenti di livello B1',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO `subject` (`id`, `name`)
VALUES ('1', 'Subject 1'),
('2', 'Subject 2'),
('3', 'Subject 3'),
('4', 'Subject 4'),
('5', 'Subject 5');


INSERT INTO `concerns` (`subject_id`, `ld_id`)
VALUES ('1', '1'),
('2', '1'),
('3', '2'),
('1', '3'),
('4', '4'),
('5', '4'),
('2', '5'),
('5', '6'),
('4', '7'),
('1', '8'),
('4', '8');

INSERT INTO `objective` (`id`, `descr`)
VALUES ('1', 'Objective 1'),
('2', 'Objective 2'),
('3', 'Objective 3'),
('4', 'Objective 4'),
('5', 'Objective 5'),
('6', 'Objective 6');

INSERT INTO `aims` (`ld_id`, `objective_id`)
VALUES ('1', '1'),
('2', '1'),
('3', '2'),
('3', '3'),
('4', '4'),
('5', '4'),
('6', '5'),
('7', '6'),
('8', '2');

INSERT INTO `needs` (`id`, `ld_id`, `ld_requisite_id`,`objective_id`)
VALUES ('1', '1', NULL , '1' ),
('2', '1', NULL , '2' ),
('3', '2', '1' , NULL ),
('4', '3', NULL , '3' ),
('5', '4', NULL , '4' ),
('6', '5', NULL , '4' ),
('7', '5', '3' , NULL ),
('8', '6', NULL , '1' ),
('9', '7', NULL , '5' ),
('10', '8', '2' , NULL ),
('11', '8', NULL , '6' );
