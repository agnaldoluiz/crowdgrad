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

client.hset('courses', 'COMP', 'Engenharia de Computação');
client.hset('courses', 'MEC', 'Engenharia Mecânica-Aeronáutica');
client.hset('courses', 'ELE', 'Engenharia Eletrônica');
client.hset('courses', 'AER', 'Engenharia Aeronáutica');
client.hset('courses', 'AESP', 'Engenharia Aeroespacial');


client.hmset('students:1', 'name', 'Cássio', 'Joke', 'Vou dançar Rihanna', 'money', '10');
client.hmset('students:2', 'name', 'Gustavo', 'Joke', 'Vou entrar no rancho marchando!', 'money', '20');
client.hmset('students:3', 'name', 'Eric', 'Joke', 'Vou apagar a luz da festa da AGITA', 'money', '40');

//Redis relation one-to-many
client.sadd('COMP', 'Cássio');
client.sadd('COMP', 'Eric');
client.sadd('MEC', 'Gustavo');

module.exports = client;