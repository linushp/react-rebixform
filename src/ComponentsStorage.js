var RC_STORAGE = {};

module.exports = {

    getComponents: function () {
        return RC_STORAGE;
    },

    saveComponent: function (key, value) {
        RC_STORAGE[key] = value;
    }
};