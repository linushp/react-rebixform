import React from 'react';
import ReactDOM from 'react-dom';
import {Field} from '../src/index';


var InputCalendar = null;


class ExampleApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'hello',
            password: '123',
            sex: 1,
            sexOptions: [{key: 1, text: '男'}, {key: 2, text: '女'}],
            agree: false,
            language: ['en'],
            languageOptions: [{key: 'en', text: '英语'}, {key: 'zh', text: '中文'}],
            country: 'zh',
            countryMulti: ['zh'], //多选
            countryOptions: [{key: 'en', text: '英国'}, {key: 'zh', text: '中国'}],
            birthday: '2016-01-02',
            workTime: '2016-01-02'
        };
    }

    onValueChanged = (newValue,e)=> {

    };

    render() {
        var that = this;
        var onValueChanged = that.onValueChanged;
        return (
            <div>
                <Field parent={that} label="姓名" bind='name' component="text" blurValid="length[1-10]"/> {that.state.name}
                <Field parent={that} label="密码" bind='password' component="password" blurValid="length[1-10]"/>
                <Field parent={that} label="性别" bind='sex:sexOptions' component="radioGroup"/>
                <Field parent={that} label="同意协议" bind='agree' component="checkbox"/>
                <Field parent={that} label="支持语言" bind='language:languageOptions' component="checkboxGroup"/>
                <Field parent={that} label="选择国家" bind='country:countryOptions' component="select"/>
                <Field parent={that} label="选择国家" bind='countryMulti:countryOptions' component="selectMulti"/>
                <Field parent={that} label="留言" bind='message' component="textarea"/>{that.state.message}
                <Field parent={that} label="生日" bind='birthday' component={InputCalendar}/>
                <Field parent={that} label="参加工作时间" bind='workTime' component="InputCalendar"/>
            </div>
        );
    }
}




ReactDOM.render(<ExampleApp />, document.getElementById('root'));