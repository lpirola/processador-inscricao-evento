[![Stories in Ready](https://badge.waffle.io/lpirola/processador-inscricao-evento.png?label=ready&title=Ready)](https://waffle.io/lpirola/processador-inscricao-evento)
[![Documentation](https://doc.esdoc.org/github.com/lpirola/processador-inscricao-evento/badge.svg)](https://doc.esdoc.org/github.com/lpirola/processador-inscricao-evento/)
[![Test Coverage](https://codeclimate.com/github/lpirola/processador-inscricao-evento/badges/coverage.svg)](https://codeclimate.com/github/lpirola/processador-inscricao-evento/coverage)

# Processador de inscricões em eventos

É utilizado uma planilha no Google Drive para controlar o envio de e-mail com boleto para pagamento e confirmação da inscrição.

## Dependências

* Javascript ES6 (Babel)
* Jasmine
* Nodemailer
* Google Speadsheet

## Modo de usar coluna status

A sequência e os valores disponíveis são: "", "Boleto Enviado", "Boleto Pago", "Confirmado", "Inválido"

## Adicionar variáveis de ambiente

```
export REDIS_URL='redis://127.0.0.1:6379'
export DATABASE_URL='mysql://root@127.0.0.1:/processador-inscricao-evento'
export MAIL_SERVICE='Gmail'
export MAIL_USER='xxxx@gmail.com'
export MAIL_PASS='xxxx'
export GOOGLE_CREDS='{"type": "service_account","private_key_id": "","private_key": "","client_email": "","client_id": "","auth_uri": "","token_uri": "","auth_provider_x509_cert_url": "","client_x509_cert_url": ""}'
```

## Docs

Para ver a documentação, é necessário rodar os comandas abaixo. Na conclusão, será criado uma pasta chamada docs, que conterá arquivos html gerados para facilitar navegação

```
npm install --dev
npm run generate-docs
```

## Testes

Para rodar os testes, as variáveis de ambiente não podem estar definidas. Algumas planilhas são utilizadas para realizar os testes. https://drive.google.com/folderview?id=0Bzc8qNdwn4IRcnNHYW1NMVZHUW8&usp=sharing

```
npm install --dev
npm test
```
