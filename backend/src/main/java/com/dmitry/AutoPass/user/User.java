package com.dmitry.AutoPass.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "users", schema = "auth", uniqueConstraints = @UniqueConstraint(columnNames = "username"))
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String passwordHash;

    private boolean enabled = true;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", schema = "auth", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    private Set<String> roles;

    public Set<SimpleGrantedAuthority> toAuthorities() {
        return roles == null ? Set.of() : roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toSet());
    }
}
