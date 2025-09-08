package com.carlosribeiro.dao.impl;

import com.carlosribeiro.dao.ProdutoDAO;
import com.carlosribeiro.excecao.ProdutoNaoEncontradoException;
import com.carlosribeiro.modelo.Produto;
import com.carlosribeiro.util.FabricaDeEntityManager;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.LockModeType;
import java.util.List;

public class JPAProdutoDAO implements ProdutoDAO
{	
	public long inclui(Produto umProduto)
	{
		EntityManager em = null;
		EntityTransaction tx = null;

		try
		{	// transiente - quando o id é null
			// persistente - quando o objeto está sendo monitorado pelo EntityManager
			// destacado - quando o id é diferente de null e o objeto não está sendo
            //             monitorado pelo entity manager.
            em = FabricaDeEntityManager.criarEntityManager();

            tx = em.getTransaction();

            tx.begin();
            em.persist(umProduto);
            // 1. Inclui o objeto umProduto na lista de objetos monitorados do EntityManager.
            // 2. Executa a inserção do comando insert
            // 3. Atribui o valor do id em umProduto
            System.out.println("id = " + umProduto.getId());
            umProduto.setNome("abc");
            // 4. Agenda a execução de um comando update
            tx.commit();
            // 5. Executa o comando update e commita
			return umProduto.getId();
		}
		catch(RuntimeException e)
		{	if (tx != null)
			{
                tx.rollback();
			}
			throw e;
		}
		finally
		{
            em.close();
		}
	}

	public Produto recuperaUmProduto(long numero) throws ProdutoNaoEncontradoException
	{
		EntityManager em = null;

		try
		{
			em = FabricaDeEntityManager.criarEntityManager();
            Produto umProduto = em.find(Produto.class, numero);

			// Características no método find():
			// 1. É genérico: não requer um cast.
			// 2. Retorna null caso a linha não seja encontrada no banco.

			if(umProduto == null)
			{	throw new ProdutoNaoEncontradoException("Produto não encontrado");
			}
			return umProduto;
		}
		finally
		{   em.close();
		}
	}

	public void altera(Produto umProduto) throws ProdutoNaoEncontradoException
	{
		EntityManager em = null;
		EntityTransaction tx = null;
		Produto produto = null;
		try
		{
			em = FabricaDeEntityManager.criarEntityManager();
			tx = em.getTransaction();
			tx.begin();

            produto = em.find(Produto.class, umProduto.getId(), LockModeType.PESSIMISTIC_WRITE);

			if (produto == null) {
                tx.rollback();
                throw new ProdutoNaoEncontradoException(
                    "Produto com id = " + umProduto.getId() + " não encontrado.");
			}
			// O merge entre nada e tudo é tudo. Ao tentar alterar um produto deletado ele será re-inserido
			// no banco de dados.
            em.merge(umProduto);

            tx.commit();
		}
		catch(RuntimeException e)
		{
			if (tx != null)
		    {   tx.rollback();
		    }
		    throw e;
		}
		finally
		{   em.close();
		}
	}

	public void exclui(long numero) throws ProdutoNaoEncontradoException
	{
		EntityManager em = null;
		EntityTransaction tx = null;

		try
		{
			em = FabricaDeEntityManager.criarEntityManager();
			tx = em.getTransaction();
			tx.begin();

            Produto produto = em.find(Produto.class, numero);

			if(produto == null)
			{	tx.rollback();
				throw new ProdutoNaoEncontradoException("Produto não encontrado");
			}

            em.remove(produto);
			tx.commit();
		}
		catch(RuntimeException e)
		{
			if (tx != null)
		    {   tx.rollback();
		    }
		    throw e;
		}
		finally
		{   em.close();
		}
	}

	public List<Produto> recuperaProdutos()
	{
		EntityManager em = null;

		try
		{	em = FabricaDeEntityManager.criarEntityManager();

			List produtos = em
                .createQuery("select p from Produto p order by p.id")
                .getResultList();

			// Retorna um List vazio caso a tabela correspondente esteja vazia.

			return produtos;
		}
		finally
		{   em.close();
		}
	}
}