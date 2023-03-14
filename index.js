let idIndex = 1;

/**
 * 订阅
 */
export class Subscriber{
    constructor(topic, id, consumer){
        this.id = id
        this.consumer = consumer
        this.topicInstance = topic
    }

    destroy(){
        this.id = null
        this.consumer = null
        this.topicInstance = null
    }

    cancel(){
        return this.topicInstance && this.topicInstance.cancel(this.id)
    }
}


/**
 * 主题
 */
export class Topic{
    constructor(topic){
        this.topic = topic
        this.subscribes = new Map();
    }

    /**
     * 订阅主题
     * @param {Function} consumer 
     * @returns Subscribe
     */
    subscribe(consumer){
        const key = this.topic + idIndex ++;
        const subscribe = new Subscriber(this, key, consumer);
        this.subscribes.set(key, subscribe);
        return subscribe;
    }

    /**
     * 在主题上发布数据
     * @param {*} data 
     */
    publish(data){
        this.subscribes.forEach(c =>{
            try {
                c && c.consumer && c.consumer(data, this.topic)
            } catch (e) {
                console.warn(['consumer execute failed for ', this.topic, '. data: '].join(''), data, e)
            }
        })
    }

    /**
     * 
     * @param {String} subscribeId 
     * @returns 
     */
    cancel(subscribeId){
        const subscriber = this.subscribes.get(subscribeId);
        if(subscriber){
            this.subscribes.delete(subscribeId)
            subscriber.destroy()
            return true
        } else {
            return false
        }
    }

    __cancelByCallback(consumer){
        this.subscribes.forEach(v => v && v.consumer === consumer && v.cancel() )
    }

    clean(){
        this.subscribes.forEach(v => {
            v.destroy()
        })
        this.subscribes.clear()
    }
}

/**
 * 总线
 */
export class EventBus {
    constructor() {
        this.topics = new Map()
    }

    topic(msg){
        if(this.topics.has(msg)){
            return this.topics.get(msg)
        } else {
            const topic = new Topic(msg)
            this.topics.set(msg, topic)
            return topic;
        }
    }

    emit(msg, data) {
        this.topic(msg).publish(data)
    }

    subscribe(msg, callback){
        return this.topic(msg).subscribe(callback);
    }

    on(msg, callback) {
        return this.subscribe(msg,callback)
    }

    off(msg, callback) {
        if (callback === undefined) {
            this.offAll(msg)
        } else if (this.topics.has(msg)) {
            this.topic(msg).__cancelByCallback(callback)
        }
    }

    offAll(msg) {
        this.topic(msg).clean()
    }
}
