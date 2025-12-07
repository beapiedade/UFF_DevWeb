package com.beapiedade;

import com.beapiedade.model.*;
import com.beapiedade.repository.*;
import com.beapiedade.security.model.Usuario;
import com.beapiedade.security.repository.UsuarioRepository;
import com.beapiedade.security.util.Role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.web.client.RestTemplate;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class Runner implements CommandLineRunner {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String url = "http://localhost:8080/api";

    @Autowired
    private AlunoRepository alunoRepository;
    @Autowired
    private DisciplinaRepository disciplinaRepository;
    @Autowired
    private InscricaoRepository inscricaoRepository;
    @Autowired
    private ProfessorRepository professorRepository;
    @Autowired
    private TurmaRepository turmaRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(Runner.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            System.out.println("\n>>> CADASTRO DE USUÁRIOS");
            System.out.println(">>>>>>>>>>>>> Criando perfis");
            Usuario usuario = new Usuario("Administrador", "admin@edu.net", "adm123", Role.ADMIN);
            System.out.println(new BCryptPasswordEncoder().encode("adm123"));

            usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
            Usuario userCriado = usuarioRepository.save(usuario);
            System.out.println(">>>>>>>>>>>>> Usuário criado: " + userCriado.getNome() + " - " + userCriado.getEmail() + " - " + userCriado.getRole());

            usuario = new Usuario("Usuário", "user@edu.net", "user456", Role.USER);
            System.out.println(new BCryptPasswordEncoder().encode("user456"));

            usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
            userCriado = usuarioRepository.save(usuario);
            System.out.println(">>>>>>>>>>>>> Usuário criado: " + userCriado.getNome() + " - " + userCriado.getEmail() + " - " + userCriado.getRole());

            int controle = 0;
            System.out.println("\n>>> ALUNOS");
            System.out.println(">>>>>>>>>>>>> Criando aluno");
            List<String[]> dadosAlunos = Arrays.asList(
                new String[]{"Mariana Silva", "Ciência da Computação", "2023-08-01", "mariana@gmail.com"},
                new String[]{"Pedro Martins", "Letras", "2025-08-01", "pedro@gmail.com"},
                new String[]{"Ana Costa", "Engenharia Civil", "2024-08-01", "ana@gmail.com"},
                new String[]{"Beatriz Marins", "Engenharia de Software", "2022-08-01", "beatriz@gmail.com"},
                new String[]{"Carlos Eduardo", "Sistemas de Informação", "2023-08-01", "carlos@gmail.com"},
                new String[]{"Fernanda Lima", "Design Gráfico", "2025-08-01", "fernanda@gmail.com"},
                new String[]{"Gabriel Souza", "Administração", "2024-08-01", "gabriel@gmail.com"},
                new String[]{"Juliana Rocha", "Arquitetura", "2022-08-01", "juliana@gmail.com"},
                new String[]{"Rafael Dias", "Medicina", "2023-08-01", "rafael@gmail.com"},
                new String[]{"Sofia Fernandes", "Direito", "2025-08-01", "sofia@gmail.com"},
                new String[]{"Lucas Lima", "Engenharia Elétrica", "2024-08-01", "lucas@gmail.com"},
                new String[]{"Marcos Vinicius", "Ciência da Computação", "2023-08-01", "marcos@gmail.com"},
                new String[]{"Marina Silva", "Ciência da Computação", "2023-08-01", "marina@gmail.com"},
                new String[]{"Everton Martins", "Letras", "2025-08-01", "everton@gmail.com"},
                new String[]{"Severino Costa", "Engenharia Civil", "2024-08-01", "severino@gmail.com"}
            );
            for (String[] dado : dadosAlunos) {
                Aluno novoAluno = new Aluno(
                    dado[0],
                    dado[1],
                    dado[3],
                    LocalDate.parse(dado[2])
                );
                Aluno alunoCriado = alunoRepository.save(novoAluno);
                controle++;
            }

            System.out.println("\n>>>>>>>>>>>>> " + controle + " alunos de " + dadosAlunos.size() + " criados com sucesso");
            controle = 0;

            System.out.println("\n>>> PROFESSORES");
            System.out.println(">>>>>>>>>>>>> Criando professor");
            List<String[]> dadosProfessores = Arrays.asList(
                new String[]{"Lucas Pereira", "lucas@gmail.com", "Inteligência Artificial"},
                new String[]{"Sara Oliveira", "sara@gmail.com", "Programação de Computadores"},
                new String[]{"Rafael Almeida", "rafael@gmail.com", "Banco de Dados"}
            );
            for (String[] dado : dadosProfessores) {
                Professor novoProfessor = new Professor(
                    dado[0],
                    dado[1],
                    dado[2]
                );
                Professor professorCriado = professorRepository.save(novoProfessor);
                controle++;
            }

            System.out.println("\n>>>>>>>>>>>>> " + controle + " professores de " + dadosProfessores.size() + " criados com sucesso");
            controle = 0;

            System.out.println("\n>>> DISCIPLINAS");
            System.out.println(">>>>>>>>>>>>> Criando disciplina");
            List<String[]> dadosDisciplinas = Arrays.asList(
                new String[]{"Matemática", "32"},
                new String[]{"Programação", "64"},
                new String[]{"Banco de Dados", "64"}
            );
            for (String[] dado : dadosDisciplinas) {
                Disciplina novaDisciplina = new Disciplina(
                    dado[0],
                    Integer.parseInt(dado[1])
                );
                Disciplina disciplinaCriada = disciplinaRepository.save(novaDisciplina);
                controle++;
            }

            System.out.println("\n>>>>>>>>>>>>> " + controle + " disciplinas de " + dadosDisciplinas.size() + " criadas com sucesso");
            controle = 0;

            System.out.println("\n>>> TURMAS");
            System.out.println(">>>>>>>>>>>>> Criando turma");
            List<String[]> dadosTurmas = Arrays.asList(
                new String[]{"2022", "1", "1", "3", "A030"},
                new String[]{"2022", "1", "2", "3", "A031"},
                new String[]{"2023", "1", "1", "2", "B020"},
                new String[]{"2023", "2", "3", "2", "B021"},
                new String[]{"2023", "2", "2", "1", "C010"},
                new String[]{"2024", "1", "1", "1", "C011"}
            );
            for (String[] dadosTurma : dadosTurmas) {
                Turma novaTurma = new Turma(
                    dadosTurma[4],
                    Integer.parseInt(dadosTurma[0]),
                    Integer.parseInt(dadosTurma[1]),
                    professorRepository.findById(Long.parseLong(dadosTurma[2])).orElse(null),
                    disciplinaRepository.findById(Long.parseLong(dadosTurma[3])).orElse(null)
                );
                Turma turmaCriada = turmaRepository.save(novaTurma);
                controle++;
            }

            System.out.println("\n>>>>>>>>>>>>> " + controle + " turmas de " + dadosTurmas.size() + " criadas com sucesso");
            controle = 0;

            System.out.println("\n>>> INSCRIÇÕES");
            System.out.println(">>>>>>>>>>>>> Criando inscrição");
            List<String[]> dadosInscricoes = Arrays.asList(
                new String[]{"1", "A030", "2025-09-01"},
                new String[]{"1", "B020", "2025-09-02"},
                new String[]{"2", "A031", "2025-09-03"},
                new String[]{"2", "C011", "2025-09-03"},
                new String[]{"3", "A030", "2025-09-04"},
                new String[]{"3", "B021", "2025-09-05"},
                new String[]{"4", "B020", "2025-09-06"},
                new String[]{"5", "A031", "2025-09-07"},
                new String[]{"6", "A030", "2025-09-08"},
                new String[]{"6", "C011", "2025-09-08"},
                new String[]{"7", "A030", "2025-09-09"},
                new String[]{"7", "A031", "2025-09-09"},
                new String[]{"8", "A030", "2025-09-10"},
                new String[]{"9", "A030", "2025-09-11"},
                new String[]{"9", "A031", "2025-09-11"},
                new String[]{"9", "C010", "2025-09-03"},
                new String[]{"10", "A030", "2025-09-12"},
                new String[]{"10", "C010", "2025-09-12"}
            );
            for (String[] dadosInscricao : dadosInscricoes) {
                Inscricao novaInscricao = new Inscricao(
                    LocalDate.parse(dadosInscricao[2]),
                    alunoRepository.findById(Long.parseLong(dadosInscricao[0])).orElse(null),
                    turmaRepository.findById(dadosInscricao[1]).orElse(null)
                );
                Inscricao inscricaoCriada = inscricaoRepository.save(novaInscricao);
                controle++;
            }
            System.out.println("\n>>>>>>>>>>>>> " + controle + " inscrições de " + dadosInscricoes.size() + " criadas com sucesso");
            controle = 0;

            

        } catch (Exception e) {
            System.out.println("\n>>>>>>>>>>>>> Ocorreu um erro durante o teste");
            System.out.println("Causa: " + e.getMessage());
        }

        System.out.println("\n\n\n======================================================");
        System.out.println("||             SCRIPT DE TESTE FINALIZADO           ||");
        System.out.println("======================================================");
    }
}