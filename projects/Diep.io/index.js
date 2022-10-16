/**
 * @file Open-source Diep.io Clone
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

var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var calc = require("./calc.js");
var physics = require("./physics.js");

process.stdin.resume();
process.stdin.setEncoding('utf8');

console.info(`Diep-Clone  Copyright (C) 2017  Nebula
This program comes with ABSOLUTELY NO WARRANTY; for details type 'show w'.
This is free software, and you are welcome to redistribute it
under certain conditions; type 'show c' for details.`);

var config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

function handler (req, res) {
  if(req.url == '/'){
    fs.readFile(__dirname + '/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
    });
  }
  if(req.url.indexOf('.css') != -1){
    fs.readFile(__dirname + '/index.css',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.css');
      }
      res.writeHead(200);
      res.end(data);
    });
  }
}

app.listen(config.port);

io.on('connection', (socket) => {
  console.log("New connection");
  socket.on('heartbeat', (data) => {
    socket.emit('heartbeat', data);
  });
});

process.stdin.on('data', function(data){
  if (data.replace(/\r?\n|\r/g, '') === "show w"){
    console.info(`This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.`);
  }else if (data.replace(/\r?\n|\r/g, '') === "show c"){
    console.info(`This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.`);
  }
});
