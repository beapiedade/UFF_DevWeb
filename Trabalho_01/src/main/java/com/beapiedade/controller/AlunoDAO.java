import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.LockModeType;

import com.beapiedade.modelo.Aluno;
import com.beapiedade.excecao.AlunoNaoEncontradoException;

public interface AlunoDAO {
	long inclui(Aluno aluno);
	void altera(Aluno aluno) throws AlunoNaoEncontradoException;
    Aluno busca(String nome) throws AlunoNaoEncontradoException;
	void exclui(long id) throws AlunoNaoEncontradoException;
	List<Aluno> lista();
}

public class AlunoDAOImpl implements AlunoDAO {
	public long inclui(Aluno aluno) {
		EntityManager entityManager = null;
		EntityTransaction entityTransaction = null;

		try {
			entityManager = FabricaDeEntityManager.criarEntityManager();
            entityTransaction = entityManager.getTransaction();

            entityTransaction.begin();
            entityManager.persist(aluno);
            System.out.println("id = " + aluno.getId());
            aluno.setNome("abc");
            entityTransaction.commit();
			return aluno.getId();
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

	public Aluno busca(String nome) throws AlunoNaoEncontradoException {
		EntityManager entityManager = null;

		try {
			entityManager = FabricaDeEntityManager.criarEntityManager();
            Aluno aluno = entityManager.find(Aluno.class, nome);

			if(aluno == null) {
				throw new AlunoNaoEncontradoException("Aluno não encontrado");
			}
			return aluno;
		}

		finally {
			entityManager.close();
		}
	}

	public void altera(Aluno aluno) throws AlunoNaoEncontradoException {
		EntityManager entityManager = null;
		EntityTransaction entityTransaction = null;
		Aluno alunoExistente = null;
		try {
			entityManager = FabricaDeEntityManager.criarEntityManager();
			entityTransaction = entityManager.getTransaction();
			entityTransaction.begin();

            alunoExistente = entityManager.find(Aluno.class, aluno.getId(), LockModeType.PESSIMISTIC_WRITE);

			if (alunoExistente == null) {
                entityTransaction.rollback();
                throw new AlunoNaoEncontradoException(
                    "Aluno com id = " + aluno.getId() + " não encontrado.");
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

	public void exclui(long matrcicula) throws AlunoNaoEncontradoException {
		EntityManager entityManager = null;
		EntityTransaction entityTransaction = null;

		try {
			entityManager = FabricaDeEntityManager.criarEntityManager();
			entityTransaction = entityManager.getTransaction();
			entityTransaction.begin();

            Aluno aluno = entityManager.find(Aluno.class, matricula);

			if (aluno == null) {
				entityTransaction.rollback();
				throw new AlunoNaoEncontradoException("Aluno não encontrado");
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

	public List<Aluno> lista() {
		EntityManager entityManager = null;

		try {
			entityManager = FabricaDeEntityManager.criarEntityManager();

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
