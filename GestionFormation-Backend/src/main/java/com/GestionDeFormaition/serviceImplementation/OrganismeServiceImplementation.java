package com.GestionDeFormaition.serviceImplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GestionDeFormaition.model.Organisme;
import com.GestionDeFormaition.repository.OrganismeRepository;
import com.GestionDeFormaition.service.OrganismeService;

@Service
public class OrganismeServiceImplementation implements OrganismeService{

	@Autowired
	private OrganismeRepository organismeRepostory;
	
	@Override
	public List<Organisme> findAllOrganisme() {
		return organismeRepostory.findAll();
	}

	@Override
	public Organisme addOrganisme(Organisme organisme) {
		return organismeRepostory.save(organisme);
	}

	@Override
	public void deleteOrganismeById(int id) {
		organismeRepostory.deleteById(id);
	}

	@Override
	public Organisme updateOrganisme(Organisme organisme) {
		return organismeRepostory.saveAndFlush(organisme);
	}

	@Override
	public Organisme findOrganismeById(int id) {
		return organismeRepostory.getOne(id);
	}

}
