/*
SQLyog Enterprise - MySQL GUI v8.05 
MySQL - 8.0.27 : Database - gymmanager
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`gymmanager` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `gymmanager`;

/*Table structure for table `__efmigrationshistory` */

DROP TABLE IF EXISTS `__efmigrationshistory`;

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProductVersion` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `__efmigrationshistory` */

insert  into `__efmigrationshistory`(`MigrationId`,`ProductVersion`) values ('20211205020054_InitMigration','5.0.11'),('20220123055221_MembersT6','5.0.11'),('20220127214648_E2Migration','5.0.11'),('20220130182959_E3Migration','5.0.11'),('20220130183339_E3MigrationV2','5.0.11'),('20220130185650_E3MigrationV3','5.0.11'),('20220131024350_E3MigrationV4','5.0.11'),('20220131172313_E4Migration','5.0.11');

/*Table structure for table `aspnetroleclaims` */

DROP TABLE IF EXISTS `aspnetroleclaims`;

CREATE TABLE `aspnetroleclaims` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `RoleId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ClaimType` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ClaimValue` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`Id`),
  KEY `IX_AspNetRoleClaims_RoleId` (`RoleId`),
  CONSTRAINT `FK_AspNetRoleClaims_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `aspnetroleclaims` */

/*Table structure for table `aspnetroles` */

DROP TABLE IF EXISTS `aspnetroles`;

CREATE TABLE `aspnetroles` (
  `Id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NormalizedName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ConcurrencyStamp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `RoleNameIndex` (`NormalizedName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `aspnetroles` */

/*Table structure for table `aspnetuserclaims` */

DROP TABLE IF EXISTS `aspnetuserclaims`;

CREATE TABLE `aspnetuserclaims` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ClaimType` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ClaimValue` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`Id`),
  KEY `IX_AspNetUserClaims_UserId` (`UserId`),
  CONSTRAINT `FK_AspNetUserClaims_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `aspnetuserclaims` */

/*Table structure for table `aspnetuserlogins` */

DROP TABLE IF EXISTS `aspnetuserlogins`;

CREATE TABLE `aspnetuserlogins` (
  `LoginProvider` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProviderKey` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProviderDisplayName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`LoginProvider`,`ProviderKey`),
  KEY `IX_AspNetUserLogins_UserId` (`UserId`),
  CONSTRAINT `FK_AspNetUserLogins_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `aspnetuserlogins` */

/*Table structure for table `aspnetuserroles` */

DROP TABLE IF EXISTS `aspnetuserroles`;

CREATE TABLE `aspnetuserroles` (
  `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `RoleId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`UserId`,`RoleId`),
  KEY `IX_AspNetUserRoles_RoleId` (`RoleId`),
  CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_AspNetUserRoles_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `aspnetuserroles` */

/*Table structure for table `aspnetusers` */

DROP TABLE IF EXISTS `aspnetusers`;

CREATE TABLE `aspnetusers` (
  `Id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `UserName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NormalizedUserName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Email` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NormalizedEmail` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `EmailConfirmed` tinyint(1) NOT NULL,
  `PasswordHash` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `SecurityStamp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ConcurrencyStamp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `PhoneNumber` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `PhoneNumberConfirmed` tinyint(1) NOT NULL,
  `TwoFactorEnabled` tinyint(1) NOT NULL,
  `LockoutEnd` datetime(6) DEFAULT NULL,
  `LockoutEnabled` tinyint(1) NOT NULL,
  `AccessFailedCount` int NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UserNameIndex` (`NormalizedUserName`),
  KEY `EmailIndex` (`NormalizedEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `aspnetusers` */

insert  into `aspnetusers`(`Id`,`UserName`,`NormalizedUserName`,`Email`,`NormalizedEmail`,`EmailConfirmed`,`PasswordHash`,`SecurityStamp`,`ConcurrencyStamp`,`PhoneNumber`,`PhoneNumberConfirmed`,`TwoFactorEnabled`,`LockoutEnd`,`LockoutEnabled`,`AccessFailedCount`) values ('61a1b577-bcfd-42e5-aef2-521b8ec48768','jesusduranr202@gmail.com','JESUSDURANR202@GMAIL.COM','jesusduranr202@gmail.com','JESUSDURANR202@GMAIL.COM',1,'AQAAAAEAACcQAAAAEMh2yocTJEIiYeVWdJNfU/41Ud7FgXsAa5vSTLZjVrYhefe7EeqWHRxfYKLkQRum4A==','PKWJ5QWGYOIPUPITEZ4AR7BCSCPCHC5W','b21e7150-5c15-4c23-906a-a451ccda293a',NULL,0,0,NULL,1,0),('8fa4f9d5-8960-4060-9f9b-04a654e3b061','user@example.com','USER@EXAMPLE.COM','user@example.com','USER@EXAMPLE.COM',1,'AQAAAAEAACcQAAAAEPNaEptu6PShavkjSLwe7xlFFMmFmQWPisEgGBYG4VqJx4qz3x8EPKj7txMuaOKPNw==','4FBN74FXFHLFMMJB266CJ44LXZSGRM4G','bcf344f9-a832-4aa5-9a33-93d7284a971d','0112233445',0,0,NULL,1,0);

/*Table structure for table `aspnetusertokens` */

DROP TABLE IF EXISTS `aspnetusertokens`;

CREATE TABLE `aspnetusertokens` (
  `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LoginProvider` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`UserId`,`LoginProvider`,`Name`),
  CONSTRAINT `FK_AspNetUserTokens_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `aspnetusertokens` */

/*Table structure for table `attendances` */

DROP TABLE IF EXISTS `attendances`;

CREATE TABLE `attendances` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `DateIn` datetime(6) NOT NULL,
  `DateOut` datetime(6) NOT NULL,
  `MemberId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Attendances_MemberId` (`MemberId`),
  CONSTRAINT `FK_Attendances_Members_MemberId` FOREIGN KEY (`MemberId`) REFERENCES `members` (`Id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `attendances` */

insert  into `attendances`(`Id`,`DateIn`,`DateOut`,`MemberId`) values (1,'2022-01-03 12:00:00.000000','2022-01-03 01:00:00.000000',19),(2,'2022-01-31 12:00:00.000000','2022-01-31 03:00:00.000000',19),(3,'2022-01-28 12:00:00.000000','2022-01-28 02:00:00.000000',10),(4,'2022-01-04 12:00:00.000000','2022-01-04 02:00:00.000000',29),(5,'2022-01-16 12:00:00.000000','2022-01-16 03:00:00.000000',12),(6,'2021-12-31 12:00:00.000000','2021-12-31 01:00:00.000000',28),(7,'2022-01-07 12:00:00.000000','2022-01-07 02:00:00.000000',2),(8,'2022-01-01 12:00:00.000000','2022-01-01 01:00:00.000000',10),(9,'2021-12-30 12:00:00.000000','2021-12-30 01:00:00.000000',25),(10,'2021-12-29 12:00:00.000000','2021-12-29 01:00:00.000000',27),(11,'2022-01-01 12:00:00.000000','2022-01-01 03:00:00.000000',16),(12,'2022-01-02 12:00:00.000000','2022-01-02 02:00:00.000000',9),(13,'2022-02-01 12:00:00.000000','2022-02-01 02:00:00.000000',20),(14,'2022-01-04 12:00:00.000000','2022-01-04 01:00:00.000000',5),(15,'2022-01-06 12:00:00.000000','2022-01-06 03:00:00.000000',17),(16,'2021-12-26 12:00:00.000000','2021-12-26 02:00:00.000000',29),(17,'2022-01-20 12:00:00.000000','2022-01-20 02:00:00.000000',6),(18,'2022-01-06 12:00:00.000000','2022-01-06 03:00:00.000000',2),(19,'2022-01-15 12:00:00.000000','2022-01-15 03:00:00.000000',6),(20,'2022-01-20 12:00:00.000000','2022-01-20 01:00:00.000000',15),(21,'2022-01-02 12:00:00.000000','2022-01-02 01:00:00.000000',8),(22,'2022-01-17 12:00:00.000000','2022-01-17 03:00:00.000000',22),(23,'2022-01-14 12:00:00.000000','2022-01-14 02:00:00.000000',10),(24,'2022-01-27 12:00:00.000000','2022-01-27 03:00:00.000000',15),(25,'2022-01-22 12:00:00.000000','2022-01-22 03:00:00.000000',16),(26,'2021-12-29 12:00:00.000000','2021-12-29 01:00:00.000000',8),(27,'2022-01-04 12:00:00.000000','2022-01-04 03:00:00.000000',26),(28,'2021-12-29 12:00:00.000000','2021-12-29 02:00:00.000000',22),(29,'2022-01-02 12:00:00.000000','2022-01-02 01:00:00.000000',29),(30,'2022-01-13 12:00:00.000000','2022-01-13 01:00:00.000000',21),(31,'2022-01-29 12:00:00.000000','2022-01-29 03:00:00.000000',14),(32,'2022-01-26 12:00:00.000000','2022-01-26 03:00:00.000000',25),(33,'2021-12-29 12:00:00.000000','2021-12-29 01:00:00.000000',26),(34,'2021-12-31 12:00:00.000000','2021-12-31 02:00:00.000000',24),(35,'2022-01-07 12:00:00.000000','2022-01-07 01:00:00.000000',21),(36,'2022-01-07 12:00:00.000000','2022-01-07 02:00:00.000000',29),(37,'2022-01-13 12:00:00.000000','2022-01-13 02:00:00.000000',25),(38,'2021-12-27 12:00:00.000000','2021-12-27 02:00:00.000000',9),(39,'2022-01-08 12:00:00.000000','2022-01-08 03:00:00.000000',20),(40,'2022-01-12 12:00:00.000000','2022-01-12 02:00:00.000000',24),(41,'2022-01-04 12:00:00.000000','2022-01-04 03:00:00.000000',10),(42,'2022-01-09 12:00:00.000000','2022-01-09 01:00:00.000000',5),(43,'2022-01-31 12:00:00.000000','2022-01-31 01:00:00.000000',29),(44,'2022-01-06 12:00:00.000000','2022-01-06 01:00:00.000000',25),(45,'2022-01-19 12:00:00.000000','2022-01-19 03:00:00.000000',13),(46,'2022-01-30 12:00:00.000000','2022-01-30 01:00:00.000000',12),(47,'2022-02-01 12:00:00.000000','2022-02-01 01:00:00.000000',21),(48,'2022-02-01 12:00:00.000000','2022-02-01 01:00:00.000000',23),(49,'2021-12-29 12:00:00.000000','2021-12-29 01:00:00.000000',4),(50,'2022-01-26 12:00:00.000000','2022-01-26 02:00:00.000000',3),(51,'2022-01-26 12:00:00.000000','2022-01-26 02:00:00.000000',20),(52,'2022-01-29 12:00:00.000000','2022-01-29 01:00:00.000000',16),(53,'2022-01-13 12:00:00.000000','2022-01-13 01:00:00.000000',6),(54,'2022-01-10 12:00:00.000000','2022-01-10 02:00:00.000000',10),(55,'2022-02-01 12:00:00.000000','2022-02-01 03:00:00.000000',17),(56,'2021-12-25 12:00:00.000000','2021-12-25 02:00:00.000000',21),(57,'2021-12-30 12:00:00.000000','2021-12-30 02:00:00.000000',21),(58,'2022-01-20 12:00:00.000000','2022-01-20 02:00:00.000000',15),(59,'2022-01-29 12:00:00.000000','2022-01-29 03:00:00.000000',29),(60,'2022-01-11 12:00:00.000000','2022-01-11 03:00:00.000000',26),(61,'2022-02-01 12:00:00.000000','2022-02-01 03:00:00.000000',17),(62,'2021-12-28 12:00:00.000000','2021-12-28 02:00:00.000000',19),(63,'2022-01-25 12:00:00.000000','2022-01-25 01:00:00.000000',24),(64,'2021-12-28 12:00:00.000000','2021-12-28 02:00:00.000000',5),(65,'2022-01-24 12:00:00.000000','2022-01-24 02:00:00.000000',16),(66,'2022-01-17 12:00:00.000000','2022-01-17 03:00:00.000000',7),(67,'2022-01-25 12:00:00.000000','2022-01-25 03:00:00.000000',18),(68,'2022-01-16 12:00:00.000000','2022-01-16 01:00:00.000000',29),(69,'2022-01-18 12:00:00.000000','2022-01-18 03:00:00.000000',26),(70,'2022-01-26 12:00:00.000000','2022-01-26 03:00:00.000000',12),(71,'2022-01-12 12:00:00.000000','2022-01-12 03:00:00.000000',11),(72,'2022-01-22 12:00:00.000000','2022-01-22 02:00:00.000000',22),(73,'2022-01-03 12:00:00.000000','2022-01-03 01:00:00.000000',9),(74,'2021-12-27 12:00:00.000000','2021-12-27 03:00:00.000000',10),(75,'2021-12-29 12:00:00.000000','2021-12-29 03:00:00.000000',29),(76,'2022-01-11 12:00:00.000000','2022-01-11 01:00:00.000000',3),(77,'2021-12-26 12:00:00.000000','2021-12-26 03:00:00.000000',22),(78,'2022-01-02 12:00:00.000000','2022-01-02 02:00:00.000000',24),(79,'2022-01-21 12:00:00.000000','2022-01-21 02:00:00.000000',17),(80,'2022-01-10 12:00:00.000000','2022-01-10 02:00:00.000000',21);

/*Table structure for table `cities` */

DROP TABLE IF EXISTS `cities`;

CREATE TABLE `cities` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `cities` */

insert  into `cities`(`Id`,`Name`) values (1,'Los Angeles'),(2,'New York'),(3,'Chicago'),(4,'Seatle'),(5,'Miami');

/*Table structure for table `equipmenttypes` */

DROP TABLE IF EXISTS `equipmenttypes`;

CREATE TABLE `equipmenttypes` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `equipmenttypes` */

insert  into `equipmenttypes`(`Id`,`Name`,`Description`) values (1,'Bike','Equipment to do cardio'),(2,'Bench press','It is frequently used to bench press to work pecs.');

/*Table structure for table `inventories` */

DROP TABLE IF EXISTS `inventories`;

CREATE TABLE `inventories` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Price` decimal(65,30) NOT NULL,
  `Stock` int NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `Mesure` decimal(65,30) NOT NULL,
  `MesureTypeId` int DEFAULT NULL,
  `ProductTypeId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Inventories_MesureTypeId` (`MesureTypeId`),
  KEY `IX_Inventories_ProductTypeId` (`ProductTypeId`),
  CONSTRAINT `FK_Inventories_MesureTypes_MesureTypeId` FOREIGN KEY (`MesureTypeId`) REFERENCES `mesuretypes` (`Id`) ON DELETE RESTRICT,
  CONSTRAINT `FK_Inventories_ProductTypes_ProductTypeId` FOREIGN KEY (`ProductTypeId`) REFERENCES `producttypes` (`Id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `inventories` */

/*Table structure for table `members` */

DROP TABLE IF EXISTS `members`;

CREATE TABLE `members` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LastName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `BirthDay` datetime(6) NOT NULL,
  `Email` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `AllowNewsLetter` tinyint(1) NOT NULL,
  `MembershipEnd` datetime(6) NOT NULL,
  `CityId` int DEFAULT NULL,
  `MembershipTypeId` int DEFAULT NULL,
  `RegisteredOn` datetime(6) NOT NULL DEFAULT '0001-01-01 00:00:00.000000',
  PRIMARY KEY (`Id`),
  KEY `IX_Members_CityId` (`CityId`),
  KEY `IX_Members_MembershipTypeId` (`MembershipTypeId`),
  CONSTRAINT `FK_Members_Cities_CityId` FOREIGN KEY (`CityId`) REFERENCES `cities` (`Id`) ON DELETE RESTRICT,
  CONSTRAINT `FK_Members_MembershipTypes_MembershipTypeId` FOREIGN KEY (`MembershipTypeId`) REFERENCES `membershiptypes` (`Id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `members` */

insert  into `members`(`Id`,`Name`,`LastName`,`BirthDay`,`Email`,`AllowNewsLetter`,`MembershipEnd`,`CityId`,`MembershipTypeId`,`RegisteredOn`) values (2,'Chon','Serna','1992-12-08 00:00:00.000000','chon@gmail.com',0,'2023-01-20 00:00:00.000000',2,5,'2022-07-20 16:37:22.797786'),(3,'Ivan','Martinez','2021-12-14 00:00:00.000000','ivan@gamil.com',0,'2022-02-28 00:00:00.000000',4,2,'2022-01-30 22:50:57.830002'),(4,'Jesus','Duran','1993-05-17 00:00:00.000000','jesusduranr202@gmail.com',0,'2022-05-30 00:00:00.000000',3,1,'2022-02-03 17:46:07.326327'),(5,'Jose de Jesus','Duran Rodriguez','2022-01-30 00:00:00.000000','jesus@gmail.com',0,'2022-07-30 00:00:00.000000',4,5,'2022-01-30 21:56:26.289586'),(6,'Name 6','LastName 6','2020-07-24 05:49:15.000000','email6@mail.com',0,'2022-04-01 12:00:00.000000',3,1,'2022-02-02 12:00:00.000000'),(7,'Name 7','LastName 7','2020-06-03 05:49:15.000000','email7@mail.com',0,'2022-03-07 12:00:00.000000',3,2,'2022-02-02 12:00:00.000000'),(8,'Name 8','LastName 8','2020-12-10 05:49:15.000000','email8@mail.com',0,'2022-04-07 12:00:00.000000',1,2,'2022-02-02 12:00:00.000000'),(9,'Name 9','LastName 9','2020-11-03 05:49:15.000000','email9@mail.com',0,'2022-04-09 12:00:00.000000',1,4,'2022-02-02 12:00:00.000000'),(10,'Name 10','LastName 10','2020-05-12 05:49:15.000000','email10@mail.com',0,'2022-03-05 12:00:00.000000',1,4,'2022-02-02 12:00:00.000000'),(11,'Name 11','LastName 11','2020-08-02 05:49:15.000000','email11@mail.com',0,'2022-04-10 12:00:00.000000',2,2,'2022-02-02 12:00:00.000000'),(12,'Name 12','LastName 12','2020-07-04 05:49:15.000000','email12@mail.com',0,'2022-03-25 12:00:00.000000',1,4,'2022-02-02 12:00:00.000000'),(13,'Name 13','LastName 13','2019-12-06 05:49:15.000000','email13@mail.com',0,'2022-04-19 12:00:00.000000',2,4,'2022-02-02 12:00:00.000000'),(14,'Name 14','LastName 14','2020-09-22 05:49:15.000000','email14@mail.com',0,'2022-03-24 12:00:00.000000',1,2,'2022-02-02 12:00:00.000000'),(15,'Name 15','LastName 15','2020-11-21 05:49:15.000000','email15@mail.com',0,'2022-04-20 12:00:00.000000',2,3,'2022-02-02 12:00:00.000000'),(16,'Name 16','LastName 16','2020-10-17 05:49:15.000000','email16@mail.com',0,'2022-03-12 12:00:00.000000',1,1,'2022-02-02 12:00:00.000000'),(17,'Name 17','LastName 17','2020-07-15 05:49:15.000000','email17@mail.com',0,'2022-03-14 12:00:00.000000',4,1,'2022-02-02 12:00:00.000000'),(18,'Name 18','LastName 18','2020-12-11 05:49:15.000000','email18@mail.com',0,'2022-04-04 12:00:00.000000',1,4,'2022-02-02 12:00:00.000000'),(19,'Name 19','LastName 19','2020-09-02 05:49:15.000000','email19@mail.com',0,'2022-03-31 12:00:00.000000',3,3,'2022-02-02 12:00:00.000000'),(20,'Name 20','LastName 20','2020-09-26 05:49:15.000000','email20@mail.com',0,'2022-03-17 12:00:00.000000',3,1,'2022-02-02 12:00:00.000000'),(21,'Name 21','LastName 21','2019-12-08 05:49:15.000000','email21@mail.com',0,'2022-04-22 12:00:00.000000',3,1,'2022-02-02 12:00:00.000000'),(22,'Name 22','LastName 22','2020-08-18 05:49:15.000000','email22@mail.com',0,'2022-03-18 12:00:00.000000',1,3,'2022-02-02 12:00:00.000000'),(23,'Name 23','LastName 23','2020-03-27 05:49:15.000000','email23@mail.com',0,'2022-04-08 12:00:00.000000',4,3,'2022-02-02 12:00:00.000000'),(24,'Name 24','LastName 24','2020-04-03 05:49:15.000000','email24@mail.com',0,'2022-04-01 12:00:00.000000',3,1,'2022-02-02 12:00:00.000000'),(25,'Name 25','LastName 25','2020-03-07 05:49:15.000000','email25@mail.com',0,'2022-03-15 12:00:00.000000',4,1,'2022-02-02 12:00:00.000000'),(26,'Name 26','LastName 26','2020-04-19 05:49:15.000000','email26@mail.com',0,'2022-04-20 12:00:00.000000',3,2,'2022-02-02 12:00:00.000000'),(27,'Name 27','LastName 27','2020-04-01 05:49:15.000000','email27@mail.com',0,'2022-03-23 12:00:00.000000',3,3,'2022-02-02 12:00:00.000000'),(28,'Name 28','LastName 28','2020-01-31 05:49:15.000000','email28@mail.com',0,'2022-03-23 12:00:00.000000',1,4,'2022-02-02 12:00:00.000000'),(29,'Name 29','LastName 29','2020-08-14 05:49:15.000000','email29@mail.com',0,'2022-03-17 12:00:00.000000',3,1,'2022-02-02 12:00:00.000000'),(30,'Name 30','LastName 30','2020-04-15 05:49:15.000000','email30@mail.com',0,'2022-04-16 12:00:00.000000',4,1,'2022-02-02 12:00:00.000000');

/*Table structure for table `membershiptypes` */

DROP TABLE IF EXISTS `membershiptypes`;

CREATE TABLE `membershiptypes` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Cost` decimal(13,2) NOT NULL,
  `Duration` int NOT NULL,
  `CreatedOn` datetime(6) NOT NULL DEFAULT '0001-01-01 00:00:00.000000',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `membershiptypes` */

insert  into `membershiptypes`(`Id`,`Name`,`Cost`,`Duration`,`CreatedOn`) values (1,'Half Time Student','25.00',1,'2022-01-01 00:00:00.000000'),(2,'Couples (Each)','30.00',1,'2022-01-01 00:00:00.000000'),(3,'Monthly Membership','35.00',1,'2022-01-01 00:00:00.000000'),(4,'3 Month\'s Membership','50.00',3,'2022-01-01 00:00:00.000000'),(5,'6 Month\'s Membership','200.00',6,'2022-01-01 00:00:00.000000'),(6,'12 Month\'s Membership','350.00',12,'2022-01-30 13:55:56.942231'),(8,'4 months','200.00',4,'2022-02-15 15:58:45.824920');

/*Table structure for table `mesuretypes` */

DROP TABLE IF EXISTS `mesuretypes`;

CREATE TABLE `mesuretypes` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `mesuretypes` */

/*Table structure for table `producttypes` */

DROP TABLE IF EXISTS `producttypes`;

CREATE TABLE `producttypes` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `producttypes` */

/*Table structure for table `sales` */

DROP TABLE IF EXISTS `sales`;

CREATE TABLE `sales` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `DateSale` datetime(6) NOT NULL,
  `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Sales_UserId` (`UserId`),
  CONSTRAINT `FK_Sales_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `sales` */

/*Table structure for table `salesinventories` */

DROP TABLE IF EXISTS `salesinventories`;

CREATE TABLE `salesinventories` (
  `InventoryId` int NOT NULL,
  `SaleId` int NOT NULL,
  `Quantity` int NOT NULL,
  PRIMARY KEY (`InventoryId`,`SaleId`),
  KEY `IX_SalesInventories_SaleId` (`SaleId`),
  CONSTRAINT `FK_SalesInventories_Inventories_InventoryId` FOREIGN KEY (`InventoryId`) REFERENCES `inventories` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_SalesInventories_Sales_SaleId` FOREIGN KEY (`SaleId`) REFERENCES `sales` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `salesinventories` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
