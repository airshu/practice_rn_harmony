import { JSON } from "@kit.ArkTS";

export class ArkTsDemo {



  test1(c: C | null) {

    const index = 10000
    let doubleNum = 1.0


    let x: number | null = null;
    x = 1;
    x = null;

    console.log("" + (c?.n ?? 0))

    let arr1: number[] = [1, 2, 3, 4, 5]
    let arr2: string[] = ['a', 'b', 'c', 'd', 'e']

    import("./ModuleDemo").then((obj: ESObject) => {
      console.log(obj.add(3, 5))
    }).catch((err:Error) => {
      console.error(err.message)
    })

    let obj: Record<string, number | string> = {
      'value': 123,
      'name': 'abc'
    }

  }


  testFun() {
    let sum = (x: number, y: number): number => {
      return x + y;
    }
    let sum1 = (x: number, y: number): number => x + y;
    let sum2 = (x: number, y: number) => x + y;

    let z = foo()
    console.log(`ArkTsDemo>>>>>>> first ${z()}`)
    console.log(`ArkTsDemo>>>>>>> second ${z()}`)
    console.log(`ArkTsDemo>>>>>>> third ${z()}`)

    let b1 = new B('addf', 'fad')
    let b2 = new B('addf', 'fad', getContext(this))


    let t: Test = new Test(2);
    // 对象字面量
    let c: C = {
      n: 1,
      s: 'hello'
    }

    let m1: Record<string, number> = { 'x': 1, 'y': 2 }
  }
}

function foo(): () => number {
  let count = 0;
  let g = (): number => {
    console.log(`ArkTsDemo>>>>>>> count ${count}`);
    count++;
    return count;
  };
  return g;
}


class B {
  public name: String = ''
  public priority: String = ''
  public context?: Context

  constructor(name: String, priority: String)

  constructor(name: String, priority: String, context: Context)

  // 构造函数重载签名
  constructor(name: String, priority: String, context?: Context) {
    this.name = name
    this.priority = priority
    this.context = context
  }

  foo(str: string) {
    let tempStr: Record<string, Object> = JSON.parse(str) as Record<string, Object>
    tempStr['a'] = "a"

  }
}

class C {
  n: number = 0
  s: string = ""


}

// 使用new
class Test {
  value: number = 1

  constructor(value: number) {
    this.value = value;
  }
}

interface Style {
  color: string; // 属性
}

interface AreaSize {
  calculateAreaSize: () => number; // 方法的声明
  someMethod: () => void; // 方法的声明
}


function addNum(a: number, b: number): void {
  // 使用lambda函数代替声明函数
  let logToConsole: (message: string) => void = (message: string): void => {
    console.log(message);
  }

  let result = a + b;

  logToConsole('result is ' + result);
}


interface T {
  // 接口中的方法声明
  foo: (value: number) => number
}


function shallowCopy(obj: object): object {
  let newObj: Record<string, Object> = {};
  for (let key of Object.keys(obj)) {
    newObj[key] = obj[key];
  }
  return newObj;
}

function deepCopy(obj: object): object {
  let newObj: Record<string, Object> | Object[] = Array.isArray(obj) ? [] : {};
  for (let key of Object.keys(obj)) {
    if (typeof obj[key] === 'object') {
      newObj[key] = deepCopy(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}