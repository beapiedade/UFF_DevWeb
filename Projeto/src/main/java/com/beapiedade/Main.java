/*package com.beapiedade;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Scanner;

import com.beapiedade.controller.DAOs.AlunoDAO;
import com.beapiedade.model.Aluno;
import com.beapiedade.utils.exceptions.AlunoException;
import com.beapiedade.utils.Factory;

// CLASSE PARA CAPTURAR ENTRADAS E EXIBIR O MENU
public class Main {

    public static Scanner scanner = new Scanner(System.in);

    public static int menu_resposta() {
        int resposta;

        System.out.print(">>>     ");
        resposta = scanner.nextInt();
        scanner.nextLine();
        return resposta;
    }

    public static void menu_gerenciamento(int tipo) {
        System.out.println("1.     Incluir;");
        System.out.println("2.     Remover;");

        if (tipo == 1) {
            System.out.println("3.     Alterar;");
            System.out.println("4.     Buscar;");
            System.out.println("5.     Listar;");
        }

        System.out.println("0.     Voltar" + '\n');
    }
    
    public static void aluno_CRUD(int tipo) {
        String nome, curso;
        LocalDate ingresso;
        Long identificacao;

        Aluno aluno;
        String cabecalho = "id              nome                   curso                   ingresso";
        AlunoDAO alunoDAO = Factory.getDAO(AlunoDAO.class);

        if (tipo == 1) {
            System.out.println('\n' + ">>>     Incluir novo aluno" + '\n');

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
            System.out.println(cabecalho);
            System.out.printf("%-15s %-22s %-23s %-20s%n", aluno.getId(), aluno.getNome(), aluno.getCurso(), aluno.getIngresso());

        } else if (tipo == 2) {
            System.out.println('\n' + ">>>     Remover aluno" + '\n');

            System.out.print("Número de identificação:     ");
            identificacao = scanner.nextLong();
            scanner.nextLine(); // Pra consumir o enter do buffer

            try {
                aluno = alunoDAO.busca(identificacao);
            } catch (AlunoException e) {
                System.out.println('\n' + e.getMessage());
                return;
            }

            System.out.println(cabecalho);
            System.out.printf("%-15s %-22s %-23s %-20s%n", aluno.getId(), aluno.getNome(), aluno.getCurso(), aluno.getIngresso());

            int opcaoRemocao = 0;
            System.out.println('\n' + "Confirma a remoção desse aluno?");
            System.out.println('\n' + "0. Não");
            System.out.println("1. Sim");

            opcaoRemocao = menu_resposta();

            if (opcaoRemocao == 0) {
                System.out.println('\n' + ">>>     Operação cancelada!");
                return;

            } else if (opcaoRemocao == 1) {
                try {
                    alunoDAO.exclui(identificacao);
                    System.out.println('\n' + ">>>     Aluno removido com sucesso!");
                } catch (AlunoException e) {
                    System.out.println('\n' + e.getMessage());
                }
                return;
            }

        } else if (tipo == 3) {
            System.out.println('\n' + ">>>     Alterar dados do aluno" + '\n');

            System.out.print("Número de identificação:     ");
            identificacao = scanner.nextLong();
            scanner.nextLine(); // Pra consumir o enter do buffer

            try {
                aluno = alunoDAO.busca(identificacao);
                System.out.println(cabecalho);
                System.out.printf("%-15s %-22s %-23s %-20s%n", aluno.getId(), aluno.getNome(), aluno.getCurso(), aluno.getIngresso());
            } catch (AlunoException e) {
                System.out.println('\n' + e.getMessage());
                return;
            }

            int opcaoAlteracao = 0;
            System.out.println('\n' + "Selecione o que deseja alterar:");
            System.out.println("1. Nome");
            System.out.println("2. Curso");
            System.out.println("3. Data de ingresso");

            opcaoAlteracao = menu_resposta();

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
                    String dataIngresso = scanner.nextLine();
                    ingresso = LocalDate.parse(dataIngresso, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
                    aluno.setIngresso(ingresso);
                    break;
                default:
                    System.out.println('\n' + ">>>     OPÇÃO INVÁLIDA!");
                    return;
            }

            try {
                alunoDAO.altera(aluno);
                System.out.println('\n' + ">>>     Aluno alterado com sucesso!");
                System.out.println(cabecalho);
                System.out.printf("%-15s %-15s %-15s %-15s%n", aluno.getId(), aluno.getNome(), aluno.getCurso(), aluno.getIngresso());
            } catch (AlunoException e) {
                System.out.println('\n' + e.getMessage());
            }
            return;

        } else if (tipo == 4) {
            System.out.println('\n' + ">>>     Buscar aluno" + '\n');

            System.out.print("Número de identificação:     ");
            identificacao = scanner.nextLong();
            scanner.nextLine(); // Pra consumir o enter do buffer

            try {
                aluno = alunoDAO.busca(identificacao);
                System.out.println(cabecalho);
                System.out.printf("%-15s %-22s %-23s %-20s%n", aluno.getId(), aluno.getNome(), aluno.getCurso(), aluno.getIngresso());
            } catch (AlunoException e) {
                System.out.println('\n' + e.getMessage());
            }

        } else if (tipo == 5) {
            System.out.println('\n' + ">>>     Listar todos os alunos" + '\n');

            List<Aluno> alunos = alunoDAO.lista();
            System.out.println(cabecalho);
            for (Aluno a : alunos) {
                System.out.printf("%-15s %-22s %-23s %-20s%n", a.getId(), a.getNome(), a.getCurso(), a.getIngresso());
            }
            if (alunos.isEmpty()) {
                System.out.println("Nenhum aluno encontrado.");
            }
            return;
        }
    }
    
    public static void professor_CRUD(int tipo) {
        // Implementar CRUD de professores
    }

    public static void turma_CRUD(int tipo) {
        // Implementar CRUD de turmas
    }

    public static void inscricao_CRUD(int tipo) {
        // Implementar CRUD de inscrições
    }
    
    public static void main(String[] args) {

        boolean rodando = true;
        int opcao;

        String menu_deco = "**********";
        String opcao_deco = "------------";

        while (rodando){
            System.out.println('\n' + menu_deco + " SISTEMA ESCOLAR " + menu_deco + '\n');
            System.out.println("1.     Área de alunos;");
            System.out.println("2.     Área de professores;");
            System.out.println("3.     Área de turmas;");
            System.out.println("4.     Área de inscrições;");
            System.out.println("0.     Sair" + '\n');

            opcao = menu_resposta();

            switch (opcao) {
                case 1:
                    System.out.println('\n' + opcao_deco + " ÁREA DE ALUNOS " + opcao_deco + '\n');
                    menu_gerenciamento(1);
                    opcao = menu_resposta();
                    aluno_CRUD(opcao);
                    break;

                case 2:
                    System.out.println('\n' + opcao_deco + " ÁREA DE PROFESSORES " + opcao_deco + '\n');
                    menu_gerenciamento(1);
                    opcao = menu_resposta();
                    professor_CRUD(opcao);
                    break;

                case 3:
                    System.out.println('\n' + opcao_deco + " ÁREA DE TURMAS " + opcao_deco + '\n');
                    menu_gerenciamento(0);
                    opcao = menu_resposta();
                    turma_CRUD(opcao);
                    break;

                case 4:
                    System.out.println('\n' + opcao_deco + " ÁREA DE INSCRIÇÕES " + opcao_deco + '\n');
                    menu_gerenciamento(0);
                    opcao = menu_resposta();
                    inscricao_CRUD(opcao);
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
}*/