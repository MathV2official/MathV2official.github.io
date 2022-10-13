# js13k
- Norman tries to defend himself from the local villagers
- Make magic feel like magic
  - Glyphs, cooldowns, screenshake
- Villager just runs at norman
- Brute walks, takes more hits
- Archer walks then shoots and repeats
- Priest buries corpses before norman can resurrect them
- Healer heals those around them
- Noble causes those around to speed up
- Paladin kills skeletons in one hit
- Green Fire (1 damage to targets)
- Skullerang (1 damage but boomerangs)
- Timed bomb
- Air strike
- Zap
- Claws from below
- Wave
- Ectocannon (slowing slime)
- Bloodwell
- Miasma
- Homing soulmass
- Mines
- Skull bowling
- Ghosts that go through people
- Bouncing causes projectiles to do less damage
- Better to have fewer weapons and more upgrades?
- Passives
  - At the end of the round, player can choose 1/3 scrolls to read which grant passive benefits during the next level.

## Diary
### Day 1
Ok. The base idea is very fun. Getting enough game logic in might be a challenge though.

The spells will be what makes this game. Particle effects are going to be a critical part of that.

- Projectile launch should be based on angle and speed, not a vector.
- Think about how to make sprites stick to the floor
- Collisions should be rects/AABBs.
- Glyphs circling around norman when ready to cast
- Need to think more about necromancy and less about wizard spells
- People are too floaty without animations
  - Try sprite bobbing
  - Maybe they should hop instead of continuous moving?
- People should gradually speed up and increase in frequency

Todo:
- [x] Render loop with dt
- [x] Decide on object format
- [x] Particle system
- [x] View system from tickles
- [x] Font rendering

### Day 2
Getting towards having a game. Spent a stupid amount of time trying to get collision working correctly because of issues with the coordinate system. There's a rough architecture coming together but not super happy with all of it. Suspect there will be at least one big rewrite during this project.

Missing mechanics:
- Villagers attacking norman and lose state.
- Secondary spell for resurrections
- Skeletons that attack villagers
- Souls as currency
- Defined rounds/waves with rewards

Particles are looking good and the hopping style seems to work ok. Behavioural extraction for unit types and spell types is good.

- Wider range of spell types
- Primary/secondary spells

### Day 3
Nice progress already. Sorted out the internal systems for abilities and got resurrection working. Getting close to having the core loop done.

- Round ending mechanics
- Upgrades/mutations
  - Hades model where boons can be applied then the boons themselves levelled up?
- Consumables
  - Restore health
  - Souls buff

Restart mechanics. "Norman did what any self respecting necromancer would do. He brought himself back..."

### Day 4
Only did 40 mins on the game today, busy with work and interviews. Added the priest class with the "healing" behaviour.

Might be more sensible to implement behaviours in terms of "turns" rather than ms cooldown. Then behaviours don't need to know about the object's game speed. Split behaviours out from the GameObject class so that its easy to have actions that are taken every N turns. Not sure that behaviours is the best terminology though.

Turned "march" into a behaviour which feels good. Now skeletons/villagers share the movement logic.

- Resurrect is way too powerful. Needs to start by only resurrecting the nearest skeleton to you I think. Upgrades would increase that number.
- Need to fix the bug with jumping bones
- Later waves should have regular villagers with higher base health
- Villagers should start to drop stuff already

### Day 5
- Figure out the wave structures
- Award different soul amounts for different enemies

### Day 6
Nothing.

### Day 7
Reworking the engine to focus on single spell/ability depth.
- [ ] Need to figure out how to get mouse input relative to the scene.

### Day 8
- [ ] Should behaviour be an interface `unit.addBehaviour({ onCollision: ... })`

Ideas for wave structure
- Preset pattern
- Random pattern with preset challenges
- Budget with weighting

