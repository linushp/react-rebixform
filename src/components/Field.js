import React from 'react';
import ReactDOM from 'react-dom';
import FieldCommonComponent from './FieldCommonComponent';
import NotExistComponent from './NotExistComponent';

var isStringEmpty = require('../utils/isStringEmpty');
var functions = require('../utils/functions');
var ComponentsStorage = require('../ComponentsStorage');
var extend = functions.extend;


const RenderComponentMap = {
    'text': FieldCommonComponent,
    'password': FieldCommonComponent,
    'textarea': FieldCommonComponent,
    'select': FieldCommonComponent,
    'selectMulti': FieldCommonComponent,
    'checkbox': FieldCommonComponent,
    'checkboxGroup': FieldCommonComponent,
    'radioGroup': FieldCommonComponent
};

function getRenderComponent(component) {

    if (typeof component !== 'string') {
        return component;
    }

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


function getComponentProps(that) {
    var props = that.props;

    var {parent,bind,onChange,id,label,component,blurValid} = props;
    id = id || that.fieldId;
    onChange = onChange || that.onChange;

    var parentState = parent.state;

    var bindArray = bind.split(':');
    var valueName = bindArray[0];
    var valueData = parentState[valueName];


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

    return compProps;
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
        var that = this;
        var {valueName} = compProps || getComponentProps(that);
        var {parent} = that.props;
        var changedState = {};
        changedState[valueName] = newValue;
        parent.setState(changedState);
    };


    render() {

        var that = this;
        var props = that.props;
        var {errorMsg} = that.state;
        var {parent,bind,onChange,id,label,component,blurValid} = props;

        var compProps = getComponentProps(that);
        var RenderComponent = getRenderComponent(component);

        if (!isStringEmpty(label) || !isStringEmpty(blurValid)) {
            return (
                <div className="rebix_field">
                    {label ? <label htmlFor={id}>{label}</label> : null}
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