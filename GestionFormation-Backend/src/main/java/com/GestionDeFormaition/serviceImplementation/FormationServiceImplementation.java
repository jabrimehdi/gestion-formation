package com.GestionDeFormaition.serviceImplementation;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GestionDeFormaition.model.Formation;
import com.GestionDeFormaition.model.SessionDeFormation;
import com.GestionDeFormaition.repository.FormationRepository;
import com.GestionDeFormaition.service.FormationService;

@Service
public class FormationServiceImplementation implements FormationService{
	
	@Autowired
	private FormationRepository formationRepository;

	@Override
	public List<Formation> getAllFormation() {
		return formationRepository.findAll();
	}

	@Override
	public Formation addFormation(Formation formation) {
		return formationRepository.save(formation);
	}

	@Override
	public void deleteFormationById(long id) {
		formationRepository.deleteById(id);
	}

	@Override
	public Formation updateFormation(Formation formation) {
		return formationRepository.saveAndFlush(formation);
	}

	@Override
	public Formation findFormationById(long id) {
		return formationRepository.findById(id).get();
	}

	@Override
	public Collection<SessionDeFormation> getSessionDeFormationsByFormationId(long id){
		Formation formation = findFormationById(id);
		return formation.getSessionsDeFormations();
	}

}
