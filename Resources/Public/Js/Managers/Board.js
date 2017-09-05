if(DatamintsWorks.Store.Boards === undefined) {
	DatamintsWorks.Store.Boards = [];
}

export default {
	fill: function(boards) {

		DatamintsWorks.Store.Boards.length = 0;

		_.each(boards, function(board) {
			DatamintsWorks.Store.Boards.push(board);
		});
	}
};