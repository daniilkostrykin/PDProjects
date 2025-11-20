package com.dmitry.AutoPass.passes;

import com.dmitry.AutoPass.passes.dto.PassResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/passes")
@RequiredArgsConstructor
// @PreAuthorize("hasAuthority('ADMIN') or hasRole('ADMIN')") // Временно
// отключено для тестирования
public class AdminPassController {

    private final PassService service;

    @GetMapping("/stats")
    public PassService.Stats stats() {
        return service.stats();
    }

    @GetMapping
    public Page<PassResponse> queue(
            @RequestParam(defaultValue = "PENDING") String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return service.adminQueue(status, PageRequest.of(page, size));
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<PassResponse> approve(@PathVariable Long id) {
        return ResponseEntity.ok(service.approve(id));
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<PassResponse> reject(@PathVariable Long id) {
        return ResponseEntity.ok(service.reject(id));
    }
}
