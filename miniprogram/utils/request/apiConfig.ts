let baseUrlPrefix = '';
let baseFilePrefix = '';
const hostApiDev = '';
const hostApiTrial = '';
const hostApiProd = '';
const file = '';
const accountInfo = wx.getAccountInfoSync();
const env = accountInfo.miniProgram.envVersion;

switch (env) {
    case 'develop':
        baseUrlPrefix = hostApiDev;
        baseFilePrefix = file;
        break;
    case 'trial':
        baseUrlPrefix = hostApiTrial;
        baseFilePrefix = file;
        break;
    case 'release':
        baseUrlPrefix = hostApiProd;
        baseFilePrefix = file;
        break;
}

const api = {
    baseUrl: baseUrlPrefix,
    fileUrl: baseFilePrefix,
    //其他相关变量
};

export default { api, file: baseFilePrefix };