Ideas for rituals
- Splitshot
- Straight shots
- Homing shots
- Powerup on bounce
- Tough Skeletons
- Skeleton lord
- Enemies killed by undead drop 2x souls
- Chance for skeletons to drop corpses
- Direct hits stun enemies
- Explosions stun enemies
- Glass cannon (1 HP, 2x damage)
- Critical hit chance
- Increase max hp
- Gain souls after completing a wave
- Alchemist: More potions? More potion slots?
- Bloodbank: 2x more villagers will spawn
- Projectiles:
  - Drunkard: Projectiles do 2x damage, but aim is randomised (by a small degree)
  - Bouncing
  - Explosive
  - Split on bounce
  - Split on downwards velocity
  - Piercing
  - Knockback
  - Projectiles have a 10% chance to cause curse X
  - Projectiles have a 5% chance to cause a random curse
- Environment:
  - Ceiling
- Casting:
  - Increase casting capacity
  - Increase casting cooldown
  - You fire faster 50% faster, and enemies are 25% faster
  - Fire in bursts of 3 shots, but firing is now automatic
- Effects:
  - Hex: Health is reduced by 1 each turn, to a minimum of 1
  - Vulnerable: 5x more likely to receive critical damage
  - Slow: Act twice as slowly (or move half as far?)
  - Marked: If killed whilst marked, 100% chance to become a corpse
  - Sleep: Do nothing for 3 turns
- Resurrections:
  - Gravedigger, waves start with existing corpses
  - Resurrections stun enemies
  - Resurrections heal undead allies
  - Resurrections apply effect to AoE
  - Resurrections can create wardstones instead of skeletons
  - Resurrections do either -2 damage to all villagers, or +1 health
  - Resurrections stop time for 3 seconds
- Sustain:
  - Respite: Heal 1 after each wave
  - Backstabber (killing skeletons heals you)
  - Pariah: Shield that absorbs impact but takes 10 seconds to return
- Wardstones:
  - Projectiles sometimes create a wardstone (5%)
  - Wardstones have 50% health but return after 10 seconds
  - Wardstones heal skeletons as they pass
  - Wardstones reflect damage
  - Wardstones explode on destruction
  - Wardstones cause enemies to become stunned
  - Wardstones slowly heal themselves
  - Hitting a wardstone heals it
  - Hitting a wardstone causes an explosion
  - Enemies that touch a wardstone become cursed
  - Start each wave with a wardstone infront of you
  - Look Up: Wardstones periodically drop from above

Wall decorations
- Torch
- Prison cell
- Gravestone
- Banner

Ideas for challenges:
- Huge wave of villagers (spread small damage)
- Trio of archers (neutralise quickly)
- Monks + champion
- Something where you can trade some HP for souls
- Shelled knights
- Spearmen with erratic patterns
- Wizard that shoots projectiles at you
- Static enemies that are "woken up" on damage (spiders?)

"Norman wasn't particularly popular in the town, and that was _before_ he became a necromancer."

### Day 9
Some rituals probably need to be mutually exclusive and others need requirements. E.g. split on bounce requires bounce and probably should be exclusive with splitshot. May need tags + ids. Maybe just tags is good enough (e.g. check for `BOUNCE` tag when generating bounce upgrades).

Wave ideas
1. 3 waves of villagers, and one wave with a tougher enemy
2. Each wave of villagers has a tough enemy
3. 10 villagers and a challenge

### Day 10
- Figure out firing mechanics
  - Casting speed
  - Recharge cooldown
  - Casting capacity
  - Projectile lifetime
- Figure out level mechanics
- Stone mechanics
  - How are stones created?
    - Small percentage chance on bounce/kill/resurrect?
    - Throwables?
  - Bloodstones that heal Norman when destroyed?
- Curses
- Resurrection mechanics
  - Some skulls should break randomly
  - Chance to drop skulls should be lower
  - Rituals should be able to hook into resurrections

