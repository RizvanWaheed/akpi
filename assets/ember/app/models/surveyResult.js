telenor.SurveyResult = DS.Model.extend({
	survey_id:DS.attr(),
	question_id:DS.attr(),
	user_id:DS.attr(),
	result:DS.attr(),
	created_by:DS.attr(),
	created:DS.attr()
	
//	user:DS.belongsTo('user', {async: true})
	
});
