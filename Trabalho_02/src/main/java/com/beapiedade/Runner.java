package com.beapiedade;

import com.beapiedade.model.Aluno;
import com.beapiedade.model.Professor;
import com.beapiedade.model.Turma;
import com.beapiedade.model.TurmaDTO;
import com.beapiedade.model.Inscricao;
import com.beapiedade.model.InscricaoDTO;

import org.springframework.boot.CommandLineRunner;
import org.springframework.web.client.RestTemplate;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class Runner implements CommandLineRunner {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String url = "http://localhost:8080/api";

    public static void main(String[] args) {
        SpringApplication.run(Runner.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("\n\n\n======================================================");
        System.out.println("||              INICIANDO TESTE DA API              ||");
        System.out.println("======================================================");

        try {
            System.out.println("\n>>> ALUNOS");
            System.out.println(">>>>>>>>>>>>> Criando aluno");
            List<String[]> dadosAlunos = Arrays.asList(
                new String[]{"Mariana Silva", "Ciência da Computação", "2023-08-01"},
                new String[]{"Pedro Martins", "Letras", "2025-08-01"},
                new String[]{"Ana Costa", "Engenharia Civil", "2024-08-01"}
            );
            for (String[] dado : dadosAlunos) {
                Aluno novoAluno = new Aluno();
                novoAluno.setNome(dado[0]);
                novoAluno.setCurso(dado[1]);
                novoAluno.setIngresso(LocalDate.parse(dado[2]));
                Aluno alunoCriado = restTemplate.postForObject(url + "/alunos", novoAluno, Aluno.class);
                System.out.println(">>> Aluno " + alunoCriado.getNome() + " criado com sucesso: ID " + alunoCriado.getId());
            }

            System.out.println("\n>>>>>>>>>>>>> Listando todos os alunos");
            Aluno[] alunos = restTemplate.getForObject(url + "/alunos", Aluno[].class);
            for (Aluno a : alunos) {
                System.out.println(">>> ID: " + a.getId() + ", Nome: " + a.getNome() + ", Curso: " + a.getCurso() + ", Ingresso: " + a.getIngresso());
            }

            System.out.println("\n>>>>>>>>>>>>> Buscando aluno por ID");
            Aluno alunoBuscado = restTemplate.getForObject(url + "/alunos/1", Aluno.class);
            System.out.println(">>> Aluno encontrado ID: " + alunoBuscado.getId() + ", Nome: " + alunoBuscado.getNome() + ", Curso: " + alunoBuscado.getCurso() + ", Ingresso: " + alunoBuscado.getIngresso());
            
            System.out.println("\n>>>>>>>>>>>>> Alterando aluno");
            alunoBuscado.setNome("Mariana Silva Santos");
            restTemplate.put(url + "/alunos/" + alunoBuscado.getId(), alunoBuscado);
            System.out.println(">>> Aluno alterado com sucesso ID: " + alunoBuscado.getId() + ", Nome: " + alunoBuscado.getNome() + ", Curso: " + alunoBuscado.getCurso() + ", Ingresso: " + alunoBuscado.getIngresso());

            System.out.println("\n>>>>>>>>>>>>> Excluindo aluno");
            restTemplate.delete(url + "/alunos/" + 2);
            System.out.println(">>> Aluno 2 excluído com sucesso!");

            System.out.println("\n>>>>>>>>>>>>> Listando novamente todos os alunos");
            alunos = restTemplate.getForObject(url + "/alunos", Aluno[].class);
            for (Aluno a : alunos) {
                System.out.println(">>> ID: " + a.getId() + ", Nome: " + a.getNome() + ", Curso: " + a.getCurso() + ", Ingresso: " + a.getIngresso());
            }

            System.out.println("\n>>> PROFESSORES");
            System.out.println(">>>>>>>>>>>>> Criando professor");
            List<String[]> dadosProfessores = Arrays.asList(
                new String[]{"Lucas Pereira", "lucas@gmail.com", "Inteligência Artificial"},
                new String[]{"Sara Oliveira", "sara@gmail.com", "Programação de Computadores"},
                new String[]{"Rafael Almeida", "rafael@gmail.com", "Banco de Dados"}
            );
            for (String[] dado : dadosProfessores) {
                Professor novoProfessor = new Professor();
                novoProfessor.setNome(dado[0]);
                novoProfessor.setEmail(dado[1]);
                novoProfessor.setDepartamento(dado[2]);
                Professor professorCriado = restTemplate.postForObject(url + "/professores", novoProfessor, Professor.class);
                System.out.println(">>> Professor " + professorCriado.getNome() + " criado com sucesso: ID " + professorCriado.getId());
            }

            System.out.println("\n>>>>>>>>>>>>> Listando todos os professores");
            Professor[] professores = restTemplate.getForObject(url + "/professores", Professor[].class);
            for (Professor p : professores) {
                System.out.println(">>> ID: " + p.getId() + ", Nome: " + p.getNome() + ", Email: " + p.getEmail() + ", Departamento: " + p.getDepartamento());
            }

            System.out.println("\n>>>>>>>>>>>>> Buscando professor por ID");
            Professor professorBuscado = restTemplate.getForObject(url + "/professores/1", Professor.class);
            System.out.println(">>> Professor encontrado ID: " + professorBuscado.getId() + ", Nome: " + professorBuscado.getNome() + ", Email: " + professorBuscado.getEmail() + ", Departamento: " + professorBuscado.getDepartamento());

            System.out.println("\n>>>>>>>>>>>>> Alterando professor");
            professorBuscado.setDepartamento("Programação de Computadores I");
            professorBuscado = restTemplate.postForObject(url + "/professores", professorBuscado, Professor.class);
            System.out.println(">>> Professor alterado com sucesso ID: " + professorBuscado.getId() + ", Nome: " + professorBuscado.getNome() + ", Email: " + professorBuscado.getEmail() + ", Departamento: " + professorBuscado.getDepartamento());

            System.out.println("\n>>>>>>>>>>>>> Excluindo professor");
            restTemplate.delete(url + "/professores/" + 2);
            System.out.println(">>> Professor 2 excluído com sucesso!");

            System.out.println("\n>>>>>>>>>>>>> Listando novamente todos os professores");
            professores = restTemplate.getForObject(url + "/professores", Professor[].class);
            for (Professor p : professores) {
                System.out.println(">>> ID: " + p.getId() + ", Nome: " + p.getNome() + ", Email: " + p.getEmail() + ", Departamento: " + p.getDepartamento());
            }

            System.out.println("\n>>> TURMAS");
            System.out.println(">>>>>>>>>>>>> Criando turma");
            List<String[]> dadosTurmas = Arrays.asList(
                new String[]{"2022", "1", "1"},
                new String[]{"2023", "1", "1"},
                new String[]{"2023", "2", "3"}
            );
            for (String[] dadosTurma : dadosTurmas) {
                TurmaDTO novaTurmaDTO = new TurmaDTO();
                novaTurmaDTO.setAno(Integer.parseInt(dadosTurma[0]));
                novaTurmaDTO.setPeriodo(Integer.parseInt(dadosTurma[1]));
                novaTurmaDTO.setProfessorId(Long.parseLong(dadosTurma[2]));
                Turma turmaCriada = restTemplate.postForObject(url + "/turmas", novaTurmaDTO, Turma.class);
                System.out.println(">>> Turma de " + turmaCriada.getAno() + "." + turmaCriada.getPeriodo() + " criada com sucesso ID " + turmaCriada.getId() + ", Professor ID: " + turmaCriada.getProfessor().getId());

            }
           
            System.out.println("\n>>>>>>>>>>>>> Excluindo turma");
            restTemplate.delete(url + "/turmas/" + 2);
            System.out.println(">>> Turma excluída com sucesso!");

            System.out.println("\n>>> INSCRIÇÕES");
            System.out.println(">>>>>>>>>>>>> Criando inscrição");
            List<String[]> dadosInscricoes = Arrays.asList(
                new String[]{"1", "3"},
                new String[]{"1", "1"},
                new String[]{"3", "1"}
            );
            for (String[] dadosInscricao : dadosInscricoes) {
                InscricaoDTO novaInscricaoDTO = new InscricaoDTO();
                novaInscricaoDTO.setAlunoId(Long.parseLong(dadosInscricao[0]));
                novaInscricaoDTO.setTurmaId(Long.parseLong(dadosInscricao[1]));
                Inscricao inscricaoCriada = restTemplate.postForObject(url + "/inscricoes", novaInscricaoDTO, Inscricao.class);
                System.out.println(">>> Inscrição do aluno " + novaInscricaoDTO.getAlunoId() + " na turma " + novaInscricaoDTO.getTurmaId() + " criada com sucesso: ID " + inscricaoCriada.getId());
            }

            System.out.println("\n>>>>>>>>>>>>> Excluindo inscrição");
            restTemplate.delete(url + "/inscricoes/" + 2);
            System.out.println(">>> Inscrição 2 excluída com sucesso!");

        } catch (Exception e) {
            System.out.println("\n>>>>>>>>>>>>> Ocorreu um erro durante o teste");
            System.out.println("Causa: " + e.getMessage());
        }

        System.out.println("\n\n\n======================================================");
        System.out.println("||             SCRIPT DE TESTE FINALIZADO           ||");
        System.out.println("======================================================");
    }
}