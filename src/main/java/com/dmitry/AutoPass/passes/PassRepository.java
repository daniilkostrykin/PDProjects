package com.dmitry.AutoPass.passes;

import com.dmitry.AutoPass.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PassRepository extends JpaRepository<PassRequest, Long> {

    Page<PassRequest> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);

    Page<PassRequest> findByUserAndStatusOrderByCreatedAtDesc(User user, PassStatus status, Pageable pageable);

    Page<PassRequest> findByStatusOrderByCreatedAtAsc(PassStatus status, Pageable pageable);

    long countByStatus(PassStatus status);
}
