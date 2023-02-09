const RESOURCE_MONEY = 0;

class AbstractUpgrade {
    constructor(resource, getPrice, getEffect, cfg) {
        this.resource = resource;
        this.getPrice = getPrice;
        this.getEffect = getEffect;
        this.level = 0;
        this.maxLevel = cfg && cfg.maxLevel ? cfg.maxLevel : Infinity;
        this.getEffectDisplay = cfg && cfg.getEffectDisplay ? cfg.getEffectDisplay : this.getEffectDisplay;
    }

    currentPrice() {
        return this.getPrice(this.level);
    }

    apply() {
        return this.getEffect(this.level);
    }

    getResource() {
        if(this.resource === RESOURCE_MONEY){
            return game.money;
        }
    }

    canBuy(){
        return this.getResource().gte(this.currentPrice()) && this.level < this.maxLevel;
    }

    substractResource(){
        switch(this.resource){
            case RESOURCE_MONEY:
                game.money = game.money.sub(this.currentPrice());
                break;
            default:
                break;
        }
    }

    buy() {
        let res = this.getResource();
        if(this.canBuy()){
            this.substractResource();
            this.level++;
        }
    }

    getEffectDisplay() {
        if(this.level === this.maxLevel) {
            return "x" + functions.formatNumber(this.apply(), 2, 2);
        }
        return "x" + functions.formatNumber(this.getEffect(this.level), 2, 2) + " 🠚 " +
            "x" + functions.formatNumber(this.getEffect(this.level + 1), 2, 2);
    }

    getPriceDisplay(currency) {
        if(this.level === this.maxLevel) {
            return "Max";
        }
        return currency + " " + functions.formatNumber(this.currentPrice(), 2, 0, 1e9);
    }
}

class MoneyUpgrade extends AbstractUpgrade{
    constructor(getPrice, getEffect, cfg){
        super(RESOURCE_MONEY, getPrice, getEffect, cfg);
    }

    canBuy() {
        return game.team.players.length > 0 && super.canBuy();
    }

    getPriceDisplay(){
        return super.getPriceDisplay("$");
    }
}

const effectDisplayTemplates = {
    numberStandard(digits, prefix = "x", suffix = "") {
        return function () {
            if (this.level === this.maxLevel) {
                return prefix + functions.formatNumber(this.apply(), digits, digits) + suffix;
            }
            return prefix + functions.formatNumber(this.apply(), digits, digits) + suffix + " → "
                + prefix + functions.formatNumber(this.getEffect(this.level + 1), digits, digits) + suffix;
        };
    },
    percentStandard(digits, prefix = "", suffix = " %", digits1000 = digits) {
        return function () {
            let thisVal = this.apply().mul(100);
            let nextVal = this.getEffect(this.level + 1).mul(100);
            if (this.level === this.maxLevel) {
                return prefix + functions.formatNumber(thisVal, digits, digits1000) + suffix;
            }
            return prefix + functions.formatNumber(thisVal, digits, digits1000) + suffix + " → "
                + prefix + functions.formatNumber(nextVal, digits, digits1000) + suffix;
        };
    },
    automator() {
        return function () {
            let thisVal = this.level.eq(0) ? "Inactive" : this.apply().toFixed(2) + " s";
            let nextVal = this.getEffect(this.level + 1).toFixed(2) + " s";
            if (this.level === this.maxLevel) {
                return thisVal;
            }
            return thisVal + " → " + nextVal;
        }
    }
};