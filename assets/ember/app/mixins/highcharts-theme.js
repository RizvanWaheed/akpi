telenor.HighchartsThemeMixin = Ember.Mixin.create({
	buildTheme: function() {
	  Highcharts.theme = {
		colors: [  '#d9534f', '#e4cb10', '#41B314', '#337ab7', '#f15c80', '#e4d354', '#91e8e1', '#f7a35c', '#8085e9', '#00f900','#ffff3c','#ff2600',  '#8d4653', '#90ed7d', '#7cb5ec','#91e8e1'
			// '#f45b5b',//Redih
		  // '#258be2', //Bluish
			// '#55bf3b', 
			// '#666666', 
		  // '#f45b5b', 
		  // '#8085e9', 
		  // '#8d4654', 
		  // '#7798bf', 
		  // '#aaeeee', 
		  // '#ff0066', 
		  // '#eeaaee', 		  
		  // '#df5353', 
		  // '#7798bf', 
		  // '#aaeeee'
		],
		chart: {
		  backgroundColor: null,
		  style: {
			fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
		  }
		},
		credits: {
      enabled: false
    },
		title: {
		  style: {
			color: 'black',
			fontSize: '16px',
			fontWeight: 'bold'
		  }
		},
		subtitle: {
		  style: {
			color: 'black'
		  }
		},
		tooltip: {
		  borderWidth: 0,
		  style: {
			fontSize: '14px'
		  }
		},
		legend: {
		  itemStyle: {
			fontWeight: 'bold',
			fontSize: '14px'
		  }
		},
		xAxis: {
		  labels: {
			style: {
			  color: '#6e6e70',
			  fontSize: '14px'
			}
		  },
		  title: {
			style: {
			  fontSize: '12px'
			}
		  }
		},
		yAxis: {
		  labels: {
			style: {
			  color: '#6e6e70',
			  fontSize: '14px'
			}
		  },
		  title: {
			style: {
			  fontSize: '12px'
			}
		  }
		},
		plotOptions: {
		  series: {
			shadow: true
		  },
		  candlestick: {
			lineColor: '#404048'
		  }
		},
		navigator: {
		  xAxis: {
			gridLineColor: '#D0D0D8'
		  }
		},
		rangeSelector: {
		  buttonTheme: {
			fill: 'white',
			stroke: '#C0C0C8',
			'stroke-width': 1,
			states: {
			  select: {
				fill: '#D0D0D8'
			  }
			}
		  }
		},
		scrollbar: {
		  trackBorderColor: '#C0C0C8'
		},
		background2: '#E0E0E8',
		global: {
		  timezoneOffset: new Date().getTimezoneOffset()
		}
	  };
	  return Highcharts.setOptions(Highcharts.theme);
	}
  });
