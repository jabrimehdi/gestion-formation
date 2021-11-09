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
@Table(name="formation")
public class Formation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String titre;
	private int annee;
	private int nb_session;
	private int duree;
	private double budget;
	
	@ManyToOne
	@JoinColumn(name = "domaine_id", nullable = false)
	private Domaine domaine;
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinTable(name = "Formations_affectes", joinColumns = @JoinColumn(name="formation_id"), inverseJoinColumns = @JoinColumn(name="session_de_formation_id"))
	private Collection<SessionDeFormation> sessionsDeFormations = new ArrayList<>();

	@Enumerated(EnumType.STRING)
	private Nationalite type;
	
	public Formation() {}

	public Formation(long id, String titre, String type, int annee, int nb_session, int duree, double budget,
			int idDomaine) {
		this.id = id;
		this.titre = titre;
		this.annee = annee;
		this.nb_session = nb_session;
		this.duree = duree;
		this.budget = budget;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public int getAnnee() {
		return annee;
	}

	public void setAnnee(int annee) {
		this.annee = annee;
	}

	public int getNb_session() {
		return nb_session;
	}

	public void setNb_session(int nb_session) {
		this.nb_session = nb_session;
	}

	public int getDuree() {
		return duree;
	}

	public void setDuree(int duree) {
		this.duree = duree;
	}

	public double getBudget() {
		return budget;
	}

	public void setBudget(double budget) {
		this.budget = budget;
	}

	public Domaine getDomaine() {
		return domaine;
	}

	public void setDomaine(Domaine domaine) {
		this.domaine = domaine;
	}

	public Nationalite getType() {
		return type;
	}

	public void setType(Nationalite type) {
		this.type = type;
	}
	
	
	public Collection<SessionDeFormation> getSessionsDeFormations() {
		return sessionsDeFormations;
	}

	public void setSessionsDeFormations(Collection<SessionDeFormation> sessionsDeFormations) {
		this.sessionsDeFormations = sessionsDeFormations;
	}
}
