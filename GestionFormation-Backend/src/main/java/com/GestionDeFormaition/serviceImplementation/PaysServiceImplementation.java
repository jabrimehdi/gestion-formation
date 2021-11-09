package com.GestionDeFormaition.serviceImplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GestionDeFormaition.model.Pays;
import com.GestionDeFormaition.repository.PaysRepository;
import com.GestionDeFormaition.service.PaysService;

@Service
public class PaysServiceImplementation implements PaysService{

	@Autowired
	private PaysRepository paysRepository;
	
	
	@Override
	public List<Pays> findAllPays() {
		return paysRepository.findAll();
	}

	@Override
	public Pays addPays(Pays pays) {
		return paysRepository.save(pays);
	}

	@Override
	public void deletePaysById(int id) {
		paysRepository.deleteById(id);
	}

	@Override
	public Pays updatePays(Pays pays) {
		return paysRepository.saveAndFlush(pays);
	}

	@Override
	public Pays findPaysById(int id) {
		return paysRepository.getOne(id);
	}

}
