var Sentence = (function() {
    var Sentence = function(words_arr) {
        this.sentence_ = "";
        for (word of words_arr) {
            if (word.rep_ == 1) {
                // this.sentence_ += "<a href=\"#\" title =" + word.sur_ + " class=\"replaced\" id=token" + word.id_ + ">" + word.swi_ + "</a>";
                this.sentence_ += "<a href=" + word.dict_ + " title =" + word.sur_ + " class=\"replaced\" id=token" + word.id_ + " target=\"_blank\">" + word.swi_ + "</a>";
                this.sentence_ += "<img src=\"./data/telephone_operator.jpeg\"width=15 height=15 class=\"sound_icon\" id=tokenSound" + word.id_ + " onclick=\'Sound(\"" + word.swi_ + "\",\"" + word.speech_ + "\")\'>";
                //  onClick=\"function() {Sound(" + word.swi_ + ")}\">";
                // onclick="function(){Sound(" + word + ")}"
            } else {
                this.sentence_ += word.sur_;
            }
        }
    };

    var p = Sentence.prototype;

    return Sentence;
})();


var Token = (function() {
    var Token = function(sur, rep, swi, lang, id) {
        this.sur_ = sur;
        this.rep_ = rep;
        this.swi_ = swi;
        this.lang_ = lang;
        this.id_ = "#token" + id;

        if (lang == english) {
            this.dict_ = "http://ejje.weblio.jp/content/" + this.swi_;
            this.speech_ = 'en-US';
        } else if (lang == chinese) {
            this.dict_ = "http://cjjc.weblio.jp/content/" + this.swi_;
            this.speech_ = 'zh-CH';
        } else if (lang == russian) {
            this.dict_ = "http://yakuru.net/search.aspx?w=" + this.swi_;
            this.speech_ = 'ru-RU';
        }
    };

    var p = Token.prototype;



    return Token;
})();

makeSentence = function(array, language, random = 1, ratio = 0.2) {
    var words_array = new Array();
    var sentences_array = new Array();

    if (random == 1) {
      var rep_random_idx = getRandomizeIndex(array.length, ratio);
    }

    for (var i = 0; i < array.length; i++) {
        token = array[i];

        replace = random == 1 ? rep_random_idx[i] : token[2];

        if (token[language] != undefined) {
            surface = token[0].replace(/\r?\n/g, "");
            switch_word = token[language].trim();
        }
        words_array.push(new Token(surface, replace, switch_word, language, i));
        if (token[3] == 1) {
            sentences_array.push(new Sentence(words_array))
            words_array = new Array();
        }
    }
    return sentences_array;
}

Sound = function(word, speech_code) {
    var speech = new SpeechSynthesisUtterance(word);
    speech.lang = speech_code;
    speechSynthesis.speak(speech);
}

Shuffle = function(ary) {
    var i = ary.length;
    while (i) {
        var j = Math.floor(Math.random() * i);
        var t = ary[--i];
        ary[i] = ary[j];
        ary[j] = t;
    }
    return ary;
};


getRandomizeIndex = function(array_length, ratio){
  var num_rep = parseInt(array_length * ratio);
  var num_org = array_length - num_rep;
  // console.log(num_rep, num_org);

  var rep_array = new Array(num_rep);
  rep_array.fill(1);
  var org_array = new Array(num_org);
  org_array.fill(0);

  var rep_random_idx = Shuffle(rep_array.concat(org_array));
  return rep_random_idx;

}
