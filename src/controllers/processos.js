const Processos = require('../model/processos');
const Etapas = require('../model/etapas');


module.exports = {
    async pagProcessosGet(req, res) {
        const processos = await Processos.findAll({
            raw: true,
            attributes: ['IDProcesso', 'Nome', 'Data', 'NumEtapas']
        });
        const etapas = await Etapas.findAll({
            raw: true,
            attributes: ['IDEtapa', 'Nome', 'Data', 'Turno', 'IDProcesso'],
        });

        const processosComEtapas = processos.map((processo) => {
            const etapasDoProcesso = etapas.filter((etapa) => etapa.IDProcesso === processo.IDProcesso);
            return { ...processo, etapas: etapasDoProcesso };
        });

        res.render('../views/processos', { processosComEtapas });
    }
}