import { Vector2 } from '../backend/vector.js'
import { DOM } from './dom_util.js'
import { draw } from './main.js'
import {
	world, mapOverflowToWorld,
	findLeafIndex, findMushroomIndex,
} from './world.js'
import { b_world } from '../backend/world.js'

let kara_pos = {
	x: 0,
	y: 0,
}
let kara_orientation = 1 // 0 up, 1 right, 2 down, 3 left
let is_kara_active = false

const getLookVector = (): Vector2 => {
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
}

const karaInactiveAlert = (): void => {
	alert('kara is not in the world!')
}

const kara = {
	move: function(): void{
		if (!is_kara_active) {
			karaInactiveAlert()
			return
		}
		if (this.treeFront()) {
			alert('kara cannot move: tree front')
			return
		}
		if (this.mushroomFront()){
			const vec = getLookVector()
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
			b_world.mushrooms[idx] = nextField
		}
		const vec = getLookVector()
		kara_pos.x += vec.x
		kara_pos.y += vec.y
		kara_pos = mapOverflowToWorld(kara_pos)
		draw()
	},
	turnLeft: function(): void{
		if (!is_kara_active) {
			karaInactiveAlert()
			return
		}
		kara_orientation--
		if (kara_orientation < 0) {
			kara_orientation = 3
		}
		draw()
	},
	turnRight: function(): void{
		if (!is_kara_active) {
			karaInactiveAlert()
			return
		}
		kara_orientation++
		if (kara_orientation > 3) {
			kara_orientation = 0
		}
		draw()
	},
	putLeaf: function(): void{
		if (!is_kara_active) {
			karaInactiveAlert()
			return
		}
		if (this.onLeaf()){
			alert('kara cannot put a leaf on another leaf')
			return
		}
		b_world.leafs.push({ x:kara_pos.x, y:kara_pos.y })
		draw()
	},
	takeLeaf: function(): void{
		if (!is_kara_active) {
			karaInactiveAlert()
			return
		}
		const idx = findLeafIndex(kara_pos.x, kara_pos.y)
		if (idx === -1){
			alert('kara cannot take a leaf where is none')
			return
		}
		b_world.leafs.splice(idx, 1)
		draw()
	},
	onLeaf: function(){
		if (!is_kara_active) {
			karaInactiveAlert()
			return
		}
		return world.isLeaf(kara_pos.x, kara_pos.y)
	},
	treeFront: function(){
		if (!is_kara_active) {
			karaInactiveAlert()
			return
		}
		let vec = getLookVector()
		vec.x += kara_pos.x
		vec.y += kara_pos.y
		vec = mapOverflowToWorld(vec)
		return world.isTree(vec.x, vec.y)

	},
	treeLeft: function(){
		if (!is_kara_active) {
			karaInactiveAlert()
			return
		}
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
		if (!is_kara_active) {
			karaInactiveAlert()
			return
		}
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
		if (!is_kara_active) {
			karaInactiveAlert()
			return
		}
		let vec = getLookVector()
		vec.x += kara_pos.x
		vec.y += kara_pos.y
		vec = mapOverflowToWorld(vec)
		return world.isMushroom(vec.x, vec.y)
	},
	setPosition: function(x: number, y: number) {
		is_kara_active = true
		kara_pos.x = x
		kara_pos.y = y
		draw()
	},
	getPosition: function(): Vector2 {
		if (!is_kara_active) {
			karaInactiveAlert()
			return
		}
		return {
			x: kara_pos.x,
			y: kara_pos.y,
		}
	},
	setOrientation: function(o: number) {
		if (!is_kara_active) {
			karaInactiveAlert()
			return
		}
		if (o < 0){
			o = 0
		} else if (o > 3){
			o = 3
		}
		kara_orientation = o
		draw()
	},
	getOrientation: function() {
		if (!is_kara_active) {
			karaInactiveAlert()
			return
		}
		return kara_orientation
	},
}

const setKaraActive = (active: boolean): void => {
	is_kara_active = active
}

const isKaraActive = (): boolean => {
	return is_kara_active
}

const initKaraButtons = (): void => {
	DOM.setBtnOnclickBinded('#btnMove', kara.move, kara)
	DOM.setBtnOnclickBinded('#btnLeft', kara.turnLeft, kara)
	DOM.setBtnOnclickBinded('#btnRight', kara.turnRight, kara)
	DOM.setBtnOnclickBinded('#btnPut', kara.putLeaf, kara)
	DOM.setBtnOnclickBinded('#btnTake', kara.takeLeaf, kara)
}

export { initKaraButtons, kara, setKaraActive, isKaraActive }
