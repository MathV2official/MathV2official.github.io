app.component("tab-league", {
    data(){
        return{
            selectedTeam: null
        }
    },
    computed: {
        division(){
            return game.league.divisions[game.team.divisionRank];
        },
        nextMatch(){
            return game.nextMatch;
        },
        canPlayMatch(){
            return game.team.canPlayNextMatch() && !this.matchRunning;
        },
        matchRunning(){
            return game.currentMatch && !game.currentMatch.ended;
        },
        divisionNumber(){
            return game.league.divisions.length - this.division.rank;
        }
    },
    methods: {
        playNextMatch(){
            this.division.playNextMatch();
            game.tab = "tab-match";
        }
    },
    template: `<div class="tab-league">
    <transition name="window-grow">
        <window-team v-if="selectedTeam" :team="selectedTeam" @closed="selectedTeam = null"></window-team>
    </transition>
    <p class="big-heading">🏆 {{division.getName()}} (Division {{divisionNumber}})</p>
    <p class="big-heading">Matchday {{division.matchDay}} / {{division.matchDays}}</p>
    <division @team-selected="selectedTeam = $event" :division="division"></division>
    <div class="next-match">
        <button v-if="canPlayMatch" @click="playNextMatch()">Play next Match<br/>{{nextMatch.team1.name}} - {{nextMatch.team2.name}}</button>
        <button disabled v-else-if="matchRunning">You are already in a Match.</button>
        <button disabled v-else>You need at least 1 Player in your Team to play the next Match!</button>
    </div>
</div>`
});