-- Criação do banco de dados
create database yotte;
drop database yotte;
use yotte;

-- Tabela empresa
create table empresa (
    id_empresa int primary key auto_increment,
    nome varchar(45),
    nome_fantasia varchar(45),
    cnpj char(14) unique,
    email varchar(90) unique,
    senha varchar(45),
    porte varchar(30) check (porte in('pequeno', 'médio', 'grande'))
);

-- Tabela tipo_usuario
create table tipo_usuario (
    id_tipo_usuario int primary key auto_increment,
    tipo int check (tipo in(0, 1, 2))
);

-- Tabela usuario
create table usuario (
    id_usuario int primary key auto_increment,
    nome varchar(45),
    email varchar(90) unique,
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

-- Tabela token
create table token (
    token int primary key,
    data_criado datetime
);

-- Tabela maquina
create table maquina (
    id_maquina int primary key auto_increment,
    ip varchar(45),
    so varchar(45),
    fk_usuario int,
    desligada boolean,
    foreign key (fk_usuario)
        references usuario(id_usuario),
    fk_tipo_usuario int,
    foreign key (fk_tipo_usuario)
        references tipo_usuario(id_tipo_usuario),
    fk_token int,
    foreign key (fk_token)
        references token(token)
);

-- Tabela captura_cpu
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

-- Tabela info_ram
create table info_ram (
    id_info_ram int auto_increment,
    ram_total float,
    fk_maquina int,
    foreign key (fk_maquina)
		references maquina(id_maquina),
	primary key (id_info_ram, fk_maquina)
);

-- Tabela captura_ram
create table captura_ram (
    id_cap_ram int primary key auto_increment,
    memoria_uso bigint,
    memoria_disponivel bigint,
    byte_leitura int,
    byte_escrita int,
    data_captura datetime,
    fk_info_ram int,
    foreign key (fk_info_ram)
		references info_ram(id_info_ram)
);

create table info_disco (
    id_info_disco int auto_increment,
    total_disco int,
    fk_maquina int,
    foreign key (fk_maquina)
        references maquina(id_maquina),
	primary key (id_info_disco, fk_maquina)
);

-- Tabela disco
create table captura_disco (
    id_cap_disco int primary key auto_increment,
    tamanho_fila int,
    transferencia int,
    fk_info_disco int,
    foreign key (fk_info_disco)
        references info_disco(id_info_disco)
);

-- Tabela janela
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

-- Tabela processo
create table processo (
    id_processo int primary key auto_increment,
    uso_cpu decimal(5, 2),
    uso_memoria decimal(5, 2),
    bytes_utilizados int
);


SELECT * FROM info_ram;
SELECT * FROM captura_ram;


-- Inserir dados na tabela empresa
INSERT INTO empresa (nome, nome_fantasia, cnpj, email, senha, porte)
VALUES
    ('Empresa 1', 'Fantasia 1', '12345678901234', 'empresa1@email.com', 'senha1', 'pequeno'),
    ('Empresa 2', 'Fantasia 2', '56789012345678', 'empresa2@email.com', 'senha2', 'médio'),
    ('Empresa 3', 'Fantasia 3', '90123456789012', 'empresa3@email.com', 'senha3', 'grande');

-- Inserir dados na tabela tipo_usuario
INSERT INTO tipo_usuario (tipo)
VALUES
    (0),
    (1),
    (2);

-- Inserir dados na tabela usuario
INSERT INTO usuario (nome, email, senha, matricula, area, cargo, fk_empresa, fk_tipo_usuario)
VALUES
    ('Usuário 1', 'usuario1@email.com', 'senha1', 'matricula1', 'Área 1', 'Cargo 1', 1, 1),
    ('Usuário 2', 'usuario2@email.com', 'senha2', 'matricula2', 'Área 2', 'Cargo 2', 2, 2),
    ('Usuário 3', 'usuario3@email.com', 'senha3', 'matricula3', 'Área 3', 'Cargo 3', 3, 3);


INSERT INTO token (token, data_criado)
VALUES
(12345, '2023-10-09 15:30:00'),
(67890, '2023-10-10 10:45:00'),
(98765, '2023-10-11 08:15:00');

-- Inserir dados na tabela maquina
INSERT INTO maquina (ip, so, fk_usuario, desligada, fk_tipo_usuario, fk_token)
VALUES
    ('192.168.1.1', 'Windows', 1, false, 1, 12345),
    ('192.168.1.2', 'Linux', 2, true, 2, 67890),
    ('192.168.1.3', 'MacOS', 3, false, 3, 98765);
    

-- Excluir todas as tabelas
DROP TABLE disco;
DROP TABLE janela;
DROP TABLE maquina;
DROP TABLE token;
DROP TABLE usuario;
DROP TABLE tipo_usuario;
DROP TABLE empresa;


-- Redefinir o incremento para 0 nas tabelas
ALTER TABLE info_ram AUTO_INCREMENT = 0;
ALTER TABLE captura_ram AUTO_INCREMENT = 0;
ALTER TABLE maquina AUTO_INCREMENT = 0;
ALTER TABLE token AUTO_INCREMENT = 0;
ALTER TABLE usuario AUTO_INCREMENT = 0;
ALTER TABLE tipo_usuario AUTO_INCREMENT = 0;
ALTER TABLE empresa AUTO_INCREMENT = 0;



