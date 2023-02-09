app.component("game-header", {
    methods: {
        changeTab(tab){
            game.tab = tab;
        },
        formatNumber: functions.formatNumber
    },
    computed:{
        logo(){
            return this.$root.team.logo;
        },
        term(){
            return this.$root.settings.term;
        },
        stadiumUnlocked(){
            return Stadium.isUnlocked;
        },
        countriesUnlocked(){
            return Country.isUnlocked;
        },
        trainingUnlocked(){
            return PlayerTraining.isUnlocked;
        },
        tvUnlocked(){
            return game.tv.isUnlocked();
        }
    },
    template: `<header>
<h1>Idle {{term}} Manager</h1>
<nav>
    <ul>
        <li class="icon-flex" @click="changeTab('tab-team')"><team-logo :logo="logo"></team-logo> Team</li>
        <li class="icon-flex" @click="changeTab('tab-player-market')"><img src="images/icons/player-market.png"/> Market</li>
        <li class="icon-flex" @click="changeTab('tab-upgrades')"><img src="images/icons/upgrades.png"/> Upgrades</li>
        <li class="icon-flex" @click="changeTab('tab-league')"><img src="images/icons/league.png"/> League</li>
        <li class="icon-flex" @click="changeTab('tab-match')"><img src="images/icons/football.png"/> Match</li>
        <li v-if="stadiumUnlocked" class="icon-flex" @click="changeTab('tab-stadium')"><img src="images/icons/stadium.png"/> Stadium</li>
        <li v-if="trainingUnlocked" class="icon-flex" @click="changeTab('tab-player-training')"><img src="images/icons/player-training.png"/> Training</li>
        <li v-if="tvUnlocked" class="icon-flex" @click="changeTab('tab-tv-channels')"><img src="images/tv-filled.png"/> TV</li>
        <li v-if="countriesUnlocked" class="icon-flex" @click="changeTab('tab-countries')"><img src="images/icons/country.png"/> Countries</li>
        <li class="icon-flex" @click="changeTab('tab-achievements')"><img src="images/icons/achievements.png"/> Achievements</li>
        <li class="icon-flex" @click="changeTab('tab-settings')"><img src="images/icons/settings.png"/> Settings</li>
    </ul>
</nav>
</header>`
});