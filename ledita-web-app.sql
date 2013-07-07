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
  `gender` CHAR(1) NOT NULL ,
  `email` VARCHAR(255) NOT NULL ,
  `salt` CHAR(32) NOT NULL ,
  `hash` CHAR(32) NOT NULL ,
  `workplace` VARCHAR(50) NULL ,
  `city` VARCHAR(50) NULL ,
  `country` VARCHAR(50) NULL ,
  PRIMARY KEY (`id`) ,
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
-- Table `ledita-web-app`.`objective`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ledita-web-app`.`objective` ;

CREATE  TABLE IF NOT EXISTS `ledita-web-app`.`objective` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `descr` VARCHAR(200) NULL ,
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

USE `ledita-web-app` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
