cellautomaton
=============

Javascript library for Cell Automaton.

```
var WireWorld = {
		EMPTY : 0,
		CONDUCTOR : 1,
		HEAD : 2,
		TAIL : 3
};

var wireworld = new CellAutomaton(function() {
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
		}, function(x, y, state) {
		  if(state == WireWorld.EMPTY) {
			  //change color (x, y, "#232323");
		  }else if(state == WireWorld.HEAD) {
			  //change color(x, y, "#ffff00");
		  }else if(state == WireWorld.TAIL) {
			  //change color(x, y, "#0000ff");
		  }else if(state == WireWorld.CONDUCTOR) {
			  //change color(x, y, "#ff0000");
		  }
	  });

wireworld.refresh();
setInterval(function(){
	wireworld.step();
}, 1000);


```
