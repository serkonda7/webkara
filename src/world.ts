import { draw } from './main.js'
import { Vector2 } from './vector.js'

const world_size = {
	x: 7,
	y: 7,
}

let leaf_positions = []
let tree_positions = []
let shroom_positions = []

const world = {
	clearAll:function(){
		leaf_positions = []
		tree_positions =[]
		shroom_positions=[]
		draw()
	},
	setLeaf:function(x, y, putLeaf){
		if (putLeaf){
			leaf_positions.push({ x:x, y:y })
		} else {
			const lpos_idx = leaf_positions.findIndex((leaf) => {
				return leaf.x === x && leaf.y === y
			})
			leaf_positions.splice(lpos_idx, 1)
		}
		draw()
	},
	setTree:function(x, y, putTree){
		if (putTree){
			tree_positions.push({ x:x, y:y })
		} else {
			const lpos_idx = tree_positions.findIndex((tree) => {
				return tree.x === x && tree.y === y
			})
			tree_positions.splice(lpos_idx, 1)
		}
		draw()
	},
	setMushroom:function(x, y, putMushroom){
		if (putMushroom){
			shroom_positions.push({ x:x, y:y })
		} else {
			const lpos_idx = shroom_positions.findIndex((shroom) => {
				return shroom.x === x && shroom.y === y
			})
			shroom_positions.splice(lpos_idx, 1)
		}
		draw()
	},
	isEmpty:function(x, y){
		if ( this.isLeaf(x, y)||this.isTree(x, y)||this.isMushroom(x, y)){
			return false
		}
		return true
	},
	isLeaf:function(x, y){
		return leaf_positions.findIndex((leaf) => {
			return leaf.x === x && leaf.y === y
		}) >= 0

	},
	isTree:function(x, y){
		return tree_positions.findIndex((tree) => {
			return tree.x === x && tree.y === y
		}) >= 0
	},
	isMushroom:function(x, y){
		return shroom_positions.findIndex((shroom) => {
			return shroom.x === x && shroom.y === y
		}) >= 0
	},
	getSizeX:function(){
		return world_size.x
	},
	getSizeY:function(){
		return world_size.y
	},
}

const mapOverflowToWorld = (cell: Vector2): Vector2 => {
	if (cell.x < 0) {
		cell.x = world_size.x - 1
	} else if (cell.x >= world_size.x){
		cell.x = 0
	}
	if (cell.y < 0) {
		cell.y = world_size.y - 1
	} else if (cell.y >= world_size.y){
		cell.y = 0
	}
	return cell
}

export { world, mapOverflowToWorld, leaf_positions, tree_positions, shroom_positions }
