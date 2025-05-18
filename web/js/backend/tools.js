class AbortExecution extends Error {}

class ToolsBackend {
	step_delay = 0
	run_state = 'editor'
	resume_callback = null

	async sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms))
	}

	use_speed_slider_delay() {
		// TODO implement speed slider
		this.step_delay = 400
	}

	clear_step_delay() {
		this.step_delay = 0
	}

	async delay_atfer_draw() {
		await this.sleep(this.step_delay)
	}

	async check_run_state() {
		while (this.run_state == 'pause') {
			await new Promise(resolve => {
				this.resume_callback = resolve
			})
		}

		if (this.run_state == 'stop') {
			throw new AbortExecution('')
		}
	}
}

class Tools {
	println(msg) {
		throw new Error('println() not implemented')
	}

	show_popup(msg) {
		throw new Error('show_popup() not implemented')
	}

	async check_run_state() {
		await b_tools.check_run_state()
	}

	async sleep(ms) {
		return b_tools.sleep(ms)
	}

	string_input(msg) {
		throw new Error('string_input() not implemented')
	}

	int_input(msg) {
		throw new Error('int_input() not implemented')
	}

	float_input(msg) {
		throw new Error('float_input() not implemented')
	}
}

const b_tools = new ToolsBackend()
const tools = new Tools()

export { b_tools, tools, AbortExecution }
