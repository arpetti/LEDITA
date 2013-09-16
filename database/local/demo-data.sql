USE `ledita-web-app` ;

INSERT INTO `ledita-web-app`.`image` (`id`, `name`, `size`, `uri`, `mime`)
VALUES ('1', 'mario.png', '287', 'http://localhost/ledita/img/usr/mario.png', 'png'),
        ('2', 'lucia.png', '347', 'http://localhost/ledita/img/usr/lucia.png', 'png'),
('3', 'antonio.png', '287', 'http://localhost/ledita/img/usr/antonio.png', 'jpg'),
('4', 'sara.png', '287', 'http://localhost/ledita/img/usr/sara.png', 'gif'),
('5', 'silvia.png', '287', 'http://localhost/ledita/img/usr/silvia.png', 'png');

INSERT INTO `ledita-web-app`.`user` (`id`, `image_id`, `name`, `last_name`, `gender`, `email`, `hash`, `workplace`, `city`, `country`)
VALUES ('1', '1', 'Mario', 'Rossi', 'M', 'mario@email.it', '$2a$10$/MWGZW7cmwNdle.jiFJb9OiWqVZjxbgJxYNpEraHkwzZ2muBHL7Gm', 'Scuola A', 'Roma', 'Italia'),
('2', '2', 'Lucia', 'Bianchi', 'F', 'lucia@email.it', '$2a$10$/MWGZW7cmwNdle.jiFJb9OiWqVZjxbgJxYNpEraHkwzZ2muBHL7Gm', 'Scuola B', 'Parigi', 'Francia'),
('3', '3', 'Antonio', 'Verdi', 'M', 'antonio@email.it', '$2a$10$/MWGZW7cmwNdle.jiFJb9OiWqVZjxbgJxYNpEraHkwzZ2muBHL7Gm', 'Scuola C', 'Berlino', 'Germania'),
('4', '4', 'Sara', 'Neri', 'F', 'sara@email.it', '$2a$10$/MWGZW7cmwNdle.jiFJb9OiWqVZjxbgJxYNpEraHkwzZ2muBHL7Gm', 'Scuola D', 'Los Angeles', 'Stati Uniti'),
('5', '5', 'Silvia', 'Rosa', 'F', 'silvia@email.it', '$2a$10$/MWGZW7cmwNdle.jiFJb9OiWqVZjxbgJxYNpEraHkwzZ2muBHL7Gm', 'Scuola E', 'Pechino', 'Cina');

