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

import com.GestionDeFormaition.model.SessionDeFormation;
import com.GestionDeFormaition.service.SessionDeFormationService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/sessionDeFormation")
public class SessionDeFormationController {

	@Autowired
	private SessionDeFormationService sessionDeFormationService;
	
	@PreAuthorize("hasRole('user')")
	@PostMapping("/add")
	public ResponseEntity<SessionDeFormation> addSessionDeFormation(@Validated @RequestBody SessionDeFormation sessionDeFormation) {
		SessionDeFormation sessionDeFormation1 = sessionDeFormationService.addSessionDeFormation(sessionDeFormation);
		if(sessionDeFormation1 == null) new ResponseEntity<>(sessionDeFormation, HttpStatus.CONFLICT);
		return new ResponseEntity<>(sessionDeFormation1, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('user')")
	@GetMapping("/all")
    public ResponseEntity<List<SessionDeFormation>> allSessionDeFormations()
    {
        return new ResponseEntity<>(sessionDeFormationService.findAllSessionDeFormation(),HttpStatus.OK);
    }
	
	@PreAuthorize("hasRole('user')")
	@DeleteMapping("/delete/{id}")
    public ResponseEntity<SessionDeFormation> deleteSessionDeFormation(@PathVariable("id") long id)
    {
		sessionDeFormationService.deleteSessionDeFormationByID(id);
        return new ResponseEntity<>( HttpStatus.OK);
    }
	
	@PreAuthorize("hasRole('user')")
	@PutMapping("/update")
    public ResponseEntity<SessionDeFormation> updateSessionDeFormation(@Validated @RequestBody SessionDeFormation sessionDeFormation )
    {
		SessionDeFormation sessionDeFormation1 = sessionDeFormationService.upDateSessionDeFormation(sessionDeFormation);
		if(sessionDeFormation1 == null) new ResponseEntity<>(sessionDeFormation, HttpStatus.CONFLICT);
		return new ResponseEntity<>(sessionDeFormation1, HttpStatus.OK);
    }
	
}
