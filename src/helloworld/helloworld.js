module.exports = {
	helloWorld: helloWorld
}

function helloWorld(language) {
	switch (language) {
		case 'nl' : return 'Hallo wereld!';
		case 'es' : return '¡Hola mundo!';
		default: return 'Hello world!';
	}
}