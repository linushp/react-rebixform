import React from 'react';
import ReactDOM from 'react-dom';
import InputComponent from './InputComponent';
import SelectComponent from './SelectComponent';
import CheckboxComponent from './CheckboxComponent';
import CheckGroupComponent from './CheckGroupComponent';
import RadioGroupComponent from './RadioGroupComponent';
import NotExistComponent from './NotExistComponent';

var isStringEmpty = require('../utils/isStringEmpty');
var functions = require('../utils/functions');
var ComponentsStorage = require('../ComponentsStorage');
var extend = functions.extend;


const RenderComponentMap = {
    'text': InputComponent,
    'password': InputComponent,
    'textarea': InputComponent,
    'select': InputComponent,
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
        this.state = {
            errorMsg: null
        };
    }


    onChange = (newValue, compProps, e1, e2)=> {
        var {valueName} = compProps;
        var {parent} = this.props;
        var changedState = {};
        changedState[valueName] = newValue;
        parent.setState(changedState);
    };


    render() {

        var that = this;
        var props = that.props;
        var {errorMsg} = that.state;
        var {parent,bind,onChange,id,label,component,blurValid} = props;
        id = id || that.fieldId;
        onChange = onChange || that.onChange;

        var parentState = parent.state;

        var bindArray = bind.split(':');
        var valueName = bindArray[0];
        var valueData = parentState[valueName];
        var RenderComponent = getRenderComponent(component);


        var valueOptions;
        var valueOptionsName = bindArray[1];
        if (valueOptionsName) {
            valueOptions = parentState[valueOptionsName];
        }

        var compProps = extend({}, props, {
            id: id,
            onChange: onChange,
            valueName: valueName,
            valueData: valueData,
            valueOptions: valueOptions,
            valueOptionsName: valueOptionsName
        });

        if (!isStringEmpty(label) || !isStringEmpty(blurValid)) {
            return (
                <div className="rebix_field" >
                    {label ? <label for={id}>{label}</label> : null}
                    {errorMsg ? <div className="rebix-error">{errorMsg}</div> : null}
                    <RenderComponent {...compProps} />
                </div>
            );
        }
        else {
            <RenderComponent {...compProps} />
        }
    }

}

export default Field;