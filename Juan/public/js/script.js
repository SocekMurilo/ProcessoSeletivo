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


function mostrarSegundoSelect() {
  var primeiroSelect = document.getElementById("etapa");
  var outrosSelects = document.querySelectorAll(".etapas");
  var etapa2 = document.getElementById("etapa2");
  var etapa3 = document.getElementById("etapa3");
  var etapa4 = document.getElementById("etapa4");
  var turno = document.getElementById("selectTurno");

  if (primeiroSelect.value === "etapa2") {
    etapa2.style.display = "block";
  } else {
    etapa2.style.display = "none";
  }

  if (primeiroSelect.value === "etapa3") {
    etapa3.style.display = "block";
  } else {
    etapa3.style.display = "none";
  }

  if (primeiroSelect.value === "etapa4") {
    etapa4.style.display = "block";
  } else {
    etapa4.style.display = "none";
  }

  var opcaoSelecionada = false;
  outrosSelects.forEach(function(select) {
    if (etapa2.style.display === "block" || etapa3.style.display === "block" || etapa4.style.display === "block") {
      opcaoSelecionada = true;
    }
  });

  if (opcaoSelecionada) {
    turno.style.display = "block";
  } else {
    turno.style.display = "none";
  }
}

var btnsAtivar = document.querySelectorAll('.btn-ativar');
var btnDesativar = document.querySelector('.btn-desativar');
var linkGrupos = document.getElementById('botaoGrupos');

btnsAtivar.forEach(function(btn) {
  btn.addEventListener('click', function() {
    linkGrupos.classList.remove('disabled');
  });
});

btnDesativar.addEventListener('click', function() {
  linkGrupos.classList.add('disabled');
});

document.getElementById("limparFiltros").addEventListener("click", function() {
  var radioGroups = document.querySelectorAll(".btn-group-vertical");
  for (var i = 0; i < radioGroups.length; i++) {
    var radios = radioGroups[i].querySelectorAll("input[type='radio']");
    for (var j = 0; j < radios.length; j++) {
      radios[j].checked = false;
    }
  }
});

$(document).ready(function() {
  // Definir as variáveis de índice da etapa e ID da etapa
  let indiceEtapa = null;
  let idEtapa = null;

  // Capturar o evento de clique no botão da etapa
  $('.nav-link').click(function() {
    // Obter o índice da etapa a partir do atributo data-index
    indiceEtapa = $(this).data('index');
    idEtapa = $(this).data('id');
    
    // Imprimir o índice da etapa selecionada no console
    console.log('Índice da etapa selecionada:', indiceEtapa);
    console.log('ID da etapa selecionada:', idEtapa);

    // Chamar a função para renderizar o arquivo EJS com os valores atualizados
    renderizarArquivoEJS();
  });

  // Função para renderizar o arquivo EJS com os valores atualizados
  function renderizarArquivoEJS() {
    // Fazer uma requisição AJAX para o servidor para renderizar o arquivo EJS
    $.ajax({
      url: '/ajax',
      method: 'POST',
      data: { indiceEtapa: indiceEtapa, idEtapa: idEtapa },
      success: function(response) {
        // Atualizar o conteúdo HTML com o resultado do arquivo EJS renderizado
        $('.accordion').html(response);
      },
      error: function(error) {
        console.error('Erro ao renderizar o arquivo EJS:', error);
      }
    });
  }
});

$(document).ready(function() {
  // Capturar o evento de clique no botão da etapa
  $('.nav-link').click(function() {
    // Obter o índice da etapa a partir do atributo data-index
    const indiceEtapa = $(this).data('index');
    const idEtapa = $(this).data('id');
    
    // Atualizar o valor do índice da etapa atual na página
    $('#indiceEtapaAtual').val(indiceEtapa);
    $('#idEtapaAtual').val(idEtapa);
    
    // Exibir ou ocultar os participantes com base no índice da etapa atual
    exibirParticipantes();
  });
  
  // Função para exibir ou ocultar os participantes com base no índice da etapa atual
  function exibirParticipantes() {
    const indiceEtapaAtual = parseInt($('#indiceEtapaAtual').val());
    
    $('.accordion-item.participante-item').each(function() {
      const status = parseInt($(this).data('status'));
      
      if (status >= (indiceEtapaAtual + 1)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }
  
  // Chamar a função para exibir os participantes quando a página for carregada
  exibirParticipantes();
});




let lastClickTime = 0;

function tabClick(event) {
  const currentTime = new Date().getTime();
  
  if (currentTime - lastClickTime < 300) {
    const myModal = new bootstrap.Modal(document.getElementById('modal-1'));
    myModal.show();
  }
  
  lastClickTime = currentTime;
}








