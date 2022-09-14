import { kara } from './kara.js'
import { world } from './world.js'

const board = document.querySelector('#board')

function createBoardTable(){
	for (let h = world.height - 1; h >= 0; h--){
		const row = document.createElement('tr')
		for (let w = 0; w < world.width; w++){
			const cell = document.createElement('td')
			cell.id = `cell_${w}_${h}`
			row.appendChild(cell)
		}
		board.appendChild(row)
	}
}

const kara_to_arrow = {
	0: '&#8679;',
	1: '&#8680;',
	2: '&#8681;',
	3: '&#8678;',
}

function draw(){
	const cells = document.querySelectorAll('#board td')
	cells.forEach((el)=>{
		el.innerHTML=''
	})
	const kara_cell = document.querySelector(`#cell_${kara.x}_${kara.y}`)
	kara_cell.innerHTML = kara_to_arrow[kara.lookOrientation]
	world.leaf_positions.forEach((val) => {
		document.querySelector(`#cell_${val.x}_${val.y}`).innerHTML += '&#9752;'
	})
}
// 9820 tree
// 9730 shroom

function main(){
	document.querySelector('#btnMove').onclick = ()=>{kara.move()}
	document.querySelector('#btnLeft').onclick = ()=>{kara.turnLeft()}
	document.querySelector('#btnRight').onclick = ()=>{kara.turnRight()}
	document.querySelector('#btnPut').onclick = ()=>{kara.putLeaf()}
	document.querySelector('#btnTake').onclick = ()=>{kara.takeLeaf()}

	createBoardTable()
	kara.setPosition(1, 1)
}

main()

export {draw}
