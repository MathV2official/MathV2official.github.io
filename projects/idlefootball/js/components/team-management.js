app.component("team-management", {
    props: ["team"],
    computed: {
        totalAttack(){
            return this.team.getCombinedAttack();
        },
        totalDefense(){
            return this.team.getCombinedDefense();
        },
        activePlayers(){
            return this.team.getActivePlayers();
        },
        inactivePlayers(){
            return this.team.getInactivePlayers();
        },
        playerCount(){
            return this.team.players.length;
        },
        strategyNormal(){
            return Strategy.NORMAL
        },
        strategyOffensive(){
            return Strategy.OFFENSIVE
        },
        strategyDefensive(){
            return Strategy.DEFENSIVE
        }
    },
    methods: {
        setStrategy(strategy){
            this.team.strategy = strategy;
        },
        setAggressivity(strategy){
            this.team.aggressivity = strategy;
        },
        strategySelected(strategy){
            return this.team.strategy === strategy;
        },
        aggressivitySelected(strategy){
            return this.team.aggressivity === strategy;
        },
        formatNumber: functions.formatNumber
    },
    template: `<div class="team-management">
<div class="header">
    <h4>{{team.name}}</h4>
    <p>ATT {{formatNumber(totalAttack)}}</p>
    <p>DEF {{formatNumber(totalDefense)}}</p>
    <p>Synergy {{formatNumber(team.getSynergy() * 100)}} %</p>
</div>
<div class="strategies">
    <div class="strategy">
        <h4>Strategy</h4>
        <button :class="{'selected': strategySelected(strategyNormal)}" @click="setStrategy(strategyNormal)"><img alt="Neutral" src="images/icons/strategy/neutral.png"/><br/>ATT x1<br/>DEF x1</button>
        <button :class="{'selected': strategySelected(strategyOffensive)}" @click="setStrategy(strategyOffensive)"><img alt="Offensive" src="images/icons/strategy/offensive.png"/><br/>ATT x1.3<br/>DEF &div;1.3</button>
        <button :class="{'selected': strategySelected(strategyDefensive)}" @click="setStrategy(strategyDefensive)"><img alt="Defensive" src="images/icons/strategy/defensive.png"/><br/>DEF x1.3<br/>ATT &div;1.3</button>
    </div>
    <div class="strategy">
        <h4>Aggressiveness</h4>
        <button :class="{'selected': aggressivitySelected(strategyNormal)}" @click="setAggressivity(strategyNormal)"><img alt="Neutral" src="images/icons/strategy/neutral.png"/><br/>ATT x1, DEF x1<br/>Red Cards x1</button>
        <button :class="{'selected': aggressivitySelected(strategyOffensive)}" @click="setAggressivity(strategyOffensive)"><img alt="Offensive" src="images/icons/strategy/offensive.png"/><br/>ATT x1.1, DEF x1.1<br/>Red Cards x2</button>
        <button :class="{'selected': aggressivitySelected(strategyDefensive)}" @click="setAggressivity(strategyDefensive)"><img alt="Defensive" src="images/icons/strategy/defensive.png"/><br/>ATT &div;1.1, DEF &div;1.1<br/>Red Cards &div;2</button>
    </div>
</div>
<div>
    <div class="players active">
        <player v-for="(p, i) in team.getActiveSortedPlayers()" :player="p" :key="i"></player>
        <div v-for="i in 11 - activePlayers.length" class="placeholder"></div>
    </div>
</div>
<div class="inactive-players">
    <div class="no-players" v-if="playerCount === 0">
        You don't have any players in your Team. Consider buying some first in the Market.
    </div>
    <div class="players inactive">
        <player v-for="(p, i) in team.getInactiveSortedPlayers()" :player="p" :key="i"></player>
    </div>
</div>
</div>`
});