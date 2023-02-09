app.component("tab-player-market", {
    data(){
        return {
            playerMarket: game.playerMarket
        }
    },
    methods: {
        formatNumber: functions.formatNumber
    },
    computed: {
        money(){
            return game.money;
        },
        refreshTime(){
            return 4 - game.league.divisions[game.team.divisionRank].matchDay % 4;
        }
    },
    template: `<div class="tab-player-market">
<p class="money">You have {{formatNumber(money)}} $<br/>
    Refresh in {{refreshTime}} Matchday(s)</p>
<player-market :playerMarket="playerMarket"></player-market>
</div>`
});