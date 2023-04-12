CREATE DATABASE
    IF NOT EXISTS `find_home`
    /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */
    /*!80016 DEFAULT ENCRYPTION='N' */
;

USE `find_home`;

-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)

--

-- Host: localhost    Database: find_home

-- ------------------------------------------------------

-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */

;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */

;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */

;

/*!50503 SET NAMES utf8 */

;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */

;

/*!40103 SET TIME_ZONE='+00:00' */

;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */

;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */

;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */

;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */

;

--

-- Table structure for table `admin`

--

DROP TABLE IF EXISTS `admin`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `admin` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(100) NOT NULL,
        `email` varchar(100) NOT NULL,
        `password` varchar(100) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `admin`

--

LOCK TABLES `admin` WRITE;

/*!40000 ALTER TABLE `admin` DISABLE KEYS */

;

/*!40000 ALTER TABLE `admin` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `company`

--

DROP TABLE IF EXISTS `company`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `company` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(100) NOT NULL,
        `location` varchar(100) DEFAULT NULL,
        `image` varchar(100) DEFAULT NULL,
        `phoneNumbers` varchar(100) DEFAULT NULL,
        `email` varchar(100) DEFAULT NULL,
        `password` varchar(100) DEFAULT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `company`

--

LOCK TABLES `company` WRITE;

/*!40000 ALTER TABLE `company` DISABLE KEYS */

;

/*!40000 ALTER TABLE `company` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `notification`

--

DROP TABLE IF EXISTS `notification`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `notification` (
        `id` int NOT NULL,
        `body` text,
        `senderId` int DEFAULT NULL,
        `receiverId` int DEFAULT NULL,
        `type` int DEFAULT NULL,
        `time` double DEFAULT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `notification`

--

LOCK TABLES `notification` WRITE;

/*!40000 ALTER TABLE `notification` DISABLE KEYS */

;

/*!40000 ALTER TABLE `notification` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `offer`

--

DROP TABLE IF EXISTS `offer`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `offer` (
        `offeredBy` int NOT NULL,
        `propertyId` int DEFAULT NULL,
        `offer` double DEFAULT NULL,
        `time` double DEFAULT NULL,
        KEY `offer_FK` (`propertyId`),
        KEY `offer_FK_1` (`offeredBy`),
        CONSTRAINT `offer_FK` FOREIGN KEY (`propertyId`) REFERENCES `property` (`id`),
        CONSTRAINT `offer_FK_1` FOREIGN KEY (`offeredBy`) REFERENCES `user` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `offer`

--

LOCK TABLES `offer` WRITE;

/*!40000 ALTER TABLE `offer` DISABLE KEYS */

;

/*!40000 ALTER TABLE `offer` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `property`

--

DROP TABLE IF EXISTS `property`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `property` (
        `id` int NOT NULL AUTO_INCREMENT,
        `images` text,
        `sellerId` int NOT NULL,
        `location` varchar(100) DEFAULT NULL,
        `price` double NOT NULL DEFAULT '0',
        `newOwner` int DEFAULT '1',
        PRIMARY KEY (`id`),
        KEY `property__FK` (`newOwner`),
        KEY `property_FK_1` (`sellerId`),
        CONSTRAINT `property__FK` FOREIGN KEY (`newOwner`) REFERENCES `user` (`id`),
        CONSTRAINT `property_FK_1` FOREIGN KEY (`sellerId`) REFERENCES `company` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `property`

--

LOCK TABLES `property` WRITE;

/*!40000 ALTER TABLE `property` DISABLE KEYS */

;

/*!40000 ALTER TABLE `property` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `user`

--

DROP TABLE IF EXISTS `user`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `user` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(100) NOT NULL,
        `email` varchar(100) NOT NULL,
        `phone` varchar(15) DEFAULT NULL,
        `password` varchar(100) DEFAULT NULL,
        `profileImageURL` varchar(100) DEFAULT NULL,
        `nationality` varchar(100) DEFAULT NULL,
        `gender` int DEFAULT NULL,
        `occupation` varchar(40) DEFAULT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `user`

--

LOCK TABLES `user` WRITE;

/*!40000 ALTER TABLE `user` DISABLE KEYS */

;

/*!40000 ALTER TABLE `user` ENABLE KEYS */

;

UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */

;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */

;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */

;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */

;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */

;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */

;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */

;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */

;

-- Dump completed on 2023-04-09  1:56:29