function createArticleElement() {
	var articleContainer = document.getElementById("articleContainer");
	var glyphiconPencil = document.createElement("span");
	glyphiconPencil.className = "glyphicon glyphicon-pencil";
	glyphiconPencil.setAttribute("aria-hidden", "true");
	var glyphiconPencilLink = document.createElement("a");
	glyphiconPencilLink.setAttribute("href", "#");
	glyphiconPencilLink.appendChild(glyphiconPencil);

	var glyphiconRemove = document.createElement("span");
	glyphiconRemove.className = "glyphicon glyphicon-remove";
	glyphiconRemove.setAttribute("aria-hidden", "true");
	var glyphiconRemoveLink = document.createElement("a");
	glyphiconRemoveLink.setAttribute("href", "#");
	glyphiconRemoveLink.appendChild(glyphiconRemove);

	var articleControls = document.createElement("div");
	articleControls.className = "article-controls pull-right";
	articleControls.appendChild(glyphiconPencilLink);
	articleControls.appendChild(glyphiconRemoveLink);

	var creationDate = document.createElement("span");
	creationDate.innerHTML = "Creation date:";

	var time = document.createElement("time");
	time.setAttribute("datetime", "2016-04-10");
	time.innerHTML = "10-04-2016";

	var headerArticle = document.createElement("header");
	headerArticle.appendChild(creationDate);
	headerArticle.appendChild(time);
	headerArticle.appendChild(articleControls);

	var articleTitle = document.createElement("h2");
	articleTitle.innerHTML = "Big Ben";
	var articleText = document.createElement("p");
	articleText.innerHTML = "The big clock on the tower of the Palace of Westminster in London is often called Big Ben.";
	var articleContent = document.createElement("main");
	articleContent.appendChild(articleTitle);
	articleContent.appendChild(articleText);

	var glyphiconUser = document.createElement("span");
	glyphiconUser.className = "glyphicon glyphicon-user";
	glyphiconUser.setAttribute("aria-hidden", "true");

    var author = document.createTextNode("Author:");
    var textWrap = document.createElement("br");
    var authorName = document.createTextNode("Iryna Zheliaskova");

    var namePosition = document.createElement("div"); //не нравится название переменной
    namePosition.className = "pull-left";
    namePosition.appendChild(glyphiconUser);
    namePosition.appendChild(author);
   	namePosition.appendChild(textWrap);
    namePosition.appendChild(authorName);

	var button = document.createElement("button");
	button.className = "btn btn-default pull-right view-btn";
	button.setAttribute("type", "button");
	button.innerHTML = "View details >>";

	var footerArticle = document.createElement("footer");
	footerArticle.appendChild(namePosition);
	footerArticle.appendChild(button);

	var article = document.createElement("article");
	article.className = "article";
	article.appendChild(headerArticle);
	article.appendChild(articleContent);
	article.appendChild(footerArticle);

	var firstCol = document.createElement("div");// без понятия как по нормальному эту переменную назвать
	firstCol.className = "col-md-6";
	firstCol.appendChild(article);

	var row = document.createElement("div");
	row.className = "row";
	row.appendChild(firstCol);

	articleContainer.appendChild(row);
}


createArticleElement();