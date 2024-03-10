import validator from "validator";

export default class Contato {
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
        
        const nomeInput = el.querySelector('input[name="nome"]');
        const sobrenomeInput = el.querySelector('input[name="sobrenome"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telefoneInput = el.querySelector('input[name="telefone"]');

        let error = false;

        if (!nomeInput.value) {
            error = true;
            this.createError(nomeInput, '*    Campo nome obrigatório.');
        }
        if (!validator.isEmail(emailInput.value) && !telefoneInput.value) {
            error = true;
            // Criando apresentação de erros para ambos os campos:
            if (!validator.isEmail(emailInput.value)) this.createError(emailInput, '*   Campo e-mail inválido.');
            if (!telefoneInput.value) this.createError(telefoneInput, '*   Campo telefone inválido.')
        }
        if (!validator.isEmail(emailInput.value) && emailInput.value) {
            error = true;
            this.createError(emailInput, '*   Campo e-mail inválido.')
        }

        if (!error) el.submit();
        const campos = document.querySelectorAll('.form-control');
        this.limparCampos(campos);
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

    limparCampos(campos) {
        campos.forEnpmach((campo=> {
            campo.value = '';
        }));
    }

    apagarErros() {
        const erros = document.querySelectorAll('.erro');

        erros.forEach((erro) => {
            erro.remove();
        });
    }
}