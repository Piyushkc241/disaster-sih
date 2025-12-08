async function loadLanguage(lang) {
    const res = await fetch(`/assets/translations/${lang}.json`);
    const dict = await res.json();

    document.querySelectorAll("[data-key]").forEach(el => {
        let key = el.getAttribute("data-key");
        if (dict[key]) {
            el.innerText = dict[key];
        }
    });
}

if (typeof document !== "undefined") {
    const langSelect = document.getElementById("languageSelect");

    if (langSelect) {
        langSelect.addEventListener("change", function () {
            const lang = this.value;

            if (lang === "en") {
                location.reload();
            } else {
                loadLanguage(lang);
            }
        });
    }
}
