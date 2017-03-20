import React from 'react';
import ReactDOM from 'react-dom';

export default class NotExistComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                the component is not defined
            </div>
        );
    };
}