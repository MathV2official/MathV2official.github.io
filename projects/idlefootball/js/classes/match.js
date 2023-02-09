const MATCH_LOSE = -1, MATCH_DRAW = 0, MATCH_WIN = 1;

class Match {
    constructor(team1, team2, divisionRank){
        this.divisionRank = divisionRank;
        this.time = 0;
        this.timeScale = 1;
        this.team1 = team1;
        this.team2 = team2;
        this.score1 = 0;
        this.score2 = 0;
        this.powerMulti = [1, 1];
        this.powerMultiFreq = [600 + 1800 * Math.random(), 600 + 1800 * Math.random()];
        this.ended = false;

        this.gameEvents = []; //recorded goals
        this.stadiumReward = new Decimal(0); //used for display

        this.ballX = 0; //-1 to 1
        this.ballSpeed = 0;
    }

    addGoal(team, player, minute){
        this.gameEvents.push({teamIndex: team === this.team2 ? 1 : 0, event: 0, name: player.name, minute});
    }

    addRedCard(team, player, minute){
        this.gameEvents.push({teamIndex: team === this.team2 ? 1 : 0, event: 1, name: player.name, minute});
        player.redCard = 2;
    }

    getNormPower() {
        let att1 = this.team1.getCombinedAttack(), def1 = this.team1.getCombinedDefense();
        let att2 = this.team2.getCombinedAttack(), def2 = this.team2.getCombinedDefense();

        att1 = att1.eq(0) ? 0 : att1.log10();
        att2 = att2.eq(0) ? 0 : att2.log10();
        def1 = def1.eq(0) ? 0 : def1.log10();
        def2 = def2.eq(0) ? 0 : def2.log10();

        let team1 = 1 + Math.max(0, (att1 - def2));
        let team2 = 1 + Math.max(0, (att2 - def1));

        return {
            team1: (att1 - def2 > 0 ? team1 : 1 / team2) ** 0.325,
            team2: (att2 - def1 > 0 ? team2 : 1 / team1) ** 0.325
        };
    }

    getPlayerTeam(){
        if(this.team1 === game.team){
            return this.team1;
        }
        else if(this.team2 === game.team){
            return this.team2;
        }
        return null;
    }

    //used for goal display
    getMinute(){
        return Math.ceil(this.time / 60);
    }

    endGame() {
        for(let p of this.team1.players.concat(this.team2.players)){
            p.redCard = Math.max(0, p.redCard - 1);
        }

        if(this.score1 > this.score2) {
            this.team1.divisionStats.win++;
            this.team2.divisionStats.lose++;
        }
        else if(this.score2 > this.score1) {
            this.team2.divisionStats.win++;
            this.team1.divisionStats.lose++;
        }
        else {
            this.team1.divisionStats.draw++;
            this.team2.divisionStats.draw++;
        }
        this.team1.divisionStats.goalsShot += this.score1;
        this.team1.divisionStats.goalsOpponent += this.score2;
        this.team2.divisionStats.goalsShot += this.score2;
        this.team2.divisionStats.goalsOpponent += this.score1;

        if(this.getPlayerTeam()){
            let playerTeam = this.getPlayerTeam();

            game.stadium.changeFans(this.getGameResult());
            let reward = game.stadium.getPaidMoney();
            game.money = game.money.add(reward);
            this.stadiumReward = reward;
            game.stadium.emptyStadium();

            for(let p of playerTeam.getActivePlayers()){
                if(p.hasRedCard()){
                    p.active = false;
                }
            }

            if(game.settings.team.refillPlayers){
                playerTeam.refillPlayers();
            }

            if(game.league.divisions[playerTeam.divisionRank].hasEnded()){
                if(game.league.divisions[game.team.divisionRank].getSortedTeams()[0] === game.team && playerTeam.divisionRank === game.league.divisions.length - 1){
                    game.canEnterNextCountry = true;
                }
                game.league.moveTeams();
                game.playerMarket.refresh();
            }
            else{
                game.league.simulate();
            }
            game.money = game.money.add(this.getRewardMoney());
        }

        this.ended = true;
    }

    simulate() {
        let power = this.getNormPower();
        for(let mins = 0; mins < 90; mins++){
            this.score1 += Math.random() < power.team1 ** 2.75 / 90;
            this.score2 += Math.random() < power.team2 ** 2.75 / 90;
        }
        this.endGame();
    }

