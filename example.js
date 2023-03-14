import { EventBus } from "./index"

function listener(data, msg) {
    console.log(data, msg)
}

function listener2(data, msg) {
    listener(data, msg)
}

const eventBus = new EventBus()

eventBus.on('aaa', listener)
eventBus.on('aaa', listener)
eventBus.on('bbb', listener)

eventBus.emit('aaa', 'hello event bus')
eventBus.emit('bbb', 'bbbb')

console.log(eventBus.topics)
eventBus.off('aaa', listener)
eventBus.on('bbb', listener2)
eventBus.emit('aaa', 'hello event bus')
eventBus.emit('bbb', 'bbbb')
console.log(eventBus.topics)

console.log('======== case 2 =========')
const eventBus2 = new EventBus();
const topicAAA = eventBus2.topic('aaa');
const topicBBB = eventBus2.topic('bbb');
const s1 = topicAAA.subscribe(listener), s2 = topicAAA.subscribe(listener), s3 = topicBBB.subscribe(listener2)
console.log(eventBus2.topics)
topicAAA.publish("hello")
topicBBB.publish("hello")
s1.cancel()
s2.cancel()
s3.cancel()
console.log(eventBus2.topics)
topicAAA.publish("hello")
topicBBB.publish("hello")



