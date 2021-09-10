telenor.QualityQltyobservesRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName: 'qualityQltyobserves',
	baseUrl: '',
	/*beforeModel: function() {
		if(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "quality.qltyobserves"))){
            this.transitionTo('/');
        }
    },*/
	model: function () {
		return this.store.find('users', {
			role_id: 10,
			condition: 'greaterOrEqual'
		});
	},

	setupController: function (controller, model) {
		this._super(controller, model);

		applicationController = this.controllerFor("application");
		this.set('baseUrl', applicationController.get("applicationURL"));

		controller.set('myName', applicationController.get("userName"));

		controller.set('conditionYesNo', applicationController.get("conditionYesNo")); //.pushObject({id:1, name:'Yes'});

		controller.set('conditionCallStatus', applicationController.get("conditionCallStatus")); //.pushObject({id:0, name:'No'});		
		//controller.set('conditionAidedUnaided',applicationController.get("conditionAidedUnaided"));
		this.store.find('users', {
			role_id: 10
		}).then(function (teamleads) {
			controller.set('teamleads', teamleads);
		});
		this.store.find('users', {
			role_id: 11
		}).then(function (agents) {
			controller.set('agents', agents);
		});
		/*this.store.find('users',{role_id:12}).then(function(monitoredBy){
			controller.set('monitoredBy',monitoredBy);
		});*/
		this.store.find('domains', {
			parent_id: 0
		}).then(function (country) {
			controller.set('country', country);
			controller.set('countryQualityMonitor', 1);
		});

		controller.get('monitoringFatal').pushObject({
			id: 1,
			name: 'No'
		});
		controller.get('monitoringFatal').pushObject({
			id: 2,
			name: 'Yes'
		});

		controller.get('emailLanguage').pushObject({
			id: 1,
			name: 'English'
		});
		controller.get('emailLanguage').pushObject({
			id: 2,
			name: 'Arabic'
		});

		controller.get('emailType').pushObject({
			id: 1,
			name: 'Inquiries'
		});
		controller.get('emailType').pushObject({
			id: 2,
			name: 'Complaint'
		});
		controller.get('emailType').pushObject({
			id: 3,
			name: 'Transaction'
		});

		controller.get('satisfaction').pushObject({
			id: 1,
			name: 'Satisfy'
		});
		controller.get('satisfaction').pushObject({
			id: 2,
			name: 'Dissatisfy'
		});

		controller.get('satisfactionReason').pushObject({
			id: 1,
			name: 'Careem Prosses & Prodact'
		});
		controller.get('satisfactionReason').pushObject({
			id: 2,
			name: 'CSR Performance'
		});
		controller.get('satisfactionReason').pushObject({
			id: 3,
			name: 'Call Center Procedures'
		});
		controller.get('satisfactionReason').pushObject({
			id: 4,
			name: 'Captain Performance and attitude'
		});

		controller.get('monitoringProcess').pushObject({
			id: 1,
			name: 'Remote'
		});
		controller.get('monitoringProcess').pushObject({
			id: 2,
			name: 'Side By Side'
		});
		controller.get('monitoringProcess').pushObject({
			id: 3,
			name: 'Calibration'
		});
		controller.get('monitoringProcess').pushObject({
			id: 4,
			name: 'Coaching'
		});


		/*controller.get('emailDriver').pushObject({id:1, name:'Amend the booking'});
		controller.get('emailDriver').pushObject({id:2, name:'Call from Cpatain'});
		controller.get('emailDriver').pushObject({id:3, name:'Campaigns'});
		controller.get('emailDriver').pushObject({id:4, name:'Captain Performance and attitude'});
		controller.get('emailDriver').pushObject({id:5, name:'Car Booking'});
		controller.get('emailDriver').pushObject({id:6, name:'Car types'});
		controller.get('emailDriver').pushObject({id:7, name:'Careem RT'});
		controller.get('emailDriver').pushObject({id:8, name:'Cash collection'});
		controller.get('emailDriver').pushObject({id:9, name:'Change the account data'});
		controller.get('emailDriver').pushObject({id:10, name:'Cpatain wants to join Careem'});
		controller.get('emailDriver').pushObject({id:11, name:'Credit card issus'});
		controller.get('emailDriver').pushObject({id:12, name:'Credit Issue (Refund, etc.)'});
		controller.get('emailDriver').pushObject({id:13, name:'Forgetting Possessions in car'});
		controller.get('emailDriver').pushObject({id:14, name:'How to use the app'});
		controller.get('emailDriver').pushObject({id:15, name:'Peak Issus'});
		controller.get('emailDriver').pushObject({id:16, name:'Pricing'});
		controller.get('emailDriver').pushObject({id:17, name:'Promo Code'});
		controller.get('emailDriver').pushObject({id:18, name:'Referral call (Invitation)'});
		controller.get('emailDriver').pushObject({id:19, name:'SMS Failure '});*/


		controller.get('monitoredBy').pushObject({
			id: 1,
			name: 'Customer'
		});
		controller.get('monitoredBy').pushObject({
			id: 2,
			name: 'Captain'
		});
		controller.set('monitoredByQualityMonitor', 2);

		/*this.store.all('users').forEach(function(item, index, enumerable) {
			console.log(item);
   			if(item.id == self.get('selectedComplainType')){
   				console.log(item);
   				if(parseInt(item.get('tat')) == 0){
   					self.set('complainTypeStatus', 0);	
   				}
   				else{
   					self.set('complainTypeStatus', 1);	
   				}
   				//console.log(item.get('description'));
   				Ember.$('#descComplain').val(item.get('template'));
	 	   		self.set('complainTypeTAT', item.get('tat'));
    		}
		});*/
		controller.set('model', model);
	},
	actions: {
		funcValidateForm: function (controller) {
			var self = this;
			if (controller.get('ticketQualityMonitor') == '' || controller.get('ticketQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>Ticket number missing!</b>');
				return false;
			}
			if (controller.get('dateQualityMonitor') == '' || controller.get('dateQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>Date is missing.!</b>');
				return false;
			}
			if (controller.get('timeQualityMonitor') == '' || controller.get('timeQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>Time is missing!</b>');
				return false;
			}
			if (typeof controller.get('agentNameQualityMonitor') === 'undefined' || controller.get('agentNameQualityMonitor') == '' || controller.get('agentNameQualityMonitor') == 0 || controller.get('agentNameQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>Agent not selected!</b>');
				return false;
			}
			if (typeof controller.get('tlNameQualityMonitor') === 'undefined' || controller.get('tlNameQualityMonitor') == '' || controller.get('tlNameQualityMonitor') == 0 || controller.get('tlNameQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>Teamlead not selected!</b>');
				return false;
			}
			if (typeof controller.get('monitoredByQualityMonitor') === 'undefined' || controller.get('monitoredByQualityMonitor') == '' || controller.get('monitoredByQualityMonitor') == null || controller.get('monitoredByQualityMonitor') == 0) {
				self.get('common').showNotification('error', '<b>Monitored by not selected!</b>');
				return false;
			}
			if (controller.get('customerNameQualityMonitor') == '' || controller.get('customerNameQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>Customer name missing.!</b>');
				return false;
			}
			if (typeof controller.get('countryQualityMonitor') === 'undefined' || controller.get('countryQualityMonitor') == '' || controller.get('countryQualityMonitor') == 0 || controller.get('countryQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>Country not selected!</b>');
				return false;
			}
			if (typeof controller.get('cityQualityMonitor') === 'undefined' || controller.get('cityQualityMonitor') == '' || controller.get('cityQualityMonitor') == 0 || controller.get('cityQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>City not selected!</b>');
				return false;
			}
			if (typeof controller.get('emailLanguageQualityMonitor') === 'undefined' || controller.get('emailLanguageQualityMonitor') == '' || controller.get('emailLanguageQualityMonitor') == 0 || controller.get('emailLanguageQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>Email language not selected!</b>');
				return false;
			}
			if (typeof controller.get('emailTypeQualityMonitor') === 'undefined' || controller.get('emailTypeQualityMonitor') == '' || controller.get('emailTypeQualityMonitor') == 0 || controller.get('emailTypeQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>Email type not selected!</b>');
				return false;
			}
			if (typeof controller.get('emailDriverQualityMonitor') === 'undefined' || controller.get('emailDriverQualityMonitor') == '' || controller.get('emailDriverQualityMonitor') == 0 || controller.get('emailDriverQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>Email Driver not selected!</b>');
				return false;
			}
			if (typeof controller.get('customerSatisfaction') === 'undefined' || controller.get('customerSatisfaction') == '' || controller.get('customerSatisfaction') == 0 || controller.get('customerSatisfaction') == null) {
				self.get('common').showNotification('error', '<b>Customer satisfaction not selected!</b>');
				return false;
			}
			if (typeof controller.get('monitoringProcessType') === 'undefined' || controller.get('monitoringProcessType') == '' || controller.get('monitoringProcessType') == 0 || controller.get('monitoringProcessType') == null) {
				self.get('common').showNotification('error', '<b>Monitor process not selected!</b>');
				return false;
			}
		},
		funcSaveMonitorActivity: function (upselling) {

			var self = this;
			var controller = self.controllerFor('qualityQltyobserves'); //callStatus
			//self.send('funcValidateForm', controller);
			if (controller.get('ticketQualityMonitor') == '' || controller.get('ticketQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>Ticket number missing!</b>');
				return false;
			}
			if (controller.get('dateQualityMonitor') == '' || controller.get('dateQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>Date is missing.!</b>');
				return false;
			}
			if (controller.get('timeQualityMonitor') == '' || controller.get('timeQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>Time is missing!</b>');
				return false;
			}
			if (typeof controller.get('agentNameQualityMonitor') === 'undefined' || controller.get('agentNameQualityMonitor') == '' || controller.get('agentNameQualityMonitor') == 0 || controller.get('agentNameQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>Agent not selected!</b>');
				return false;
			}
			if (typeof controller.get('tlNameQualityMonitor') === 'undefined' || controller.get('tlNameQualityMonitor') == '' || controller.get('tlNameQualityMonitor') == 0 || controller.get('tlNameQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>Teamlead not selected!</b>');
				return false;
			}
			if (typeof controller.get('monitoredByQualityMonitor') === 'undefined' || controller.get('monitoredByQualityMonitor') == '' || controller.get('monitoredByQualityMonitor') == null || controller.get('monitoredByQualityMonitor') == 0) {
				self.get('common').showNotification('error', '<b>Monitored by not selected!</b>');
				return false;
			}
			if (controller.get('customerNameQualityMonitor') == '' || controller.get('customerNameQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>Customer name missing.!</b>');
				return false;
			}
			if (typeof controller.get('countryQualityMonitor') === 'undefined' || controller.get('countryQualityMonitor') == '' || controller.get('countryQualityMonitor') == 0 || controller.get('countryQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>Country not selected!</b>');
				return false;
			}
			if (typeof controller.get('cityQualityMonitor') === 'undefined' || controller.get('cityQualityMonitor') == '' || controller.get('cityQualityMonitor') == 0 || controller.get('cityQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>City not selected!</b>');
				return false;
			}
			if (typeof controller.get('emailLanguageQualityMonitor') === 'undefined' || controller.get('emailLanguageQualityMonitor') == '' || controller.get('emailLanguageQualityMonitor') == 0 || controller.get('emailLanguageQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>Email language not selected!</b>');
				return false;
			}
			if (typeof controller.get('emailTypeQualityMonitor') === 'undefined' || controller.get('emailTypeQualityMonitor') == '' || controller.get('emailTypeQualityMonitor') == 0 || controller.get('emailTypeQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>Email type not selected!</b>');
				return false;
			}
			if (typeof controller.get('emailDriverQualityMonitor') === 'undefined' || controller.get('emailDriverQualityMonitor') == '' || controller.get('emailDriverQualityMonitor') == 0 || controller.get('emailDriverQualityMonitor') == null) {
				self.get('common').showNotification('error', '<b>Email Driver not selected!</b>');
				return false;
			}
			if (typeof controller.get('customerSatisfaction') === 'undefined' || controller.get('customerSatisfaction') == '' || controller.get('customerSatisfaction') == 0 || controller.get('customerSatisfaction') == null) {
				self.get('common').showNotification('error', '<b>Customer satisfaction not selected!</b>');
				return false;
			}
			if (typeof controller.get('monitoringProcessType') === 'undefined' || controller.get('monitoringProcessType') == '' || controller.get('monitoringProcessType') == 0 || controller.get('monitoringProcessType') == null) {
				self.get('common').showNotification('error', '<b>Monitor process not selected!</b>');
				return false;
			}

			var saveScore = Ember.A();

			saveScore.push({
				question_id: '7',
				score: controller.get('customersNameScore'),
				comment: controller.get('customersNameComment')
			});
			saveScore.push({
				question_id: '10',
				score: controller.get('openingScore'),
				comment: controller.get('openingComment')
			});
			saveScore.push({
				question_id: '13',
				score: controller.get('closingScore'),
				comment: controller.get('closingComment')
			});
			saveScore.push({
				question_id: '16',
				score: controller.get('extraAssistanceScore'),
				comment: controller.get('extraAssistanceComment')
			});
			saveScore.push({
				question_id: '18',
				score: controller.get('resolvedScore'),
				comment: controller.get('resolvedComment')
			});
			saveScore.push({
				question_id: '20',
				score: controller.get('accountVerificationScore'),
				comment: controller.get('accountVerificationComment')
			});
			saveScore.push({
				question_id: '22',
				score: controller.get('historyScore'),
				comment: controller.get('historyComment')
			});
			saveScore.push({
				question_id: '24',
				score: controller.get('probingQuestionsScore'),
				comment: controller.get('probingQuestionsComment')
			});
			saveScore.push({
				question_id: '27',
				score: controller.get('sequenceScore'),
				comment: controller.get('sequenceComment')
			});
			saveScore.push({
				question_id: '30',
				score: controller.get('proofreadingScore'),
				comment: controller.get('proofreadingComment')
			});
			saveScore.push({
				question_id: '34',
				score: controller.get('languageScore'),
				comment: controller.get('languageComment')
			});
			saveScore.push({
				question_id: '40',
				score: controller.get('accuracyScore'),
				comment: controller.get('accuracyComment')
			});
			saveScore.push({
				question_id: '44',
				score: controller.get('relevanceScore'),
				comment: controller.get('relevanceComment')
			});
			saveScore.push({
				question_id: '47',
				score: controller.get('sufficiencyScore'),
				comment: controller.get('sufficiencyComment')
			});
			saveScore.push({
				question_id: '51',
				score: controller.get('typicalityScore'),
				comment: controller.get('typicalityComment')
			});
			saveScore.push({
				question_id: '53',
				score: controller.get('actionValidationScore'),
				comment: controller.get('actionValidationComment')
			});
			saveScore.push({
				question_id: '57',
				score: controller.get('documentationNReportingScore'),
				comment: controller.get('documentationNReportingComment')
			});
			saveScore.push({
				question_id: '60',
				score: controller.get('followingUpScore'),
				comment: controller.get('followingUpComment')
			});
			saveScore.push({
				question_id: '62',
				score: controller.get('callBackScore'),
				comment: controller.get('callBackComment')
			});
			saveScore.push({
				question_id: '64',
				score: controller.get('initiationScore'),
				comment: controller.get('initiationComment')
			});
			saveScore.push({
				question_id: '67',
				score: controller.get('writingSkillsScore'),
				comment: controller.get('writingSkillsComment')
			});

			saveScore.push({
				question_id: '8',
				score: controller.get('avoidingNickName'),
				comment: ''
			});
			saveScore.push({
				question_id: '9',
				score: controller.get('userdNameOnCnoc'),
				comment: ''
			});
			saveScore.push({
				question_id: '11',
				score: controller.get('properGreeting'),
				comment: ''
			});
			saveScore.push({
				question_id: '12',
				score: controller.get('apologizedForDelay'),
				comment: ''
			});
			saveScore.push({
				question_id: '14',
				score: controller.get('properClosing'),
				comment: ''
			});
			saveScore.push({
				question_id: '15',
				score: controller.get('completeClosing'),
				comment: ''
			});
			saveScore.push({
				question_id: '17',
				score: controller.get('offerExteraHelp'),
				comment: ''
			});
			saveScore.push({
				question_id: '19',
				score: controller.get('closingWithAcknowledgment'),
				comment: ''
			});
			saveScore.push({
				question_id: '21',
				score: controller.get('verifiedRegisteredEmail'),
				comment: ''
			});
			saveScore.push({
				question_id: '23',
				score: controller.get('checkedCustomersHistory'),
				comment: ''
			});
			saveScore.push({
				question_id: '25',
				score: controller.get('askedRelatedQuestions'),
				comment: ''
			});
			saveScore.push({
				question_id: '26',
				score: controller.get('highlightingSufficientInformation'),
				comment: ''
			});
			saveScore.push({
				question_id: '28',
				score: controller.get('avoidedRepeatingTemplates'),
				comment: ''
			});
			saveScore.push({
				question_id: '29',
				score: controller.get('greetingBodyClosure'),
				comment: ''
			});
			saveScore.push({
				question_id: '31',
				score: controller.get('grammar'),
				comment: ''
			});
			saveScore.push({
				question_id: '32',
				score: controller.get('spelling'),
				comment: ''
			});
			saveScore.push({
				question_id: '33',
				score: controller.get('punctuation'),
				comment: ''
			});
			saveScore.push({
				question_id: '35',
				score: controller.get('friendly'),
				comment: ''
			});
			saveScore.push({
				question_id: '36',
				score: controller.get('formal'),
				comment: ''
			});
			saveScore.push({
				question_id: '37',
				score: controller.get('noSlang'),
				comment: ''
			});
			saveScore.push({
				question_id: '38',
				score: controller.get('noJargons'),
				comment: ''
			});
			saveScore.push({
				question_id: '39',
				score: controller.get('noNegativeWords'),
				comment: ''
			});
			saveScore.push({
				question_id: '41',
				score: controller.get('accurateRates'),
				comment: ''
			});
			saveScore.push({
				question_id: '42',
				score: controller.get('mapTracking'),
				comment: ''
			});
			saveScore.push({
				question_id: '43',
				score: controller.get('currency'),
				comment: ''
			});
			saveScore.push({
				question_id: '45',
				score: controller.get('correctTemplate'),
				comment: ''
			});
			saveScore.push({
				question_id: '46',
				score: controller.get('providingRelevantInformation'),
				comment: ''
			});
			saveScore.push({
				question_id: '48',
				score: controller.get('promoCodes'),
				comment: ''
			});
			saveScore.push({
				question_id: '49',
				score: controller.get('sufficientTemplate'),
				comment: ''
			});
			saveScore.push({
				question_id: '50',
				score: controller.get('remainingCredits'),
				comment: ''
			});
			saveScore.push({
				question_id: '52',
				score: controller.get('informationConfidentiality'),
				comment: ''
			});
			saveScore.push({
				question_id: '54',
				score: controller.get('accurateAmount'),
				comment: ''
			});
			saveScore.push({
				question_id: '55',
				score: controller.get('childTicketAction'),
				comment: ''
			});
			saveScore.push({
				question_id: '56',
				score: controller.get('currencyAuthorizedRefunds'),
				comment: ''
			});
			saveScore.push({
				question_id: '58',
				score: controller.get('creditReason'),
				comment: ''
			});
			saveScore.push({
				question_id: '59',
				score: controller.get('ticketSubjectTicketContentQualityReason'),
				comment: ''
			});
			saveScore.push({
				question_id: '61',
				score: controller.get('onTimeResponseKeepingPromises'),
				comment: ''
			});
			saveScore.push({
				question_id: '63',
				score: controller.get('retentionPingPongEmails'),
				comment: ''
			});
			saveScore.push({
				question_id: '65',
				score: controller.get('newOffersAlternativeSolutions'),
				comment: ''
			});
			saveScore.push({
				question_id: '66',
				score: controller.get('usageOfScreenshotsHyperlinks'),
				comment: ''
			});
			saveScore.push({
				question_id: '68',
				score: controller.get('exceptionalWritingSkills'),
				comment: ''
			});


			//console.log(saveScore);
			//var saveScoreB = Ember.A();

			//var saveScore = {
			/*console.log(controller.get('customersNameComment'));		console.log(controller.get('customersNameScore'));
			console.log(controller.get('openingComment'));				console.log(controller.get('openingScore'));
			console.log(controller.get('closingComment'));				console.log(controller.get('closingScore'));
			console.log(controller.get('extraAssistanceComment'));		console.log(controller.get('extraAssistanceScore'));
			console.log(controller.get('resolvedComment'));				console.log(controller.get('resolvedScore'));
			console.log(controller.get('accountVerificationComment'));	console.log(controller.get('accountVerificationScore'));
			console.log(controller.get('historyComment'));				console.log(controller.get('historyScore'));
			console.log(controller.get('probingQuestionsComment'));		console.log(controller.get('probingQuestionsScore'));
			console.log(controller.get('sequenceComment'));				console.log(controller.get('sequenceScore'));
			console.log(controller.get('proofreadingComment'));			console.log(controller.get('proofreadingScore'));
			console.log(controller.get('languageComment'));				console.log(controller.get('languageScore'));
			console.log(controller.get('accuracyComment'));		console.log(controller.get('accuracyScore'));
			console.log(controller.get('relevanceComment'));	console.log(controller.get('relevanceScore'));
			console.log(controller.get('sufficiencyComment'));	console.log(controller.get('sufficiencyScore'));
			console.log(controller.get('typicalityComment'));	console.log(controller.get('typicalityScore'));
			console.log(controller.get('actionValidationComment'));		console.log(controller.get('actionValidationScore'));
			console.log(controller.get('documentationNReportingComment'));	console.log(controller.get('documentationNReportingScore'));
			console.log(controller.get('followingUpComment'));				console.log(controller.get('followingUpScore'));
			console.log(controller.get('callBackComment'));		console.log(controller.get('callBackScore'));
			console.log(controller.get('initiationComment'));	console.log(controller.get('initiationScore'));
			console.log(controller.get('writingSkillsComment')); console.log(controller.get('writingSkillsScore'));*/
			//	}
			/*if(controller.get('emailDriverQualityMonitor')typeof controller.get('ticketQualityMonitor') === 'undefined' || == '' || controller.get('emailDriverQualityMonitor') == 0){
				self.get('common').showNotification('error', '<b>Email Driver not selected!</b>');
				return false;
			}*/
			/*console.log(controller.get('ticketQualityMonitor'));
			console.log(controller.get('dateQualityMonitor'));
			console.log(controller.get('timeQualityMonitor'));
			console.log(controller.get('agentNameQualityMonitor'));
			console.log(controller.get('tlNameQualityMonitor'));
			console.log(controller.get('monitoredByQualityMonitor'));
			console.log(controller.get('customerNameQualityMonitor'));
			console.log(controller.get('countryQualityMonitor'));
			console.log(controller.get('cityQualityMonitor'));
			console.log(controller.get('emailLanguageQualityMonitor'));
			console.log(controller.get('emailTypeQualityMonitor'));
			console.log(controller.get('emailDriverQualityMonitor'));*/
			/*console.log(controller.get('customerSatisfaction'));
			console.log(controller.get('customerSatisfactionReason'));
			console.log(controller.get('monitoringProcessType'));
			console.log(controller.get('monitoringGeneralComment'));*/

			var saveDate = {
				ticket_id: controller.get('ticketQualityMonitor'),
				date: controller.get('dateQualityMonitor'),
				time: controller.get('timeQualityMonitor'),
				agent_id: controller.get('agentNameQualityMonitor'),
				tl_id: controller.get('tlNameQualityMonitor'),
				monitored_id: controller.get('monitoredByQualityMonitor'),
				customer: controller.get('customerNameQualityMonitor'),
				country_id: controller.get('countryQualityMonitor'),
				city_id: controller.get('cityQualityMonitor'),
				email_language_id: controller.get('emailLanguageQualityMonitor'),
				email_type_id: controller.get('emailTypeQualityMonitor'),
				email_driver_id: controller.get('emailDriverQualityMonitor'),
				score: controller.get('gainedTotal'),
				customer_satisfaction_id: controller.get('customerSatisfaction'),
				monitor_process_type_id: controller.get('monitoringProcessType'),
				general_comment: controller.get('monitoringGeneralComment'),
				result: controller.get('gainedMadel'),
				customer_satisfaction_reason_id: controller.get('customerSatisfactionReason'),
			};
			//console.log(saveDate);
			self.get('common').showLoader();
			Ember.$.ajax({
				url: 'api/users_api/monitoring?format=json',
				type: 'POST',
				data: {
					monitoring: JSON.stringify(saveDate),
					monitoring_score: JSON.stringify(saveScore)
				},
				success: function (data, textStatus, xhr) {
					self.refresh();
					window.location.reload(true);
					self.get('common').hideLoader();
					self.get('common').showNotification('success', '<b>Saved successfully!</b>');
				},
				error: function (xhr, textStatus, errorThrown) {
					self.get('common').showNotification('error', '<b>Error! not saved!</b>');
					self.get('common').hideLoader();
				}
			});

			//return;
			/*if(this.get('consumerID') == '' || this.get('consumerID') == null){
				alert('Search consumer by phone number');
				return false;
			}
			if(controller.get('callStatus') == '' || controller.get('callStatus') == null){
				alert('Select call status...');
				return false;
			}*/
			/*Ember.$.isLoading({
                text:       '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
              //  position:   "overlay"
            });*/

			/*callactivity = {
	        	consumerID:self.get('consumerID'),
				brandID:self.get('brandID'),
				ambassadorID:self.get('ambassadorID'),			
				isNamed: controller.get('isNamed'),
				isSmoker:controller.get('isSmoker'),
				isEighteen:controller.get('isEighteen'),
				isMet:controller.get('isMet'),
				haveTime:controller.get('haveTime'),
				isRemembered:controller.get('isRemembered'),
				isAided:controller.get('isAided'),
				callStatus:controller.get('callStatus'),
				
	        };
	        console.log(callactivity); */
			// Ember.$.isLoading("hide");
			// return;

			//callComplete:DS.attr()
			//Ember.$('#btnAcceptUpsellings').prop("disabled", true);
			//Ember.$('#btnDeclineUpsellings').prop("disabled", true);
			//console.log(upselling);
			//var controller = self.controllerFor('qualityQltyobserves');
			/*self.store.unloadAll('qltyobserves');
	    	var newQltyobserves = self.store.createRecord('qltyobserves',callactivity);
			newQltyobserves.save().then(function(){
				controller.set('isNamedQuestion', 'Kya apka naam __________ hai?');
		        controller.set('haveTimeQuestion', '__________ sahib Mujhay apkay keemti waqt main se 4 minutes darker hongay. ');
		        controller.set('isMetQuestion', '__________ sahib Kya kal aap se hamaray kisi numainday ne baat kit hi?');
		        self.set('consumerID', ''),
				self.set('brandID', ''),
				self.set('ambassadorID', ''),
				self.set('isAided', ''),*/

			//Ember.$('#btnAcceptUpsellings').prop("disabled", true);
			//Ember.$('#btnDeclineUpsellings').prop("disabled", true);
			//	self.send('reloadAll');
			//	Ember.$.isLoading("hide");
			//});




			//this.transitionToRoute('Complains');
		},

		funcPhoneCallActivity: function () {
			var a = Ember.$('#phoneCallActivity').val().trim().toString().length;
			var phoneNo = Ember.$('#phoneCallActivity').val().trim();
			if (a < 11 || phoneNo == '') {
				alert("Enter 10 Digit Phone Number");
				return false;
			}
			var self = this;
			var store = self.store;
			var controller = self.controllerFor("Qltyobserves");
			//store.unloadAll('upsellingUploads');
			self.get('common').showLoader();

			Ember.$.ajax({
				url: 'api/users_api/consumerPhone/' + phoneNo + '?format=json',
				type: 'GET',
				success: function (data, textStatus, xhr) {
					console.log(data.consumers);
					controller.set('isNamedQuestion', 'Kya apka naam ' + data.name + ' hai?');
					controller.set('haveTimeQuestion', data.name + ' sahib Mujhay apkay keemti waqt main se 4 minutes darker hongay. ');
					controller.set('isMetQuestion', data.name + ' sahib Kya kal aap se hamaray kisi numainday ne baat kit hi?');
					self.set('consumerID', data.id),
						self.set('brandID', data.brand_id),
						self.set('ambassadorID', data.ambassador_id),
						self.get('common').hideLoader();
				},
				error: function (xhr, textStatus, errorThrown) {
					alert('not found');
					controller.set('isNamedQuestion', 'Kya apka naam __________ hai?');
					controller.set('haveTimeQuestion', '__________ sahib Mujhay apkay keemti waqt main se 4 minutes darker hongay. ');
					controller.set('isMetQuestion', '__________ sahib Kya kal aap se hamaray kisi numainday ne baat kit hi?');
					self.set('consumerID', ''),
						self.set('brandID', ''),
						self.set('ambassadorID', ''),
						self.get('common').hideLoader();
				}
			});

			return;
		},
		selectPage: function (number) {

			var start = (number - 1) * 20;
			var end = start + 20;
			this.set('pageNumber', start);
			this.set('pageSize', end);
			if (!this.get('visitedPage').contains(number)) {
				this.get('visitedPage').push(number);
				var mod = this.store.find('complains', {
					rtrn: 'all',
					start: this.get('pageNumber'),
					end: this.get('pageSize')
				});
				//this.controllerFor("Complains").set('model', mod);
				//	this.controllerFor("Complains").get('arrangedContent').push(mod);
			} else {

				//this.controllerFor("Complains").set('model',this.get('model').slice(start, end));
				//this.controllerFor("Complains").get('arrangedContent').slice(start, end);;
			}
			console.log(this.store.all('complains').get('content'));
			this.controllerFor("Complains").set('page', number);
			//this.set('page', number);
		},
		selectPageNew: function (number) {

			var start = (number - 1) * 20;
			var end = start + 20;
			this.set('pageNumberNew', start);
			this.set('pageSizeNew', end);
			if (!this.get('visitedPageNew').contains(number)) {
				this.get('visitedPageNew').push(number);
				var mod = this.store.find('openedComplains', {
					rtrn: 'all',
					start: this.get('pageNumberNew'),
					end: this.get('pageSizeNew')
				});
				//this.controllerFor("Complains").set('model', mod);
				//	this.controllerFor("Complains").get('arrangedContent').push(mod);
			} else {

				//this.controllerFor("Complains").set('model',this.get('model').slice(start, end));
				//this.controllerFor("Complains").get('arrangedContent').slice(start, end);;
			}
			//  console.log(this.store.all('complains').get('content'));
			this.controllerFor("Complains").set('pageNew', number);
			//this.set('page', number);
		},
		saveUpsellings: function (upselling) {
			var self = this;
			self.get('common').showLoader();

			//Ember.$('#btnAcceptUpsellings').prop("disabled", true);
			//Ember.$('#btnDeclineUpsellings').prop("disabled", true);
			//console.log(upselling);
			var controller = self.controllerFor('qualityQltyobserves');

			self.store.unloadAll('upselling');
			var newUpselling = self.store.createRecord('upselling', upselling);
			newUpselling.save().then(function () {
				self.send('clog'); //();
				//Ember.$('#btnAcceptUpsellings').prop("disabled", true);
				//Ember.$('#btnDeclineUpsellings').prop("disabled", true);
				//	self.send('reloadAll');
				self.get('common').hideLoader();
			});




			//this.transitionToRoute('Complains');
		},
		delete: function (uid) {
			var self = this;
			phoneNo = uid.get('phone');
			complain = {
				id: uid.get('id'),
				status: 0,
			};
			//return;
			var newComplain = this.store.createRecord('complain', complain);
			newComplain.save().then(function () {
				var store = self.store;
				//store.unloadAll('complains');
				var userJson = store.find('complains', {
					rtrn: 'all',
					phone: phoneNo,
					start: 1,
					end: 20
				});
				self.controllerFor("Complains").set('model', userJson);
				self.send('reloadAll');
				self.get('common').hideLoader();
			});
			//  var controller = this.get('controller');
			//  this.get('controller').send('userEdit', id);
		},
		reset: function () {
			//this.transitionTo('users');
			Ember.$('#phoneComplain').prop("disabled", false);
			Ember.$('#catComplain').prop("disabled", false);
			Ember.$('#descComplain').prop("disabled", false);

			Ember.$('#idComplain').val(0);
			Ember.$('#catComplain').val('');
			Ember.$('#phoneComplain').val('');
			Ember.$('#descComplain').val('')
			var store = this.store;
			//var logComplain = store.find('complainLogs',{cid:0});
			//this.controllerFor("Complains").set('complainLogs', logComplain);
			store.unloadAll('complainLogs');

			//store.get('complains').unloadRecord();
			store.unloadAll('complains');
			//var userJson = store.find('complains',{rtrn:'all', phone:32100000000, start:1, end:20});
			Ember.$('#commentArea').hide();
			Ember.$('#btnComplainEditSave').prop("disabled", false);
			//Ember.$('#btnComplainEditReset').prop("disabled", false);
			//this.controllerFor("Complains").set('model', emp);

		},


	},


});
