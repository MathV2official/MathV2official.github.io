class TVChannel{
    constructor(name, price, moneyRate, moneyMulti){
        this.name = name;
        this.price = price;
        this.moneyRate = moneyRate;
        this.moneyMultiplier = moneyMulti;
        this.bought = false;
    }

    matchRunning(){
        return game.currentMatch && !game.currentMatch.ended;
    }

    buy(){
        if(!this.bought && game.money.gte(this.price)){
            this.bought = true;
            game.money = game.money.sub(this.price);
        }
    }

    getMPS(){
        if(!this.bought){
            return new Decimal(0);
        }
        let reward = game.currentMatch ? game.league.divisions[game.currentMatch.divisionRank].getRewards().win : new Decimal(0);
        return reward.mul(this.moneyRate).mul(game.tv.upgrades.channelMoney.apply());
    }

    getMoneyMultiplier(){
        return this.bought ? this.moneyMultiplier : new Decimal(1);
    }

    tick(dt){
        dt = Math.min(1 / 30, dt);
        if(this.matchRunning()){
            let reward = game.league.divisions[game.currentMatch.divisionRank].getRewards().win;
            let timeScale = game.currentMatch.timeScale;
            game.money = game.money.add(this.getMPS().mul(dt * timeScale));
        }
    }
}