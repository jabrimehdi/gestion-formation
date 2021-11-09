package com.GestionDeFormaition.service;

import java.util.List;

import com.GestionDeFormaition.model.Organisme;

public interface OrganismeService {
	List<Organisme> findAllOrganisme();
	Organisme addOrganisme(Organisme organisme);
	void deleteOrganismeById(int id);
	Organisme updateOrganisme(Organisme organisme);
	Organisme findOrganismeById(int id);
}
