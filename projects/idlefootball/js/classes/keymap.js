class KeyMap{
    constructor(){
        this.keys = [];

        onkeydown = e => {
            if(!this.keys.includes(e.key)) this.keys.push(e.key);
        }

        onkeyup = e => {
            this.keys = this.keys.filter(k => k !== e.key);
        }
    }

    keyPressed(k){
        return this.keys.includes(k);
    }
}