var LS_ARTICLES_KEY = 'articles';
var LS_SEQUENCE_KEY = 'sequence';

var maxTitleLength = 40;
var maxPreviewLength = 150;
var articlesInRow = 3;

createValueInLocalStorageIfDoesNotExist(LS_ARTICLES_KEY, []);
createValueInLocalStorageIfDoesNotExist(LS_SEQUENCE_KEY, 0);
getAndShowAllArticles();

function getArticles() {
    return JSON.parse(localStorage.getItem(LS_ARTICLES_KEY));
}

function setArticles(articles) {
    localStorage.setItem(LS_ARTICLES_KEY, JSON.stringify(articles));
}

function getAndShowAllArticles() {
//    document.getElementById("articleContainer").innerHTML = "";
//    var articles = getArticles();
//    for (var i = 0; i < articles.length; i++) {
//        showArticle(articles[i]);
//    }
}

function getArticlePreview(art, maxTitleLen) {
    if (art.length <= maxTitleLen) {
        return art;
    }
    var cutIndex = art.slice(0, maxTitleLen - 2).lastIndexOf(" ");
    return art.slice(0, cutIndex == -1 ? -3 : cutIndex) + "...";
}

function clearFields() {
    document.getElementById("articleTitle").value = "";
    document.getElementById("articleText").value = "";
}

function getId() {
    var id = localStorage.getItem(LS_SEQUENCE_KEY);
    localStorage.setItem(LS_SEQUENCE_KEY, ++id);
    return id;
}

function createSaveAndShowArticle() {
    var newArticle = {
        id: getId(),
        author: null,
        date: new Date(),
        title: document.getElementById("articleTitle").value,
        text: document.getElementById("articleText").value
    };
    try {
        saveArticle(newArticle, true);
    } catch (e) {
        //TODO Обработать исключения при сохранении статьи
    }
    showArticle(newArticle);
    clearFields();
}

function saveArticle(article, newArticle) {
    var articles = getArticles();
    if (!newArticle) {
        //TODO Вызываем функцию редактирования статьи
        return;
    }
    articles.push(article);
    setArticles(articles);
}

function getHtmlRowForArticles() {
    var articleContainer = document.getElementById("articleContainer");
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

function findArticleIndexById(id, articles) {
    var lowIndex = 0;
    var highIndex = articles.length - 1;
    while (true) {
        var index = Math.round((lowIndex + highIndex) / 2);
        if (lowIndex > highIndex) {
            return null;
        }
        if (articles[index].id === id) {
            return index;
        }
        if (articles[index].id < id) {
           lowIndex = index + 1;
        } else {
           highIndex = index - 1;
        }
    }
}

function deleteArticle(articleId) {
    var articles = getArticles();
    var articleIndex = findArticleIndexById(articleId, articles);
    if (articleIndex === null) {
        throw new Error("Индекс статьи не найден");
    }
    articles.splice(articleIndex, 1);
    setArticles(articles);
    getAndShowAllArticles();
}

function createHtmlArticle(article) {
    var htmlArticleCol = document.createElement("div");
    htmlArticleCol.className = "col-sm-" + (12 / articlesInRow);
    var htmlArticle = document.createElement("div");
    htmlArticle.id = article.id;
    htmlArticle.className = "article";
    var closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "close";
    closeButton.innerHTML = "&times;";
    closeButton.setAttribute("onclick", "deleteArticle(" + article.id + ")");
    var title = document.createElement("h3");
    title.className = "article-title";
    title.innerHTML = getArticlePreview(article.title, maxTitleLength);
    var preview = document.createElement("p");
    preview.className = "article-preview";
    preview.innerHTML = getArticlePreview(article.text, maxPreviewLength);
    var buttonBlock = document.createElement("p");
    buttonBlock.className = "article-footer";
    var button = document.createElement("a");
    button.className = "btn btn-default";
    button.href = "#";
    button.setAttribute("role", "button");
    button.innerHTML = "View details »";
    buttonBlock.appendChild(button);
    htmlArticle.appendChild(closeButton);
    htmlArticle.appendChild(title);
    htmlArticle.appendChild(preview);
    htmlArticle.appendChild(buttonBlock);
    htmlArticleCol.appendChild(htmlArticle);
    return htmlArticleCol;
}

function showArticle(article) {
    var row = getHtmlRowForArticles();
    var htmlArticle = createHtmlArticle(article);
    row.appendChild(htmlArticle);
}

function changeArticlesCountInRow(count) {
    articlesInRow = count;
    if (count === 2) {
        maxTitleLength = 60;
        maxPreviewLength = 250;
    }
    if (count === 3) {
        maxTitleLength = 40;
        maxPreviewLength = 150;
    }
    getAndShowAllArticles();
}