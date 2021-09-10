telenor.Survey = DS.Model.extend({
	name:DS.attr(),
	from_date:DS.attr(),
    to_date:DS.attr(),
	monitoringFors:DS.attr(),
	surveyQuestions:DS.attr(),
    created_by:DS.attr(),
    created:DS.attr(),
	state:DS.attr(),
	campaigns:DS.attr(),
	questions:DS.attr(),
	users:DS.attr()
});
