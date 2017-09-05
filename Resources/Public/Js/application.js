const Vue = require('vue');
const Axios = require('axios');
const _ = require('lodash');

// Managers
import BoardManager from './Managers/Board';

// Components
Vue.component('wks-board', require('./Components/Board.vue'));
Vue.component('wks-board-select', require('./Components/BoardSelect.vue'));

const application = new Vue({
	el: '#wks-application',

	methods: {
		initializeApplicationData: function() {
			Axios.get('/index.php?type=1504532915')
				.then(function (response) {

					// Stelle die verfuegbaren Boards zur Verfuegung
					if(_.isArray(response.data.boards) === true) {
						BoardManager.fill(response.data.boards);
					}

				})
				.catch(function (error) {
					console.log(error);
				});
		}
	},

	created: function () {
		this.initializeApplicationData();
	}
});