(function(){
	var WireWorld = {
		EMPTY : 0,
		CONDUCTOR : 1,
		HEAD : 2,
		TAIL : 3
	};

	window.WireWorld = function(listeners) {
		return new CellAutomaton(function() {
			return WireWorld.EMPTY;
		}, function(cells) {
			if(cells[4] == WireWorld.EMPTY) {
				return WireWorld.EMPTY;
			}else if(cells[4] == WireWorld.HEAD) {
				return WireWorld.TAIL;
			}else if(cells[4] == WireWorld.TAIL) {
				return WireWorld.CONDUCTOR;
			}else if(cells[4] == WireWorld.CONDUCTOR) {
				var m = 0;
				for(var i=0;i < cells.length;i++) {
					if(cells[i] == WireWorld.HEAD) {
						m++;
					}
				}
				if(m == 1 || m == 2) {
					return WireWorld.HEAD;
				}
				return WireWorld.EMPTY;
			}
		}, listeners);
	}

	function View(w, h) {
		this.w = w;
		this.h = h;
	}
	View.prototype.init = function(map) {
		var self = this;
		var snap = new Snap("#svg");
		var group = snap.g();
		var gui_group = snap.g();
		var clicker = snap.rect(0, 0, 3000, 3000);
		clicker.attr({
			'fill-opacity': 0
		});
		function addState(x, y) {
			var cx = ((x/30)>>0);
			var cy = ((y/30)>>0);
			var s = map.get(cx, cy);
			s++;
			if(s >= 4) {
				s = 0;
			}
			map.set(cx, cy, s);
		}
		clicker.click(function(e, x, y) {
			addState(x, y);
		});
		clicker.drag(function(dx, dy, x, y) {
			addState(x, y);
		}, function(x, y) {
			addState(x, y);
		}, function(e) {
		});
		gui_group.append(clicker);
		group.attr({
		    fill: "#bada55",
		    //stroke: "#000",
		    //strokeWidth: 2
		});
		this.elems = [];
		for(var i=0;i < this.w;i++) {
			this.elems[i] = [];
			for(var j=0;j < this.h;j++) {
				this.elems[i][j] = {};
				this.elems[i][j].rect = snap.rect(i*30, j*30, 30, 30);
				//this.elems[i][j].text = snap.text(i*30, j*30+20, "");
				group.append(this.elems[i][j].rect);
				//group.append(this.elems[i][j].text);
			}
		}
	}
	View.prototype.change = function(x, y, color) {
		this.elems[x][y].rect.attr({
			fill : color
		});
	}
	View.prototype.changeText = function(x, y, text) {
		if(!this.elems[x][y].text) {
			return;
		}
		this.elems[x][y].text.attr({
			text : text
		});
	}
	window.View = View;
}())