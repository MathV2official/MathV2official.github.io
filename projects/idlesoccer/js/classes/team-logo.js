class TeamLogo{
    constructor(icon, gradient, sides, stripeColor){
        this.icon = icon;
        this.gradient = gradient;
        this.sides = sides;
        this.stripeColor = stripeColor;
    }

    draw(ctx){
        //base
        let w = ctx.canvas.width, h = ctx.canvas.height;
        ctx.clearRect(0, 0, w, h);
        let grad = ctx.createLinearGradient(w / 2, h * 0.2, w / 2, h);
        for(let i = 0; i < this.gradient.length; i++) {
            grad.addColorStop(i / this.gradient.length, this.gradient[i]);
        }
        ctx.fillStyle = grad;
        Utils.drawPolygon(ctx, w / 2, h / 2, h / 2 - 16, this.sides, false);
        //stripes
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = this.stripeColor;
        ctx.lineWidth = 8;
        let off = 0.2;
        ctx.fillRect(w * (0.5 - off - 0.075), 0, w * 0.15, h);
        ctx.strokeRect(w * (0.5 - off - 0.075), 0, w * 0.15, h);
        ctx.fillRect(w * (0.5 + off - 0.075), 0, w * 0.15, h);
        ctx.strokeRect(w * (0.5 + off - 0.075), 0, w * 0.15, h);
        //outline
        ctx.globalCompositeOperation = "source-over";
        ctx.lineWidth = 16;
        Utils.drawPolygon(ctx, w / 2, h / 2, h / 2 - 16, this.sides, true, false);
        //icon
        ctx.fillStyle = "#ffffff";
        ctx.lineWidth = 8;
        ctx.font = "900 " + (h * 0.5) + "px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.icon, w / 2, h / 2);
        ctx.strokeText(this.icon, w / 2, h / 2);
    }

    load(obj){
        this.gradient = obj.gradient;
        this.sides = obj.sides;
        this.stripeColor = obj.stripeColor;
        this.icon = obj.icon;
    }
}