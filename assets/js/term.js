$(window).on('load', function() {
  "use strict";

  /*=========================================================================
      Theme Toggling
  =========================================================================*/
  window.toggleThemes = function(change = true) {
    var $theme = localStorage.getItem('theme') || 'light';
    var $alttheme = ($theme === 'light') ? ('white') : ('dark');
    var $newtheme = ($theme === 'light') ? ('dark') : ('light');
    var $altnewtheme = ($theme === 'light') ? ('dark') : ('white');
    if (!change) {
      $newtheme = $theme;
      $altnewtheme = $alttheme;
      $theme = 'light';
      $alttheme = 'white';
    }
    var $elt = $('.' + $theme);
    var $bgelt = $('.bg-' + $alttheme);
    var $shadowelt = $('.shadow-' + (($theme === 'light') ? ('dark') : ('light')));
    $elt.toggleClass($newtheme);
    $elt.toggleClass($theme);
    $bgelt.toggleClass('bg-' + $altnewtheme);
    $bgelt.toggleClass('bg-' + $alttheme);
    $shadowelt.toggleClass('shadow-' + (($newtheme === 'light') ? ('dark') : ('light')));
    $shadowelt.toggleClass('shadow-' + (($theme === 'light') ? ('dark') : ('light')));
    localStorage.setItem('theme', $newtheme);
  }
  window.toggleThemes(false);

  /*=========================================================================
      Preloader
  =========================================================================*/
  $("#preloader").delay(350).fadeOut('slow');
  // Because only Chrome supports offset-path, feGaussianBlur for now
  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

  if (!isChrome) {
    document.getElementsByClassName('infinityChrome')[0].style.display = "none";
    document.getElementsByClassName('infinity')[0].style.display = "block";
  }

  /*=========================================================================
   Spacer with Data Attribute
   =========================================================================*/
  var list = document.getElementsByClassName('spacer');

  for (var i = 0; i < list.length; i++) {
    var size = list[i].getAttribute('data-height');
    list[i].style.height = "" + size + "px";
  }

  /*=========================================================================
   Background Color with Data Attribute
   =========================================================================*/
  var list = document.getElementsByClassName('data-background');

  for (var i = 0; i < list.length; i++) {
    var color = list[i].getAttribute('data-color');
    list[i].style.backgroundColor = "" + color + "";
  }
});

var config = {
  "title": "Yahia Hachemi",
  "prompt": "yh_007@kali:/ $ ",
  "commands": [
    {
      "name": "about",
      "syntax": "about [intro|life|languages]",
      "description": "learn more about me",
      "exec": "about",
      "data": {
        "intro": "Hi! I am Yahia, or you may know me as The Boaring Guy, I am 20 years old. I am a passionate front-end chill programmer who loves to code for fun. Also I make discord bots. :P \nIf you want to find out more about me, try `help about`.\n",
        "life": "I was born in October in Algeria. I spend my most of time on Discord.\n",
        "languages": "English,Arabic,Frensh"
      }
    },
    {
      "name": "clear",
      "syntax": "clear",
      "description": "clear terminal history",
      "exec": "clear",
      "data": null
    },
    {
      "name": "backpack",
      "syntex": "backpack",
      "description": "programing languages and tools in my backpack",
      "exec": "backpack",
      "data": {
        "skills": "Skills and Tools:\n * Front-end: HTML, Javascript, CSS, ReactJS\n * Back-end: NodeJS, Express, Firebase\n * Tools: Docker \n  * IDE: Git, GitHub, VS Code"
      }
    },
    {
      "name": "contact",
      "syntax": "contact [discord|email]",
      "description": "display my contact information",
      "exec": "contact",
      "data": {
        "discord": ["https://discord.com/users/", "yh_007#9961"],
        "email": ["", "jy_hachemi@esi.dz"]
      }
    },
    {
      "name": "dark",
      "syntax": "dark on|off",
      "description": "turn on or off dark mode",
      "exec": "dark",
      "data": null
    },
    {
      "name": "help",
      "syntax": "help [command]",
      "description": "show list of available commands",
      "exec": "help",
      "data": null
    },
    {
      "name": "social",
      "syntax": "social [github|linkedin|youtube|server]",
      "description": "display my social links",
      "exec": "social",
      "data": {
        "github": "https://github.com/yh-007",
        "dev": "https://www.linkedin.com/in/yahia-hachemi/",
        "youtube": "",//https://youtube.com/DevLackey",
        "discord": ""//https://discord.gg/Bcxbqjp9uA"
      }
    },
   /* {
      "name": "sites",
      "syntax": "sites [deejay|tts|stereo]",
      "description": "allows access via url to all of my sites.",
      "exec": "sites",
      "data": {
        "deejay": ["https://deejaybot.tk", "Deejay Bot"],
        "stereo": ["https://stereo.deejaybot.tk", "Deejay Stereo"],
        "tts": ["https://ttsbot.tk", "TTS Bot"]
      }
    },*/
    {
      "name": "projects",
      "syntax": "projects [deejay|tts|stereo]",
      "description": "get a list of my current projects",
      "exec": "projects",
      "data": {
        "list": "\n * <a href='https: //discord.ly/deejay'>Deejay Bot</a>\n * <a href='https: //discord.ly/tts'>TTS Bot</a>\n * Deejay Stereo",
        "deejay": "\n  * A multifunctional music bot. React based control. Wide range of commands. SoundCloud, YouTube, Spotify& 700+ more site Supported. Bassboost, nightcore and more Music Filters.\n<a href='https: //github.com/deejay-bot'>Find more</a>",
        "tts": "\n  * Text to speech bot. Various languages supported. Customisable behaviour.\n<a href='https: //github.com/bot-tts'>Find more</a>",
        "stereo": "\n  * The easiest music bot. Reaction Controlled. YouTube, SoundCloud, Spotify Links Supported. Bassboost, Nightcore & many audio filters\n<a href='https: //github.com/deejay-stereo'>Find more</a>",
        "unknown": "\n  * unknown \nmore details coming soon.....This Is A BIG PROJECT. \nCopyright 2021 L0SER#8228. All rights reserved. \nA <a href='https: //github.com/NovaTechOrg'>NovaTechOrg</a> Project."
      }
    }
  ]
}

