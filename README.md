# Event Bus

一个简易的消息总线库，提供两种风格的api。

## usage

`npm install @coodex/event-bus --save` or `yarn add @coodex/event-bus`

```javascript
import {EventBus} from '@coodex/event-bus'

const eventBus = new EventBus();

// 订阅
eventBus.on('msg', consumerFunction)
// or
eventBus.topic('msg').subscribe(consumerFunction)

// 发布
eventBus.emit('msg', data)
// or
eventBus.topic('msg').publish(data)

```