INSERT INTO `ld`(`id`, `user_id`, `ld_model_id`, `name`, `scope`, `publication`, `students_profile`, `creation_date`, `last_edit_date`)
VALUES ('1','1', NULL,'Learningà Designè Titleì Demoò 1ù é','Lesson','1','20 studenti adolescenti di livello B1','2012-08-16 22:21:26', '2013-08-16 22:21:26'),
              ('2','1', '1','Learning Design Title Demo 2','Module','0','20 studenti adolescenti di livello B1','2012-08-15 22:21:26', '2013-08-14 22:21:26'),
              ('3','2', NULL,'Learning Design Title Demo 3','Semester','1','20 studenti adolescenti di livello B1','2012-08-14 22:21:26', '2013-08-13 22:21:26'),
              ('4','3', NULL,'Learning Design Title Demo 4','Lesson','1','20 studenti adolescenti di livello B1','2012-08-13 22:21:26', '2013-08-12 22:21:26'),
              ('5','4', NULL,'Learning Design Title Demo 5','Semester','1','20 studenti adolescenti di livello B1','2012-08-12 22:21:26', '2013-08-11 22:21:26'),
              ('6','4', NULL,'Learning Design Title Demo 6','Module','0','20 studenti adolescenti di livello B1','2012-08-11 22:21:26', '2013-08-10 22:21:26'),
              ('7','4', '5','Learning Design Title Demo 7','Lesson','1','20 studenti adolescenti di livello B1','2012-08-10 22:21:26', '2013-08-09 22:21:26'),
              ('8','5', NULL,'Learning Design Title Demo 8','Lesson','1','20 studenti adolescenti di livello B1','2012-08-09 22:21:26', '2013-08-08 22:21:26'),
              ('9','1', NULL,'Learning Design Title Demo 9','Lesson','1','20 studenti adolescenti di livello B1','2012-08-08 22:21:26', '2013-08-07 22:21:26'),
              ('10','1', '1','Learning Design Title Demo 10','Module','0','20 studenti adolescenti di livello B1','2012-08-07 22:21:26', '2013-08-06 22:21:26'),
              ('11','2', NULL,'Learning Design Title Demo 11','Semester','1','20 studenti adolescenti di livello B1','2012-07-16 22:21:26', '2013-08-05 22:21:26'),
              ('12','3', NULL,'Learning Design Title Demo 12','Lesson','1','20 studenti adolescenti di livello B1','2012-06-16 22:21:26', '2013-08-04 22:21:26'),
              ('13','4', NULL,'Learning Design Title Demo 13','Semester','1','20 studenti adolescenti di livello B1','2012-05-16 22:21:26', '2013-08-03 22:21:26'),
              ('14','4', NULL,'Learning Design Title Demo 14','Module','0','20 studenti adolescenti di livello B1','2012-04-16 22:21:26', '2013-08-02 22:21:26'),
              ('15','4', '5','Learning Design Title Demo 15','Lesson','1','20 studenti adolescenti di livello B1','2012-03-16 22:21:26', '2013-08-01 22:21:26'),
              ('16','5', NULL,'Learning Design Title Demo 16','Lesson','1','20 studenti adolescenti di livello B1','2012-02-16 22:21:26', '2013-07-16 22:21:26'),
              ('17','1', NULL,'Learning Design Title Demo 17','Lesson','1','20 studenti adolescenti di livello B1','2012-01-16 22:21:26', '2013-06-16 22:21:26'),
              ('18','1', '1','Learning Design Title Demo 18','Module','0','20 studenti adolescenti di livello B1','2012-01-15 22:21:26', '2013-05-16 22:21:26'),
              ('19','2', NULL,'Learning Design Title Demo 19','Semester','1','20 studenti adolescenti di livello B1','2012-01-14 22:21:26', '2013-04-16 22:21:26'),
              ('20','3', NULL,'Learning Design Title Demo 20','Lesson','1','20 studenti adolescenti di livello B1','2012-01-13 22:21:26', '2013-03-16 22:21:26'),
              ('21','4', NULL,'Learning Design Title Demo 21','Semester','1','20 studenti adolescenti di livello B1','2012-01-12 22:21:26', '2013-02-16 22:21:26'),
              ('22','4', NULL,'Learning Design Title Demo 22','Module','0','20 studenti adolescenti di livello B1','2012-01-11 22:21:26', '2013-01-16 22:21:26'),
              ('23','4', '5','Learning Design Title Demo 23','Lesson','1','20 studenti adolescenti di livello B1','2012-01-10 22:21:26', '2013-01-15 22:21:26'),
              ('24','5', NULL,'Learning Design Title Demo 24','Lesson','1','20 studenti adolescenti di livello B1','2012-01-09 22:21:26', '2013-01-14 22:21:26'),
              ('25','1', NULL,'Learning Design Title Demo 25','Lesson','1','20 studenti adolescenti di livello B1','2012-01-08 22:21:26', '2013-01-13 22:21:26'),
              ('26','1', '1','Learning Design Title Demo 26','Module','0','20 studenti adolescenti di livello B1','2012-01-07 22:21:26', '2013-01-12 22:21:26'),
              ('27','2', NULL,'Learning Design Title Demo 27','Semester','1','20 studenti adolescenti di livello B1','2012-01-06 22:21:26', '2013-01-11 22:21:26'),
              ('28','3', NULL,'Learning Design Title Demo 28','Lesson','1','20 studenti adolescenti di livello B1','2012-01-05 22:21:26', '2013-01-10 22:21:26'),
              ('29','4', NULL,'Learning Design Title Demo 29','Semester','1','20 studenti adolescenti di livello B1','2012-01-04 22:21:26', '2013-01-09 22:21:26'),
              ('30','4', NULL,'Learning Design Title Demo 30','Module','0','20 studenti adolescenti di livello B1','2012-01-02 22:21:26', '2013-01-07 22:21:26');

