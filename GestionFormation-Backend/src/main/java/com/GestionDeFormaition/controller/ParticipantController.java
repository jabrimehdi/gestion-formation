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


import com.GestionDeFormaition.model.Participant;
import com.GestionDeFormaition.model.SessionDeFormation;
import com.GestionDeFormaition.service.ParticipantService;

@RestController
@RequestMapping("/api/participant")
public class ParticipantController {

	@Autowired
	private ParticipantService participantService;
	
	@PreAuthorize("hasRole('user')")
	@CrossOrigin(origins = "*")
	@PostMapping("/add")
	public ResponseEntity<Participant> addParticipant(@Validated @RequestBody Participant participant) {
		Participant participant1 = participantService.addParticipant(participant);
		if (participant1 == null) return new ResponseEntity<>(participant, HttpStatus.CONFLICT);
		return new ResponseEntity<>(participant1, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('user')")
	@GetMapping("/all")
	@CrossOrigin(origins = "*")
    public ResponseEntity<List<Participant>> allParticipant()
    {
        return new ResponseEntity<>(participantService.findAllParticipants(),HttpStatus.OK);
    }
	
	@PreAuthorize("hasRole('user')")
	@CrossOrigin(origins = "*")
	@DeleteMapping("/delete/{id}")
    public ResponseEntity<Participant> deleteParticipant(@PathVariable("id") int id)
    {
		participantService.deleteParticipantById(id);
        return new ResponseEntity<>( HttpStatus.OK);
    }
	
	@PreAuthorize("hasRole('user')")
	@CrossOrigin(origins = "*")
	@PutMapping("/update")
    public ResponseEntity<Participant> updateParticipant(@Validated @RequestBody Participant participant)
    {
		Participant participant1 = participantService.updateParticipant(participant);
		if (participant1 == null) return new ResponseEntity<>(participant, HttpStatus.CONFLICT);
		return new ResponseEntity<>(participant1, HttpStatus.OK);
    }

	@PreAuthorize("hasRole('user')")
	@CrossOrigin(origins = "*")
	@GetMapping("/{id}/sessions")
	public ResponseEntity<Collection<SessionDeFormation>> getSessionsByParticipantId(
			@PathVariable("id") int id) {
		return new ResponseEntity<Collection<SessionDeFormation>>(
				participantService.findSessionsByParticipantId(id), HttpStatus.OK);
	}
}
