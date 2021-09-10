telenor.RenderModuleView = Ember.View.extend({
	classNames: ['tab-pane', 'fade'],
	attributeBindings: ['id', 'name', 'role', 'url'],
	id: null,
	name: null,
	url: null,
	role: "tabpanel",
	template: null,
	initialize: function () {
		var module = this.get("module");
		// console.log('---------------------------module 22----------------------------');
		// console.log(module);
		var id = module.id;
		var url = module.url;
		var name = module.name.decamelize();
		var target = module.target.decamelize(); //.replace('.', "/");
		var t2v = target.replace('.', "/"); //'/akpi/Abacus/bpo/' + target.replace('.', "/");

		// console.log(module);
		// console.log(name);
		//	if (url) t2v = t2v + '/' + id;
		//var t2v = (parseInt(url) == 0) ? t2v : t2v + '/' + id;
		// var t2v = target.replace('.', "/");
		// t2v = t2v + '/' + module.id;
		// target = '/akpi/Abacus/bpo/' + target;
		// console.log(target);
		// console.log(name);
		// console.log('---------------------------module 22----------------------------');
		//this.set("id", name);
		this.set("id", id);
		this.set("name", id);
		this.set("url", url);
		//this.set("id", id);
		if (id === "9") {
			this.classNames.push("in active");
		}
		//console.log(this.container.lookup("view:" + name));
		if (!this.container.lookup("view:" + id)) { //	name = "index";
			this.set("id", id);
			this.set("name", id);
		}

		// var t2v = target.replace('.', "/");
		// console.log('view Start');
		// console.log(t2v);
		// console.log(this.get("template"));
		// console.log(this.get('view'));
		// console.log(this.get('view.module'));
		// console.log(Ember.Handlebars.compile('{{view.module}}'));

		// console.log('view End');
		this.set("template", Ember.Handlebars.compile('{{render "' + t2v + '" }}')); //view.tab
		//this.set("template", Ember.Handlebars.compile('{{render "' + t2v + '" }}')); //  view.module
		//console.log(this.get("template"));
	}.on("init")
});
