app.component("tutorial", {
    data(){
        return {
            stage: 0,
            logo: game.team.logo
        }
    },
    methods:{
        exitTutorial(){
            this.stage = -1;
            game.restartedTutorial = false;
        }
    },
    template: `<div class="tutorial">
<window-tutorial v-if="stage === 0" @closed="stage++" @page="stage = $event" @tutorialexit="exitTutorial()">
    <template v-slot:header>
        <div class="icon-flex"><img src="images/icons/help.png"/> Tutorial</div>
    </template>
    <template v-slot:body>
        <p>Welcome to Idle Football Manager, 
        a Game where you build your own Football Team and compete to become the champion!</p>
        <p>You can <b>freely navigate inside the Game</b> while the Tutorial Window is open. Feel free to try out the mechanics
        on the go! Click the (X) on the top right of the window to view the next page</p>
        <p>You can <b>always restart</b> the Tutorial in the Settings Menu! You can also use it to <b>configure</b> the Game to your needs and to <b>backup your progress</b>.</p>
    </template>
</window-tutorial>
<window-tutorial v-if="stage === 1" @closed="stage++" @page="stage = $event" @tutorialexit="exitTutorial()">
    <template v-slot:header><div class="icon-flex"><img src="images/icons/help.png"/> Your Team</div></template>
    <template v-slot:body><p>You can add up to 11 Players to your Team. The overall strength of your Team is determined by the sum of your
    Players stats. Your Teams strength is multiplied by <b>Synergy</b>.</p>
    <p>The more Players that are active in your team, the higher your synergy is.
    Therefore, it is <b>better to have more weak players</b> than one strong player.</p>
    <p><b>Click on a Players name</b> to get a Stat Breakdown.</p>
    <p>Each Player has 4 Stats: <b>ATT</b>ack, <b>DEF</b>ense, <b>AGG</b>ressiveness (Chance to get a Red Card) and 
    <b>STA</b>mina (How fast players lose and regenerate Stamina). Stamina passively fills every second while a player is not playing.</p></template>
    <template v-slot:image>
        <team-logo :logo="logo"></team-logo>
    </template>
</window-tutorial>
<window-tutorial v-if="stage === 2" @closed="stage++" @page="stage = $event" @tutorialexit="exitTutorial()">
    <template v-slot:header><div class="icon-flex"><img src="images/icons/help.png"/> Player Market</div></template>
    <template v-slot:body><p>This is the Place where you can buy <b>new Players</b> for your Team. The more expensive a player is, the more money you have
    to pay.</p>
    <p>The Market <b>refreshes every few Matchdays</b> and on new Seasons. <b>You can re-buy sold Players</b> while they are still there.</p></template>
    <template v-slot:image>
        <img alt="" src="images/icons/player-market.png"/>
    </template>
</window-tutorial>
<window-tutorial v-if="stage === 3" @closed="stage++" @page="stage = $event" @tutorialexit="exitTutorial()">
    <template v-slot:header><div class="icon-flex"><img src="images/icons/help.png"/> Upgrades</div></template>
    <template v-slot:body><p>Upgrades are bought with Money and let you boost different aspects of the Game. <b>You need to have at least one Player in your Team</b>
    to be able to buy Upgrades.</p></template>
    <template v-slot:image>
        <img alt="" src="images/icons/upgrades.png"/>
    </template>
</window-tutorial>
<window-tutorial v-if="stage === 4" @closed="stage++" @page="stage = $event" @tutorialexit="exitTutorial()">
    <template v-slot:header><div class="icon-flex"><img src="images/icons/help.png"/> League</div></template>
    <template v-slot:body><p>This is the main part of the Game. Each League has <b>ten divisions</b>, of which each has <b>18 Matchdays</b>.
    At the end of the Season, you can either <b>promote</b> to a higher division (green cells) or <b>relegate</b> to a lower division (red cells).</p>
    <p><b>Click on a Team Name</b> to get more Information about the Team. You can also hover it for a moment to see its Attack and Defense</p></template>
    <template v-slot:image>
        <img alt="" src="images/icons/league.png"/>
    </template>
</window-tutorial>
<window-tutorial v-if="stage === 5" @closed="exitTutorial()" @page="stage = $event" @tutorialexit="exitTutorial()">
    <template v-slot:header><div class="icon-flex"><img src="images/icons/help.png"/> Match</div></template>
    <template v-slot:body><p>In the Match tab, you can watch the Game live. <b>Adjust the Speed of the Game</b> to your liking. At the end of a Match,
    you get money based on if you won, drew or lost the game. The <b>reward changes based on the division</b> you are in.</p></template>
    <template v-slot:image>
        <img alt="" src="images/icons/football.png"/>
    </template>
</window-tutorial>
</div>`
});