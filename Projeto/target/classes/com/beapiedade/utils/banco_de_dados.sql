DROP TABLE IF EXISTS db.inscricao;
DROP TABLE IF EXISTS db.turma;
DROP TABLE IF EXISTS db.aluno;
DROP TABLE IF EXISTS db.professor;

CREATE TABLE db.aluno (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    curso VARCHAR(30) NOT NULL,
    ingresso DATE DEFAULT NULL,
    PRIMARY KEY (id)
) ENGINE = INNODB CHARACTER SET utf8mb4;

CREATE TABLE db.professor (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(30) NOT NULL,
    departamento VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
) ENGINE = INNODB CHARACTER SET utf8mb4;

CREATE TABLE db.turma (
    id INT NOT NULL AUTO_INCREMENT,
    materia VARCHAR(50) NOT NULL,
    periodo VARCHAR(30) NOT NULL,
    professor_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (professor_id) REFERENCES db.professor(id)
) ENGINE = INNODB CHARACTER SET utf8mb4;

CREATE TABLE db.inscricao (
    id INT NOT NULL AUTO_INCREMENT,
    data_hora DATETIME NOT NULL,
    aluno_id INT NOT NULL,
    turma_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (aluno_id) REFERENCES db.aluno(id),
    FOREIGN KEY (turma_id) REFERENCES db.turma(id)
) ENGINE = INNODB CHARACTER SET utf8mb4;

INSERT INTO db.aluno(nome, curso, ingresso) VALUES('José Magalhães', 'Engenharia', '2020-01-15');
INSERT INTO db.aluno(nome, curso, ingresso) VALUES('Sophia Vasconcelos', 'Medicina', '2019-08-20');
INSERT INTO db.aluno(nome, curso, ingresso) VALUES('Manuella Raposo', 'Direito', '2021-03-10');
INSERT INTO db.aluno(nome, curso, ingresso) VALUES('Heloisa Tavares', 'Arquitetura', '2018-11-05');

INSERT INTO db.professor(nome, email, departamento) VALUES('João Silva', 'joao.silva@example.com', 'Engenharia');
INSERT INTO db.professor(nome, email, departamento) VALUES('Maria Oliveira', 'maria.oliveira@example.com', 'Medicina');
INSERT INTO db.professor(nome, email, departamento) VALUES('Carlos Souza', 'carlos.souza@example.com', 'Direito');
INSERT INTO db.professor(nome, email, departamento) VALUES('Ana Pereira', 'ana.pereira@example.com', 'Arquitetura');