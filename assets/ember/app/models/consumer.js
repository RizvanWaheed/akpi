telenor.Consumer = DS.Model.extend({
	//topic_id:DS.belongsTo('titles', {async: true}),
	name:DS.attr(), //DS.belongsTo('headlines', {async: true}),
	cnic:DS.attr(),
	msisdn:DS.attr(),
	brandAmbassadorID: DS.attr(),
	brandID: DS.attr()
});