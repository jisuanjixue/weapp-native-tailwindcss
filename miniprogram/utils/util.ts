import host from '../utils/request/apiConfig';
import tokenUtils from './tokenUtils';
import utils from './util';

interface ISelectListItem {
    text: string;
    value: any;
}

const formatNumber = (n: number) => {
    const s = n.toString();
    return s[1] ? s : '0' + s;
};

const querySelect = (selector: any) => {
    return new Promise((resolve) => {
        // 获取Image组件的高度-API
        const query = wx.createSelectorQuery();
        query.select(selector).boundingClientRect();
        // 执行拿回结果
        query.exec((res) => {
            resolve(res);
        });
    });
};

/*获取当前页url*/
const getCurrentPageUrl = (): string => {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const url = currentPage.route;
    return url;
};

const isNullOrEmpty = (value?: any) =>
    isType(value, 'undefined') || isType(value, 'null') || value === '';

const splitToArray = (
    value: string | undefined,
    splitter: string = ',',
): string[] => {
    if (isNullOrEmpty(value)) return [];

    return value?.split(splitter) || [];
};

const isType = (data: any, type: string): boolean => {
    const typeObj = {
        '[object String]': 'string',
        '[object Number]': 'number',
        '[object Boolean]': 'boolean',
        '[object Null]': 'null',
        '[object Undefined]': 'undefined',
        '[object Object]': 'object',
        '[object Array]': 'array',
        '[object Function]': 'function',
        '[object Date]': 'date', // Object.prototype.toString.call(new Date())
        '[object RegExp]': 'regExp',
        '[object Map]': 'map',
        '[object Set]': 'set',
        '[object HTMLDivElement]': 'dom', // document.querySelector('#app')
        '[object WeakMap]': 'weakMap',
        '[object Window]': 'window', // Object.prototype.toString.call(window)
        '[object Error]': 'error', // new Error('1')
        '[object Arguments]': 'arguments',
    };

    const name = Object.prototype.toString.call(data); // 借用Object.prototype.toString()获取数据类型
    const typeName = typeObj[name as keyof typeof typeObj] || '未知类型'; // 匹配数据类型
    return typeName === type; // 判断该数据类型是否为传入的类型
};
const unique = <T>(arr: T[], key: keyof T | ((e: T) => any)): T[] => {
    if (!arr) return arr;
    if (utils.isType(key, 'undefined')) return [...new Set(arr)];
    const map = {
        string: (e: T) => e[key as keyof T],
        function: (e: T) =>
            utils.isType(key, 'function') ? key(e) : e[key as keyof T],
    };
    const fn = map[typeof key];
    const obj = arr.reduce(
        (o, e) => ((o[fn(e)] = e), o),
        {} as Record<string, T>,
    );
    return Object.values(obj);
};

const arrGroup = <T, K extends keyof any>(
    arr: T[],
    fn: (item: T) => K,
): Array<Array<T>> => {
    const obj: Record<K, T[]> = {} as Record<K, T[]>;
    arr.forEach((item) => {
        const key = fn(item);
        obj[key] = obj[key] || [];
        obj[key].push(item);
    });
    return Object.values(obj);
};

const processData = (data: any) => {
    return data?.map((v) => {
        const processedChildren = v?.children ? processData(v?.children) : [];
        return {
            name: v?.item?.name,
            id: v?.item?.id,
            children: processedChildren,
        };
    });
};

function deleteChildren(arr: any[]) {
    const childs = arr;
    for (let i = childs.length; i--; i > 0) {
        if (childs[i].children) {
            if (childs[i].children.length) {
                this.deleteChildren(childs[i].children);
            } else {
                delete childs[i].children;
            }
        }
    }
    return arr;
}

function isValidChinesePhoneNumber(phoneNumber: string) {
    const regex = /^1[3-9]\d{9}$/;
    return regex.test(phoneNumber);
}

const findLocation = (data: any, value: string) => {
    for (let i = 0; i < data?.length; i++) {
        if (data?.[i]?.value === value) {
            return data?.[i]?.text;
        }
        if (data?.[i]?.children) {
            const found: any = findLocation(data?.[i]?.children, value);
            if (found) {
                return data?.[i]?.text + found;
            }
        }
    }
};
const enumToListItem = (data: any): ISelectListItem[] =>
    Object.entries(data)
        .filter(([, value]) => isType(value, 'number'))
        .map(([text, value]) => ({ text, value }));

