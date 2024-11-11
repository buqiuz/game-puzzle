import type image from "@ohos:multimedia.image";
import PictureItem from "@bundle:ohos.samples.gamepuzzle/entry/ets/model/PictureItem";
export default class GameRules {
    public numArray: PictureItem[] = [];
    //交换指定索引的图片块和空白块的位置，实现移动图片的操作。
    itemChange(index: number, pictures: PictureItem[]): PictureItem[] {
        let cutCount = Math.sqrt(pictures.length);
        const EMPTY_PICTURE: PictureItem = new PictureItem(cutCount * cutCount - 1, {} as image.PixelMap);
        let emptyIndex = this.findEmptyIndex(pictures);
        let temp: PictureItem = pictures[index];
        pictures[index] = EMPTY_PICTURE;
        pictures[emptyIndex] = new PictureItem(temp.index, temp.pixelMap);
        return pictures;
    }
    //在图片数组中找到空白块的索引。
    findEmptyIndex(pictures: PictureItem[]): number {
        let cutCount = Math.sqrt(pictures.length);
        for (let i = 0; i < pictures.length; i++) {
            if (pictures[i].index === cutCount * cutCount - 1) {
                return i;
            }
        }
        return -1;
    }
    gameInit(index: number, pictures: PictureItem[]): PictureItem[] {
        let cutCount = Math.sqrt(pictures.length);
        let emptyIndex: number = -1;
        for (let i = 0; i < pictures.length; i++) {
            if (pictures[i].index == cutCount * cutCount - 1) {
                emptyIndex = i;
                break;
            }
        }
        let above = -1;
        let below = -1;
        let right = -1;
        let left = -1;
        if (index - cutCount >= 0) {
            above = index - cutCount;
            if (above == emptyIndex) {
                pictures = this.itemChange(index, pictures);
                return pictures;
            }
        }
        if (index + cutCount < cutCount * cutCount) {
            below = index + cutCount;
            if (below == emptyIndex) {
                pictures = this.itemChange(index, pictures);
                return pictures;
            }
        }
        if (index % cutCount != 0) {
            left = index - 1;
            if (left == emptyIndex) {
                pictures = this.itemChange(index, pictures);
                return pictures;
            }
        }
        if ((index + 1) % cutCount != 0) {
            right = index + 1;
            if (right == emptyIndex) {
                pictures = this.itemChange(index, pictures);
                return pictures;
            }
        }
        return pictures;
    }
    //开始游戏，随机打乱图片块的顺序。
    // gameBegin(pictures: PictureItem[]): PictureItem[] {
    //   AppStorage.set<boolean>('isGameStart', true);
    //   let len = pictures.length;
    //   let index: number, temp: PictureItem;
    //   while (len > 0) {
    //     index = Math.floor(Math.random() * len);
    //     temp = pictures[len - 1];
    //     pictures[len - 1] = pictures[index];
    //     pictures[index] = temp;
    //     len--;
    //   }
    //   return pictures;
    // }
    gameBegin(pictures: PictureItem[]): PictureItem[] {
        let cutCount = Math.sqrt(pictures.length);
        // 找到空白拼图块的索引
        let emptyIndex: number = -1;
        for (let i = 0; i < pictures.length; i++) {
            if (pictures[i].index == cutCount * cutCount - 1) {
                emptyIndex = i;
                break;
            }
        }
        // 如果没有找到空白拼图块，直接返回原数组
        if (emptyIndex == -1) {
            return pictures;
        }
        // 执行100次随机交换
        for (let i = 0; i < 60; i++) {
            // 可能的移动方向
            let possibleMoves: number[] = [];
            // 向上移动
            if (emptyIndex - cutCount >= 0) {
                possibleMoves.push(emptyIndex - cutCount);
            }
            // 向下移动
            if (emptyIndex + cutCount < pictures.length) {
                possibleMoves.push(emptyIndex + cutCount);
            }
            // 向左移动
            if (emptyIndex % cutCount != 0) {
                possibleMoves.push(emptyIndex - 1);
            }
            // 向右移动
            if ((emptyIndex + 1) % cutCount != 0) {
                possibleMoves.push(emptyIndex + 1);
            }
            // 随机选择一个方向进行交换
            let randIndex = Math.floor(Math.random() * possibleMoves.length);
            let swapIndex = possibleMoves[randIndex];
            // 交换空白块和选中的拼图块
            let temp = pictures[emptyIndex];
            pictures[emptyIndex] = pictures[swapIndex];
            pictures[swapIndex] = temp;
            // 更新空白块的索引
            emptyIndex = swapIndex;
        }
        return pictures;
    }
}
