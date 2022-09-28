type Vector2 = {
	x: number,
	y: number
}

const compare_to_vec2 = (x: number, y: number, vec: Vector2): boolean => {
	return x === vec.x && y === vec.y
}

export { Vector2, compare_to_vec2 }
