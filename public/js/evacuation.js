document.addEventListener("DOMContentLoaded", () => {
  const routesToggleBtn   = document.getElementById("routesToggleBtn");
  const scenarioToggleBtn = document.getElementById("scenarioToggleBtn");

  const primaryRoutes = document.querySelectorAll(".route.primary");
  const altRoutes     = document.querySelectorAll(".route.alt");
  const hazardArea    = document.getElementById("hazardArea");
  const blockedIcon   = document.getElementById("blockedIcon");
  const personDot     = document.getElementById("personDot");

  let routesVisible = false;   // any routes showing?
  let blockedMode   = false;   // true = alternate (jam) route

  function setHiddenState() {
    primaryRoutes.forEach(r => r.classList.add("hidden"));
    altRoutes.forEach(r     => r.classList.add("hidden"));
    hazardArea.style.opacity = 0;
    hazardArea.classList.add("hidden");
    blockedIcon.classList.add("hidden");
    personDot.classList.add("hidden");
    personDot.classList.remove("person-alt");
  }

  function setNormalState() {
    // show primary, hide alt, no hazard
    primaryRoutes.forEach(r => r.classList.remove("hidden"));
    altRoutes.forEach(r     => r.classList.add("hidden"));

    hazardArea.style.opacity = 0;
    hazardArea.classList.add("hidden");
    blockedIcon.classList.add("hidden");

    personDot.classList.remove("hidden");
    personDot.classList.remove("person-alt"); // uses primary animation
  }

  function setBlockedState() {
    // hide primary, show alternate, show hazard + icon
    primaryRoutes.forEach(r => r.classList.add("hidden"));
    altRoutes.forEach(r     => r.classList.remove("hidden"));

    hazardArea.classList.remove("hidden");
    hazardArea.style.opacity = 1;
    blockedIcon.classList.remove("hidden");

    personDot.classList.remove("hidden");
    personDot.classList.add("person-alt"); // use alternate animation
  }

  // initial: everything hidden
  setHiddenState();

  // ===== Button 1: Show / Hide Evacuation Routes =====
  routesToggleBtn.addEventListener("click", () => {
    if (!routesVisible) {
      // show NORMAL routes first time
      setNormalState();
      routesVisible = true;
      blockedMode = false;

      routesToggleBtn.textContent = "Hide Evacuation Routes";
      scenarioToggleBtn.style.display = "inline-block";
      scenarioToggleBtn.textContent = "Show Blocked Exit Scenario";
    } else {
      // hide everything
      setHiddenState();
      routesVisible = false;
      blockedMode = false;

      routesToggleBtn.textContent = "Show Evacuation Routes";
      scenarioToggleBtn.style.display = "none";
    }
  });

  // ===== Button 2: switch Normal <-> Blocked scenario =====
  scenarioToggleBtn.addEventListener("click", () => {
    if (!blockedMode) {
      setBlockedState();
      blockedMode = true;
      scenarioToggleBtn.textContent = "Show Normal Route";
    } else {
      setNormalState();
      blockedMode = false;
      scenarioToggleBtn.textContent = "Show Blocked Exit Scenario";
    }
  });
});

