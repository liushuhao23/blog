/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-10-15 21:09:58
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-24 22:31:42
 */

function classDecorator<T extends {new(...args:any[]): Record<any, any>}>(constructor:T) {
  return class extends constructor {
      newProperty = "new property";
      hello = "override";
  }
}

function DefaultValue(target: any, propertyName: string) {
	target[propertyName] =  88
	// return function () {
	// 	console.log('输出',  propertyName, '411', value)
	// 	target[propertyName] = value;
	// }
}

function tstts(property: any) {
    return (target: any, propertyKey: number) => {
        target[propertyKey] = property;
    }
}

// @classDecorator
class Queue {
  items: Record<any, any>
  count: number;
  @DefaultValue
  lowestCount: number | undefined;
	constructor(m: string) {
		this.items = {};
		this.count = 0; //最新的
		// this.lowestCount = 0; //最旧的
		// this.hello = m
	}

	// @tstts
	getItem(x: string, val: any) {
		(this as any)[x] = val
		return (this as any)[x]
	}

	// 向双端队列后端添加数据
	addBack(element: any) {
		this.items[this.count] = element;
		this.count++;
	}

	// 向双端队列前端添加数据
	// 存在三种场景
	// 1.双端队列是空的,就直接调用addBack方法
	// 2.一个元素已经被从双端队列的前端移除,也就是说lowestCount属性会大于等于1
	// 3.lowestCount为0
	addFront(element: any) {
		if (this.isEmpty()) {
			this.addBack(element);
		} else if (this.lowestCount > 0) {
			this.lowestCount--;
			this.items[this.lowestCount] = element;
		} else {
			for (let i = this.count; i > 0; i--) {
				this.items[i] = this.items[i - 1];
			}
			this.count++;
			this.lowestCount = 0;
			this.items[0] = element;
		}
	}

	// 查看双端队列是否为空
	isEmpty() {
		return this.count - this.lowestCount === 0;
	}

	// 查看双端队列有多少数据
	size() {
		return this.count - this.lowestCount;
	}

	// 清空双端队列
	clear() {
		this.items = {};
		this.count = 0;
		this.lowestCount = 0;
	}

	// 删除双端队列前端的第一个元素
	removeFront() {
		const result = this.items[this.lowestCount];
		delete this.items[this.lowestCount];
		this.lowestCount++;
		return result;
	}

	// 删除双端队列后端的第一个元素
	removeBack() {
		this.count--;
		const result = this.items[this.count];
		delete this.items[this.count];
		return result;
	}

	// 返回双端队列前端的第一个元素
	peekFront() {
		if (this.isEmpty()) {
			return undefined;
		}
		return this.items[this.lowestCount];
	}

	// 返回双端队列后端的第一个元素
	peekBack() {
		return this.items[this.count - 1];
	}
}
// console.log(new Queue());
export default Queue
