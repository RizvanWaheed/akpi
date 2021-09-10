telenor.Callers = DS.Model.extend({
	name:DS.attr(), //DS.belongsTo('headlines', {async: true}),
	mobile: DS.attr(),
	//cnic:DS.attr(),
	msisdn:DS.attr(),
	email: DS.attr(),
	address: DS.attr()
});