const getFileType = (fileName: string) => {
    let suffix = ''; // 后缀获取
    let result = '' as string | undefined; // 获取类型结果
    if (fileName) {
        const flieArr = fileName.split('.'); // 根据.分割数组
        suffix = flieArr[flieArr.length - 1]; // 取最后一个
    }
    if (!suffix) return false; // fileName无后缀返回false
    suffix = suffix.toLocaleLowerCase(); // 将后缀所有字母改为小写方便操作
    // 匹配图片
    const imgList = ['png', 'jpg', 'jpeg', 'bmp', 'gif']; // 图片格式
    result = imgList.find((item) => item === suffix);
    if (result) return 'image';
    // 匹配txt
    const txtList = ['txt'];
    result = txtList.find((item) => item === suffix);
    if (result) return 'txt';
    const zipList = ['rar', 'zip', '7z'];
    result = zipList.find((item) => item === suffix);
    if (result) return 'zip';
    // 匹配视频
    const videoList = [
        'mp4',
        'm2v',
        'mkv',
        'rmvb',
        'wmv',
        'avi',
        'flv',
        'mov',
        'm4v',
    ];
    result = videoList.find((item) => item === suffix);
    if (result) return 'video';
    // 匹配音频
    const radioList = ['mp3', 'wav', 'wmv'];
    result = radioList.find((item) => item === suffix);
    if (result) return 'radio';

    const file = ['doc', 'docx', 'pdf', 'ppt', 'pptx', 'xls', 'xlsx'];
    result = file.find((item) => item === suffix);
    if (result) return 'file';
    // 其他文件类型
    return 'other';
};

const delay = (timeout = 200) =>
    new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });

const formatLaber = (html: string) => {
    return html?.replace(/<(img).*?(\/>|<\/img>)/g, function (mats) {
        if (mats.indexOf('style') < 0) {
            return mats?.replace(
                /<\s*img/,
                '<img style="max-width:100%;height:auto;"',
            );
        } else {
            return mats?.replace(
                /style=("|')/,
                'style=$1max-width:100%;height:auto;',
            );
        }
    });
};

const formatStyle = (html: string) => {
    return html?.replace(/style="([^"]*)"/g, function (match, p1) {
        return `style="${p1}; line-height: 2.2; font-size: 14px "`;
    });
};

const formatImg = (html: string) => {
    return html?.replace(/<img[^>]+src="([^">]+)"/g, function (mats) {
        return mats?.replace(/\/upload/, `${host.api.baseUrl}/upload`);
    });
};

/**
 * @param {string} uploadFile 需要上传的文件
 * @description 上传到指定服务器
 * @return {Promise} 上传图片的promise
 */
const uploadFile = (uploadFile: string) => {
    const token = tokenUtils.getToken();
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: `${host.api.fileUrl}/file`, // 上传的服务器接口地址
            filePath: uploadFile,
            name: 'file', //上传的所需字段，后端提供
            header: {
                // "Content-Type": "multipart/form-data",
                Authorization: `bearer ${token?.accessToken}`,
            },
            success: (res) => {
                // 上传完成操作
                const data = JSON.parse(res.data);
                const { fileUrl, fileName, fileExtension, id } = data.data;
                resolve({
                    fileUrl,
                    fileName,
                    fileExtension,
                    id,
                });
            },
            fail: (err) => {
                //上传失败：修改pedding为reject
                reject(err);
            },
        });
    });
};

const promisic = (func) => {
    return function (params = {}) {
        return new Promise((resolve, reject) => {
            const args = Object.assign(params, {
                success: (res) => {
                    resolve(res);
                },
                fail: (error) => {
                    reject(error);
                },
            });
            func(args);
        });
    };
};

const px2rpx = function (pxNumber) {
    const { screenWidth } = wx.getSystemInfoSync();
    return (750 / screenWidth) * pxNumber;
};

export const mapVirtualToProps = (
    { items, itemHeight },
    { startIndex, endIndex },
) => {
    const visibleItems =
        endIndex > -1 ? items.slice(startIndex, endIndex + 1) : [];

    // style
    const height = items.length * itemHeight;
    const paddingTop = startIndex * itemHeight;

    return {
        virtual: {
            items: visibleItems,
            style: `height: ${height}px; padding-top: ${paddingTop}px; box-sizing: border-box;`,
        },
    };
};

export const getVisibleItemBounds = (
    viewTop,
    viewHeight,
    itemCount,
    itemHeight,
    itemBuffer,
) => {
    // visible list inside view
    const listViewTop = Math.max(0, viewTop);

    // visible item indexes
    const startIndex = Math.max(0, Math.floor(listViewTop / itemHeight));
    const endIndex = Math.min(
        startIndex + Math.ceil(viewHeight / itemHeight) + itemBuffer - 1,
        itemCount,
    );

    return {
        startIndex,
        endIndex,
    };
};

export default {
    formatNumber,
    getCurrentPageUrl,
    isType,
    querySelect,
    unique,
    arrGroup,
    processData,
    getFileType,
    formatLaber,
    deleteChildren,
    formatImg,
    findLocation,
    formatStyle,
    uploadFile,
    isValidChinesePhoneNumber,
    promisic,
    splitToArray,
    delay,
    px2rpx,
    enumToListItem,
    mapVirtualToProps,
    getVisibleItemBounds,
};
