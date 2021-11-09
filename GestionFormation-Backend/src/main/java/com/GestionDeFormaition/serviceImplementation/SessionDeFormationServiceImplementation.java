package com.GestionDeFormaition.serviceImplementation;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GestionDeFormaition.model.Formation;
import com.GestionDeFormaition.model.Participant;
import com.GestionDeFormaition.model.SessionDeFormation;
import com.GestionDeFormaition.repository.SessionDeFormationRepository;
import com.GestionDeFormaition.service.FormationService;
import com.GestionDeFormaition.service.ParticipantService;
import com.GestionDeFormaition.service.SessionDeFormationService;

@Service
public class SessionDeFormationServiceImplementation implements SessionDeFormationService{
	
	@Autowired
	private SessionDeFormationRepository sessionDeFormationRepository;

	@Autowired
	private ParticipantService participantService;

	@Autowired
	private FormationService formationService;

	@Override
	public SessionDeFormation addSessionDeFormation(SessionDeFormation sessionDeFormation) {
		SessionDeFormation session = new SessionDeFormation();
		session.setDate_debut(sessionDeFormation.getDate_debut());
		session.setDate_fin(sessionDeFormation.getDate_fin());
		session.setFormateur(sessionDeFormation.getFormateur());
		session.setLieu(sessionDeFormation.getLieu());
		session.setNb_participant(sessionDeFormation.getNb_participant());
		session.setOrganisme(sessionDeFormation.getOrganisme());
		session.getParticipants().addAll(sessionDeFormation
			.getParticipants()
			.stream()
			.map(p -> {
				Participant participant = participantService.findParticipantById(p.getId());
				participant.getSessionsDeFormations().add(session);
				return participant;
			}).collect(Collectors.toList()));

		session.getFormations().addAll(sessionDeFormation
			.getFormations()
			.stream()
			.map(p -> {
				Formation formation = formationService.findFormationById(p.getId());
				System.out.println(session.getId());
				formation.getSessionsDeFormations().add(session);
				return formation;
			}).collect(Collectors.toList()));
			
		return sessionDeFormationRepository.save(session);
	}

	@Override
	public void deleteSessionDeFormationByID(long id) {
		sessionDeFormationRepository.deleteById(id);
	}

	@Override
	public SessionDeFormation upDateSessionDeFormation(SessionDeFormation sessionDeFormation) {
		SessionDeFormation sess = findSessionDeFormationById(sessionDeFormation.getId());
		sess.getParticipants().clear();
		sess.getParticipants().addAll(sessionDeFormation
		.getParticipants()
		.stream()
		.map(p -> {
			Participant participant = participantService.findParticipantById(p.getId());
			participant.getSessionsDeFormations().add(sess);
			return participant;
		}).collect(Collectors.toList()));
		return sessionDeFormationRepository.saveAndFlush(sess);
	}


	@Override
	public SessionDeFormation findSessionDeFormationById(long id) {
		return sessionDeFormationRepository.getOne(id);
	}

	@Override
	public List<SessionDeFormation> findAllSessionDeFormation() {
		return sessionDeFormationRepository.findAll();
	}

}
