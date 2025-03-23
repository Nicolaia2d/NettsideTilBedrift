document.addEventListener("DOMContentLoaded", function () {

    const placeholders = [
        "Beskriv for eksempel lekkasje eller vannskader...",
        "Har du problemer med varmeanlegget?",
        "Trenger du en rask befaring?",
        "Opplevde du dårlig vanntrykk?",
        "Trenger du hjelp med rørinnstallasjon?",
        "Er du usikker på hvilken servise du trenger?",
        "Lurer du på hvor mye det koster å bytte dusjarmatur?"
    ];

    let index = 0;
    const meldingsField = document.getElementById('melding');

    if (meldingsField) {
        setInterval(() => {
            meldingsField.placeholder = placeholders[index];
            index = (index + 1) % placeholders.length;
        }, 3000);
    }


    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const toggleBtn = item.querySelector(".toggle-answer");

        question.addEventListener("click", () => {
            // Toggle synligheten av svaret
            const isVisible = answer.style.display === "block";
            answer.style.display = isVisible ? "none" : "block";

            // Oppdater symbolet
            toggleBtn.textContent = isVisible ? "+" : "−";
        });
    });
    const befaringbtn = document.getElementById('befaringbtn');

    if (befaringbtn) {
        befaringbtn.addEventListener('click', function () {
            window.location.href = "/befaring";
        });
    }

    const form = document.getElementById('form');
    const confirmation = document.getElementById("confirmation");
    if (form){
        form.addEventListener('submit', function (event){
           event.preventDefault();

           const navn = document.getElementById('navn').value;
           const telefon = document.getElementById('telefon').value;
           const epost = document.getElementById('epost').value;
           const melding = document.getElementById('melding').value;
           const bilder = document.getElementById('bilder').value;

           localStorage.setItem("navn", navn);
           localStorage.setItem("telefon", telefon);
           localStorage.setItem("epost", epost);
           localStorage.setItem("melding", melding);
           localStorage.setItem("bilder", bilder);

            // Vis bekreftelsesmeldingen
            confirmation.style.display = "block";

           console.log("Informasjonen er lagret")


        });
    }


});