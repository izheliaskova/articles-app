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
    document.getElementById("articleContainer").innerHTML = "";
    var articles = getArticles();
    for (var i = 0; i < articles.length; i++) {
        showArticle(articles[i]);
    }
}

function cutTextSmartly(art, maxTitleLen) {
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

function getCurrentDate(currentDate) {
    var date = currentDate.getDate();
    date = date < 10 ? "0" + date : date;
    var month = currentDate.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    var year = currentDate.getFullYear();
    return date + "." + month + "." + year;
}

function createSaveAndShowArticle() {
    var newArticle = {
        id: getId(),
        author: null,
        date: getCurrentDate(new Date()),
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

function createHtmlArticleCol(article) {

    function createTaskBar() {
        var creationDate = document.createElement("div");
        creationDate.className = "creation-date";
        creationDate.innerHTML = "Дата создания: " + article.date;
        var deleteIcon = document.createElement("span");
        deleteIcon.className = "glyphicon glyphicon-remove pull-right";
        deleteIcon.setAttribute("onclick", "deleteArticle(" + article.id + ")");
        var editIcon = document.createElement("span");
        editIcon.className = "glyphicon glyphicon-pencil pull-right";
        editIcon.setAttribute("onclick", "editArticle(" + article.id + ")");
        var taskBar = document.createElement("div");
        taskBar.className = "task-bar";
        taskBar.appendChild(creationDate);
        taskBar.appendChild(deleteIcon);
        taskBar.appendChild(editIcon);
        return taskBar;
    }

    function createFooter() {
        var authorInfo = document.createElement("div");
        authorInfo.className = "pull-left";
        authorInfo.innerHTML = '' +
            '<span class="glyphicon glyphicon-user"></span>' +
            '<strong> Автор:</strong></br>Михаил Желясков';
        var viewDetailsBtn = document.createElement("a");
        viewDetailsBtn.className = "btn btn-default pull-right";
        viewDetailsBtn.setAttribute("href", "#");
        viewDetailsBtn.setAttribute("role", "button");
        viewDetailsBtn.innerHTML = "View details »";
        var footer = document.createElement("div");
        footer.className = "footer";
        footer.appendChild(authorInfo);
        footer.appendChild(viewDetailsBtn);
        return footer;
    }

    var title = document.createElement("h3");
    title.className = "title";
    title.innerHTML = cutTextSmartly(article.title, maxTitleLength);

    var preview = document.createElement("div");
    preview.className = "preview";
    preview.innerHTML = cutTextSmartly(article.text, maxPreviewLength);

    var htmlArticleCol = document.createElement("div");
    htmlArticleCol.className = "col-sm-" + (12 / articlesInRow);
    var htmlArticle = document.createElement("div");
    htmlArticle.id = article.id;
    htmlArticle.className = "article";
    htmlArticle.appendChild(createTaskBar());
    htmlArticle.appendChild(title);
    htmlArticle.appendChild(preview);
    htmlArticle.appendChild(createFooter());
    htmlArticleCol.appendChild(htmlArticle);
    return htmlArticleCol;
}

function showArticle(article) {
    var row = getHtmlRowForArticles();
    var htmlArticleCol = createHtmlArticleCol(article);
    row.appendChild(htmlArticleCol);
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