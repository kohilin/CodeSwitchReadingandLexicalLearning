$(document).ready(function() {
    english = 4;
    chinese = 5;
    russian = 6;

    $.when(
            $.getScript("./js/viewer.js"),
            $.getScript("./js/File2Array.js"),
            $.getScript("./js/utils.js"),
            $.getScript("./js/jquery.ballon.js")
        )
        .done(function() {
            var parsed_url = location.search.split("?");
            console.log(parsed_url)
            var data = "./data/" + decodeURIComponent(parsed_url[1]) + ".tsv";
            var title_jp = decodeURIComponent(parsed_url[2]);
            var author_jp = decodeURIComponent(parsed_url[3]);
            var lang = decodeURIComponent(parsed_url[4]);
            var randomness = decodeURIComponent(parsed_url[5]);
            var ratio = decodeURIComponent(parsed_url[6]);

            insertText(title_jp, "#title");
            insertText(author_jp, "#author");
            var f2a = new File2Array();
            var array_data = f2a.readFile(data, "\t");
            var sentences = makeSentence(array_data, lang, randomness, ratio);
            var viewer = new Viewer();
            viewer.insertText(sentences);
            viewer.hover();


        })
        .fail(function() {

        })


});
