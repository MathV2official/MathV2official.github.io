class PlayerTrainingTask extends GameTask{
    constructor(onComplete){
        super(() => 30 / game.training.upgrades.trainSpeed.apply(), onComplete);
    }

    getPlayers(){
        return game.training.players;
    }
}

class PlayerTrainingTaskGeneral extends PlayerTrainingTask{
    constructor(){
        super(() => {
            for(let p of game.training.players){
                p.trainingFactor = p.trainingFactor.add(game.training.upgrades.generalTraining.apply());
                p.trainingFactor = p.trainingFactor.mul(game.training.upgrades.longetivity.apply().add(1));
            }
        });
    }
}

class PlayerTrainingTaskStamina extends PlayerTrainingTask{
    constructor(){
        super(() => {
            for(let p of game.training.players){
                p.stamina += 0.01;
            }
        });
    }
}

class PlayerTrainingTaskAggressiveness extends PlayerTrainingTask{
    constructor(){
        super(() => {
            for(let p of game.training.players){
                p.aggressivity /= 1.01;
            }
        });
    }
}