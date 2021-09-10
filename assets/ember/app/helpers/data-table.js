telenor.DataTableView = Em.View.extend({
	tagName:'table',
	classNames:['table','table-striped','table-bordered','dataTable'],	
	//columnsBinding: 'controller.columns',
	
	didInsertElement: function() {
	  var self = this;
	
	  var columns = this.get('columns');
	  var link = javaScriptApplicationRoot + this.get('link');
	  this.$().dataTable( {
		dom: 'Bfrtip',
		"iDisplayLength": 50,
		"scrollY": 500,
		"scrollX": true,
		//'bProcessing':true, 
		//'bServerSide':true,
		//'sAjaxSource': link,
		processing: true,
		serverSide: true,
		ajax:{url:link, dataSrc:""},
		
	//	"bJQueryUI": true,
	//	"aaData": data,	
	
		"aoColumns": columns,
		"language": { processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading..n.</span> '},
		lengthMenu: [
            [ 10, 25, 50, -1 ],
            [ '10 rows', '25 rows', '50 rows', 'Show all' ]
        ],
		buttons: [ 'pageLength'
			//'copy', 'excel', 'pdf'
			// ,{
            //     text: 'My button',
            //     action: function ( e, dt, node, config ) {
            //         alert( 'Button activated' );
            //     }
            // }
		],
		"sEmptyTable": "Loading data from server"
	  });


	},
	onValueChanged: function() {
	  var self = this;
	  var value = this.get('value');

	//   {"name": "from_date", "value": fDate[0]},
	//   {"name": "to_date", "value": fDate[1]}, 
	//   {"name": "from_date2", "value": tDate[0]},
	//   {"name": "to_date2", "value": tDate[1]},
	//   {"name": "entered", "value": enter},
	//   {"name": "closed", "value": close},
	//   {"name": "status", "value": status}
	  var data = null;
	  if(value === null || value === undefined) {
		console.log('Value is null');
		data = [];
	  } else {
		console.log('Got Value: ' + JSON.stringify(value));
		data = value;//value.getEach('data'); //for Ember Data
	  }
	  var columns = this.get('columns');
	  this.$().dataTable( {
		"iDisplayLength": 50,
		"scrollY": 500,
		"scrollX": true,
		//'bProcessing':true, 
		//'bServerSide':true,
		//'sAjaxSource': link,
		processing: true,
        serverSide: true,
        ajax:{url:link, dataSrc:""},
		
	//	"bJQueryUI": true,
	//	"aaData": data,
	
	
		"aoColumns": columns,
		"fnServerParams": function ( aoData ) {
			aoData.push(value);
		 },
		"sEmptyTable": "Loading data from server"
	  });
	  return;
	}.observes('value')
  });
