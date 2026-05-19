package com.lgi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "post_likes", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"post_id", "user_documento"})
})
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "post_id")
    private Long postId;

    @Column(name = "user_documento")
    private String userDocumento;

    public Like() {}

    public Like(Long postId, String userDocumento) {
        this.postId = postId;
        this.userDocumento = userDocumento;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getPostId() { return postId; }
    public void setPostId(Long postId) { this.postId = postId; }

    public String getUserDocumento() { return userDocumento; }
    public void setUserDocumento(String userDocumento) { this.userDocumento = userDocumento; }
}
