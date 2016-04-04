var MAX_TITLE_LEN = 250;
var LS_ARTICLES_KEY = 'articles';
var LS_SEQUENCE_KEY = 'sequence';

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
    document.getElementById("articleContainer").innerHTML = "";
    var articles = getArticles();
    for (var i = 0; i < articles.length; i++) {
        showArticle(articles[i]);
    }
}

function getArticlePreview(art, maxTitleLen) {
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
    var rows = articleContainer.getElementsByClassName("row");
    var row = rows.lastChild;
    var newRowNeeded = !row;
    if (row) {
        var articlesInRow = row.getElementsByTagName("div");
        newRowNeeded = articlesInRow.length === 3;
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
    htmlArticleCol.className = "col-sm-4";
    var htmlArticle = document.createElement("div");
    htmlArticle.id = article.id;
    htmlArticle.className = "article";
    var closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "close";
    closeButton.innerHTML = "&times;";
    closeButton.setAttribute("onclick", "deleteArticle(" + article.id + ")");
    var title = document.createElement("h2");
    title.innerHTML = article.title + " (" + article.id + ")";
    var preview = document.createElement("p");
    preview.innerHTML = getArticlePreview(article.text, MAX_TITLE_LEN);
    var button = document.createElement("p");
    var link = document.createElement("a");
    link.className = "btn btn-default";
    link.href = "#";
    link.setAttribute("role", "button");
    link.innerHTML = "View details »";
    button.appendChild(link);
    htmlArticle.appendChild(closeButton);
    htmlArticle.appendChild(title);
    htmlArticle.appendChild(preview);
    htmlArticle.appendChild(button);
    htmlArticleCol.appendChild(htmlArticle);
    return htmlArticleCol;
}

function showArticle(article) {
    var row = getHtmlRowForArticles();
    var htmlArticle = createHtmlArticle(article);
    row.appendChild(htmlArticle);
}




var articles = [{id: 1}, {id: 2}, {id: 4}, {id: 6}, {id: 9}, {id: 17}, {id: 22}];
//for (var i = 1; i <= 100; i++) {
//    articles.push({id: i});
//}



var articleId = 0;
var index = findArticleIndexById(articleId, articles);
console.log(index);







