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


import com.GestionDeFormaition.model.Organisme;
import com.GestionDeFormaition.service.OrganismeService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/organisme")
public class OrganismeController {
	
	@Autowired
	private OrganismeService organismeService;
	
	@PreAuthorize("hasRole('admin')")
	@PostMapping("/add")
	public ResponseEntity<Organisme> addOrganisme(@Validated @RequestBody Organisme organisme) {
		Organisme organisme1 = organismeService.addOrganisme(organisme);
		if (organisme1 == null) return new ResponseEntity<>(organisme, HttpStatus.CONFLICT);
		return new ResponseEntity<>(organisme1, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('admin') or hasRole('user')")
	@GetMapping("/all")
    public ResponseEntity<List<Organisme>> allOrganisme()
    {
        return new ResponseEntity<>(organismeService.findAllOrganisme(),HttpStatus.OK);
    }
	
	@PreAuthorize("hasRole('admin')")
	@DeleteMapping("/delete/{id}")
    public ResponseEntity<Organisme> deleteOrganisme(@PathVariable("id") int id)
    {
		organismeService.deleteOrganismeById(id);
        return new ResponseEntity<>( HttpStatus.OK);
    }
	
	@PreAuthorize("hasRole('admin') ")
	@PutMapping("/update")
    public ResponseEntity<Organisme> updateOrganisme(@Validated @RequestBody Organisme organisme)
    {
		Organisme organisme1 = organismeService.updateOrganisme(organisme);
		if (organisme1 == null) return new ResponseEntity<>(organisme1, HttpStatus.CONFLICT);
		return new ResponseEntity<>(organisme1, HttpStatus.OK);
    }

}
