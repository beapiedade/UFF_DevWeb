package com.beapiedade;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Scanner;

import com.beapiedade.controller.AlunoDAO;
import com.beapiedade.model.Aluno;
import com.beapiedade.utils.AlunoException;
import com.beapiedade.utils.Factory;

public class Main {
    public static void main(String[] args) {

        boolean rodando = true;
        int opcao;
        Scanner scanner = new Scanner(System.in);
        
        // ATRIBUTOS DE ALUNO
        Long matricula;
        String nome;
        String curso;
        LocalDate ingresso;
        Aluno aluno;

        AlunoDAO alunoDAO = Factory.getDAO(AlunoDAO.class);

        while (rodando){
            String menu_deco = "**********";
            System.out.println('\n' + menu_deco + " SISTEMA DE ALUNOS " + menu_deco + '\n');
            System.out.println("1.     Incluir aluno;");
            System.out.println("2.     Alterar aluno;");
            System.out.println("3.     Buscar aluno;");
            System.out.println("4.     Excluir aluno;");
            System.out.println("5.     Listar todos os alunos;");
            System.out.println("0.     Sair" + '\n');

            System.out.print(">>>     ");
            opcao = scanner.nextInt();
            scanner.nextLine(); // Pra consumir o enter do buffer

            String opcao_deco = "------------";
            switch (opcao) {
                case 1:
                    System.out.println('\n' + opcao_deco + " INCLUIR ALUNO " + opcao_deco + '\n');

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

                    System.out.print("Número de matrícula:     ");
                    matricula = scanner.nextLong();
                    scanner.nextLine(); // Pra consumir o enter do buffer

                    try {
                        aluno = alunoDAO.busca(matricula);
                    } catch (AlunoException e) {
                        System.out.println('\n' + e.getMessage());
                        break;
                    }

                    System.out.println("matrícula         nome         curso         ingresso");
                    System.out.printf("%-15s %-15s %-15s %-15s%n", aluno.getMatricula(), aluno.getNome(), aluno.getCurso(), aluno.getIngresso());
                    
                    int opcaoAlteracao = 0;
                    System.out.println('\n' + "Selecione o que deseja alterar:");
                    System.out.println('\n' + "1. Nome");
                    System.out.println("2. Curso");
                    System.out.println("3. Data de ingresso");

                    System.out.print(">>>     ");
                    opcaoAlteracao = scanner.nextInt();
                    scanner.nextLine(); // Pra consumir o enter do buffer

                    switch (opcaoAlteracao) {
                        case 1:
                            System.out.print("Nome:     ");
                            nome = scanner.nextLine();
                            aluno.setNome(nome);
                            break;

                        case 2:
                            System.out.print("Curso:     ");
                            curso = scanner.nextLine();
                            aluno.setCurso(curso);
                            break;

                        case 3:
                            System.out.print("Data de ingresso (dd/mm/aaaa):     ");
                            dataIngresso = scanner.nextLine();
                            ingresso = LocalDate.parse(dataIngresso, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
                            aluno.setIngresso(ingresso);
                            break;
                        default:
                            System.out.println('\n' + ">>>     OPÇÃO INVÁLIDA!");
                    }

                    try {
                        alunoDAO.altera(aluno);
                        System.out.println('\n' + ">>>     Aluno alterado com sucesso!");
                        System.out.println("matrícula         nome         curso         ingresso");
                        System.out.printf("%-15s %-15s %-15s %-15s%n", aluno.getMatricula(), aluno.getNome(), aluno.getCurso(), aluno.getIngresso());
                    } catch (AlunoException e) {
                        System.out.println('\n' + e.getMessage());
                    }
                    break;

                case 3:
                    System.out.println('\n' + opcao_deco + " BUSCAR ALUNO " + opcao_deco + '\n');
                    
                    System.out.print("Número de matrícula:     ");
                    matricula = scanner.nextLong();
                    scanner.nextLine(); // Pra consumir o enter do buffer

                    try {
                        aluno = alunoDAO.busca(matricula);
                    } catch (AlunoException e) {
                        System.out.println('\n' + e.getMessage());
                        break;
                    }

                    System.out.println("matrícula         nome         curso         ingresso");
                    System.out.printf("%-15s %-15s %-15s %-15s%n", aluno.getMatricula(), aluno.getNome(), aluno.getCurso(), aluno.getIngresso());
                 
                    break;

                case 4:
                    System.out.println('\n' + opcao_deco + " EXCLUIR ALUNO " + opcao_deco + '\n');
                    
                    System.out.print("Número de matrícula:     ");
                    matricula = scanner.nextLong();
                    scanner.nextLine(); // Pra consumir o enter do buffer

                    try {
                        aluno = alunoDAO.busca(matricula);
                    } catch (AlunoException e) {
                        System.out.println('\n' + e.getMessage());
                        break;
                    }

                    System.out.println("matrícula         nome         curso         ingresso");
                    System.out.printf("%-15s %-15s %-15s %-15s%n", aluno.getMatricula(), aluno.getNome(), aluno.getCurso(), aluno.getIngresso());
                    
                    int opcaoRemocao = 0;
                    System.out.println('\n' + "Confirma a remoção desse aluno?");
                    System.out.println('\n' + "0. Não");
                    System.out.println("1. Sim");

                    System.out.print(">>>     ");
                    opcaoRemocao = scanner.nextInt();
                    scanner.nextLine(); // Pra consumir o enter do buffer

                    switch (opcaoRemocao) {
                        case 1:
                            try {
                                alunoDAO.exclui(matricula);
                                System.out.println('\n' + ">>>     Aluno removido com sucesso!");
                            } catch (AlunoException e) {
                                System.out.println('\n' + e.getMessage());
                            }
                            break;

                        case 2:
                            System.out.println('\n' + ">>>     Operação cancelada!");
                            break;

                    }
                    
                    break;

                case 5:
                    System.out.println('\n' + opcao_deco + " LISTAR ALUNOS " + opcao_deco + '\n');
                    
                    List<Aluno> alunos = alunoDAO.lista();

                    System.out.println("matrícula         nome         curso         ingresso");
                    
					for (Aluno temp_aluno : alunos) {
						System.out.printf("%-15s %-15s %-15s %-15s%n", temp_aluno.getMatricula(), temp_aluno.getNome(), temp_aluno.getCurso(), temp_aluno.getIngresso());
					}
                    
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