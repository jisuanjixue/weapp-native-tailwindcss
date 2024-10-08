/**
 * 使用选择器选择组件实例节点，返回匹配到的第一个组件实例对象
 * @param {String} selector 节点选择器
 * @param {Object} ctx 页面栈或组件的实例，默认为当前页面栈实例
 */
export const getCtx = (
    selector,
    ctx = getCurrentPages()[getCurrentPages().length - 1],
) => {
    const componentCtx = ctx.selectComponent(selector);

    if (!componentCtx) {
        throw new Error('无法找到对应的组件，请按文档说明使用组件');
    }

    return componentCtx;
};

const $wuxBackdrop = (selector = '#wux-backdrop', ctx?: any) =>
    getCtx(selector, ctx);

const $startRefresher = (selector = '#refresher', ctx?: any) =>
    getCtx(selector, ctx).triggerRefresh();
const $stopRefresher = (selector = '#refresher', ctx?: any) =>
    getCtx(selector, ctx).finishPullToRefresh();
const $stopLoader = (selector = '#refresher', ctx?: any, isEnd?: boolean) =>
    getCtx(selector, ctx).finishLoadmore(isEnd);

export { $wuxBackdrop, $startRefresher, $stopRefresher, $stopLoader };
