create database lib_inv;

use lib_inv;

create table users(
    id int(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password Varchar(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

alter table users 
    add primary key(id);
    MODIFY id int(11) not null auto_increment, auto increment=1;

describe users

create table libros(
    id int(11) NOT NULL auto_increment primary key,
    titulo varchar(100),
    fechalanzamiento varchar(100),
    autor varchar(100),
    editorial varchar(100),

);
create table stock(
    id_stock int (11) NOT NULL auto_increment primary key,
    id_libro int (11) NOT NULL,
    total_stock int (5) NOT NULL
)