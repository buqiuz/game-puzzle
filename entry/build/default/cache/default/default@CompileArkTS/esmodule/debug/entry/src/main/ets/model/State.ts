import type PictureItem from './PictureItem';
interface Direction {
    dr: number;
    dc: number;
}
;
export class State {
    pictures: PictureItem[];
    emptyIndex: number;
    g: number; // 从起点到当前状态的实际代价
    h: number; // 启发式代价
    f: number; // 总代价 f = g + h
    parent: State | null;
    targetMap: Map<string, number>; // 映射 pixelMap 到目标索引
    constructor(pictures: PictureItem[], emptyIndex: number, g: number, parent: State | null, targetMap: Map<string, number>) {
        this.pictures = pictures;
        this.emptyIndex = emptyIndex;
        this.g = g;
        this.targetMap = targetMap;
        this.h = State.calculateManhattanDistance(pictures, targetMap);
        this.f = this.g + this.h;
        this.parent = parent;
    }
    // 计算曼哈顿距离
    static calculateManhattanDistance(pictures: PictureItem[], targetMap: Map<string, number>): number {
        let distance = 0;
        const size = Math.sqrt(pictures.length);
        for (let i = 0; i < pictures.length; i++) {
            const current = pictures[i];
            const targetIndex = targetMap.get(current.pixelMap.toString());
            if (targetIndex === undefined || targetIndex === i)
                continue; // 已在正确位置或无效
            const currentRow = Math.floor(i / size);
            const currentCol = i % size;
            const targetRow = Math.floor(targetIndex / size);
            const targetCol = targetIndex % size;
            distance += Math.abs(currentRow - targetRow) + Math.abs(currentCol - targetCol);
        }
        return distance;
    }
    // 生成唯一的状态标识符
    getSignature(): string {
        return this.pictures.map(p => p.pixelMap.toString()).join(',');
    }
    // 生成邻居状态
    generateNeighbors(targetMap: Map<string, number>): State[] {
        const neighbors: State[] = [];
        const size = Math.sqrt(this.pictures.length);
        const row = Math.floor(this.emptyIndex / size);
        const col = this.emptyIndex % size;
        const directions: Direction[] = [
            { dr: -1, dc: 0 },
            { dr: 1, dc: 0 },
            { dr: 0, dc: -1 },
            { dr: 0, dc: 1 } // 右
        ];
        for (const dir of directions) {
            const newRow = row + dir.dr;
            const newCol = col + dir.dc;
            if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
                const newIndex = newRow * size + newCol;
                const newPictures = this.pictures.slice();
                // 交换空白块和目标块
                // [newPictures[this.emptyIndex], newPictures[newIndex]] = [newPictures[newIndex], newPictures[this.emptyIndex]];
                // Swap elements using a temporary variable
                const temp = newPictures[this.emptyIndex];
                newPictures[this.emptyIndex] = newPictures[newIndex];
                newPictures[newIndex] = temp;
                neighbors.push(new State(newPictures, newIndex, this.g + 1, this, targetMap));
            }
        }
        return neighbors;
    }
}
