'use strict';
window.requirejs.config({
  paths: {
    'jquery': ['/static/vendor/jquery-2.2.3.min'],
    'jquery-private': ['/static/vendor/jquery-private'],
    map: {
      '*': { 'jquery': 'jquery-private' },
      'jquery-private': { 'jquery': 'jquery' }
    },
    'jquery-ui': '/static/vendor/jquery-ui.min',
    'bootstrap': ['/static/vendor/bootstrap.min'],
    'jszip': '/static/vendor/jszip.min',
    'datatables.net': '/static/vendor/jquery.dataTables.min',
    'datatables.net-bs': '/static/vendor/dataTables.bootstrap.min',
    'datatables.net-buttons': '/static/vendor/dataTables.buttons.min',
    'datatables.net-responsive': '/static/vendor/dataTables.responsive.min',
    'responsive.bootstrap': '/static/vendor/responsive.bootstrap.min',
    'buttons.bootstrap': '/static/vendor/buttons.bootstrap.min',
    'buttons.html5': '/static/vendor/buttons.html5.min',
    'buttons.print': '/static/vendor/buttons.print.min',
    'moment': '/static/vendor/moment.2.11.2.min',
    'daterangepicker': '/static/vendor/daterangepicker',
    'bootstrap_datepicker': '/static/vendor/bootstrap-datepicker',
    'select2': '/static/vendor/select2.full.min',
    'fastclick': '/static/vendor/fastclick.min',
    'adminLTE': '/static/vendor/app.min',
    'jqueryCookie': '/static/vendor/jquery.cookie.1.4.1',
    'jqueryValidate': '/static/vendor/jquery.validate.min',
    'common': '/static/javascripts/common',
    'axios': 'https://unpkg.com/axios/dist/axios.min',
    'quiz_component': ['/static/javascripts/components/quiz_component'],
    'quiz_service': ['/static/javascripts/components/quiz_service'],
    'slimScroll': '/static/vendor/jquery.slimscroll.min',
    'bootstrap_datetimepicker': ['/static/vendor/bootstrap-datetimepicker.min'],
    'es6-promise': '/static/vendor/es6-promise.min',
    'Vimeo': '/static/vendor/player.min',
    'tinymce': '/static/vendor/tinymce/tinymce.min',
    'pace': '/static/vendor/pace.min',
    'lodash': '/static/vendor/lodash.min',
    'handlebars': '/static/vendor/handlebars.min',
    'text': '/static/vendor/text',
    'dom-checkbox': '/static/vendor/dom-checkbox',
    'tag-it': '/static/vendor/tag-it.min',
    'jquery-1.5.2': '/static/vendor/aquaplayer/js/jquery-1.5.2.min.js',
    'nplayer_conf': '/static/vendor/aquaplayer/js/nplayer_conf.js?20170104131',
    'nplayer': '/static/vendor/aquaplayer/js/nplayer.js?20170104131',
    'nplayer_ui': '/static/vendor/aquaplayer/js/nplayer_ui.js?20170104131',
    'cdnproxy': '/static/vendor/aquaplayer/js/cdnproxy.js?20170104131'
    // 'smoothstate': '/static/vendor/jquery.smoothstate.min'
  },
  shim: {
    'quiz_component': {
      'deps': ['jquery']
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'daterangepicker': {
      deps: ['jquery', 'moment']
    },
    'bootstrap_datepicker': {
      deps: ['jquery']
    },
    'adminLTE': {
      deps: ['jquery', 'bootstrap']
    },
    'jquery-ui': {
      deps: ['jquery']
    },
    'jqueryCookie': {
      deps: ['jquery']
    },
    'jqueryValidate': {
      deps: ['jquery']
    },
    'smoothstate': {
      deps: ['jquery']
    },
    'slimScroll': {
      deps: ['jquery']
    },
    'dom-checkbox': {
      deps: ['jquery']
    },
    'tag-it': {
      deps: ['jquery', 'jquery-ui']
    }
  }
});

