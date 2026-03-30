package com.lgi.controller;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.net.URI;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lgi.model.Login;
import com.lgi.repository.LoginRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final LoginRepository loginRepository;

    public AuthController(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    @GetMapping("/user/{documento}")
    public ResponseEntity<?> getUser(@PathVariable String documento){
        var opt = loginRepository.findById(documento);
        if(opt.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        Login l = opt.get();
        java.util.Map<String,Object> resp = new java.util.HashMap<>();
        resp.put("documento", l.getDocumento());
        resp.put("nome", l.getNome());
        resp.put("email", l.getEmail());
        if(l.getDescricao() != null){
            resp.put("descricao", l.getDescricao());
        }
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body){
        String cred = body.getOrDefault("credenciais", "").trim();
        String senha = body.getOrDefault("senha", "");

        if(cred.isEmpty() || senha.isEmpty()){
            return ResponseEntity.badRequest().body(Map.of("error", "Credenciais e senha são obrigatórias"));
        }

        // busca por documento (PK) ou por email
        java.util.Optional<com.lgi.model.Login> opt = loginRepository.findById(cred);
        if(opt.isEmpty()){
            opt = loginRepository.findByEmail(cred);
        }

        if(opt.isEmpty()){
            return ResponseEntity.status(401).body(Map.of("error", "Credenciais ou Senha estão incorretas"));
        }

        com.lgi.model.Login saved = opt.get();
        // comparação simples de senha (atenção: em produção use hashing)
        if(!senha.equals(saved.getSenha())){
            return ResponseEntity.status(401).body(Map.of("error", "Credenciais ou Senha estão incorretas"));
        }

        return ResponseEntity.ok(Map.of("message", "Autenticado", "documento", saved.getDocumento()));
    }

    @GetMapping("/")
    public ResponseEntity<?> rootRedirect(){
        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("http://localhost:3000")).build();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body){
        // Validação básica
        String documento = body.getOrDefault("documento", "").trim();
        String nome = body.getOrDefault("nome", "").trim();
        String data = body.getOrDefault("dataNasc", "").trim();
        String email = body.getOrDefault("email", "").trim();
        String senha = body.getOrDefault("senha", "");

        if(documento.isEmpty()){
            return ResponseEntity.badRequest().body(Map.of("error", "Campo 'documento' é obrigatório"));
        }
        if(nome.isEmpty()){
            return ResponseEntity.badRequest().body(Map.of("error", "Campo 'nome' é obrigatório"));
        }
        if(data.isEmpty()){
            return ResponseEntity.badRequest().body(Map.of("error", "Campo 'dataNasc' é obrigatório"));
        }
        if(email.isEmpty()){
            return ResponseEntity.badRequest().body(Map.of("error", "Campo 'email' é obrigatório"));
        }
        if(senha.isEmpty()){
            return ResponseEntity.badRequest().body(Map.of("error", "Campo 'senha' é obrigatório"));
        }

        try {
            Login l = new Login();
            l.setDocumento(documento);
            l.setNome(nome);
            try{
                l.setDataNasc(LocalDate.parse(data));
            }catch(Exception ex){
                return ResponseEntity.badRequest().body(Map.of("error", "Formato de data inválido. Use YYYY-MM-DD"));
            }
            l.setEmail(email);
            l.setSenha(senha);

            // Verifica se já existe (documento é PK)
            if(loginRepository.existsById(documento)){
                return ResponseEntity.status(409).body(Map.of("error", "Documento já cadastrado"));
            }

            Login saved = loginRepository.save(l);
            return ResponseEntity.ok(Map.of("message", "Cadastro salvo", "documento", saved.getDocumento()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/user/{documento}")
    public ResponseEntity<?> updateUser(@PathVariable String documento, @RequestBody Map<String,String> body){
        var opt = loginRepository.findById(documento);
        if(opt.isEmpty()) return ResponseEntity.notFound().build();
        Login l = opt.get();
        String nome = body.get("nome");
        String descricao = body.get("descricao");
        if(nome != null) l.setNome(nome);
        if(descricao != null) l.setDescricao(descricao);
        Login saved = loginRepository.save(l);
        java.util.Map<String,Object> resp = new java.util.HashMap<>();
        resp.put("documento", saved.getDocumento());
        resp.put("nome", saved.getNome());
        resp.put("email", saved.getEmail());
        if(saved.getDescricao()!=null) resp.put("descricao", saved.getDescricao());
        return ResponseEntity.ok(resp);
    }
}
