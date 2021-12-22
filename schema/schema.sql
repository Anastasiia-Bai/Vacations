CREATE DATABASE  IF NOT EXISTS `vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `vacation_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=845 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (820,32,12),(821,32,10),(822,32,6),(827,31,3),(830,30,7),(831,30,1),(832,24,5),(833,24,4),(834,24,9),(835,26,1),(836,26,15),(837,26,9),(838,26,8),(842,31,5),(843,31,1),(844,31,4);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `user_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `idx_username` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (24,'qaz','qaz@gmail.com','d37a7d78a877d50364f4f30e24fcd7ca','CUSTOMER'),(25,'Anastasiia','nessti@gmail.com','d37a7d78a877d50364f4f30e24fcd7ca','ADMIN'),(26,'qwerty','qwerty@gmail.com','d37a7d78a877d50364f4f30e24fcd7ca','CUSTOMER'),(29,'rfv','rfv@rfv.com','d37a7d78a877d50364f4f30e24fcd7ca','CUSTOMER'),(30,'ast','ast@gmail.com','d37a7d78a877d50364f4f30e24fcd7ca','CUSTOMER'),(31,'test1','test1@gmail.com','d37a7d78a877d50364f4f30e24fcd7ca','CUSTOMER'),(32,'test2','test2@gmail.com','d37a7d78a877d50364f4f30e24fcd7ca','CUSTOMER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) NOT NULL,
  `description` varchar(800) NOT NULL,
  `image` varchar(500) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'Bulgaria','The Bulgarian Black Sea coast is a wonderful place for a summer holiday.','https://res.cloudinary.com/grohealth/image/upload/f_auto,fl_lossy,q_auto/v1581694320/DCUK/Content/iStock-615112296.jpg','2021-08-05','2021-08-09',495),(3,'Egypt','Egypt tourism has something for everyone.','https://www.history.com/.image/c_fit%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_620/MTYzOTQ2MTc0Njc4NzcxNTM3/egypt-gettyimages-1085205362.jpg','2021-09-17','2021-09-25',350),(4,'Dubai','Find sun-drenched adventures, mouthwatering cuisine and endless entertainment at every turn. Dubai presents a summer to remember.','https://images.musement.com/cover/0002/45/dubai-skyline-at-dusk-jpg_header-144981.jpeg','2023-08-21','2018-08-21',1260),(5,'Paris','Paris is a magnificent city, famous the world over. The ultimate romantic city, it attracts tourists throughout the year, yet the capital of France has so much to offer that you need more than just a few hours to visit it. With its monuments, museums, shops, parks and restaurants, there really is something to please everyone, but whatever your taste, you will love this city of a thousand faces.','https://lp-cms-production.imgix.net/image_browser/Effiel%20Tower%20-%20Paris%20Highlights.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850','2021-09-12','2021-09-17',620),(6,'Cyprus','For whatever reason you decide to visit the island, Cyprus always gives you the opportunity to experience something new, interesting and exciting, including unique and characteristic activities, events, events, traditions and places.','https://assets.wego.com/image/upload/v1611848131/country-pages/cy.jpg','2021-08-30','2021-09-04',455),(7,'Turkey','Travelling to Turkey is a real paradise for travellers. It is diverse and mysterious so everyone will find their perfect place to drink their coffee or tea.','https://www.traveldailymedia.com/assets/2020/02/shutterstock_1019797831.jpg','2021-09-04','2021-09-09',490),(8,'Croatia','If your Mediterranean fantasies feature balmy days by sapphire waters in the shade of ancient walled towns. Croatia is the place to turn them into reality.','https://cdn.travelpulse.com/images/fac0cf32-7de1-e611-9aa9-0050568e420d/2f90a8bb-2e37-4f96-a6c3-e4c808d1590a/630x355.jpg','2021-09-07','2021-09-15',560),(9,'Maldives','Maldives tourism offers something for every kind of traveller – whether you are planning a honeymoon or a family trip, looking for a relaxed resort stay or an active holiday, you will find exciting options in Maldives.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu3bFUbYdS6vc8PJ7ZDiENfQIyd95UEcmzHBRSqIuxdL6nPUhocO7vG-AQK3u1wS7lmwg&usqp=CAU','2021-11-04','2021-11-10',1100),(10,'Zanzibar','Zanzibar is an escape from the everyday and the ordinary, with world-class beaches, and a rich history, culture, and geography like no other in the world. It\'s a true tropical paradise, but with so much more to offer than just surface beauty.','https://thecommonwealth.org/sites/default/files/styles/press_release_large/public/images/hero/zanzibar-tanzania-shutterstock%20-%20article.jpg?itok=R7sTotTX','2021-11-07','2021-11-15',790),(12,'Georgia','Having gone from backpacker secret to mainstream darling in just a decade. Georgia today is by far the most visited country in the South Caucasus, and it\'s easy to see why: its rich culture and astonishingly diverse landscapes make it an ideal destination for anyone loving history and nature on the grandest of scales.','https://siteselection.com/issues/2020/nov/images/TbilisiCity.jpg','2021-12-28','2022-01-05',980),(15,'Israel','The best country!','https://i.guim.co.uk/img/media/f81c02e6ca53caaa9de2fb63d0bd77bdc66bd71e/0_143_2119_1272/master/2119.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=744d8a6027434f1c4107da9eac7e20a3','2021-08-16','2021-08-18',1234),(16,'Amsterdam','......','https://www.iamsterdam.com/media/canals-and-cityscapes/autumn-in-the-city-koen-smilde-photography.jpg?as=false&h=328&w=580&iar=true','2021-08-17','2021-08-23',1234);
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-02 16:35:34
