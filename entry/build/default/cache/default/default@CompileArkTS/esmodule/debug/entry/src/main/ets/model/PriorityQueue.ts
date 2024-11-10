interface HeapNode<T> {
    item: T;
    priority: number;
}
export class PriorityQueue<T> {
    private heap: HeapNode<T>[] = [];
    enqueue(item: T, priority: number) {
        this.heap.push({ item, priority });
        this.bubbleUp(this.heap.length - 1);
    }
    dequeue(): T | undefined {
        if (this.heap.length === 0)
            return undefined;
        const top = this.heap[0].item;
        const end = this.heap.pop();
        if (this.heap.length > 0 && end) {
            this.heap[0] = end;
            this.bubbleDown(0);
        }
        return top;
    }
    isEmpty(): boolean {
        return this.heap.length === 0;
    }
    private bubbleUp(index: number) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.heap[parent].priority <= this.heap[index].priority)
                break;
            // 使用临时变量进行交换
            const temp = this.heap[parent];
            this.heap[parent] = this.heap[index];
            this.heap[index] = temp;
            index = parent;
        }
    }
    private bubbleDown(index: number) {
        const length = this.heap.length;
        while (true) {
            let smallest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            if (left < length && this.heap[left].priority < this.heap[smallest].priority) {
                smallest = left;
            }
            if (right < length && this.heap[right].priority < this.heap[smallest].priority) {
                smallest = right;
            }
            if (smallest === index)
                break;
            // 使用临时变量进行交换
            const temp = this.heap[smallest];
            this.heap[smallest] = this.heap[index];
            this.heap[index] = temp;
            index = smallest;
        }
    }
}
