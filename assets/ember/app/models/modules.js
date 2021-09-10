telenor.Modules = DS.Model.extend({
	name: DS.attr(),
	link: DS.attr(),
	route: DS.attr(),
	module_id: DS.attr(), //DS.belongsTo('modules', {async: true}),
	status: DS.attr(),
	type: DS.attr(),
	sort: DS.attr(),
	font: DS.attr(),
	url: DS.attr(),
	isChecked: (function () {
		return (parseInt(this.get('status')) == 0) ? false : true;
	}).property('status')

});
