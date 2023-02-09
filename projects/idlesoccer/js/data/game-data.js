let game = {
    init: false,
    numberFormatter: new ADNotations.StandardNotation(),
    money: new Decimal(25000),
    team: null,
    currentMatch: null,
    nextMatch: null,
    league: null,
    restartedTutorial: false,
    countries: [
        new Country("Nowhereia", `This is your Starting Point. People here don't even really play Football, and are not interested in it. 
            Teams here aren't very good, a good way for you to get going!`, new CountryFlag(["white"])),
        new Country("Anti-Football Nation", `They do play Football, but they really dislike it. They still play it, for some reason.
            They are better than in Nowhereia, but it won't be a Problem for you.`, new CountryFlag(["white", "skyblue", "blue"])),
        new Country("Country #3", `It's just an ordinary Country, as ordinary as it can be. There's nothing special about it. They
        <span title="For lack of creativity.">don't even have a unique Name.</span>`, new CountryFlag(["#81ac5c", "#abcdef", "#7e86a7"]))
    ],
    maxDivisionRank: 0,
    country: 0,
    canEnterNextCountry: false,
    playerMarket: new PlayerMarket(),
    moneyUpgrades:{
        matchSpeed: new MoneyUpgrade(level => Decimal.pow(3, level).mul(10000),
            level => 300 * (320 / 300) ** level, {
                maxLevel: 12
            }),
        //-> 9x money per division, ~11x player price per division
        matchRewards: new MoneyUpgrade(level => Decimal.pow(9, level / 4).mul(100000),
            level => (9 / 6) ** (level / 4)),
        cheaperPlayers: new MoneyUpgrade(level => Decimal.pow(7, level / 3).mul(1000000),
            level => 1 / 1.02 ** level),
        playerRegeneration: new MoneyUpgrade(level => Decimal.pow(1.25, level).mul(5000000),
            level => new Decimal(1 + 0.05 * level), {
                getEffectDisplay: effectDisplayTemplates.percentStandard(0)
            })
    },
    stadium: new Stadium(),
    training: new PlayerTraining(),
    tv: {
        isUnlocked: () => game.maxDivisionRank >= 8 || game.country >= 1,
        channels: [
            new TVChannel("FootForce TV", new Decimal(1e12), 0.25 / 5400, new Decimal(1.5)),
            new TVChannel("GOALUnited", new Decimal(1.777e16), 0.4 / 5400, new Decimal(2)),
            new TVChannel("Futebol Mágico", new Decimal(2.222e22), 0.7 / 5400, new Decimal(3)),
            new TVChannel("Channel 44", new Decimal(1e30), 1 / 5400, new Decimal(5))
        ],
        upgrades: {
            matchReward: new MoneyUpgrade(level => Decimal.pow(2, level).mul(1e10),
                level => new Decimal(0.01 * level), {
                    getEffectDisplay: effectDisplayTemplates.percentStandard(0)
                }),
            channelMoney: new MoneyUpgrade(level => Decimal.pow(1.4, level).mul(1e12),
                level => new Decimal(1 + 0.1 * level)),
            matchSpeed: new MoneyUpgrade(level => Decimal.pow(4, level).mul(1e15),
                level => 1.1 ** level, {
                    maxLevel: 10
                })
        }
    },
    achievements: [
        new Achievement("Starting Out", "Buy your first Player", "images/icons/player-market.png", () => game.team.players.length > 0),
        new Achievement("I am the Winner!", "Win your first match", "images/icons/football.png", () => game.team.divisionStats.win >= 1),
        new Achievement("Full Team", "Have 11 Players active in your Team", "images/player.png", () => game.team.getActivePlayers().length >= 11),
        new Achievement("Color Palette", "Give your Team Logo as many Colors as possible", "images/icons/colorful.png", () => game.team.logo.gradient.length >= 9),
        new Achievement("Upgradealicious", "Buy your first Upgrade", "images/icons/upgrades.png", () => Utils.getTotalUpgradeLevels(game.moneyUpgrades) > 0),
        new Achievement("Ẅ̵̡̜̻̦̦̓̔͂̏̈̉̀̈́̕͘̚͜͠e̸̢̛͖̦͓̼̐̉͌̈́̃̄͐̎̃̌̉̕͘͘͜ͅḯ̵̧͚͚̯͚͕̘̻͋ͅr̸̨̛͉͇̼͎̭͍̺͗̍̆͒̉̅́͊͑̓̇̇̃̕d̶̞̮̭̲̭̲̏͑̇͗̆̽̅̕͝͝ ̴̨̢͚͉͓͓̺̘̩̖͎̳̥̯̓̋́̿͐̐͆͒̍̆̈͒N̸̨̻̻̈́́͐͒u̴̡̧̨̬̫̼̞̬̩̙̗̜͒̽̐̈́̉ḿ̸̞̝̭̟̼̜̫̳̻̹̖b̷̧̢̡̳̮̤̖̓͊͛͒̀͛̑̚ȅ̶͔̘͈̦͕̩̟͎̗̙̩̿̅̅̾̒̈́̀͘̚͝ͅͅr̸̩͔̖̥̬̮̯̣̭̅s̴̡̨͚͕̦̙̉̅̈́̋̔͆͛͛͌̆̎̚͝", "Change your Notation to Zalgo", "images/icons/zalgo.png", () => game.numberFormatter.name === "Zalgo"),
        new Achievement("Rich? Not really...", () => "Have at least " + functions.formatNumber(100000) + " $", "images/icons/money.png", () => game.money.gte(100000)),
        new Achievement("I am the Champion!", "Promote into the next Division", "images/icons/league.png", () => game.team.divisionRank >= 1),
        new Achievement("Someone's watching", "Unlock the Stadium", "images/icons/stadium.png", () => Stadium.isUnlocked),
        new Achievement("That's a lot of MONEY", () => "Have at least " + functions.formatNumber(10000000) + " $", "images/icons/rich.png", () => game.money.gte(10000000)),
        new Achievement("Kinda Famous", () => "Have at least " + functions.formatNumber(10000) + " Fans", "images/icons/stadium.png", () => game.stadium.fans.gte(10000)),
        new Achievement("Final Division", "Promote into the highest Division", "images/icons/league.png", () => game.team.divisionRank >= game.league.divisions.length - 1),
        new Achievement("Very Famous", () => "Have at least " + functions.formatNumber(10e6) + " Fans", "images/icons/stadium.png", () => game.stadium.fans.gte(10e6)),
        new Achievement("Super Speed", "Turn your Match Speed above x300", "images/icons/speed.png", () => game.settings.match.speed >= 300),
        new Achievement("Git Gud", "Unlock Player Training by Reaching Division 5", "images/icons/player-training.png", () => PlayerTraining.isUnlocked),
        new Achievement("Channel 43", "Unlock TV Channels by Reaching Division 2", "images/tv-filled.png", () => game.tv.isUnlocked()),
        new Achievement("I am the Master!", "Enter the next Country", "images/icons/country.png", () => game.country >= 1),
        new Achievement("Stonks", () => "Have a Player with a sell price of over " + functions.formatNumber(1e18) + ", which <i>might</i> be enough to buy the Moon", "images/icons/stonks.png", () => game.team.players.concat(game.training.players).filter(p => p.getSellAmount().gt(1e18)).length > 0),
        new Achievement("U Got Gud", () => "Have a player with a Training Factor of over " + functions.formatNumber(1000), "images/icons/player-training.png", () => game.team.players.concat(game.training.players).filter(p => p.trainingFactor.gt(1e3)).length > 0),
        new Achievement("The WORLD is watching", () => "Have a Stadium Capacity of at least " + functions.formatNumber(7.8e9), "images/icons/stadium.png", () => game.stadium.getCapacity().gte(7.8e9)),
        new Achievement("Ludicrous Speed", "Turn your Match Speed above x1,000", "images/icons/speed2.png", () => game.settings.match.speed >= 1000),
        new Achievement("U Got God", () => "Have a player with a Training Factor of over " + functions.formatNumber(1e6), "images/icons/player-training-2.png", () => game.team.players.concat(game.training.players).filter(p => p.trainingFactor.gt(1e6)).length > 0),
        new Achievement("The WORLD WORLD is watching", () => "Have a Stadium Capacity of at least " + functions.formatNumber(7.8e9 ** 2) + "<br/><i>imagine We had 7.8 Billion Earths, with 7.8 Billion people each.</i>", "images/icons/stadium.png", () => game.stadium.getCapacity().gte(7.8e9 ** 2)),
        new Achievement("Around the World", "Enter the 3rd Country", "images/icons/country.png", () => game.country >= 2)
    ],
    tab: "tab-team",
    settings: {
        term: "Football",
        team: {
            refillPlayers: true
        },
        match: {
            speed: 1,
            autoPlay: false,
            minAutoPlayStamina: 0
        },
        players: {
            shiftToSell: false
        },
        tv: {
            renderCanvas: true
        }
    }
};