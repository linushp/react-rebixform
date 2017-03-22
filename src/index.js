var Field  = require('./components/Field');
var ComponentsStorage  = require('./ComponentsStorage');


module.exports = {
    Field: Field,
    mixinComponent: function(key,value){
        ComponentsStorage.saveComponent(key,value);
    }
};