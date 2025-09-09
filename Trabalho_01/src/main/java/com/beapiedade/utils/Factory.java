package com.beapiedade.utils;

import org.reflections.Reflections;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import java.lang.reflect.InvocationTargetException;
import java.util.Set;

public class Factory {	
	private static Factory fabrica = null;
	private EntityManagerFactory entityManagerFactory = null;

	private Factory() {
		try {
			entityManagerFactory = Persistence.createEntityManagerFactory("Trabalho_01");
		} catch (Throwable e) {
			e.printStackTrace();
			System.out.println(">>>     ERRO: " + e.getMessage());
		}
	}

	public static EntityManager criarEntityManager() {
		if (fabrica == null) {
			fabrica = new Factory();
		}
		return fabrica.entityManagerFactory.createEntityManager();
	}

	public static <T> T getDAO(Class<T> tipo) {
        Reflections reflections = new Reflections("com.beapiedade.controller");

        Set<Class<? extends T>> conjunto = reflections.getSubTypesOf(tipo);

        if (conjunto.size() != 1) throw new RuntimeException(
			"Deve haver apenas uma classe que implementa a interface "
            + tipo.getName()
		);

        Class<? extends T> classe = conjunto.iterator().next();

        try {
            return classe.getConstructor().newInstance();
        } catch (InstantiationException |
			IllegalAccessException |
			InvocationTargetException |
			NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }
}