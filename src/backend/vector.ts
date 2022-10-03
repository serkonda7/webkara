type Vector2 = {
	x: number,
	y: number
}

function vec2_add(a: Vector2, b: Vector2): Vector2 {
	return {
		x: a.x + b.x,
		y:a.y + b.y,
	}
}

const compare_to_vec2 = (x: number, y: number, vec: Vector2): boolean => {
	return x === vec.x && y === vec.y
}

export { Vector2, vec2_add, compare_to_vec2 }
