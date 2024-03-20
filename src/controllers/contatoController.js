const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    if (req.session.user) {
      res.render('indexContato', {
        contato: {}
      });
    } else {
      res.redirect('/');
    }
}

exports.register = async (req, res) => {
    try { 
        const contato = new Contato(req.body, req.session.user._id);
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => { res.redirect('/contato') });
            return;
        }

        req.flash('success', 'Contato registrado com sucesso');
        req.session.save(() => { res.redirect(`/contato/${contato.contato._id}`) } );
        return;

    } catch (e) {
        console.log(e);
    }
}

exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render('404');
    const contato = await Contato.buscaPorId(req.params.id);
    if (!contato) {
        res.render('404');
    }

    res.render('indexContato', { contato });
}

exports.edit = async (req, res) => {
    try {
      console.log("Cheguei");
        if (!req.params.id) return res.render('404');
        const contato = new Contato(req.body, req.session.user._id);
        await contato.edit(req.params.id);
    
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => { res.redirect('/contato') });
            return;
        }
    
        req.flash('success', 'Contato foi editado com sucesso');
        req.session.save(() => { res.redirect('/contato/') } );
        return;    
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}

exports.delete = async (req, res) => {
    try { 
        if (!req.params.id) return res.render('404');

        const contato = await Contato.deleteContato(req.params.id);
        if (!contato) return res.render('404');
        
        req.flash('success', 'Contato apagado com sucesso.');
        req.session.save(() => res.redirect('/'));
        return;
    } catch(e) {
        console.log(e);
        return res.render('404');
    } 
}
