[![Stories in Ready](https://badge.waffle.io/lpirola/processador-inscricao-evento.png?label=ready&title=Ready)](https://waffle.io/lpirola/processador-inscricao-evento)
# processador-inscricao-evento
Processador de inscrições em eventos que utiliza uma planilha no Google Drive para controlar o envio de e-mail com boleto para pagamento e confirmação da inscrição

## Dependências

* Javascript ES6 (Babel)
* Jasmine
* Nodemailer
* Google Speadsheet

## Adicionar variáveis de ambiente

```
export MAIL_SERVICE='Gmail'
export MAIL_USER='xxxx@gmail.com'
export MAIL_PASS='xxxx'
export GOOGLE_SPREADSHEET_KEY='xxxxx'
export GOOGLE_CREDS='{"type": "service_account","private_key_id": "","private_key": "","client_email": "","client_id": "","auth_uri": "","token_uri": "","auth_provider_x509_cert_url": "","client_x509_cert_url": ""}'
```

## Comandos

```
./node_modules/.bin/babel-node src check
./node_modules/.bin/babel-node src process
```

## Testes

Para rodar os testes, as variáveis de ambiente não podem estar definidas

```
npm test
```
