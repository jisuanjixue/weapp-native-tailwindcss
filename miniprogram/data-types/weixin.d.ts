declare namespace WeixinData {
    interface IDecryptDataRequest {
        iv: string;
        encryptedData: string;
    }
}

export default WeixinData;
