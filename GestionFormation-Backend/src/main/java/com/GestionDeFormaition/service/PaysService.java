package com.GestionDeFormaition.service;

import java.util.List;

import com.GestionDeFormaition.model.Pays;

public interface PaysService {

	List<Pays> findAllPays();
	Pays addPays(Pays pays);
	void deletePaysById(int id);
	Pays updatePays(Pays pays);
	Pays findPaysById(int id);
}
