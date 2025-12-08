document.addEventListener("DOMContentLoaded", () => {

  const showRoutesBtn = document.getElementById("showRoutesBtn");
  const toggleScenarioBtn = document.getElementById("toggleScenarioBtn");

  const primaryRoutes = document.querySelectorAll(".primary");
  const altRoutes = document.querySelectorAll(".alt");
  const hazard = document.getElementById("hazardArea");
  const blockedIcon = document.getElementById("blockedIcon");
  const personDot = document.getElementById("personDot");

  let routesVisible = false;
  let blocked = false;

  // ----------------------------
  // STEP 1: SHOW ROUTES
  // ----------------------------

  showRoutesBtn.addEventListener("click", () => {
    routesVisible = !routesVisible;

    if (routesVisible) {
      showRoutesBtn.textContent = "Hide Evacuation Routes";

      // Show primary route + person
      primaryRoutes.forEach(r => r.classList.remove("hidden"));
      personDot.classList.remove("hidden");

      // Enable blocked scenario button
      toggleScenarioBtn.style.display = "inline-block";

    } else {
      showRoutesBtn.textContent = "Show Evacuation Routes";

      // Hide everything again
      primaryRoutes.forEach(r => r.classList.add("hidden"));
      altRoutes.forEach(r => r.classList.add("hidden"));
      personDot.classList.add("hidden");
      hazard.classList.add("hidden");
      blockedIcon.classList.add("hidden");

      toggleScenarioBtn.style.display = "none";
      toggleScenarioBtn.textContent = "Show Blocked Exit Scenario";

      blocked = false;
    }
  });

  // ----------------------------
  // STEP 2: BLOCKED SCENARIO
  // ----------------------------

  toggleScenarioBtn.addEventListener("click", () => {
    blocked = !blocked;

    if (blocked) {
      toggleScenarioBtn.textContent = "Show Normal Route";

      // Fade primary path
      primaryRoutes.forEach(r => r.style.opacity = "0.25");

      // Show hazard + alternate route
      hazard.classList.remove("hidden");
      blockedIcon.classList.remove("hidden");
      altRoutes.forEach(r => r.classList.remove("hidden"));

      // Change person animation
      personDot.classList.add("person-alt");

    } else {
      toggleScenarioBtn.textContent = "Show Blocked Exit Scenario";

      primaryRoutes.forEach(r => r.style.opacity = "1");
      hazard.classList.add("hidden");
      blockedIcon.classList.add("hidden");
      altRoutes.forEach(r => r.classList.add("hidden"));
      personDot.classList.remove("person-alt");
    }
  });
});
