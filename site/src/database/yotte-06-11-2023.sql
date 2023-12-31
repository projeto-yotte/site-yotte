-- Criação das tabelas
CREATE DATABASE yotte;
USE yotte;

CREATE TABLE empresa (
    id_empresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    nome_fantasia VARCHAR(45),
    cnpj CHAR(14),
    email VARCHAR(90) UNIQUE,
    senha VARCHAR(90)
);

CREATE TABLE token (
    idtoken INT PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(45) UNIQUE,
    data_criado DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_usuario INT,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE tipo_usuario (
    id_tipo_usuario INT PRIMARY KEY AUTO_INCREMENT,
    tipo INT CHECK (tipo IN (1, 2, 3))
);

INSERT INTO tipo_usuario (tipo) VALUES (1), (2), (3);

CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    email VARCHAR(45) UNIQUE,
    senha VARCHAR(45),
    area VARCHAR(45),
    cargo VARCHAR(45),
    fk_empresa INT,
    fk_tipo_usuario INT,
    FOREIGN KEY (fk_empresa) REFERENCES empresa(id_empresa),
    FOREIGN KEY (fk_tipo_usuario) REFERENCES tipo_usuario(id_tipo_usuario)
);

CREATE TABLE maquina (
    id_maquina INT PRIMARY KEY AUTO_INCREMENT,
    ip VARCHAR(45),
    so VARCHAR(45),
    modelo VARCHAR(45),
    desligada BOOLEAN,
    fk_usuario INT,
    fk_token INT,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (fk_token) REFERENCES token(idtoken)
);

CREATE TABLE info_componente (
    id_info INT PRIMARY KEY AUTO_INCREMENT,
    qtd_cpu_logica INT,
    qtd_cpu_fisica INT,
    total FLOAT
);

CREATE TABLE componente (
    id_componente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    parametro VARCHAR(20),
    fk_info INT,
    fk_maquina INT,
    FOREIGN KEY (fk_info) REFERENCES info_componente(id_info),
    FOREIGN KEY (fk_maquina) REFERENCES maquina(id_maquina)
);

CREATE TABLE dados_captura (
    id_dados_captura INT PRIMARY KEY AUTO_INCREMENT,
    uso BIGINT,
    byte_leitura int,
    leituras int,
    byte_escrita int,
    escritas int,
    data_captura DATETIME,
    frequencia INT,
    fk_componente INT,
    FOREIGN KEY (fk_componente) REFERENCES componente(id_componente)
);

CREATE TABLE janela (
    id_janela INT PRIMARY KEY AUTO_INCREMENT,
    pid INT,
    titulo VARCHAR(45),
    comando VARCHAR(45),
    localizacao VARCHAR(45),
    visivel BOOLEAN,
    fk_maquina INT,
    FOREIGN KEY (fk_maquina) REFERENCES maquina(id_maquina)
);

CREATE TABLE processo (
    id_processo INT PRIMARY KEY AUTO_INCREMENT,
    pid INT,
    uso_cpu DECIMAL(5, 2),
    uso_memoria DECIMAL(5, 2),
    bytes_utilizados INT,
    fk_maquina INT,
    FOREIGN KEY (fk_maquina) REFERENCES maquina(id_maquina)
);



-- Inserir dados na tabela empresa
INSERT INTO empresa (nome, nome_fantasia, cnpj, email, senha)
VALUES ('jdbc', 'JDBC', '12345678901234', 'empresa@email.com', 'senha123'),
       ('Outra Empresa', 'Outra Fantasia', '56789012345678', 'outra@email.com', 'senha456');


-- Inserir dados na tabela token
INSERT INTO token (token, fk_usuario)
VALUES ('12345', 1),
       ('54321', 2);


CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE ON yotte.* TO 'yotte'@'localhost';
FLUSH PRIVILEGES;