INSERT INTO `subject` (`id`, `name`)
VALUES ('1', 'Topic 1'),
('2', 'Topic 2'),
('3', 'Topic 3'),
('4', 'Topic 4'),
('5', 'Topic 5');


INSERT INTO `concerns` (`subject_id`, `ld_id`)
VALUES
 ('1','1'),
 ('2','2'),
 ('3','3'),
 ('4','4'),
 ('5','5'),
 ('1','6'),
 ('2','7'),
 ('3','8'),
 ('4','9'),
 ('5','10'),
 ('1','11'),
 ('2','12'),
 ('3','13'),
 ('4','14'),
 ('5','15'),
 ('1','16'),
 ('2','17'),
 ('3','18'),
 ('4','19'),
 ('5','20'),
 ('1','21'),
 ('2','22'),
 ('3','23'),
 ('4','24'),
 ('5','25'),
 ('1','26'),
 ('2','27'),
 ('3','28'),
 ('4','29'),
 ('5','30'),
 ('1','30'),
 ('2','29'),
 ('4','27'),
 ('5','26'),
 ('1','25'),
 ('2','24'),
 ('4','22'),
 ('5','21'),
 ('1','20'),
 ('2','19'),
 ('4','17'),
 ('5','16'),
 ('1','15'),
 ('2','14'),
 ('4','12'),
 ('5','11'),
 ('1','10'),
 ('2','9'),
 ('4','7'),
 ('5','6'),
 ('1','5'),
 ('2','4'),
 ('4','2'),
 ('5','1');


INSERT INTO `objective` (`id`, `descr`)
VALUES ('1', 'Objective 1'),
('2', 'Objective 2'),
('3', 'Objective 3'),
('4', 'Objective 4'),
('5', 'Objective 5'),
('6', 'Objective 6');

INSERT INTO `aims` (`ld_id`, `objective_id`)
VALUES
('1','1'),
('2','2'),
('3','3'),
('4','4'),
('5','5'),
('6','6'),
('7','1'),
('8','2'),
('9','3'),
('10','4'),
('11','5'),
('12','6'),
('13','1'),
('14','2'),
('15','3'),
('16','4'),
('17','5'),
('18','6'),
('19','1'),
('20','2'),
('21','3'),
('22','4'),
('23','5'),
('24','6'),
('25','1'),
('26','2'),
('27','3'),
('28','4'),
('29','5'),
('30','6'),
('1','6'),
('2','6'),
('3','6'),
('4','6'),
('5','6'),
('6','5'),
('7','5'),
('8','5'),
('9','5'),
('10','5'),
('11','4'),
('12','4'),
('13','4'),
('14','4'),
('15','4'),
('16','3'),
('17','3'),
('18','3'),
('19','3'),
('20','3'),
('21','2'),
('22','2'),
('23','2'),
('24','2'),
('25','2'),
('26','1'),
('27','1'),
('28','1'),
('29','1'),
('30','1');

INSERT INTO `needs` (`id`, `ld_id`, `ld_requisite_id`,`objective_id`)
VALUES
('1', '1', NULL , '1' ),
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


INSERT INTO `likes` (`user_id`, `ld_id`)
VALUES
('1','1'),
('2','2'),
('3','3'),
('4','4'),
('5','5'),
('1','6'),
('2','7'),
('3','8'),
('4','9'),
('5','10'),
('1','11'),
('2','12'),
('3','13'),
('4','14'),
('5','15'),
('1','16'),
('2','17'),
('3','18'),
('4','19'),
('5','20'),
('1','21'),
('2','22'),
('3','23'),
('4','24'),
('5','25'),
('1','26'),
('2','27'),
('3','28'),
('4','29'),
('5','30');




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

