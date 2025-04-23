package com.home.rorleggernettside.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

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
    public String visTjenester(){
        return "tjenester";
    }
    @GetMapping("/omoss")
    public String visOmoss(){
        return "omoss";
    }

    @PostMapping("/befaring")
    public String behandleBefaring(
            @RequestParam("navn") String navn,
            @RequestParam("telefon") Integer telefon,
            @RequestParam("epost") String epost,
            @RequestParam("melding") String melding,
            @RequestParam("bilder") MultipartFile[] bilder
    ) throws IOException {
        for (MultipartFile fil : bilder) {
            if (!fil.isEmpty()) {
                byte[] bytes = fil.getBytes();
                // Lagre hver fil på ønsket sted
            }


        }
        System.out.println("Skjema mottatt fra " + navn);
        return "redirect:/bekreftelse";
    }
}
