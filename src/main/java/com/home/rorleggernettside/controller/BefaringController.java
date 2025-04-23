package com.home.rorleggernettside.controller;

import com.home.rorleggernettside.model.Befaring;
import com.home.rorleggernettside.repository.BefaringRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/befaring")
@CrossOrigin
public class BefaringController {

    @Autowired
    private BefaringRepo BefaringRepo;

    @PostMapping
    public Befaring createBefaring(@RequestBody Befaring befaring) {
        return BefaringRepo.save(befaring);
    }

    @GetMapping
    public List<Befaring> getAll() {
        return BefaringRepo.findAll();
    }

}
