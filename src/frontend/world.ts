import { draw } from './main.js'
import b_world from '../backend/world.js'

const world = {
	clearAll:function(): void{
		b_world.clear_world()
		draw()
	},
	setLeaf:function(x: number, y: number, putLeaf: boolean): void{
		if (putLeaf){
			b_world.push_leaf(x, y, true)
		} else {
			b_world.remove_leaf(x, y, true)
		}
		draw()
	},
	setTree:function(x: number, y: number, putTree: boolean): void{
		if (putTree){
			b_world.push_tree(x, y, true)
		} else {
			b_world.remove_tree(x, y, true)
		}
		draw()
	},
	setMushroom:function(x: number, y: number, putMushroom: boolean): void{
		if (putMushroom){
			b_world.push_mushroom(x, y, true)
		} else {
			b_world.remove_mushroom(x, y, true)
		}
		draw()
	},
	isEmpty:function(x: number, y: number): boolean{
		return b_world.is_empty(x, y)
	},
	isLeaf:function(x: number, y: number): boolean{
		return b_world.is_leaf(x, y)

	},
	isTree:function(x: number, y: number): boolean{
		return b_world.is_tree(x, y)
	},
	isMushroom:function(x: number, y: number): boolean{
		return b_world.is_mushroom(x, y)
	},
	getSize: function() {
		return b_world.get_size()
	},
}

export default world
