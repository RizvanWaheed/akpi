telenor.Caller = DS.Model.extend({
	name:DS.attr(), //DS.belongsTo('headlines', {async: true}),
//	cnic:DS.attr(),
	mobile: DS.attr(),
	msisdn:DS.attr(),
	email: DS.attr(),
	address: DS.attr()
});