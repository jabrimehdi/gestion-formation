package com.GestionDeFormaition.serviceImplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GestionDeFormaition.model.Domaine;
import com.GestionDeFormaition.repository.DomaineRepository;
import com.GestionDeFormaition.service.DomaineService;

@Service
public class DomaineServiceImplementation implements DomaineService{
	
	@Autowired
	private DomaineRepository domaineRepository;

	@Override
	public List<Domaine> findAllDomaine() {
		return domaineRepository.findAll();
	}

	@Override
	public Domaine addDomaine(Domaine domaine) {
		return domaineRepository.save(domaine);
	}

	@Override
	public void deleteDomaineById(int id) {
		domaineRepository.deleteById(id);
	}

	@Override
	public Domaine updateDomaine(Domaine domaine) {
		return domaineRepository.saveAndFlush(domaine);
	}

	@Override
	public Domaine findDomaineById(int id) {
		return domaineRepository.getOne(id);
	}

}
