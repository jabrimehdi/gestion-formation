package com.GestionDeFormaition.serviceImplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.GestionDeFormaition.model.Role;
import com.GestionDeFormaition.repository.RoleRepository;
import com.GestionDeFormaition.service.RoleService;

@Service
public class RoleServiceImplementation implements RoleService{

	@Autowired
	private RoleRepository roleRepository;
	
	@Override
	public Role addRole(Role role) {
		return roleRepository.save(role);
	}

	@Override
	public void deleteRoleByID(int id) {
		roleRepository.deleteById(id);
	}

	@Override
	public Role upDateRole(Role role) {
		return roleRepository.saveAndFlush(role);
	}

	@Override
	public List<Role> findAllRole() {
		return roleRepository.findAll();
	}

	@Override
	public Role findRoleById(int id) {
		return roleRepository.getOne(id);
	}

}
