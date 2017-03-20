import React from 'react';
import ReactDOM from 'react-dom';
import InputComponent from './InputComponent';
import TextAreaComponent from './TextAreaComponent';
import SelectComponent from './SelectComponent';
import CheckboxComponent from './CheckboxComponent';
import CheckGroupComponent from './CheckGroupComponent';
import RadioGroupComponent from './RadioGroupComponent';
import NotExistComponent from './NotExistComponent';

var isStringEmpty = require('../utils/isStringEmpty');
var ComponentsStorage = require('../ComponentsStorage');

const RenderComponentMap = {
    'text': InputComponent,
    'password': InputComponent,
    'textarea': TextAreaComponent,
    'select': SelectComponent,
    'checkbox': CheckboxComponent,
    'checkboxGroup': CheckGroupComponent,
    'radioGroup': RadioGroupComponent
};

function getRenderComponent(component) {
    var rc = RenderComponentMap[component];
    if (rc) {
        return rc;
    }

    var mixinComponents = ComponentsStorage.getComponents();
    rc = mixinComponents[component];
    if (rc) {
        return rc;
    }
    return NotExistComponent;
}


var fieldId = 1;
class Field extends React.Component {

    constructor(props) {
        super(props);
        this.fieldId = "rebix_field_" + fieldId;
        fieldId++;
    }

    render() {

        var that = this;
        var props = that.props;
        var {parent,bind,onChange,id,label,component,blurValid} = props;
        id = id || this.fieldId;

        var bindArray = bind.split(':');

        var valueOptions = bindArray[1];
        var valueName = bindArray[0];
        var valueData = parent.state[valueName];

        var RenderComponent = getRenderComponent(component);

        if (!isStringEmpty(label) || !isStringEmpty(blurValid)) {
            return (
                <div className="rebix-field">
                    {label ? <label for={id}>{label}</label> : null}
                    <div className="rebix-err"></div>
                    <RenderComponent {...props} valueData={valueData} valueOptions={valueOptions} id={id} />
                </div>
            );
        }
        else {
            <RenderComponent {...props} valueData={valueData} valueOptions={valueOptions}/>
        }
    }

}

export default Field;