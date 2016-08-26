(function () {
    window.dateUtils = {
        getStringDate: function () {
            var date = new Date();
            var month = (date.getMonth() + 1);
            return date.getDate() + '-' + (month < 10 ? '0' + month : month) + '-' + date.getFullYear();
        }
    }
})();