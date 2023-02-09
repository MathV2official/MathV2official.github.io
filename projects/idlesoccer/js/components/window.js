app.component("window", {
    emits: ["closed"],
    data(){
        return{
            x: 0,
            y: 0,
            focus: false //movable
        };
    },
    mounted(){
        this.resetPosition();
    },
    methods: {
        resetPosition(){
            let width = 600; //defined in css, rect size is 0 on mount
            this.x = innerWidth / 2 - width / 2;
            this.y = innerHeight / 4;
        },
        mousedown(){
            this.focus = true;
        },
        move(e){
            if(this.focus){
                this.x += e.movementX;
                this.y += e.movementY;
            }
        },
        mouseup(){
            this.focus = false;
        },
        close(){
            this.resetPosition();
            this.$emit("closed");
        }
    },
    template: `<div ref="window" class="window" :style="{left: x + 'px', top: y + 'px'}">
        <div class="header" @mousedown="mousedown()" @mousemove="move($event)" @mouseup="mouseup()" @mouseout="mouseup()">
            <slot name="header"></slot>
            <button @click="close()">X</button>
        </div>
        <div class="body">
            <slot name="body"></slot>
        </div>
    </div>`
});