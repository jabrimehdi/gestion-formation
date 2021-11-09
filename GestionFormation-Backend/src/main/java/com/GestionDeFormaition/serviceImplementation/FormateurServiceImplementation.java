package com.GestionDeFormaition.serviceImplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GestionDeFormaition.model.Formateur;
import com.GestionDeFormaition.repository.FormateurRepository;
import com.GestionDeFormaition.service.FormateurService;

@Service
public class FormateurServiceImplementation implements FormateurService {

	@Autowired
	private FormateurRepository formateurRepository;
	
	@Override
	public List<Formateur> getAllFormateur() {
		return formateurRepository.findAll();
	}

	@Override
	public Formateur addFormateur(Formateur formateur) {
		return formateurRepository.save(formateur);
	}

	@Override
	public void deleteFormateurById(int id) {
		formateurRepository.deleteById(id);
	}

	@Override
	public Formateur updateFormateur(Formateur formateur) {
		return formateurRepository.saveAndFlush(formateur);
	}

	@Override
	public Formateur findFormateurById(int id) {
		return formateurRepository.getOne(id);
	}

}
