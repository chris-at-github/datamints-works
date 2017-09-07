import Vue from 'vue';
import Store from '../Stores/Store';
import LazyStore from '../Stores/LazyStore';
const Axios = require('axios');

if(Works.Store.Boards === undefined) {
	Works.Store.Boards = {};
}

export default {

	/**
	 * Prueft ob es das Object bereits in der Collection gibt bzw. ob sich nicht nur um ein LazyStore Objekt
	 * handelt
	 *
	 * @param int uid
	 * @return boolean
	 */
	has: function(uid) {
		if(Works.Store.Boards[uid] !== undefined && Works.Store.Boards[uid] instanceof Store) {
			return true;
		}

		return false;
	},

	fill: function(boards) {
		var instance = this;

		_.each(boards, function(board) {

			if(instance.has(board.uid) === false) {

				// @see: https://vuejs.org/v2/guide/list.html#Caveats
				Vue.set(Works.Store.Boards, board.uid, new LazyStore(board));
			}
		});
	},

	find: function() {
		return Works.Store.Boards;
	},

	/**
	 * Liefert alle Informationen zu einem Board
	 *
	 * @param int uid
	 * @return object
	 */
	get: function(uid) {
		if(this.has(uid) === false) {
			Axios.get('/index.php?type=1504532915&tx_datamintsworks_api[controller]=Api\\Board&tx_datamintsworks_api[action]=get&tx_datamintsworks_api[board]=1')
				.then(function (response) {
					response.dat

					// // Stelle die verfuegbaren Boards zur Verfuegung
					if (_.isObject(response.data) === true) {
						Vue.set(Works.Store.Boards, uid, new Store(response.data));
					}

				})
				.catch(function (error) {
					console.log(error);
				});
		}

		return Works.Store.Boards[uid];
	}
};