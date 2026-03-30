package com.lgi.controller;

import java.net.URI;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RootController {

    @GetMapping("/")
    public ResponseEntity<?> rootRedirect(){
        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("http://localhost:3000")).build();
    }

}
