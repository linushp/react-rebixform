import React from 'react';
import ReactDOM from 'react-dom';


function isStringEqual(a, b) {
    return ('' + a) === ('' + b);
}


function isArrayContains(valueArray, obj) {
    for (var i = 0; i < valueArray.length; i++) {
        var obj1 = valueArray[i];
        if (isStringEqual(obj1, obj)) {
            return true;
        }
    }
    return false;
}


function uniqueArray(array) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        var obj = array[i];
        if (!isArrayContains(result, obj)) {
            result.push(obj);
        }
    }
    return result;
}

function rejectValue(array, obj0) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        var obj = array[i];
        if (!isStringEqual(obj, obj0)) {
            result.push(obj);
        }
    }
    return result;
}

function getAttributeValues(selectedOptions) {
    var result = [];
    for (var i = 0; i < selectedOptions.length; i++) {
        var obj = selectedOptions[i];
        result.push(obj.value);
    }
    return result;
}

function renderSelectOptions(compProps) {
    var {valueOptions} = compProps;
    var result = [];
    for (var i = 0; i < valueOptions.length; i++) {
        var obj = valueOptions[i];
        var {key,text} = obj;
        result.push(<option value={key} key={key}>{text}</option>);
    }
    return result;
}


function renderRadioOptions(compProps, that) {
    var {valueData,valueOptions,id,className} = compProps;
    var name = id + "_name";
    className = className || 'rebix_field_';
    var result = [];
    for (var i = 0; i < valueOptions.length; i++) {
        var obj = valueOptions[i];
        var {key,text} = obj;
        var isChecked = isStringEqual(valueData, key);// ('' + valueData) === ("" + key);
        result.push(
            <label className={className + '_radio_l'} id={id + "_" +key} key={key}>
                <input type="radio" name={name} value={key} checked={isChecked} onChange={that.onChangeRadio}/>
                <span>{text}</span>
            </label>
        );
    }
    return result;
}


function renderCheckboxOptions(compProps, that) {
    var {valueData,valueOptions,id,className} = compProps;
    var name = id + "_name";
    valueData = valueData || [];
    className = className || 'rebix_field_';
    var result = [];
    for (var i = 0; i < valueOptions.length; i++) {
        var obj = valueOptions[i];
        var {key,text} = obj;
        var isChecked = isArrayContains(valueData, key);
        result.push(
            <label className={className + '_checkbox_l'} id={id + "_" +key} key={key}>
                <input type="checkbox" name={name} value={key} checked={isChecked}
                       onChange={that.onChangeCheckboxGroup}/>
                <span>{text}</span>
            </label>
        );
    }
    return result;
}

export default class InputComponent extends React.Component {

    onChange = (e1, e2)=> {
        var compProps = this.props;
        var newValue = e1.target.value;
        var {onChange,component} = compProps;

        if (component === 'checkbox') {
            newValue = e1.target.checked;
        }

        if (component === 'selectMulti') {
            var selectedOptions = e1.target.selectedOptions;
            newValue = getAttributeValues(selectedOptions);
        }

        onChange(newValue, compProps, e1, e2);
    };

    onChangeRadio = (e1, e2)=> {
        var compProps = this.props;
        var newValue = e1.target.value;
        var {onChange} = compProps;
        onChange(newValue, compProps, e1, e2);
    };

    onChangeCheckboxGroup = (e1, e2)=> {
        var compProps = this.props;
        var {valueData,onChange} = compProps;
        var targetValue = e1.target.value;
        var targetIsChecked = e1.target.checked;

        var newValue = valueData || []; //里面的数值只能是字符串

        if (targetIsChecked) {
            newValue.push('' + targetValue);
        } else {
            newValue = rejectValue(newValue, targetValue);
        }
        newValue = uniqueArray(newValue);
        onChange(newValue, compProps, e1, e2);
    };

    render() {

        var that = this;
        var compProps = this.props;
        var {component,className,valueData,valueName,id} = compProps;
        className = className || 'rebix_field_' + component;

        if (component === 'textarea') {
            return (
                <textarea id={id} className={className} onChange={that.onChange} value={valueData}/>
            );
        }


        if (component === 'select' || component === 'selectMulti') {
            var isSelectMulti = (component === 'selectMulti' );
            return (
                <select className={className}
                        id={id}
                        value={valueData}
                        onChange={that.onChange}
                        multiple={isSelectMulti}>
                    {renderSelectOptions(compProps)}
                </select>
            );
        }

        if (component === 'radioGroup') {
            return (
                <div className={className} id={id}>
                    {renderRadioOptions(compProps, that)}
                </div>
            );
        }


        if (component === 'checkbox') {
            return (
                <input className={className}
                       type='checkbox'
                       id={id}
                       checked={valueData}
                       value={valueName}
                       onChange={that.onChange}/>
            );
        }

        if (component === 'checkboxGroup') {
            return (
                <div className={className} id={id}>
                    {renderCheckboxOptions(compProps, that)}
                </div>
            );
        }

        return (
            <input className={className}
                   type={component}
                   id={id}
                   value={valueData}
                   onChange={that.onChange}/>
        );

    };
}