telenor.Spareparts = DS.Model.extend({
	name:DS.attr(),
	product_id: DS.belongsTo('products', {async: false}),
	price: DS.attr(),
	code: DS.attr()
	//reporting_id: DS.attr()//belongsTo('users', {async: true})
	//hasmany
});