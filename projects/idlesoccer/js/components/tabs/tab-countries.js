app.component("tab-countries", {
    data(){
        return {
            countries: game.countries
        };
    },
    methods: {
        enterNextCountry(){
            if(game.canEnterNextCountry){
                game.country++;
                game.league = GeneratorUtils.generateLeague(0, game.country);
                game.league.divisions[0].teams[0] = game.team;
                game.team.divisionRank = 0;
                game.league.simulate();
                game.playerMarket.refresh();
                game.canEnterNextCountry = false;
            }
        },
        countryIsLocked(i){
            return i - 1 > this.country;
        }
    },
    computed: {
        canEnterNextCountry(){
            return game.canEnterNextCountry && game.team.divisionRank === game.league.divisions.length - 1;
        },
        country(){
            return game.country;
        }
    },
    template: `<div class="tab-countries">
<country v-for="(c, i) in countries" :country="c" :locked="countryIsLocked(i)" :class="{selected: country === i}"></country>
<div v-if="country >= countries.length">
    <h2>You are in <i>some</i> Country (#{{country + 1}})</h2>
    <p>No one knows its name, its Flag or anything else about it. All we know is that there's an uncountable amount of those countries, and each of them
    has a Football League. How far can you go? Good Luck!</p>
</div>
<div class="next-country">
    <button :disabled="!canEnterNextCountry" v-if="canEnterNextCountry" @click="enterNextCountry()">
        <h4>Next Country</h4>
        <p>Moving to the next Country will immediately move you to a new League with much higher rewards awaiting...<br/>
        You can move anytime, but you can't go back.</p>
    </button>
    <button disabled v-else>
        <h4>Next Country</h4>
        <p>You need to become champion in Division 1 at least once.</p>
    </button>
</div>
</div>`
});