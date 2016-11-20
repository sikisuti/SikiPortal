drop database if exists CarInfo;

set names utf8;

-- Create database
create database CarInfo
	default character set utf8
	default collate utf8_unicode_ci;
use CarInfo;

-- Create cars table
create table cars (
	id bigint not null,
	regNumber varchar(20) character set utf8 collate utf8_unicode_ci,
	primary key (id)
) default character set utf8 collate utf8_unicode_ci;

insert into cars(id, regNumber) values (1, "IZT-995");
insert into cars(id, regNumber) values (2, "GVP-898");

-- Create serviceItems table
create table serviceItems (
	id bigint not null,
	serviceName varchar(100) character set utf8 collate utf8_unicode_ci not null,
	primary key (id)
) default character set utf8 collate utf8_unicode_ci;

insert into serviceItems(id, serviceName) values (1, "olajcsere");
insert into serviceItems(id, serviceName) values (2, "műszaki vizsga");
insert into serviceItems(id, serviceName) values (3, "légszűrő csere");
insert into serviceItems(id, serviceName) values (4, "olajszűrő csere");
