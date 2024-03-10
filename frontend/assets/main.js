import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './css/style.css';
import Login from './modules/Login.js';
import Contato from './modules/Contato.js';

// Página LOGIN: (Verificação)
const login = new Login('.form-cadastro');
const cadastro = new Login('.form-login');

// Página CONTATO: (Verificação)
const criarContato = new Contato('.form-contato')

login.init();
cadastro.init();
criarContato.init();