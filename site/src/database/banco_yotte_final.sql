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

CREATE TABLE parametro_componente (
    id_parametro INT PRIMARY KEY AUTO_INCREMENT,
    valor_minimo FLOAT,
    valor_maximo FLOAT,
    fk_componente INT,
    FOREIGN KEY (fk_componente) REFERENCES componente(id_componente)
);


CREATE TABLE dados_captura (
    id_dados_captura INT PRIMARY KEY AUTO_INCREMENT,
    uso bigint,
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


DROP TRIGGER IF EXISTS verifica_alerta;

DELIMITER //

CREATE TRIGGER verifica_alerta
AFTER INSERT ON dados_captura
FOR EACH ROW
BEGIN
	DECLARE componente_nome VARCHAR(45);
    DECLARE componente_uso bigint;
    DECLARE porcentagem_uso DECIMAL(5, 2);
    DECLARE parametro_componente VARCHAR(20);

    -- Obtém o uso do componente
    SELECT dc.uso, c.parametro, c.nome INTO componente_uso, parametro_componente, componente_nome
    FROM dados_captura dc
    INNER JOIN componente c ON dc.fk_componente = c.id_componente
    WHERE dc.id_dados_captura = NEW.id_dados_captura
    LIMIT 1; -- Limita a subconsulta a uma linha

    -- Converte para porcentagem se necessário
    IF componente_uso IS NOT NULL AND parametro_componente = '%' THEN
        SET porcentagem_uso = componente_uso;
    ELSE
        SELECT (componente_uso / (SELECT total FROM info_componente ic JOIN componente c ON ic.id_info = c.fk_info WHERE ic.id_info = c.fk_info LIMIT 1)) * 100 INTO porcentagem_uso;
    END IF;

    -- Verifica se a porcentagem está fora dos limites
    IF porcentagem_uso < (SELECT valor_minimo FROM parametro_componente pc JOIN componente c ON pc.fk_componente = c.id_componente WHERE pc.fk_componente = c.id_componente LIMIT 1) OR
       porcentagem_uso > (SELECT valor_maximo FROM parametro_componente pc JOIN componente c ON pc.fk_componente = c.id_componente WHERE pc.fk_componente = c.id_componente LIMIT 1) THEN
       
        -- Insere um alerta na tabela
		INSERT INTO alerta (descricao, fk_dados_captura)
        VALUES (CONCAT('Uso do componente fora dos limites: ', componente_nome), NEW.id_dados_captura);
    END IF;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER verifica_alerta_expediente
AFTER INSERT ON dados_captura
FOR EACH ROW
BEGIN
    DECLARE id_maquina INT;
    DECLARE componente_nome VARCHAR(45);
    DECLARE usuario_nome VARCHAR(45);
    DECLARE horario_logado_fora BOOLEAN;
    DECLARE primeira_captura_dia DATETIME;
    DECLARE ultima_captura_dia DATETIME;

    -- Obtém o nome do componente e verifica se está fora do expediente
    SELECT c.nome, u.nome, m.id_maquina, MIN(dc.data_captura), MAX(dc.data_captura), CASE
            WHEN HOUR(NEW.data_captura) < 7 OR HOUR(NEW.data_captura) > 19 THEN true
            ELSE false
        END INTO componente_nome, usuario_nome, id_maquina, primeira_captura_dia, ultima_captura_dia, horario_logado_fora
    FROM componente c
    JOIN maquina m ON c.fk_maquina = m.id_maquina
    JOIN usuario u ON m.fk_usuario = u.id_usuario
    JOIN dados_captura dc ON dc.fk_componente = c.id_componente
    WHERE c.id_componente = NEW.fk_componente
    GROUP BY c.nome, u.nome, m.id_maquina;

    -- Se estiver fora do horário expediente, insere um alerta na tabela
    IF horario_logado_fora THEN
        INSERT INTO alerta (descricao, fk_dados_captura)
        VALUES (CONCAT('Usuário ', usuario_nome, ' logou fora do expediente na máquina ', id_maquina, '. Tempo de atividade: ', TIMESTAMPDIFF(MINUTE, primeira_captura_dia, ultima_captura_dia), ' minutos.'), NEW.id_dados_captura);
    END IF;
END //

DELIMITER ;

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
    (null, null, 8123420000), -- maquina01 
    (2, 2, null), -- maquina01
    (null, null, 1073740000), -- maquina01
    (null, null, 8123420000), -- maquina02
    (2, 2, null), -- maquina02
    (null, null, 1073740000), -- maquina02
    (null, null, 8123420000), -- maquina03
    (2, 2, null), -- maquina03
    (null, null, 1073740000), -- maquina03
    (null, null, 8123420000), -- maquina04
    (2, 2, null), -- maquina04
    (null, null, 1073740000); -- maquina04
    

-- Inserir dados na tabela componente
INSERT INTO componente (nome, parametro, fk_info, fk_maquina)
VALUES 
    ('memoria', 'bytes', 1, 1),
    ('cpu', '%', 2, 1),
    ('disco', 'bytes', 3, 1),
    ('memoria', 'bytes', 4, 2),
    ('cpu', '%', 5, 2),
    ('disco', 'bytes', 6, 2),
    ('memoria', 'bytes', 7, 3),
    ('cpu', '%', 8, 3),
    ('disco', 'bytes', 9, 3),
    ('memoria', 'bytes', 10, 4),
    ('cpu', '%', 11, 4),
    ('disco', 'bytes', 12, 4);

insert into parametro_componente VALUES (null, 80, 50, 1),
(null, 80, 30, 2),
(null, 80, 30, 3),
(null, 80, 30, 4),
(null, 60, 20, 5),
(null, 60, 20, 6),
(null, 60, 20, 7),
(null, 60, 20, 8),
(null, 70, 20, 9),
(null, 70, 20, 10),
(null, 70, 02, 11),
(null, 70, 20, 12);

-- Inserir dados na tabela dados_captura
INSERT INTO dados_captura (uso, byte_leitura, leituras, byte_escrita,
 escritas, data_captura, desligada, frequencia, fk_componente)
VALUES 
    (5579563008, null, null, null, null, NOW(), 0, 18000000, 1),
    (14, null, null, null, null, NOW(), 0, null, 2),
    (null, 1536, 1300, 768, 900, NOW(), 0, null, 3),
    (5579563008, null, null, null, null, NOW(), 0, 1800000, 4),
    (14, null, null, null, null, NOW(), 0, null, 5),
    (null, 1792, 1400, 896, 1000, NOW(), 0, null, 6),
    (5579563008, null, null, null, null, NOW(), 0, 1800000000, 7),
    (45, null, null, null, null, NOW(), 0, null, 8),
    (null, 4096, 2500, 3072, 2200, NOW(), 0, null, 9),
    (5579563008, null, null, null, null, NOW(), 0, 1800000000, 10),
    (52, null, null, null, null, NOW(), 0, null, 11),
    (null, 4096, 2500, 3072, 2200, NOW(), 0, null, 12),
    (5579563008, null, null, null, null, NOW(), 0, 1800000000, 1),
    (25, null, null, null, null, NOW(), 0, null, 2),
    (null, 4096, 2500, 3072, 2200, NOW(), 0, null, 3),
    (5579563008, null, null, null, null, NOW(), 0, 1800000000, 4),
    (50, null, null, null, null, NOW(), 0, null, 5),
    (null, 4096, 2500, 3072, 2200, NOW(), 0, null, 6),
    (5579563008, null, null, null, null, NOW(), 0, 1800000000, 7),
    (19, null, null, null, null, NOW(), 0, null, 8),
    (null, 4096, 2500, 3072, 2200, NOW(), 0, null, 9),
    (5579563008, null, null, null, null, NOW(), 0, 1800000000, 10),
    (37, null, null, null, null, NOW(), 0, null, 11),
    (null, 4096, 2500, 3072, 2200, NOW(), 0, null, 12);

select * from alerta;

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