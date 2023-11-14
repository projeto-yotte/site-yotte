-- Criação das tabelas
CREATE DATABASE yotte1;
USE yotte1;

CREATE TABLE empresa (
    id_empresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    nome_fantasia VARCHAR(45),
    cnpj CHAR(14),
    email VARCHAR(90) UNIQUE,
    senha VARCHAR(90)
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

CREATE TABLE token (
    idtoken INT PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(45) UNIQUE,
    data_criado DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_usuario INT,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)
);
select * from yotte1.dados_captura;
CREATE TABLE maquina (
    id_maquina INT PRIMARY KEY AUTO_INCREMENT,
    ip VARCHAR(45),
    so VARCHAR(45),
    modelo VARCHAR(45),
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
    byte_leitura bigint,
    leituras int,
    byte_escrita bigint,
    escritas int,
    data_captura DATETIME,
    desligada boolean,
    frequencia FLOAT,
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
VALUES 
    ('Tech Solutions', 'TechS', '98765432101234', 'techsolutions@email.com', 'techpass123'),
    ('Data Innovations', 'DataInno', '56789012345601', 'datainnovations@email.com', 'data123'),
    ('Creative Designs', 'CreativeD', '34567890123458', 'creativedesigns@email.com', 'creative456'),
    ('Global Enterprises', 'GlobalE', '12345678901212', 'globalenterprises@email.com', 'globalpass789'),
    ('Innovate Solutions', 'InnovateS', '89012345601234', 'innovatesolutions@email.com', 'innovatepass567'),
    ('Future Tech', 'FutureT', '45678901234567', 'futuretech@email.com', 'future789'),
    ('Digital Creations', 'DigitalC', '23456789012345', 'digitalcreations@email.com', 'digitalpass345'),
    ('Smart Solutions', 'SmartS', '90123456012345', 'smartsolutions@email.com', 'smartpass012'),
    ('Dynamic Designs', 'DynamicD', '67890123456789', 'dynamicdesigns@email.com', 'dynamicpass678'),
    ('Infinite Innovations', 'InfiniteI', '34561234567890', 'infiniteinnovations@email.com', 'infinitepass901'),
    ('EcoTech', 'EcoT', '01234567890123', 'ecotech@email.com', 'ecopass567'),
    ('Swift Systems', 'SwiftS', '78901234560123', 'swiftsystems@email.com', 'swiftpass234');


INSERT INTO usuario (nome, email, senha, area, cargo, fk_empresa, fk_tipo_usuario)
VALUES 
    ('joao', 'joao@email.com', 'senha789', 'Development', 'Developer', 2, 2),
    ('maria', 'maria@email.com', 'senha101', 'Design', 'Designer', 3, 3),
    ('carlos', 'carlos@email.com', 'senha202', 'IT', 'System Administrator', 4, 1),
    ('ana', 'ana@email.com', 'senha303', 'Marketing', 'Marketing Specialist', 5, 2),
    ('pedro', 'pedro@email.com', 'senha404', 'Finance', 'Financial Analyst', 6, 3),
    ('lucas', 'lucas@email.com', 'senha505', 'HR', 'HR Manager', 7, 1),
    ('raquel', 'raquel@email.com', 'senha606', 'Research', 'Researcher', 8, 2),
    ('bianca', 'bianca@email.com', 'senha707', 'Sales', 'Sales Representative', 9, 3),
    ('gabriel', 'gabriel@email.com', 'senha808', 'Customer Support', 'Support Specialist', 10, 1),
    ('larissa', 'larissa@email.com', 'senha909', 'Management', 'Manager', 1, 2);

-- Inserir dados na tabela token
INSERT INTO token (token, fk_usuario)
VALUES 
    ('67890', 2),
    ('98765', 2),
    ('11111', 3),
    ('22222', 3),
    ('33333', 4),
    ('44444', 4),
    ('55555', 5),
    ('66666', 5),
    ('77777', 6),
    ('88888', 6),
    ('99999', 7),
    ('00000', 7),
    ('12121', 8),
    ('23232', 1),
    ('34343', 1),
    ('45454', 1),
    ('56565', 1),
    ('67676', 1),
    ('78787', 1);
       




INSERT INTO maquina (ip, so, modelo, desligada, fk_usuario, fk_token)
VALUES 
    ('192.168.1.3', 'MacOS', 'MacBook Pro', FALSE, 2, 1),
    ('192.168.1.4', 'Windows', 'Gaming PC', FALSE, 3, 2),
    ('192.168.1.5', 'Linux', 'Workstation', TRUE, 4, 3),
    ('192.168.1.6', 'Windows', 'Laptop', FALSE, 5, 4),
    ('192.168.1.7', 'MacOS', 'iMac', TRUE, 6, 5),
    ('192.168.1.8', 'Linux', 'Server', FALSE, 7, 6),
    ('192.168.1.9', 'Windows', 'Desktop', FALSE, 8, 7),
    ('192.168.1.10', 'Linux', 'Laptop', TRUE, 9, 8),
    ('192.168.1.11', 'Windows', 'PC', FALSE, 10, 9);


INSERT INTO info_componente (qtd_cpu_logica, qtd_cpu_fisica, total)
VALUES 
    (8, 4, 32.0),
    (6, 3, 24.0),
    (12, 6, 48.0),
    (4, 2, 16.0),
    (8, 4, 32.0),
    (6, 3, 24.0),
    (10, 5, 40.0),
    (12, 6, 48.0),
    (4, 2, 16.0),
    (8, 4, 32.0),
    (6, 3, 24.0),
    (10, 5, 40.0),
    (12, 6, 48.0),
    (4, 2, 16.0),
    (8, 4, 32.0);
    
    
INSERT INTO componente (nome, parametro, fk_info, fk_maquina)
VALUES 
    ('GPU', '%', 3, 3),
    ('Storage', 'bits', 4, 4),
    ('GPU', '%', 5, 5),
    ('Storage', 'bits', 6, 6),
    ('GPU', 'bits', 7, 7),
    ('Storage', 'bits', 8, 8),
    ('GPU', 'bits', 9, 9),
    ('Storage', 'bits', 10, 1),
    ('GPU', '%', 12, 2),
    ('Storage', 'bits', 1, 2),
    ('GPU', '%', 3, 3),
    ('Storage', 'bits', 4, 4),
    ('GPU', '%', 6, 5),
    ('Storage', 'External SSD', 7, 3),
    ('GPU', '%', 8, 7),
    ('Storage', 'bits', 9, 4),
    ('GPU', '%', 2, 5),
    ('Storage', 'bits', 2, 6);

-- Inserir dados na tabela dados_captura
INSERT INTO dados_captura (uso, byte_leitura, leituras, byte_escrita,
 escritas, data_captura, frequencia, fk_componente)
VALUES 
    (80, 2048, 1500, 1024, 1000, '2023-11-09 13:00:00', 2, 1),
    (60, 1024, 1200, 512, 800, '2023-11-09 13:15:00', 1, 2),
    (70, 1536, 1300, 768, 900, '2023-11-09 13:30:00', 3, 3),
    (85, 2560, 1800, 1280, 1500, '2023-11-09 13:45:00', 4, 4),
    (75, 1280, 1600, 640, 1200, '2023-11-09 14:00:00', 2, 5),
    (90, 3072, 2000, 2048, 1800, '2023-11-09 14:15:00', 5, 6),
    (65, 1792, 1400, 896, 1000, '2023-11-09 14:30:00', 3, 7),
    (95, 4096, 2500, 3072, 2200, '2023-11-09 14:45:00', 6, 8),
    (78, 2304, 1700, 1152, 1300, '2023-11-09 15:00:00', 4, 9),
    (88, 3328, 2100, 1920, 2000, '2023-11-09 15:15:00', 7, 7),
    (72, 1920, 1500, 1024, 1600, '2023-11-09 15:30:00', 4, 4),
    (82, 2816, 1900, 1536, 1700, '2023-11-09 15:45:00', 5, 2),
    (77, 2176, 1600, 1280, 1400, '2023-11-09 16:00:00', 3, 3),
    (92, 3584, 2200, 2560, 2400, '2023-11-09 16:15:00', 8, 4),
    (68, 1536, 1400, 768, 1200, '2023-11-09 16:30:00', 2, 5),
    (87, 2944, 2000, 2048, 1800, '2023-11-09 16:45:00', 6, 6),
    (73, 2048, 1700, 1024, 1600, '2023-11-09 17:00:00', 4, 7),
    (89, 3200, 2100, 1920, 2000, '2023-11-09 17:15:00', 7, 8),
    (79, 2432, 1800, 1152, 1400, '2023-11-09 17:30:00', 5, 9),
    (93, 3712, 2200, 2560, 2400, '2023-11-09 17:45:00', 8, 3);
    
insert into dados_captura (uso, byte_leitura, leituras, byte_escrita,
 escritas, data_captura, frequencia, fk_componente)
 values 
 (93, 3712, 2200, 2560, 2400, '2023-01-09 17:45:00', 8, 3);

-- Inserir dados na tabela janela
INSERT INTO janela (pid, titulo, comando, localizacao, visivel, fk_maquina)
VALUES 
    (3001, 'Browser', 'chrome.exe', 'C:\\Program Files\\Google\\Chrome', TRUE, 3),
    (4002, 'Code Editor', 'vscode.exe', 'C:\\Program Files\\Microsoft VS Code', TRUE, 4),
    (5003, 'Music Player', 'spotify.exe', 'C:\\Program Files\\Spotify', TRUE, 5),
    (6004, 'Image Editor', 'photoshop.exe', 'C:\\Program Files\\Adobe\\Photoshop', TRUE, 6),
    (7005, 'Video Player', 'vlc.exe', 'C:\\Program Files\\VideoLAN\\VLC', TRUE, 7),
    (8006, 'Terminal', 'gnome-terminal.exe', '/usr/bin', TRUE, 8),
    (9007, 'Document Editor', 'libreoffice.exe', 'C:\\Program Files\\LibreOffice', TRUE, 3),
    (10008, 'Design Tool', 'figma.exe', 'C:\\Program Files\\Figma', TRUE, 1),
    (11009, 'Database Client', 'dbeaver.exe', 'C:\\Program Files\\DBeaver', TRUE, 1),
    (12010, 'Media Player', 'kodi.exe', 'C:\\Program Files\\Kodi', TRUE, 2),
    (13011, '3D Modeling', 'blender.exe', 'C:\\Program Files\\Blender', TRUE, 3),
    (14012, 'Chat Application', 'slack.exe', 'C:\\Program Files\\Slack', TRUE, 4),
    (15013, 'Code Editor', 'atom.exe', 'C:\\Program Files\\Atom', TRUE, 5),
    (16014, 'Video Editing', 'davinci.exe', 'C:\\Program Files\\DaVinci Resolve', TRUE, 6),
    (17015, 'Email Client', 'thunderbird.exe', 'C:\\Program Files\\Thunderbird', TRUE, 7),
    (18016, 'Graphic Design', 'gimp.exe', 'C:\\Program Files\\GIMP', TRUE, 4),
    (19017, 'IDE', 'eclipse.exe', 'C:\\Program Files\\Eclipse', TRUE, 6),
    (20018, 'Video Player', 'mpc.exe', 'C:\\Program Files\\MPC-HC', TRUE, 2);

-- Inserir dados na tabela processo
INSERT INTO processo (pid, uso_cpu, uso_memoria, bytes_utilizados, fk_maquina)
VALUES 
    (1001, 25.5, 35.0, 3072, 1),
    (2002, 18.0, 28.5, 2048, 2),
    (3003, 22.5, 32.0, 2560, 3),
    (4004, 16.0, 25.5, 1024, 4),
    (5005, 30.0, 40.5, 4096, 5),
    (6006, 14.5, 20.0, 1536, 6),
    (7007, 19.5, 30.0, 2048, 7),
    (8008, 26.0, 35.5, 3584, 8),
    (9009, 17.5, 26.0, 1280, 9),
    (1010, 32.0, 42.5, 5120, 1),
    (1111, 15.0, 21.5, 1792, 1),
    (1212, 20.5, 30.0, 2304, 2),
    (1313, 24.5, 34.0, 2816, 3),
    (1414, 16.5, 25.0, 2048, 4),
    (1515, 29.0, 39.5, 4096, 5),
    (1616, 13.0, 18.5, 1280, 6),
    (1717, 21.5, 31.0, 2560, 7),
    (1818, 27.5, 36.0, 3584, 3),
    (1919, 19.0, 28.5, 2048, 1),
    (2020, 34.0, 44.5, 5120, 2);
    


desc dados_captura;
select
min(data_captura) as primeira_captura,
max(data_captura) as ultima_captura
from dados_captura
where DATE(data_captura) = CURDATE();

select * from dados_captura;
select distinct data_captura from dados_captura JOIN
	componente ON fk_componente = id_componente JOIN
		maquina ON fk_maquina = id_maquina WHERE id_maquina = 10;
        
select * from dados_captura JOIN
	componente ON fk_componente = id_componente JOIN 
		maquina ON fk_maquina = id_maquina WHERE id_maquina = 10;
            
select * from dados_captura;
select * from componente;
            
select * From usuario;

select * from maquina;

select * from maquina;

select * from dados_captura where desligada = 0;


CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE ON yotte.* TO 'yotte'@'localhost';
FLUSH PRIVILEGES;

