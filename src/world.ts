import { draw } from './main.js'

let world = {
    width: 7,
	height: 7,
    leaf_positions: [],
    tree_positions: [],
    shroom_positions: [],
    clearAll:function(){
        this.leaf_positions = []
        this.tree_positions =[]
        this.shroom_positions=[]
        draw()
    },
    setLeaf:function(x, y, putLeaf){
        if (putLeaf){
            this.leaf_positions.push({x:x, y:y})
        }else{
            const lpos_idx = this.leaf_positions.findIndex(leaf => leaf.x == x && leaf.y == y)
            this.leaf_positions.splice(lpos_idx, 1)
        }
        draw()
    },
    setTree:function(x, y, putTree){
        if (putTree){
            this.tree_positions.push({x:x, y:y})
        }else{
            const lpos_idx = this.tree_positions.findIndex(tree => tree.x == x && tree.y == y)
            this.tree_positions.splice(lpos_idx, 1)
        }
        draw()
    },
    setMushroom:function(x, y, putMushroom){
        if (putMushroom){
            this.shroom_positions.push({x:x, y:y})
        }else{
            const lpos_idx = this.shroom_positions.findIndex(shroom => shroom.x == x && shroom.y == y)
            this.shroom_positions.splice(lpos_idx, 1)
        }
        draw()
    },
    isEmpty:function(x,y){
        if( this.isLeaf(x,y)||this.isTree(x,y)||this.isMushroom(x,y)){
            return false
        }
        return true
    },
    isLeaf:function(x,y){
		return this.leaf_positions.findIndex(leaf => leaf.x == x && leaf.y == y) >= 0

    },
    isTree:function(x,y){
		return this.tree_positions.findIndex(leaf => leaf.x == x && leaf.y == y) >= 0
    },
    isMushroom:function(x,y){
		return this.shroom_positions.findIndex(leaf => leaf.x == x && leaf.y == y) >= 0
    },
    getSizeX:function(){
        return this.width
    },
    getSizeY:function(){
        return this.height
    }
}
export{world}