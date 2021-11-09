package com.GestionDeFormaition.service;

import java.util.List;

import com.GestionDeFormaition.model.Formateur;

public interface FormateurService {
	
	List<Formateur> getAllFormateur();
	Formateur addFormateur(Formateur formateur);
	void deleteFormateurById(int id);
	Formateur updateFormateur(Formateur formateur);
	Formateur findFormateurById(int id);
	
}
