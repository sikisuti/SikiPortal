drop database if exists Auth;

set names utf8;

-- Create database
create database Auth
	default character set utf8
	default collate utf8_unicode_ci;
use Auth;

create table Users (
  id bigint not null auto_increment,
  username varchar(50) character set utf8 collate utf8_unicode_ci not null,
  password varchar(60) character set utf8 collate utf8_unicode_ci not null,
  primary key (id)
) default character set utf8 collate utf8_unicode_ci;
