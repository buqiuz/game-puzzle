interface PriorityQueueItem<T> {
    priority: number;
    value: T;
}
export class PriorityQueue<T> {
    private items: PriorityQueueItem<T>[];
    constructor() {
        this.items = [];
    }
    enqueue(value: T, priority: number) {
        const newItem: PriorityQueueItem<T> = { priority, value };
        let added = false;
        // Insert item in the correct position based on priority (cost)
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > newItem.priority) {
                this.items.splice(i, 0, newItem);
                added = true;
                break;
            }
        }
        // If the item has the highest priority, add it to the end
        if (!added) {
            this.items.push(newItem);
        }
    }
    dequeue(): T | undefined {
        return this.items.shift()?.value;
    }
    isEmpty(): boolean {
        return this.items.length === 0;
    }
}
