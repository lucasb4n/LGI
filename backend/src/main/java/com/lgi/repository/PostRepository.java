package com.lgi.repository;

import com.lgi.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByOrderByCreatedAtDesc();
    List<Post> findByUserDocumentoOrderByCreatedAtDesc(String userDocumento);
}
