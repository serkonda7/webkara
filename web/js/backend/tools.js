class AbortExecution extends Error {}

class ToolsBackend {
	step_delay = 0
	run_state = 'stop'

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

	check_run_state() {
		if (this.run_state == 'stop') {
			throw new AbortExecution('')
		} else if (this.run_state == 'pause') {
			// TODO
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

	check_run_state() {
		b_tools.check_run_state()
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
