//render ball position
app.component("match-view", {
    props: ["ballx"],
    data(){
        return {
            ctx: null
        }
    },
    methods: {
        draw(){
            let ctx = this.ctx;
            let w = ctx.canvas.width, h = ctx.canvas.height;
            ctx.clearRect(0, 0, w, h);

            let ballRadius = h / 2;
            let dist = this.ballx * (w / 2 - ballRadius);
            let rotation = dist / ballRadius;
            Utils.drawRotatedImage(ctx, images.ball, w / 2 + dist, ballRadius + ballRadius / 2, ballRadius, ballRadius, rotation);
            ctx.drawImage(images.goalL, 0, 0, h * 0.5, h);
            ctx.drawImage(images.goalR, w - h / 2, 0, h / 2, h);

            requestAnimationFrame(this.draw);
        }
    },
    mounted(){
        this.ctx = this.$refs.canvas.getContext("2d");
        this.draw();
    },
    template: `<canvas class="match-view" ref="canvas" width="1024" height="128"></canvas>`
});