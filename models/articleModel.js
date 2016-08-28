function Article(title, text) {
    this.title = title;
    this.text = text;
    this.creationDate = dateUtils.getStringDate();
    this.author = 'Iryna Zheliaskova';
}

(function () {

    var ARTICLES_KEY = 'articles';
    var SEQUENCE_KEY = 'sequence';

    var defaultValues = {};
    defaultValues[ARTICLES_KEY] = {};
    defaultValues[SEQUENCE_KEY] = 0;
    $db.initKeys(defaultValues);

    function getNextId() {
        var id = $db.getItem(SEQUENCE_KEY);
        $db.setItem(SEQUENCE_KEY, ++id);
        return id;
    }

    function getAll() {
        return $db.getItem(ARTICLES_KEY);
    }

    function updateAll(articles) {
        $db.setItem(ARTICLES_KEY, articles);
    }

    function update(article) {
        var articles = getAll();
        articles[article.id] = article;
        updateAll(articles);
    }

    window.articlesModel = {
        findOne: function(id) {
            var articles = getAll();
            return articles[id];
        },
        getAll: getAll,
        add: function(article) {
            article.id = getNextId();
            update(article);
        },
        updateAll: updateAll,
        update: update,
        remove: function (id) {
            var articles = getAll();
            delete articles[id];
            updateAll(articles);
        }
    }
})();