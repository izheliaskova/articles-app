var createElement = function (name, attributes) {
	var elem = document.createElement(name);
	for (var attr in attributes) {
		if (!attributes.hasOwnProperty(attr)) continue;
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
	var articleHeader = createElement(
		'header', {},
			_('span', {}, 'Creation date:'),
			_('time', {'datetime': '2016-04-10'}, '10-04-2016'),
			_('div', {'class': 'article-controls pull-right'},
				_('a', {'href': '#'},
					_('span', {'class': 'glyphicon glyphicon-pencil'})),
				_('a', {'href': '#'},
					_('span', {'class': 'glyphicon glyphicon-remove'})))
	);
	var articleContent = createElement(
		'main', {},
			_('h2', {}, 'Big Ben'),
			_('p', {}, 'Some text')
	);
	var articleFooter = createElement(
		'footer', {},
			_('div', {'class': 'pull-left'},
				_('span', {'class': 'glyphicon glyphicon-user'}),
				' Author:',
				_('br', {}),
				'Iryna Zheliaskova'),
		_('button',
			{'class': 'btn btn-default pull-right view-btn', 'type': 'button'},
			"View details >>")
	);
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

function getNextId() {

}

function createArticle() {
	var title = document.getElementById('articleTitle').value;
    var content = document.getElementById('articleContent').value;
	var article = {
		id: 1,
		creationDate: '10-04-2016',
		author: 'Iryna Zheliaskova',
		title: title,
		content: content
	};
	console.log(article);
	localStorage.setItem('article', JSON.stringify(article));
}




