import baseComponent from '../../behaviors/baseComponent';
import classNames from '../../behaviors/classNames';
import styleToCssString from '../../behaviors/styleToCssString';

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-wingblank',
        },
        size: {
            type: String,
            value: 'default',
        },
        bodyStyle: {
            type: [String, Object],
            value: '',
            observer(newVal) {
                this.setData({
                    extStyle: styleToCssString(newVal),
                });
            },
        },
    },
    data: {
        extStyle: '',
    },
    computed: {
        classes: [
            'prefixCls, size',
            function (prefixCls, size) {
                const wrap = classNames(prefixCls, {
                    [`${prefixCls}--${size}`]: size,
                });

                return {
                    wrap,
                };
            },
        ],
    },
});
