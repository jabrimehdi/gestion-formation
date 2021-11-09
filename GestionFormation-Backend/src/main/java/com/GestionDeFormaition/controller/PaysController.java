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
import com.GestionDeFormaition.model.Pays;
import com.GestionDeFormaition.service.PaysService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/pays")
public class PaysController {

	@Autowired
	private PaysService paysService;
	
	@PreAuthorize("hasRole('admin')")
	@PostMapping("/add")
	public ResponseEntity<Pays> addPays(@Validated @RequestBody Pays pays) {
		Pays pays1 = paysService.addPays(pays);
		if (pays1 == null) return new ResponseEntity<>(pays, HttpStatus.CONFLICT);
		return new ResponseEntity<>(pays1, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('admin') or hasRole('user')")
	@GetMapping("/all")
    public ResponseEntity<List<Pays>> allPays()
    {
        return new ResponseEntity<>(paysService.findAllPays(),HttpStatus.OK);
    }
	
	@PreAuthorize("hasRole('admin')")
	@DeleteMapping("/delete/{id}")
    public ResponseEntity<Pays> deletePays(@PathVariable("id") int id)
    {
    	paysService.deletePaysById(id);
        return new ResponseEntity<>( HttpStatus.OK);
    }
	
	@PreAuthorize("hasRole('admin')")
	@PutMapping("/update")
    public ResponseEntity<Pays> updateRole(@Validated @RequestBody Pays pays )
    {
		Pays pays1 = paysService.updatePays(pays);   	
        if(pays1 == null) new ResponseEntity<>(pays,HttpStatus.CONFLICT);      
		return new ResponseEntity<>(pays1, HttpStatus.OK);
    }
	
	
}
