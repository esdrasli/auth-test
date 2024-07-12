const forge = require('node-forge');
const fs = require('fs');

const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);

const privatePem = forge.pki.privateKeyToPem(privateKey);
const publicPem = forge.pki.publicKeyToPem(publicKey);

fs.writeFileSync('private.pem', privatePem);
fs.writeFileSync('public.pem', publicPem);

console.log('Private Key:', privatePem);
console.log('Public Key:', publicPem);
