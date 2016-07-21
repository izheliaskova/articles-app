var createElement = function (name, attributes) {
	var elem = document.createElement(name);
	for (var attr in attributes) {
		elem.setAttribute(attr, attributes[attr]);
	}
	for (var i = 2; i < arguments.length; i++) {
		var arg = arguments[i];
		if (typeof arg === 'string') {
			arg = document.createTextNode(arg)
		}
		elem.appendChild(arg);
	}
	return elem;
};

var _ = createElement;

function createArticleElement() {
	var glyphiconPencil = createElement(
		'a', {'href': '#'},
		_('span', {'class': 'glyphicon glyphicon-pencil'})
	);
	var glyphiconRemove = createElement(
		'a', {'href': '#'},
		_('span', {'class': 'glyphicon glyphicon-remove'})
	);
	var articleControls = createElement(
		'div',
		{'class': 'article-controls pull-right'},
		glyphiconPencil, glyphiconRemove);
	var span = createElement('span', {}, 'Creation date:');
	var time = createElement('time', {'datetime': '2016-04-10'}, '10-04-2016');
	var articleHeader = createElement('header', {}, span, time, articleControls);
	var articleTitle = createElement('h2', {}, 'Big Ben');
	var articleText = createElement('p', {},
		'The big clock on the tower of the Palace of Westminster ' +
		'in London is often called Big Ben.');
	var articleContent = createElement('main', {}, articleTitle, articleText);
	var authorContainer = createElement(
		'div', {'class': 'pull-left'},
			_('span', {'class': 'glyphicon glyphicon-user'}),
			'Author:',
			_('br', {}),
			'Iryna Zheliaskova'
	);

	var button = createElement('button', {'class': 'btn btn-default pull-right view-btn',
		'type': 'button'}, "View details >>");
	var articleFooter = createElement('footer', {}, authorContainer, button);
	var article = createElement(
		'article',
		{'class': 'article'},
		articleHeader, articleContent, articleFooter);
	return article;
}

var col = document.createElement("div");
col.className = "col-md-6";
col.appendChild(createArticleElement());

var row = document.createElement("div");
row.className = "row";
row.appendChild(col);

var articleContainer = document.getElementById("articleContainer");
articleContainer.appendChild(row);






