const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const menuButton = document.querySelector("[data-menu-button]");
const inquiryForm = document.querySelector("[data-inquiry-form]");
const formStatus = document.querySelector("[data-form-status]");

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 10);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (menu && menuButton) {
  menuButton.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
}

if (inquiryForm && formStatus) {
  inquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    formStatus.textContent = "Sending...";

    const payload = Object.fromEntries(new FormData(inquiryForm).entries());

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      inquiryForm.reset();
      formStatus.textContent = "Project details received. We will follow up with next steps.";
    } catch (error) {
      formStatus.textContent = "This preview form is ready for the live email connection.";
    }
  });
}
