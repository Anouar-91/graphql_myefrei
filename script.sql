
CREATE SCHEMA IF NOT EXISTS `myefrei` DEFAULT CHARACTER SET utf8 ;
USE `myefrei` ;

-- -----------------------------------------------------
-- Table `myefrei`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myefrei`.`user` (
  `iduser` INT AUTO_INCREMENT,
  `lastname` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) ,
  UNIQUE INDEX `iduser_UNIQUE` (`iduser` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myefrei`.`student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myefrei`.`student` (
  `idstudent` INT  AUTO_INCREMENT,
  `user_iduser` INT NOT NULL,
  `ine` VARCHAR(45) NULL,
  PRIMARY KEY (`idstudent`),
  INDEX `fk_student_user_idx` (`user_iduser` ASC) ,
  UNIQUE INDEX `idstudent_UNIQUE` (`idstudent` ASC) ,
  CONSTRAINT `fk_student_user`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `myefrei`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myefrei`.`teacher`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myefrei`.`teacher` (
  `idteacher` INT AUTO_INCREMENT,
  `user_iduser` INT NOT NULL,
  `isAgreement` TINYINT NOT NULL,
  PRIMARY KEY (`idteacher`),
  INDEX `fk_teacher_user1_idx` (`user_iduser` ASC) ,
  UNIQUE INDEX `idteacher_UNIQUE` (`idteacher` ASC) ,
  CONSTRAINT `fk_teacher_user1`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `myefrei`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myefrei`.`course`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myefrei`.`course` (
  `idcourse` INT AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `teacher_idteacher` INT NOT NULL,
  PRIMARY KEY (`idcourse`),
  INDEX `fk_course_teacher1_idx` (`teacher_idteacher` ASC) ,
  UNIQUE INDEX `idcourse_UNIQUE` (`idcourse` ASC) ,
  CONSTRAINT `fk_course_teacher1`
    FOREIGN KEY (`teacher_idteacher`)
    REFERENCES `myefrei`.`teacher` (`idteacher`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myefrei`.`grade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myefrei`.`grade` (
  `idgrade` INT AUTO_INCREMENT,
  `result` FLOAT NOT NULL,
  `course_idcourse` INT NOT NULL,
  `student_idstudent` INT NOT NULL,
  PRIMARY KEY (`idgrade`),
  INDEX `fk_grade_course1_idx` (`course_idcourse` ASC) ,
  INDEX `fk_grade_student1_idx` (`student_idstudent` ASC) ,
  UNIQUE INDEX `idgrade_UNIQUE` (`idgrade` ASC) ,
  CONSTRAINT `fk_grade_course1`
    FOREIGN KEY (`course_idcourse`)
    REFERENCES `myefrei`.`course` (`idcourse`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_grade_student1`
    FOREIGN KEY (`student_idstudent`)
    REFERENCES `myefrei`.`student` (`idstudent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
