// Evento de clique do botão "Aplicar filtro"
$('#aplicarFiltro').click(function() {
    // Verifica qual botão de rádio está selecionado
    var radioValue = $('input[name="vbtn-radioNome"]:checked').attr('id');
  
    // Verifica o valor do botão de rádio selecionado e executa a lógica de classificação correspondente
    if (radioValue === 'vbtn-radioNome1') {
      // Lógica de classificação para ordem A-Z
      participantes.sort(function(a, b) {
        return a.Nome.localeCompare(b.Nome);
      });
    } else if (radioValue === 'vbtn-radioNome2') {
      // Lógica de classificação para ordem Z-A
      participantes.sort(function(a, b) {
        return b.Nome.localeCompare(a.Nome);
      });
    }
  
    // Atualiza a exibição dos participantes com a ordem de classificação selecionada
    atualizarExibicaoParticipantes();
  });
  
  // Função para atualizar a exibição dos participantes
  function atualizarExibicaoParticipantes() {
    // Limpa a exibição atual dos participantes
    $('#participantes').empty();
  
    // Itera sobre os participantes na ordem atualizada e os adiciona à exibição
    participantes.forEach(function(participante) {
      var nomeParticipante = participante.Nome;
      // Crie os elementos HTML para exibir o nome do participante
      // e adicione-os à exibição
      // ...
    });
  }
  