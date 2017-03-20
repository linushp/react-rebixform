import React from 'react';
import ReactDOM from 'react-dom';

export default class InputComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <input type="text"/>
        );
    };
}