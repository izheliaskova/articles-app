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

function createArticleElement(article) {
    var articleHeader = createElement(
        'header', {},
        _('span', {}, 'Creation date:'),
        _('time', {'datetime': article.creationDate}, article.creationDate),
        _('div', {'class': 'article-controls pull-right'},
            _('a', {'href': '#'},
                _('span', {'class': 'glyphicon glyphicon-remove'})),
            _('a', {'href': '#'},
                _('span', {'class': 'glyphicon glyphicon-pencil'})))
    );
    var articleContent = createElement(
        'main', {},
        _('h2', {}, article.title),
        _('p', {}, article.content)
    );
    var articleFooter = createElement(
        'footer', {},
        _('div', {'class': 'pull-left'},
            _('span', {'class': 'glyphicon glyphicon-user'}),
            ' Author:',
            _('br', {}),
            article.author),
        _('button',
            {'class': 'btn btn-default pull-right view-btn', 'type': 'button'},
            "View details >>")
    );
    return createElement(
        'article',
        {'class': 'article'},
        articleHeader, articleContent, articleFooter);
}


