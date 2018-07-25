# drumroll

[![npm](https://badgen.net/npm/dt/play-drumroll)](https://www.npmjs.com/package/play-drumroll)
![CircleCI branch](https://badgen.net/circleci/github/bibixx/drumroll/master)
[![david-dm.org](https://badgen.net/david/dep/bibixx/drumroll)](https://david-dm.org/bibixx/drumroll)

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
