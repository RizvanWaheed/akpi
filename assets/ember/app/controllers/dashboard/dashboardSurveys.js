telenor.DashboardSurveysController = Ember.Controller.extend({
	pageName:'dashboardSurveys',
	//itemController: 'agentticket',
	dashboard:{
		survey_id:''
	},
	overall:Em.A(),
	overalltl:Em.A(),
	questions:Em.A(),
	teamleads:Em.A(),
	survey:{
		options: {
			chart: {
				type: 'bar'
			},
			title: {
			  text: 'Fruit Consumption'
			},
			xAxis: {
			  categories: ['Apples', 'Bananas', 'Oranges']
			},
			yAxis: {
			  title: {
				  text: 'Fruit eaten'
			  }
			}
		},
		chartData: [
			{
			  name: 'Jane',
			  data: [1, 0, 4]
			}, {
			  name: 'John',
			  data: [5, 7, 3]
			}
		]
	},
	
	funcGetChartData:function(){
		var _controller = this;
		var value = this.get('dashboard.survey_id');
		if(Em.isEmpty(value)){
			_controller.set('overall',Em.A());
			_controller.set('overalltl',Em.A());
			_controller.set('questions',Em.A());
			return;
		}
		var data = {id:value};//,status:1
		
		_controller.get('common').ajaxppRequest('GET', 'api/users_api/getSurveyResults?format=json', data, 'Yes').then(function (response) {   //newRequest is method of our adapter
			console.log(response);
			var responseoverall  = response.overall;//.get('firstObject');
//			console.log(responseoverall);
			var responsequestions  = response.questions;
			if(Em.isEmpty(responseoverall)){
				_controller.get('overall').removeObjects(_controller.get('overall'));
				//_controller.set('overall',Em.A());
			}else{
				responseoverall.forEach(function(item, index, enumerable){
				//	console.log(item);
				//	console.log(item.tl);
				// options3d: {
				// 	enabled: true,
				// 	alpha: 6,
				// 	beta: 6,
				// 	viewDistance: 0,
				// 	depth: 50
				// }
				 	var options= {
						chart:{	type:'pie', plotBackgroundColor: null,	plotBorderWidth: null,	plotShadow: false }, 
						title:{verticalAlign: 'middle',	floating: true, y:-9, text:item.title.replace("-", "<br>").replace('Captain Connect','Captain<br>Connect')},
						//legend: { enabled: true},
					//	tooltip: {	pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
					//colors: ['#FAD331', '#1BA8BB', '#C1A0C5', '#96D5DF', '#C5D930'],
						// legend: {
						// 	enabled: true,
						// 	floating: false,
						// 	borderWidth: 0,
						//	align: 'right', // Moving the legend to the right of the donut chart
						//	layout: 'vertical', // Display in columns
						//	verticalAlign: 'middle',
						//	itemMarginTop: 5, // Space between each category in the legend
						//	itemMarginBottom: 5,
							
						// 	itemStyle: {
						// 		lineHeight: "40px" // Aligning icons and text
						// 	},
						// 	useHTML: true,
						// 	labelFormatter: function() { // Includes cat & price in legend
						// 		return '<span style="display:block; margin-top:-10px; position:relative; width:210px;border-bottom:1px solid #DCDCDC;"><i class="fa fa-smile-o" aria-hidden="true"></i>&nbsp<span style="font-weight:normal; vertical-align:super;">' + this.name + ' </span><span style="font-weight:normal; vertical-align:super; position:absolute; right:0px;">' + this.y + ' %<br/></span></span>'; // right:0px; pulls the number to the right and keeps the text to the left
						// 	}
						// },
						legend: {
							enabled:true,
    						symbolHeight: 10,
							symbolWidth: 10,
							symbolRadius: 0,
							itemStyle: {
								font: '9pt Trebuchet MS, Verdana, sans-serif',
								color: '#A0A0A0'
							}
						},
						plotOptions: {
							pie: {
								innerSize: '90%',
								allowPointSelect: false,
								cursor: 'pointer',
								center: ['50%', '50%'],
								showInLegend: true,
								tooltip: {
									formatter: function() {
									  return '<b>' + this.point.name + '</b>: €' + this.y;
									}
								},
								//colors: pieColors,
								// colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
								// 	return {
								// 		radialGradient: {
								// 			cx: 0.5,
								// 			cy: 0.3,
								// 			r: 0.7
								// 		},
								// 		stops: [
								// 			[0, color],
								// 			[1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
								// 		]
								// 	};
								// }),
								dataLabels: {
									enabled: true,
									color:'black',
									format: '{point.percentage:.1f} %',
									distance: -37,
									filter: {
										property: 'percentage',
										operator: '>',
										value: 0
									}
								}
							}							
						}
					};
					var chartData = Em.A();
					chartData.pushObject({name: 'D index', y: parseFloat(((item.dsat/item.total)*100).toFixed(2))});//, sliced: true, selected: true
					chartData.pushObject({name: 'N index', y: parseFloat(((item.nut/item.total)*100).toFixed(2))});
					chartData.pushObject({name: 'S index', y: parseFloat(((item.csat/item.total)*100).toFixed(2))});
					_controller.get('overall').pushObject({options:options, chartData:[{name:'survey', data:chartData}]	});
				});
				// console.log(_controller.get('overall'));
				// console.log(_controller.get('survey'));
				// console.log(_controller.get('overall').get('firstObject'));
			}
			if(Em.isEmpty(response.overalltl)){
				//_controller.set('overalltl',Em.A());
				_controller.get('overalltl').removeObjects(_controller.get('overalltl'));
			}else{
				var categories = [];
				var csat = [];
				var nut = [];
				var dsat = [];
				//var data = [];
				var title = '';
				response.overalltl.forEach(function(item, index, enumerable){
				//	console.log(item);
					//var data = [];
					title = item.title;
					// categories.push(item.name);
					// csat.push(parseFloat(((item.csat/item.total)*100).toFixed(2)));
					// nut.push(parseFloat(((item.nut/item.total)*100).toFixed(2)));
					// dsat.push(parseFloat(((item.dsat/item.total)*100).toFixed(2)));

					csat.pushObject({name:item.name, y:parseFloat(((item.csat/item.total)*100).toFixed(2)),drilldown:item.uid+"-csat"});
					nut.pushObject({name:item.name, y:parseFloat(((item.nut/item.total)*100).toFixed(2)),drilldown:item.uid+"-nut"});
					dsat.pushObject({name:item.name, y:parseFloat(((item.dsat/item.total)*100).toFixed(2)),drilldown:item.uid+"-dsat"});
						
					// name: '2010',
					// 	data: [{
					// 		name: 'Republican', // temlead name
					// 		y: 5,
					// 		drilldown: 'republican-2010'
					// 	}, {
					// 		name: 'Democrats',
					// 		y: 2,
					// 		drilldown: 'democrats-2010'
					// 	}, {
					// 		name: 'Other',
					// 		y: 4,
					// 		drilldown: 'other-2010'
					// 	}]

				
					//_controller.get('overalltl').pushObject({link:'agents.mySurvey', survey_id:item.survey_id, name:'Survey '+(index+1) });
				});
				var chartData = Em.A();
					chartData.pushObject({name: 'D index', data: dsat});
					chartData.pushObject({name: 'N index', data: nut});
					chartData.pushObject({name: 'S index', data: csat});
				var options = {
					chart: { type: 'column', options3d: {
						enabled: true,
						alpha: 6,
						beta: 6,
						viewDistance: 0,
						depth: 50
					}	},
					title: { text: title	},
					xAxis: {  type: 'category'}, //categories: categories	},
					yAxis: { min: 0, title: { text: 'Score Percentage' }	},
					tooltip: {
						pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
						shared: true
					},
					plotOptions: {	column: { 
						pointPadding: 0.1,
					//	borderWidth: 0,
						groupPadding: 0,
						shadow: false,
						stacking: 'percent', 
						dataLabels: {
							enabled: true,
							color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'black'
						}
					} }
				};
				var drilldown = Em.A();// new Object();
				response.users.forEach(function(item, index, enumerable){
					//	console.log(item);
						//var data = [];
						var uidCst = '';
						var uidNut = '';
						var uidDst = '';
						var dataCst = [];
						var dataNut = [];
						var dataDst = [];
						var name  = '';
						item.forEach(function(item2, index2, enumerable2){
							uidCst = item2.uid+"-csat";
							uidNut = item2.uid+"-nut";
							uidDst = item2.uid+"-dsat";
							name = item2.name;
							//dataCst[index2][0] = item2.title;
							//dataCst[index2][1] = item2.title;

							dataCst.push([item2.title, parseFloat(((item2.csat/item2.total)*100).toFixed(2))]);
							dataNut.push([item2.title, parseFloat(((item2.nut/item2.total)*100).toFixed(2))]);
							dataDst.push([item2.title, parseFloat(((item2.dsat/item2.total)*100).toFixed(2))]);
							//dataNut.push(item2.title);							//dataDst.push(item2.title);
							
							
						});
						drilldown.pushObject({id:uidCst, name:name, data: dataCst});
						drilldown.pushObject({id:uidNut, name:name, data: dataNut});
						drilldown.pushObject({id:uidDst, name:name, data: dataDst});
						
						//title = item.title;
						// categories.push(item.name);
						// csat.push(parseFloat(((item.csat/item.total)*100).toFixed(2)));
						// nut.push(parseFloat(((item.nut/item.total)*100).toFixed(2)));
						// dsat.push(parseFloat(((item.dsat/item.total)*100).toFixed(2)));
	
						//csat.pushObject({name:item.name, y:parseFloat(((item.csat/item.total)*100).toFixed(2)),drilldown:item.uid+"-csat"});
						//nut.pushObject({name:item.name, y:parseFloat(((item.nut/item.total)*100).toFixed(2)),drilldown:item.uid+"-nut"});
						//dsat.pushObject({name:item.name, y:parseFloat(((item.dsat/item.total)*100).toFixed(2)),drilldown:item.uid+"-dsat"});
						
				});
				console.log(chartData);
				console.log(drilldown);
				_controller.get('overalltl').pushObject({options:options, chartData:chartData, drilldown:drilldown});
			}
			if(Em.isEmpty(responsequestions)){
				//_controller.set('overalltl',Em.A());
				_controller.get('questions').removeObjects(_controller.get('questions'));

			}else{
				responsequestions.forEach(function(item, index, enumerable){
					var pie = Em.A();
					var column = Em.A();
					//	console.log(item);
					//	console.log(item.tl);
					// ,		options3d: {
					// 		enabled: true,
					// 		alpha: 45,
					// 		beta: 0,
					// 		depth: 35
					// 	}
					var options= {
						chart:{	type:'pie', plotBackgroundColor: null,	plotBorderWidth: null,	plotShadow: false }, 
						title:{text:''},
						tooltip: {	pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
						plotOptions: {
							pie: {
								
								allowPointSelect: true,
								cursor: 'pointer',
								center: ['50%', '50%'],
								//colors: pieColors,
								colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
									return {
										radialGradient: {
											cx: 0.5,
											cy: 0.3,
											r: 0.7
										},
										stops: [
											[0, color],
											[1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
										]
									};
								}),
								dataLabels: {
									enabled: true,
									format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
									distance: -50,
									filter: {
										property: 'percentage',
										operator: '>',
										value: 4
									}
								}
							}
						}
					};
					var chartData = Em.A();
					chartData.pushObject({name: 'D index', y: parseFloat(((item.dsat/item.total)*100).toFixed(2)), sliced: true, selected: true	});
					chartData.pushObject({name: 'N index', y: parseFloat(((item.nut/item.total)*100).toFixed(2))});
					chartData.pushObject({name: 'S index', y: parseFloat(((item.csat/item.total)*100).toFixed(2))});
					pie.pushObject({options:options, chartData:[{name:'survey', data:chartData}]	});


					var categories = [];
					var csat = [];
					var nut = [];
					var dsat = [];
				//var data = [];
					var title = '';
					item.tl.forEach(function(item2, index, enumerable){
						//console.log(item2);
						title = item.title;
						categories.push(item2.title);

						csat.push(parseFloat(((item2.csat/item2.total)*100).toFixed(2)));
						nut.push(parseFloat(((item2.nut/item2.total)*100).toFixed(2)));
						dsat.push(parseFloat(((item2.dsat/item2.total)*100).toFixed(2)));
						//_controller.get('overalltl').pushObject({link:'agents.mySurvey', survey_id:item.survey_id, name:'Survey '+(index+1) });
					});
					var chartData = Em.A();
						chartData.pushObject({name: 'D index', data: dsat});
						chartData.pushObject({name: 'N index', data: nut});
						chartData.pushObject({name: 'S index', data: csat});
					var options = {
						chart: { type: 'column'	},
						title: { text: ''	},
						xAxis: { categories: categories	},
						yAxis: { min: 0, title: { text: 'Score Percentage' }	},
						tooltip: {
							pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
							shared: true
						},
						plotOptions: {	column: { 
							pointPadding: 0.1,
						//	borderWidth: 0,
							groupPadding: 0,
							shadow: false,
							stacking: 'percent', 
							dataLabels: {
								enabled: true,
								color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'black'
							}
						} }
					};
					column.pushObject({options:options, chartData:chartData	});


					_controller.get('questions').pushObject({pie:pie,column:column, title:item.title});
					//_controller.get('questions').removeObjects(_controller.get('questions'));

			//		console.log(_controller.get('questions'));

				});

			//	console.log(_controller.get('questions'));


				



			}
			// if(Em.isEmpty(response.stats) || response.stats[0].current == 'Logout'){
			// 	window.location.assign(javaScriptApplicationRoot+'Careem/logout');
			// 	return false;
			// }
			// _controller.get('notify').removeObjects(_controller.get('notify'));
			// _controller.set('breakTime', response.stats[0].Break);
			// _controller.set('loginTime', response.stats[0].total);
			// _controller.set('currentStatus', response.stats[0].current);

			//console.log(Em.isEmpty(response.survey));
			//console.log(response.survey.get('count'));
			//console.log(response.survey[0]);

			// if(!Em.isEmpty(response.survey) && response.survey[0].count > 0 && Em.isEmpty(response.survey[0].saved)){
			// 	_controller.set('notifications', true);
			// 	_controller.set('notificationCount', response.survey.length);
			// 	response.survey.forEach(function(item, index, enumerable){
			// 		_controller.get('notify').pushObject({link:'agents.mySurvey', survey_id:item.survey_id, name:'Survey '+(index+1) });
			// 	});
			// }
			//console.log(_controller.get('notify'));
			
		}, function(error){ 
			//handle error  
			console.log(error);
		});
	}.observes('dashboard.survey_id'),
	/*funcByQualityMonitor:function(){
		var self  = this;
		var value = this.get('monitoredBy');

		if(typeof value === 'undefined' || value == '' || value <= 0){
			return false;
		}
		this.store.find('emaildrivers',{'for_id':value,'type_id':0}).then(function(driver){
			self.set('agentticketa',driver);
		});
		return;
	}.observes('monitoredBy'),*/
	actions:{
	}
	
});
// telenor.AgentticketController = Ember.ObjectController.extend({
// 	need:['agenttickets'],

// });
