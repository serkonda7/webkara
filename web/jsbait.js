function compile(code) {
	const tokens = tokenize(code)

	const parser = new Parser(tokens)
	const nodes = parser.parse()

	const sema = new Sema(nodes)
	sema.check()

	const gen = new JsGen(nodes)
	return gen.gen()
}

function tokenize(text) {
	let tokens = []
	for (let i = 0; i < text.length; i++) {
		const c = text[i]
		if (c === ' ' || c === '\n' || c === '\t') {
			continue
		}

		if (c.match(/[a-zA-Z]/)) {
			let val = c
			while (text[i + 1].match(/[a-zA-Z_]/)) {
				val += text[i + 1]
				i++
			}
			tokens.push({ kind: "name", val: val })
			continue
		}

		switch(c) {
			case '(':
				tokens.push({ kind: "lpar" })
				continue
			case ')':
				tokens.push({ kind: "rpar" })
				continue
			case '.':
				tokens.push({ kind: "dot" })
				continue
			default:
				throw new Error("Unexpected token: " + c)
		}
	}
	return tokens
}

class Parser{
	constructor(tokens) {
		this.tokens = tokens
		this.pos = -1
		this.tok = null
	}

	parse() {
		let nodes = []
		this.next()
		while (this.pos < this.tokens.length) {
			nodes.push(this.expr())
		}
		return nodes
	}

	expect(kind) {
		if (this.tok.kind !== kind) {
			throw new Error(`Unexpected token at ${this.pos}: ` + this.tok.kind)
		}
		this.next()
	}

	next() {
		this.pos++
		this.tok = this.tokens[this.pos]
	}

	peek() {
		return this.tokens[this.pos + 1]
	}

	expr() {
		const e = this.single_expr()
		if (this.tok.kind === 'dot') {
			return this.dot_expr(e)
		}

		return e
	}

	single_expr() {
		switch (this.tok.kind) {
			case 'name':
				return this.name_expr()
			default:
				throw new Error(`Unexpected token at ${this.pos}: ` + this.tok.kind)
		}
	}

	call_expr() {
		const name = this.tok.val
		this.expect('name')
		this.expect('lpar')
		this.expect('rpar')
		return {
			kind: "call",
			name: name
		}
	}

	dot_expr(left) {
		this.next()
		const right = this.single_expr()
		if (right.kind == 'call') {
			return {
				...right,
				rec: left,
			}
		}
	}

	name_expr() {
		if (this.peek().kind === 'lpar') {
			return this.call_expr()
		}

		const val = this.tok.val
		this.next()
		return {
			kind: "ident",
			name: val
		}
	}
}

class Sema {
	constructor(nodes) {
		this.nodes = nodes
	}

	check() {
		for (let node of this.nodes) {
			this.expr(node)
		}
	}

	expr(expr) {
		switch (expr.kind) {
			case "call":
				this.call(expr)
				break
			case "ident":
				this.ident(expr)
				break
			default:
				throw new Error("Cannot check: " + expr.kind)
		}
	}

	call(expr) {
		if (expr.rec) {
			this.expr(expr.rec)
		}
	}

	ident(expr) {
	}
}

class JsGen{
	constructor(nodes) {
		this.nodes = nodes
		this.out = ""
	}

	gen() {
		for (let node of this.nodes) {
			this.stmt(node)
		}
		return this.out
	}

	stmt(stmt) {
		switch (stmt.kind) {
			default:
				this.expr(stmt)
				this.out += "\n"
				break
		}
	}

	expr(expr) {
		switch (expr.kind) {
			case "call":
				this.call(expr)
				break
			case "ident":
				this.ident(expr)
				break
			default:
				throw new Error("Cannot gen: " + expr.kind)
		}
	}

	call(expr) {
		if (expr.rec) {
			this.expr(expr.rec)
			this.out += "."
		}

		this.out += expr.name + "()"
	}

	ident(expr) {
		this.out += expr.name
	}
}

export { compile }
