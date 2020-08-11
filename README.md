# Live※Reference

* Web: https://live-reference-wcvgewglma-an.a.run.app
* Repo: https://github.com/mzdkzk/diexercise

## 概要
講義や会議において、発言者の発言をリアルタイムで字幕におこし（左画面）
さらに形態素解析によって、単語（名詞）をクリックすることでその単語ごとの意味の概要を確認することができる、コミュニケーション・情報伝達の補助アプリです。

## 使い方
1. Webにアクセス
2. ユーザー名を入力してルームを作成
3. 左下のメニューボタンからルームへの招待リンクを取得し、参加者に配布
4. 参加者は招待リンクから名前を入力してルームに入室
5. 左下のマイクボタンをクリックして音声認識を開始

## 動作条件
最新のデスクトップ版Google Chromeでのみ動作を確認しています

## 開発
開発には [Docker](https://www.docker.com) または [Node.js](https://nodejs.org) が必要です

### Docker
```bash
$ docker-compose build
$ docker-compose up -d
```

### Node.js
```bash
$ cd app
$ npm install -g yarn
$ yarn && yarn dev
```

`/api`以下の動作にはFirebaseの認証鍵が必要なので、代わりに本番環境のものを使ってください。  
以下のコマンドを実行することで`/api`以下を呼び出す際に本番環境のものを使用します。

```bash
$ echo NEXT_PUBLIC_API_BASE_URL=https://live-reference-wcvgewglma-an.a.run.app > app/.env.local
```

http://localhost:3000 などにアクセスして開発を開始できます
