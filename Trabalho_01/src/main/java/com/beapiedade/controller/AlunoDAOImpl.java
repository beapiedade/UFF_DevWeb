package com.beapiedade.controller;

import com.beapiedade.model.Aluno;
import com.beapiedade.utils.*;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.LockModeType;

// IMPLEMENTAÇÃO DAS OPERAÇÕES COM A ENTIDADE ALUNO
public class AlunoDAOImpl implements AlunoDAO {
	@Override
	public long inclui(Aluno aluno) {
		EntityManager entityManager = null;
		EntityTransaction entityTransaction = null;

		try {
			entityManager = Factory.criarEntityManager();
            entityTransaction = entityManager.getTransaction();

            entityTransaction.begin();
            entityManager.persist(aluno);

            entityTransaction.commit();
			return aluno.getMatricula();
		}
		catch(RuntimeException e) {
            if (entityTransaction != null) {
                entityTransaction.rollback();
            }
			throw e;
		}

		finally {
            entityManager.close();
		}
	}

	@Override
	public Aluno busca(Long matricula) throws AlunoException {
		EntityManager entityManager = null;

		try {
			entityManager = Factory.criarEntityManager();
            Aluno aluno = entityManager.find(Aluno.class, matricula);

			if(aluno == null) {
				throw new AlunoException(">>>     ERRO: Aluno não encontrado");
			}
			return aluno;
		}

		finally {
			entityManager.close();
		}
	}

	@Override
	public void altera(Aluno aluno) throws AlunoException {
		EntityManager entityManager = null;
		EntityTransaction entityTransaction = null;
		Aluno alunoEncontrado = null;
		
		try {
			entityManager = Factory.criarEntityManager();
			entityTransaction = entityManager.getTransaction();
			entityTransaction.begin();

            alunoEncontrado = entityManager.find(Aluno.class, aluno.getMatricula(), LockModeType.PESSIMISTIC_WRITE);

			if (alunoEncontrado == null) {
                entityTransaction.rollback();
                throw new AlunoException(
                    ">>>     Aluno com matrícula " + aluno.getMatricula() + " não encontrado.");
            }
            entityManager.merge(aluno);
            entityTransaction.commit();
		}
		catch(RuntimeException e) {
			if (entityTransaction != null) {
                entityTransaction.rollback();
            }
		    throw e;
		}
		finally {
            entityManager.close();
		}
	}

	@Override
	public void exclui(long matricula) throws AlunoException {
		EntityManager entityManager = null;
		EntityTransaction entityTransaction = null;

		try {
			entityManager = Factory.criarEntityManager();
			entityTransaction = entityManager.getTransaction();
			entityTransaction.begin();

            Aluno aluno = entityManager.find(Aluno.class, matricula);

			if (aluno == null) {
				entityTransaction.rollback();
				throw new AlunoException(">>>     Aluno com matrícula " + matricula + " não encontrado.");
			}

            entityManager.remove(aluno);
			entityTransaction.commit();
		}
		catch(RuntimeException e) {
			if (entityTransaction != null) {
				entityTransaction.rollback();
			}
			throw e;
		}
		finally {
			entityManager.close();
		}
	}

	@Override
	public List<Aluno> lista() {
		EntityManager entityManager = null;

		try {
			entityManager = Factory.criarEntityManager();

			List<Aluno> alunos = entityManager
                .createQuery("select a from Aluno a order by a.matricula", Aluno.class)
                .getResultList();

			return alunos;
		}

		finally {
			entityManager.close();
		}
	}
}