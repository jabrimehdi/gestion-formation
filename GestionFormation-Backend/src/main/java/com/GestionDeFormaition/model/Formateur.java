package com.GestionDeFormaition.model;

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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.GestionDeFormaition.extras.FormateurType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer","handler","sessionsDeFormation"})
@Entity
@Table(name = "formateur")
public class Formateur {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String nom;
	private String prenom;
	private String email;
	private int tel;
	
	@OneToMany(mappedBy = "formateur", cascade = CascadeType.ALL)
	private Set<SessionDeFormation> sessionsDeFormation;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_organisme", nullable = false)
	private Organisme organisme;
	
	@Enumerated(EnumType.STRING)
	private FormateurType type;

	
	public Formateur() {
	}


	public Formateur(int id, String nom, String prenom, String email, int tel) {
		super();
		this.id = id;
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.tel = tel;
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


	public Set<SessionDeFormation> getSessionsDeFormation() {
		return sessionsDeFormation;
	}


	public void setSessionsDeFormation(Set<SessionDeFormation> sessionsDeFormation) {
		this.sessionsDeFormation = sessionsDeFormation;
	}


	public Organisme getOrganisme() {
		return organisme;
	}


	public void setOrganisme(Organisme organisme) {
		this.organisme = organisme;
	}


	public FormateurType getType() {
		return type;
	}


	public void setType(FormateurType type) {
		this.type = type;
	}
	
	
	
	
	
}
