class PlayerTraining{
    constructor(){
        this.players = [];

        this.tasks = {
            general: new PlayerTrainingTaskGeneral(),
            stamina: new PlayerTrainingTaskStamina(),
            aggressiveness: new PlayerTrainingTaskAggressiveness()
        };

        this.upgrades = {
            trainSpeed: new MoneyUpgrade(level => Decimal.pow(1.75, level).mul(1e10),
                level => new Decimal(1 + 0.15 * level), {
                    getEffectDisplay: effectDisplayTemplates.percentStandard(0)
                }),
            generalTraining: new MoneyUpgrade(level => Decimal.pow(2.25, level).mul(1e11),
                level => new Decimal(0.05 + 0.05 * level), {
                getEffectDisplay: effectDisplayTemplates.percentStandard()
                }),
            longetivity: new MoneyUpgrade(level => Decimal.pow(5, level).mul(1e15),
                level => new Decimal(0.001 * level), {
                    maxLevel: 10,
                    getEffectDisplay: effectDisplayTemplates.percentStandard(1)
                })
        }
    }

    static get isUnlocked(){
        return game.maxDivisionRank >= 5 || game.country >= 1;
    }

    getMaxPlayers(){
        return 1;
    }

    addPlayer(player){
        if(this.players.length < this.getMaxPlayers() && game.team.players.includes(player) && !player.active){
            this.players.push(player);
            game.team.removePlayer(player);
        }
    }

    removePlayer(player){
        if(this.players.includes(player)){
            game.team.players.push(player);
            this.players = this.players.filter(p => p !== player);
        }
        if(this.players.length === 0){
            this.pauseAllTasks();
        }
    }

    pauseAllTasks(){
        for(let k of Object.keys(this.tasks)){
            this.tasks[k].pause();
        }
    }

    selectTask(task){
        if(this.players.length > 0){
            this.pauseAllTasks();
            task.resume();
        }
    }

    load(obj){
        this.players = [];
        for(let p of obj.players){
            let player = new Player();
            player.load(p);
            this.players.push(player);
        }
        for(let k of Object.keys(obj.tasks)){
            this.tasks[k].paused = obj.tasks[k].paused;
            this.tasks[k].time = obj.tasks[k].time;
        }
        for(let k of Object.keys(obj.upgrades)){
            this.upgrades[k].level = obj.upgrades[k].level;
        }
    }
}