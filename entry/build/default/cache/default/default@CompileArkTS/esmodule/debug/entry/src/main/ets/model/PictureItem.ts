import type image from "@ohos:multimedia.image";
export default class PictureItem {
    public index: number;
    public pixelMap: image.PixelMap;
    constructor(index: number, pixelMap: image.PixelMap) {
        this.index = index;
        this.pixelMap = pixelMap;
    }
}
