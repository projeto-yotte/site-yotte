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

CREATE TABLE alerta (
id_alerta INT PRIMARY KEY AUTO_INCREMENT,
descricao VARCHAR(90),
fk_dados_captura INT,
	FOREIGN KEY (fk_dados_captura) REFERENCES dados_captura(id_dados_captura)
);

    
    
-- Inserir dados na tabela empresa
INSERT INTO empresa (nome, nome_fantasia, cnpj, email, senha)
VALUES ('jdbc', 'JDBC', '12345678901234', 'empresa@email.com', 'senha123'),
       ('Outra Empresa', 'Outra Fantasia', '56789012345678', 'outra@email.com', 'senha456');
       
INSERT INTO usuario (nome, email, senha, area, cargo, fk_empresa, fk_tipo_usuario)
VALUES 
	('brian', 'brian@.com.com', '1234', 'Engenharia', 'analista', 1, 2),
    ('lira', 'lira@.com.com', '1234', 'Engenharia', 'analista', 1, 3),
    ('Daniel', 'dan@.com.com', '1234', 'Engenharia', 'analista', 1, 3),
    ('Pimentel', 'pi@.com.com', '1234', 'Engenharia', 'analista', 2, 2),
    ('Lorena', 'lo@.com.com', '1234', 'Engenharia', 'analista', 2, 3),
    ('Julia', 'ju@.com.com', '1234', 'Engenharia', 'analista', 2, 3);


-- Inserir dados na tabela token
INSERT INTO token (token, fk_usuario)
VALUES ('12345', 1),
       ('54321', 1),
       ('94131', 4),
       ('35412', 4);
       

INSERT INTO maquina (ip, so, modelo, fk_usuario, fk_token)
VALUES
	('89042509348', 'Pop Os!', 'Modelo do bem', 2, 1),
	('89042509348', 'Pop Os!', 'Modelo do bem', 3, 2),
	('19042509222', 'Linux Mint', 'Modelo do bem', 5, 3),
	('79042509111', 'Linux Mint', 'Modelo do bem', 6, 4);
    

INSERT INTO info_componente (qtd_cpu_logica, qtd_cpu_fisica, total)
VALUES 
    (8, 4, 32.0),
    (6, 3, 24.0),
    (12, 6, 48.0),
    (4, 2, 16.0),
    (4, 2, 16.0),
    (4, 2, 16.0),
    (4, 2, 16.0),
    (4, 2, 16.0),
    (4, 2, 16.0),
    (4, 2, 16.0),
    (4, 2, 16.0),
    (4, 2, 16.0),
    (4, 2, 16.0);
    

-- Inserir dados na tabela componente
INSERT INTO componente (nome, parametro, fk_info, fk_maquina)
VALUES 
    ('CPU', '%', 1, 1),
    ('GPU', '%', 2, 2),
    ('HD', 'bits', 3, 1),
    ('HD', 'GB', 4, 2),
    ('HD', 'GB', 5, 3),
    ('RAM', 'GB', 6, 4),
    ('RAM', 'GB', 7, 3),
    ('CPU', '%', 8, 4),
    ('HD', 'GB', 9, 3);

-- Inserir dados na tabela dados_captura
INSERT INTO dados_captura (uso, byte_leitura, leituras, byte_escrita,
 escritas, data_captura, desligada, frequencia, fk_componente)
VALUES 
    (80, 2048, 1500, 1024, 1000, '2023-11-14 13:00:00', FALSE, 2, 1),
    (60, 1024, 1200, 512, 800, '2023-11-14 13:15:00', FALSE, 1, 2),
    (70, 1536, 1300, 768, 900, '2023-11-14 13:30:00', FALSE, 3, 3),
    (85, 2560, 1800, 1280, 1500, '2023-11-14 13:45:00', FALSE, 4, 4),
    (75, 1280, 1600, 640, 1200, '2023-11-14 14:00:00', FALSE, 2, 1),
    (90, 3072, 2000, 2048, 1800, '2023-11-14 14:15:00', FALSE, 5, 2),
    (65, 1792, 1400, 896, 1000, '2023-11-14 14:30:00', FALSE, 3, 3),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 14:45:00', FALSE, 6, 4),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 15:45:00', FALSE, 6, 4),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 05:45:00', TRUE, 6, 4),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 05:45:00', TRUE, 6, 4),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 05:50:00', TRUE, 6, 4),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 05:59:00', TRUE, 6, 1),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 00:59:00', TRUE, 6, 1),
    (95, 4096, 2500, 3072, 2200, '2023-11-12 05:59:00', TRUE, 6, 1),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 05:59:00', TRUE, 6, 1),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 05:59:00', TRUE, 6, 2),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 05:59:00', TRUE, 6, 2),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 05:59:00', false, 6, 2),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 05:59:00', false, 6, 2),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 00:11:00', false, 6, 5),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 00:22:00', false, 6, 5),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 00:33:00', false, 6, 6),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 01:10:00', false, 6, 6),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 01:05:00', false, 6, 7),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 01:19:00', false, 6, 7),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 01:29:00', false, 6, 8),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 15:50:00', false, 6, 8),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 15:59:00', false, 6, 9),
    (95, 4096, 2500, 3072, 2200, '2023-11-14 16:59:00', false, 6, 9);

