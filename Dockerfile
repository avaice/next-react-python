FROM python:3.12

# 必要なパッケージをインストール
RUN apt update && apt install python3.11-venv -y

# VoltaをインストールしてNode.jsを管理
RUN curl https://get.volta.sh | bash
ENV VOLTA_HOME=/root/.volta
ENV PATH=$VOLTA_HOME/bin:$PATH

SHELL ["/bin/bash", "-c"]

# Node.jsは実行時に自動でインストールされるのでここではインストールしない

# アプリ用ディレクトリを作成
WORKDIR /app

# 必要なファイルをコンテナにコピー
COPY package*.json ./
COPY ./python/requirements.txt ./python/

# Node.js依存パッケージをインストール
RUN npm install

# Pythonの仮想環境をセットアップ
RUN python3.11 -m venv /venv && \
    /venv/bin/pip install --upgrade pip && \
    /venv/bin/pip install -r ./python/requirements.txt

# PATHにPython仮想環境を追加
ENV PATH="/venv/bin:$PATH"

# アプリコードをコピー
COPY . .

# デフォルトのコマンド（Node.jsサーバー起動）
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
