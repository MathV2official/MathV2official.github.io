app.component("tab-upgrades", {
    data(){
        return {
            upgrades: game.moneyUpgrades
        }
    },
    methods: {
        formatNumber: functions.formatNumber
    },
    computed: {
        money(){
            return game.money
        }
    },
    template: `<div class="tab-upgrades">
<p class="money">You have {{formatNumber(money)}} $</p>
<div class="upgrade-container">
    <upgrade :upgrade="upgrades.matchSpeed">
        <template v-slot:title>Match Speed</template>
        <template v-slot:description>Increase the maximum Match Speed you can configure.</template>
    </upgrade>
    <upgrade :upgrade="upgrades.matchRewards">
        <template v-slot:title>Match Rewards</template>
        <template v-slot:description>Get more Money per match played.</template>
    </upgrade>
    <upgrade :upgrade="upgrades.cheaperPlayers">
        <template v-slot:title>Market Strategy</template>
        <template v-slot:description>Decrease the Price of Players in the Market.</template>
    </upgrade>
    <upgrade :upgrade="upgrades.playerRegeneration">
        <template v-slot:title>Energy Drink</template>
        <template v-slot:description>Increase the rate at which Players regenerate stamina.</template>
    </upgrade>
</div>
</div>`
});