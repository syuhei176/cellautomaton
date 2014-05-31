(function(){
	function CellAutomaton(init, rule, listener) {
		this.w = 30;
		this.h = 30;
		this.current_chunk = {x:0, y:0};
		this.map = [];
		this.init = init;
		this.rule = rule;
		this.listener = listener;
		for(var i=0;i < this.w;i++) {
			this.map[i] = [];
			for(var j=0;j < this.h;j++) {
				this.map[i][j] = {
						state : this.init(i, j),
						next : this.init(i, j)
				};
			}
		}
	}
	CellAutomaton.prototype.get = function(i, j) {
		return this.map[i][j].state;
	}
	CellAutomaton.prototype.set = function(i, j, state) {
		if(this.map[i][j].state != state) {
			this.listener(i, j, state);
		}
		this.map[i][j].state = state;
	}
	CellAutomaton.prototype.each = function(cb) {
		var d = 0;
		for(var i=0;i < this.w;i++) {
			for(var j=0;j < this.h;j++) {
				d += cb(i, j, this.map[i][j].state);
			}
		}
		return d;
	}
	CellAutomaton.prototype.refresh = function() {
		for(var i=0;i < this.w;i++) {
			for(var j=0;j < this.h;j++) {
				this.listener(i, j, this.map[i][j].state);
			}
		}
	}
	CellAutomaton.prototype.step = function() {
		for(var i=1;i < this.w-1;i++) {
			for(var j=1;j < this.h-1;j++) {
				this.map[i][j].next = this.rule([this.map[i-1][j-1].state,
				                                 this.map[i  ][j-1].state,
				                                 this.map[i+1][j-1].state,
				                                 this.map[i-1][j].state,
				                                 this.map[i  ][j].state,
				                                 this.map[i+1][j].state,
				                                 this.map[i-1][j+1].state,
				                                 this.map[i  ][j+1].state,
				                                 this.map[i+1][j+1].state], i, j);
			}
		}
		for(var i=0;i < this.w;i++) {
			for(var j=0;j < this.h;j++) {
				if(!this.map[i][j].next) {
					continue;
				}
				if(this.map[i][j].state != this.map[i][j].next) {
					this.listener(i, j, this.map[i][j].next);
					this.map[i][j].state = this.map[i][j].next;
				}
			}
		}
	}
	window.CellAutomaton = CellAutomaton;
}())