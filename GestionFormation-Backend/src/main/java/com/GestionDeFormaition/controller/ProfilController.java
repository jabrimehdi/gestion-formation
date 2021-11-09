package com.GestionDeFormaition.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.GestionDeFormaition.model.Profil;
import com.GestionDeFormaition.service.ProfilService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/profil")
public class ProfilController {

	@Autowired
	private ProfilService profilService;
	
	@PreAuthorize("hasRole('admin')")
	@PostMapping("/add")
	public ResponseEntity<Profil> addProfil(@Validated @RequestBody Profil profil) {
		Profil profil1 = profilService.addProfil(profil);
		if (profil1 == null) return new ResponseEntity<>(profil, HttpStatus.CONFLICT);
		return new ResponseEntity<>(profil1, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('admin') or hasRole('user')")
	@GetMapping("/all")
    public ResponseEntity<List<Profil>> allProfil()
    {
        return new ResponseEntity<>(profilService.findAllProfil(),HttpStatus.OK);
    }
	
	@PreAuthorize("hasRole('admin')")
	@DeleteMapping("/delete/{id}")
    public ResponseEntity<Profil> deleteProfil(@PathVariable("id") int id)
    {
		profilService.deleteProfilById(id);
        return new ResponseEntity<>( HttpStatus.OK);
    }
	
	@PreAuthorize("hasRole('admin')")
	@PutMapping("/update")
    public ResponseEntity<Profil> updateProfil(@Validated @RequestBody Profil profil )
    {
		Profil profil1 = profilService.updateProfil(profil);
        if(profil1 == null) new ResponseEntity<>(profil,HttpStatus.CONFLICT);      
		return new ResponseEntity<>(profil1, HttpStatus.OK);
    }
}
