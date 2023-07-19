const ParticipanteProcesso = require('src/model/participanteProcesso');

// Manipular o clique no botão "Aplicar filtros"
$("#aplicarFiltro").click(async function() {
  // Verificar qual opção de filtro está selecionada
  var radioValue = $("input[name='vbtn-radioParticipou']:checked").attr("id");

  // Filtrar os participantes com base na opção selecionada
  if (radioValue === "vbtn-radioParticipou1") {
    // Participantes que já participaram de outro processo
    const participantes = await ParticipanteProcesso.findAll({
      group: ['IDParticipante'],
      having: sequelize.literal('COUNT(*) > 1')
    });

    // Obter os IDs dos participantes que participaram de outros processos
    const participantesIds = participantes.map(participante => participante.IDParticipante);

    // Exibir apenas os participantes que estão na lista de IDs filtrados
    $(".participante-item").each(function() {
      var idParticipante = $(this).data("idparticipante");
      if (participantesIds.includes(idParticipante)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  } else if (radioValue === "vbtn-radioParticipou2") {
    // Participantes que não participaram de outro processo
    const participantes = await ParticipanteProcesso.findAll({
      group: ['IDParticipante'],
      having: sequelize.literal('COUNT(*) = 1')
    });

    // Obter os IDs dos participantes que não participaram de outros processos
    const participantesIds = participantes.map(participante => participante.IDParticipante);

    // Exibir apenas os participantes que estão na lista de IDs filtrados
    $(".participante-item").each(function() {
      var idParticipante = $(this).data("idparticipante");
      if (participantesIds.includes(idParticipante)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }
});
