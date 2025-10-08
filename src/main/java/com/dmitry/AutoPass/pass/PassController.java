package com.dmitry.AutoPass.pass;


import com.dmitry.AutoPass.pass.dto.CreatePassRequest;
import com.dmitry.AutoPass.pass.dto.PassResponse;
import com.dmitry.AutoPass.security.UserPrincipal;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/v1/passes")
public class PassController {

    private final PassService passService;

    public PassController(PassService passService) {
        this.passService = passService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public PassResponse create(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CreatePassRequest req
    ) {
        return passService.create(principal.getId(), req);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public Page<PassResponse> listMine(
            @AuthenticationPrincipal UserPrincipal principal,
            Pageable pageable
    ) {
        return passService.listMine(principal.getId(), pageable);
    }
}
