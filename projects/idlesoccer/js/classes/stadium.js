class Stadium{
    constructor(){
        this.fans = new Decimal(0);
        this.attendance = new Decimal(0);
        this.upgrades = {
            //planned 9x money per division, 4x ticket money per division (division number + upgrade)
            capacity: new MoneyUpgrade(level => Decimal.pow(9, level / 10).mul(125000)
                                .mul(Decimal.pow(1.1, Math.max(0, level - 45))),
                //4x ticket price -> need 9 / 4x more capacity
                level => new Decimal(450 * level).mul(Decimal.pow((9 / 4), (level - 1) / 10)).floor(), {
                    getEffectDisplay: effectDisplayTemplates.numberStandard(0, "")
                }),
            ticketPrice: new MoneyUpgrade(level => Decimal.pow(9, level / 5).mul(3300000)
                                .mul(Decimal.pow(1.1, Math.max(0, level - 50))),
                level => Decimal.pow(2, level / 5), {
                    getEffectDisplay: effectDisplayTemplates.numberStandard(2)
                }),
            fanGain: new MoneyUpgrade(level => Decimal.pow(3.33, level).mul(11e6),
                level => new Decimal(0.05 + 0.01 * level), {
                    maxLevel: 50,
                    getEffectDisplay: effectDisplayTemplates.percentStandard(0)
                })
        }
    }

    static get isUnlocked(){
        return game.maxDivisionRank >= 2 || game.country >= 1 || game.stadium.getCapacity().gt(0);
    }

    getTicketPrice(){
        return Decimal.pow(2, GeneratorUtils.getNormRank(game.team.divisionRank, game.country)).mul(5).mul(this.upgrades.ticketPrice.apply());
    }

    getPaidMoney(){
        return this.attendance.mul(this.getTicketPrice());
    }

    getCapacity(){
        return this.upgrades.capacity.apply();
    }

    getFanGain(){
        return this.getCapacity().mul(this.upgrades.fanGain.apply()).mul(Math.random()).floor();
    }

    fillStadium(){
        this.attendance = Decimal.min(this.getCapacity(), this.fans.add(this.getCapacity().mul(Math.random()).floor()));
    }

    emptyStadium(){
        this.attendance = new Decimal(0);
    }

    //called on match end
    changeFans(result){
        if(result === MATCH_LOSE){
            this.fans = this.fans.mul(0.9 + 0.1 * Math.random()).floor();
        }
        else if(result === MATCH_WIN){
            this.fans = this.fans.add(this.getFanGain().mul(Math.random()).floor());
        }
    }

    load(obj){
        this.fans = obj.fans;
        this.attendance = obj.attendance;
        for(let k of Object.keys(obj.upgrades)){
            this.upgrades[k].level = obj.upgrades[k].level;
        }
    }
}