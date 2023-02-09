app.component("player", {
    props: ["player"],
    data() {
        return {
            showStatBreakdown: false,
            teamPlayers: game.team.players
        }
    },
    methods: {
        formatNumber: functions.formatNumber,
        addToTraining(){
            game.training.addPlayer(this.player);
        },
        removeFromTraining(){
            game.training.removePlayer(this.player);
        },
        sellPlayer(){
            if(keyMap.keyPressed("Shift") || !game.settings.players.shiftToSell){
                this.player.sell();
            }
        }
    },
    computed: {
        canMove(){
            if(this.player.hasRedCard() && (game.currentMatch && !game.currentMatch.ended || !this.player.active)){
                return false;
            }
            return (!this.teamFull && !this.player.active) || this.player.active;
        },
        canSell(){
            return keyMap.keyPressed("Shift") || !game.settings.players.shiftToSell;
        },
        teamFull(){
            return game.team.getActivePlayers().length >= 11;
        },
        isBought(){
            return this.teamPlayers.find(p => p === this.player) !== undefined || game.training.players.find(p => p === this.player) !== undefined;
        },
        trainingUnlocked(){
            return PlayerTraining.isUnlocked;
        },
        isTraining(){
            return this.$root.training.players.find(p => p === this.player) !== undefined;
        },
        buttonWidth(){
            if(!this.trainingUnlocked){
                return "100%";
            }
            return this.player.active ? "100%" : "50%";
        }
    },
    template: `<div class="player">
<p class="header"><div @click="showStatBreakdown = true" class="icon-flex"><img alt="" src="images/player.png"/><img v-if="player.hasRedCard()" alt="" src="images/icons/red-card.png"/> {{player.name}}</div>
<div class="icon-flex" v-if="isBought"><img alt="" src="images/icons/stamina.png"/> <progress-bar :value="player.currentStamina"></progress-bar></div></p>
<div class="stats">
    <p><span>ATT</span> {{formatNumber(player.getBaseAttack())}}</p>
    <p>{{formatNumber(player.getBaseDefense())}} <span>DEF</span></p>
    <p><span>AGG</span> {{formatNumber(player.aggressivity * 100)}}</p>
    <p>{{formatNumber(player.stamina * 100)}} <span>STA</span></p>
</div>
<div class="actions">
    <div v-if="isBought">
        <div v-if="isTraining">
            <button v-if="!player.active" @click="removeFromTraining()">Stop Training</button>
        </div>
        <div v-else>
            <button :style="{width: buttonWidth}" :disabled="!canMove" v-if="isBought" @click="player.active = !player.active"><span v-if="!player.active">Move to Team</span><span v-else>Move from Team</span></button>
            <button :style="{width: '50%'}" v-if="!player.active && trainingUnlocked" @click="addToTraining()">Train</button>
            <button class="negative" v-if="!player.active" @click="sellPlayer()">Sell ({{formatNumber(player.getSellAmount())}} $)</button>
        </div>
    </div>
    <div v-else>
        <button :disabled="!player.canAfford()" @click="player.buy()">Buy ($ {{formatNumber(player.getPrice())}})</button>
    </div>
</div>
<transition name="window-grow">
    <window-player @closed="showStatBreakdown = false" v-if="showStatBreakdown" :player="player">
    
    </window-player>
</transition>
</div>`
});