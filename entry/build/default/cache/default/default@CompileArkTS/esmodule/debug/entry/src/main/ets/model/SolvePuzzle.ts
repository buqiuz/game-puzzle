import { State } from "@bundle:ohos.samples.gamepuzzle/entry/ets/model/State";
import { PriorityQueue } from "@bundle:ohos.samples.gamepuzzle/entry/ets/model/PriorityQueue";
import type PictureItem from './PictureItem';
export function solvePuzzle(initialPictures: PictureItem[]): PictureItem[] | null {
    const size = Math.sqrt(initialPictures.length);
    // 创建 targetMap：pixelMap.toString() -> targetIndex
    const targetMap = new Map<string, number>();
    initialPictures.forEach((picture, index) => {
        targetMap.set(picture.pixelMap.toString(), index);
    });
    // 找到空白块的索引（假设最后一个索引为目标空白块位置）
    const targetEmptyIndex = size * size - 1;
    let emptyIndex = initialPictures.findIndex(p => targetMap.get(p.pixelMap.toString()) === targetEmptyIndex);
    if (emptyIndex === -1)
        return null; // 无空白块，无法解决
    const startState = new State(initialPictures, emptyIndex, 0, null, targetMap);
    const openSet = new PriorityQueue<State>();
    openSet.enqueue(startState, startState.f);
    const closedSet = new Set<string>();
    while (!openSet.isEmpty()) {
        const currentState = openSet.dequeue();
        if (!currentState)
            break;
        // 检查是否达到目标状态
        if (currentState.h === 0) {
            // 回溯路径
            const path: State[] = [];
            let state: State | null = currentState;
            while (state) {
                path.push(state);
                state = state.parent;
            }
            path.reverse();
            // 返回最终拼图状态
            return path[path.length - 1].pictures;
        }
        closedSet.add(currentState.getSignature());
        // 生成邻居状态
        const neighbors = currentState.generateNeighbors(targetMap);
        for (const neighbor of neighbors) {
            if (closedSet.has(neighbor.getSignature()))
                continue;
            openSet.enqueue(neighbor, neighbor.f);
        }
    }
    // 无解
    return null;
}
export function solvePuzzleWithSteps(initialPictures: PictureItem[]): PictureItem[][] {
    const steps: PictureItem[][] = [];
    const size = Math.sqrt(initialPictures.length);
    const targetMap = new Map<string, number>();
    initialPictures.forEach((picture, index) => {
        targetMap.set(picture.pixelMap.toString(), index);
    });
    const targetEmptyIndex = size * size - 1;
    let emptyIndex = initialPictures.findIndex(p => targetMap.get(p.pixelMap.toString()) === targetEmptyIndex);
    if (emptyIndex === -1)
        return steps;
    const startState = new State(initialPictures, emptyIndex, 0, null, targetMap);
    const openSet = new PriorityQueue<State>();
    openSet.enqueue(startState, startState.f);
    const closedSet = new Set<string>();
    while (!openSet.isEmpty()) {
        const currentState = openSet.dequeue();
        if (!currentState)
            break;
        // 如果达到目标状态，将步骤加入并返回
        if (currentState.h === 0) {
            let state: State | null = currentState;
            while (state) {
                steps.unshift(state.pictures); // 从末尾回溯，将每一步加入步骤列表
                state = state.parent;
            }
            break;
        }
        closedSet.add(currentState.getSignature());
        const neighbors = currentState.generateNeighbors(targetMap);
        for (const neighbor of neighbors) {
            if (!closedSet.has(neighbor.getSignature())) {
                openSet.enqueue(neighbor, neighbor.f);
            }
        }
    }
    return steps;
}
