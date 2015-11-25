# elevation-js
A client javascript port of [gsi-cyberjapan/elevation-php](https://github.com/gsi-cyberjapan/elevation-php)

## Demo

<http://frogcat.github.io/elevation-js/>

## Example

    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>getelevation-js</title>
    <script src="getelevation.js"></script>
    </head>
    <body>
      <script>
        getelevation(142.558594, 43.153102, function(json) {
          console.log(json);
        });
      </script>
    </body>
    </html>

## Syntax

    getelevation(longitude,latitude,callback)

#### longitude
経度

#### latitude
緯度

#### callback
標高の取得後に実行されるコールバック関数。
コールバック関数の第一引数に以下のようなオブジェクトが渡される。
詳細は <http://maps.gsi.go.jp/development/api.html> を参照。

    { elevation : 120, hsrc : "10m" }


## Note

このライブラリは ```XMLHttpRequest``` を使用して [地理院地図・標高タイル](http://maps.gsi.go.jp/development/ichiran.html#dem-1)  から標高データを取得するものです。

