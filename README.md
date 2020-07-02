# diexercise
デザイン情報総合演習グループF1用リポジトリ

## Usage
### 1. 共通
```bash
$ git clone https://github.com/mzdkzk/diexercise
$ cd diexercise
$ echo NEXT_PUBLIC_API_BASE_URL=<本番サイトのURL>/api > app/.env.local
```

### 2a. nodejsを使う場合
* `/api`以下を開発しない場合mecabが不要なのでnode.js単体でも動く
* [node.js(v14.4以上)](https://nodejs.org/) をインストール
```bash
$ cd app
$ npm install -g yarn 
$ yarn
$ yarn dev
```

### 2b. dockerを使う場合
* Windows10でバージョン2004適用済みならWSL2導入 + Docker Desktopのインストール
* それ以外はVirtualBox + Docker Machineのインストール

```bash
docker-compose build
docker-compose up -d
```
