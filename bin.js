#!/usr/bin/env node

var path = require('path')
var childProcess = require('child_process')

var FILENAME = path.join(__dirname, 'theme.mp3')
var FILENAME2 = path.join(__dirname, 'wah.mp3')
var FILENAME3 = path.join(__dirname, 'success.mp3')

var bin = 'play'
var args = [FILENAME]
var args2 = [FILENAME2]
var args3 = [FILENAME3]

if (process.platform == 'darwin') bin = 'afplay'

if (has('mplayer')) {
  bin = 'mplayer'
  args = ['-really-quiet', FILENAME]
  args2 = ['-really-quiet', FILENAME2]
}

var proc
var proc2
var proc3
var respawn = true

play()

function play () {
  if (!respawn) return

  proc = childProcess.spawn(bin, args)
  proc.stdout.resume()
  proc.stderr.resume()
  proc.unref()

  proc.on('exit', function (code) {
    respawn = false
    proc.kill()
  })

  if (process.argv[2]) {
    proc.stdout.unref()
    proc.stderr.unref()
    proc.stdin.unref()
  }
}

function play2 () {
  if (!respawn) return

  proc2 = childProcess.spawn(bin, args2)
  proc2.stdout.resume()
  proc2.stderr.resume()
  proc2.unref()

  proc2.on('exit', function (code) {
    respawn = false
    proc2.kill()
  })

  if (process.argv[2]) {
    proc2.stdout.unref()
    proc2.stderr.unref()
    proc2.stdin.unref()
  }
}

function play3 () {
  if (!respawn) return

  proc3 = childProcess.spawn(bin, args3)
  proc3.stdout.resume()
  proc3.stderr.resume()
  proc3.unref()

  proc3.on('exit', function () {
    respawn = false
    proc3.kill()
  })

  if (process.argv[2]) {
    proc3.stdout.unref()
    proc3.stderr.unref()
    proc3.stdin.unref()
  }
}

function has (cmd) {
  try {
    childProcess.execSync('which ' + cmd + ' 2>/dev/null 2>/dev/null')
    return true
  } catch (err) {
    return false
  }
}

if (process.argv[2]) {
  childProcess.spawn(process.argv[2], process.argv.slice(3), {
    stdio: 'inherit'
  }).on('exit', (code) => {
    if (code !== 0) {
      play2()
    } else {
      play3()
    }
  })
}

process.on('exit', function () {
  respawn = false
  proc.kill()
})