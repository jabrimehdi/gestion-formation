package com.GestionDeFormaition.service;

import java.util.List;

import com.GestionDeFormaition.model.Role;


public interface RoleService {

	Role addRole(Role role);
	void deleteRoleByID(int id);
	Role upDateRole(Role role);
	List <Role> findAllRole();
	Role findRoleById(int id);
}
