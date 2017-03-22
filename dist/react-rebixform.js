(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactRebixform"] = factory(require("react"));
	else
		root["ReactRebixform"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Field = __webpack_require__(1);
	var ComponentsStorage = __webpack_require__(7);

	module.exports = {
	    Field: Field,
	    mixinComponent: function mixinComponent(key, value) {
	        ComponentsStorage.saveComponent(key, value);
	    }
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var FieldComponent = __webpack_require__(3);
	var NotExistComponent = __webpack_require__(4);

	var isStringEmpty = __webpack_require__(5);
	var functions = __webpack_require__(6);
	var ComponentsStorage = __webpack_require__(7);
	var extend = functions.extend;

	var RenderComponentMap = {
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

	    var parent = props.parent;
	    var bind = props.bind;
	    var onChange = props.onChange;
	    var id = props.id;
	    var label = props.label;
	    var component = props.component;
	    var blurValid = props.blurValid;

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
	var Field = _react2['default'].createClass({
	    displayName: 'Field',

	    getInitialState: function getInitialState() {
	        this.fieldId = "rebix_field_" + fieldId;
	        fieldId++;
	        return {};
	    },

	    onChange: function onChange(newValue, compProps, e1, e2) {
	        var that = this;

	        var _ref = compProps || getComponentProps(that);

	        var valueName = _ref.valueName;
	        var parent = that.props.parent;

	        var changedState = {};
	        changedState[valueName] = newValue;
	        parent.setState(changedState);
	    },

	    render: function render() {

	        var that = this;
	        var props = that.props;

	        var parent = props.parent;
	        var bind = props.bind;
	        var onChange = props.onChange;
	        var id = props.id;
	        var label = props.label;
	        var component = props.component;
	        var blurValid = props.blurValid;
	        var className = props.className;
	        var errorMsg = props.errorMsg;

	        className = className || 'rebix_field';
	        var compProps = getComponentProps(that);
	        var RenderComponent = getRenderComponent(component);

	        if (!isStringEmpty(label) || !isStringEmpty(blurValid)) {
	            return _react2['default'].createElement(
	                'div',
	                { className: className },
	                errorMsg ? _react2['default'].createElement(
	                    'div',
	                    { className: 'rebix_f_err' },
	                    errorMsg
	                ) : null,
	                label ? _react2['default'].createElement(
	                    'label',
	                    { className: 'rebix_f_title', htmlFor: id },
	                    label
	                ) : null,
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'rebix_fw' },
	                    _react2['default'].createElement(RenderComponent, compProps)
	                )
	            );
	        } else {
	            _react2['default'].createElement(RenderComponent, compProps);
	        }
	    }

	});

	exports['default'] = Field;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function isStringEqual(a, b) {
	    return '' + a === '' + b;
	}

	function shallowEqual(objA, objB) {
	    if (objA === objB) {
	        return true;
	    }
	    var keysA = Object.keys(objA);
	    var keysB = Object.keys(objB);

	    if (keysA.length !== keysB.length) {
	        return false;
	    }
	    // Test for A's keys different from B.
	    var hasOwn = Object.prototype.hasOwnProperty;
	    for (var i = 0; i < keysA.length; i++) {
	        if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	            return false;
	        }
	    }
	    return true;
	}

	function shallowCompare(component, nextProps, nextState) {
	    return !shallowEqual(component.props, nextProps) || !shallowEqual(component.state, nextState);
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
	    var valueOptions = compProps.valueOptions;

	    var result = [];
	    for (var i = 0; i < valueOptions.length; i++) {
	        var obj = valueOptions[i];
	        var key = obj.key;
	        var text = obj.text;

	        result.push(_react2['default'].createElement(
	            'option',
	            { value: key, key: key },
	            text
	        ));
	    }
	    return result;
	}

	function renderRadioOptions(compProps, that) {
	    var valueData = compProps.valueData;
	    var valueOptions = compProps.valueOptions;
	    var id = compProps.id;
	    var className = compProps.className;

	    var name = id + "_name";
	    var result = [];
	    for (var i = 0; i < valueOptions.length; i++) {
	        var obj = valueOptions[i];
	        var key = obj.key;
	        var text = obj.text;

	        var isChecked = isStringEqual(valueData, key); // ('' + valueData) === ("" + key);
	        result.push(_react2['default'].createElement(
	            'label',
	            { className: 'rebix_radio_l', id: id + "_" + key, key: key },
	            _react2['default'].createElement('input', { type: 'radio', name: name, value: key, checked: isChecked, onChange: that.onChangeRadio }),
	            _react2['default'].createElement(
	                'span',
	                null,
	                text
	            )
	        ));
	    }
	    return result;
	}

	function renderCheckboxOptions(compProps, that) {
	    var valueData = compProps.valueData;
	    var valueOptions = compProps.valueOptions;
	    var id = compProps.id;
	    var className = compProps.className;

	    var name = id + "_name";
	    valueData = valueData || [];
	    var result = [];
	    for (var i = 0; i < valueOptions.length; i++) {
	        var obj = valueOptions[i];
	        var key = obj.key;
	        var text = obj.text;

	        var isChecked = isArrayContains(valueData, key);
	        result.push(_react2['default'].createElement(
	            'label',
	            { className: 'rebix_checkbox_l', id: id + "_" + key, key: key },
	            _react2['default'].createElement('input', { type: 'checkbox', name: name, value: key, checked: isChecked,
	                onChange: that.onChangeCheckboxGroup }),
	            _react2['default'].createElement(
	                'span',
	                null,
	                text
	            )
	        ));
	    }
	    return result;
	}

	var InputComponent = _react2['default'].createClass({
	    displayName: 'InputComponent',

	    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	        var isOk = shallowCompare(this, nextProps, nextState);
	        return isOk;
	    },

	    onChange: function onChange(e1, e2) {
	        var compProps = this.props;
	        var newValue = e1.target.value;
	        var onChange = compProps.onChange;
	        var component = compProps.component;

	        if (component === 'checkbox') {
	            newValue = e1.target.checked;
	        }

	        if (component === 'selectMulti') {
	            var selectedOptions = e1.target.selectedOptions;
	            newValue = getAttributeValues(selectedOptions);
	        }

	        onChange(newValue, compProps, e1, e2);
	    },

	    onChangeRadio: function onChangeRadio(e1, e2) {
	        var compProps = this.props;
	        var newValue = e1.target.value;
	        var onChange = compProps.onChange;

	        onChange(newValue, compProps, e1, e2);
	    },

	    onChangeCheckboxGroup: function onChangeCheckboxGroup(e1, e2) {
	        var compProps = this.props;
	        var valueData = compProps.valueData;
	        var onChange = compProps.onChange;

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
	    },

	    render: function render() {

	        var that = this;
	        var compProps = this.props;
	        var component = compProps.component;
	        var className = compProps.className;
	        var valueData = compProps.valueData;
	        var valueName = compProps.valueName;
	        var id = compProps.id;

	        className = className || 'rebix_f';
	        className = className + ' rebix_f_' + component;

	        if (component === 'textarea') {
	            return _react2['default'].createElement('textarea', { id: id, className: className, onChange: that.onChange, value: valueData });
	        }

	        if (component === 'select' || component === 'selectMulti') {
	            var isSelectMulti = component === 'selectMulti';
	            return _react2['default'].createElement(
	                'select',
	                { className: className,
	                    id: id,
	                    value: valueData,
	                    onChange: that.onChange,
	                    multiple: isSelectMulti },
	                renderSelectOptions(compProps)
	            );
	        }

	        if (component === 'radioGroup') {
	            return _react2['default'].createElement(
	                'div',
	                { className: className, id: id },
	                renderRadioOptions(compProps, that)
	            );
	        }

	        if (component === 'checkbox') {
	            return _react2['default'].createElement('input', { className: className,
	                type: 'checkbox',
	                id: id,
	                checked: valueData,
	                value: valueName,
	                onChange: that.onChange });
	        }

	        if (component === 'checkboxGroup') {
	            return _react2['default'].createElement(
	                'div',
	                { className: className, id: id },
	                renderCheckboxOptions(compProps, that)
	            );
	        }

	        return _react2['default'].createElement('input', { className: className,
	            type: component,
	            id: id,
	            value: valueData,
	            onChange: that.onChange });
	    }
	});

	module.exports = InputComponent;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var NotExistComponent = _react2['default'].createClass({
	    displayName: 'NotExistComponent',

	    render: function render() {
	        var component = this.props.component;

	        return _react2['default'].createElement(
	            'div',
	            null,
	            'NotDefinedComponentError [',
	            component,
	            ']'
	        );
	    }
	});

	module.exports = NotExistComponent;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (str) {
	    return !(str && str.length > 0);
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	// An internal function for creating assigner functions.

	"use strict";

	var nativeKeys = Object.keys || function (obj) {
	    var result = [];
	    if (!obj) {
	        for (var key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                result.push(key);
	            }
	        }
	    }
	    return result;
	};

	var createAssigner = function createAssigner(keysFunc, undefinedOnly) {
	    return function (obj) {
	        var length = arguments.length;
	        if (length < 2 || obj == null) return obj;
	        for (var index = 1; index < length; index++) {
	            var source = arguments[index],
	                keys = keysFunc(source),
	                l = keys.length;
	            for (var i = 0; i < l; i++) {
	                var key = keys[i];
	                if (!undefinedOnly || obj[key] === void 0) {
	                    obj[key] = source[key];
	                }
	            }
	        }
	        return obj;
	    };
	};

	var miniUnderscore = {};
	miniUnderscore.defaults = createAssigner(nativeKeys, true);
	miniUnderscore.assignObject = miniUnderscore.extend = miniUnderscore.assign = createAssigner(nativeKeys, false);

	module.exports = miniUnderscore;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	var RC_STORAGE = {};

	module.exports = {

	    getComponents: function getComponents() {
	        return RC_STORAGE;
	    },

	    saveComponent: function saveComponent(key, value) {
	        RC_STORAGE[key] = value;
	    }
	};

/***/ }
/******/ ])
});
;