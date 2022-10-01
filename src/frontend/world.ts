import { setKaraActive } from './kara.js'
import { draw } from './main.js'
import { b_world } from '../backend/world.js'

const world = {
	clearAll:function(): void{
		b_world.clear_world()
		setKaraActive(false)
		draw()
	},
	setLeaf:function(x, y, putLeaf: boolean): void{
		if (putLeaf){
			b_world.push_leaf(x, y)
		} else {
			const idx = b_world.find_leaf_index(x, y)
			b_world.leafs.splice(idx, 1)
		}
		draw()
	},
	setTree:function(x, y, putTree: boolean): void{
		if (putTree){
			b_world.push_tree(x, y)
		} else {
			const idx = b_world.find_tree_index(x, y)
			b_world.trees.splice(idx, 1)
		}
		draw()
	},
	setMushroom:function(x, y, putMushroom: boolean): void{
		if (putMushroom){
			b_world.push_mushroom(x, y)
		} else {
			const idx = b_world.find_mushroom_index(x, y)
			b_world.mushrooms.splice(idx, 1)
		}
		draw()
	},
	isEmpty:function(x, y): boolean{
		return b_world.is_empty(x, y)
	},
	isLeaf:function(x, y): boolean{
		return b_world.is_leaf(x, y)

	},
	isTree:function(x, y): boolean{
		return b_world.is_tree(x, y)
	},
	isMushroom:function(x, y): boolean{
		return b_world.is_mushroom(x, y)
	},
	getSize: function() {
		return b_world.get_size()
	},
}

export { world }
