# GlobalBAN-discordbot

botが参加しているすべてのサーバーから指定したユーザーをBANします。
## 開発環境
[![Node.js v18.x\~](https://img.shields.io/badge/-node.js%20v18.x~-black.svg?logo=node.js&style=for-the-badge)](https://github.com/nodejs/node)
[![discord.js v14.x\~](https://img.shields.io/badge/-discord.js%20v14.x~-black.svg?logo=discord&style=for-the-badge)](https://www.npmjs.com/package/discord.js)

## 起動
[.env.sample](.env.sample)の.sampleを消して、botのToken,IDを入力<br>
`node index.js` で起動します

### コマンド
| コマンド名 | コマンドの説明|
|---|---|
|`/grobalban`|botが参加しているサーバーからのBAN(グローバルBAN)|
|`/ungtpbalban`|グローバルBANの解除|
|`/ping`|botのping値の表示|
