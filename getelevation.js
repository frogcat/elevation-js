(function(window) {

  var ll2xy = function(lon, lat, z) {
    var r = lat * Math.PI / 180
    var n = Math.pow(2, z);
    return {
      x : Math.floor(n * ((lon + 180) / 360)),
      y : Math.floor(n * (1 - (Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI)) / 2)
    };
  };

  var Provider = function(tmpl, z, hsrc) {
    this.z = z;
    this.tmpl = tmpl;
    this.hsrc = hsrc;
  };

  Provider.prototype.execute = function(lon, lat) {
    var xy0 = ll2xy(lon, lat, this.z);
    var xy8 = ll2xy(lon, lat, this.z + 8);
    var url = this.tmpl.replace("{z}", this.z).replace("{x}", xy0.x).replace("{y}", xy0.y);
    var obj = {
      hsrc : this.hsrc,
      elevation : NaN
    };

    return new Promise(function(resolve, reject) {
      var x = new XMLHttpRequest();
      x.onreadystatechange = function() {
        if (x.readyState == 4) {
          if (x.status == 200)
            obj.elevation = parseFloat(x.responseText.split("\n")[xy8.y % 256].split(",")[xy8.x % 256]);
          if (!isNaN(obj.elevation))
            resolve(obj);
          else
            reject();
        }
      };
      x.open("get", url, true);
      x.send();
    });
  };

  var providers = new Array();
  providers.push(new Provider("http://cyberjapandata.gsi.go.jp/xyz/dem5a/{z}/{x}/{y}.txt", 15, "5m（レーザ）"));
  providers.push(new Provider("http://cyberjapandata.gsi.go.jp/xyz/dem5b/{z}/{x}/{y}.txt", 15, "5m（写真測量）"));
  providers.push(new Provider("http://cyberjapandata.gsi.go.jp/xyz/dem/{z}/{x}/{y}.txt", 14, "10m"));

  window.getelevation = function(lon, lat, callback) {
    var fn = function(i) {
      try {
        providers[i].execute(lon, lat).then(function(v) {
          callback(v);
        }).catch(function() {
          fn(i + 1);
        });
      } catch (e) {
        callback({
          hsrc : "---",
          elevation : "---"
        });
      }
    };
    fn(0);
  };

})(window);
