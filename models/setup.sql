CREATE DATABASE IF NOT EXISTS `nfc`;

CREATE TABLE IF NOT EXISTS `members`
(
    `id`        int(11) AUTO_INCREMENT,
    PRIMARY KEY (`id`),
    `category`  varchar(255) DEFAULT NULL,
    `user`      varchar(255) DEFAULT NULL,
    `name`      varchar(255) DEFAULT NULL,
    `createdAt` datetime     DEFAULT NULL,
    `updatedAt` datetime     DEFAULT NULL,
    `uid`       varchar(255) DEFAULT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `sign_ins`
(
    `id`        int(11) AUTO_INCREMENT,
    PRIMARY KEY (`id`),
    `category`  varchar(255) DEFAULT NULL,
    `memberId` int(11),
    `createdAt` datetime     DEFAULT NULL,
    `updatedAt` datetime     DEFAULT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

LOAD DATA LOCAL INFILE 'members.csv'
    INTO TABLE members
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS;
