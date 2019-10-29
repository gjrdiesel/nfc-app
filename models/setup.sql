CREATE DATABASE IF NOT EXISTS `nfc`;

CREATE TABLE IF NOT EXISTS `Members`
(
    `id`        int(11)  NOT NULL AUTO_INCREMENT,
    `email`     varchar(255) DEFAULT NULL,
    `category`  varchar(255) DEFAULT NULL,
    `name`      varchar(255) DEFAULT NULL,
    `uid`       varchar(255) DEFAULT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `Entries`
(
    `id`        int(11)  NOT NULL AUTO_INCREMENT,
    `category`  varchar(255) DEFAULT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    `MemberId`  int(11)  NOT NULL,
    PRIMARY KEY (`id`),
    KEY `MemberId` (`MemberId`),
    CONSTRAINT `entries_ibfk_1` FOREIGN KEY (`MemberId`) REFERENCES `Members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

LOAD DATA LOCAL INFILE 'models/members.csv'
    INTO TABLE Members
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS
    (id,category,email, name,createdAt,uid);
