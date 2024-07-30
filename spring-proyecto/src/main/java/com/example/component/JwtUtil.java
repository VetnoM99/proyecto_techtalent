package com.example.component;


import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


@Component
public class JwtUtil {

    private final String SECRET_KEY = "proyecto!."; // Cambia esta clave a una clave segura y mantenla privada

    public String generateToken(String username) {
        String token = Jwts.builder()
                .setClaims(Jwts.claims().setSubject(username))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hora de expiración
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
        System.out.println("Generated Token: " + token);
        return token;
    }

    public String generateRefreshToken(String username) {
        String refreshToken = Jwts.builder()
                .setClaims(Jwts.claims().setSubject(username))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7)) // 7 días de expiración
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
        System.out.println("Generated Refresh Token: " + refreshToken);
        return refreshToken;
    }


    public Claims extractClaims(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
        System.out.println("Extracted Claims: " + claims);
        return claims;
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    public boolean validateToken(String token, String username) {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    }
}
