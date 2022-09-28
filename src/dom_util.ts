class DOM {
	static setBtnOnclickBinded = (selector: string, click_fn: () => void, obj: object): void => {
		(document.querySelector(selector) as HTMLButtonElement).onclick = () => {
			click_fn.call(obj)
		}
	}
}

export { DOM }
