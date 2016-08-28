(function () {
    window.dateUtils = {
        getStringDate: function () {
            var date = new Date();
            var day = date.getDate();
            day = day < 10 ? '0' + day : day;
            var month = date.getMonth() + 1;
            month = month < 10 ? '0' + month : month;
            return day + '-' + month + '-' + date.getFullYear();
        }
    }
})();