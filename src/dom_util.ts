class DOM {
	static setBtnOnclick = (selector: string, click_fn: () => void): void => {
		const btn = document.querySelector(selector) as HTMLButtonElement
		btn.onclick = click_fn
	}
}

export { DOM }
