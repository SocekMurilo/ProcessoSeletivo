const grupos = document.querySelectorAll(".grupo");

document.addEventListener("dragstart", (e) => {
  e.target.classList.add("dragging");
  e.dataTransfer.setData("text/plain", e.target.id);
});

document.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
});

grupos.forEach((item) => {
  item.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    const applyAfter = getNewPosition(item, e.clientY);

    if (applyAfter) {
      applyAfter.insertAdjacentElement("afterend", dragging);
    } else {
      item.prepend(dragging);
    }
  });
});

function getNewPosition(grupo, posY) {
  const cards = grupo.querySelectorAll(".item:not(.dragging)");
  let result;

  for (let refer_card of cards) {
    const box = refer_card.getBoundingClientRect();
    const boxCenterY = box.y + box.height / 2;

    if (posY >= boxCenterY) result = refer_card;
  }

  return result;
}

 // Obtenha referência para o botão de selecionar todos
 const selectAllBtn = document.getElementById('select-all-btn');

 // Obtenha referência para todos os checkboxes
 const checkboxes = document.querySelectorAll('input[type="checkbox"]');

 // Adicione um ouvinte de evento de clique ao botão de selecionar todos
 selectAllBtn.addEventListener('click', function() {
   const allChecked = Array.from(checkboxes).every(function(checkbox) {
     return checkbox.checked;
   });

   // Se todos os checkboxes estiverem marcados, desmarque todos eles
   if (allChecked) {
     checkboxes.forEach(function(checkbox) {
       checkbox.checked = false;
     });
   } else {
     // Caso contrário, marque todos eles
     checkboxes.forEach(function(checkbox) {
       checkbox.checked = true;
     });
   }
 });

// Seleciona todos os elementos com a classe "nota"
const notas = document.querySelectorAll('.nota');

let soma = 0;
let quantidade = 0;

// Itera sobre cada elemento de nota e soma seus valores convertidos para número
notas.forEach(nota => {
  const valor = parseFloat(nota.textContent);
  if (!isNaN(valor)) {
    soma += valor;
    quantidade++;
  }
});

// Calcula a média
const media = soma / quantidade;

// Seleciona o elemento onde a média será exibida
const mediaNotasElement = document.getElementById('mediaNotas');

// Atribui o valor da média ao elemento
mediaNotasElement.textContent = 'Média das notas: ' + media;


