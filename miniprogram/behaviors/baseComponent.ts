import compareVersion from './compareVersion';
import computedBehavior from './computedBehavior';
import funcBehavior from './funcBehavior';
import relationsBehavior from './relationsBehavior';
import safeAreaBehavior from './safeAreaBehavior';
import safeSetDataBehavior from './safeSetDataBehavior';

const { platform, SDKVersion } = wx.getSystemInfoSync();
const libVersion = '2.6.6';

// check SDKVersion
if (platform === 'devtools' && compareVersion(SDKVersion, libVersion) < 0) {
    if (wx && wx.showModal) {
        wx.showModal({
            title: '提示',
            content: `当前基础库版本（${SDKVersion}）过低，无法使用 组件库，请更新基础库版本 >=${libVersion} 后重试。`,
        });
    }
}

interface MethodsType {
    [key: string]: Function;
}

interface OptionsType {
    // ...existing properties...
    options?: Record<string, unknown>;
}

interface OptionsType {
    lifetimes?: any;
    data?: Record<string, unknown>;
    externalClasses?: string[];
    behaviors?: any[];
    useSafeArea?: boolean; // Add this line
    useFunc?: boolean;
    useField?: boolean;
    useFieldButton?: boolean;
    useExport?: boolean;
    methods?: MethodsType;
    export?: Function;
    options?: Record<string, unknown>;
    properties?: Record<string, unknown> | undefined;
    // include other properties as needed
}

const baseComponent = (options: OptionsType = {}) => {
    // add default externalClasses
    options.externalClasses = [
        'wux-class',
        'wux-hover-class',
        ...(options.externalClasses = options.externalClasses || []),
    ];

    // add default behaviors
    options.behaviors = [
        relationsBehavior,
        safeSetDataBehavior,
        ...(options.behaviors = options.behaviors || []),
        computedBehavior, // make sure it's triggered
    ];

    // use safeArea
    if (options.useSafeArea) {
        options.behaviors = [...options.behaviors, safeAreaBehavior];
        delete options.useSafeArea;
    }

    // use func
    if (options.useFunc) {
        options.behaviors = [...options.behaviors, funcBehavior];
        delete options.useFunc;
    }

    // use field
    if (options.useField) {
        options.behaviors = [...options.behaviors, 'wx://form-field'];
        delete options.useField;
    }

    // use field button
    if (options.useFieldButton) {
        options.behaviors = [...options.behaviors, 'wx://form-field-button'];
        delete options.useFieldButton;
    }

    // use export
    if (options.useExport) {
        options.behaviors = [...options.behaviors, 'wx://component-export'];
        options.methods = {
            ['export']() {
                return this;
            },
            ...options.methods,
        };
        options['export'] = options.methods['export'];
        delete options.useExport;
    }

    // add default options
    options.options = {
        multipleSlots: true,
        addGlobalClass: true,
        ...options.options,
    };

    // 属性的类型（可以指定多个）
    options.properties &&
        Object.keys(options.properties).forEach((propKey) => {
            const prop = options.properties[propKey];
            if (Array.isArray(prop.type)) {
                prop.optionalTypes = prop.type;
            }
        });

    return Component(options);
};

export default baseComponent;
