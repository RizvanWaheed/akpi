telenor.QualityQltymonitoringsController = Ember.ArrayController.extend({
	pageName:'qualityQltymonitorings',

	totalCollaborate:16.542,
	totalAgile:27.125,
	totalFocus:26.167,
	totalBold:13.083,
	totalOwnership:13.083,
	totalWow:4,
	monoBy:'Customer',

	agents:Ember.A(),
	teamleads:Ember.A(),
	monitoredBy:Ember.A(),
	country:Ember.A(),
	city:Ember.A(),
	emailLanguage:Ember.A(),
	emailType:Ember.A(),
	emailDriver:Ember.A(),

	satisfaction:Ember.A(),
	satisfactionReason:Ember.A(),
	monitoringProcess:Ember.A(),

	monitoringFatal:Ember.A(),

	ticketQualityMonitor:'',
	dateQualityMonitor:'',
	timeQualityMonitor:'',
	agentNameQualityMonitor:'',
	tlNameQualityMonitor:'',
	monitoredByQualityMonitor:'',
	customerNameQualityMonitor:'',
	countryQualityMonitor:'',
	cityQualityMonitor:'',
	emailLanguageQualityMonitor:'',
	emailTypeQualityMonitor:'',
	emailDriverQualityMonitor:'',

	customerSatisfaction:'',
	customerSatisfactionReason:'',
	monitoringProcessType:'',
	monitoringGeneralComment:'',


	customersNameComment:'',
	openingComment:'',
	closingComment:'',
	extraAssistanceComment:'',
	resolvedComment:'',

	accountVerificationComment:'',
	historyComment:'',
	probingQuestionsComment:'',
	sequenceComment:'',
	proofreadingComment:'',
	languageComment:'',

	accuracyComment:'',
	relevanceComment:'',
	sufficiencyComment:'',
	typicalityComment:'',

	actionValidationComment:'',
	documentationNReportingComment:'',

	followingUpComment:'',
	callBackComment:'',

	initiationComment:'',
	writingSkillsComment:'',




	

	///////////// Tab 1 //////////////
	avoidingNickName:1,
	userdNameOnCnoc:1,
	properGreeting:1,
	apologizedForDelay:1,
	properClosing:1,
	completeClosing:1,
	offerExteraHelp:1,
	closingWithAcknowledgment:1,
	customersNameScore:(function(){
		if(this.get('avoidingNickName') == 1 && this.get('userdNameOnCnoc') == 1) return 2.5;
		else return 0;		
	}).property('avoidingNickName' ,'userdNameOnCnoc'),
	openingScore:(function(){
		if(this.get('properGreeting') == 1 && this.get('apologizedForDelay') ==1) return 2.5;
		else return 0;
	}).property('properGreeting' ,'apologizedForDelay'),
	closingScore:(function(){
		if(this.get('properClosing') == 1 && this.get('completeClosing') ==1) return 2.5;
		else return 0;
	}).property('properClosing' ,'completeClosing'),
	extraAssistanceScore:(function(){
		if(this.get('offerExteraHelp')==1) return 2.5;
		else return 0;  	
	}).property('offerExteraHelp'),
	resolvedScore:(function(){
		if(this.get('closingWithAcknowledgment')==1) return 6.542;
		else return 0;
	}).property('closingWithAcknowledgment'),
	gainedCollaborate: (function() {
    	return this.roundNumber(this.get('customersNameScore')+this.get('openingScore')+this.get('closingScore')+this.get('extraAssistanceScore')+this.get('resolvedScore'),3);
  	}).property('customersNameScore','openingScore','closingScore','extraAssistanceScore','resolvedScore'),


	///////////// Tab 2 //////////////
	verifiedRegisteredEmail:1,
	checkedCustomersHistory:1,
	askedRelatedQuestions:1,
	highlightingSufficientInformation:1,
	avoidedRepeatingTemplates:1,
	greetingBodyClosure:1,
	grammar:1,
	spelling:1,
	punctuation:1,
	friendly:1,
	formal:1,
	noSlang:1,
	noJargons:1, 
	noNegativeWords:1,
	accountVerificationScore:(function(){
		if(this.get('verifiedRegisteredEmail')==1) return 6.542;
		else return 0;
	}).property('verifiedRegisteredEmail'),
	historyScore:(function(){
		if(this.get('checkedCustomersHistory')==1) return 6.542;
		else return 0;  	
	}).property('checkedCustomersHistory'),
	probingQuestionsScore:(function(){
		if(this.get('askedRelatedQuestions')==1 && this.get('highlightingSufficientInformation')==1) return 6.542;
		else return 0; 
	}).property('askedRelatedQuestions' ,'highlightingSufficientInformation'),
	sequenceScore:(function(){
		if(this.get('avoidedRepeatingTemplates')==1 && this.get('greetingBodyClosure')==1) return 2.5;
		else return 0; 
	}).property('avoidedRepeatingTemplates' ,'greetingBodyClosure'),
	proofreadingScore:(function(){
		if(this.get('grammar')==1 && this.get('spelling')==1 && this.get('punctuation')==1) return 2.5;
		else return 0; 
	}).property('grammar' ,'spelling', 'punctuation'),
	languageScore:(function(){
		if(this.get('friendly')==1 && this.get('formal')==1 && this.get('noSlang')==1 && this.get('noJargons')==1 && this.get('noNegativeWords')==1) return 2.5;
		else return 0; 
	}).property('friendly' ,'formal', 'noSlang', 'noJargons', 'noNegativeWords'),
	gainedAgile: (function() {
    	return this.roundNumber(parseFloat(this.get('accountVerificationScore'))+parseFloat(this.get('historyScore'))+parseFloat(this.get('probingQuestionsScore'))+this.get('sequenceScore')+this.get('proofreadingScore')+this.get('languageScore'),3);
  	}).property('accountVerificationScore','historyScore','probingQuestionsScore','sequenceScore','proofreadingScore','languageScore'),

	///////////// Tab 3 //////////////

	accurateRates:1,
	mapTracking:1,
	currency:1,
	correctTemplate:1,
	providingRelevantInformation:1,
	promoCodes:1,
	sufficientTemplate:1,
	remainingCredits:1,
	informationConfidentiality:1,
	accuracyScore:(function(){
		if(this.get('accurateRates')==1 && this.get('mapTracking')==1 && this.get('currency')==1) return 6.542;
		else return 0; 
	}).property('accurateRates' ,'mapTracking', 'currency'),
	relevanceScore:(function(){
		if(this.get('correctTemplate')==1 && this.get('providingRelevantInformation')==1 ) return 6.542;
		else return 0; 
	}).property('correctTemplate' ,'providingRelevantInformation'),
	sufficiencyScore:(function(){
		if(this.get('promoCodes')==1 && this.get('sufficientTemplate')==1 && this.get('remainingCredits')==1) return 6.542;
		else return 0; 
	}).property('promoCodes' ,'sufficientTemplate', 'remainingCredits'),
	typicalityScore:(function(){
		if(this.get('informationConfidentiality')==1) return 6.542;
		else return 0;
	}).property('informationConfidentiality'),
	gainedFocus: (function() {
    	return this.roundNumber(this.get('accuracyScore')+this.get('relevanceScore')+this.get('typicalityScore')+this.get('sufficiencyScore'),3);
  	}).property('accuracyScore','relevanceScore','typicalityScore','sufficiencyScore'),

	///////////// Tab 4 //////////////
	accurateAmount:1,
	childTicketAction:1,
	currencyAuthorizedRefunds:1,
	creditReason:1,
	ticketSubjectTicketContentQualityReason:1,
	actionValidationScore:(function(){
		if(this.get('accurateAmount')==1 && this.get('childTicketAction')==1 && this.get('currencyAuthorizedRefunds')==1) return 6.542;
		else return 0; 
	}).property('accurateAmount' ,'childTicketAction', 'currencyAuthorizedRefunds'),
	documentationNReportingScore:(function(){
		if(this.get('creditReason')==1 && this.get('ticketSubjectTicketContentQualityReason')==1 ) return 6.542;
		else return 0;
	}).property('creditReason' ,'ticketSubjectTicketContentQualityReason'),
	gainedBold: (function() {
    	return this.roundNumber(this.get('actionValidationScore')+this.get('documentationNReportingScore'),3);
  	}).property('actionValidationScore','documentationNReportingScore'),

	///////////// Tab 5 //////////////
	onTimeResponseKeepingPromises:1,
	retentionPingPongEmails:1,
	followingUpScore:(function(){
		if(this.get('onTimeResponseKeepingPromises')==1) return 6.542;
		else return 0;
	}).property('onTimeResponseKeepingPromises'),
	callBackScore:(function(){
		if(this.get('retentionPingPongEmails')==1) return 6.542;
		else return 0;
	}).property('retentionPingPongEmails'),
	gainedOwnership: (function() {
    	return this.roundNumber(this.get('callBackScore')+this.get('followingUpScore'),3);
  	}).property('callBackScore','followingUpScore'),

	///////////// Tab 6 //////////////
	newOffersAlternativeSolutions:0,
	usageOfScreenshotsHyperlinks:0,
	exceptionalWritingSkills:0,
	initiationScore:(function(){
		if(this.get('newOffersAlternativeSolutions')==1 && this.get('usageOfScreenshotsHyperlinks')==1 ) return 2;
		else return 0;
	}).property('newOffersAlternativeSolutions' ,'usageOfScreenshotsHyperlinks'),
	writingSkillsScore:(function(){
		if(this.get('exceptionalWritingSkills')==1 ) return 2;
		else return 0;
	}).property('exceptionalWritingSkills'),
	gainedWow: (function() {
    	return this.get('writingSkillsScore')+this.get('initiationScore');
  	}).property('writingSkillsScore','initiationScore'),


	gainedTotal: (function() {
    	return this.roundNumber(parseFloat(this.get('gainedCollaborate'))+parseFloat(this.get('gainedAgile'))+parseFloat(this.get('gainedFocus'))+this.get('gainedBold')+this.get('gainedOwnership')+this.get('gainedWow'),3);
  	}).property('gainedCollaborate','gainedAgile','gainedFocus','gainedBold','gainedOwnership','gainedWow'),


	gainedMadel: (function() {
    	//return parseFloat(this.get('gainedTotal'));
    	if(this.get('gainedTotal') < 88) return 'Fail';
    	else if(this.get('gainedTotal') >= 88 && this.get('gainedTotal') < 95) return 'Bronze Call';
    	else if(this.get('gainedTotal') >= 95 && this.get('gainedTotal') < 98) return 'Silver Call';
    	else if(this.get('gainedTotal') >= 98)	return 'Golden Call'; 

  	}).property('gainedTotal'),
  	gainedColor: (function() {
    	//return parseFloat(this.get('gainedTotal'));
    	if(this.get('gainedMadel') == 'Fail') return 'text-red';
    	else if(this.get('gainedMadel') == 'Bronze Call' ) return 'text-yellow';
    	else if(this.get('gainedMadel') == 'Silver Call' ) return 'text-muted';
    	else if(this.get('gainedMadel') == 'Golden Call')	return 'text-yellow'; 

  	}).property('gainedMadel'),
  	funcMonitoringFatalType:function(){
  		var self  = this;
		var value = this.get('monitoringFatalType');

		if(typeof value === 'undefined' || value == '' || value <= 0){
			return false;
		}
		if(value == 1){
			this.set('avoidingNickName',1);
			this.set('userdNameOnCnoc',1);
			this.set('properGreeting',1);
			this.set('apologizedForDelay',1);
			this.set('properClosing',1);
			this.set('completeClosing',1);
			this.set('offerExteraHelp',1);
			this.set('closingWithAcknowledgment',1);
			this.set('verifiedRegisteredEmail',1);
			this.set('checkedCustomersHistory',1);
			this.set('askedRelatedQuestions',1);
			this.set('highlightingSufficientInformation',1);
			this.set('avoidedRepeatingTemplates',1);
			this.set('greetingBodyClosure',1);
			this.set('grammar',1);
			this.set('spelling',1);
			this.set('punctuation',1);
			this.set('friendly',1);
			this.set('formal',1);
			this.set('noSlang',1);
			this.set('noJargons',1);
			this.set('noNegativeWords',1);
			this.set('accurateRates',1);
			this.set('mapTracking',1);
			this.set('currency',1);
			this.set('correctTemplate',1);
			this.set('providingRelevantInformation',1);
			this.set('promoCodes',1);
			this.set('sufficientTemplate',1);
			this.set('remainingCredits',1);
			this.set('informationConfidentiality',1);
			this.set('accurateAmount',1);
			this.set('childTicketAction',1);
			this.set('currencyAuthorizedRefunds',1);
			this.set('creditReason',1);
			this.set('ticketSubjectTicketContentQualityReason',1);
			this.set('onTimeResponseKeepingPromises',1);
			this.set('retentionPingPongEmails',1);
		//	this.set('newOffersAlternativeSolutions',1);
		//	this.set('usageOfScreenshotsHyperlinks',1);
		//	this.set('exceptionalWritingSkills',1);
  		}else{
  			this.set('avoidingNickName',0);
			this.set('userdNameOnCnoc',0);
			this.set('properGreeting',0);
			this.set('apologizedForDelay',0);
			this.set('properClosing',0);
			this.set('completeClosing',0);
			this.set('offerExteraHelp',0);
			this.set('closingWithAcknowledgment',0);
					///////////// Tab 2 //////////////
			this.set('verifiedRegisteredEmail',0);
			this.set('checkedCustomersHistory',0);
			this.set('askedRelatedQuestions',0);
			this.set('highlightingSufficientInformation',0);
			this.set('avoidedRepeatingTemplates',0);
			this.set('greetingBodyClosure',0);
			this.set('grammar',0);
			this.set('spelling',0);
			this.set('punctuation',0);
			this.set('friendly',0);
			this.set('formal',0);
			this.set('noSlang',0);
			this.set('noJargons',0);
			this.set('noNegativeWords',0);
			///////////// Tab 3 //////////////

			this.set('accurateRates',0);
			this.set('mapTracking',0);
			this.set('currency',0);
			this.set('correctTemplate',0);
			this.set('providingRelevantInformation',0);
			this.set('promoCodes',0);
			this.set('sufficientTemplate',0);
			this.set('remainingCredits',0);
			this.set('informationConfidentiality',0);

			///////////// Tab 4 //////////////
			this.set('accurateAmount',0);
			this.set('childTicketAction',0);
			this.set('currencyAuthorizedRefunds',0);
			this.set('creditReason',0);
			this.set('ticketSubjectTicketContentQualityReason',0);
			///////////// Tab 5 //////////////
			this.set('onTimeResponseKeepingPromises',0);
			this.set('retentionPingPongEmails',0);
			///////////// Tab 6 //////////////
			this.set('newOffersAlternativeSolutions',0);
			this.set('usageOfScreenshotsHyperlinks',0);
			this.set('exceptionalWritingSkills',0);
  		}
  	}.observes('monitoringFatalType'),
	funcByQualityMonitor:function(){
		var self  = this;
		var value = this.get('monitoredByQualityMonitor');

		if(typeof value === 'undefined' || value == '' || value <= 0){
			return false;
		}
		//this.get('emailDriver').clear();
		//this.set('emailDriver', Ember.A());
		if(value == 1){
			this.set('monoBy','Customer');
		}else{
			this.set('monoBy','Captain');
		}
		this.store.find('emaildrivers',{'for_id':value}).then(function(driver){
			self.set('emailDriver',driver);
		});
		return;
	}.observes('monitoredByQualityMonitor'),

	funcCountryQualityMonitor:function(){
		var self  = this;
		var value = this.get('countryQualityMonitor');
		if(typeof value === 'undefined' || value == '' || value <= 0){
			return false;
		}
		//alert(value);
		//self.store.unloadAll('domains');
		self.store.find('domains',{parent_id:value}).then(function(city){
			self.set('city',city);
		});
	}.observes('countryQualityMonitor'),

	roundNumber:function (num, scale) {
	  if(!("" + num).includes("e")) {
	    return +(Math.round(num + "e+" + scale)  + "e-" + scale);  
	  } else {
	    var arr = ("" + num).split("e");
	    var sig = ""
	    if(+arr[1] + scale > 0) {
	      sig = "+";
	    }
	    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
	  }
	},
	
	
});
telenor.PageController = Ember.ObjectController.extend({
  currentPage: Ember.computed.alias('parentController.page'),
  
  active: (function() {
    return this.get('number') === this.get('currentPage');
  }).property('number', 'currentPage')
});



telenor.qltymonitoringController = Ember.ObjectController.extend({
	need:['qltymonitorings'],
    current_id:'',
	
	

});