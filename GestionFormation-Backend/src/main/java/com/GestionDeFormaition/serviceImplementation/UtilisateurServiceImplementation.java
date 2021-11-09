package com.GestionDeFormaition.serviceImplementation;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.GestionDeFormaition.model.Utilisateur;
import com.GestionDeFormaition.repository.UtilisateurRepository;
import com.GestionDeFormaition.service.UtilisateurService;

@Service
public class UtilisateurServiceImplementation implements UtilisateurService, UserDetailsService {

	@Autowired
	private UtilisateurRepository utilisateurRepository;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Override
	public Utilisateur addUtilisateur(Utilisateur utilisateur) {
		utilisateur.setPassword(bcryptEncoder.encode(utilisateur.getPassword()));
		return utilisateurRepository.save(utilisateur);
	}

	@Override
	public void deleteUtilisateurByID(int id) {
		utilisateurRepository.deleteById(id);
	}

	@Override
	public Utilisateur upDateUtilisateur(Utilisateur utilisateur) {
		if (utilisateur.getPassword() != null)
			utilisateur.setPassword(bcryptEncoder.encode(utilisateur.getPassword()));
		return utilisateurRepository.saveAndFlush(utilisateur);
	}

	@Override
	public List<Utilisateur> findAllUtilisateurs() {
		return utilisateurRepository.findAll();
	}

	@Override
	public Utilisateur findUtilisateurById(int id) {
		return utilisateurRepository.getOne(id);
	}

	@Override
	public Utilisateur findUtilisateurByLogin(String login) {
		return utilisateurRepository.findByLogin(login);
	}

	@Override
	public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
		Utilisateur utilisateur = utilisateurRepository.findByLogin(login);
		return new org.springframework.security.core.userdetails.User(utilisateur.getLogin(), utilisateur.getPassword(),
				getAuthority(utilisateur));
	}

	private Set getAuthority(Utilisateur utilisateur) {
        Set authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + utilisateur.getRole().getNom()));
		return authorities;
	}

}
