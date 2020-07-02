# diexercise
デザイン情報総合演習グループF1用リポジトリ

## 開発
```bash
$ docker-compose build
$ docker-compose up -d
```

### 注意
`/api`以下の動作にはFirebaseのキーが必要です

* プロジェクトを作成しキーを発行して`app/serviceAccountKey.json`に配置
* もしくは`app/.env.local`を作成して代わりに本番環境の`/api`にリクエストを送る

```bash
$ echo NEXT_PUBLIC_API_BASE_URL=<本番環境のURL>/api > app/.env.local
```
