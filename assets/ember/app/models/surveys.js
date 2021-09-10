telenor.Surveys = DS.Model.extend({
	name:DS.attr(),
	from_date:DS.attr(),
    to_date:DS.attr(),
    monitoringFors:DS.hasMany('monitoringFors', {async: false}),
	surveyQuestions:DS.hasMany('surveyQuestions', {async: false}),
    // state_id:DS.attr(),
    // remarks:DS.attr(),
    created_by:DS.belongsTo('users', {async: true}),
    created:DS.attr(),
	state:DS.attr(),
	campaigns:DS.attr(),
	questions:DS.attr(),
	users:DS.attr()
	// photo: function() {
	//     return this.get('path')+this.get('image');
    // }.property('path')
});
