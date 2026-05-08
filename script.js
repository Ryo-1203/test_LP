const revealTargets = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach(target => observer.observe(target));
} else {
  revealTargets.forEach(target => target.classList.add("is-visible"));
}

const form = document.querySelector("#joinForm");
const status = document.querySelector("#formStatus");

form?.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim() || "参加者";
  status.textContent = `${name}さん、申込を受け付けました。LINEオープンチャットの案内をこの場で確認できるデモ状態です。`;
  status.classList.add("success");
  form.reset();
});
