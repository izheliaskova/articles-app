var articleId = "articleId";
var articleTitle = "articleTitle";
var articleContent = "articleContent";

function createArticle() {
    var title = document.getElementById(articleTitle).value;
    var text = document.getElementById(articleContent).value;
    var article = new Article(title, text);
    articlesModel.add(article);
    articlesView.show(article);
    clearFields();
}

function updateArticle() {
    var id = document.getElementById(articleId).value;
    var article = articlesModel.findOne(id);
    article.title = document.getElementById(articleTitle).value;
    article.text = document.getElementById(articleContent).value;
    articlesModel.update(article);
    articlesView.update(article);
    clearFields();
}

function deleteArticle(id) {
    articlesModel.remove(id);
    articlesView.remove(id);
}

function editArticle(id) {
    editMode = true;
    var article = articlesModel.findOne(id);
    document.getElementById(articleId).value = article.id;
    document.getElementById(articleTitle).value = article.title;
    document.getElementById(articleContent).value = article.text;
}

function clearFields () {
    document.getElementById(articleId).value = "";
    document.getElementById(articleTitle).value = "";
    document.getElementById(articleContent).value = "";
    editMode = false;
}