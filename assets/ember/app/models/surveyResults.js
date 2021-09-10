telenor.SurveyResults = DS.Model.extend({
	survey_id:DS.belongsTo('surveys', {async: true}),
	question_id:DS.belongsTo('surveyQuestions', {async: true}),
	user_id:DS.belongsTo('users', {async: true}),
	result:DS.attr(),
	created_by:DS.attr(),
	created:DS.belongsTo('users', {async: true})
	
//	user:DS.belongsTo('user', {async: true})
	
});
