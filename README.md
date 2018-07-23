# drumroll

[![npm](https://img.shields.io/npm/dt/play-drumroll.svg)](https://www.npmjs.com/package/play-drumroll)
![CircleCI branch](https://img.shields.io/circleci/project/github/bibixx/drumroll/master.svg)
[![david-dm.org](https://david-dm.org/bibixx/react-adobe-animate/status.svg)](https://david-dm.org/bibixx/react-adobe-animate)

Play drumroll while running another command

Original package and inspiration by [@mafintosh's](https://github.com/mafintosh/) [benny-hill](https://github.com/mafintosh/benny-hill)

## Usage

```bash
npm install -g play-drumroll

drumroll npm test # when testing
drumroll # just play drum roll
drumroll sleep 10 # play for 10 s
drumroll npm install -g http-server # installing node modules
```

## Linux users

Make sure to install the following dependencies first if you are on Linux.

```bash
sudo apt-get install sox libsox-fmt-mp3
```

Alternatively you can install mplayer and it'll just use that.

## License

MIT
