var Vue = require('vue');

Vue.component('wks-board', require('./Components/Board.vue'));

const application = new Vue({
	el: '#wks-application'
});