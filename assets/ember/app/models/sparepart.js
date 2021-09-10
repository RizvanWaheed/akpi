telenor.Sparepart = DS.Model.extend({
	name:DS.attr(),
	product_id:DS.attr(),
	price: DS.attr(),
	code: DS.attr()
	//reporting_id: DS.attr()//belongsTo('users', {async: true})
	//hasmany
});