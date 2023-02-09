class PlayerMarket {
    constructor() {
        this.players = [];
    }

    refresh() {
        this.players = [];
        let statBase = 16;
        let priceBase = 11;
        let pow = Math.log(priceBase) / Math.log(statBase);
        for (let i = 0; i < Math.floor(Math.random() * 10) + 15; i++) {
            let fact = Math.min(10, 0.5 / Math.random()) + 0.5 * Math.random();
            let price = Decimal.max(new Decimal(1e2), game.money.div(50)).mul(1 + 3 * fact ** pow * (0.8 + 0.4 * Math.random()));
            let minStat = Decimal.pow(price, Math.log(statBase) / Math.log(priceBase)).mul(2e-3);
            let maxStat = minStat.mul(1 + 0.5 * Math.random());
            let player = GeneratorUtils.generatePlayer(Math.floor(Math.random() * 1000000), minStat, maxStat, false, price);
            this.players.push(player);
        }
    }

    load(obj){
        this.players = [];
        for(let player of obj.players){
            let p = new Player(obj.name, obj.attack, obj.defense, obj.aggressivity, obj.stamina, obj.active, obj.marketValue);
            p.load(player);
            this.players.push(p);
        }
    }
}