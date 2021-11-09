package com.GestionDeFormaition.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;




@Entity
@Table(name = "session_de_formation")
public class SessionDeFormation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String lieu;
	private Date date_debut;
	private Date date_fin;
	private int nb_participant;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "formateur_id", nullable = false)
	private Formateur formateur;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "organisme_id", nullable = false)
	private Organisme organisme;
	
	@ManyToMany(mappedBy = "sessionsDeFormations")
	private Collection<Formation> formations = new ArrayList<>();
	
	@ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH})
	@JoinTable(name = "participants_sessions", joinColumns = @JoinColumn(name="session_de_formation_id"), inverseJoinColumns = @JoinColumn(name="participant_id"))
	private Collection<Participant> participants = new ArrayList<>();


	public Collection<Formation> getFormations() {
		return formations;
	}

	public void setFormations(Collection<Formation> formations) {
		this.formations = formations;
	}

	public SessionDeFormation() {}

	

	public SessionDeFormation(String lieu, Date date_debut, Date date_fin, int nb_participant) {
		super();
		this.lieu = lieu;
		this.date_debut = date_debut;
		this.date_fin = date_fin;
		this.nb_participant = nb_participant;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getLieu() {
		return lieu;
	}

	public void setLieu(String lieu) {
		this.lieu = lieu;
	}

	public Date getDate_debut() {
		return date_debut;
	}

	public void setDate_debut(Date date_debut) {
		this.date_debut = date_debut;
	}

	public Date getDate_fin() {
		return date_fin;
	}

	public void setDate_fin(Date date_fin) {
		this.date_fin = date_fin;
	}

	public int getNb_participant() {
		return nb_participant;
	}

	public void setNb_participant(int nb_participant) {
		this.nb_participant = nb_participant;
	}

	public Formateur getFormateur() {
		return formateur;
	}

	public void setFormateur(Formateur formateur) {
		this.formateur = formateur;
	}

	public Organisme getOrganisme() {
		return organisme;
	}

	public void setOrganisme(Organisme organisme) {
		this.organisme = organisme;
	}

	public Collection<Participant> getParticipants() {
		return participants;
	}

	public void setParticipants(Collection<Participant> participants) {
		this.participants = participants;
	}
	
	
	
	
}
