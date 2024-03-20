const Contato = require('../models/ContatoModel');

exports.paginaInicial = async (req, res) => {
    if (!req.session.user) {
      const contatos = {};
      return res.render('index.ejs', { contatos });
    } else {
      const contatos = await Contato.buscaContato(req.session.user._id);;
      return res.render('index.ejs', { contatos });
    }
}
