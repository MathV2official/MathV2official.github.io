import {
  ParticleEmitter,
  Sprite,
} from "./engine";

import {
  clamp,
  Constructor,
  overlaps,
  Point,
  Rectangle,
  removeFromArray,
  vectorFromAngle,
} from "./helpers";

declare global {
  let game: Game;
  interface Window {
    game: Game;
  }
}

export const MAX_STREAK = 10;

export type Rarity = typeof COMMON | typeof RARE;
export const COMMON = 0;
export const RARE = 1;

export class GameObject {
  // Physics
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  mass = 0;
  bounce = 0;
  friction = 0;
  hop = 0;

  // Display
  sprite: Sprite = [0, 0, 0, 0];
  emitter: ParticleEmitter | undefined;

  // Logic
  tags = 0;
  collisionMask = 0;
  hp = 0;
  maxHp = 0;
  souls = 0;
  corpseChance = 0;
  despawnOnCollision = false;
  despawnOnBounce = false;
  groupId = 0;

  // Behaviours
  behaviours: Behaviour[] = [];
  updateSpeed = 0;
  updateClock = 0;

  is(mask: number): boolean {
    return (this.tags & mask) > 0;
  }

  bounds() {
    return Rectangle(this.x, this.y, this.sprite[2], this.sprite[3]);
  }

  center() {
    return Point(this.x + this.sprite[2] / 2, this.y + this.sprite[3] / 2);
  }

  update(dt: number) {
    this.onFrame(dt);

    this.updateClock -= dt;

    if (this.updateClock <= 0) {
      this.updateClock = this.updateSpeed;
      this.onUpdate();
    }

    if (this.emitter) {
      this.emitter.x = this.x;
      this.emitter.y = this.y;
    }
  }

  addBehaviour(behaviour: Behaviour = new Behaviour(this), index = this.behaviours.length): Behaviour {
    let { constructor } = Object.getPrototypeOf(behaviour);
    if (constructor !== Behaviour && this.getBehaviour(constructor)) return behaviour;

    this.behaviours.splice(index, 0, behaviour);
    behaviour.onAdded();
    return behaviour;
  }

  removeBehaviour(behaviour: Behaviour) {
    removeFromArray(this.behaviours, behaviour);
    behaviour.onRemoved();
  }

  getBehaviour<T>(constructor: Constructor<T>): T | undefined {
    return this.behaviours.find(
      behaviour => behaviour instanceof constructor,
    ) as T | undefined;
  }

  onFrame(dt: number) {
    for (let behaviour of this.behaviours) {
      behaviour.onFrame(dt);
    }
  }

  onUpdate() {
    for (let behaviour of this.behaviours) {
      if (++behaviour.timer >= behaviour.turns) {
        behaviour.timer = 0;
        if (behaviour.onUpdate()) break;
      }
    }
  }

  onDamage(damage: Damage) {
    for (let behaviour of this.behaviours) {
      behaviour.onDamage(damage);
    }
  }

  onDeath(death: Death) {
    for (let behaviour of this.behaviours) {
      behaviour.onDeath(death);
    }
  }

  onBounce() {
    for (let behaviour of this.behaviours) {
      behaviour.onBounce();
    }

    if (this.despawnOnBounce) {
      game.despawn(this);
    }
  }

  onCollision(target: GameObject) {
    for (let behaviour of this.behaviours) {
      behaviour.onCollision(target);
    }

    if (this.despawnOnCollision) {
      game.despawn(this);
    }
  }
}

export class Behaviour {
  constructor(public object: GameObject) {}
  turns = 1;
  timer = 0;
  sprite: Sprite | undefined;
  onAdded() {}
  onRemoved() {}
  onUpdate(): boolean | void {}
  onBounce() {}
  onDamage(damage: Damage) {}
  onDeath(death: Death) {}
  onFrame(dt: number) {}
  onCollision(target: GameObject) {}
}

export interface Damage {
  amount: number;
  dealer: GameObject | undefined;
}

export interface Death {
  object: GameObject;
  killer?: GameObject;
  souls: number;
}

interface Stage {
  width: number;
  height: number;
  floor: number;
  ceiling: number;
}

export interface Spell {
  targetAngle: number;
  targetRadius: number;
  basePower: number;
  shotsPerRound: number;
  shotOffsetAngle: number;
  maxCasts: number;
  casts: number;
  castRechargeRate: number;
  castRechargeTimer: number;
}

export interface Ability {
  cooldown: number;
  timer: number;
}

export interface Ritual {
  name: string;
  description: string;
  tags: number;
  exclusiveTags?: number;
  requiredTags?: number;
  recursive?: boolean;
  rarity?: Rarity;
  onFrame?(dt: number): void;
  onActive?(): void;
  onCast?(spell: GameObject): void;
  onResurrect?(): void;
  onResurrection?(object: GameObject): void;
  onDeath?(death: Death): void;
  onLevelEnd?(): void;
  onLevelStart?(): void;
  onShopEnter?(): void;
}

export const INTRO = 0;
export const PLAYING = 1;
export const SHOPPING = 2;
export const LOSE = 3;
export const WIN = 4;
export type State = typeof INTRO | typeof PLAYING | typeof SHOPPING | typeof LOSE | typeof WIN;