-- Inserir dados na tabela alerta
INSERT INTO alerta (descricao, fk_dados_captura)
VALUES 
    ('Alerta 1', 1),
    ('Alerta 2', 2),
    ('Alerta 3', 3),
    ('Alerta 4', 4),
    ('Alerta 4', 4),
    ('Alerta 4', 4),
    ('Alerta 4', 4),
    ('Alerta 4', 4),
    ('Alerta 5', 5),
    ('Alerta 6', 6),
    ('Alerta 7', 7),
    ('Alerta 8', 8),
    ('Alerta 81', 21),
    ('Alerta 82', 22),
    ('Alerta 83', 23),
    ('Alerta 84', 24),
    ('Alerta 85', 25),
    ('Alerta 86', 26),
    ('Alerta 18', 27),
    ('Alerta 18', 28),
    ('Alerta 28', 29),
    ('Alerta 48', 30);	




WITH DiferencaCapturas AS (
    SELECT
        id_maquina,
        data_captura,
        empresa.nome as nomeEmpresa,
        usuario.nome as nomeUsuario,
        id_usuario,
        empresa.id_empresa,
        LAG(data_captura) OVER (PARTITION BY id_maquina ORDER BY data_captura) AS data_captura_anterior,
        desligada
    FROM dados_captura
    JOIN componente ON dados_captura.fk_componente = componente.id_componente
    JOIN maquina ON componente.fk_maquina = maquina.id_maquina
    JOIN usuario on maquina.fk_usuario = usuario.id_usuario
    JOIN empresa on usuario.fk_empresa = empresa.id_empresa
    WHERE data_captura >= CURRENT_DATE - INTERVAL 7 DAY
)
SELECT
    id_maquina,
    TIMESTAMPDIFF(HOUR, MAX(data_captura_anterior), MIN(data_captura)) AS tempo_inatividade_horas
FROM DiferencaCapturas
WHERE id_empresa = 1
AND id_usuario = 1
GROUP BY id_maquina
ORDER BY tempo_inatividade_horas ASC;


SELECT
    funcionario.id_usuario id_func,
    COUNT(alerta.id_alerta) as count_alertas,
    admin.nome as admins,
    funcionario.nome as funcionario
FROM 
	usuario as admin 
JOIN 
	token ON admin.id_usuario = token.fk_usuario
JOIN
    maquina ON token.idtoken = maquina.fk_token
JOIN 
	usuario as funcionario ON funcionario.id_usuario = maquina.fk_usuario
JOIN 
	dados_captura 
JOIN 
	alerta ON dados_captura.id_dados_captura = alerta.fk_dados_captura
JOIN 
	empresa ON funcionario.fk_empresa = id_empresa
	WHERE admin.id_usuario = 1 AND id_empresa = 1
    GROUP BY id_func, admins, funcionario;
    
    
    
WITH DiferencaCapturas AS (
    SELECT
        id_maquina,
        usuario.nome as nome_usuario,
        id_usuario,
        MAX(data_captura) as ultima_captura_dia,
        MIN(data_captura) AS primeira_captura_dia,
        desligada,
        CASE
            WHEN HOUR(MIN(data_captura)) < 7 OR HOUR(MAX(data_captura)) > 19 THEN true
            ELSE false
        END AS aviso
    FROM dados_captura
    JOIN componente ON dados_captura.fk_componente = componente.id_componente
    JOIN maquina ON componente.fk_maquina = maquina.id_maquina
    JOIN usuario ON maquina.fk_usuario = usuario.id_usuario
    WHERE DATE(data_captura) = CURDATE() -- Considera apenas os dados do dia de hoje
    GROUP BY id_maquina, nome_usuario, id_usuario, desligada
)
SELECT
    id_maquina,
    nome_usuario,
    SUM(CASE WHEN aviso THEN TIMESTAMPDIFF(MINUTE, primeira_captura_dia, ultima_captura_dia) ELSE 0 END) AS tempo_fora_expediente_minutos
FROM DiferencaCapturas
GROUP BY id_maquina, nome_usuario
ORDER BY tempo_fora_expediente_minutos DESC;




SELECT
    maquina.id_maquina,
    usuario.nome,
    COUNT(CASE WHEN componente.nome = 'CPU' THEN alerta.id_alerta END) AS count_alerta_cpu,
    COUNT(CASE WHEN componente.nome= 'RAM' THEN alerta.id_alerta END) AS count_alerta_ram,
    COUNT(CASE WHEN componente.nome = 'HD' THEN alerta.id_alerta END) AS count_alerta_hd
FROM
    alerta
JOIN dados_captura ON alerta.fk_dados_captura = dados_captura.id_dados_captura
JOIN componente ON dados_captura.fk_componente = componente.id_componente
JOIN maquina ON componente.fk_maquina = maquina.id_maquina
JOIN usuario ON maquina.fk_usuario = usuario.id_usuario
JOIN empresa ON usuario.fk_empresa = empresa.id_empresa
WHERE
    empresa.id_empresa = 2
AND usuario.id_usuario = 6
GROUP BY
    id_maquina, nome;
select * from usuario;

select * from maquina;