exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
        console.log(err);
    }
    next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrftoken = req.csrfToken();
    next();
}

exports.meuMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
}

exports.loginRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash('errors', 'Você não está logado!')
        req.session.save(() => {
            res.render('/')});
    }
    next();
}
