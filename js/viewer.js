// depends on utils.js

var Viewer = (function() {
    var Viewer = function() {};

    var p = Viewer.prototype;

    p.insertText = function(sentences) {
        for (sentence of sentences) {
            var div_elem = document.createElement("div");
            div_elem.className = "sentence";
            div_elem.innerHTML = sentence.sentence_;
            $("#main").append(div_elem);
        }
    };

    p.hover = function() {
        $('.replaced').balloon({
            tipSize: 24,
            css: {
                border: 'double 4px',
                padding: '10px',
                fontSize: '130%',
                fontWeight: 'bold',
                lineHeight: '1',
                backgroundColor: '#8bc34a',
                color: '#fff'
            }
        });
        $('a').balloon();

        $(".sound_icon").mouseover(function() {
            $(this).animate({
                    width: 50,
                    height: 50,
                }, {
                    duration: 200
                }

            );
        }).mouseout(function() {
            $(this).animate({
                width: 15,
                height: 15,
            }, {
                duration: 200
            });
        });

    }





    return Viewer;
})();

function insertText(name, id) {
    $(id).text(name);
}
