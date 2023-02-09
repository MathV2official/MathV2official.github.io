class Utils{
    static arrayChoice(array){
        return array[Math.floor(Math.random() * array.length)];
    }

    static capitalize(word){
        return word[0].toUpperCase() + word.substr(1);
    }

    static generateWord(length){
        let str = "";
        let off = Math.floor(Math.random() * 3);
        let vowels = "aeiou";
        let consonants = "bcdfghjklmnpqrstvwxyz";
        for(let i = 0; i < length; i++){
            let isVowel = (i + off) % 2 === 0;
            let letter = isVowel ? vowels[Math.floor(Math.random() * vowels.length)] : consonants[Math.floor(Math.random() * consonants.length)];
            if(letter === "q"){
                letter += "u"; //force qu
                i++;
            }
            str += letter;
        }
        return str;
    }

    static generateRandomColor(){
        return Utils.colorFromRGB(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
    }

    static colorFromRGB(r, g, b){
        return "#" + [r, g, b]
        .map(v => v.toString(16).padStart(2, "0"))
        .join("");
    }

    static drawPolygon(ctx, x, y, r, sides, stroke = true, fill = true){
        ctx.beginPath();
        ctx.moveTo(x, y - r);
        for(let i = 0; i < sides; i++){
            let a = i / sides * 2 * Math.PI - 0.5 * Math.PI;
            ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
        }
        ctx.closePath();
        if(fill){
            ctx.fill();
        }
        if(stroke){
            ctx.stroke();
        }
    }

    static drawRotatedImage(ctx, image, x, y, w, h, rot){
        let dx = x, dy = y;
        ctx.translate(dx, dy);
        ctx.rotate(rot);
        ctx.drawImage(image, -w / 2, -h / 2, w, h);
        ctx.rotate(-rot);
        ctx.translate(-dx, -dy);
    }

    static getTotalUpgradeLevels(upgrades){
        return Object.values(upgrades).map(upg => upg.level).reduce((a, b) => a + b);
    }
}