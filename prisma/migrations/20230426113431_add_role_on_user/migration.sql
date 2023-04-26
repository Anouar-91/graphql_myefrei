-- CreateTable
CREATE TABLE `course` (
    `idcourse` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `teacher_idteacher` INTEGER NOT NULL,

    UNIQUE INDEX `idcourse_UNIQUE`(`idcourse`),
    INDEX `fk_course_teacher1_idx`(`teacher_idteacher`),
    PRIMARY KEY (`idcourse`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grade` (
    `idgrade` INTEGER NOT NULL AUTO_INCREMENT,
    `result` FLOAT NOT NULL,
    `course_idcourse` INTEGER NOT NULL,
    `student_idstudent` INTEGER NOT NULL,

    UNIQUE INDEX `idgrade_UNIQUE`(`idgrade`),
    INDEX `fk_grade_course1_idx`(`course_idcourse`),
    INDEX `fk_grade_student1_idx`(`student_idstudent`),
    PRIMARY KEY (`idgrade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student` (
    `idstudent` INTEGER NOT NULL AUTO_INCREMENT,
    `user_iduser` INTEGER NOT NULL,
    `ine` VARCHAR(45) NULL,

    UNIQUE INDEX `idstudent_UNIQUE`(`idstudent`),
    INDEX `fk_student_user_idx`(`user_iduser`),
    PRIMARY KEY (`idstudent`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teacher` (
    `idteacher` INTEGER NOT NULL AUTO_INCREMENT,
    `user_iduser` INTEGER NOT NULL,
    `isAgreement` TINYINT NOT NULL,

    UNIQUE INDEX `idteacher_UNIQUE`(`idteacher`),
    INDEX `fk_teacher_user1_idx`(`user_iduser`),
    PRIMARY KEY (`idteacher`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `iduser` INTEGER NOT NULL AUTO_INCREMENT,
    `lastname` VARCHAR(45) NOT NULL,
    `firstname` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `role_idrole` INTEGER NOT NULL,

    UNIQUE INDEX `iduser_UNIQUE`(`iduser`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`iduser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `idrole` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `idrole_UNIQUE`(`idrole`),
    PRIMARY KEY (`idrole`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `course` ADD CONSTRAINT `fk_course_teacher1` FOREIGN KEY (`teacher_idteacher`) REFERENCES `teacher`(`idteacher`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `grade` ADD CONSTRAINT `fk_grade_course1` FOREIGN KEY (`course_idcourse`) REFERENCES `course`(`idcourse`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `grade` ADD CONSTRAINT `fk_grade_student1` FOREIGN KEY (`student_idstudent`) REFERENCES `student`(`idstudent`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `fk_student_user` FOREIGN KEY (`user_iduser`) REFERENCES `user`(`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `teacher` ADD CONSTRAINT `fk_teacher_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user`(`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_role_idrole_fkey` FOREIGN KEY (`role_idrole`) REFERENCES `role`(`idrole`) ON DELETE NO ACTION ON UPDATE NO ACTION;
