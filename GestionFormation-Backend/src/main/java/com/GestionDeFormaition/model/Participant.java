package com.GestionDeFormaition.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.GestionDeFormaition.extras.Nationalite;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer","handler","sessionsDeFormations"})
@Entity
@Table(name = "participant")
public class Participant {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String nom;
	private String prenom;
	private String email;
	private int tel;

	@Enumerated(EnumType.STRING)
	private Nationalite type;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pays_id", nullable = false)
	private Pays pays;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "profil_id", nullable = false)
	private Profil profil;
	
	@ManyToMany(mappedBy = "participants", cascade = {CascadeType.DETACH})
	private Collection<SessionDeFormation> sessionsDeFormations = new ArrayList<>();

	public Participant() {
	}

	public Participant(int id, String nom, String prenom, String email, int tel, Nationalite type) {
		this.id = id;
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.tel = tel;
		this.type = type;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getTel() {
		return tel;
	}

	public void setTel(int tel) {
		this.tel = tel;
	}

	public Nationalite getType() {
		return type;
	}

	public void setType(Nationalite type) {
		this.type = type;
	}

	public Pays getPays() {
		return pays;
	}

	public void setPays(Pays pays) {
		this.pays = pays;
	}

	public Profil getProfil() {
		return profil;
	}

	public void setProfil(Profil profil) {
		this.profil = profil;
	}

	public Collection<SessionDeFormation> getSessionsDeFormations() {
		return sessionsDeFormations;
	}

	public void setSessionsDeFormations(Collection<SessionDeFormation> sessionsDeFormations) {
		this.sessionsDeFormations = sessionsDeFormations;
	}
	
	
	
}
