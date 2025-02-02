// config de importações
const express = require('express');
const { stat } = require('fs');
const path = require('path');

const app = express();
// armazena o email
let emails = [];

// configuração do ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// configuração do public(css)
app.use(express.static('public'));

// configuração do body 
app.use(express.urlencoded({ extended: true })); 

// exibir o cadastro
app.get('/', (req, res) => {
    res.render('index');
});

// criando o caminho do signup
app.post('/signup', (req, res) => {
   const { email } = req.body 

    if(email) {
        emails.push(email)
        res.redirect('/success')
    } else {
        res.redirect('/')
    }
});

// exibir a rota sucesso
app.get('/success', (req, res) => {
    res.render('success');
})

// exibir a rota de emails
app.get('/emails', (req, res) => {
    res.render('email', { emails: emails})
})

// criando a rota /emails/delete
app.post('/emails/delete', (req, res) => {
    const { email } = req.body

    emails = emails.filter( item => item !== email)
    res.redirect('/emails')
}) 

// IMPORTANTE
// config da porta do localhost
const PORT = 3000;
app.listen(PORT, () => console.log("Servidor iniciado!"));
