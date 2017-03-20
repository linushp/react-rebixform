var Field  = require('./components/Field');
var ComponentsStorage  = require('./ComponentsStorage');


module.exports = {
    Field: Field,
    mixinFieldComponent: function(key,value){
        ComponentsStorage.saveComponent(key,value);
    }
};