var hist = $('#history');
var command = $('#command');
var prompt = $('#prompt');
var cmdInpt = $('#cmd-input');
var cmdHist = [];
var currPos = 0;
var key = {};
var theme = localStorage.getItem('theme') || 'light';

function appendToHist(str) {
  hist.append(`<pre class='${theme}'>${str}\n</pre>`)
}
appendToHist(`Hi I'm, \n${config.title}\nType 'help' and hit ENTER for more information.`);
prompt.html(`${config.prompt} `);
cmdInpt.focus();

cmdInpt.on('keypress', function(e) {
  if (e.which == 13) {
    handleCommand();
  }
})

function test_key(selkey) {
  var alias = {
    "ctrl": 17,
    "shift": 16,
    "up": 38,
    "down": 40,
    "a": 65,
    "c": 67,
    "d": 68,
    "e": 69,
    "l": 76
  };

  return key[selkey] || key[alias[selkey]];
}

function test_keys() {
  var keylist = arguments;
  for (var i = 0; i < keylist.length - 1; i++) {
    if (!test_key(keylist[i])) {
      return false;
    }
  }
  keylist[keylist.length - 1].preventDefault();
  return true;
}

cmdInpt.on('keydown', function(e) {

  key[e.keyCode] = true;
  cmdInpt.focus();
  if (test_keys('ctrl', 'a', e)) {
    moveToBeginning();
  } else if (test_keys('ctrl', 'c', e)) {
    breakCmd();
  } else if (test_keys('ctrl', 'd', e)) {
    window.location = '/';
  } else if (test_keys('ctrl', 'e', e)) {
    moveToEnd();
  } else if (test_keys('ctrl', 'l', e)) {
    clear();
  } else if (test_keys('up', e)) {
    prevHist();
  } else if (test_keys('down', e)) {
    nextHist();
  }
})
cmdInpt.on('keyup', function(e) {
  key[e.keyCode] = false;
  if (test_keys('ctrl', 'a', e) ||
    test_keys('ctrl', 'c', e) ||
    test_keys('ctrl', 'd', e) ||
    test_keys('ctrl', 'e', e) ||
    test_keys('ctrl', 'l', e) ||
    test_keys('up', e) ||
    test_keys('down', e)) {
    e.preventDefault();
  }
})

function prevHist() {
  if (currPos > 0) {
    currPos -= 1;
    cmdInpt.val(cmdHist[currPos]);
  }
}

function nextHist() {
  if (currPos < cmdHist.length) {
    currPos += 1;
    cmdInpt.val(cmdHist[currPos]);
  } else {
    cmdInpt.val('');
  }
}

function moveToBeginning() {
  if (cmdInpt[0].createTextRange) {
    var part = cmdInpt[0].createTextRange();
    part.move("character", 0);
    part.select();
  } else if (cmdInpt[0].setSelectionRange) {
    cmdInpt[0].setSelectionRange(0, 0);
  }
}

function moveToEnd() {
  var cmd = cmdInpt.val();
  cmdInpt.val('');
  cmdInpt.val(cmd);
}

function breakCmd() {
  if (cmdInpt.val()) {
    appendToHist(`${config.prompt} ${cmdInpt.val()}^C`);
    cmdInpt.val('');
  }
}

function handleCommand() {
  if (cmdInpt.val()) {
    appendToHist(`${config.prompt} ${cmdInpt.val()}`);
    cmdHist.push(cmdInpt.val());
    currPos = cmdHist.length;
    var args = cmdInpt.val().replace(/[^a-z0-9\s]/gi, '').toLowerCase().split(' ');
    var cmd = _getCmdByName(args[0]);
    if (cmd) {
      window[cmd.exec](args, cmd.data);
    } else {
      unknown(args);
    }
  }
  cmdInpt.val('');
  cmdInpt.focus();
  $('#bottom')[0].scrollIntoView({ block: "end", behavior: "smooth" });
}

