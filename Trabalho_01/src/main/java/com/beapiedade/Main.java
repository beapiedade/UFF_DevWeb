package com.beapiedade;

import java.util.Scanner;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import main.java.com.beapiedade.model.Aluno;
import com.beapiedade.controller.AlunoDAO;

public class Main {
    public static void main(String[] args) {

        boolean rodando = true;
        int opcao;
        Scanner scanner = new Scanner(System.in);
        
        // ATRIBUTOS DE ALUNO
        String matricula;
        String nome;
        String curso;
        LocalDate ingresso;
        Aluno aluno;
        
        // alunoDAO
        AlunoDAO alunoDAO = new AlunoDAOImpl();
        // ProdutoDAO produtoDAO = FabricaDeDAOs.getDAO(ProdutoDAO.class);

        while (rodando){
            String menu_deco = "**********";
            String opcao_deco = "------------";
            System.out.println('\n' + menu_deco + " SISTEMA DE ALUNOS " + menu_deco + '\n');
            System.out.println("1.     Incluir aluno;");
            System.out.println("2.     Alterar aluno;");
            System.out.println("3.     Buscar aluno;");
            System.out.println("4.     Excluir aluno;");
            System.out.println("5.     Listar todos os alunos;");
            System.out.println("0.     Sair" + '\n');

            System.out.print(">>>     ");
            opcao = scanner.nextInt();

            switch (opcao) {
                case 1:
                    System.out.println('\n' + opcao_deco + " INCLUIR ALUNO " + opcao_deco + '\n');

                    System.out.print("Matrícula:     ");
                    matricula = scanner.nextLine();

                    System.out.print("Nome:     ");
                    nome = scanner.nextLine();

                    System.out.print("Curso:     ");
                    curso = scanner.nextLine();

                    System.out.print("Data de ingresso (dd/mm/aaaa):     ");
                    String dataIngresso = scanner.nextLine();
                    ingresso = LocalDate.parse(dataIngresso, DateTimeFormatter.ofPattern("dd/MM/yyyy"));

                    aluno = new Aluno(nome, curso, ingresso);
                    alunoDAO.inclui(aluno);

                    System.out.println('\n' + ">>>     Aluno incluído com sucesso!");
                    System.out.println("matrícula         nome         curso         ingresso");
                    System.out.printf("%-15s %-15s %-15s %-15s%n", aluno.getMatricula(), aluno.getNome(), aluno.getCurso(), aluno.getIngresso());
                    break;

                case 2:
                    System.out.println('\n' + opcao_deco + " ALTERAR ALUNO " + opcao_deco + '\n');
                    break;

                case 3:
                    System.out.println('\n' + opcao_deco + " BUSCAR ALUNO " + opcao_deco + '\n');
                    break;

                case 4:
                    System.out.println('\n' + opcao_deco + " EXCLUIR ALUNO " + opcao_deco + '\n');
                    break;

                case 5:
                    System.out.println('\n' + opcao_deco + " LISTAR ALUNOS " + opcao_deco + '\n');
                    break;

                case 0:
                    rodando = false;
                    break;

                default:
                    System.out.println(">>>     OPÇÃO INVÁLIDA!");
            }
        }
        scanner.close();
    }
}