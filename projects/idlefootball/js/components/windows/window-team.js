app.component("window-team", {
    props: ["team"],
    methods: {
        formatNumber: functions.formatNumber
    },
    template: `<window class="window-team">
<template v-slot:header>
    <div class="icon-flex">
        <team-logo :logo="team.logo"></team-logo>
        <span>{{team.name}}</span>
    </div>
</template>
<template v-slot:body>
    <p class="stats">ATT <span>{{formatNumber(team.getCombinedAttack())}}</span> 
        DEF <span>{{formatNumber(team.getCombinedDefense())}}</span></p>
    <div class="players">
        <div class="icon-flex" v-for="p in team.getActivePlayers()">
            <img alt="" src="images/player.png"/>
            <p>{{p.name}}</p>
        </div>
    </div>
</template>
</window>`
});