create database db_lion_school_turma_manha;

use db_lion_school_turma_manha;

create table tbl_aluno (
id int not null auto_increment primary key,
nome varchar(100) not null,
cpf varchar(18) not null,
rg varchar(15) not null,
data_nascimento date not null,
email varchar(250) not null,

unique index(id)

);