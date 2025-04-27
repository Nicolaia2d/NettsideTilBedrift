document.addEventListener("DOMContentLoaded", () => {

    /** -----------------------
     * 1. Roterende placeholder
     ------------------------ */
    const meldingsField = document.getElementById('melding');
    const placeholders = [
        "Beskriv for eksempel lekkasje eller vannskader...",
        "Har du problemer med varmeanlegget?",
        "Trenger du en rask befaring?",
        "Opplevde du dårlig vanntrykk?",
        "Trenger du hjelp med rørinnstallasjon?",
        "Er du usikker på hvilken servise du trenger?",
        "Lurer du på hvor mye det koster å bytte dusjarmatur?"
    ];

    if (meldingsField) {
        let index = 0;
        setInterval(() => {
            meldingsField.placeholder = placeholders[index];
            index = (index + 1) % placeholders.length;
        }, 3000);
    }

    /** -----------------------
     * 2. Mørk modus-toggle
     ------------------------ */
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }

    /** -----------------------
     * 3. FAQ-toggle (dersom man bruker custom FAQ)
     ------------------------ */
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const toggleBtn = item.querySelector(".toggle-answer");

        question?.addEventListener("click", () => {
            const isVisible = answer.style.display === "block";
            answer.style.display = isVisible ? "none" : "block";
            toggleBtn.textContent = isVisible ? "+" : "−";
        });
    });

    /** -----------------------
     * 4. Befaring-knapp
     ------------------------ */
    const befaringbtn = document.getElementById('befaringbtn');
    befaringbtn?.addEventListener('click', () => {
        window.location.href = "/befaring";
    });

    /** -----------------------
     * 5. Skjema: send til API
     ------------------------ */
    const form = document.getElementById('form');
    const confirmation = document.getElementById("confirmation");

    form?.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const kontaktmetoder = formData.getAll("kontaktmetode");

        const payload = {
            navn: formData.get('navn'),
            telefon: formData.get('telefon'),
            epost: formData.get('epost'),
            melding: formData.get('melding'),
            kontaktmetoder: kontaktmetoder.join(', ')
        };

        try {
            const response = await fetch('http://localhost:8080/api/befaring', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                form.reset();
                confirmation.classList.add("show");
                console.log("✅ Skjema sendt!");
            } else {
                alert("❌ Noe gikk galt med innsendingen. Prøv igjen.");
            }
        } catch (error) {
            console.error("Feil ved innsending:", error);
            alert("❌ Det oppstod en feil. Vennligst prøv igjen senere.");
        }
    });

    /** -----------------------
     * 6. Utvid forklaringer
     ------------------------ */
    const toggleForklaringerBtn = document.getElementById("toggleForklaringer");
    const ekstraForklaringer = document.getElementById("ekstraForklaringer");

    toggleForklaringerBtn?.addEventListener("click", () => {
        const isVisible = ekstraForklaringer.style.display === "block";
        ekstraForklaringer.style.display = isVisible ? "none" : "block";
        toggleForklaringerBtn.textContent = isVisible
            ? "Vis flere begreper"
            : "Vis færre begreper";
    });

    /** -----------------------
     * 7. Søk i begrepskort
     ------------------------ */
    const sokefelt = document.getElementById("begrepSok");

    sokefelt?.addEventListener("input", () => {
        const query = sokefelt.value.toLowerCase();
        const kortene = document.querySelectorAll("#forklaringer .card");

        kortene.forEach(card => {
            const tekst = card.textContent.toLowerCase();
            card.parentElement.style.display = tekst.includes(query) ? "block" : "none";
        });
    });
});

/** -----------------------
 * 8. Diagnoseguide – globale hjelpefunksjoner
 ------------------------ */
function nesteSporsmal(valg) {
    const guide = document.getElementById('feil-guide');
    const resultat = document.getElementById('feil-resultat');
    guide.innerHTML = '';

    if (valg === 'lekkasje') {
        guide.innerHTML = `
      <p>Sjekk under vasken og bak toalettet – ser du fukt eller drypp?</p>
      <button onclick="visSvar('lekkasjeJa')">Ja</button>
      <button onclick="visSvar('lekkasjeNei')">Nei</button>
    `;
    } else {
        visSvar('ingen');
    }
}

function visSvar(svar) {
    const resultat = document.getElementById('feil-resultat');
    let tekst = '';

    switch (svar) {
        case 'lekkasjeJa':
            tekst = 'Mulig lekkasje i kobling. Bør sees på raskt.';
            break;
        case 'lekkasjeNei':
            tekst = 'Kan være kondens eller skjult rørskade. Kontakt oss for inspeksjon.';
            break;
        case 'ingen':
            tekst = 'Bra! Men husk å følge med på fukt og lukt fremover.';
            break;
    }

    resultat.textContent = tekst;
}
