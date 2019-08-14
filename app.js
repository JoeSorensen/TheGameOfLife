function Flip (y, x) {
    Vue.set(vm.board[y], x, !vm.board[y][x])
}

const cell = Vue.component("cell", {
    props: ["val", "y", "x"],
    template: '<div v-on:click="this.Flip(y, x)" v-if="val === true" style="width:50px; height:50px; background: yellow; display: inline-block"></div>' +
        '<div v-on:click="this.Flip(y, x)" v-else-if="val === false" style="width:50px; height:50px; background: black; display: inline-block"></div>'
});

var vm = new Vue({
    el: "#app",
    data: {
        board: [
            [false, false, false, false],
            [false, false, true, false],
            [false, true, true, false],
            [false, false, false, false]
        ]
    },
    methods: {
        NextStep: function() {
            for (i = 0; i < this.board.length; i++) {
                for (j = 0; j < this.board[i].length; j++) {
                    const isLive = this.board[i][j];
                    const liveNeighbors = this.LiveNeighbors(i, j);
                    if(isLive) {
                        if(liveNeighbors < 2)
                            this.flipState(i, j);
                        else if(liveNeighbors > 3)
                            this.flipState(i, j);
                    } else {
                        if(liveNeighbors === 3)
                            this.flipState(i, j);
                    }





                    /*if (this.board[i][j] === false) {
                        if (this.LiveNeighbors(i, j) === 3)
                            Vue.set(this.board[i], j, true);
                        else
                            Vue.set(this.board[i], j, false);
                    } else {
                        if(this.LiveNeighbors(i, j) > 3 || this.LiveNeighbors(i, j) < 2)
                            Vue.set(this.board[i], j, false);
                        else
                            if(this.LiveNeighbors(i, j) === 3 || this.LiveNeighbors(i, j) === 2)
                                Vue.set(this.board[i], j, true);
                    }*/
                }
            }
        },

        flipState: function(y,x){
            Vue.set(this.board[y], x, !this.board[y][x]);
        },

        /**
         * @return {number}
         */
        LiveNeighbors: function(y, x) {
            let count = 0;
            if (y === 0) {
                if (x === 0) {
                    if (this.board[y][x + 1] === true)
                        count++;
                    if (this.board[y + 1][x] === true)
                        count++;
                    if (this.board [y + 1][x + 1] === true)
                        count++;
                } else if (x === this.board[y].length - 1) {
                    if (this.board[y][x - 1] === true)
                        count++;
                    if (this.board[y + 1][x] === true)
                        count++;
                    if (this.board [y + 1][x - 1] === true)
                        count++;
                } else {
                    if (this.board[y][x + 1] === true)
                        count++;
                    if (this.board[y][x - 1] === true)
                        count++;
                    if (this.board[y + 1][x] === true)
                        count++;
                    if (this.board [y + 1][x + 1] === true)
                        count++;
                    if (this.board [y + 1][x - 1] === true)
                        count++;
                }
            } else if (y === this.board.length - 1) {
                if (x === 0) {
                    if (this.board[y][x + 1] === true)
                        count++;
                    if (this.board[y - 1][x] === true)
                        count++;
                    if (this.board [y - 1][x + 1] === true)
                        count++;
                } else if (x === this.board[y].length - 1) {
                    if (this.board[y][x - 1] === true)
                        count++;
                    if (this.board[y - 1][x] === true)
                        count++;
                    if (this.board [y - 1][x - 1] === true)
                        count++;
                } else {
                    if (this.board[y][x + 1] === true)
                        count++;
                    if (this.board[y][x - 1] === true)
                        count++;
                    if (this.board[y - 1][x] === true)
                        count++;
                    if (this.board [y - 1][x + 1] === true)
                        count++;
                    if (this.board [y - 1][x - 1] === true)
                        count++;
                }
            } else {
                if (x === 0) {
                    if (this.board[y][x + 1] === true)
                        count++;
                    if (this.board[y + 1][x] === true)
                        count++;
                    if (this.board[y - 1][x] === true)
                        count++;
                    if (this.board [y + 1][x + 1] === true)
                        count++;
                    if (this.board [y - 1][x + 1] === true)
                        count++;
                } else if (x === this.board[y].length - 1) {
                    if (this.board[y][x - 1] === true)
                        count++;
                    if (this.board[y + 1][x] === true)
                        count++;
                    if (this.board[y - 1][x] === true)
                        count++;
                    if (this.board [y + 1][x - 1] === true)
                        count++;
                    if (this.board [y - 1][x - 1] === true)
                        count++;
                } else {
                    if (this.board[y][x - 1] === true)
                        count++;
                    if (this.board[y + 1][x] === true)
                        count++;
                    if (this.board[y - 1][x] === true)
                        count++;
                    if (this.board [y + 1][x - 1] === true)
                        count++;
                    if (this.board [y - 1][x - 1] === true)
                        count++;
                    if (this.board[y][x + 1] === true)
                        count++;
                    if (this.board [y + 1][x + 1] === true)
                        count++;
                    if (this.board [y - 1][x + 1] === true)
                        count++;
                }
            }
            return count;
        },

        NewBoard: function(sizeX, sizeY) {
            for(i = 0; i < this.board.length; i++) {
                while(this.board[i].length < sizeX)
                    this.board[i].push(false);
            }
            while(this.board.length < sizeY)
                this.board.push(new Array(sizeX).fill(false))
        }
    },
    components: {
        cell: cell
    }
});