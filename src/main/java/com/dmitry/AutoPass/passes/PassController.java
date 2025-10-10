package com.dmitry.AutoPass.passes;

import com.dmitry.AutoPass.passes.dto.PassCreateRequest;
import com.dmitry.AutoPass.passes.dto.PassResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/passes")
@RequiredArgsConstructor
public class PassController {

    private final PassService service;

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<PassResponse> create(
            @Valid @RequestBody PassCreateRequest req,
            @AuthenticationPrincipal String principalName) {
        log.info("CREATE: principal={}, type={}, date={}, fio={}",
                principalName, req.type(), req.visitDate(), req.fullName());
        return ResponseEntity.ok(service.create(req, principalName));
    }

    @GetMapping(produces = "application/json")
    public Page<PassResponse> myList(
            @RequestParam(required = false) String status, // pending|approved|rejected
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @AuthenticationPrincipal String principalName) {
        return service.myList(principalName, status, PageRequest.of(page, size));
    }
}
