import React from 'react';
import ReactDOM from 'react-dom';


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


export default class InputComponent extends React.Component {

    onChange = (e1, e2)=> {
        var compProps = this.props;
        var newValue = e1.target.value;
        var {onChange} = compProps; //只可能是 text 和 password
        onChange(newValue, compProps, e1, e2);
    };

    render() {

        var that = this;
        var compProps = this.props;
        var {component,className,valueData,id} = compProps; //只可能是 textarea , text 和 password
        className = className || '';

        if (component === 'textarea') {
            return (
                <textarea id={id} className={className } onChange={that.onChange} value={valueData} />
            );
        }

        if (component === 'select') {
            return (
                <select className={className} id={id} value={valueData} onChange={that.onChange}>
                    {renderSelectOptions(compProps)}
                </select>
            );
        }

        return (
            <input className={className}
                   type={component}
                   id={id}
                   value={valueData||''}
                   onChange={that.onChange}/>
        );

    };
}