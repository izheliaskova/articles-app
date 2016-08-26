(function () {

    function getTypeOf (value) {
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

    function createValueInLocalStorageIfDoesNotExist(key, defaultValue) {
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
        var valueType = getTypeOf(value);
        var defaultValueType = getTypeOf(defaultValue);
        if (valueType !== defaultValueType) {
            localStorage.setItem(key, JSON.stringify(defaultValue));
        }
    }

    window.$db = {
        getItem: function(key) {
            return JSON.parse(localStorage.getItem(key));
        },
        setItem: function(key, value) {
            return localStorage.setItem(key, JSON.stringify(value));
        },
        initKeys: function (config) {
            for (var key in config) {
                if (!config.hasOwnProperty(key)) continue;
                createValueInLocalStorageIfDoesNotExist(key, config[key]);
            }
        }
    }
})();