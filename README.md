# drumroll

[![npm](https://img.shields.io/npm/dt/play-drumroll.svg)](https://www.npmjs.com/package/play-drumroll)
![CircleCI branch](https://img.shields.io/circleci/project/github/bibixx/drumroll/master.svg)

Play drumroll while running another command

Original package and inspiration by [@mafintosh's](https://github.com/mafintosh/) [benny-hill](https://github.com/mafintosh/benny-hill)

## Usage

```bash
npm install -g play-drumroll

drumroll # just play benny hill
drumroll sleep 10 # play for 10 s
drumroll make # when compiling
drumroll npm install -g dat # installing node modules
```

## Linux users

Make sure to install the following dependencies first if you are on linux

```bash
sudo apt-get install sox libsox-fmt-mp3
```

Alternatively you can install mplayer and it'll just use that

## License

MIT
