package com.GestionDeFormaition.service;

import java.util.List;

import com.GestionDeFormaition.model.Domaine;

public interface DomaineService {
	
	List<Domaine> findAllDomaine();
	Domaine addDomaine(Domaine domaine);
	void deleteDomaineById(int id);
	Domaine updateDomaine(Domaine domaine);
	Domaine findDomaineById(int id);

}
