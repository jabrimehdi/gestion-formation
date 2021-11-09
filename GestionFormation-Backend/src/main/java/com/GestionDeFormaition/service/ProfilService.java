package com.GestionDeFormaition.service;

import java.util.List;

import com.GestionDeFormaition.model.Profil;

public interface ProfilService {

	List<Profil> findAllProfil();
	Profil addProfil(Profil profil);
	void deleteProfilById(int id);
	Profil updateProfil(Profil profil);
	Profil findProfilById(int id);
}
