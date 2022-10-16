/**
 * @file Provides useful physics calculations for games.
 * @author Nebula
 * @copyright Diep-Clone  Copyright (C) 2017  Nebula
 */

/**
 * @license
 *
 * Please read LICENSE.txt for the full license.
 *
 * Diep-Clone: An Open-Source Clone of Diep.io
 * Copyright (C) 2017  Nebula
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

 /**
  * @module Physics
  */

var calc = require("./calc.js");

/**
 * @class
 * @classdesc This class allows physics algorithms to be performed on objects.
 * @requires Calc
 * @namespace
 * @function
 * @param {Object} [config={}] The initial config of the object.
 * @param {Number} [config.posX=0] The initial X position.
 * @param {Number} [config.posY=0] The initial Y position.
 * @param {Number} [config.velX=0] The initial X velocity.
 * @param {Number} [config.velY=0] The initial Y velocity.
 * @param {Number} [config.accelX=0] The initial X acceleration.
 * @param {Number} [config.accelY=0] The initial Y acceleration.
 * @param {Number} [config.velLimit=Infinity] The initial maximum velocity.
 * @param {Number} [config.accelLimit=Infinity] The initial maximum acceleration.
 * @param {Number} [config.friction=Infinity] The initial friction.
 * @param {Number} [config.velZero=0.01] The magnitude below which the velocity's magnitude is considered zero.
 * @param {Number} [config.mass=1] The mass of the object.
 * @param {Number} [config.collisionGroup=NaN] The collision group of the object.
 * @property {Object} Physics - The Physics object.
 * @property {Number} Physics.posX - This object's X position.
 * @property {Number} Physics.posY - This object's Y position.
 * @property {Number} Physics.velX - This object's X velocity.
 * @property {Number} Physics.velY - This object's Y velocity.
 * @property {Number} Physics.accelX - This object's X acceleration.
 * @property {Number} Physics.accelY - This object's Y acceleration.
 * @property {Number} Physics.velLimit - This object's maximum velocity.
 * @property {Number} Physics.accelLimit - This object's maximum acceleration.
 * @property {Number} Physics.friction - The friction for this object (applies a force, decelerating the object). Between 0 and 1, with 0 being no friction.
 * @property {Number} Physics.velZero - The magnitude below which the this object's velocity's magnitude is considered zero.
 * @property {Number} Physics.mass - The mass of this object.
 * @property {Number} Physics.collisionGroup - The collision group of this object. Objects with the same numerical collision group will not collide.
 * @property {Number} Physics.time - The saved value for the time multiplier.
 * @returns {Object} The Physics object.
 */
var Physics = function (config){
  this.posX = parseFloat(config.posX) || 0;
  this.posY = parseFloat(config.posY) || 0;
  this.velX = parseFloat(config.velX) || 0;
  this.velY = parseFloat(config.velY) || 0;
  this.accelX = parseFloat(config.accelX) || 0;
  this.accelY = parseFloat(config.accelY) || 0;
  this.velLimit = parseFloat(config.velLimit) || Infinity;
  this.accelLimit = parseFloat(config.accelLimit) || Infinity;
  this.friction = calc.constrain(parseFloat(config.friction), 0, 1) || 0.5;
  this.velZero = parseFloat(config.velZero) || 0.01;
  this.mass = parseFloat(config.mass) || 1;
  this.collisionGroup = parseFloat(config.collisionGroup) || NaN;

  this.time = 0;
};

/**
 * Update every physics algorithm on this object for one time interval.
 *
 * @function update
 * @param {Number} [time=1] The ratio of the time since the last update to the desired time per cycle. Prevents inconsistent cycle speeds from glitching the game.
 * @returns {Object} Returns an object with properties `posX` and `posY`, the coordinates of the updated object.
 */
Physics.prototype.update = function (time){
  this.time = time || 1;
  this.accelX = calc.constrain(this.accelX, -this.accelLimit, this.accelLimit);
  this.accelY = calc.constrain(this.accelY, -this.accelLimit, this.accelLimit);
  this.velX = calc.constrain((this.velX + this.accelX) * this.time, -this.velLimit * this.time, this.velLimit * this.time);
  this.velY = calc.constrain((this.velY + this.accelY) * this.time, -this.velLimit * this.time, this.velLimit * this.time);
  if (this.velX < this.velZero){
    this.velX = 0;
  }
  if (this.velY < this.velZero){
    this.velY = 0;
  }
  var speed = calc.dist(this.velX, 0, this.velY, 0);
  if (speed > this.velLimit){
    this.velX *= this.velLimit / speed;
    this.velY *= this.velLimit / speed;
  }
  this.posX += this.velX;
  this.posY += this.velY;
  return {posX: this.posX, posY: this.posY};
};

/**
 * Calculates the new acceleration given an acceleration and an angle.
 *
 * @function applyForce
 * @param {Number} acceleration The amount of acceleration to apply.
 * @param {Number} angle The direction of the force, given as an angle (in radians).
 * @returns {Object} Returns an object with properties `accelX` and `accelY`, the new acceleration of the object.
 */
Physics.prototype.accelerate = function (acceleration, angle){
  acceleration = constrain(force, -this.accelLimit, this.accelLimit);
  this.accelX = Math.cos(angle) * acceleration;
  this.accelY = Math.sin(angle) * acceleration;
  return {accelX: this.accelX, accelY: this.accelY};
};

/**
 * Calculates the new velocities of 2 circles, if they collide. You should implement a system to test each pair of objects exactly once for optimal performance.
 *
 * @function calcCirclesCollision
 * @param {Physics} other The Physics object for the other circle.
 * @param {Number} radius1 The radius of the this circle.
 * @param {Number} radius2 The radius of the other circle.
 * @returns {Boolean} Whether the 2 circles actually collided.
 */
Physics.prototype.calcCirclesCollision = function (other, radius1, radius2){
  if (this.collisionGroup !== other.collisionGroup && !isNaN(this.collisionGroup) && Math.pow(this.posX - other.posX, 2) + Math.pow(this.posY - other.posY, 2) <= Math.pow(radius1 + radius2, 2)){
    var dX = Math.abs(this.posX - other.posX);
    var dY = Math.abs(this.posY - other.posY);
    return true;
  }else{
    return false;
  }
};

/**
 * Updates some variables after all calculations for a cycle is done to prepare for the next cycle. This function **MUST** be called every time a cycle is completed in order for Physics to work properly.
 *
 * @function endCycle
 */
Physics.prototype.endCycle = function (){
  this.velX *= 1 - (this.friction * this.time);
  this.velY *= 1 - (this.friction * this.time);
  this.accelX = 0;
  this.accelY = 0;
};

exports.Physics = Physics;
