var express = require('express');
var router = express.Router();




/* GET home page. -- ANTIGA ROTA GET
router.get('/', function(req, res) {
  global.db.findAll((e, docs) => {
    if (e) { return console.log(e); }
    res.render('index', {title: 'Lista de Clientes', docs: docs});
  })
});

*/




//Nova rota GET para teste com login!
router.get('/', function(req, res, next) {
  res.render('login', {message: null});
});

//rota para fazer um GET na página new (rota => localhost:3000/new), ou seja, vamos acessar a página new, vamos trabalhar com a tela new.ejs
router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Novo Cadastro', doc: {"nome": "", "idade" : ""}, action: '/new' });
});


//rota para fazer um POST na página new, inserindo um novo dado no banco de dados.
router.post('/new', function(req, res) {
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  global.db.insert({nome, idade}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/');
      })
});


//rota GET que carregará os dados de um determinado usuário através do id
router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('new', { title: 'Edição de Cliente', doc: docs[0], action: '/edit/' + docs[0]._id });
    });
});



//rota POST que atualizará os dados de um determinado usuário através do id
router.post('/edit/:id', function(req, res) {
  var id = req.params.id;
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  global.db.update(id, {nome, idade}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/');
    });
});


//rota get para deletar determinado usuário via id
router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/');
      });
});


module.exports = router;
