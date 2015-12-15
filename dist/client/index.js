'use strict';

var m = require('mithril');

var Datasource = function Datasource(data) {
				data = data || { id: '', name: '', key: '', interval_update: '' };
				this.id = m.prop(data.id);
				this.name = m.prop(data.name);
				this.key = m.prop(data.key);
				this.interval_update = m.prop(data.interval_update);
};
Datasource.list = function (data) {
				return m.request({ method: "GET", url: "/datasources", data: data });
};
Datasource.save = function (data) {
				return m.request({ method: "POST", url: "/datasources", data: data });
};

var DatasourceForm = {
				controller: function controller(args) {
								this.ds = m.prop(args.ds || new Datasource());
				},
				view: function view(ctrl, args) {
								var ds = ctrl.ds();

								return m('.teste', [m('h1', 'Processador de inscrições (beta)'), m('.half', [m('.pure-form.pure-form-aligned', [m('h2', 'Adicionar planilha'), m('.pure-control-group', [m('label', 'Nome'), m("input", { onchange: m.withAttr("value", ds.name), value: ds.name() })]), m('.pure-control-group', [m('label', 'Chave da planilha no Google Drive'), m("input[placeholder=Ex.: 1gKGxto-RDqS5k2F3TbLXnOoj6IB6RFp18K_MUzBP_Hw]", { onchange: m.withAttr("value", ds.key), value: ds.key() })]), m('.pure-control-group', [m('label', 'Intervalo atualização (min)'), m("input", { onchange: m.withAttr("value", ds.interval_update), value: ds.interval_update() })]), m('.pure-controls', [m("button.pure-button.pure-button-primary", { onclick: args.onsave.bind(this, ds) }, "Salvar")])])])]);
				}
};

var DatasourceList = {
				view: function view(ctrl, args) {
								return m('.half.active-spreadsheets', [m('h2', 'Planilhas ativas'), m("table", [args.ds().map(function (ds) {
												return m("tr", [m("td", ds.id), m("td", ds.name), m("td", ds.key), m("td", ds.interval_update)]);
								})])]);
				}
};

var Home = {
				controller: function update() {
								this.datasources = Datasource.list();
								this.save = (function (ds) {
												Datasource.save(ds).then(update.bind(this));
								}).bind(this);
				},
				view: function view(ctrl) {
								return [m.component(DatasourceForm, { onsave: ctrl.save }), m.component(DatasourceList, { ds: ctrl.datasources })];
				}
};

m.mount(document.body, Home);