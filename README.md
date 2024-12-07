# Next.js + Python



https://github.com/user-attachments/assets/354783fd-0296-4d94-912d-761357d29b5a



Route HandlerやServer Actionsを使って、Next.jsからPythonコードを実行するサンプルです。

## 使い方

Python3.11と`package.json`で示したNode.jsのバージョンが必要です。
Node.jsのバージョン管理には`Volta`を使用しています。

```bash
npm ci
npm run dev
```

Pythonでライブラリを使用する場合は、`./python/requirements.txt`に追加してください。
```bash
pip freeze > ./python/requirements.txt
```

## Dockerでの実行

Dockerを使って実行する場合は、以下のコマンドを実行してください。

```bash
docker build -t next-react-python .
docker run -d -p 3000:3000 next-react-python
```

http://localhost:3000 にアクセスすると、起動が確認できます。
