telenor.Accesses = DS.Model.extend({
	name:DS.attr(),
	link:DS.attr(),
	module_id:DS.attr(),//belongsTo('access', {async: true}),
	status:DS.attr(),
	isChecked:(function() {
	    return (parseInt(this.get('status')) == 0)?false:true;
    }).property('status')
});