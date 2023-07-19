
// Função para calcular a média das notas e atualizar a exibição
function calcularMediaNotas(grupos) {
grupos.forEach(function (grupo, index) {
    const notasGrupo = grupo.querySelectorAll(".nota");
    let somaNotas = 0;
    let numParticipantes = 0;

    notasGrupo.forEach(function (notaElement) {
    const nota = parseFloat(notaElement.textContent);
    if (!isNaN(nota)) {
        somaNotas += nota;
        numParticipantes++;
    }
    });

    const media = numParticipantes > 0 ? somaNotas / numParticipantes : 0;
    const mediaElement = document.getElementById("Media" + (index + 1));
    mediaElement.textContent = media.toFixed(2);
});
}

