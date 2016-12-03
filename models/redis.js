//Redis Connection
var redis = require('redis');
if(process.env.REDISTOGO_URL) {
	var rtg = require('url').parse(process.env.REDISTOGO_URL);
	var client = redis.createClient(rtg.port, rtg.hostname);
	client.auth(rtg.auth.split(":")[1]);
} else {
	var client = redis.createClient();
	client.select((process.env.NODE_ENV || 'development').length);
}
module.exports = client;
//End of Redis Connection

client.hset('courses', 'COMP', 'Melhor Engenharia');
client.hset('courses', 'MEC', 'Pior Engenharia');
client.hset('courses', 'ELE', 'Nerds bobos');

client.hset('students', 'Cássio', 'Meu nome eh Cássio');
client.hset('students', 'Gustavo', 'V de Vibrana!');
client.hset('students', 'Eric', 'Um garoto polêmico');

//Redis relation one-to-many
client.sadd('COMP', 'Cássio');
client.sadd('COMP', 'Eric');
client.sadd('MEC', 'Gustavo');

module.exports = client;