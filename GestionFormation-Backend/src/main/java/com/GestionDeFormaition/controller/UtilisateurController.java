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

import com.GestionDeFormaition.model.Utilisateur;
import com.GestionDeFormaition.service.UtilisateurService;


@RestController
@RequestMapping("/api/utilisateur")
public class UtilisateurController {

	@Autowired
	private UtilisateurService utilisateurService;
	@CrossOrigin(origins = "*")
	@PostMapping("/add")
	public ResponseEntity<Utilisateur> addUtilisateur(@Validated @RequestBody Utilisateur utilisateur) {
		Utilisateur utilisateur1 = utilisateurService.addUtilisateur(utilisateur);
		if(utilisateur1 == null) new ResponseEntity<>(utilisateur ,HttpStatus.CONFLICT);
        return new ResponseEntity<>(utilisateur1, HttpStatus.OK);
	}
	@CrossOrigin(origins = "*")
	@PreAuthorize("hasRole('admin')")
	@GetMapping("/all")
    public ResponseEntity<List<Utilisateur>> allUtilisateur()
    {
        return new ResponseEntity<>(utilisateurService.findAllUtilisateurs(),HttpStatus.OK);
    }
	@CrossOrigin(origins = "*")
	@DeleteMapping("/delete/{id}")
    public ResponseEntity<Utilisateur> deleteUtilisateur(@PathVariable("id") int id)
    {
    	utilisateurService.deleteUtilisateurByID(id);
        return new ResponseEntity<>( HttpStatus.OK);
        
        
    }
	@CrossOrigin(origins = "*")
	@PutMapping("/update")
    public ResponseEntity<Utilisateur> updateUtilisateur(@Validated @RequestBody Utilisateur utilisateur )
    {
		Utilisateur utilisateur1  = utilisateurService.upDateUtilisateur(utilisateur);   	
        if(utilisateur1 == null) new ResponseEntity<>(utilisateur,HttpStatus.CONFLICT);     
		return new ResponseEntity<>(utilisateur1, HttpStatus.OK);
    }
	
	@CrossOrigin(origins = "*")
	@GetMapping("/{login}")
	public ResponseEntity<Utilisateur> getUtilisateurByLogin(@PathVariable("login") String login)
	{
		return new ResponseEntity<>(utilisateurService.findUtilisateurByLogin(login),HttpStatus.OK);
	}
    
	
}
