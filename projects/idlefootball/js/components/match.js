app.component("match", {
    props: ["match"],
    data(){
        return {
            matchTimeScaleLog: 0,
            windowOpen: true
        }
    },
    mounted(){
        this.matchTimeScaleLog = Math.log10(game.settings.match.speed);
    },
    methods: {
        formatTime: functions.formatTime,
        formatNumber: functions.formatNumber,
        setTimeScale(){
            this.match.timeScale = this.timeScale;
            game.settings.match.speed = this.timeScale;
        },
        playNextMatch(){
            if(this.canPlayNextMatch){
                game.league.divisions[game.team.divisionRank].playNextMatch();
            }
        }
    },
    computed: {
        money(){
            return game.money;
        },
        stadiumUnlocked(){
            return Stadium.isUnlocked;
        },
        team1Events(){
            return this.match.gameEvents.filter(goal => goal.teamIndex === 0);
        },
        team2Events(){
            return this.match.gameEvents.filter(goal => goal.teamIndex === 1);
        },
        maxTimeScaleLog(){
            return Math.log10(game.moneyUpgrades.matchSpeed.apply() * game.tv.upgrades.matchSpeed.apply());
        },
        timeScale(){
            return Math.round(10 ** this.matchTimeScaleLog);
        },
        reward(){
            return this.match.getRewardMoney();
        },
        canPlayNextMatch(){
            return (this.match.time === 0 || this.match.ended) && game.team.canPlayNextMatch();
        }
    },
    template: `<div class="match">
<match-view :ballx="match.ballX"></match-view>
<div class="stats">
    <p class="time">{{formatTime(match.time)}}<button :disabled="!canPlayNextMatch" v-if="match.time === 0" @click="playNextMatch()">Start</button></p>
    <div class="score">
        <div class="icon-flex">
            <team-logo :logo="match.team1.logo"></team-logo>
            <p>{{match.team1.name}}</p>
        </div> 
        <p class="numbers">{{match.score1}} - {{match.score2}}</p> 
        <div class="icon-flex">
            <p>{{match.team2.name}}</p>
            <team-logo :logo="match.team2.logo"></team-logo>
        </div>
    </div>
</div>
<div class="events">
    <div>
        <p v-for="g in team1Events">{{g.name}} {{g.minute}}'
            <img alt="⚽" v-if="g.event === 0" src="images/icons/football.png"/>
            <img alt="🟥" v-else-if="g.event === 1" src="images/icons/red-card.png"/>
        </p>
    </div>
    <div>
    
    </div>
    <div>
        <p v-for="g in team2Events">
            <img alt="⚽" v-if="g.event === 0" src="images/icons/football.png"/>
            <img alt="🟥" v-else-if="g.event === 1" src="images/icons/red-card.png"/> {{g.name}} {{g.minute}}'
        </p>
    </div>
</div>
<transition name="window-grow">
    <window v-if="match.ended && windowOpen" @closed="windowOpen = false">
        <template v-slot:header><div class="icon-flex"><img src="images/icons/football.png"/><span>Match Ended</span></div></template>
        <template v-slot:body>
            <p>Your performance in this match rewarded you:</p>
            <p class="reward">+ {{formatNumber(reward)}} $</p>
            <div v-if="stadiumUnlocked">
                <p>Your Stadium earned you:</p>
                <p class="reward">+ {{formatNumber(match.stadiumReward)}} $</p>
            </div>
            <p>You now have {{formatNumber(money)}} $</p>
            <p>
                <button @click="playNextMatch()">→ Play next Match</button>
            </p>
        </template>
    </window>
</transition>
<div class="speed-controls">
    <label>Match Speed (x{{timeScale.toFixed(0)}})<br/><input type="range" step="any" v-model="matchTimeScaleLog" @input="setTimeScale()" min="0" :max="maxTimeScaleLog"/></label>
</div>
</div>`
});