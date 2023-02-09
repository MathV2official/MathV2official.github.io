app.component("tv-channel", {
    props: ["channel"],
    data(){
        return {
            ctx: null
        };
    },
    methods: {
        formatNumber: functions.formatNumber,
        render(){
            let ctx = this.ctx;
            let w = ctx.canvas.width, h = ctx.canvas.height;
            let t = Date.now() / 1000;
            ctx.clearRect(0, 0, w, h);
            if(!this.channel.bought){
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, w, h);
            }
            else if(this.channel.matchRunning()){
                ctx.drawImage(images.background, 0, 0, w, h);
                let x = (t / 22) % 1 < 0.5 ? ((t / 11) % 1) * w : w - ((t / 11) % 1) * w;
                let y = (t / 10) % 1 < 0.5 ? ((t / 5) % 1) * h : h - ((t / 5) % 1) * h;
                Utils.drawRotatedImage(ctx, images.ball, x, y, h / 4, h / 4, t % (2 * Math.PI));
                ctx.font = "900 " + (h * 0.2) + "px Montserrat";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(game.currentMatch.score1 + " - " + game.currentMatch.score2, w / 2, h / 2, w / 2);
            }
            else{
                for(let x = 0; x < w; x += w / 100){
                    for(let y = 0; y < h; y += w / 100){
                        ctx.fillStyle = Math.random() < 0.5 ? "white" : "black";
                        ctx.fillRect(x, y, w / 100, w / 100);
                    }
                }
                ctx.fillStyle = "#00000060";
                ctx.fillRect(0, (t / 3 * h) % (2 * h) - h * 0.4, w, h / 4)
            }

            ctx.fillStyle = "#00000090";
            ctx.fillRect(0, 0, w / 2, h * 0.3);
            ctx.font = "900 " + (h * 0.1) + "px Montserrat";
            ctx.fillStyle = "white";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText(this.channel.name, 16, 24, w / 2 - 32);


            requestAnimationFrame(this.render);
        }
    },
    computed: {
        canAfford(){
            return game.money.gte(this.channel.price);
        },
        renderCanvas(){
            return game.settings.tv.renderCanvas;
        }
    },
    mounted(){
        if(this.renderCanvas){
            this.ctx = this.$refs.canvas.getContext("2d");
            requestAnimationFrame(this.render);
        }
    },
    template: `<div class="card tv-channel">
<div class="tv" v-if="renderCanvas">
    <canvas ref="canvas" width="240" height="160"></canvas>
    <img alt="" src="images/tv.png"/>
</div>
<div class="tv" v-else>
    <img alt="" src="images/tv-filled.png"/>
</div>
<div v-if="!channel.bought">
    Locked <button :disabled="!canAfford" @click="channel.buy()">{{formatNumber(channel.price)}} $</button>
</div>
<div v-else>
    <h4>{{channel.name}}</h4>
    <p>Paying {{formatNumber(channel.getMPS(), 2, 2)}} $ per second while in Match and multiplying Match Rewards by x{{formatNumber(channel.moneyMultiplier, 2, 2)}}</p>
</div>
</div>`
});