### Day 13
- Casts reload 1/s, rituals can take that down to 3/s
- Casts are capped at 3, but rituals can take that up to 5
- Ability recharges at 0.1/s
- Power shots implemented, but not that fun
- Player UI
  - Health
  - Casts
  - Ability timer
  - Souls
- King should spawn guards so that the player has a reservoir of skeletons
  - Maybe king stops when 50% of the way into the room?
  - Maybe the king's healthbar is his progress towards the player?
    - Means the fight always gets toughest towards the end, when guards are spawning directly infront of the player.
- Rituals that affect every N-th shot.
  - Every 3rd shot is explosive
- Kapala
- Tiered rituals
  - Ritual type
  - Ritual level
  - Example
    - Every 3rd cast is piercing
    - Power shots are piercing
    - Every shot is piercing

- Necronomicon
  - +1 max health
  - +1 health
  - +1 spell capacity
  - 3 rituals

## Day 14
- Spawn structure + shop
- Soul bonuses
  - Direct hit
  - Long shot
  - Power shot
- [x] Level definitions
- [ ] Shop / level transitions

## Day 16
- [x] Shop (rough UI)
- [ ] Resurrections timer UI
- [ ] ~~Soul bonuses~~
- [ ] Ritual rarity
- [ ] End game
- [ ] Revisit rituals
- [ ] Status icons for shelled/enraged
- [ ] Design some better intro waves
- [ ] Show wave progress (people got confused about the end)
- [ ] Behaviour stacking IDs (stacking for anonymous behaviours)
- [ ] Figure out a better API for defining/composing rituals

## Day 18
Got the game size back down to 80% of the budget by combining the spritesheet/font and inlining the JS into the index.html.
- [ ] Experiment with rewriting classes as objects + functions
  - [ ] Game class can probably all be module level variables
  - [ ] Rituals as objects
  - [ ] Behaviours as objects
  - [ ] GameObject .extend method instead of unit.xyz = foo pattern

## Day 20
Should probably deduplicate some of the physics code between particles and game objects.

Played around a little bit with a soul "streak" which adds a multiplier to your earned souls. The initial multiplier was a x1..10 which ended up feeling way too punishing to break a streak. Ended up trying out x1.1..2 instead. Adds some incentive to play carefully and "perfect" the early levels, but also makes the gameplay a little less carefree.

Plans for the weekend.
- [ ] Sort out the level spawns
- [ ] Figure out ritual rarities + pricing
- [ ] Add an endgame screen
- [ ] Make resurrection a viable way to play
- [ ] Make wardstones a legit mechanic
- [ ] Figure out behaviour stacking
- [ ] Experiment with behaviours as simple objects
- [ ] Add keyboard controls

## Day 21
After beating the king, use a NG+ cycle which restarts the game at the beginning, but adds some buffs to enemies. It would be nice to change spawn patterns too, but might be annoying to implement.

## Day 22
Sound effects:
- Cast a spell
- Spell collision
- Resurrection
- Explosion

- [x] King needs to clear behaviours when he enters second form
- [x] Big Fred is too slow
- [x] Champ is too tanky/slow
- [x] Red guys are not fun
- [ ] Some rituals could be bought multiple times
- [x] Experiment with windows and sky color
- [ ] SFX for menu
- [x] Ritual hooks for level end/start/shop
- [x] Bleed is too strong when stacked

What would this game need if I want to publish it tomorrow?
- End screen
- Resurrect UI
- [x] Wizards need to do something
- [x] Behaviour stacking

- [x] Ritual which turns corpses into souls at the end of each level
- [x] Ritual which makes the shop cheaper
- [x] Knockback shouldn't work on the king


## Final Day
- [x] Make the shell wave less boring
- [x] Add the wizard to other waves
- [x] Review ritual names / necronomicon
- [x] Get game within budget
- [x] Bug between chilly + unchained
- [x] King shouldn't be freezable
- [ ] Submit
