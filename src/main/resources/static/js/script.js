document.addEventListener("DOMContentLoaded", function() {
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
});