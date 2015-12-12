var m = require('mithril')



var todo = {};

//for simplicity, we use this component to namespace the model classes

//the Todo class has two properties
todo.Todo = function(data) {
    this.description = m.prop(data.description);
    this.done = m.prop(false);
};

//the TodoList class is a list of Todo's
todo.TodoList = Array;



//model
var Page = {
	list: function() {
		return m.request({method: "GET", url: "/datasources"});
	}
};

var Demo = {
	//controller
	controller: function() {
		var pages = Page.list();
		return {
			pages: pages,
			rotate: function() {
				pages().push(pages().shift());
			}
		}
	},

	//view
	view: function(ctrl) {
		return m("div", [
			ctrl.pages().map(function(page) {
				return m("a", {href: page.url}, page.title);
			}),
			m("button", {onclick: ctrl.rotate}, "Rotate links")
		]);
	}
};


//initialize
m.mount(document.getElementsByTagName("body"), Demo);
