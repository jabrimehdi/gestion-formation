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

import com.GestionDeFormaition.model.Domaine;
import com.GestionDeFormaition.service.DomaineService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/domaine")
public class DomaineController {
	
	@Autowired
	private DomaineService domaineService;
	
	@PreAuthorize("hasRole('admin')")
	@PostMapping("/add")
	public ResponseEntity<Domaine> addDomaine(@Validated @RequestBody Domaine domaine) {
		Domaine domaine1 = domaineService.addDomaine(domaine);
		if (domaine1 == null) return new ResponseEntity<>(domaine, HttpStatus.CONFLICT);
		return new ResponseEntity<>(domaine1, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('admin') or hasRole('user')")
	@GetMapping("/all")
    public ResponseEntity<List<Domaine>> allDomaine()
    {
        return new ResponseEntity<>(domaineService.findAllDomaine(),HttpStatus.OK);
    }
	
	@PreAuthorize("hasRole('admin')")
	@DeleteMapping("/delete/{id}")
    public ResponseEntity<Domaine> deleteDomaine(@PathVariable("id") int id)
    {
		domaineService.deleteDomaineById(id);
        return new ResponseEntity<>( HttpStatus.OK);
    }
	
	@PreAuthorize("hasRole('admin')")
	@PutMapping("/update")
    public ResponseEntity<Domaine> updateDomaine(@Validated @RequestBody Domaine domaine )
    {
		Domaine domaine1 = domaineService.updateDomaine(domaine);
		if (domaine1 == null) return new ResponseEntity<>(domaine, HttpStatus.CONFLICT);
		return new ResponseEntity<>(domaine1, HttpStatus.OK);
    }
	

}
