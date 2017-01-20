/**
 * Created by yijaejun on 01/12/2016.
 */
'use strict';
requirejs.config({
	paths: {
		jquery : ['/vendor/plugins/jQuery/jquery-2.2.3.min']
		,jquery_ui : '/vendor/plugins/jQueryUI/jquery-ui.min'
		,bootstrap : ['/vendor/bootstrap/js/bootstrap.min']
		,jquery_datatable : '/vendor/plugins/datatables/jquery.dataTables.min'
		,bootstrap_datatable : '/vendor/plugins/datatables/dataTables.bootstrap.min'
        ,responsive_datatable : '/vendor/plugins/datatables/extensions/Responsive/js/dataTables.responsive.min'
		,moment : '/vendor/plugins/moment/moment.2.11.2.min'
        ,moment_ko : '/vendor/plugins/moment/locale/kr'
        // ,moment_ko : '/vendor/plugins/moment/locale/ko'
		,daterangepicker : '/vendor/plugins/daterangepicker/daterangepicker'
		,bootstrap_datepicker : '/vendor/plugins/datepicker/bootstrap-datepicker'
		,excellentExport : '/vendor/plugins/ExcellentExport/csv.2.0.0'
		,select2 : '/vendor/plugins/select2/select2.full.min'
		,fastclick : '/vendor/plugins/fastclick/fastclick'
		,adminLTE : '/vendor/dist/js/app.min'
		,jqueryCookie : '/vendor/plugins/jquery_cookie/jquery.cookie.1.4.1'
        ,jqueryValidate :'/vendor/plugins/jquery_validate/jquery.validate.min'
		,common : '/javascripts/common'
		,axios : 'https://unpkg.com/axios/dist/axios.min'
        ,quiz_component: ['/javascripts/components/quiz_component']
        ,quiz_service: ['/javascripts/components/quiz_service']
        ,slimScroll: '/vendor/plugins/slimScroll/jquery.slimscroll.min'
        ,bootstrap_datetimepicker: ['/vendor/plugins/bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min']
	},
	shim : {

        'quiz_component': {
			deps: ['jquery']
		},
		'bootstrap' : {
			deps: ['jquery']
		},
		'bootstrap_datatable' : {
			deps: ['jquery', 'jquery_datatable']
		},
		'responsive_datatable' : {
			deps: ['jquery', 'jquery_datatable']
		},        
		'daterangepicker' : {
			deps: ['jquery', 'moment']
		},
		// 'bootstrap_datetimepicker' : {
		// 	deps: ['jquery', 'moment']
		// },        
		'bootstrap_datepicker' : {
			deps: ['jquery']
		},
		'adminLTE' : {
			deps: ['jquery', 'bootstrap']
		},
		'jquery_ui' : {
			deps: ['jquery']
		},
		'jqueryCookie' : {
			deps: ['jquery']
		},
        'jqueryValidate':{
            deps: ['jquery']
        },
        'slimScroll':{
            deps: ['jquery']
        }             
	}
});
