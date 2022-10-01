import { setKaraActive } from './kara.js'
import { draw } from './main.js'
import { Vector2 } from './vector.js'
import { b_world } from '../backend/world.js'

const findIndex = (arr: Array<Vector2>, x, y): number => {
	return arr.findIndex((el) => {
		return el.x === x && el.y === y
	})
}

const findLeafIndex = (x, y): number => {
	return findIndex(b_world.leafs, x, y)
}

const findTreeIndex = (x, y): number => {
	return findIndex(b_world.trees, x, y)
}

const findMushroomIndex = (x, y): number => {
	return findIndex(b_world.mushrooms, x, y)
}

const world = {
	clearAll:function(): void{
		b_world.leafs = []
		b_world.trees = []
		b_world.mushrooms = []
		setKaraActive(false)
		draw()
	},
	setLeaf:function(x, y, putLeaf: boolean): void{
		if (putLeaf){
			b_world.leafs.push({ x:x, y:y })
		} else {
			const idx = findLeafIndex(x, y)
			b_world.leafs.splice(idx, 1)
		}
		draw()
	},
	setTree:function(x, y, putTree: boolean): void{
		if (putTree){
			b_world.trees.push({ x:x, y:y })
		} else {
			const idx = findTreeIndex(x, y)
			b_world.trees.splice(idx, 1)
		}
		draw()
	},
	setMushroom:function(x, y, putMushroom: boolean): void{
		if (putMushroom){
			b_world.mushrooms.push({ x:x, y:y })
		} else {
			const idx = findMushroomIndex(x, y)
			b_world.mushrooms.splice(idx, 1)
		}
		draw()
	},
	isEmpty:function(x, y): boolean{
		if ( this.isLeaf(x, y) || this.isTree(x, y) || this.isMushroom(x, y)){
			return false
		}
		return true
	},
	isLeaf:function(x, y): boolean{
		return findLeafIndex(x, y) >= 0

	},
	isTree:function(x, y): boolean{
		return findTreeIndex(x, y) >= 0
	},
	isMushroom:function(x, y): boolean{
		return findMushroomIndex(x, y) >= 0
	},
	getSize:function(): Vector2{
		return {
			x: b_world.size.x,
			y: b_world.size.y,
		}
	},
}

const mapOverflowToWorld = (cell: Vector2): Vector2 => {
	if (cell.x < 0) {
		cell.x = b_world.size.x - 1
	} else if (cell.x >= b_world.size.x){
		cell.x = 0
	}
	if (cell.y < 0) {
		cell.y = b_world.size.y - 1
	} else if (cell.y >= b_world.size.y){
		cell.y = 0
	}
	return cell
}

export {
	world,
	mapOverflowToWorld,
	findLeafIndex, findTreeIndex, findMushroomIndex,
}
