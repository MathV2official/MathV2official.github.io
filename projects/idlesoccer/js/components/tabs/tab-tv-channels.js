app.component("tab-tv-channels", {
    mixins: [mixinHelp],
    data(){
        return {
            channels: game.tv.channels,
            upgrades: game.tv.upgrades
        }
    },
    methods: {
        formatNumber: functions.formatNumber
    },
    computed: {
        money(){
            return game.money;
        }
    },
    template: `<div class="tab-tv-channels">
    <p class="money">You have {{formatNumber(money)}} $</p>
    <transition name="window-grow">
        <window v-if="helpDialogActive" @closed="hideHelpDialog()">
            <template v-slot:header><div class="icon-flex"><img src="images/tv-filled.png"/> TV Channels</div></template>
            <template v-slot:body><p>TV Channels provide an <b>additional source of income</b>. When buying (or contracting) a TV Channel, you get paid for <b>every second</b>
            while a Match is running, based on its win reward. Also, <b>Match Rewards get multiplied</b> by a certain amount.</p>
            <p>There also are <b>additional Upgrades</b> to boost your income even further.</p></template>
        </window>
    </transition>
    <h4 class="big-heading">Channels <button class="help" @click="showHelpDialog()"><img src="images/icons/help.png"/></button></h4>
    <div class="channels">
        <tv-channel v-for="(c, i) in channels" :channel="c"></tv-channel>
    </div>
    <h4 class="big-heading">Upgrades</h4>
    <div class="upgrade-container">
        <upgrade :upgrade="upgrades.matchReward">
            <template v-slot:title>Statistical Recognition</template>
            <template v-slot:description>Increase the Match Rewards by a percentage of Stadium Rewards.</template>
        </upgrade>
        <upgrade :upgrade="upgrades.channelMoney">
            <template v-slot:title>Cool Ads and nice Commentary</template>
            <template v-slot:description>Channels pay you more Money each second.</template>
        </upgrade>
        <upgrade :upgrade="upgrades.matchSpeed">
            <template v-slot:title>Beyond Speed</template>
            <template v-slot:description>Increase max Match Speed.<br/>
            <i>Wanna see me play a match? Wanna see me do it again?</i></template>
        </upgrade>
    </div>
</div>`
});