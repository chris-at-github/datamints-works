import LazyStore from '../Stores/LazyStore';

if(Works.Store.Boards === undefined) {
	Works.Store.Boards = [];
}

export default {
	fill: function(boards) {

		Works.Store.Boards.length = 0;

		_.each(boards, function(board) {
			Works.Store.Boards.push(new LazyStore(board));
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
		return {
			'uid': uid,
			'title': 'abc.de'
		};
	}
};