package com.beapiedade.security.config;
import com.beapiedade.security.filter.JwtAuthenticationFilter;
import com.beapiedade.security.service.UsuarioDetailsService;
import com.beapiedade.security.util.Role;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@AllArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UsuarioDetailsService usuarioDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));

        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        System.out.println("***************** Executou o método securityFilterChain de SecurityFilterChain");
        httpSecurity
            .sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .csrf(c -> c.disable())
            .cors(c -> c.configurationSource(corsConfigurationSource()))

            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(HttpMethod.GET, "/api/aluno/**").hasAnyRole(Role.USER.name(), Role.ADMIN.name())
                .requestMatchers(HttpMethod.PUT, "/api/aluno/**").hasRole(Role.ADMIN.name())
                .requestMatchers(HttpMethod.DELETE, "/api/aluno/**").hasRole(Role.ADMIN.name())
                .requestMatchers(HttpMethod.POST, "/api/aluno/**").hasRole(Role.ADMIN.name())

                .requestMatchers(HttpMethod.GET, "/api/turma/**").hasAnyRole(Role.USER.name(), Role.ADMIN.name())
                .requestMatchers(HttpMethod.GET, "/api/disciplina/**").hasAnyRole(Role.USER.name(), Role.ADMIN.name())
                .requestMatchers(HttpMethod.GET, "/api/inscricao/**").hasAnyRole(Role.USER.name(), Role.ADMIN.name())
                .requestMatchers(HttpMethod.GET, "/api/professor/**").hasAnyRole(Role.USER.name(), Role.ADMIN.name())
                
                .requestMatchers(HttpMethod.GET, "/api/usuario/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/usuario/public").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/usuario/admin").hasRole(Role.ADMIN.name())
                .requestMatchers(HttpMethod.POST, "/api/usuario/user").hasRole(Role.ADMIN.name())
                .requestMatchers(HttpMethod.POST, "/api/usuario/**").hasRole(Role.ADMIN.name())
                .requestMatchers(HttpMethod.POST, "/api/autenticacao/login").permitAll()
                
                .anyRequest().authenticated())
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling(c -> {
                c.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));
                c.accessDeniedHandler((request, response, accessDeniedException) -> {response.setStatus(HttpStatus.FORBIDDEN.value());});
            });

        return httpSecurity.build(); 
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        System.out.println("1. ***** Executou o método passwordEncoder()");
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        System.out.println("3. ***** Executou authenticationProvider()");
        var provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(usuarioDetailsService);
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
        throws Exception {
        System.out.println("2. ***** Executou authenticationManager()");
        return config.getAuthenticationManager();
    }

}