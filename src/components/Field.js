import React from 'react';
var FieldComponent = require('./FieldComponent');
var NotExistComponent = require('./NotExistComponent');

var isStringEmpty = require('../utils/isStringEmpty');
var functions = require('../utils/functions');
var ComponentsStorage = require('../ComponentsStorage');
var extend = functions.extend;


const RenderComponentMap = {
    'text': FieldComponent,
    'password': FieldComponent,
    'textarea': FieldComponent,
    'select': FieldComponent,
    'selectMulti': FieldComponent,
    'checkbox': FieldComponent,
    'checkboxGroup': FieldComponent,
    'radioGroup': FieldComponent
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
const Field = React.createClass({

    getInitialState() {
        this.fieldId = "rebix_field_" + fieldId;
        fieldId++;
        return {};
    },


    onChange (newValue, compProps, e1, e2){
        var that = this;
        var {valueName} = compProps || getComponentProps(that);
        var {parent} = that.props;
        var changedState = {};
        changedState[valueName] = newValue;
        parent.setState(changedState);
    },


    render() {

        var that = this;
        var props = that.props;

        var {parent,bind,onChange,id,label,component,blurValid,className,errorMsg} = props;
        className = className || 'rebix_field';
        var compProps = getComponentProps(that);
        var RenderComponent = getRenderComponent(component);

        if (!isStringEmpty(label) || !isStringEmpty(blurValid)) {
            return (
                <div className={className}>
                    {errorMsg ? <div className="rebix_f_err">{errorMsg}</div> : null}
                    {label ? <label className="rebix_f_title" htmlFor={id}>{label}</label> : null}
                    <div className="rebix_fw">
                        <RenderComponent {...compProps} />
                    </div>
                </div>
            );
        }
        else {
            <RenderComponent {...compProps} />
        }
    }

});

export default Field;