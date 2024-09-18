// components/coolui-scroller-nav/item/index.js
Component({
    relations: {
        '../index/index': {
            type: 'parent',
            linked: function (target) {
                // console.log(target);
            },
        },
    },
    properties: {
        title: {
            type: String,
        },
        name: {
            type: String,
        },
        type: {
            type: String,
        },
        value: {
            type: String,
        },
        options: {
            type: Array,
        },
        color: {
            type: String,
        },
        activeColor: {
            type: String,
        },
        multiple: {
            type: Boolean,
            value: false,
        },
        actionBar: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        isDropdownShow: false,
        overlayDuration: 0,
        dropAnimation: {},
        select: null,
        selectArray: [],
    },
    methods: {
        onAction() {
            const { name, value } = this.data;
            this.triggerEvent('action', { name, value });
        },
        toggle() {
            const { name, value, isDropdownShow } = this.data;
            var nodes = this.getRelationNodes('../index/index');
            this.setData({
                overlayDuration: nodes[0].data.overlayDuration,
            });
            nodes[0].toggle(name);
            this.triggerEvent('title', { name, value, isDropdownShow });
        },
        toggleDropdown(active) {
            if (active === this.data.name) {
                if (this.data.isDropdownShow === false) {
                    if (this.data.multiple) {
                        this.setData({
                            selectArray: this.data.value
                                ? this.data.value.split(',')
                                : [],
                            isDropdownShow: true,
                        });
                    } else {
                        this.setData({
                            select: parseInt(this.data.value),
                            isDropdownShow: true,
                        });
                    }
                } else {
                    this.setData({
                        isDropdownShow: false,
                    });
                }
            } else {
                this.setData({
                    isDropdownShow: false,
                });
            }
        },
        select(e) {
            var nodes = this.getRelationNodes('../index/index');
            if (this.data.multiple) {
                const { selectArray } = this.data;
                const { id } = e.target.dataset;
                const isIn = this.inArray(id, selectArray);
                if (isIn === false) {
                    selectArray.push(e.target.dataset.id);
                } else {
                    selectArray.splice(isIn, 1);
                }
                this.setData({
                    selectArray: selectArray.sort(),
                });
            } else {
                if (!this.data.actionBar) {
                    const value =
                        e.target.dataset.id != this.data.select
                            ? e.target.dataset.id
                            : null;
                    this.triggerEvent('select', { index: value });
                    this.setData(
                        {
                            select:
                                e.target.dataset.id != this.data.select
                                    ? e.target.dataset.id
                                    : null,
                            value: value,
                        },
                        () => {
                            setTimeout(() => {
                                nodes[0].toggle(null);
                            }, 200);
                        },
                    );
                } else {
                    this.setData({
                        select:
                            e.target.dataset.id != this.data.select
                                ? e.target.dataset.id
                                : null,
                    });
                }
            }
        },
        inArray(search, array) {
            for (var i in array) {
                if (array[i] == search) {
                    return i;
                }
            }
            return false;
        },
        clear() {
            var nodes = this.getRelationNodes('../index/index');

            this.setData(
                {
                    value: '',
                    selectArray: [],
                },
                () => {
                    setTimeout(() => {
                        nodes[0].toggle(null);
                    }, 500);
                },
            );
        },
        confirm() {
            var nodes = this.getRelationNodes('../index/index');
            if (this.data.multiple) {
                this.setData(
                    {
                        value: this.data.selectArray.join(','),
                    },
                    () => {
                        setTimeout(() => {
                            nodes[0].toggle(null);
                        }, 500);
                    },
                );
            } else {
                this.setData(
                    {
                        value: this.data.select,
                    },
                    () => {
                        setTimeout(() => {
                            nodes[0].toggle(null);
                        }, 500);
                    },
                );
            }
        },
    },
    ready() {},
});