function _getCmdByName(name) {
  for (let cmd of config.commands) {
    if (name == cmd.name) {
      return cmd;
    }
  }
  return;
}

function about(args, data) {
  var outStr = '';
  if (args.length <= 1) {
    outStr += data['l0ser'];
  } else {
    var cmdStr = args.splice(1).join(" ");
    if (data.hasOwnProperty(cmdStr)) {
      outStr += data[cmdStr]
    } else {
      outStr += `UNKNOWN ARGUMENT: ${cmdStr}\n`
    }
  }
  appendToHist(outStr);
}

function clear(_args, _data) {
  hist.html('');
}

function backpack(args, data) {
  var outStr = '';
  outStr += data['skills'];
  appendToHist(outStr);
}

function contact(args, data) {
  var outStr = '';
  if (args.length <= 1) {
    outStr += 'You can reach me at:\n'
    for (let way of Object.values(data)) {
      outStr += ` * <a href="${way[0]}">${way[1]}</a>\n`;
    }
  } else {
    var cmdStr = args.splice(1).join(" ");
    if (data.hasOwnProperty(cmdStr)) {
      outStr += `You can reach me at: <a href="${data[cmdStr][0]}">${data[cmdStr][1]}</a>\n`;
    } else {
      outStr += `UNKNOWN ARGUMENT: ${cmdStr}\n`
    }
  }
  appendToHist(outStr);
}

function dark(args, _data) {
  var outStr = '';
  if (args.length <= 1) {
    outStr += `EXPECTED ARGUMENT: on|off\n`
  } else {
    var cmdStr = args.splice(1).join(" ");
    if (cmdStr == 'on') {
      if (theme != 'dark') {
        window.toggleThemes();
        outStr += 'Dark Mode now: ON'
      } else {
        outStr += 'Dark Mode already ON'
      }
    } else if (cmdStr == 'off') {
      if (theme != 'light') {
        window.toggleThemes();
        outStr += 'Dark Mode now: OFF'
      } else {
        outStr += 'Dark Mode already OFF'
      }
    } else {
      outStr += `UNKNOWN ARGUMENT: ${cmdStr}\n`
    }
    theme = localStorage.getItem('theme') || 'light'
  }
  appendToHist(outStr);
}

function help(args, _data) {
  var outStr = '';
  if (args.length <= 1) {
    // outStr += 'L0SER\'s Profolio Terminal HELP\n========================\n';
    for (let cmd of config.commands) {
      outStr += cmd.name + '\t' + cmd.description + '\n\n';
    }
    outStr += 'To find more about a certain command, enter `help [command]`\n';
  } else {
    var cmdStr = args.splice(1).join(" ");
    // outStr += `COMMAND ${cmdStr} HELP\n========================\n`;
    var cmd = _getCmdByName(cmdStr);
    if (cmd) {
      outStr += `USAGE: ${cmd.syntax}\n`;
    } else {
      outStr += `UNKNOWN ARGUMENT: ${cmdStr}\n`;
    }
  }
  appendToHist(outStr);
}

function social(args, data) {
  var outStr = '';
  if (args.length <= 1) {
    outStr += 'You can find me at:\n'
    for (medium in data) {
      if (data.hasOwnProperty(medium)) {
        outStr += ` * <a href="${data[medium]}">${medium}</a>\n`;
      }
    }
  } else {
    var cmdStr = args.splice(1).join(" ");
    if (data.hasOwnProperty(cmdStr)) {
      outStr += `You can find me on ${cmdStr} <a href="${data[cmdStr]}">here</a>\n`;
    } else {
      outStr += `UNKNOWN ARGUMENT: ${cmdStr}\n`
    }
  }
  appendToHist(outStr);
}

function sites(args, data) {
  var outStr = '';
  if (args.length <= 1) {
    outStr += 'You can view my site(s):\n'
    for (let way of Object.values(data)) {
      outStr += ` * <a href="${way[0]}">${way[1]}</a>\n`;
    }
  } else {
    var cmdStr = args.splice(1).join(" ");
    if (data.hasOwnProperty(cmdStr)) {
      outStr += `You can view my site(s): <a href="${data[cmdStr][0]}">${data[cmdStr][1]}</a>\n`;
    } else {
      outStr += `UNKNOWN ARGUMENT: ${cmdStr}\n`
    }
  }
  appendToHist(outStr);
}

function projects(args, data) {
  var outStr = '';
  if (args.length <= 1) {
    outStr += data['list'];
  } else {
    var cmdStr = args.splice(1).join(" ");
    if (data.hasOwnProperty(cmdStr)) {
      outStr += data[cmdStr]
    } else {
      outStr += `UNKNOWN ARGUMENT: ${cmdStr}\n`
    }
  }
  appendToHist(outStr);
}

function unknown(args, _data) {
  appendToHist(`UNKNOWN COMMAND: ${args.join(' ')}`);
}