package com.GestionDeFormaition.service;

import java.util.List;
import com.GestionDeFormaition.model.SessionDeFormation;

public interface SessionDeFormationService {
	SessionDeFormation addSessionDeFormation(SessionDeFormation sessionDeFormation);
	void deleteSessionDeFormationByID(long id);
	SessionDeFormation upDateSessionDeFormation(SessionDeFormation sessionDeFormation);
	List <SessionDeFormation> findAllSessionDeFormation();
	SessionDeFormation findSessionDeFormationById(long id);
}
