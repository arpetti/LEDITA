SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `ledita-web-app` ;
CREATE SCHEMA IF NOT EXISTS `ledita-web-app` DEFAULT CHARACTER SET utf8 ;
USE `ledita-web-app` ;

-- -----------------------------------------------------
-- Table `students_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `students_type` ;

CREATE  TABLE IF NOT EXISTS `students_type` (
  `type` CHAR(1) NOT NULL ,
  `description` VARCHAR(100) NOT NULL ,
  PRIMARY KEY (`type`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

INSERT INTO `students_type` (`type`, `description`)
VALUES  ('1', 'Classe'),
        ('2', 'Individuale'),
        ('3', 'Coppie'),
        ('4', 'Gruppi');

-- -----------------------------------------------------
-- Table `students`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `students` ;

CREATE  TABLE IF NOT EXISTS `students` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `type` CHAR(1) NOT NULL ,
  `group_number` INT(10) UNSIGNED NULL DEFAULT NULL ,
  `people_per_group` INT(10) UNSIGNED NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  CONSTRAINT `fk_students_type`
    FOREIGN KEY (`type` )
    REFERENCES `students_type` (`type` ))
AUTO_INCREMENT = 20
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `modality_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `modality_type` ;

CREATE  TABLE IF NOT EXISTS `modality_type` (
  `type` CHAR(1) NOT NULL ,
  `description` VARCHAR(100) NOT NULL ,
  PRIMARY KEY (`type`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

INSERT INTO `modality_type` (`type`, `description`)
VALUES  ('1', 'Presenziale'),
        ('2', 'Online'),
        ('3', 'Mista');


-- -----------------------------------------------------
-- Table `activity`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `activity` ;

CREATE  TABLE IF NOT EXISTS `activity` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `students_id` INT(11) NOT NULL ,
  `name` VARCHAR(255) NOT NULL ,
  `dur_min` INT(2) NULL DEFAULT 0 ,
  `dur_hh` INT(2) NULL DEFAULT NULL ,
  `dur_dd` INT(2) NULL DEFAULT NULL ,
  `dur_mon` INT(2) NULL DEFAULT NULL ,
  `pract_descr` VARCHAR(2000) NULL DEFAULT NULL ,
  `edu_descr` VARCHAR(2000) NULL DEFAULT NULL ,
  `modality` CHAR(1) NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_activity_students1_idx` (`students_id` ASC) ,
  CONSTRAINT `fk_activity_students1`
    FOREIGN KEY (`students_id` )
    REFERENCES `students` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION ,
  CONSTRAINT `fk_modality`
    FOREIGN KEY (`modality` )
    REFERENCES `modality_type` (`type` ))
ENGINE = InnoDB
AUTO_INCREMENT = 100
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `activity_group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `activity_group` ;

CREATE  TABLE IF NOT EXISTS `activity_group` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(255) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB
AUTO_INCREMENT = 50
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `image` ;

CREATE  TABLE IF NOT EXISTS `image` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(50) NOT NULL ,
  `size` INT(8) UNSIGNED NOT NULL ,
  `uri` VARCHAR(255) NOT NULL ,
  `mime` VARCHAR(50) NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `uri_UNIQUE` (`uri` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE  TABLE IF NOT EXISTS `user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `image_id` INT(11) NULL DEFAULT NULL ,
  `name` VARCHAR(50) NOT NULL ,
  `last_name` VARCHAR(100) NOT NULL ,
  `email` VARCHAR(255) NOT NULL ,
  `hash` CHAR(60) NOT NULL ,
  `workplace` VARCHAR(50) NULL DEFAULT NULL ,
  `city` VARCHAR(50) NULL DEFAULT NULL ,
  `country` VARCHAR(50) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `UNIQ_EMAIL` (`email` ASC) ,
  INDEX `fk_user_image1_idx` (`image_id` ASC) ,
  CONSTRAINT `fk_user_image1`
    FOREIGN KEY (`image_id` )
    REFERENCES `image` (`id` )
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `scope`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `scope` ;

CREATE  TABLE IF NOT EXISTS `scope` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(255) NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `UNIQ_SCOPE` (`name` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ld`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ld` ;

CREATE  TABLE IF NOT EXISTS `ld` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `user_id` INT(11) NULL DEFAULT NULL ,
  `ld_model_id` INT(11) NULL DEFAULT NULL ,
  `name` VARCHAR(50) NOT NULL ,
  `scope_id` INT(11) NULL DEFAULT NULL ,
  `publication` TINYINT(1) NOT NULL DEFAULT '0' ,
  `students_profile` VARCHAR(500) NULL DEFAULT NULL ,
  `creation_date` DATETIME NOT NULL ,
  `last_edit_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_ld_user1_idx` (`user_id` ASC) ,
  INDEX `fk_ld_ld1_idx` (`ld_model_id` ASC) ,
  INDEX `fk_ld_scope1_idx` (`scope_id` ASC) ,
  CONSTRAINT `fk_ld_ld1`
    FOREIGN KEY (`ld_model_id` )
    REFERENCES `ld` (`id` )
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ld_user1`
    FOREIGN KEY (`user_id` )
    REFERENCES `user` (`id` )
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ld_scope1`
    FOREIGN KEY (`scope_id` )
    REFERENCES `scope` (`id` )
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 50
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `objective`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `objective` ;

CREATE  TABLE IF NOT EXISTS `objective` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `descr` VARCHAR(255) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `UNIQ_OBJECTIVE` (`descr` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 20
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `aims`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `aims` ;

CREATE  TABLE IF NOT EXISTS `aims` (
  `ld_id` INT(11) NOT NULL ,
  `objective_id` INT(11) NOT NULL ,
  PRIMARY KEY (`ld_id`, `objective_id`) ,
  INDEX `fk_ld_has_objective_objective2_idx` (`objective_id` ASC) ,
  INDEX `fk_ld_has_objective_ld2_idx` (`ld_id` ASC) ,
  CONSTRAINT `fk_ld_has_objective_ld2`
    FOREIGN KEY (`ld_id` )
    REFERENCES `ld` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ld_has_objective_objective2`
    FOREIGN KEY (`objective_id` )
    REFERENCES `objective` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qcer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `qcer` ;

CREATE  TABLE IF NOT EXISTS `qcer` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(50) NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `UNIQ_QCER` (`name` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

INSERT INTO `qcer` (`id`, `name`)
VALUES
('1','A1'),
('2','A2'),
('3','B1'),
('4','B2'),
('5','C1'),
('6','C2');


-- -----------------------------------------------------
-- Table `classificates`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `classificates` ;

CREATE  TABLE IF NOT EXISTS `classificates` (
  `qcer_id` INT(11) NOT NULL ,
  `ld_id` INT(11) NOT NULL ,
  PRIMARY KEY (`qcer_id`, `ld_id`) ,
  INDEX `fk_qcer_has_ld_ld1_idx` (`ld_id` ASC) ,
  INDEX `fk_qcer_has_ld_qcer1_idx` (`qcer_id` ASC) ,
  CONSTRAINT `fk_qcer_has_ld_ld1`
    FOREIGN KEY (`ld_id` )
    REFERENCES `ld` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_qcer_has_ld_qcer1`
    FOREIGN KEY (`qcer_id` )
    REFERENCES `qcer` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `comment` ;

CREATE  TABLE IF NOT EXISTS `comment` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `user_id` INT(11) NOT NULL ,
  `comment_father_id` INT(11) NOT NULL DEFAULT '0' ,
  `ld_id` INT(11) NOT NULL ,
  `content` VARCHAR(2000) NOT NULL ,
  `creation_date` DATETIME NOT NULL ,
  `last_edit_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_comment_user1_idx` (`user_id` ASC) ,
  INDEX `fk_comment_comment1_idx` (`comment_father_id` ASC) ,
  INDEX `fk_comment_ld1_idx` (`ld_id` ASC) ,
  CONSTRAINT `fk_comment_comment1`
    FOREIGN KEY (`comment_father_id` )
    REFERENCES `comment` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_ld1`
    FOREIGN KEY (`ld_id` )
    REFERENCES `ld` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`user_id` )
    REFERENCES `user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `composes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `composes` ;

CREATE  TABLE IF NOT EXISTS `composes` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `ld_id` INT(11) NOT NULL ,
  `activity_id` INT(11) NULL DEFAULT NULL ,
  `ld_part_id` INT(11) NULL DEFAULT NULL ,
  `activity_group_id` INT(11) NULL DEFAULT NULL ,
  `level` INT(2) UNSIGNED NULL DEFAULT NULL ,
  `position` INT(1) UNSIGNED NULL DEFAULT NULL COMMENT 'POSSIBLE VALUES:\n1,\n2,\n3,\n4;' ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_activity_has_ld_ld1_idx` (`ld_id` ASC) ,
  INDEX `fk_activity_has_ld_activity1_idx` (`activity_id` ASC) ,
  INDEX `fk_composes_activity_group1_idx` (`activity_group_id` ASC) ,
  INDEX `fk_ld_is_part_of_ld1_idx` (`ld_part_id` ASC) ,
  CONSTRAINT `fk_activity_has_ld_activity1`
    FOREIGN KEY (`activity_id` )
    REFERENCES `activity` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_activity_has_ld_ld1`
    FOREIGN KEY (`ld_id` )
    REFERENCES `ld` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_composes_activity_group1`
    FOREIGN KEY (`activity_group_id` )
    REFERENCES `activity_group` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ld_is_part_of_ld1`
    FOREIGN KEY (`ld_part_id` )
    REFERENCES `ld` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 100
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `subject`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `subject` ;

CREATE  TABLE IF NOT EXISTS `subject` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(255) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `UNIQ_SUBJECT` (`name` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `concerns`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `concerns` ;

CREATE  TABLE IF NOT EXISTS `concerns` (
  `subject_id` INT(11) NOT NULL ,
  `ld_id` INT(11) NOT NULL ,
  PRIMARY KEY (`subject_id`, `ld_id`) ,
  INDEX `fk_subject_has_ld_ld1_idx` (`ld_id` ASC) ,
  INDEX `fk_subject_has_ld_subject1_idx` (`subject_id` ASC) ,
  CONSTRAINT `fk_subject_has_ld_ld1`
    FOREIGN KEY (`ld_id` )
    REFERENCES `ld` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_subject_has_ld_subject1`
    FOREIGN KEY (`subject_id` )
    REFERENCES `subject` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tag` ;

CREATE  TABLE IF NOT EXISTS `tag` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(255) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `describes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `describes` ;

CREATE  TABLE IF NOT EXISTS `describes` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `tag_id` INT(11) NOT NULL ,
  `comment_id` INT(11) NULL DEFAULT NULL ,
  `activity_id` INT(11) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_activity_has_tag_tag1_idx` (`tag_id` ASC) ,
  INDEX `fk_describes_comment1_idx` (`comment_id` ASC) ,
  INDEX `fk_describes_activity1_idx` (`activity_id` ASC) ,
  CONSTRAINT `fk_activity_has_tag_tag1`
    FOREIGN KEY (`tag_id` )
    REFERENCES `tag` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_describes_activity1`
    FOREIGN KEY (`activity_id` )
    REFERENCES `activity` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_describes_comment1`
    FOREIGN KEY (`comment_id` )
    REFERENCES `comment` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `resource`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `resource` ;

CREATE  TABLE IF NOT EXISTS `resource` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `activity_id` INT(11) NOT NULL ,
  `name` VARCHAR(50) NOT NULL ,
  `type` VARCHAR(50) NOT NULL ,
  `descr` VARCHAR(500) NULL DEFAULT NULL ,
  `link` VARCHAR(255) NULL DEFAULT NULL ,
  `copy` VARCHAR(255) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_resource_activity1_idx` (`activity_id` ASC) ,
  CONSTRAINT `fk_resource_activity1`
    FOREIGN KEY (`activity_id` )
    REFERENCES `activity` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
AUTO_INCREMENT = 50
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `file`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `file` ;

CREATE  TABLE IF NOT EXISTS `file` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `resource_id` INT(11) NOT NULL ,
  `name` VARCHAR(50) NOT NULL ,
  `size` INT(10) UNSIGNED NULL DEFAULT NULL ,
  `uri` VARCHAR(255) NULL DEFAULT NULL ,
  `mime` VARCHAR(50) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_file_resource1_idx` (`resource_id` ASC) ,
  CONSTRAINT `fk_file_resource1`
    FOREIGN KEY (`resource_id` )
    REFERENCES `resource` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
AUTO_INCREMENT = 50
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `likes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `likes` ;

CREATE  TABLE IF NOT EXISTS `likes` (
  `user_id` INT(11) NOT NULL ,
  `ld_id` INT(11) NOT NULL ,
  PRIMARY KEY (`user_id`, `ld_id`) ,
  INDEX `fk_ld_has_user_user1_idx` (`user_id` ASC) ,
  INDEX `fk_ld_has_user_ld1_idx` (`ld_id` ASC) ,
  CONSTRAINT `fk_ld_has_user_ld1`
    FOREIGN KEY (`ld_id` )
    REFERENCES `ld` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ld_has_user_user1`
    FOREIGN KEY (`user_id` )
    REFERENCES `user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `needs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `needs` ;

CREATE  TABLE IF NOT EXISTS `needs` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `ld_id` INT(11) NOT NULL ,
  `ld_requisite_id` INT(11) NULL DEFAULT NULL ,
  `objective_id` INT(11) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_ld_has_objective_objective1_idx` (`objective_id` ASC) ,
  INDEX `fk_ld_has_objective_ld1_idx` (`ld_id` ASC) ,
  INDEX `fk_needs_ld1_idx` (`ld_requisite_id` ASC) ,
  CONSTRAINT `fk_ld_has_objective_ld1`
    FOREIGN KEY (`ld_id` )
    REFERENCES `ld` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ld_has_objective_objective1`
    FOREIGN KEY (`objective_id` )
    REFERENCES `objective` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_needs_ld1`
    FOREIGN KEY (`ld_requisite_id` )
    REFERENCES `ld` (`id` )
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 20
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `participates`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `participates` ;

CREATE  TABLE IF NOT EXISTS `participates` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `activity_group_id` INT(11) NOT NULL ,
  `activity_id` INT(11) NULL DEFAULT NULL ,
  `ld_is_part_id` INT(11) NULL DEFAULT NULL ,
  `level` INT(2) UNSIGNED NULL DEFAULT NULL ,
  `position` INT(1) UNSIGNED NULL DEFAULT NULL COMMENT 'POSSIBLE VALUES:\n1,\n2,\n3,\n4;' ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_activity_has_activity_group_activity_group1_idx` (`activity_group_id` ASC) ,
  INDEX `fk_activity_has_activity_group_activity1_idx` (`activity_id` ASC) ,
  INDEX `fk_ld_has_acitivty_group_idx` (`ld_is_part_id` ASC) ,
  CONSTRAINT `fk_activity_has_activity_group_activity1`
    FOREIGN KEY (`activity_id` )
    REFERENCES `activity` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_activity_has_activity_group_activity_group1`
    FOREIGN KEY (`activity_group_id` )
    REFERENCES `activity_group` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ld_has_acitivty_group`
    FOREIGN KEY (`ld_is_part_id` )
    REFERENCES `ld` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
AUTO_INCREMENT = 100
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `technology`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `technology` ;

CREATE  TABLE IF NOT EXISTS `technology` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(50) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) )
AUTO_INCREMENT = 50
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `supports`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `supports` ;

CREATE  TABLE IF NOT EXISTS `supports` (
  `technology_id` INT(11) NOT NULL ,
  `activity_id` INT(11) NOT NULL ,
  PRIMARY KEY (`technology_id`, `activity_id`) ,
  INDEX `fk_technology_has_activity_activity1_idx` (`activity_id` ASC) ,
  INDEX `fk_technology_has_activity_technology1_idx` (`technology_id` ASC) ,
  CONSTRAINT `fk_technology_has_activity_activity1`
    FOREIGN KEY (`activity_id` )
    REFERENCES `activity` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_technology_has_activity_technology1`
    FOREIGN KEY (`technology_id` )
    REFERENCES `technology` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Views
-- -----------------------------------------------------

CREATE OR REPLACE VIEW vw_ld_user AS
  SELECT ld.id as ld_id
    , ld.ld_model_id
    , ld.name as ld_name
    , scope.name as ld_scope
    , ld.publication as ld_publication
    , ld.students_profile as ld_students_profile
    , ld.creation_date as ld_creation_date
    , ld.last_edit_date as ld_last_edit_date
    , user.id as user_id
    , user.name as user_name
    , user.last_name as user_last_name
  FROM ld
  INNER JOIN user
  	ON ld.user_id = user.id
  INNER JOIN scope
  	on ld.scope_id = scope.id;

CREATE OR REPLACE VIEW vw_ld_subject AS
  SELECT ld.id as ld_id
    , ld.name as ld_name
    , subject.id as subject_id
    , subject.name as subject_name
  FROM ld
  INNER JOIN concerns
  	ON ld.id = concerns.ld_id
  INNER JOIN subject
  	ON concerns.subject_id = subject.id;

CREATE OR REPLACE VIEW vw_ld_objective AS
  SELECT ld.id as ld_id
    , ld.name as ld_name
    , objective.id as objective_id
    , objective.descr as objective_descr
  FROM ld
  INNER JOIN aims
    ON ld.id = aims.ld_id
  INNER JOIN objective
    ON aims.objective_id = objective.id;

CREATE OR REPLACE VIEW vw_ld_prerequisite AS
  (SELECT ld.id as ld_id
    , ld.name as ld_name
    , objective.id as prereq_id
    , objective.descr as prereq_name
    , 'OBJECTIVE' as prereq_type
  FROM ld
  INNER JOIN needs
    ON ld.id = needs.ld_id
  INNER JOIN objective
    on needs.objective_id = objective.id )
  UNION
  (SELECT ldsource.id as ld_id
    , ldsource.name as ld_name
    , ldtarget.id as prereq_id
    , ldtarget.name as prereq_name
    , 'LD' as prereq_type
  FROM ld ldsource
  INNER JOIN needs
    ON ldsource.id = needs.ld_id
  INNER JOIN ld ldtarget
    on needs.ld_requisite_id = ldtarget.id);

CREATE OR REPLACE VIEW vw_activity_org AS
  SELECT activity.id as activity_id
    , activity.name as activity_name
    , students.group_number as students_group_number
    , students.people_per_group as students_people_per_group
    , students_type.description as students_type
    , IF(students_type.description='GROUP', 
        CONCAT(
            IF(students.group_number IS NOT NULL, CAST(students.group_number AS CHAR), ''),
            'G',
            IF(students.people_per_group IS NOT NULL, 
              CONCAT(' x ', CAST(students.people_per_group AS CHAR)), 
              '')
        ), 
        students_type.description) as org_label
  FROM activity
  INNER JOIN students
    ON activity.students_id = students.id
  INNER JOIN students_type
    ON students.type = students_type.type;  

CREATE OR REPLACE VIEW vw_activity_technology AS
  SELECT activity.id as activity_id
    , activity.name as activity_name
    , technology.id as technology_id
    , technology.name as technology_name
  FROM activity
  INNER JOIN supports
    ON activity.id = supports.activity_id
  INNER JOIN technology
    ON supports.technology_id = technology.id;

CREATE OR REPLACE VIEW vw_activity_resource AS
  (SELECT activity.id as activity_id
    , activity.name as activity_name
    , resource.id as resource_id
    , resource.name as resource_name
    , resource.type as resource_type
    , resource.descr as resource_descr
    , resource.copy as resource_copy
    , resource.link as resource_link
    FROM activity
  INNER JOIN resource
    ON activity.id = resource.activity_id);

CREATE OR REPLACE VIEW vw_ld_qcer AS
  (SELECT ld.id as ld_id
    , qcer.name as qcer_name
  FROM ld
  INNER JOIN classificates
    on ld.id = classificates.ld_id
  INNER JOIN qcer
    on classificates.qcer_id = qcer.id);   

CREATE OR REPLACE VIEW vw_ld_node AS
  (SELECT ldsource.id as ld_id
    , ldsource.name as ld_name
    , composes.level as level
    , composes.position as position
    , ldtarget.id as node_id
    , ldtarget.name as node_name
    , scope.name as scope
    , 'LD' as type
    , null as org_label
    , null as dur_min
    , null as dur_hh
    , null as dur_dd
    , null as dur_mon
    , null as pract_descr
    , null as edu_descr
    , null as modality
  FROM ld ldsource
  INNER JOIN composes
    ON ldsource.id = composes.ld_id
  INNER JOIN ld ldtarget
    on composes.ld_part_id = ldtarget.id
  INNER JOIN scope
  	on ldtarget.scope_id = scope.id)
  UNION
  (SELECT ldsource.id as ld_id
    , ldsource.name as ld_name
    , composes.level as level
    , composes.position as position
    , activity.id as node_id
    , activity.name as node_name
    , null as scope
    , 'ACTIVITY' as type
    , vw_activity_org.org_label as org_label
    , activity.dur_min as dur_min
    , activity.dur_hh as dur_hh
    , activity.dur_dd as dur_dd
    , activity.dur_mon as dur_mon
    , activity.pract_descr as pract_descr
    , activity.edu_descr as edu_descr
    , modality_type.description as modality
  FROM ld ldsource
  INNER JOIN composes
    ON ldsource.id = composes.ld_id
  INNER JOIN activity
    on composes.activity_id = activity.id
  INNER JOIN vw_activity_org
    on activity.id = vw_activity_org.activity_id
  INNER JOIN modality_type
    on activity.modality = modality_type.type)
  UNION
  (SELECT ldsource.id as ld_id
    , ldsource.name as ld_name
    , composes.level as level
    , composes.position as position
    , activity_group.id as node_id
    , activity_group.name as node_name
    , null as scope
    , 'ACTIVITY_GROUP' as type
    , null as org_label
    , null as dur_min
    , null as dur_hh
    , null as dur_dd
    , null as dur_mon
    , null as pract_descr
    , null as edu_descr
    , null as modality
  FROM ld ldsource
  INNER JOIN composes
    ON ldsource.id = composes.ld_id
  INNER JOIN activity_group
    on composes.activity_group_id = activity_group.id); 

CREATE OR REPLACE VIEW vw_activity_group_max_pos AS
  SELECT activity_group_id as activity_group_id
    , max(position) as max_position 
  FROM participates 
  GROUP BY activity_group_id;  

CREATE OR REPLACE VIEW vw_group AS
  (SELECT activity_group.id as group_id
    , activity_group.name as group_name
    , participates.level as level
    , participates.position as position
    , activity.id as group_child_id
    , activity.name as group_child_name
    , null as scope
    , pos.max_position as max_position
    , 'ACTIVITY' as group_child_type
    , vw_activity_org.org_label as org_label
    , activity.dur_min as dur_min
    , activity.dur_hh as dur_hh
    , activity.dur_dd as dur_dd
    , activity.dur_mon as dur_mon
    , activity.pract_descr as pract_descr
    , activity.edu_descr as edu_descr
    , modality_type.description as modality
  FROM activity_group
  INNER JOIN vw_activity_group_max_pos pos
    ON activity_group.id = pos.activity_group_id
  INNER JOIN participates
    ON activity_group.id = participates.activity_group_id
  INNER JOIN activity
    ON participates.activity_id = activity.id
  INNER JOIN vw_activity_org
    ON activity.id = vw_activity_org.activity_id
  INNER JOIN modality_type
    on activity.modality = modality_type.type)
  UNION
  (SELECT activity_group.id as group_id
    , activity_group.name as group_name
    , participates.level as level
    , participates.position as position
    , ld.id as group_child_id
    , ld.name as group_child_name
    , scope.name as scope
    , pos.max_position as max_position
    , 'LD' as group_child_type
    , null as org_label
    , null as dur_min
    , null as dur_hh
    , null as dur_dd
    , null as dur_mon
    , null as pract_descr
    , null as edu_descr
    , null as modality
  FROM activity_group
  INNER JOIN vw_activity_group_max_pos pos
    ON activity_group.id = pos.activity_group_id
  INNER JOIN participates
    ON activity_group.id = participates.activity_group_id
  INNER JOIN ld
    ON participates.ld_is_part_id = ld.id
  INNER JOIN scope
  	on ld.scope_id = scope.id);

CREATE OR REPLACE VIEW vw_user_profile_image AS
	(SELECT user.id AS id
		, user.name as name
		, user.last_name as last_name
		, user.email as email
		, user.workplace as workplace
		, user.city as city
		, user.country as country
		, user.hash as hash
		, image.uri as image_uri
	FROM user
	LEFT OUTER JOIN image
		ON user.image_id = image.id);

CREATE OR REPLACE VIEW vw_user_profile AS
	(SELECT user.id as user_id
		, user.image_id
		, user.name as user_name
		, user.last_name
		, user.email
		, user.workplace
		, user.city
		, user.country
		, ld.id as ld_id
		, ld.name as ld_name
		, scope.name as scope
		, ld.publication
		, ld.creation_date
	FROM user
	RIGHT JOIN ld
		ON user.id = ld.user_id
	INNER JOIN scope
		on ld.scope_id = scope.id);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;