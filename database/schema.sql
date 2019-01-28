CREATE DATABASE IF NOT EXISTS QRCode;

USE QRCode;

CREATE TABLE IF NOT EXISTS user (
  id int(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(25) NOT NULL,
  userPassword VARCHAR(60) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS qr (
  id int(11) NOT NULL AUTO_INCREMENT,
  qrcode VARCHAR(255) NOT NULL,
  createdDate Date,
  expiresDate Date,
  createdBy int(11) NOT NULL REFERENCES user(id),
  primary key (id)
);

insert into user(id, username, userPassword) values(1, 'carter', 'password1');