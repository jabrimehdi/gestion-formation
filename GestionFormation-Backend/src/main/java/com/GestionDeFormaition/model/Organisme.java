package com.GestionDeFormaition.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer","handler","formateurs","sessionsDeFormation"})
@Entity
@Table(name = "organisme")
public class Organisme {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String libelle;
	
	
	@OneToMany(mappedBy = "organisme", cascade = CascadeType.ALL)
	private Set<SessionDeFormation> sessionsDeFormation;
	
	@OneToMany(mappedBy = "organisme", cascade = CascadeType.ALL)
	private Set<Formateur> formateurs;
	
	public Organisme() {}

	public Organisme(int id, String libelle) {
		this.id = id;
		this.libelle = libelle;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}
	
	
	
	
}
