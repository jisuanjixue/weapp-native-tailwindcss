import baseComponent from '../../behaviors/baseComponent';
import classNames from '../../behaviors/classNames';

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-scroll-number',
        },
        theme: {
            type: String,
            value: 'balanced',
        },
        value: {
            type: [String, Number],
            value: '',
        },
        color: {
            type: String,
            value: '#5677fc',
        },
        size: {
            type: Number,
            value: 32,
        },
        bold: {
            type: Boolean,
            value: false,
        },
        cellHeight: {
            type: Number,
            value: 32,
        },
        cellWidth: {
            type: String,
            value: 'auto',
        },
        animation: {
            type: String,
            value: 'cubic-bezier(0, 1, 0, 1)',
        },
        duration: {
            type: Number,
            value: 1.2,
        },
    },
    computed: {
        classes: [
            'prefixCls',
            function (prefixCls, theme) {
                const wrap = classNames(prefixCls, {
                    [`${prefixCls}--${theme}`]: theme,
                });
                const container = `${prefixCls}__container`;
                const scrollNumberItem = `${prefixCls}__scrollNumberItem`;
                const numberItem = `${prefixCls}__numberItem`;
                const numberDot = `${prefixCls}__numberDot`;
                const scrollAni = `${prefixCls}__scrollAni`;

                return {
                    wrap,
                    container,
                    numberItem,
                    numberDot,
                    scrollNumberItem,
                    scrollAni,
                };
            },
        ],
    },
    data: {
        valArr: [],
        aniArr: [],
        numArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        itemHeight: 0,
        fontSize: 0,
    },
    observers: {
        value: function (newVal) {
            let valArr = [];
            if (newVal) {
                valArr = newVal
                    .toString()
                    .split('')
                    .map((o) => {
                        return { val: o, isNaN: isNaN(o) };
                    });
            }
            this.setData({
                valArr: valArr,
                // fontSize: this.data.size,
            });
            this.getNumberHeight();
        },
    },
    methods: {
        getNumberHeight() {
            if (this.data.itemHeight > 0) {
                this.startScrollAni();
                return;
            }
            console.log('Starting getNumberHeight');

            const query = this.createSelectorQuery();
            query
                .select('.numberItem')
                .boundingClientRect((res) => {
                    if (res) {
                        this.setData({
                            itemHeight: res.height,
                        });
                    } else {
                        this.setData({
                            itemHeight: 10,
                        });
                    }
                })
                .exec(() => {
                    this.startScrollAni();
                });

            // Add a small delay to ensure the element exists
            // setTimeout(() => {
            // }, 100);
        },
        startScrollAni() {
            if (this.data.itemHeight <= 0) return;
            const aniArr = [];
            this.data.valArr.forEach((item, index) => {
                if (!item.isNaN) {
                    aniArr.push(
                        `transition-property: transform, opacity;`,
                        `transition-timing-function: ${this.data.animation};`,
                        `transition-duration: ${this.data.duration}s;`,
                        `transform: translateY(-${
                            this.data.itemHeight *
                            (this.data.numArr[parseInt(item.val)] + 10)
                        }px);`,
                        `opacity: 1;`,
                    );
                } else {
                    aniArr.push(null);
                }
            });

            this.setData({
                aniArr: aniArr,
            });
        },
    },
});
