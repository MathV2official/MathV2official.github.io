class Wall {
  constructor(x, y, w, h, a) {
    var options = {
      friction: 0.5,
      restitution: 0.5,
      angle: a,
      isStatic: true
    }
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
  }
}

class Ball {
  constructor() {
    this.position = createVector(width/2, height/2)
    this.radius = width/32
    const options = {
      restitution: 0.9,
      friction: 0.001,
      density: 0.0001
    }
    this.body = Bodies.circle(
      this.position.x, this.position.y, this.radius/2, options
    )
    World.add(world, this.body)
  }

  didScore() {
    const [x, y] = [this.body.position.x, this.body.position.y]
    const topOfGoalY = height/2 + goalHeight/2
    const bottomOfGoalY = height/2 - goalHeight/2
    const withinGoalRange = y < topOfGoalY && y > bottomOfGoalY
    if (withinGoalRange) {
      return (x <= this.radius/2 || x >= width - this.radius/2)
    }
    return false
  }

  render() {
    this.position.x = this.body.position.x
    this.position.y = this.body.position.y

    push()
    translate(this.body.position.x, this.body.position.y)
    rotate(this.body.angle)
    fill(173,255,47)
    ellipse(0, 0, this.radius)
    fill(54)
    ellipse(0, 0, this.radius/3)
    line(-this.radius/2, 0, this.radius/2, 0)
    pop()
  }
}

class Car {
  constructor(paintColor, startX) {
    const startY = startX < width/2 ? height/4 : 3*height/4
    this.position = createVector(startX, startY)
    this.width = width/36
    this.length = this.width * 2
    this.isAccelerating = false
    this.rotation = 0
    this.color = paintColor
    this.history = [];
    const options = { density: 0.01, friction: 0.2, mass: 50 }
    this.body = Bodies.rectangle(
      this.position.x, this.position.y, this.length, this.width, options
    )
    World.add(world, this.body)
    if (startX > width/2) {
      Body.setAngle(this.body, PI)
    }
  }

  update() {
    if (this.isAccelerating) {
      this.accelerate()
    }
    this.rotate(this.rotation)
    this.history.push([this.body.position.x, this.body.position.y]);
    if (this.history.length > exaustClouds) {
      this.history.splice(0, 1);
    }
    this.position.x = this.body.position.x
    this.position.y = this.body.position.y
  }

  accelerating(isAccelerating) {
    this.isAccelerating = isAccelerating
  }

  accelerate() {
    var force = p5.Vector.fromAngle(this.body.angle)
    force.mult(0.02);
    Body.applyForce(this.body, this.body.position, force)
  }

  rotate(rotation) {
    this.rotation = rotation
    Body.setAngularVelocity(this.body, rotation)
  }

  pointTowardsBall() {
    const desired = p5.Vector.sub(ball.position, this.position)
    const angle = desired.heading()
    Body.setAngle(this.body, angle);
  }

  render() {
    var angle = this.body.angle;
    push()
    rectMode(CENTER)
    translate(this.body.position.x, this.body.position.y)
    rotate(angle);
    // tires
    fill(54)
    ellipse(this.length/3, -this.width/2, this.width/4, this.width/8)
    ellipse(this.length/3, this.width/2, this.width/4, this.width/8)
    ellipse(-this.length/3, -this.width/2, this.width/4, this.width/8)
    ellipse(-this.length/3, this.width/2, this.width/4, this.width/8)
    // car body
    fill(this.color)
    rect(0, 0, this.length, this.width, 5);
    fill(54);
    rect(-this.length/24, 0, 0.7 * this.length, 0.8 * this.width, 5);
    fill(this.color);
    rect(-this.length/12, 0, 0.45 * this.length, 0.6 * this.width, 5);
    // headlights
    fill(255, 255, 200)
    ellipse(this.length/2, -this.width/3, this.width/8, this.width/4);
    ellipse(this.length/2, this.width/3, this.width/8, this.width/4);
    pop()
    push()
    noStroke();
    const carWidth = this.width;
    this.history.forEach(function(h, i) {
      const [ x, y ] = h
      push()
      translate(x, y)
      rotate(angle);
      fill(54, i);
      ellipse(-carWidth, 0, exaustClouds - i + random(-10, 10), exaustClouds - i + random(-3, 3));
      pop()
    })
    pop()
  }
}

class Spark {
  constructor(x, y, xVel) {
    this.pos = createVector(x, y);
    this.lifespan = 255;

    this.vel = createVector(random(0, xVel), random(-xVel, xVel));
    // we just want the direction
    this.vel.normalize();
    // then add random speed
    this.vel.mult(random(0, 20));
    this.fill = [random(255), random(255), random(255)]
  }

  update() {
    this.vel.mult(0.95);
    this.lifespan -= 5;
    this.pos.add(this.vel);
  }

  done() {
    return this.lifespan < 0;
  }

