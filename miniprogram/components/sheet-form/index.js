import baseComponent from '../../behaviors/baseComponent';

// import util from "../../utils/util"
// import dayUtil from "../../utils/dayjsUtils"

baseComponent({
    properties: {
        list: {
            type: Array,
            value: [],
        },
    },
    data: {
        list: [],
        selected: [],
        show: false,
        value: 0,
        currentId: '',
        actions: [
            {
                name: '换货',
            },
            {
                name: '漏发',
            },
        ],
    },
    computed: {},
    methods: {
        onChange(e) {
            const { list } = this.data;
            //     // Update the customDataDefine data with the new values
            this.setData({
                selected: e.detail,
            });
            const formData = list
                .filter((f) => e.detail.some((s) => s === f.id))
                .map((v) => ({
                    retailStoreOrderItemId: v.id,
                    type: v.type,
                    quantity: v.quantity,
                }));
            //     // Trigger the formDataChange event with the updated form data
            this.triggerEvent('onChange', { formData });
        },

        handSelect(e) {
            const { id } = e.currentTarget.dataset;
            this.setData({
                show: true,
                currentId: id,
            });
        },

        onClose() {
            this.setData({
                show: false,
                currentId: '',
            });
        },

        onSelect(event) {
            const { list, selected, currentId } = this.data;
            this.setData({
                list: list.map((v) => ({
                    ...v,
                    type: v.id === currentId ? event.detail.name : v.type,
                })),
            });
            if (selected.includes(currentId)) {
                const formData = list
                    .filter((f) => selected.some((s) => s === f.id))
                    .map((v) => ({
                        retailStoreOrderItemId: v.id,
                        quantity: v.quantity,
                        type: currentId === v.id ? event.detail.name : v.type,
                    }));
                this.triggerEvent('onChange', { formData });
            }
        },

        onNumberChange(e) {
            const { id, max } = e.currentTarget.dataset;
            const { list, selected } = this.data;
            if(e.detail.value > max){
                wx.showToast({
                    title: `申请数量超你的订单数量`,
                    icon: 'none',
                    duration: 2000,
                });
                this.setData({
                    list: list.map((v) => ({
                        ...v,
                        quantity: v.id === id ? max : v.quantity,
                    })),
                    
                });
                if (selected.includes(id)) {
                    const formData = list
                        .filter((f) => selected.some((s) => s === f.id))
                        .map((v) => ({
                            retailStoreOrderItemId: v.id,
                            type: v.type,
                            quantity: id === v.id ? max : v.quantity,
                        }));
                    this.triggerEvent('onChange', { formData });
                }

            } else {
                this.setData({
                    list: list.map((v) => ({
                        ...v,
                        quantity: v.id === id ? e.detail.value : v.quantity,
                    })),
                });
    
                if (selected.includes(id)) {
                    const formData = list
                        .filter((f) => selected.some((s) => s === f.id))
                        .map((v) => ({
                            retailStoreOrderItemId: v.id,
                            type: v.type,
                            quantity: id === v.id ? e.detail.value : v.quantity,
                        }));
                    this.triggerEvent('onChange', { formData });
                }
            }
        },
    },
    created() {},
    attached() {},
});
