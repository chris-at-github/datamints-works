<template>
	<div class="wks-board-select">
		<ul>
			<li v-for="board in boards">
				<a v-bind:href="'/index.php?id=3&tx_datamintsworks_frontend[controller]=Board&tx_datamintsworks_frontend[action]=index&tx_datamintsworks_frontend[board]=' + board.uid">{{board.title}}</a>
			</li>
		</ul>
	</div>
</template>

<script>
	import BoardManager from '../Managers/Board';

	export default {
		data: function() {
			return {
				boards: []
			}
		},

//		computed: {
//			// whenever question changes, this function will run
//			boards: function() {
//				console.log(BoardManager.storage)
//			}
//		},

		methods: {
		},

		created: function() {
			this.boards = BoardManager.find();
		}
	}
</script>