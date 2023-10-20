create database yotte;
use yotte;


create table empresa (
id_empresa int primary key auto_increment,
nome varchar(45),
nome_fantasia varchar(45),
cnpj char(14),
email varchar(90) unique,
senha varchar(90)
);


create table token (
idtoken int primary key auto_increment,
token VARCHAR(45),
data_criado datetime DEFAULT CURRENT_TIMESTAMP
);


create table tipo_usuario (
id_tipo_usuario int primary key auto_increment,
tipo int check (tipo in(1, 2, 3))
);


INSERT INTO tipo_usuario (tipo) VALUES (1),(2),(3);

create table usuario (
id_usuario int primary key auto_increment,
nome varchar(45),
email varchar(45) unique,
senha varchar(45),
matricula varchar(45),
area varchar(45),
cargo varchar(45),
fk_empresa int,
	foreign key (fk_empresa)
    references empresa(id_empresa),
fk_tipo_usuario int,
	foreign key (fk_tipo_usuario)
    references tipo_usuario(id_tipo_usuario)
);


create table maquina (
id_maquina int primary key auto_increment,
ip varchar(45),
so varchar(45),
desligada boolean,
fk_usuario int,
	foreign key (fk_usuario)
    references usuario(id_usuario),
fk_token int,
	foreign key (fk_token)
    references token(idtoken)
);

create table info_componente (
id_info int primary key auto_increment,
total float
);

create table componente (
id_componente int primary key auto_increment,
nome varchar(45),
parametro varchar(5),
fk_info int,
	foreign key (fk_info)
    references info_componente(id_info),
fk_maquina int,
	foreign key (fk_maquina)
    references maquina(id_maquina)
);

create table dados_captura (
id_dados_captura int primary key auto_increment,
captura float,
uso bigint,
fk_componente int,
	foreign key (fk_componente)
    references componente(id_componente)
);

create table janela (
id_janela int primary key auto_increment,
pid int,
titulo varchar(45),
comando varchar(45),
localizacao varchar(45),
visivel boolean,
fk_maquina int,
	foreign key (fk_maquina)
    references maquina(id_maquina)
);

create table processo (
id_processo int primary key auto_increment,
pid int,
uso_cpu float,
uso_memoria float,
bytes_utilizados int,
fk_janela int,
	foreign key (fk_janela)
    references janela(id_janela)
);