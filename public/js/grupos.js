
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

function atualizarMediaNotas() {
    // Primeiro, setamos a média para zero
    const mediaElement1 = document.getElementById("Media1");
    const mediaElement2 = document.getElementById("Media2");
    // ... adicione mais elementos de média conforme necessário

    mediaElement1.textContent = "0.00";
    mediaElement2.textContent = "0.00";
    // ... atualize mais elementos de média conforme necessário

    // Em seguida, recalcule as médias chamando a função calcularMediaNotas com os grupos atualizados
    const grupos = document.querySelectorAll(".nota");
    calcularMediaNotas(grupos);
}

