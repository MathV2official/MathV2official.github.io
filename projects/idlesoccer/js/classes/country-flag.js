class CountryFlag{
    constructor(colors){
        this.colors = colors;
    }

    draw(ctx){
        let w = ctx.canvas.width, h = ctx.canvas.height;
        let colHeight = h / this.colors.length * 0.4;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 16;
        ctx.strokeRect(w * 0.2, h * 0.3, w * 0.6, h * 0.4);
        for(let i = 0; i < this.colors.length; i++){
            ctx.fillStyle = this.colors[i];
            ctx.fillRect(w * 0.2, h * 0.3 + colHeight * i, w * 0.6, colHeight);
        }
    }
}