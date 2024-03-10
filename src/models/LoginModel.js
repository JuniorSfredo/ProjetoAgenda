const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {
        this.valida();
        if (this.errors.length > 0) return;

        this.user = await LoginModel.findOne( { email: this.body.email } );
        if (!this.user) {
            this.errors.push('E-mail Inválido!');
            return;
        }

        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha Inválida');
            this.user = null;
            return;
        }
    }

    async register() {
        this.valida();
        if (this.errors.length > 0) return;

        await this.userExist()

        if (this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);
    }

    async userExist() {
        const user = await LoginModel.findOne( { email: this.body.email } );

        if (user) this.errors.push('Usuário já existente');
    }

    valida() {
        this.cleanUp();

        // Validação
        // Email válido
        if (!validator.isEmail(this.body.email)) {
            this.errors.push('Email inválido!');
        }

        // A senha deve possuir entre 3 e 50 caracteres
        if (this.body.password < 3 || this.body.password > 50) {
            this.errors.push('A senha deve estar entre 3 e 50 caracteres');
        }
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
              this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login;