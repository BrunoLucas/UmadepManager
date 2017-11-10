--
-- File generated with SQLiteStudio v3.1.0 on sáb set 24 19:48:40 2016
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: tarefa_pessoa
CREATE TABLE tarefa_pessoa (
    tarefa_codigo BIGINT REFERENCES tarefa (codigo),
    pessoa_codigo BIGINT REFERENCES pessoa (codigo),
    PRIMARY KEY (
        tarefa_codigo,
        pessoa_codigo
    )
);


-- Table: pessoa
CREATE TABLE pessoa (
    codigo         INTEGER PRIMARY KEY AUTOINCREMENT,
    nome           STRING,
    nascimento     DATE,
    tipo           CHAR,
    telefone       NUMERIC,
    celular        NUMERIC,
    endereco       TEXT,
    congregacao_id INTEGER REFERENCES congregacao (id) ON UPDATE CASCADE,
    sexo           CHAR,
    cpf            BIGINT
);


-- Table: tarefa_gasto
CREATE TABLE tarefa_gasto (
    codigo_gasto  BIGINT REFERENCES gasto (codigo),
    codigo_tarefa BIGINT REFERENCES evento (codigo),
    PRIMARY KEY (
        codigo_gasto,
        codigo_tarefa
    )
);


-- Table: tarefa
CREATE TABLE tarefa (
    codigo    INTEGER PRIMARY KEY,
    descricao STRING,
    nome      STRING
);


-- Table: gasto
CREATE TABLE gasto (
    codigo    INTEGER PRIMARY KEY,
    descricao STRING,
    valor     REAL
);


-- Table: administrador
CREATE TABLE administrador (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario STRING  NOT NULL,
    senha   STRING
);


-- Table: evento_tarefa
CREATE TABLE evento_tarefa (
    codigo_tarefa BIGINT REFERENCES tarefa (codigo),
    codigo_evento BIGINT REFERENCES evento (codigo),
    PRIMARY KEY (
        codigo_tarefa,
        codigo_evento
    )
);


-- Table: congregacao
CREATE TABLE congregacao (
    codigo    INTEGER PRIMARY KEY AUTOINCREMENT,
    nome      STRING,
    descricao STRING
);


-- Table: evento
CREATE TABLE evento (
    codigo           INTEGER  PRIMARY KEY AUTOINCREMENT,
    titulo           STRING,
    data             DATETIME,
    descricao        STRING,
    local            STRING,
    nome             STRING,
    administrador_id BIGINT   REFERENCES administrador (id) 
);


-- Table: congregacao_pessoa
CREATE TABLE congregacao_pessoa (
    congregacao_codigo BIGINT REFERENCES congregacao (id),
    pessoa_codigo      BIGINT REFERENCES pessoa (codigo),
    PRIMARY KEY (
        congregacao_codigo,
        pessoa_codigo
    )
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
