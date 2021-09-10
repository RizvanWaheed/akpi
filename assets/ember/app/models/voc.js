telenor.Voc = DS.Model.extend({
	trials: DS.attr(),
	connectivity_status: DS.attr(),
	satisfaction_status: DS.attr(),
	campaign: DS.attr(),
	segment: DS.attr(),
	dsat_reason: DS.attr(),
	category: DS.attr(),
	feedback: DS.attr(),
	suggestion: DS.attr()
});
