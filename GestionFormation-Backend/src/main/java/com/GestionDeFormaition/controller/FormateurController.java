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

import com.GestionDeFormaition.model.Formateur;
import com.GestionDeFormaition.service.FormateurService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/formateur")
public class FormateurController {
	
	@Autowired
	private FormateurService formateurService;
	
	@PreAuthorize("hasRole('user')")
	@PostMapping("/add")
	public ResponseEntity<Formateur> addFormateur(@Validated @RequestBody Formateur formateur) {
		Formateur formateur1 = formateurService.addFormateur(formateur);
		if(formateur1 == null) return new ResponseEntity<Formateur>(formateur, HttpStatus.CONFLICT);
		return new ResponseEntity<Formateur>(formateur1, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('user') or hasRole('user')")
	@GetMapping("/all")
	public ResponseEntity<List<Formateur>> allFormateur(){
		return new ResponseEntity<List<Formateur>>(formateurService.getAllFormateur(), HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('user')")
	@DeleteMapping("/delete/{id}")
    public ResponseEntity<Formateur> deleteFormateur(@PathVariable("id") int id)
    {
		formateurService.deleteFormateurById(id);
        return new ResponseEntity<>( HttpStatus.OK);
    }
	
	@PreAuthorize("hasRole('user')")
	@PutMapping("/update")
    public ResponseEntity<Formateur> updateFormateur(@Validated @RequestBody Formateur formateur)
    {
		Formateur formateur1 = formateurService.addFormateur(formateur);
		if(formateur1 == null) return new ResponseEntity<Formateur>(formateur, HttpStatus.CONFLICT);
		return new ResponseEntity<Formateur>(formateur1, HttpStatus.OK);
    }
}
