/* Template initialization */
var compiledTemplates = {
    'articleTemplate': _.template(document.getElementById('articleTemplate').innerHTML)
};

function renderTemplate(template, data) {
    return compiledTemplates[template](data);
}