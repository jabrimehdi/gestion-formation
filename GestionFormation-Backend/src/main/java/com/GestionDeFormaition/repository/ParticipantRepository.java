package com.GestionDeFormaition.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.GestionDeFormaition.model.Participant;

public interface ParticipantRepository extends JpaRepository<Participant, Integer> {

}