export interface ShopItem {
  cost: number;
  name: string;
  description: string;
  purchase(): void;
}

export function ShopItem(
  cost: number,
  name: string,
  description: string,
  purchase: () => void,
): ShopItem {
  return { cost, name, description, purchase };
}

export class Game {
  stage: Stage = { width: 400, height: 200, floor: 0, ceiling: 200 };
  objects: GameObject[] = [];
  player: GameObject = undefined!;
  rituals: Ritual[] = [];
  state: State = INTRO;
  souls: number = 0;
  streak: number = 0;
  level: number = 0;
  dialogue: string[] = [];

  spell: Spell = {
    targetAngle: 0,
    targetRadius: 15,
    basePower: 180,
    shotsPerRound: 1,
    shotOffsetAngle: 0.1,
    maxCasts: 3,
    casts: 3,
    castRechargeRate: 1000,
    castRechargeTimer: 0,
  };

  ability: Ability = {
    cooldown: 10_000,
    timer: 10_000,
  };

  constructor(player: GameObject) {
    this.player = player;
    this.spawn(player);
    window.game = this;
  }

  spawn(object: GameObject, x = object.x, y = object.y) {
    object.x = x;
    object.y = y;
    this.objects.push(object);
  }

  despawn(object: GameObject) {
    object.emitter?.remove();

    for (let behaviour of Array.from(object.behaviours)) {
      object.removeBehaviour(behaviour);
    }

    removeFromArray(this.objects, object);
  }

  getStreakMultiplier() {
    return this.streak / MAX_STREAK;
  }

  addSouls(amount: number) {
    this.souls += amount + amount * this.getStreakMultiplier();
  }

  addRitual(ritual: Ritual) {
    this.rituals.push(ritual);
    ritual.onActive?.();
  }

  canAddRitual(ritual: Ritual) {
    if (ritual.exclusiveTags) {
      for (let other of this.rituals) {
        if (ritual.exclusiveTags & other.tags) {
          return false;
        }
      }
    }

    if (ritual.requiredTags) {
      for (let other of this.rituals) {
        if (ritual.requiredTags & other.tags) {
          return true;
        }
      }
      return false;
    }

    return true;
  }

  update(dt: number) {
    this.updateAbility(dt);
    this.updateSpell(dt);
    this.updateObjects(dt);
    this.updatePhysics(dt);
    this.updateRituals(dt);
  }

  private updateAbility(dt: number) {
    game.ability.timer += dt;
    game.player.emitter!.frequency = game.ability.timer >= game.ability.cooldown ? 0.1 : 0;
  }

  private updateSpell(dt: number) {
    if (this.spell.casts < this.spell.maxCasts) {
      this.spell.castRechargeTimer += dt;
      if (this.spell.castRechargeTimer > this.spell.castRechargeRate) {
        this.spell.casts += 1;
        this.spell.castRechargeTimer = 0;
      }
    }
  }

  private updateRituals(dt: number) {
    for (let ritual of this.rituals) {
      ritual.onFrame?.(dt);
    }
  }

  private updateObjects(dt: number) {
    for (let object of this.objects) {
      object.update(dt);
    }
  }

  private updatePhysics(dt: number) {
    let d = dt / 1000;

    // Velocities
    for (let object of this.objects) {
      object.x += object.vx * d;
      object.y += object.vy * d;
    }

    // Bounces
    for (let object of this.objects) {
      let lower = this.stage.floor;
      let upper = this.stage.ceiling - object.sprite[3];

      if (object.y < lower || object.y > upper) {
        object.y = clamp(object.y, lower, upper);

        if (Math.abs(object.vy) >= 10) {
          object.onBounce();
        }

        object.vy *= -object.bounce;
      }

      if (object.y === lower || object.y === upper) {
        object.vx *= (1 - object.friction);
      }

      if (object.mass && object.y > 0) {
        object.vy -= object.mass * d;
      }
    }

    // Collisions
    for (let object of this.objects) {
      for (let target of this.objects) {
        if (object.collisionMask & target.tags) {
          if (overlaps(object.bounds(), target.bounds())) {
            object.onCollision(target);
          }
        }
      }
    }
  }

  onLevelStart() {
    for (let ritual of game.rituals) {
      ritual.onLevelStart?.();
    }
  }

  onLevelEnd() {
    for (let ritual of game.rituals) {
      ritual.onLevelEnd?.();
    }
  }

  onShopEnter() {
    for (let ritual of game.rituals) {
      ritual.onShopEnter?.();
    }
  }

  onCast(spell: GameObject, recursive = false) {
    for (let ritual of game.rituals) {
      if (recursive && ritual.recursive == false) continue;
      ritual.onCast?.(spell);
    }
  }

  getCastingPoint(): Point {
    let { spell, player } = this;
    let center = player.center();
    let [vx, vy] = vectorFromAngle(spell.targetAngle);
    return {
      x: center.x + vx * spell.targetRadius,
      y: center.y + vy * spell.targetRadius,
    };
  }
}
