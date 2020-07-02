# diexercise
デザイン情報総合演習グループF1用リポジトリ

## 開発
`/api`以下の動作にはFirebaseの認証鍵が必要なので、代わりに本番環境のものを使ってください

```bash
$ echo NEXT_PUBLIC_API_BASE_URL={本番環境のURL}/api > app/.env.local
$ docker-compose build
$ docker-compose up -d
```
