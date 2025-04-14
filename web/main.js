function open_tab(set, name) {
	// Highlight active tab link
	const tabbar = document.querySelector(`.tab-bar[data-set="${set}"]`)
	const link_btns = tabbar.querySelectorAll("button")
	for (const btn of link_btns) {
		if (btn.dataset.name === name) {
			btn.classList.add("active")
		} else {
			btn.classList.remove("active")
		}
	}

	// Show active tab content
	const tab_container = document.querySelector(`.tab-container[data-set="${set}"]`)
	for (const tab of tab_container.children) {
		if (tab.dataset.name === name) {
			tab.classList.add("active")
		} else {
			tab.classList.remove("active")
		}
	}
}

function click_tab_link(ev) {
	const parent_tabbar = ev.currentTarget.closest(".tab-bar")
	open_tab(parent_tabbar.dataset.set, ev.currentTarget.dataset.name)
}

function main() {
	// Create tabbar event listeners
	const tabbars = document.querySelectorAll(".tab-bar")
	for (const tabbar of tabbars) {
		const link_btns = tabbar.querySelectorAll("button")
		for (const btn of link_btns) {
			btn.addEventListener("click", function(ev) {
				click_tab_link(ev)
			})
		}
	}

	// Open default tabs
	open_tab("world-tab", "untitled")
}

main()
