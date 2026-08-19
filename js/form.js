document.querySelectorAll(".form-contato").forEach((form) => {
  const status = form.querySelector(".form-status");
  const button = form.querySelector(".btn-contato");
  const buttonHtml = button ? button.innerHTML : "";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!status || !button) return;

    status.hidden = false;
    status.className = "form-status";
    status.textContent = "Enviando sua mensagem…";
    button.disabled = true;
    button.textContent = "Enviando…";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Falha no envio");
      }

      form.reset();
      status.className = "form-status form-status--ok";
      status.textContent = "Mensagem enviada. Eu retorno em até 24 horas.";
    } catch (error) {
      status.className = "form-status form-status--erro";
      status.textContent = "Não foi possível enviar. Tente de novo ou chame no WhatsApp.";
    } finally {
      button.disabled = false;
      button.innerHTML = buttonHtml;
    }
  });
});
