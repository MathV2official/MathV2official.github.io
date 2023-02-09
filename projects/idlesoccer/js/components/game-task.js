app.component("game-task", {
    props: ["task"],
    computed: {
        progress(){
            return this.task.time / this.task.getTime();
        }
    },
    template: `<div class="game-task card flex-column">
<h4><slot name="title"></slot></h4>
<slot name="body"></slot>
<progress-bar :value="progress"></progress-bar>
</div>`
});