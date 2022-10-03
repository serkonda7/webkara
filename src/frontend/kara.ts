import { Vector2 } from '../backend/vector.js'
import { DOM } from './dom_util.js'
import { draw } from './main.js'
import { b_kara, Orientation } from '../backend/kara.js'

const kara = {
	move: function(): void{
		b_kara.move()
		draw()
	},
	turnLeft: function(): void{
		b_kara.turn_left()
		draw()
	},
	turnRight: function(): void{
		b_kara.turn_right()
		draw()
	},
	putLeaf: function(): void{
		b_kara.put_leaf()
		draw()
	},
	takeLeaf: function(): void{
		b_kara.take_leaf()
		draw()
	},
	onLeaf: function(){
		b_kara.on_leaf()
	},
	treeFront: function(){
		return b_kara.tree_front()
	},
	treeLeft: function(){
		return b_kara.tree_left()
	},
	treeRight: function(){
		return b_kara.tree_right()
	},
	mushroomFront: function(){
		return b_kara.mushroom_front()
	},
	setPosition: function(x: number, y: number) {
		b_kara.set_position(x, y)
		draw()
	},
	getPosition: function(): Vector2 {
		return b_kara.get_position()
	},
	setOrientation: function(o: Orientation) {
		b_kara.set_orientation(o)
		draw()
	},
	getOrientation: function() {
		return b_kara.get_orientation()
	},
}

const initKaraButtons = (): void => {
	DOM.setBtnOnclickBinded('#btnMove', kara.move, kara)
	DOM.setBtnOnclickBinded('#btnLeft', kara.turnLeft, kara)
	DOM.setBtnOnclickBinded('#btnRight', kara.turnRight, kara)
	DOM.setBtnOnclickBinded('#btnPut', kara.putLeaf, kara)
	DOM.setBtnOnclickBinded('#btnTake', kara.takeLeaf, kara)
}

export { initKaraButtons, kara }
