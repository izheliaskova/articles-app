function Article(properties) {
    this.title = '';
    this.text = '';
    this.creationDate = dateUtils.getStringDate();
    this.author = 'Iryna Zheliaskova';

    if (properties) {
        for (var key in properties) {
            if (!properties.hasOwnProperty(key)) continue;
            this[key] = properties[key];
        }
    }
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

    window.articlesModel = {
        findOne: function(id) {
            var articles = getAll();
            return articles[id];
        },
        getAll: function() {
            return getAll();
        },
        add: function(article) {
            var articles = getAll();
            article.id = getNextId();
            articles[article.id] = article;
            updateAll(articles);
        },
        updateAll: function(articles) {
            updateAll(articles);
        },
        update: function(article) {
            var articles = getAll();
            articles[article.id] = article;
            updateAll(articles);
        },
        remove: function (id) {
            var articles = getAll();
            delete articles[id];
            updateAll(articles);
        }
    }
})();