const restify = require('restify');

const server = restify.createServer({
	name: 'Prática 3'
});

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

function debug(req) {
	console.log('path  :\t' + JSON.stringify(req.params));
	console.log('query :\t' + JSON.stringify(req.query));
	console.log('body  :\t' + JSON.stringify(req.body));
}

var contador = 0;
const alunos = []; // banco de dados "dummy"

function inserir(req, res, next) {
	res.setHeader('content-type','application/json');
	res.charSet('UTF-8');
	let aluno = {
		"id": ++contador,
		"nome": req.body.nome,
		"curso": req.body.curso,
		"nascimento": req.body.nascimento
	};
	alunos.push(aluno);
	res.send(aluno);
	next();
};

function listar(req, res, next) {
	res.setHeader('content-type','application/json');
	res.charSet('UTF-8');
	res.send(alunos);
	next();
};

function atualizar(req, res, next) {
	res.setHeader('content-type','application/json');
	res.charSet('UTF-8');
	
	var foundIdx;
	for (var i in alunos) {
		if (alunos[i].id == req.body.id) {
			alunos[i].nome = req.body.nome;
			alunos[i].curso = req.body.curso;
			alunos[i].nascimento = req.body.nascimento;
			foundIdx = i;
		}
	}

	res.send(alunos[foundIdx]);
	next();
};

function excluir(req, res, next) {
	res.setHeader('content-type','application/json');
	res.charSet('UTF-8');
	
	var contExcluidos = 0;
	for (var i in alunos) {
		if (alunos[i].id == req.body.id) {
			alunos.splice(i, 1);
			contExcluidos++;
		}
	}
	res.send(contExcluidos + ' registro(s) excluido(s).');
	next();
};

function helloWorld(req, res, next) {
	res.setHeader('content-type','application/json');
	res.charSet('UTF-8');
	debug(req);
	let nome = req.body.nome;
	let sobrenome = req.body.sobrenome;	
	let endereco = req.body.endereco.cidade + ", " + req.body.endereco.estado;
	res.send('Hello ' + nome + ' ' + sobrenome + ' @ ' + endereco);
	next();
};

const prefix = '/aluno';

server.post(prefix + '/inserir', inserir);
server.get(prefix + '/listar', listar);
server.post(prefix + '/atualizar', atualizar);
server.post(prefix + '/excluir', excluir);

const port = process.env.PORT || 5000;

server.listen(port, function() {
	console.log('%s rodando', server.name);
});