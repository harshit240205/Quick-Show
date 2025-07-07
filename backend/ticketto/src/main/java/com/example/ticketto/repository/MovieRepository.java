package com.example.ticketto.repository;

import com.example.ticketto.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {
} 