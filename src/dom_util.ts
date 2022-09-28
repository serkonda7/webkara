class DOM {
	static setBtnOnclick = (selector: string, click_fn: () => void): void => {
		(document.querySelector(selector) as HTMLButtonElement).onclick = click_fn
	}
}

export { DOM }
