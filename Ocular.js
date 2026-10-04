const $ = (selector) => document.querySelector(selector);

const descriptions = {
  catarata: [
    "Catarata",
    "A catarata pode deixar a visão embaçada e reduzir o contraste."
  ],

  glaucoma: [
    "Glaucoma",
    "O glaucoma pode reduzir progressivamente o campo visual periférico."
  ],

  retinopatia: [
    "Retinopatia diabética",
    "A retinopatia diabética pode causar manchas e pontos cegos na visão."
  ],

  degeneracao: [
    "Degeneração macular",
    "A degeneração macular pode comprometer a visão central e os detalhes."
  ]
};

const severityNames = {
  leve: "Leve",
  moderada: "Moderada",
  grave: "Grave"
};

const condition = $("#eye-condition");
const simulation = $("#simulation-image");
const status = $("#simulation-status");

function selectedSeverity() {
  return $('input[name="severity"]:checked').value;
}

function updateDescription() {
  const [title, description] = descriptions[condition.value];

  $("#selected-condition-title").textContent = title;
  $("#selected-condition-description").textContent = description;
}

function findImage(conditionValue, severity) {
  const images = document.querySelectorAll("#image-library img");

  return [...images].find((image) => {
    return (
      image.dataset.condition === conditionValue &&
      image.dataset.severity === severity
    );
  });
}

function applySimulation() {
  const severity = selectedSeverity();
  const source = findImage(condition.value, severity);
  const [title] = descriptions[condition.value];

  if (!source) {
    status.textContent =
      "Não há uma imagem cadastrada para esta combinação.";
    return;
  }

  simulation.src = source.getAttribute("src");

  simulation.alt =
    `Simulação educativa de ${title.toLowerCase()} em intensidade ` +
    `${severityNames[severity].toLowerCase()}.`;

  $("#comparison-condition").textContent = title.toLowerCase();
  $("#comparison-severity").textContent = severityNames[severity];
  $("#simulation-caption").textContent = simulation.alt;

  status.textContent = "Comparação atualizada.";
}

simulation.addEventListener("error", () => {
  status.textContent =
    `A imagem não foi encontrada: ${simulation.getAttribute("src")}. ` +
    "Confira nome, maiúsculas/minúsculas e extensão.";
});

condition.addEventListener("change", updateDescription);

$("#apply-simulation").addEventListener("click", applySimulation);

$("#menu-toggle").addEventListener("click", (event) => {
  const open =
    event.currentTarget.getAttribute("aria-expanded") === "true";

  event.currentTarget.setAttribute("aria-expanded", String(!open));

  $("#nav-list").classList.toggle("is-open", !open);

  event.currentTarget.querySelector(".visually-hidden").textContent =
    open ? "Abrir menu" : "Fechar menu";
});

updateDescription();