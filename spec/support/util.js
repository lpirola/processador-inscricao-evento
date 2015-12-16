import nodemailer from 'nodemailer'
import stubTransport from 'nodemailer-stub-transport'

class Util {

	mailerTransport (options={}) {
		return nodemailer.createTransport(stubTransport(options))
	}

	validDatasource () {
		return [
			{
				"_xml": "<entry><id>https://spreadsheets.google.com/feeds/list/1gKGxto-RDqS5k2F3TbLXnOoj6IB6RFp18K_MUzBP_Hw/oz2uc0b/public/values/cokwr</id><updated>2015-12-02T20:14:52.525Z</updated><category scheme='http://schemas.google.com/spreadsheets/2006' term='http://schemas.google.com/spreadsheets/2006#list'/><title type='text'>29/09/2015 16:51:21</title><content type='text'>nomecompleto: Lucas Pirola, organização: Circulos, país: Brasil, idade: 19, gênero: masculino, etnia: brasileiro, desejaacamparnoacampamentodajuventude: Não, desejaexporprodutosnafeiradeeconomiasolidária: Não, pagamentodataxadeinscriçãor2000: Boleto Eletrônico - clique aqui, e-mail: lucaspirola@gmail.com, telefone: 1321312, estadobrasileiro: RS</content><link rel='self' type='application/atom+xml' href='https://spreadsheets.google.com/feeds/list/1gKGxto-RDqS5k2F3TbLXnOoj6IB6RFp18K_MUzBP_Hw/oz2uc0b/public/values/cokwr'/><gsx:indicaçãodedataehora>29/09/2015 16:51:21</gsx:indicaçãodedataehora><gsx:nomecompleto>Lucas Pirola</gsx:nomecompleto><gsx:organização>Circulos</gsx:organização><gsx:país>Brasil</gsx:país><gsx:idade>19</gsx:idade><gsx:gênero>masculino</gsx:gênero><gsx:etnia>brasileiro</gsx:etnia><gsx:desejaacamparnoacampamentodajuventude>Não</gsx:desejaacamparnoacampamentodajuventude><gsx:desejaexporprodutosnafeiradeeconomiasolidária>Não</gsx:desejaexporprodutosnafeiradeeconomiasolidária><gsx:pagamentodataxadeinscriçãor2000>Boleto Eletrônico - clique aqui</gsx:pagamentodataxadeinscriçãor2000><gsx:e-mail>lucaspirola@gmail.com</gsx:e-mail><gsx:telefone>1321312</gsx:telefone><gsx:estadobrasileiro>RS</gsx:estadobrasileiro><gsx:possuialgumadeficiência></gsx:possuialgumadeficiência><gsx:sesimqualnecessidadedequetipodeajudaoucuidadoespecial></gsx:sesimqualnecessidadedequetipodeajudaoucuidadoespecial></entry>",
				"id": "https://spreadsheets.google.com/feeds/list/1gKGxto-RDqS5k2F3TbLXnOoj6IB6RFp18K_MUzBP_Hw/oz2uc0b/public/values/cokwr",
				"title": "29/09/2015 16:51:21",
				"content": "nomecompleto: Lucas Pirola, organização: Circulos, país: Brasil, idade: 19, gênero: masculino, etnia: brasileiro, desejaacamparnoacampamentodajuventude: Não, desejaexporprodutosnafeiradeeconomiasolidária: Não, pagamentodataxadeinscriçãor2000: Boleto Eletrônico - clique aqui, e-mail: lucaspirola@gmail.com, telefone: 1321312, estadobrasileiro: RS",
				"_links": [],
				"indicaçãodedataehora": "29/09/2015 16:51:21",
				"nomecompleto": "Lucas Pirola",
				"organização": "Circulos",
				"país": "Brasil",
				"idade": "19",
				"gênero": "masculino",
				"etnia": "brasileiro",
				"desejaacamparnoacampamentodajuventude": "Não",
				"desejaexporprodutosnafeiradeeconomiasolidária": "Não",
				"pagamentodataxadeinscriçãor2000": "Boleto Eletrônico - clique aqui",
				"e-mail": "lucaspirola@gmail.com",
				"status":"",
				"telefone": "1321312",
				"estadobrasileiro": "RS",
				"possuialgumadeficiência": "",
				"sesimqualnecessidadedequetipodeajudaoucuidadoespecial": "",
				"save": function(callback) {
					callback(null, this)
				}
			},
			{
				"_xml": "<entry><id>https://spreadsheets.google.com/feeds/list/1gKGxto-RDqS5k2F3TbLXnOoj6IB6RFp18K_MUzBP_Hw/oz2uc0b/public/values/cpzh4</id><updated>2015-12-02T20:14:52.525Z</updated><category scheme='http://schemas.google.com/spreadsheets/2006' term='http://schemas.google.com/spreadsheets/2006#list'/><title type='text'>29/09/2015 16:51:21</title><content type='text'>nomecompleto: Vivian, organização: Chapeuzinho, país: Brasil, idade: 29, gênero: feminino, etnia: brasileiro, desejaacamparnoacampamentodajuventude: Não, desejaexporprodutosnafeiradeeconomiasolidária: Não, pagamentodataxadeinscriçãor2000: Boleto Eletrônico - clique aqui, e-mail: vivichacha@gmai.com, telefone: 5436546456, estadobrasileiro: RS</content><link rel='self' type='application/atom+xml' href='https://spreadsheets.google.com/feeds/list/1gKGxto-RDqS5k2F3TbLXnOoj6IB6RFp18K_MUzBP_Hw/oz2uc0b/public/values/cpzh4'/><gsx:indicaçãodedataehora>29/09/2015 16:51:21</gsx:indicaçãodedataehora><gsx:nomecompleto>Vivian</gsx:nomecompleto><gsx:organização>Chapeuzinho</gsx:organização><gsx:país>Brasil</gsx:país><gsx:idade>29</gsx:idade><gsx:gênero>feminino</gsx:gênero><gsx:etnia>brasileiro</gsx:etnia><gsx:desejaacamparnoacampamentodajuventude>Não</gsx:desejaacamparnoacampamentodajuventude><gsx:desejaexporprodutosnafeiradeeconomiasolidária>Não</gsx:desejaexporprodutosnafeiradeeconomiasolidária><gsx:pagamentodataxadeinscriçãor2000>Boleto Eletrônico - clique aqui</gsx:pagamentodataxadeinscriçãor2000><gsx:e-mail>vivichacha@gmai.com</gsx:e-mail><gsx:telefone>5436546456</gsx:telefone><gsx:estadobrasileiro>RS</gsx:estadobrasileiro><gsx:possuialgumadeficiência></gsx:possuialgumadeficiência><gsx:sesimqualnecessidadedequetipodeajudaoucuidadoespecial></gsx:sesimqualnecessidadedequetipodeajudaoucuidadoespecial></entry>",
				"id": "https://spreadsheets.google.com/feeds/list/1gKGxto-RDqS5k2F3TbLXnOoj6IB6RFp18K_MUzBP_Hw/oz2uc0b/public/values/cpzh4",
				"title": "29/09/2015 16:51:21",
				"content": "nomecompleto: Vivian, organização: Chapeuzinho, país: Brasil, idade: 29, gênero: feminino, etnia: brasileiro, desejaacamparnoacampamentodajuventude: Não, desejaexporprodutosnafeiradeeconomiasolidária: Não, pagamentodataxadeinscriçãor2000: Boleto Eletrônico - clique aqui, e-mail: vivichacha@gmai.com, telefone: 5436546456, estadobrasileiro: RS",
				"_links": [],
				"indicaçãodedataehora": "29/09/2015 16:51:21",
				"nomecompleto": "Vivian",
				"organização": "Chapeuzinho",
				"país": "Brasil",
				"idade": "29",
				"gênero": "feminino",
				"etnia": "brasileiro",
				"desejaacamparnoacampamentodajuventude": "Não",
				"desejaexporprodutosnafeiradeeconomiasolidária": "Não",
				"pagamentodataxadeinscriçãor2000": "Boleto Eletrônico - clique aqui",
				"e-mail": "vivichacha@gmai.com",
				"telefone": "5436546456",
				"estadobrasileiro": "RS",
				"possuialgumadeficiência": "",
				"status":"",
				"sesimqualnecessidadedequetipodeajudaoucuidadoespecial": "",
				"save": function(callback) {
					callback(null, this)
				}
			}
		]
	}
}

export default Util