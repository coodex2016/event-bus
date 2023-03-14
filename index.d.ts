declare type Consumer = (data: any, topic: string) => void;
export class Subscriber {
    /**
     * 取消此订阅
     */
    cancel(): Boolean;
    destroy(): void;
}

export class Topic {
    constructor(topic: string);
    /**
     * 使用指定的消费者回调进行订阅
     * @param consumer 消费者
     */
    subscribe(consumer: Consumer): Subscriber;
    /**
     * 在主题上发布一份数据
     * @param data 数据
     */
    publish(data: any): void;
    /**
     * 清除此主题的所有订阅
     */
    clean(): void;
}

export class EventBus {
    constructor();
    /**
     * 在总线上获取指定的主题实例
     * @param name 主题名
     */
    topic(name: string): Topic;

    /**
     * 在总线上emit一条消息
     * @param msg 消息
     * @param data 数据
     */
    emit(msg: string, data: any): void;
    /**
     * 在总线上订阅一个事件
     * @param msg 消息
     * @param consumer  消费者
     */
    on(msg: string, consumer: Consumer): Subscriber;
    /**
     * 在总线上取消一个订阅
     * @param msg 消息
     * @param consumer 消费者 
     */
    off(msg: string, consumer: Consumer): void;
}