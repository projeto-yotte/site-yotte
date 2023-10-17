create database yotte;
use yotte;



create table empresa (
id_empresa int primary key auto_increment,
nome varchar(45),
nome_fantasia varchar(45),
cnpj char(14) unique,
email varchar(90) unique,
senha varchar(45),                      
porte varchar(30) check (porte in('pequeno', 'médio', 'grande'))
);
 
create  table tipo_usuario (
id_tipo_usuario int primary key auto_increment,
tipo int check (tipo in(0, 1, 2))
);

create table token (
    token int primary key,
    data_criado datetime
);

create table usuario (
id_usuario int primary key auto_increment,
nome varchar(45),
email varchar(90) unique,
senha varchar(45),
matricula varchar(45),
area varchar(45),
cargo varchar(45),
token int,
fk_empresa int,
foreign key (fk_empresa)
    references empresa(id_empresa),
fk_tipo_usuario int,
foreign key (fk_tipo_usuario)
    references tipo_usuario(id_tipo_usuario),
    fk_token int,
foreign key (fk_token)
    references token(token)

);
create table maquina (
id_maquina int primary key auto_increment,
ip varchar(45),
so varchar(45),
fk_usuario int,
desligada boolean,
ram_total float,
disco_total float,
foreign key (fk_usuario)
    references usuario(id_usuario),
fk_tipo_usuario int,
foreign key (fk_tipo_usuario)
    references tipo_usuario(id_tipo_usuario),
fk_token int,
foreign key (fk_token)
    references token(token)
);

create table captura_cpu (
id_cpu int primary key auto_increment,
id_processador int,
nome varchar(45),
freq int,
temperatura decimal(5, 2),
uso_processador decimal(5, 2),
nucleo int,
data_captura datetime
);

create table captura_ram (
id_cap_ram int primary key auto_increment,
memoria_uso decimal(5, 2),
memoria_disponivel decimal(5, 2),
byte_leitura int,
byte_escrita int,
data_captura datetime,
fk_maquina int,
foreign key (fk_maquina)
    references maquina(id_maquina)
);

create table info_disco(
id_info_disco int primary key auto_increment,
total_disco int
);

create table disco (
id_cap_disco int auto_increment,
tamanho_fila int,
transferencia int,
fk_maquina int,
foreign key (fk_maquina) 
    references maquina(id_maquina),
fk_info_disco int,
foreign key (fk_info_disco)
    references info_disco(id_info_disco),
primary key (id_cap_disco, fk_maquina, fk_info_disco)
);

create table janela (
id_janela int primary key auto_increment,
id_janela_maquina int,
titulo varchar(90),
comando varchar(90),
localizacao varchar(90),
visivel boolean,
fk_maquina int,
foreign key (fk_maquina)
    references maquina(id_maquina)
);

create table processo (
id_processo int primary key auto_increment,
uso_cpu decimal(5, 2),
uso_memoria decimal(5, 2),
bytes_utilizados int
);