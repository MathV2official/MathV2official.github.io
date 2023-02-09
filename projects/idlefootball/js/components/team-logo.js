app.component("team-logo", {
    props: ["logo"],
    data(){
        return{
            ctx: null
        };
    },
    mounted(){
        this.ctx = this.$refs.canvas.getContext("2d");
        this.logo.draw(this.ctx);
    },
    watch: {
        logo: {
            deep: true,
            handler(){
                this.logo.draw(this.ctx);
            }
        }
    },
    template: `<canvas ref="canvas" width="256" height="256"></canvas>`
});