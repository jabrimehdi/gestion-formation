package com.GestionDeFormaition.serviceImplementation;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GestionDeFormaition.model.Participant;
import com.GestionDeFormaition.model.SessionDeFormation;
import com.GestionDeFormaition.repository.ParticipantRepository;
import com.GestionDeFormaition.service.ParticipantService;

@Service
public class ParticipantServiceImplementation implements ParticipantService {

	@Autowired
	private ParticipantRepository participantRepository;
	
	@Override
	public List<Participant> findAllParticipants() {
		return participantRepository.findAll();
	}

	@Override
	public Participant addParticipant(Participant participant) {
		return participantRepository.save(participant);
	}

	@Override
	public void deleteParticipantById(int id) {
		participantRepository.deleteById(id);
	}

	@Override
	public Participant updateParticipant(Participant participant) {
		return participantRepository.saveAndFlush(participant);
	}

	@Override
	public Participant findParticipantById(int id) {
		return participantRepository.findById(id).get();
	}

	@Override
	public Collection<SessionDeFormation> findSessionsByParticipantId(int id) {
		Participant participant = findParticipantById(id);
		return participant.getSessionsDeFormations();
	}

}
