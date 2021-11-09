package com.GestionDeFormaition.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.GestionDeFormaition.model.Role;
import com.GestionDeFormaition.service.RoleService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/role")
public class RoleController {

	@Autowired
	private RoleService roleService;
	
	@PostMapping("/add")
	public ResponseEntity<Role> addRole(@Validated @RequestBody Role role) {
		Role role1 = roleService.addRole(role);
		if(role1 == null) new ResponseEntity<>(role, HttpStatus.CONFLICT);
		return new ResponseEntity<>(role1, HttpStatus.OK);
	}
	
	@GetMapping("/all")
	@CrossOrigin(origins = "*")
    public ResponseEntity<List<Role>> allRoles()
    {
        return new ResponseEntity<>(roleService.findAllRole(),HttpStatus.OK);
    }
	
	
	@DeleteMapping("/delete/{id}")
    public ResponseEntity<Role> deleteUtilisateur(@PathVariable("id") int id)
    {
    	roleService.deleteRoleByID(id);
        return new ResponseEntity<>( HttpStatus.OK);
    }
	
	@PutMapping("/update")
    public ResponseEntity<Role> updateRole(@Validated @RequestBody Role role )
    {
		Role role1 = roleService.upDateRole(role);   	
        if(role1 == null) new ResponseEntity<>(role,HttpStatus.CONFLICT);      
		return new ResponseEntity<>(role1, HttpStatus.OK);
    }
	
}
