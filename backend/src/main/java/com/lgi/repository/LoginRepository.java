package com.lgi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lgi.model.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login, String> {
	java.util.Optional<Login> findByEmail(String email);
}
