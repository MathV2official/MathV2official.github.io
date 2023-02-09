app.component("tab-player-training", {
    mixins: [mixinHelp],
    data(){
        return {
            training: game.training
        }
    },
    methods: {
        trainingSelected(t){
            return !t.paused;
        },
        formatNumber: functions.formatNumber
    },
    computed: {
        money(){
            return game.money;
        }
    },
    template: `<div class="tab-player-training">
    <p class="money">You have {{formatNumber(money)}} $</p>
    <transition name="window-grow">
        <window v-if="helpDialogActive" @closed="hideHelpDialog()">
            <template v-slot:header><div class="icon-flex"><img src="images/icons/player-training.png"/> Training</div></template>
            <template v-slot:body><p>Tired of always throwing players out after each season? You can now <b>unleash their potential</b> by training them.</p>
            <p>Just move them to training from the "Team" tab and <b>select a training</b>. You can also <b>upgrade</b> multiple aspects of training to increase the potential even
            more.</p></template>
        </window>
    </transition>
    <h4 class="big-heading">Players in Training <button class="help" @click="showHelpDialog()"><img src="images/icons/help.png"/></button></h4>
    <player v-for="(p, i) in training.players" :player="p" :key="i"></player>
    <div v-for="i in training.getMaxPlayers() - training.players.length" class="placeholder"></div>
    <h4 class="big-heading">Training</h4>
    <div class="trainings">
        <div>
            <game-task :task="training.tasks.general">
                <template v-slot:title>General Training</template>
                <template v-slot:body>Increase Attack and Defense additively each time to let your players just perform better than before.</template>
            </game-task>
            <button :disabled="trainingSelected(training.tasks.general)" @click="training.selectTask(training.tasks.general)">Train</button>
        </div>
        <div>
            <game-task :task="training.tasks.stamina">
                <template v-slot:title>Stamina Training</template>
                <template v-slot:body>Let your Players run around the pitch to train their Stamina by 1 each time.</template>
            </game-task>
            <button :disabled="trainingSelected(training.tasks.stamina)" @click="training.selectTask(training.tasks.stamina)">Train</button>
        </div>
        <div>
            <game-task :task="training.tasks.aggressiveness">
                <template v-slot:title>Aggressivity Training</template>
                <template v-slot:body>Teach your Players that kicking legs instead of footballs is not good. Cut Aggressiveness by 1 % each time.</template>
            </game-task>
            <button :disabled="trainingSelected(training.tasks.aggressiveness)" @click="training.selectTask(training.tasks.aggressiveness)">Train</button>
        </div>
    </div>
    <h4 class="big-heading">Upgrades</h4>
    <div class="upgrade-container">
        <upgrade :upgrade="training.upgrades.trainSpeed">
            <template v-slot:title>Discipline! Discipline!</template>
            <template v-slot:description>Players train faster. No doping included!</template>
        </upgrade>
        <upgrade :upgrade="training.upgrades.generalTraining">
            <template v-slot:title>Learning Curve</template>
            <template v-slot:description>The Stat increase after General Training is higher.</template>
        </upgrade>
        <upgrade :upgrade="training.upgrades.longetivity">
            <template v-slot:title>Infinite Potential</template>
            <template v-slot:description>The Stat increase after General Training is slightly exponential.</template>
        </upgrade>
    </div>
</div>`
});