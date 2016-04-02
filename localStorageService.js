function getExectTypeof (value) {
    var valueType = typeof value;
    if (valueType === 'object') {
        if (value === null) {
            return 'null';
        }
        if (value instanceof Array) {
            return 'array';
        }
    }
    return valueType;
}

function createValueInLocalStorageIfDoesNotExist (key, defaultValue) {
    var value = localStorage.getItem(key);
    if (!value) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return;
    }
    try {
        value = JSON.parse(value);
    } catch (e) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return;
    }
    var valueType = getExectTypeof(value);
    var defaultValueType = getExectTypeof(defaultValue);
    if (valueType !== defaultValueType) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
    }
}