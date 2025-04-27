package com.home.rorleggernettside.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.io.IOException;

@Controller
public class WebController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/befaring")
    public String visBefaring() {
        return "befaring";
    }

    @GetMapping("/tjenester")
    public String visTjenester() {
        return "tjenester";
    }

    @GetMapping("/omoss")
    public String visOmoss() {
        return "omoss";
    }

    @PostMapping("/befaring")
    public String behandleBefaring(
            @RequestParam("navn") String navn,
            @RequestParam("telefon") String telefon,
            @RequestParam("epost") String epost,
            @RequestParam("melding") String melding,
            @RequestParam("bilder") MultipartFile[] bilder
    ) throws IOException {

        String uploadDir = "uploads/";
        Files.createDirectories(Paths.get(uploadDir));

        for (MultipartFile fil : bilder) {
            if (!fil.isEmpty()) {
                Files.copy(fil.getInputStream(),
                        Paths.get(uploadDir + fil.getOriginalFilename()),
                        StandardCopyOption.REPLACE_EXISTING);
            }
        }

        System.out.println("Skjema mottatt fra " + navn);
        return "redirect:/bekreftelse";
    }
}