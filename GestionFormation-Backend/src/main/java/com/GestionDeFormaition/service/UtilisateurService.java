package com.GestionDeFormaition.service;

import java.util.List;
import com.GestionDeFormaition.model.Utilisateur;




public interface UtilisateurService {
	
	Utilisateur addUtilisateur(Utilisateur utilisateur);
	void deleteUtilisateurByID(int id);
	Utilisateur upDateUtilisateur(Utilisateur utilisateur);
	List <Utilisateur> findAllUtilisateurs();
	Utilisateur findUtilisateurById(int id);
	Utilisateur findUtilisateurByLogin(String login);

}
