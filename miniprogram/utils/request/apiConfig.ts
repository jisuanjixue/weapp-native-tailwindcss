let baseUrlPrefix = '';
let baseFilePrefix = '';
const hostApiDev = 'https://retail-store-api.longdanet.com';
const hostApiTrial = 'https://retail-store-api.longdanet.com';
const hostApiProd = 'https://retail-store-api.longdanet.com';
const file = 'https://retail-store-api.longdanet.com';
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
