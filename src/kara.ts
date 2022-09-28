import { Vector2 } from './vector.js'
import { DOM } from './dom_util.js'
import { draw } from './main.js'
import {
	world, mapOverflowToWorld,
	leaf_positions, shroom_positions,
	findLeafIndex, findMushroomIndex,
} from './world.js'

let kara_pos = {
	x: 0,
	y: 0,
}
let kara_orientation = 1 // 0 up, 1 right, 2 down, 3 left

const kara = {
	move: function(): void{
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
			frontField = mapOverflowToWorld(frontField)
			let nextField = {
				x:frontField.x + vec.x,
				y:frontField.y + vec.y,
			}
			nextField = mapOverflowToWorld(nextField)
			if (world.isMushroom(nextField.x, nextField.y)) {
				alert('kara cannot push multiple mushrooms')
				return
			}
			if (world.isTree(nextField.x, nextField.y)) {
				alert('kara tried pushing a mushroom into a tree')
				return
			}
			const idx = findMushroomIndex(frontField.x, frontField.y)
			shroom_positions[idx] = nextField
		}
		const vec = this.getLookVector()
		kara_pos.x += vec.x
		kara_pos.y += vec.y
		kara_pos = mapOverflowToWorld(kara_pos)
		draw()
	},
	turnLeft: function(): void{
		kara_orientation--
		if (kara_orientation < 0) {
			kara_orientation = 3
		}
		draw()
	},
	turnRight: function(): void{
		kara_orientation++
		if (kara_orientation > 3) {
			kara_orientation = 0
		}
		draw()
	},
	putLeaf: function(): void{
		if (this.onLeaf()){
			alert('kara cannot put a leaf on another leaf')
			return
		}
		leaf_positions.push({ x:kara_pos.x, y:kara_pos.y })
		draw()
	},
	takeLeaf: function(): void{
		const idx = findLeafIndex(kara_pos.x, kara_pos.y)
		if (idx === -1){
			alert('kara cannot take a leaf where is none')
			return
		}
		leaf_positions.splice(idx, 1)
		draw()
	},
	onLeaf: function(){
		return world.isLeaf(kara_pos.x, kara_pos.y)
	},
	treeFront: function(){
		let vec = this.getLookVector()
		vec.x += kara_pos.x
		vec.y += kara_pos.y
		vec = mapOverflowToWorld(vec)
		return world.isTree(vec.x, vec.y)

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
		target = mapOverflowToWorld(target)
		return world.isTree(target.x, target.y)
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
		target = mapOverflowToWorld(target)
		return world.isTree(target.x, target.y)
	},
	mushroomFront: function(){
		let vec = this.getLookVector()
		vec.x += kara_pos.x
		vec.y += kara_pos.y
		vec = mapOverflowToWorld(vec)
		return world.isMushroom(vec.x, vec.y)
	},
	setPosition: function(x: number, y: number) {
		kara_pos.x = x
		kara_pos.y = y
		draw()
	},
	getPosition: function(): Vector2 {
		return {
			x: kara_pos.x,
			y: kara_pos.y,
		}
	},
	setOrientation: function(o: number) {
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

const initKaraButtons = (): void => {
	DOM.setBtnOnclick('#btnMove', () => { kara.move() })
	DOM.setBtnOnclick('#btnLeft', () => { kara.turnLeft() })
	DOM.setBtnOnclick('#btnRight', () => { kara.turnRight() })
	DOM.setBtnOnclick('#btnPut', () => { kara.putLeaf() })
	DOM.setBtnOnclick('#btnTake', () => { kara.takeLeaf() })
}

export { initKaraButtons, kara }
