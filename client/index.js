var m = require('mithril')
var moment = require('moment')

var Datasource = function(data) {
    data = data || {id:'', name:'', key:'', interval_update:''}
    this.id = m.prop(data.id)
	this.name = m.prop(data.name)
    this.key = m.prop(data.key)
    this.interval_update = m.prop(data.interval_update)
}
Datasource.list = function(data) {
    return m.request({method: "GET", url: "/datasources", data: data})
}
Datasource.save = function(data) {
    return m.request({method: "POST", url: "/datasources", data: data})
}
var Job = function (data) {}
Job.list = function(data) {
    return m.request({method: "GET", url: "/fila/jobs/0..1000/desc", data: data})
}

var DatasourceForm = {
    controller: function(args) {
        this.ds = m.prop(args.ds || new Datasource())
    },
    view: function(ctrl, args) {
        var ds = ctrl.ds()

        return m('.teste', [
			m('h1', 'Processador de inscrições (beta)'),
			m('.half', [
				m('.pure-form.pure-form-aligned', [
					m('h2', 'Adicionar planilha'),
					m('.pure-control-group', [
						m('label', 'Nome'),
						m("input.pure-input-2-3",
							{onchange: m.withAttr("value", ds.name), value: ds.name()})
					]),
					m('.pure-control-group', [
						m('label', 'Chave da planilha no Google Drive'),
						m("input.pure-input-2-3[placeholder=Ex.: 1gKGxto-RDqS5k2F3TbLXnOoj6IB6RFp18K_MUzBP_Hw]",
							{onchange: m.withAttr("value", ds.key), value: ds.key()})
					]),
					m('.pure-control-group', [
						m('label', 'Intervalo atualização (min)'),
						m("input.pure-input-2-3",
							{onchange: m.withAttr("value", ds.interval_update), value: ds.interval_update()})
					]),
					m('.pure-controls', [
						m("button.pure-button.pure-button-primary", {onclick: args.onsave.bind(this,ds)}, "salvar")
					])
				])
			])
        ])
    }
}

var JobList = {
	view : function (ctrl, args) {
		return m('.job-list', [
			m('h2', [
				'Histórico processamentos ',
				m('a.pure-button.pure-button-primary[href=/fila/]', m('i.fa.fa-cogs'))
			]),
			m("table.pure-table", [
				m('thead', m('tr', [
					m('th', 'id'),
					m('th', 'status'),
					m('th', 'tipo'),
					m('th', 'duração (s)'),
					m('th', 'resultado'),
					m('th', 'última atualização'),
					m('th', '')
				])),
				args.jobs().map(function(j) {
					return m("tr", [
						m("td", j.id),
						m("td", j.state),
						m("td", j.type),
						m("td", moment.duration(Number(j.duration)).asSeconds()),
						m("td", j.result),
						m("td", moment(Number(j.updated_at)).fromNow()),
					])
				})
			])
		])
	}
}

var DatasourceList = {
    view: function(ctrl, args) {
        return m('.half.active-spreadsheets', [
			m('h2', 'Planilhas ativas'),
			m("table.pure-table", [
				m('thead', m('tr', [
					m('th', 'id'),
					m('th', 'nome'),
					m('th', 'chave'),
					m('th', 'intervalo'),
					m('th', '')
				])),
				args.ds().map(function(ds) {
					return m("tr", [
						m("td", ds.id),
						m("td", ds.name),
						m("td", m('i.fa fa-key[title='+ds.key+']')),
						m("td", moment.duration(Number(ds.interval_update)).asMinutes() + ' minutos'),
						m('td', m('a.pure-button.button-warning[href=#]', 'excluir'))

					])
				})
			])
		])
    }
}

var Home = {
    controller: function update() {
        this.datasources = Datasource.list()
        this.jobs = Job.list()
        this.save = function(ds) {
            Datasource.save(ds).then(update.bind(this))
        }.bind(this)
    },
    view: function(ctrl) {
        return [
            m.component(DatasourceForm, {onsave: ctrl.save}),
            m.component(DatasourceList, {ds: ctrl.datasources}),
            m.component(JobList, {jobs: ctrl.jobs})
        ]
    }
}

m.mount(document.body, Home);
