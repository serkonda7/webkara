const btn_obj_kara = document.querySelector('#obj-kara')
const btn_obj_leaf = document.querySelector('#obj-leaf')
const btn_obj_tree = document.querySelector('#obj-tree')
const btn_obj_shroom = document.querySelector('#obj-shroom')
const btn_obj_trash = document.querySelector('#obj-trash')

function init_click_listeners() {
	btn_obj_kara.addEventListener('click', edit_mode)
	btn_obj_leaf.addEventListener('click', edit_mode)
	btn_obj_tree.addEventListener('click', edit_mode)
	btn_obj_shroom.addEventListener('click', edit_mode)
	btn_obj_trash.addEventListener('click', edit_mode)
}

let edit_mode_active = false
let edit_mode_obj = null
let edit_mode_selected = null

function edit_mode(ev) {
	const target = ev.currentTarget

	if (edit_mode_active) {
		// Disable edit mode
		if (edit_mode_obj == target.dataset.obj) {
			edit_mode_active = false
			edit_mode_obj = null
			edit_mode_selected.classList.remove('selected')
			edit_mode_selected = null
			return
		}

		// Switch object: Unselect previous button
		edit_mode_selected.classList.remove('selected')
	}

	// Enable edit mode
	edit_mode_active = true
	edit_mode_obj = target.dataset.obj
	edit_mode_selected = target

	target.classList.add('selected')
}

export { init_click_listeners }
