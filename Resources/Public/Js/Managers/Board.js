if(DatamintsWorks.Store.Boards === undefined) {
	DatamintsWorks.Store.Boards = [];
}

export default {
	fill: function(boards) {

		DatamintsWorks.Store.Boards.length = 0;

		_.each(boards, function(board) {
			DatamintsWorks.Store.Boards.push(board);
		});
	},

	find: function() {
		return DatamintsWorks.Store.Boards;
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