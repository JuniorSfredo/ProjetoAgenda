const Contato = require('../models/ContatoModel');

exports.paginaInicial = async (req, res) => {
    const contatos = await Contato.buscaContato();
    return res.render('index.ejs', { contatos });
}