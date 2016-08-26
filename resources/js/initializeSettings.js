/* Template initialization */
function compileTemplates(templateNames) {
    var compiledTemplates = {};
    templateNames.forEach(function(templateName) {
        var templateElement = document.getElementById(templateName);
        if (templateElement) {
            var template = templateElement.innerHTML;
            compiledTemplates[templateName] = _.template(template);
        }
    });
    return compiledTemplates;
}

var compiledTemplates = compileTemplates(['articleTemplate']);

function renderTemplate(template, data) {
    return compiledTemplates[template](data);
}

