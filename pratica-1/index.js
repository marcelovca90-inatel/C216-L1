var restify = require('restify');

var server = restify.createServer({
	name: 'Prática 1'
});

server.use(restify.plugins.bodyParser());

function helloWorld(req, res, next) {
	res.setHeader('content-type', 'application/json');
	res.charSet('UTF-8');
	var now = new Date();
	res.send(`Greetings world @ ${now} !!!`);
	next();
};

server.get('/hello', helloWorld);

var port = process.env.PORT || 5000;

server.listen(port, function() {
	console.log(`${server.name} rodando`);
});