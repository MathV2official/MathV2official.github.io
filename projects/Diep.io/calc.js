/**
 * @file Provides useful functions for math calculations for games.
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
  * @module Calc
  */

/**
 * Calculates the distance between 2 coordinates.
 *
 * @function
 * @param {Number} x1 The first coordinate's x-value.
 * @param {Number} y1 The first coordinate's y-value.
 * @param {Number} x2 The second coordinate's x-value.
 * @param {Number} y2 The second coordinate's y-value.
 * @returns {Number} The distance between the 2 coordinates.
 */
exports.dist = function (x1, y1, x2, y2){
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

/**
 * Constrains a number to be between 2 values.
 *
 * @function
 * @param {Number} num The number to constrain.
 * @param {Number} min The minimum value of the number.
 * @param {Number} max The maximum value of the number.
 * @returns {Number} The constrained value.
 */
exports.constrain = function (num, min, max){
  return Math.min(Math.max(num, min), max);
};

/**
 * Scales a number proportionally from an input range to a desired range, constraining the input to the input range.
 *
 * @function
 * @param {Number} num The number to scale.
 * @param {Number} fromMin The lower limit and lower constraint of the input.
 * @param {Number} fromMax The upper limit and upper constraint of the input.
 * @param {Number} toMin The lower limit of the output.
 * @param {Number} toMax The upper limit of the output.
 * @returns {Number} The scaled value.
 */
exports.scale = function (num, fromMin, fromMax, toMin, toMax){
  num = constrain(num, fromMin, fromMax);
  return (num - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
};

/**
 * Converts radians to degrees.
 *
 * @function
 * @param {Number} radians The angle, in radians, to convert to degrees.
 * @returns {Number} The angle converted to degrees.
 */
exports.radToDeg = function (radians){
  return radians * 180 / Math.PI;
};

/**
 * Converts degrees to radians.
 *
 * @function
 * @param {Number} degrees The angle, in degrees, to convert to radians.
 * @returns {Number} The angle converted to radians.
 */
exports.degToRad = function (degrees){
  return degrees * Math.PI / 180;
};

/**
 * Calculates the area of a circle.
 *
 * @function
 * @param {Number} radius The radius of the circle.
 * @returns {Number} The area of the circle.
 */
exports.circleArea = function (radius){
  return Math.pow(radius, 2) * Math.PI;
};

/**
 * Returns a random float in a given range.
 *
 * @function
 * @param {Number} min The minimum value of the random float.
 * @param {Number} max The maximum value of the random float.
 * @returns {Number} The random float.
 */
exports.randFloat = function (min, max) {
  return Math.random() * (max - min) + min;
};

/**
 * Returns a random integer in a given range.
 *
 * @function
 * @param {Number} min The minimum value of the random integer.
 * @param {Number} max The maximum value of the random integer.
 * @returns {Number} The random integer.
 */
exports.randInt = function (min, max) {
  min = Math.ceil(min);
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
};
