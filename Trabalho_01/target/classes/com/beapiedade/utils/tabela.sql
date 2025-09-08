DROP TABLE if exists db.aluno;

CREATE TABLE db.aluno (
    matricula INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    curso VARCHAR(30) NOT NULL,
    ingresso DATE DEFAULT NULL,
    PRIMARY KEY (matricula)
)
ENGINE = INNODB
CHARACTER SET utf8mb4;

INSERT INTO db.aluno(nome, curso, ingresso)
VALUES('João Silva', 'Engenharia', '2020-01-15');

INSERT INTO db.aluno(nome, curso, ingresso)
VALUES('Maria Oliveira', 'Medicina', '2019-08-20');

INSERT INTO db.aluno(nome, curso, ingresso)
VALUES('Carlos Souza', 'Direito', '2021-03-10');

INSERT INTO db.aluno(nome, curso, ingresso)
VALUES('Ana Pereira', 'Arquitetura', '2018-11-05');
