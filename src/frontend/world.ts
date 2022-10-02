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
			b_world.remove_leaf(x, y)
		}
		draw()
	},
	setTree:function(x, y, putTree: boolean): void{
		if (putTree){
			b_world.push_tree(x, y)
		} else {
			b_world.remove_tree(x, y)
		}
		draw()
	},
	setMushroom:function(x, y, putMushroom: boolean): void{
		if (putMushroom){
			b_world.push_mushroom(x, y)
		} else {
			b_world.remove_mushroom(x, y)
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
