import { draw } from './main.js'
import { mapOverflowToTorus, leaf_positions, tree_positions, shroom_positions, world_size } from './world.js'

const kara_pos = {
	x: 0,
	y: 0,
}
let kara_orientation = 1 // 0 up, 1 right, 2 down, 3 left

const kara = {
	move: function(){
		if (this.treeFront()) {
			alert('kara cannot move: tree front')
			return
		}
		if (this.mushroomFront()){
			const vec = this.getLookVector()
			let frontField = {
				x: vec.x + kara_pos.x,
				y: vec.y + kara_pos.y,
			}
			frontField = mapOverflowToTorus(frontField)
			let nextField={
				x:frontField.x + vec.x,
				y:frontField.y + vec.y,
			}
			nextField = mapOverflowToTorus(nextField)
			if (shroom_positions.findIndex((shroom) => {return shroom.x == nextField.x && shroom.y == nextField.y}) >= 0) {
				alert('kara cannot push multiple mushrooms')
				return
			}
			if (tree_positions.findIndex((tree) => {return tree.x == nextField.x && tree.y == nextField.y}) >= 0) {
				alert('kara tried pushing a mushroom into a tree')
				return
			}
			const idx = shroom_positions.findIndex((shroom) => {return shroom.x == frontField.x && shroom.y == frontField.y})
			shroom_positions[idx] = nextField
		}
		const vec = this.getLookVector()
		kara_pos.x += vec.x
		kara_pos.y += vec.y
		if (kara_pos.x < 0){
			kara_pos.x =world_size.x - 1
		} else if (kara_pos.x>=world_size.x){
			kara_pos.x = 0
		} else if (kara_pos.y < 0){
			kara_pos.y=world_size.y - 1
		} else if (kara_pos.y >= world_size.y){
			kara_pos.y = 0
		}
		draw()
	},
	turnLeft: function(){
		kara_orientation--
		if (kara_orientation < 0) {
			kara_orientation = 3
		}
		draw()
	},
	turnRight: function(){
		kara_orientation++
		if (kara_orientation > 3) {
			kara_orientation = 0
		}
		draw()
	},
	putLeaf: function(){
		if (this.onLeaf()){
			alert('kara cannot put a leaf on another leaf')
			return
		}
		leaf_positions.push({ x:kara_pos.x, y:kara_pos.y })
		draw()
	},
	takeLeaf: function(){
		const lpos_idx = leaf_positions.findIndex((leaf) => {return leaf.x == kara_pos.x && leaf.y == kara_pos.y})
		if (lpos_idx == -1){
			alert('kara cannot take a leaf where is none')
			return
		}
		leaf_positions.splice(lpos_idx, 1)
		draw()
	},
	onLeaf: function(){
		return leaf_positions.findIndex((leaf) => {return leaf.x == kara_pos.x && leaf.y == kara_pos.y}) >= 0
	},
	treeFront: function(){
		let vec = this.getLookVector()
		vec.x += kara_pos.x
		vec.y += kara_pos.y
		vec = mapOverflowToTorus(vec)
		return tree_positions.findIndex((tree) => {return tree.x == vec.x && tree.y == vec.y}) >= 0

	},
	treeLeft: function(){
		let target = {
			x: kara_pos.x,
			y: kara_pos.y,
		}
		switch (kara_orientation){
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
		target = mapOverflowToTorus(target)
		return tree_positions.findIndex((tree) => {return tree.x == target.x && tree.y == target.y}) >= 0
	},
	treeRight: function(){
		let target = {
			x: kara_pos.x,
			y: kara_pos.y,
		}
		switch (kara_orientation){
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
		target = mapOverflowToTorus(target)
		return tree_positions.findIndex((tree) => {return tree.x == target.x && tree.y == target.y}) >= 0
	},
	mushroomFront: function(){
		let vec = this.getLookVector()
		vec.x += kara_pos.x
		vec.y += kara_pos.y
		vec = mapOverflowToTorus(vec)
		return shroom_positions.findIndex((shroom) => {return shroom.x == vec.x && shroom.y == vec.y}) >= 0
	},
	setPosition: function(x, y) {
		kara_pos.x = x
		kara_pos.y = y
		draw()
	},
	getPosition: function() {
		return { x:kara_pos.x, y:kara_pos.y }
	},
	setOrientation: function(o) {
		if (o < 0){
			o = 0
		} else if (o > 3){
			o = 3
		}
		kara_orientation = o
		draw()
	},
	getOrientation: function() {
		return kara_orientation
	},
	getLookVector: function(){
		switch (kara_orientation){
		case 0:
			return { x:0, y:1 }
		case 1:
			return { x:1, y:0 }

		case 2:
			return { x:0, y:-1 }

		case 3:
			return { x:-1, y:0 }

		}
	},
}

export { kara, kara_pos, kara_orientation }
