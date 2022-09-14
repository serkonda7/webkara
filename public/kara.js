import { draw } from './main.js'
import { world } from './world.js'

const kara = {
	x: 0,
	y: 0,
	lookOrientation: 1, // 0 up, 1 right, 2 down, 3 left
	move: function(){
		switch(this.lookOrientation){
			case 0:
				this.y--
				if(this.y < 0){
					this.y=world.height - 1
				}
				break
			case 1:
				this.x++
				if(this.x>=world.width){
					this.x = 0
				}
				break
			case 2:
				this.y++
				if(this.y >= world.height){
					this.y = 0
				}
				break
			case 3:
				this.x--
				if(this.x < 0){
					this.x =world.width - 1
				}
				break
		}
		draw()
	},
	turnLeft: function(){
		this.lookOrientation--
		if (this.lookOrientation < 0) {
			this.lookOrientation = 3
		}
		draw()
	},
	turnRight: function(){
		this.lookOrientation++;
		if (this.lookOrientation > 3) {
			this.lookOrientation = 0
		}
		draw()
	},
	putLeaf: function(){
		if (this.onLeaf()){
			alert('kara cannot put a leaf on another leaf')
			return
		}
		world.leaf_positions.push({x:this.x, y:this.y})
		draw()
	},
	takeLeaf: function(){
		const lpos_idx = world.leaf_positions.findIndex(leaf => leaf.x == this.x && leaf.y == this.y)
		if (lpos_idx == -1){
			alert('kara cannot take a leaf where is none')
			return
		}
		world.leaf_positions.splice(lpos_idx, 1)
		draw()
	},
	onLeaf: function(){
		return world.leaf_positions.findIndex(leaf => leaf.x == this.x && leaf.y == this.y) >= 0
	},
	setPosition: function(x, y) {
		this.x = x
		this.y = y
		draw()
	},
}

export { kara }
