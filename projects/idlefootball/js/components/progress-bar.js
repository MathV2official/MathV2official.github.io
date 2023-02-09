app.component("progress-bar", {
    props: ["value"],
    computed:{
        width(){
            return this.value * 100 + "%";
        }
    },
    template: `<div class="progress-bar">
    <div class="bg"></div>
    <div class="front" :style="{width: width}"></div>
</div>`
});