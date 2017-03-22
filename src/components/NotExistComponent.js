import React from 'react';

var NotExistComponent = React.createClass( {
    render(){
        var {component} = this.props;
        return (
            <div>
                NotDefinedComponentError [{component}]
            </div>
        );
    }
});

module.exports = NotExistComponent;