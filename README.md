# elevation-js
A client javascript port of gsi-cyberjapan/elevation-php

## Usage

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

## Note

このライブラリは ```XMLHttpRequest``` を使用して [地理院地図・標高タイル](http://maps.gsi.go.jp/development/ichiran.html#dem-1)  から標高データを取得するものです。

