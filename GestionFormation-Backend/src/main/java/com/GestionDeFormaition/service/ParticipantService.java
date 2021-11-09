package com.GestionDeFormaition.service;

import java.util.Collection;
import java.util.List;

import com.GestionDeFormaition.model.Participant;
import com.GestionDeFormaition.model.SessionDeFormation;

public interface ParticipantService {
	List<Participant> findAllParticipants();
	Participant addParticipant(Participant participant);
	void deleteParticipantById(int id);
	Participant updateParticipant(Participant participant);
	Participant findParticipantById(int id);
	Collection<SessionDeFormation> findSessionsByParticipantId(int id);
}
