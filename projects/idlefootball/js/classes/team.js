class Team {
    constructor(name, players, divisionRank, country, seed) {
        this.name = name;
        this.players = players;
        this.divisionRank = divisionRank;
        this.country = country;
        this.strategy = Strategy.NORMAL;
        this.aggressivity = Strategy.NORMAL;
        this.seed = seed; //used for team logo
        this.logo = this.generateLogo();
        this.resetDivisionStats();
    }

    generateLogo(){
        let r  = new Random(this.seed);
        let gradient = [];
        let colorAmount = 2 + r.nextInt(Math.min(3, 1 + Math.floor(this.divisionRank / 4) + this.country));
        for(let i = 0; i < colorAmount; i++){
            gradient.push(Utils.colorFromRGB(r.nextInt(256), r.nextInt(256), r.nextInt(256)));
        }
        return new TeamLogo(this.name.substr(0, 1), gradient,3 + r.nextInt(5), "#ffffff");
    }

    generatePlayers(){
        let players = [];
        let r = new Random(this.seed);
        let normRank = GeneratorUtils.getNormRank(this.divisionRank, this.country);
        let minStat = Decimal.pow(16, normRank + r.nextDouble());
        minStat = minStat.mul(new Decimal(17 / 16).pow(Math.max(0, normRank - 4)).add(1));
        minStat = minStat.mul(new Decimal(20 / 17).pow(Math.max(0, normRank - 12)).add(1));
        minStat = minStat.mul(new Decimal(1.1).pow(Decimal.pow(1.01, Decimal.max(0, normRank - 50))));
        let maxStat = minStat.mul(1 + 0.5 * r.nextDouble());
        for(let i = 0; i < 11; i++) {
            players.push(GeneratorUtils.generatePlayer(r.nextInt(), minStat, maxStat, true));
        }
        return players;
    }

    getSortedPlayers(){
        return Array.from(this.players).sort((p1, p2) => (p2.attack.add(p2.defense)).gte(p1.attack.add(p1.defense)) ? 1 : -1);
    }

    getActiveSortedPlayers(){
        return this.getSortedPlayers().filter(p => p.active).reverse();
    }

    getInactiveSortedPlayers(){
        return this.getSortedPlayers().filter(p => !p.active);
    }

    getTotalGames(){
        return this.divisionStats.win + this.divisionStats.draw + this.divisionStats.lose;
    }

    getPoints(){
        return 3 * this.divisionStats.win + this.divisionStats.draw;
    }

    getGoalDifference(){
        return this.divisionStats.goalsShot - this.divisionStats.goalsOpponent;
    }

    getActivePlayingPlayers() {
        return this.players.filter(p => p.active && !p.hasRedCard());
    }

    getActivePlayers() {
        return this.players.filter(p => p.active);
    }

    getInactivePlayers() {
        return this.players.filter(p => !p.active);
    }

    getRedCardChance(){
        let base = 0.000003;
        if(this.aggressivity === Strategy.OFFENSIVE){
            base *= 2;
        }
        else if(this.aggressivity === Strategy.DEFENSIVE){
            base /= 2;
        }
        return base;
    }

    //less players -> less synergy; encourages filling the team; 50% to 150%
    getSynergy(){
        return 0.25 + 0.75 * (this.getActivePlayingPlayers().length / 11) ** 2;
    }

    getCombinedStats() {
        let stats = {attack: new Decimal(0), defense: new Decimal(0)};
        let synergy = this.getSynergy();
        for (let p of this.getActivePlayingPlayers()) {
            stats.attack = stats.attack.add(p.getAttack().mul(synergy));
            stats.defense = stats.defense.add(p.getDefense().mul(synergy));
        }
        if(this.strategy === Strategy.OFFENSIVE){
            stats.attack = stats.attack.mul(1.3);
            stats.defense = stats.defense.div(1.3);
        }
        else if(this.strategy === Strategy.DEFENSIVE){
            stats.attack = stats.attack.div(1.3);
            stats.defense = stats.defense.mul(1.3);
        }
        if(this.aggressivity === Strategy.OFFENSIVE){
            stats.attack = stats.attack.mul(1.1);
            stats.defense = stats.defense.mul(1.1);
        }
        else if(this.aggressivity === Strategy.DEFENSIVE){
            stats.attack = stats.attack.div(1.1);
            stats.defense = stats.defense.div(1.1);
        }
        return stats;
    }

    getCombinedAttack() {
        return this.getCombinedStats().attack;
    }

    getCombinedDefense() {
        return this.getCombinedStats().defense;
    }

    getAverageStamina(){
        let s = 0;
        for(let p of this.getActivePlayers()){
            s += p.currentStamina;
        }
        return s / this.getActivePlayers().length;
    }

    addPlayer(player) {
        this.players.push(player);
    }

    removePlayer(player) {
        this.players = this.players.filter(p => p !== player);
    }

    refillPlayers(){
        let availablePlayers = this.getInactiveSortedPlayers().filter(p => !p.hasRedCard());
        while(this.getActivePlayers().length < 11 && availablePlayers.length > 0){
            availablePlayers[0].active = true;
            availablePlayers = this.getInactiveSortedPlayers().filter(p => !p.hasRedCard());
        }
    }

    canPlayNextMatch(){
        return this.getActivePlayingPlayers().length > 0;
    }

    resetDivisionStats(){
        this.divisionStats = {
            win: 0,
            draw: 0,
            lose: 0,
            goalsShot: 0,
            goalsOpponent: 0
        };
    }

    load(obj){
        this.divisionStats = obj.divisionStats;
        if(obj.isPlayerTeam){
            this.name = obj.name;
            this.players = [];
            this.strategy = obj.strategy;
            this.aggressivity = obj.aggressivity;
            for(let p of obj.players){
                let player = new Player(p.name, p.attack, p.defense, p.aggressivity, p.stamina, p.active);
                player.load(p);
                this.players.push(player);
            }
        }
        else{
            this.players = this.generatePlayers();
        }
    }
}