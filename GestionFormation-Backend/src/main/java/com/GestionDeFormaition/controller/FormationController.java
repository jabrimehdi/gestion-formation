package com.GestionDeFormaition.controller;

import java.util.Collection;
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

import com.GestionDeFormaition.model.Formation;
import com.GestionDeFormaition.service.FormationService;
import com.GestionDeFormaition.model.SessionDeFormation;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/formation")
public class FormationController {

	@Autowired
	private FormationService formationService;

	@PreAuthorize("hasRole('user')")
	@PostMapping("/add")
	public ResponseEntity<Formation> addFormation(@Validated @RequestBody Formation formation) {
		Formation formation1 = formationService.addFormation(formation);
		if (formation1 == null)
			return new ResponseEntity<Formation>(formation, HttpStatus.CONFLICT);
		return new ResponseEntity<Formation>(formation1, HttpStatus.OK);
	}

	@PreAuthorize("hasRole('user') or hasRole('directeur')" )
	@GetMapping("/all")
	public ResponseEntity<List<Formation>> allFormation() {
		return new ResponseEntity<List<Formation>>(formationService.getAllFormation(), HttpStatus.OK);
	}

	@PreAuthorize("hasRole('user')")
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Formation> deleteFormation(@PathVariable("id") long id) {
		formationService.deleteFormationById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PreAuthorize("hasRole('user')")
	@PutMapping("/update")
	public ResponseEntity<Formation> updateFormation(@Validated @RequestBody Formation formation) {
		Formation formation1 = formationService.updateFormation(formation);
		if (formation1 == null)
			return new ResponseEntity<Formation>(formation, HttpStatus.CONFLICT);
		return new ResponseEntity<Formation>(formation1, HttpStatus.OK);
	}

	@PreAuthorize("hasRole('user') or hasRole('directeur')")
	@GetMapping("/{id}/sessions")
	public ResponseEntity<Collection<SessionDeFormation>> getSessionsDeFormationByFormationId(
			@PathVariable("id") long id) {
		return new ResponseEntity<Collection<SessionDeFormation>>(
				formationService.getSessionDeFormationsByFormationId(id), HttpStatus.OK);
	}
}