    getGameResult(){
        let ownScore = game.team === this.team1 ? this.score1 : this.score2;
        let otherScore = game.team === this.team1 ? this.score2 : this.score1;
        if(ownScore > otherScore){
            return MATCH_WIN;
        }
        else if(ownScore === otherScore){
            return MATCH_DRAW;
        }
        else{
            return MATCH_LOSE;
        }
    }

    getRewardMoney(){
        let rewards = game.league.divisions[this.divisionRank].getRewards();
        let result = this.getGameResult();
        if(result === MATCH_WIN){
            return rewards.win;
        }
        else if(result === MATCH_DRAW){
            return rewards.draw;
        }
        return rewards.lose;
    }

    tick(dt) {
        if(!this.ended){
            let power = this.getNormPower();
            for(let i = 0; i < Math.min(60, this.timeScale); i++) {
                dt = Math.min(1 / 30, dt);
                let tm = Math.max(1, this.timeScale / 60);
                this.time += dt * tm;

                for(let i = 0; i < this.powerMulti.length; i++) {
                    this.powerMulti[i] = 1 + 0.5 * Math.sin(this.time / this.powerMultiFreq[i] * 2 * Math.PI);
                }

                if(Math.random() < 0.04 * dt * tm) {
                    let pow = Math.random() < 0.1 ? 3 * (Math.random() < 0.1 ? 3 : 1) : 1;
                    let pow2 = this.ballX <= -0.8 ? 4 : 1;
                    this.ballSpeed += power.team1 * 0.1 * pow * pow2 * this.powerMulti[0];
                }
                if(Math.random() < 0.04 * dt * tm) {
                    let pow = Math.random() < 0.1 ? 3 * (Math.random() < 0.1 ? 3 : 1) : 1;
                    let pow2 = this.ballX >= 0.8 ? 4 : 1;
                    this.ballSpeed -= power.team2 * 0.1 * pow * pow2 * this.powerMulti[1];
                }

                if(this.team1.getActivePlayingPlayers().length > 0){
                    for(let p of this.team1.getActivePlayingPlayers()){
                        if(Math.random() < this.team1.getRedCardChance() * p.aggressivity * dt * tm){
                            this.addRedCard(this.team1, p, this.getMinute());
                        }
                    }
                }
                if(this.team2.getActivePlayingPlayers().length > 0){
                    for(let p of this.team2.getActivePlayingPlayers()){
                        if(Math.random() < this.team2.getRedCardChance() * p.aggressivity * dt * tm){
                            this.addRedCard(this.team2, p, this.getMinute());
                        }
                    }
                }

                for(let p of this.getPlayerTeam().getActivePlayingPlayers()){
                    p.currentStamina = Math.max(0, p.currentStamina - Math.random() * 3e-5 * dt * tm * (1 / p.stamina));
                }

                this.ballX += this.ballSpeed * dt;
                this.ballSpeed *= 0.2 ** dt;

                if(this.ballX <= -1) {
                    this.addGoal(this.team2, this.team2.getActivePlayingPlayers()[Math.floor(Math.random() * this.team2.getActivePlayingPlayers().length)], this.getMinute());
                    this.score2++;
                    this.ballX = 0;
                }
                else if(this.ballX >= 1) {
                    this.addGoal(this.team1, this.team1.getActivePlayingPlayers()[Math.floor(Math.random() * this.team1.getActivePlayingPlayers().length)], this.getMinute());
                    this.score1++;
                    this.ballX = 0;
                }

                if(this.time >= 60 * 90){
                    this.endGame();
                    break;
                }
            }
        }
    }

    load(obj){
        this.divisionRank = obj.divisionRank;
        this.time = obj.time;
        this.timeScale = obj.timeScale;
        this.ballX = obj.ballX;
        this.score1 = obj.score1;
        this.score2 = obj.score2;
        this.team1 = game.league.divisions[this.divisionRank].teams[obj.team1Idx];
        this.team2 = game.league.divisions[this.divisionRank].teams[obj.team2Idx];
        this.powerMulti = obj.powerMulti;
        this.powerMultiFreq = obj.powerMultiFreq;
        this.gameEvents = obj.gameEvents;
        this.stadiumReward = obj.stadiumReward || new Decimal(0);
        this.ended = obj.ended;
    }

    static from(match){
        return new Match(match.team1, match.team2, match.divisionRank);
    }
}