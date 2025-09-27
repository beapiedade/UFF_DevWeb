package com.beapiedade.controller;

import java.util.List;

import com.beapiedade.model.Aluno;
import com.beapiedade.utils.AlunoException;

// CONTRATO DE OPERAÇÕES COM A ENTIDADE ALUNO
public interface AlunoDAO {
	long inclui(Aluno aluno);
	void altera(Aluno aluno) throws AlunoException;
    Aluno busca(Long matricula) throws AlunoException;
	void exclui(long id) throws AlunoException;
	List<Aluno> lista();
}