INSERT INTO `activity` (`id`, `students_id`, `name`, `type`, `dur_min`, `dur_hh`, `dur_dd`, `dur_mon`, `pract_descr`, `edu_descr`, `modality`)
VALUES
('1','1','Learning Activity 1','1','15','0','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('2','1','Learning Activity 2','1','0','0','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('3','1','Learning Activity 3','1','30','0','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','2'),
('4','1','Learning Activity 4','1','0','0','2','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('5','1','Support Activity 1','2','0','0','15','1','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','2'),
('6','1','Learning Activity 5','1','30','0','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('7','1','Learning Activity 6','1','30','3','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('8','1','Learning Activity 7','1','0','0','5','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('9','1','Support Activity 2','2','0','0','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','2'),
('10','1','Evaluation Activity 1','3','0','2','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('11','2','Learning Activity 8','1','15','0','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('12','2','Learning Activity 9','1','0','2','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('13','2','Learning Activity 10','1','30','0','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','2'),
('14','2','Learning Activity 11','1','0','0','2','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('15','2','Support Activity 12','2','0','0','15','1','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','2'),
('16','2','Learning Activity 13','1','30','0','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('17','2','Learning Activity 14','1','30','3','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('18','2','Learning Activity 15','1','0','0','5','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('19','2','Support Activity 16','2','0','0','0','1','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','2'),
('20','2','Evaluation Activity 17','3','0','2','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('21','3','Learning Activity 18','1','15','0','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('22','3','Learning Activity 19','1','0','2','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('23','3','Learning Activity 20','1','30','0','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','2'),
('24','3','Learning Activity 21','1','0','0','2','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('25','3','Support Activity 22','2','0','0','15','1','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','2'),
('26','3','Learning Activity 23','1','30','0','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('27','3','Learning Activity 24','1','30','3','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('28','3','Learning Activity 25','1','0','0','5','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('29','3','Support Activity 26','2','0','0','0','1','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','2'),
('30','3','Evaluation Activity 27','3','0','2','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('31','4','Learning Activity 28','1','15','0','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('32','4','Learning Activity 29','1','0','2','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('33','4','Learning Activity 30','1','30','0','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','2'),
('34','4','Learning Activity 31','1','0','0','2','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('35','4','Support Activity 32','2','0','0','15','1','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','2'),
('36','4','Learning Activity 33','1','30','0','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('37','4','Learning Activity 34','1','30','3','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('38','4','Learning Activity 35','1','0','0','5','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('39','4','Support Activity 36','2','0','0','0','1','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','2'),
('40','4','Evaluation Activity 37','3','0','2','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('41','5','Learning Activity 38','1','15','0','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('42','5','Learning Activity 39','1','0','2','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('43','5','Learning Activity 40','1','30','0','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','2'),
('44','5','Learning Activity 41','1','0','0','2','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('45','5','Support Activity 42','2','0','0','15','1','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','2'),
('46','5','Learning Activity 43','1','30','0','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('47','5','Learning Activity 44','1','30','3','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('48','5','Learning Activity 45','1','0','0','5','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1'),
('49','5','Support Activity 46','2','0','0','0','1','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','2'),
('50','5','Evaluation Activity 47','3','0','2','0','0','Practical description: what to do for the execution of this activity','Pedagogical Description: how to obtain better results and improve learning during the activity','1');

INSERT INTO `activity_group` (`id`, `name`)
VALUES
('1',NULL),
('2','Group 2 Name'),
('3',NULL),
('4','Group 3 Name'),
('5','Group 4 Name'),
('6',NULL),
('7','Group 5 Name'),
('8',NULL),
('9','Group 6 Name'),
('10','Group 7 Name');

INSERT INTO `participates` (`id`, `activity_group_id`, `activity_id`, `ld_is_part_id`, `level`, `position`)
VALUES
('1','1','1',NULL,'1','1'),
('2','1','2',NULL,'1','2'),
('3','1','3',NULL,'2','1'),
('4','1','4',NULL,'2','2'),
('5','2',NULL,'7','1','1'),
('6','2','6',NULL,'2','1'),
('7','2','7',NULL,'2','2'),
('8','3','11',NULL,'1','1'),
('9','3','12',NULL,'2','1'),
('10','4','13',NULL,'1','1'),
('11','4','14',NULL,'2','1'),
('12','5','21',NULL,'1','1'),
('13','5','22',NULL,'1','2'),
('14','5','23',NULL,'1','3'),
('15','5',NULL,'2','2','1'),
('16','5','24',NULL,'3','1'),
('17','5','26',NULL,'3','2'),
('18','6','31',NULL,'1','1'),
('19','6','32',NULL,'1','2'),
('20','6','33',NULL,'1','3'),
('21','6','34',NULL,'1','4'),
('22','7',NULL,'1','1','1'),
('23','7',NULL,'3','1','2'),
('24','7','35',NULL,'2','1'),
('25','7','36',NULL,'2','2'),
('26','7','37',NULL,'2','3'),
('27','7','38',NULL,'2','4'),
('28','8','39',NULL,'1','1'),
('29','8','40',NULL,'1','2'),
('30','9',NULL,'5','1','1'),
('31','10','42',NULL,'1','1'),
('32','10','43',NULL,'1','2'),
('33','10',NULL,'9','1','3');

INSERT INTO `composes` (`id`, `ld_id`, `activity_id`, `ld_part_id`, `activity_group_id`, `level`, `position`)
VALUES
('1','1','5',NULL,NULL,'1','1'),
('2','1',NULL,NULL,'1','2','1'),
('3','1','9',NULL,NULL,'3','1'),
('4','1','8',NULL,NULL,'3','2'),
('5','1',NULL,'2',NULL,'4','1'),
('6','1',NULL,NULL,'2','5','1'),
('7','1','10',NULL,NULL,'6','1'),
('8','2',NULL,NULL,'3','1','1'),
('9','2',NULL,NULL,'4','1','2'),
('10','2','15',NULL,NULL,'2','1'),
('11','2','16',NULL,NULL,'2','2'),
('12','2','17',NULL,NULL,'2','3'),
('13','2','18',NULL,NULL,'2','4'),
('14','2','19',NULL,NULL,'3','1'),
('15','2','20',NULL,NULL,'4','1'),
('16','3','25',NULL,NULL,'1','1'),
('17','3',NULL,NULL,'5','2','1'),
('18','3','27',NULL,NULL,'3','1'),
('19','3','28',NULL,NULL,'3','2'),
('20','3','29',NULL,NULL,'4','1'),
('21','3','30',NULL,NULL,'4','2'),
('22','4',NULL,NULL,'6','1','1'),
('23','4',NULL,NULL,'7','2','1'),
('24','4',NULL,NULL,'8','3','1'),
('25','5','41',NULL,NULL,'1','1'),
('26','5',NULL,'7',NULL,'2','1'),
('27','5',NULL,NULL,'9','2','2'),
('28','5','44',NULL,NULL,'3','1'),
('29','5','45',NULL,NULL,'4','1'),
('30','5','46',NULL,NULL,'4','2'),
('31','5','47',NULL,NULL,'4','3'),
('32','5','48',NULL,NULL,'5','1'),
('33','5',NULL,NULL,'10','5','2'),
('34','5','49',NULL,NULL,'6','1'),
('35','5','50',NULL,NULL,'6','3'),
('36','5',NULL,'2',NULL,'6','2');


INSERT INTO `technology` (`id`, `name`)
VALUES
('1','Tablet'),
('2','PC'),
('3','Smartphone'),
('4','Whiteboard'),
('5','Internet');


INSERT INTO `supports` (`technology_id`,`activity_id`)
VALUES
('1','1'),
('2','2'),
('3','2'),
('4','3'),
('5','5'),
('1','6'),
('2','7'),
('3','7'),
('4','8'),
('5','10'),
('1','12'),
('2','12'),
('3','12'),
('4','15'),
('5','16'),
('1','19'),
('2','22'),
('3','25'),
('4','25'),
('5','29'),
('1','31'),
('2','37'),
('3','37'),
('4','38'),
('5','44'),
('1','46'),
('2','46'),
('3','47'),
('4','47'),
('5','50');

INSERT INTO `resource` (`id`, `activity_id`, `name`, `type`, `descr`, `link`, `copy`)
VALUES
('1','1','Didactical resource name 1','website','Description of the didactical resource number 1','http://#',NULL),
('2','2','Didactical resource name 2','document','Description of the didactical resource number 2',NULL,'Carlo Neri'),
('3','5','Didactical resource name 3','video','Description of the didactical resource number 3','http://#',NULL),
('4','7','Didactical resource name 4','audio','Description of the didactical resource number 4',NULL,NULL),
('5','12','Didactical resource name 5','website','Description of the didactical resource number 5','http://#','www.copy.com'),
('6','14','Didactical resource name 6','image','Description of the didactical resource number 6','http://#',NULL),
('7','18','Didactical resource name 7','document','Description of the didactical resource number 7',NULL,NULL),
('8','22','Didactical resource name 8','website','Description of the didactical resource number 8','http://#',NULL),
('9','24','Didactical resource name 9','video','Description of the didactical resource number 9',NULL,'Mario lorci'),
('10','29','Didactical resource name 10','website','Description of the didactical resource number 10','http://#',NULL),
('11','33','Didactical resource name 11','document','Description of the didactical resource number 11','http://#',NULL),
('12','34','Didactical resource name 12','audio','Description of the didactical resource number 12',NULL,NULL),
('13','37','Didactical resource name 13','document','Description of the didactical resource number 13','http://#',NULL),
('14','40','Didactical resource name 14','audio','Description of the didactical resource number 14',NULL,'©LOL'),
('15','41','Didactical resource name 15','website','Description of the didactical resource number 15','http://#','Edu ltd.'),
('16','43','Didactical resource name 16','website','Description of the didactical resource number 16','http://#',NULL),
('17','45','Didactical resource name 17','document','Description of the didactical resource number 17',NULL,'© www.ioi.com'),
('18','48','Didactical resource name 18','video','Description of the didactical resource number 18','http://#',NULL),
('19','49','Didactical resource name 19','website','Description of the didactical resource number 19','http://#',NULL),
('20','50','Didactical resource name 20','document','Description of the didactical resource number 20',NULL,NULL);


INSERT INTO `file` (`id`, `resource_id`, `name`, `size`, `uri`, `mime` )
VALUES
('1','2','Name of the file number 1','148','','application/pdf'),
('2','5','Name of the file number 2','2212','','audio/mpeg'),
('3','6','Name of the file number 3','348','','image/gif'),
('4','9','Name of the file number 4','46','','application/pdf'),
('5','10','Name of the file number 5','10100','','text/plain'),
('6','11','Name of the file number 6','2435','','audio/mpeg'),
('7','15','Name of the file number 7','6757','','image/gif'),
('8','18','Name of the file number 8','434567','','application/pdf'),
('9','19','Name of the file number 9','5455','','video/mpeg'),
('10','20','Name of the file number 10','355','','text/plain');


INSERT INTO `classificates` (`ld_id`, `qcer_id`)
VALUES
('1','1'),
('1','2'),
('2','3'),
('3','5'),
('4','2'),
('5','1'),
('5','2'),
('5','3'),
('5','4'),
('5','5'),
('5','6'),
('6','6'),
('8','4'),
('9','1'),
('10','1'),
('11','2'),
('12','5'),
('13','3'),
('14','2'),
('15','6'),
('17','5'),
('18','1'),
('19','2'),
('20','1'),
('21','3'),
('22','3'),
('23','4'),
('24','2'),
('26','6'),
('27','4'),
('28','3'),
('29','5'),
('30','1');
