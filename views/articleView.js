(function () {

    var MAX_TITLE_LEN = 150;
    var articlesInRow = 2;
    var articleContainer = document.getElementById("articleContainer");
    var articleIdPrefix = 'art-';

    function getArticlePreview(text) {
        var cutIndex = text.slice(0, MAX_TITLE_LEN - 2).lastIndexOf(" ");
        return text.slice(0, cutIndex == -1 ? -3 : cutIndex) + "...";
    }

    function getRow() {
        var row = articleContainer.lastElementChild;
        var newRowNeeded = !row;
        if (row) {
            newRowNeeded = row.childElementCount === articlesInRow;
        }
        if (newRowNeeded) {
            row = document.createElement("div");
            row.className = "row";
            articleContainer.appendChild(row);
        }
        return row;
    }

    function show(article) {
        var column = document.createElement("div");
        column.className = "col-sm-" + (12 / articlesInRow);
        article.preview = getArticlePreview(article.text);
        column.innerHTML = renderTemplate('articleTemplate', article);
        var row = getRow();
        row.appendChild(column);
    }

    function showAll(articles) {
        articleContainer.innerHTML = "";
        for (var key in articles) {
            if (!articles.hasOwnProperty(key)) continue;
            show(articles[key]);
        }
    }

    function remove(id, callback) {
        var article = document.getElementById(articleIdPrefix + id);
        var htmlCol = article.parentNode;
        htmlCol.parentNode.removeChild(htmlCol);
        if (typeof callback === 'function') {
            callback();
        }
    }

    function update(newArticle) {
        var articleElement = document.getElementById(articleIdPrefix + newArticle.id);
        articleElement.parentNode.innerHTML = renderTemplate('articleTemplate', newArticle);
    }

    window.articlesView = {
        showAll: showAll,
        show: show,
        remove: remove,
        update: update
    }
})();