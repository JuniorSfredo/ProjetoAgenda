import validator from "validator";

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;

        if (!validator.isEmail(emailInput.value)) {
            this.createError(emailInput, '* Email inválido', error);
            error = true;
        }

        if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            this.createError(passwordInput, '* A senha deve possuir entre 3 e 50 caracteres', error);
            error = true;
        }

        if (!error) el.submit();

        this.limparCampos();
        setTimeout(() => {
            this.apagarErros();
        }, 4000)
    }

    createError(el, msg) {
        if (!el.nextSibling || el.nextSibling.className !== 'erro') { 
            const pErro = document.createElement('p');
            const textErro = document.createTextNode(msg);
            pErro.appendChild(textErro);
            pErro.classList.add('erro');

            const elNode = el.parentNode;

            elNode.insertBefore(pErro, el.nextSibling);
        } else {
            return;
        }
    }

    limparCampos() {
        const campos = document.querySelectorAll('.form-control');

        campos.forEach((campo)=> {
            campo.value = '';
        });
    }

    apagarErros() {
        const erros = document.querySelectorAll('.erro');

        erros.forEach((erro) => {
            erro.remove();
        });
    }       
}