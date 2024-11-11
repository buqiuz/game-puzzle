import { PriorityQueue } from "@bundle:ohos.samples.gamepuzzle/entry/ets/model/PriorityQueue";
interface OpenSetItem {
    cost: number;
    state: number[];
    path: number[];
}
export default class PuzzleSolver {
    private _splitSize: number;
    constructor(splitSize: number) {
        this._splitSize = splitSize;
    }
    // 计算曼哈顿距离
    manhattanDistance(state: number[], goalPos: Map<number, [
        number,
        number
    ]>): number {
        let distance = 0;
        for (let index = 0; index < state.length; index++) {
            const value = state[index];
            if (value !== 0) { // 空白块不计算距离
                const goalPosition = goalPos.get(value)!;
                const goalX = goalPosition[0];
                const goalY = goalPosition[1];
                const curX = Math.floor(index / this._splitSize);
                const curY = index % this._splitSize;
                distance += Math.abs(goalX - curX) + Math.abs(goalY - curY);
            }
        }
        return distance;
    }
    // 获取空白块位置
    getEmptyIndex(state: number[]): number {
        return state.indexOf(this._splitSize ** 2 - 1);
    }
    // 交换位置
    swap(state: number[], i: number, j: number): number[] {
        const newState = state.slice();
        const temp = newState[i];
        newState[i] = newState[j];
        newState[j] = temp;
        return newState;
    }
    //   // A* 搜索算法
    //   aStar(startState: number[]): number[] | null {
    //     // const goalState: number[] = Array.from({ length: this._splitSize ** 2 }, (_, i) => i);
    //     const goalState: number[] = [];
    //     for (let i = 0; i < this._splitSize ** 2; i++) {
    //       goalState.push(i);
    //     }
    //
    //
    //     // 定义目标状态的位置
    //     const goalPos = new Map<number, [number, number]>();
    //     for (let i = 0; i < goalState.length; i++) {
    //       const value = goalState[i];
    //       goalPos.set(value, [Math.floor(i / this._splitSize), i % this._splitSize]);
    //     }
    //
    //     const openSet: OpenSetItem[] = [];
    //     openSet.push({
    //       cost: this.manhattanDistance(startState, goalPos),
    //       state: startState,
    //       path: []
    //     });
    //
    //     const visited = new Set<string>();
    //
    //     while (openSet.length > 0) {
    //       openSet.sort((a, b) => a.cost - b.cost); // 按照代价升序排序
    //       const current = openSet.shift()!; // 获取最小代价的节点
    //       const state = current.state;
    //       const path = current.path;
    //       visited.add(JSON.stringify(state));
    //
    //       // 如果达到目标状态
    //       if (JSON.stringify(state) === JSON.stringify(goalState)) {
    //         return path;
    //       }
    //
    //       const emptyIndex = this.getEmptyIndex(state);
    //       const x = Math.floor(emptyIndex / this._splitSize);
    //       const y = emptyIndex % this._splitSize;
    //
    //       // 上、下、左、右移动方向
    //       const directions = [
    //         [-1, 0], [1, 0], [0, -1], [0, 1]
    //       ];
    //
    //       for (let i = 0; i < directions.length; i++) {
    //         const dx = directions[i][0];
    //         const dy = directions[i][1];
    //
    //         const nx = x + dx;
    //         const ny = y + dy;
    //         if (nx >= 0 && nx < this._splitSize && ny >= 0 && ny < this._splitSize) {
    //           const neighborIndex = nx * this._splitSize + ny;
    //           const newState = this.swap(state, emptyIndex, neighborIndex);
    //
    //           if (!visited.has(JSON.stringify(newState))) {
    //             const newPath = path.slice();
    //             newPath.push(neighborIndex);
    //             const newCost = newPath.length + this.manhattanDistance(newState, goalPos);
    //             openSet.push({ cost: newCost, state: newState, path: newPath });
    //           }
    //         }
    //       }
    //     }
    //
    //     return null;
    //   }
    // }
    // A* 搜索算法
    async aStar(startState: number[]): Promise<number[] | null> {
        const goalState: number[] = [];
        for (let i = 0; i < this._splitSize ** 2; i++) {
            goalState.push(i);
        }
        // 定义目标状态的位置
        const goalPos = new Map<number, [
            number,
            number
        ]>();
        for (let i = 0; i < goalState.length; i++) {
            const value = goalState[i];
            goalPos.set(value, [Math.floor(i / this._splitSize), i % this._splitSize]);
        }
        const openSet = new PriorityQueue<OpenSetItem>();
        openSet.enqueue({
            cost: this.manhattanDistance(startState, goalPos),
            state: startState,
            path: []
        }, this.manhattanDistance(startState, goalPos));
        const visited = new Set<string>();
        while (!openSet.isEmpty()) {
            const current = openSet.dequeue()!; // 获取最小代价的节点
            const state = current.state;
            const path = current.path;
            visited.add(JSON.stringify(state));
            // 如果达到目标状态
            if (JSON.stringify(state) === JSON.stringify(goalState)) {
                return path;
            }
            const emptyIndex = this.getEmptyIndex(state);
            const x = Math.floor(emptyIndex / this._splitSize);
            const y = emptyIndex % this._splitSize;
            // 上、下、左、右移动方向
            const directions = [
                [-1, 0], [1, 0], [0, -1], [0, 1]
            ];
            for (let i = 0; i < directions.length; i++) {
                const dx = directions[i][0];
                const dy = directions[i][1];
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < this._splitSize && ny >= 0 && ny < this._splitSize) {
                    const neighborIndex = nx * this._splitSize + ny;
                    const newState = this.swap(state, emptyIndex, neighborIndex);
                    if (!visited.has(JSON.stringify(newState))) {
                        const newPath = path.slice();
                        newPath.push(neighborIndex);
                        const newCost = newPath.length + this.manhattanDistance(newState, goalPos);
                        openSet.enqueue({
                            cost: newCost, state: newState, path: newPath
                        }, newCost);
                    }
                }
            }
        }
        return null;
    }
}
