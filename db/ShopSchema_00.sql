drop database if exists Shop;

-- Create database
create database Shop
	default character set utf8
	default collate utf8_unicode_ci;
use Shop;

CREATE TABLE IF NOT EXISTS `shops` (
  `id` int NOT NULL AUTO_INCREMENT,
  `shopName` varchar(50) character set utf8 collate utf8_unicode_ci NOT NULL,
  `shopAddress` varchar(100) character set utf8 collate utf8_unicode_ci,
  PRIMARY KEY (`id`)
) default character set utf8 collate utf8_unicode_ci;

INSERT INTO `shops` (`id`, `shopName`, `shopAddress`) VALUES
(1, 'Tesco express Dujv.', null),
(2, 'Interspar Dujv.', null),
(3, 'Tesco Dujv.', null);

CREATE TABLE IF NOT EXISTS `goods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `goodsBrand` varchar(50) character set utf8 collate utf8_unicode_ci NOT NULL,
  `goodsName` varchar(50) character set utf8 collate utf8_unicode_ci NOT NULL,
  `goodsDescription` varchar(50) character set utf8 collate utf8_unicode_ci,
  `measure` double,
  `unit` varchar(10) character set utf8 collate utf8_unicode_ci,
  PRIMARY KEY (`id`)
) default character set utf8 collate utf8_unicode_ci;

INSERT INTO `goods` (`id`, `goodsBrand`, `goodsName`, `goodsDescription`, `measure`, `unit`) VALUES
(1, 'Jogobella', 'Joghurt', 'Epres', 750, 'g'),
(2, 'Valdor', 'Pulykasonka', null, null, 'kg'),
(3, 'Tomi', 'mosópor', 'color', 3, 'kg');

CREATE TABLE IF NOT EXISTS `shoppings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `shopId` int,
  `goodsId` int NOT NULL,
  `quantity` double,
  `date` date,
  `price` double,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_shoppings_shops1` FOREIGN KEY (`shopId`) REFERENCES `shops`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_shoppings_goods1` FOREIGN KEY (`goodsId`) REFERENCES `goods`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) default character set utf8 collate utf8_unicode_ci;