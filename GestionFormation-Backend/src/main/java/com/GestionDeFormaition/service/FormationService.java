package com.GestionDeFormaition.service;

import java.util.Collection;
import java.util.List;

import com.GestionDeFormaition.model.Formation;
import com.GestionDeFormaition.model.SessionDeFormation;

public interface FormationService {

	List<Formation> getAllFormation();
	Formation addFormation(Formation formation);
	void deleteFormationById(long id);
	Formation updateFormation(Formation formation);
	Formation findFormationById(long id);
	Collection<SessionDeFormation> getSessionDeFormationsByFormationId(long id);
}
