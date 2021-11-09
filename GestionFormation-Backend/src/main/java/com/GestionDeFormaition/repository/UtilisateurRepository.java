package com.GestionDeFormaition.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.GestionDeFormaition.model.Utilisateur;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer>{
	Utilisateur findByLogin(String login);
}
