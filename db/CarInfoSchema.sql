drop database if exists CarInfo;

create database CarInfo;

use CarInfo;

create table cars (
	id bigint not null,
	regNumber varchar(20) not null,
	primary key (id)
);

insert into cars(id, regNumber) values (1, "IZT-995");
insert into cars(id, regNumber) values (2, "GVP-898");