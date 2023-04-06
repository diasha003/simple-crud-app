import mysql from "mysql";
import path from "path";
const __dirname = path.resolve();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "myfirstdb",
});

connection.connect();
export default connection;

/*CREATE TABLE `myfirstdb`.`new_table` 
(`id` INT NOT NULL AUTO_INCREMENT , `LastName` VARCHAR NULL , `FirstName` VARCHAR NULL , `MiddleName` VARCHAR NULL , `PhoneNumber` VARCHAR NULL , `Age` INT NULL , `BirthDate` DATE NULL ,
 `Gender` INT NULL , `WorExperience` INT NULL , `Position` VARCHAR NULL , `NumberDepartment` INT NULL , PRIMARY KEY (`id `)*/

/*CREATE TABLE `myfirstdb`.`department` (`id` INT NOT NULL AUTO_INCREMENT , `Name_department` VARCHAR(256) NULL , 
PRIMARY KEY (`id `));*/

/*INSERT INTO `department`( `Name_department`) VALUES ('Technical support'), ('Customer service'),
 ('Commercial department'), ('IT department'), ('Finance department'), ('Accounting office')*/
