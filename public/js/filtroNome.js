$(document).ready(function() {
  // Função para ordenar os itens da lista em ordem alfabética
  function ordenarParticipantes(ordem) {
    // Selecionar os elementos da lista de participantes
    var participantes = $(".participante-item");

    // Classificar os participantes com base no nome
    participantes.sort(function(a, b) {
      var nomeA = $(a).data("nome").toUpperCase();
      var nomeB = $(b).data("nome").toUpperCase();
      if (ordem === "asc") {
        return nomeA.localeCompare(nomeB);
      } else {
        return nomeB.localeCompare(nomeA);
      }
    });

    // Atualizar a ordem dos elementos na página
    $("#accordionFlushExample").empty().append(participantes);
  }

  // Manipular o clique no botão "Aplicar filtros"
  $("#aplicarFiltro").click(function() {
    // Verificar qual opção de filtro está selecionada
    var radioValue = $("input[name='vbtn-radioNome']:checked").attr("id");

    // Aplicar a ordenação com base na opção selecionada
    if (radioValue === "vbtn-radioNome1") {
      ordenarParticipantes("asc"); // Ordenar em ordem alfabética crescente
    } else if (radioValue === "vbtn-radioNome2") {
      ordenarParticipantes("desc"); // Ordenar em ordem alfabética decrescente
    }
  });
});


