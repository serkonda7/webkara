import { draw } from './main.js'
import { world } from './world.js'

function clampToTorus(cell){
	if (cell.x >= world.width){
		cell.x = 0
	} else if (cell.x < 0) {
		cell.x = world.width - 1
	}
	if (cell.y >= world.height){
		cell.y = 0
	} else if (cell.y < 0) {
		cell.y = world.height - 1
	}
	return cell
}

const kara = {
	x: 0,
	y: 0,
	lookOrientation: 1, // 0 up, 1 right, 2 down, 3 left
	move: function(){
		if (this.treeFront()) {
			alert('kara cannot move: tree front')
			return
		}
		if(this.mushroomFront()){
			const vec = this.getLookVector()
			let frontField = {
				x: vec.x + this.x,
				y: vec.y + this.y
			}
			frontField = clampToTorus(frontField)
			let nextField={
				x:frontField.x + vec.x,
				y:frontField.y + vec.y
			}
			nextField = clampToTorus(nextField)
			if (world.shroom_positions.findIndex(shroom => shroom.x == nextField.x && shroom.y == nextField.y) >= 0) {
				alert('kara cannot push multiple mushrooms')
				return
			}
			if (world.tree_positions.findIndex(tree => tree.x == nextField.x && tree.y == nextField.y) >= 0) {
				alert('kara tried pushing a mushroom into a tree')
				return
			}
			const idx = world.shroom_positions.findIndex(shroom => shroom.x == frontField.x && shroom.y == frontField.y)
			world.shroom_positions[idx] = nextField
		}
		const vec = this.getLookVector()
		this.x += vec.x
		this.y += vec.y
		if(this.x < 0){
			this.x =world.width - 1
		} else if(this.x>=world.width){
			this.x = 0
		} else if(this.y < 0){
			this.y=world.height - 1
		} else if(this.y >= world.height){
			this.y = 0
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
		this.lookOrientation++
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
	treeFront: function(){
		let vec = this.getLookVector()
		vec.x += this.x
		vec.y += this.y
		vec = clampToTorus(vec)
		return world.tree_positions.findIndex(tree => tree.x == vec.x && tree.y == vec.y) >= 0

	},
	treeLeft: function(){
		let target = {
			x: this.x,
			y: this.y
		}
		switch(this.lookOrientation){
		case 0:
			target.x--
			break
		case 1:
			target.y++
			break
		case 2:
			target.x++
			break
		case 3:
			target.y--
			break
		}
		target = clampToTorus(target)
		return world.tree_positions.findIndex(tree => tree.x == target.x && tree.y == target.y) >= 0
	},
	treeRight: function(){
		let target = {
			x: this.x,
			y: this.y
		}
		switch(this.lookOrientation){
		case 0:
			target.x++
			break
		case 1:
			target.y--
			break
		case 2:
			target.x--
			break
		case 3:
			target.y++
			break
		}
		target = clampToTorus(target)
		return world.tree_positions.findIndex(tree => tree.x == target.x && tree.y == target.y) >= 0
	},
	mushroomFront: function(){
		let vec = this.getLookVector()
		vec.x += this.x
		vec.y += this.y
		vec = clampToTorus(vec)
		return world.shroom_positions.findIndex(shroom => shroom.x == vec.x && shroom.y == vec.y) >= 0
	},
	setPosition: function(x, y) {
		this.x = x
		this.y = y
		draw()
	},
	getPosition: function() {
		return {x:this.x, y:this.y}
	},
	setOrientation: function(o) {
		if (o < 0){
			o = 0
		} else if (o > 3){
			o = 3
		}
		this.lookOrientation = o
		draw()
	},
	getOrientation: function() {
		return this.lookOrientation
	},
	getLookVector: function(){
		switch(this.lookOrientation){
		case 0:
			return{x:0,y:1}
		case 1:
			return{x:1,y:0}

		case 2:
			return{x:0,y:-1}

		case 3:
			return{x:-1,y:0}

		}
	}
}

export { kara }
