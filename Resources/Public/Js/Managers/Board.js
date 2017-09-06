import Vue from 'vue';
import LazyStore from '../Stores/LazyStore';

if(Works.Store.Boards === undefined) {
	Works.Store.Boards = {};
}

export default {
	fill: function(boards) {

		// Works.Store.Boards.length = 0;

		_.each(boards, function(board) {

			// @see: https://vuejs.org/v2/guide/list.html#Caveats
			Vue.set(Works.Store.Boards, board.uid, new LazyStore(board));
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
		Vue.set(Works.Store.Boards, 2, new LazyStore({uid: 2, title: 'datamints.com'}));

		return {
			'uid': uid,
			'title': 'abc.de'
		};
	}
};