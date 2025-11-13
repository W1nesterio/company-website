const vacancies = document.querySelectorAll(".vacancy");
vacancies.forEach(v => v.addEventListener("click", () => v.classList.toggle("open")));

window.addEventListener("scroll", () => {
  const header = document.getElementById("mainHeader");
  header.classList.toggle("sticky", window.scrollY > 50);
});

const burger = document.getElementById("burger");
const navMenu = document.getElementById("navMenu").querySelector("ul");
burger.addEventListener("click", () => navMenu.classList.toggle("active"));

window.addEventListener("DOMContentLoaded", () => {
  const hrPersons = document.querySelectorAll(".hr-department li");
  hrPersons.forEach((person, index) => {
    person.style.animationDelay = `${0.2 + index * 0.2}s`;
    person.classList.add("fade-in-up");
  });
});

const form = document.getElementById("resumeForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const position = form.position.value;
  const resumeFile = form.resume.files[0];

  if (!name || !email || !phone || !position || !resumeFile) {
    alert("Пожалуйста, заполните все поля и загрузите резюме.");
    return;
  }

  const formData = new FormData(form);

  try {
    const res = await fetch("http://localhost:3000/send-resume", {
      method: "POST",
      body: formData,
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = { message: "Ответ сервера не в формате JSON" };
    }

    if (res.ok) {
      alert(data.message);
      form.reset();
    } else {
      alert(data.message || "Ошибка при отправке резюме");
    }
  } catch (err) {
    console.error("Fetch ошибка:", err);
  }
});
