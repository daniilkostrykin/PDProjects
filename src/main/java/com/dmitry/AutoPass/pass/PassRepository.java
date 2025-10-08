package com.dmitry.AutoPass.pass;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PassRepository extends JpaRepository<Pass, Long> {

    Page<Pass> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);

    Page<Pass> findAllByOrderByCreatedAtDesc(Pageable pageable);
}