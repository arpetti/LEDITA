The certificate and private key committed in github are intended for development purposes only.
These should be replaced with a signed cert for production.
```
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
```
[Reference](http://docs.nodejitsu.com/articles/HTTP/servers/how-to-create-a-HTTPS-server)