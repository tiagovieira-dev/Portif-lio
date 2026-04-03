function iniciarMenu() {
  const toggle = document.querySelector("#menu-toggle");
  const menu = document.querySelector(".menu");

  if (!toggle || !menu) {
    console.error("Menu ou botão não encontrado");
    return;
  }

  toggle.addEventListener("click", () => {
    console.log("clicou"); // DEBUG
    menu.classList.toggle("active");
  });
}