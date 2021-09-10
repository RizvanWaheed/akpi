telenor.QualityQltyobservesController = Ember.ArrayController.extend({
	pageName:'qualityQltyobserves',

	totalCollaborate:16.542,
	totalAgile:27.125,
	totalFocus:26.167,
	totalBold:13.083,
	totalOwnership:13.083,
	totalWow:4,
	monoBy:'Captain',

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


	

	//current Tabe
	///////////// Tab 1 //////////////

	dearCustomer:1,
	dearCustomerComment:'',
	wellSpaced:1,
	wellSpacedComment:'',
	sopFollowed:1,
	sopFollowedComment:'',
	smallEasyWords:1,
	smallEasyWordsComment:'',
	spellingMistakes:1,
	spellingMistakesComment:'',
	clearResponse:1,
	clearResponseComment:'',
	creditMentioned:1,
	creditMentionedComment:'',
	closingConfirmation:1,
	closingConfirmationComment:'',
	internalNotes:1,
	internalNotesComment:'',
	notGrammaticalError:1,
	notGrammaticalErrorComment:'',
	inDispositionCRM:1,
	inDispositionCRMComment:'',


	dearCustomerScore:(function(){
		if(this.get('dearCustomer')==1) return 5;
		else return 0;
	}).property('dearCustomer'),
	wellSpacedScore:(function(){
		if(this.get('wellSpaced')==1) return 5;
		else return 0;  	
	}).property('wellSpaced'),
	sopFollowedScore:(function(){
		if(this.get('sopFollowed')==1) return 5;
		else return 0; 
	}).property('sopFollowed'),
	smallEasyWordsScore:(function(){
		if(this.get('smallEasyWords')==1) return 10;
		else return 0; 
	}).property('smallEasyWords'),
	spellingMistakesScore:(function(){
		if(this.get('spellingMistakes')==1) return 5;
		else return 0;
	}).property('spellingMistakes'),
	clearResponseScore:(function(){
		if(this.get('clearResponse')==1) return 5;
		else return 0;
	}).property('clearResponse'),
	creditMentionedScore:(function(){
		if(this.get('creditMentioned')==1) return 5;
		else return 0;
	}).property('creditMentioned'),
	closingConfirmationScore:(function(){
		if(this.get('closingConfirmation')==1) return 5;
		else return 0;
	}).property('closingConfirmation'),
	internalNotesScore:(function(){
		if(this.get('internalNotes')==1) return 20;
		else return 0;
	}).property('internalNotes'),
	notGrammaticalErrorScore:(function(){
		if(this.get('notGrammaticalError')==1) return 10;
		else return 0;
	}).property('notGrammaticalError'),
	inDispositionCRMScore:(function(){
		if(this.get('inDispositionCRM')==1) return 15;
		else return 0;
	}).property('inDispositionCRM'),

		
	gainedResulution: (function() {
    	return this.roundNumber(parseFloat(this.get('dearCustomerScore'))+parseFloat(this.get('wellSpacedScore'))+parseFloat(this.get('sopFollowedScore'))+parseFloat(this.get('smallEasyWordsScore'))+parseFloat(this.get('spellingMistakesScore'))+parseFloat(this.get('clearResponseScore'))+parseFloat(this.get('creditMentionedScore'))+parseFloat(this.get('closingConfirmationScore'))+parseFloat(this.get('internalNotesScore'))+parseFloat(this.get('notGrammaticalErrorScore'))+parseFloat(this.get('inDispositionCRMScore')),3);
  	}).property('dearCustomerScore',	'wellSpacedScore',	'sopFollowedScore',	'smallEasyWordsScore',	'spellingMistakesScore',	'clearResponseScore',	'creditMentionedScore',	'closingConfirmationScore',	'internalNotesScore',	'notGrammaticalErrorScore',	'inDispositionCRMScore'),

	

	gainedTotal: (function() {
    	return this.roundNumber(parseFloat(this.get('gainedResulution')),3);
  	}).property('gainedResulution'),


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



telenor.qltyobserveController = Ember.ObjectController.extend({
	need:['qltyobserves'],
    current_id:'',
	
	

});