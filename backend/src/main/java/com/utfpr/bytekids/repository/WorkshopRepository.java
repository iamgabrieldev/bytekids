package com.utfpr.bytekids.repository;

import com.utfpr.bytekids.model.Workshop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkshopRepository extends JpaRepository<Workshop, Long> {
}
