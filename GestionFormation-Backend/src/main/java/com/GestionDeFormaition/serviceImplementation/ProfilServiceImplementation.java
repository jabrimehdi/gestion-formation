package com.GestionDeFormaition.serviceImplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.GestionDeFormaition.model.Profil;
import com.GestionDeFormaition.repository.ProfilRepository;
import com.GestionDeFormaition.service.ProfilService;

@Service
public class ProfilServiceImplementation implements ProfilService{
	
	@Autowired
	private ProfilRepository profilRepository;

	@Override
	public List<Profil> findAllProfil() {
		return profilRepository.findAll();
	}

	@Override
	public Profil addProfil(Profil profil) {
		return profilRepository.save(profil);
	}

	@Override
	public void deleteProfilById(int id) {
		profilRepository.deleteById(id);
	}

	@Override
	public Profil updateProfil(Profil profil) {
		return profilRepository.saveAndFlush(profil);
	}

	@Override
	public Profil findProfilById(int id) {
		return profilRepository.getOne(id);
	}

}