  render() {
    if (!this.done()) {
      noStroke();
      fill(this.fill, this.lifespan);
      rect(this.pos.x, this.pos.y, this.lifespan/20, this.lifespan/20, 3);
    }
  }
}

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

const exaustClouds = 25;
let car;
let computerCar;
let ball;

// for goal explosion effect
let sparks = [];

let goalHeight;
let goalWaitPeriod = false;

let playerScore = 0;
let computerScore = 0;

function setup() {
  const h = min(window.innerHeight, window.innerWidth * 0.61);
  // keep field dimensions nice
  const w = min(window.innerWidth, h * 1.64);
  
  createCanvas(w, h)

  goalHeight = width/6

  engine = Engine.create();
  world = engine.world;

  // disable matter.js gravity
  engine.world.gravity.y = 0;

  addWalls()

  const redHexVals = [255, 100, 100]
  const playerStartX = width/4;
  car = new Car(redHexVals, playerStartX)
  const blueHexVals = [100, 100, 255]
  const computerStartX = 3*width/4;
  computerCar = new Car(blueHexVals, computerStartX)

  ball = new Ball()
}

function keyReleased() {
  if (keyCode == UP_ARROW) {
    car.accelerating(false)
  } else if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
    car.rotate(0)
  }
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    car.rotate(PI/72)
  } else if (keyCode == LEFT_ARROW) {
    car.rotate(-PI/72)
  } else if (keyCode == UP_ARROW) {
    car.accelerating(true)
  }
}

function draw() {
  if (goalWaitPeriod) {
    // Screen Shakes On Goal (User feedback)
    translate(random(-13, 13), random(-13, 13));
  }

  drawSoccerField()

  Engine.update(engine)

  car.render()
  car.update()

  computerCar.render()
  computerCar.update()

  computerCar.accelerating(true)
  computerCar.pointTowardsBall()


  ball.render()
  if (ball.didScore()) {
    const [x, y] = [ball.body.position.x, ball.body.position.y]
    x < width/2 ? computerScore++ : playerScore++;
    shootSparks(x, y);
    Body.setPosition(ball.body, { x: width/2, y: height/2 });
    Body.setVelocity(ball.body, { x: 0, y: 0 })
    goalWaitPeriod = true
    setTimeout(function() {
      goalWaitPeriod = false
    }, 1000);
  }

  textSize(18);
  noStroke();
  fill(255, 100, 100);
  text("player", width/2 - 100, height/16);
  fill(100, 100, 255);
  text("computer", width/2 + 50, height/16)
  fill(4);
  textSize(48);
  text(playerScore, width/2 - 88, height/6);
  text(computerScore, width/2 + 78, height/6);

  if (goalWaitPeriod) {
    fill(random(255), random(255), random(255));
    textSize(64);
    text("GOOOOOOAL", width/2 - 200, height/2)
  }

  // update, show, and delete sparks for goals
  goSparksGo()

}

function shootSparks(x, y) {
    // shoot sparks in opposite direction (towards middle)
    const xVel = x < width/2 ? 10 : -10;
    const xPos = x < width/2 ? 0 : width;
    for (var i = 0; i < 50; i++) {
      var s = new Spark(xPos, y, xVel);
      sparks.push(s);
   }
}

function goSparksGo() {
  // go backwards through array in case we splice (will break if forwards)
  for (var i = sparks.length - 1; i >= 0; i--) {
      sparks[i].update();
      sparks[i].render();
      if (sparks[i].done()) {
        sparks.splice(i, 1);
      }
  }
}

function drawSoccerField() {
  background(254)
  noFill()
  stroke(55)
  strokeWeight(1)

  // center field line
  line(width/2, 0, width/2, height)
  ellipse(width/2, height/2, width/6)

  // left goalie box
  rect(0, height/2 - width/6, width/6, width/3)
  stroke(255, 100, 100);
  rect(0, height/2 - width/12, width/18, goalHeight)
  strokeWeight(10);
  line(0, height/2 - width/12, 0, height/2 - width/12 + goalHeight)
  // right goalie box
  strokeWeight(1);
  stroke(0);
  rect(width - width/6, height/2 - width/6, width/6, width/3)
  stroke(100, 100, 255);
  rect(width - width/18, height/2 - width/12, width/18, goalHeight);
  strokeWeight(10);
  line(width, height/2 - width/12, width, height/2 - width/12 + goalHeight);
  strokeWeight(1);
  stroke(0);
}

function addWalls() {
  const wallThickness = 500;
  const wt2 = wallThickness/2;

  bottomWall = new Wall(width/2, height + wt2, width, wallThickness, 0)
  topWall = new Wall(width/2, -wt2, width, wallThickness, 0)

  leftWall = new Wall(-wt2, height/2, height, wallThickness, PI/2)
  rightWall = new Wall(width + wt2, height/2, height, wallThickness, PI/2)
}
