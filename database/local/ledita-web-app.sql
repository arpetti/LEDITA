SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `ledita-web-app` ;
CREATE SCHEMA IF NOT EXISTS `ledita-web-app` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `ledita-web-app` ;

-- -----------------------------------------------------
-- Table `ledita-web-app`.`image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`image` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`image` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(50) NOT NULL ,
  `size` INT(8) UNSIGNED NOT NULL ,
  `uri` VARCHAR(255) NOT NULL ,
  `mime` VARCHAR(50) NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `uri_UNIQUE` (`uri` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`user` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `image_id` INT NULL ,
  `name` VARCHAR(50) NOT NULL ,
  `last_name` VARCHAR(100) NOT NULL ,
  `gender` CHAR(1) NULL ,
  `email` VARCHAR(255) NOT NULL ,
  `hash` CHAR(60) NOT NULL ,
  `workplace` VARCHAR(50) NULL ,
  `city` VARCHAR(50) NULL ,
  `country` VARCHAR(50) NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE KEY `UNIQ_EMAIL` (`email`) ,
  INDEX `fk_user_image1_idx` (`image_id` ASC) ,
  CONSTRAINT `fk_user_image1`
    FOREIGN KEY (`image_id` )
    REFERENCES `ledita-web-app`.`image` (`id` )
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`ld`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`ld` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`ld` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `user_id` INT NULL DEFAULT NULL ,
  `ld_model_id` INT NULL DEFAULT NULL ,
  `name` VARCHAR(50) NOT NULL ,
  `scope` VARCHAR(50) NOT NULL ,
  `publication` TINYINT(1) NOT NULL DEFAULT FALSE ,
  `students_profile` VARCHAR(2000) NULL ,
  `creation_date` DATETIME NOT NULL ,
  `last_edit_date` TIMESTAMP NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_ld_user1_idx` (`user_id` ASC) ,
  INDEX `fk_ld_ld1_idx` (`ld_model_id` ASC) ,
  CONSTRAINT `fk_ld_user1`
    FOREIGN KEY (`user_id` )
    REFERENCES `ledita-web-app`.`user` (`id` )
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ld_ld1`
    FOREIGN KEY (`ld_model_id` )
    REFERENCES `ledita-web-app`.`ld` (`id` )
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`students`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`students` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`students` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `type` CHAR(1) NOT NULL COMMENT 'TYPE:\n1=ALL\n2=INDIVIDUAL\n3=PAIR\n4=GROUP' ,
  `group_number` INT UNSIGNED NULL ,
  `people_per_group` INT UNSIGNED NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`activity`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`activity` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`activity` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `students_id` INT NOT NULL ,
  `name` VARCHAR(255) NOT NULL ,
  `type` CHAR(1) NOT NULL ,
  `duration` TIME NOT NULL DEFAULT 0 ,
  `pract_descr` VARCHAR(2000) NULL ,
  `edu_descr` VARCHAR(2000) NULL ,
  `modality` CHAR(1) NOT NULL COMMENT 'Modality:\n1=Face to face\n2=Online\n3=Blanded' ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_activity_students1_idx` (`students_id` ASC) ,
  CONSTRAINT `fk_activity_students1`
    FOREIGN KEY (`students_id` )
    REFERENCES `ledita-web-app`.`students` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`resource`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`resource` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`resource` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `activity_id` INT NOT NULL ,
  `name` VARCHAR(50) NOT NULL ,
  `type` VARCHAR(50) NOT NULL ,
  `descr` VARCHAR(1000) NULL ,
  `link` VARCHAR(255) NULL ,
  `copy` VARCHAR(255) NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_resource_activity1_idx` (`activity_id` ASC) ,
  CONSTRAINT `fk_resource_activity1`
    FOREIGN KEY (`activity_id` )
    REFERENCES `ledita-web-app`.`activity` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`technology`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`technology` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`technology` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(50) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`file`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`file` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`file` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `resource_id` INT NOT NULL ,
  `name` VARCHAR(50) NOT NULL ,
  `size` INT UNSIGNED NULL ,
  `uri` VARCHAR(255) NULL ,
  `mime` VARCHAR(50) NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_file_resource1_idx` (`resource_id` ASC) ,
  CONSTRAINT `fk_file_resource1`
    FOREIGN KEY (`resource_id` )
    REFERENCES `ledita-web-app`.`resource` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`objective`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`objective` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`objective` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `descr` VARCHAR(200) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`qcer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`qcer` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`qcer` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(50) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`subject`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`subject` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`subject` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(100) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`comment` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`comment` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `user_id` INT NOT NULL ,
  `comment_father_id` INT NOT NULL DEFAULT 0 ,
  `ld_id` INT NOT NULL ,
  `content` VARCHAR(2000) NOT NULL ,
  `creation_date` DATETIME NOT NULL ,
  `last_edit_date` TIMESTAMP NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_comment_user1_idx` (`user_id` ASC) ,
  INDEX `fk_comment_comment1_idx` (`comment_father_id` ASC) ,
  INDEX `fk_comment_ld1_idx` (`ld_id` ASC) ,
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`user_id` )
    REFERENCES `ledita-web-app`.`user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_comment1`
    FOREIGN KEY (`comment_father_id` )
    REFERENCES `ledita-web-app`.`comment` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_ld1`
    FOREIGN KEY (`ld_id` )
    REFERENCES `ledita-web-app`.`ld` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`activity_group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`activity_group` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`activity_group` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`tag` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`tag` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(255) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`likes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`likes` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`likes` (
  `user_id` INT NOT NULL ,
  `ld_id` INT NOT NULL ,
  INDEX `fk_ld_has_user_user1_idx` (`user_id` ASC) ,
  INDEX `fk_ld_has_user_ld1_idx` (`ld_id` ASC) ,
  PRIMARY KEY (`user_id`, `ld_id`) ,
  CONSTRAINT `fk_ld_has_user_ld1`
    FOREIGN KEY (`ld_id` )
    REFERENCES `ledita-web-app`.`ld` (`user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ld_has_user_user1`
    FOREIGN KEY (`user_id` )
    REFERENCES `ledita-web-app`.`user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`concerns`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`concerns` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`concerns` (
  `subject_id` INT NOT NULL ,
  `ld_id` INT NOT NULL ,
  INDEX `fk_subject_has_ld_ld1_idx` (`ld_id` ASC) ,
  INDEX `fk_subject_has_ld_subject1_idx` (`subject_id` ASC) ,
  PRIMARY KEY (`subject_id`, `ld_id`) ,
  CONSTRAINT `fk_subject_has_ld_subject1`
    FOREIGN KEY (`subject_id` )
    REFERENCES `ledita-web-app`.`subject` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_subject_has_ld_ld1`
    FOREIGN KEY (`ld_id` )
    REFERENCES `ledita-web-app`.`ld` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`classificates`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`classificates` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`classificates` (
  `qcer_id` INT NOT NULL ,
  `ld_id` INT NOT NULL ,
  PRIMARY KEY (`qcer_id`, `ld_id`) ,
  INDEX `fk_qcer_has_ld_ld1_idx` (`ld_id` ASC) ,
  INDEX `fk_qcer_has_ld_qcer1_idx` (`qcer_id` ASC) ,
  CONSTRAINT `fk_qcer_has_ld_qcer1`
    FOREIGN KEY (`qcer_id` )
    REFERENCES `ledita-web-app`.`qcer` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_qcer_has_ld_ld1`
    FOREIGN KEY (`ld_id` )
    REFERENCES `ledita-web-app`.`ld` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`needs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`needs` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`needs` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `ld_id` INT NOT NULL ,
  `ld_requisite_id` INT NULL ,
  `objective_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_ld_has_objective_objective1_idx` (`objective_id` ASC) ,
  INDEX `fk_ld_has_objective_ld1_idx` (`ld_id` ASC) ,
  INDEX `fk_needs_ld1_idx` (`ld_requisite_id` ASC) ,
  CONSTRAINT `fk_ld_has_objective_ld1`
    FOREIGN KEY (`ld_id` )
    REFERENCES `ledita-web-app`.`ld` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ld_has_objective_objective1`
    FOREIGN KEY (`objective_id` )
    REFERENCES `ledita-web-app`.`objective` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_needs_ld1`
    FOREIGN KEY (`ld_requisite_id` )
    REFERENCES `ledita-web-app`.`ld` (`id` )
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`aims`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`aims` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`aims` (
  `ld_id` INT NOT NULL ,
  `objective_id` INT NOT NULL ,
  PRIMARY KEY (`ld_id`, `objective_id`) ,
  INDEX `fk_ld_has_objective_objective2_idx` (`objective_id` ASC) ,
  INDEX `fk_ld_has_objective_ld2_idx` (`ld_id` ASC) ,
  CONSTRAINT `fk_ld_has_objective_ld2`
    FOREIGN KEY (`ld_id` )
    REFERENCES `ledita-web-app`.`ld` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ld_has_objective_objective2`
    FOREIGN KEY (`objective_id` )
    REFERENCES `ledita-web-app`.`objective` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`composes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`composes` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`composes` (
  `id` INT NOT NULL ,
  `ld_id` INT NOT NULL ,
  `activity_id` INT NULL ,
  `ld_part_id` INT NULL ,
  `activity_group_id` INT NULL ,
  `order` INT UNSIGNED NULL ,
  INDEX `fk_activity_has_ld_ld1_idx` (`ld_id` ASC) ,
  INDEX `fk_activity_has_ld_activity1_idx` (`activity_id` ASC) ,
  INDEX `fk_composes_activity_group1_idx` (`activity_group_id` ASC) ,
  INDEX `fk_ld_is_part_of_ld1_idx` (`ld_part_id` ASC) ,
  PRIMARY KEY (`id`) ,
  CONSTRAINT `fk_activity_has_ld_activity1`
    FOREIGN KEY (`activity_id` )
    REFERENCES `ledita-web-app`.`activity` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_activity_has_ld_ld1`
    FOREIGN KEY (`ld_id` )
    REFERENCES `ledita-web-app`.`ld` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_composes_activity_group1`
    FOREIGN KEY (`activity_group_id` )
    REFERENCES `ledita-web-app`.`activity_group` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ld_is_part_of_ld1`
    FOREIGN KEY (`ld_part_id` )
    REFERENCES `ledita-web-app`.`ld` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`participates`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`participates` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`participates` (
  `id` INT NOT NULL ,
  `activity_group_id` INT NOT NULL ,
  `activity_id` INT NULL ,
  `ld_is_part_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_activity_has_activity_group_activity_group1_idx` (`activity_group_id` ASC) ,
  INDEX `fk_activity_has_activity_group_activity1_idx` (`activity_id` ASC) ,
  INDEX `fk_ld_has_acitivty_group_idx` (`ld_is_part_id` ASC) ,
  CONSTRAINT `fk_activity_has_activity_group_activity1`
    FOREIGN KEY (`activity_id` )
    REFERENCES `ledita-web-app`.`activity` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_activity_has_activity_group_activity_group1`
    FOREIGN KEY (`activity_group_id` )
    REFERENCES `ledita-web-app`.`activity_group` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ld_has_acitivty_group`
    FOREIGN KEY (`ld_is_part_id` )
    REFERENCES `ledita-web-app`.`ld` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`supports`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`supports` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`supports` (
  `technology_id` INT NOT NULL ,
  `activity_id` INT NOT NULL ,
  PRIMARY KEY (`technology_id`, `activity_id`) ,
  INDEX `fk_technology_has_activity_activity1_idx` (`activity_id` ASC) ,
  INDEX `fk_technology_has_activity_technology1_idx` (`technology_id` ASC) ,
  CONSTRAINT `fk_technology_has_activity_technology1`
    FOREIGN KEY (`technology_id` )
    REFERENCES `ledita-web-app`.`technology` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_technology_has_activity_activity1`
    FOREIGN KEY (`activity_id` )
    REFERENCES `ledita-web-app`.`activity` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ledita-web-app`.`describes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`describes` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`describes` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `tag_id` INT NOT NULL ,
  `comment_id` INT NULL ,
  `activity_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_activity_has_tag_tag1_idx` (`tag_id` ASC) ,
  INDEX `fk_describes_comment1_idx` (`comment_id` ASC) ,
  INDEX `fk_describes_activity1_idx` (`activity_id` ASC) ,
  CONSTRAINT `fk_activity_has_tag_tag1`
    FOREIGN KEY (`tag_id` )
    REFERENCES `ledita-web-app`.`tag` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_describes_comment1`
    FOREIGN KEY (`comment_id` )
    REFERENCES `ledita-web-app`.`comment` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_describes_activity1`
    FOREIGN KEY (`activity_id` )
    REFERENCES `ledita-web-app`.`activity` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Views
-- -----------------------------------------------------

CREATE OR REPLACE VIEW vw_ld_user AS 
  SELECT ld.id as ld_id
    , ld.ld_model_id
    , ld.name as ld_name
    , ld.scope as ld_scope
    , ld.publication as ld_publication
    , ld.students_profile as ld_students_profile
    , ld.creation_date as ld_creation_date
    , ld.last_edit_date as ld_last_edi_date
    , user.id as user_id 
    , user.name as user_name
    , user.last_name as user_last_name
  FROM ld
    , user
  WHERE ld.user_id = user.id;

USE `ledita-web-app` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
