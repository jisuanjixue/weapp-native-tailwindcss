import host from '../utils/request/apiConfig';
import request from '../utils/request/request';

declare const ResizeModes: ['Crop', 'Pad', 'BoxPad', 'Max', 'Min', 'Stretch'];
export declare type ResizeMode = (typeof ResizeModes)[number];

declare const FormatTypes: ['jpg', 'png', 'bmp', 'gif'];
export declare type FormatType = (typeof FormatTypes)[number];

interface IImageSharpProps {
    width?: number;
    height?: number;
    rmode?: ResizeMode;
    format?: FormatType;
}

const routePrefix = `${host.file}/file`;

const genUploadAction = (path: string, fileName?: string) =>
    `${routePrefix}/upload?path=${path}&fileName=${fileName || ''}`;

const genFileUrl = (path: string) => `${host.file}/upload/${path}`;

const genImageQueryString = (props?: IImageSharpProps) => {
    const params: string[] = [];
    if (props) {
        const { width, height, rmode, format = 'png' } = props;
        if (width) {
            params.push(`width=${width}`);
        }
        if (height) {
            params.push(`height=${height}`);
        }
        if (rmode) {
            params.push(`rmode=${rmode}`);
        }

        params.push(`format=${format}`);
    }
    return params.join('&');
};

const genImageUrl = (imagePath?: string, props?: IImageSharpProps): string => {
    if (!imagePath) return '';

    if (['http', 'data:image'].some((val) => imagePath.startsWith(val)))
        return imagePath;

    let path = `${imagePath}`;
    if (path) {
        const queryString = genImageQueryString(props);

        if (queryString) {
            path = `${path}?${queryString}`;
        }
    }
    return genFileUrl(path);
};

const uploadBase64 = (path: string, base64: string | undefined) =>
    request.post(`${routePrefix}/upload-base64?path=${path}`, {
        base64,
    });
const uploadBase64Anonymous = (path: string, base64: string | undefined) =>
    request.post(`${routePrefix}/upload-base64-anonymous?path=${path}`, {
        base64,
    });

const upload = (path: string, blob: Blob, fileName = '') => {
    const formData = new FormData();
    formData.append('file', blob);
    return request.post(genUploadAction(path, fileName), formData);
};

const deleteAttachment = (id: string) => request.delete(`${routePrefix}/${id}`);

export default {
    upload,
    uploadBase64,
    uploadBase64Anonymous,
    genFileUrl,
    genImageQueryString,
    genImageUrl,
    genUploadAction,
    deleteAttachment,
};
