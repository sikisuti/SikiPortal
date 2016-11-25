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

-- Create commonActionData table
create table commonActionData (
	id bigint not null auto_increment,
	carId bigint not null,
	actionDate date not null,
	km int not null,
	primary key (id),
	foreign key (carId) references cars(id)
) default character set utf8 collate utf8_unicode_ci;

-- Create refuelData table
create table refuelData (
	id bigint not null auto_increment,
	commonId bigint not null,
	fuelAmount decimal not null,
	fuelCost decimal,
	primary key (id),
	foreign key (commonId) references commonActionData(id)
) default character set utf8 collate utf8_unicode_ci;

-- Create serviceData table
create table serviceData (
	id bigint not null auto_increment,
	commonId bigint not null,
	serviceCost int not null,
	primary key (id),
	foreign key (commonId) references commonActionData(id)
) default character set utf8 collate utf8_unicode_ci;

-- Create serviceData table
create table serviceWorks (
	id bigint not null auto_increment,
	serviceDataId bigint not null,
	serviceItemId bigint not null,
	primary key (id),
	foreign key (serviceDataId) references serviceData(id),
	foreign key (serviceItemId) references serviceItems(id)
) default character set utf8 collate utf8_unicode_ci;
