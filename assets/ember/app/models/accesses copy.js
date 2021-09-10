telenor.Accesses = DS.Model.extend({
	user_id:DS.belongsTo('employees', {async: true}),
	level:DS.attr(),
	module_id:DS.belongsTo('module', {async: true}),
	status:DS.attr(),
	isChecked:(function() {
	    return (parseInt(this.get('status')) == 0)?false:true;
    }).property('status')
});