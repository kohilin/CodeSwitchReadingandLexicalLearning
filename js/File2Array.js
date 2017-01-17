var File2Array = (function() {
    var File2Array = function() {};

    var p = File2Array.prototype;

    p.createArray = function(data, sep) {
        var tempArray = data.split("\n");
        var returnArray = new Array();
        for (var i = 0; i < tempArray.length; i++) {
            returnArray[i] = tempArray[i].split(sep);
        }
        return returnArray;
    };

    p.readFile = function(file, sep) {
        var xhr = new XMLHttpRequest();
        xhr.open("get", file, false);
        xhr.send(null);
        return p.createArray(xhr.responseText, "\t");
    };

    p.shuffle = function(ary) {
        var i = ary.length;
        while (i) {
            var j = Math.floor(Math.random() * i);
            var t = ary[--i];
            ary[i] = ary[j];
            ary[j] = t;
        }
        return ary;
    };


    return File2Array;
})();
