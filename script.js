const weddingDate = new Date("2026-06-20T13:15:00+02:00");

const countdownFields = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

function updateCountdown() {
  const diff = Math.max(0, weddingDate.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownFields.days.textContent = days.toString();
  countdownFields.hours.textContent = hours.toString().padStart(2, "0");
  countdownFields.minutes.textContent = minutes.toString().padStart(2, "0");
  countdownFields.seconds.textContent = seconds.toString().padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const form = document.querySelector("#rsvp-form");
const status = document.querySelector("#form-status");
const savedRsvp = JSON.parse(localStorage.getItem("wedding-rsvp") || "null");

if (form && savedRsvp) {
  form.elements.name.value = savedRsvp.name || "";
  form.elements.food.value = savedRsvp.food || "";
  form.elements.song.value = savedRsvp.song || "";

  if (savedRsvp.attending) {
    const selected = form.querySelector(`input[name="attending"][value="${savedRsvp.attending}"]`);
    if (selected) selected.checked = true;
  }

  status.textContent = "Svaret ditt er lagret på denne enheten.";
}

if (form) form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const rsvp = {
    name: data.get("name"),
    attending: data.get("attending"),
    food: data.get("food"),
    song: data.get("song"),
    savedAt: new Date().toISOString(),
  };

  localStorage.setItem("wedding-rsvp", JSON.stringify(rsvp));
  status.textContent = rsvp.attending === "Ja"
    ? "Hurra, svaret er lagret. Vi gleder oss!"
    : "Takk for at du ga beskjed. Svaret er lagret.";
});

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("sw.js");
}
