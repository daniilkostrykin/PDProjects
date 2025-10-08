package com.dmitry.AutoPass.pass;


import com.dmitry.AutoPass.pass.dto.PassResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/passes")
@PreAuthorize("hasRole('ADMIN')")
public class AdminPassController {

    private final PassService passService;

    public AdminPassController(PassService passService) {
        this.passService = passService;
    }

    @GetMapping
    public Page<PassResponse> listAll(Pageable pageable) {
        return passService.listAll(pageable);
    }

    @PatchMapping("/{id}/status")
    public PassResponse setStatus(@PathVariable Long id, @RequestParam PassStatus status) {
        return passService.setStatus(id, status);
    }
}