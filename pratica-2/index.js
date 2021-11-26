const restify = require('restify');

const server = restify.createServer({
	name: 'Prática 2'
});

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

function debugParams(req) {
	console.log('path  :\t' + JSON.stringify(req.params));
	console.log('query :\t' + JSON.stringify(req.query));
	console.log('body  :\t' + JSON.stringify(req.body));
}

function helloWorld(req, res, next) {
	debugParams(req);
	let nome = req.body.nome;
	let sobrenome = req.body.sobrenome;
	let idade = req.body.idade;
	let formacao = req.body.formacao;
	let rua = req.body.endereco.rua;
	let numero = req.body.endereco.numero;
	let bairro = req.body.endereco.bairro;
	res.setHeader('content-type', 'application/json');
	res.charSet('UTF-8');
	var now = new Date();
	let text = `Boa tarde ${nome} ${sobrenome} @ ${now} !!! ` +
			   `Voce tem ${idade} anos, e possui formacao ${formacao}. ` +
			   `Voce mora na rua ${rua}, numero ${numero}, bairro ${bairro}.`;
	res.send(text);
	next();
};

server.post('/hello', helloWorld);

const port = process.env.PORT || 5000;

server.listen(port, function() {
	console.log(`${server.name} rodando`);
});