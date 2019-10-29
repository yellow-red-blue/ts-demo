# ts-axios-demo
## ts intro
###1. 基础类型
```
let isDone: boolean = true
isDone = 'string' // errors
// 注意使用构造函数Boolean 创造的对象不是布尔值
isDone = new Boolean(1) // 返回的是一个boolean object
let index: number = 12

let str: string = 'string'

let arr: Array<number> = [2, 4]

let arr1: number[] = [1, 3]

元组
let x: [string, number]
x = ['str', 8]
x = [8, 'str'] // Error


枚举
enum Color {Red, Blue, Green}
let c: Color = Color.Red // 0
let b = Color[1] // 'Blue'

// 指定位置
enum Color {Red, Blue=3, Green}
<!-- 默认从0开始 -->
console.log(Color.Red) // 0
console.log(Color.Blue) // 3

// 空值
// 在ts中 可以用void便是没有任何返回值的函数
function alertName(): void {
  alert('9')
}

// Null 和Undefined
// 在typescript中 可以使用使用null和undefined来定义原始数据类型
let u: undefined = undefined
let n: null = null

// 与void的区别是undefined和null是所有类型的子类型，也就是说undefined/null 类型的变量可以赋值给number类型的变量
let n: undefined = undefined
let num: number = n

```
#### any类型
在任意值上访问任何属性都是被允许的
```
let a: any  = 'str'
a = 10
a = true
console.log(a.myName)
console.log(a.myName.firstName)
```
#### 未声明类型的变量
未指定类型的变量会被推断为any类型
```
let n
n = 'seven'
n = 7
```
### 类型推论
```
let my = 'seven'
my = 7 // error
// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```
事实上他等价于
```
let my: string = 'seven';
my = 7;
```
ts会在没有明确指定类型的时候推测出一个类型，这就是类型推论。
### 联合类型
联合类型表示取值可以为多种类型中的一种
```
let myFav: string | number
myFav = 'seven'
myFav = 7
myFav = true // error
```
联合类型使用 | 分隔每个类型
#### 访问联合类型的属性或方法
当ts不确定一个联合类型的变量到底是哪个类型时候 我们只能访问此联合类型的所有类型里共有的属性或方法
```
function getLength(something: string | number): number {
  return something.toString()
  return something.length // error
}
// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//  Property 'length' does not exist on type 'number'.
```
联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型
```
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错
```
有兴趣的可以去[ts练习](https://www.tslang.cn/play/index.html)

### 变量声明
变量声明和 es6基本一样，这里只简单的讲一下

```
//javascript
var a = 10 
//其实可以分为两步
var a
a = 10
//在js中 var声明的变量会进行变量提升。

es6中使用 let const来声明变量
// let  const 和var的区别主要在于 let和const 创造了块级作用域，且不会进行变量提升，所以在使用之前一定要先
// 创建变量。  let和const的区别在于，let定义的变量可以修改。const定义的变量不可修改(指的是变量本身的地址 // 不可修改)
// 例如
const myConst = 'myconst'
myConst = 'youconst' // error

const myCon = [8,9]
myCon.push(0) // right
```

### 接口
**TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约**
接口除了可用于对累的一部分行为进行抽象以外，也常用语对 对象的形状进行描述
```
interface requestConfig {
  url: string
  method: string,
}
let config: requestConfig = {
  url: 'www.baidu.com',
  method: 'name',
  age: 18
}
// Object literal may only specify known properties, and 'age' does not exist in type 'requestConfig'.
```
一般接口首字母大写 和类一样  赋值的时候变量的形状必须和接口的形状一样
```
function processConfig(config: requestConfig): void {
  console.log(config.data) // Property 'data' does not exist on type 'requestConfig'.
}
```
类型检查器会对 config进行检查，上面我们看到 config接口定义并没有is这个属性，所以在编译阶段ts就会报错

可选属性
```
interface requestConfig {
  url: string
  method: string
  data?: string
  params?: any
  header?: any
}

function processConfig(config: requestConfig): void {
  console.log(config.data)
  console.log(config.datay) 
  // Property 'datay' does not exist on type 'requestConfig'. Did you mean 'data'?
}
```
可选属性的好处是对可能存在的属性进行预定义，
好处之二就是可以捕获不存在的属性时的错误。上面写错了 datay  报错如上。


#### 任意属性
有时候我们希望一个接口允许有任意的属性
```
interface Person {
  name: string
  age?: number
  [propName: string]: any
}

let tom: Person = {
  name: 'Tom',
  gender: 'male'
}
```
使用[propName: string]定义了任意属性取string的值
需要注意的是一旦定义了任意属性，那么确定属性和可选属性的类型都必须是他的类型的子集
```
interface Person {
  name: string;
  age?: number;
  [propName: string]: string;
}

let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male'
};
// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
```
任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了。



####只读属性
```
interface requestConfig {
  readonly url: string
  method: string
  data?: string
  params?: any
  header?: any
}

function processConfig(config: requestConfig): void {
  config.url = 'http://www.baidu.com'
  // Cannot assign to 'url' because it is a constant or a read-only property.
  config.method = 'get'
}
```
**注意只读约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候**
上面我们对只读属性url进行赋值时，会报错
readonly vs const
最简单的判断该用 readonly还是 const的方法就是看要把它当成变量合适属性使用，变量就用const 属性用readonly

额外的属性检查
```
interface requestConfig {
  url: string
  method: string
  data?: string
  params?: any
  header?: any
  [propName: string]: any
}

function processConfig(config: requestConfig): void {
  config.url = 'http://www.baidu.com'
  config.method = 'get'
  config.urls =
}
```
对象字面量会被特殊对待并且会经过额外的属性检查，

##函数类型
一个函数有输入和输出。要在ts中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义教简单
```
function sum(x: number. y: number): number {
  return x + y
}
sum(1, 2)
sum(1,2,4)
// index.ts(4,1): error TS2346: Supplied parameters do not match any signature of call target
```
注意 输入多余的(或者少于要求的)参数，是不被允许的

#### 可选参数
```
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
      return firstName + ' ' + lastName;
    } else {
      return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```
可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了：

####参数默认值
es6中允许给函数的参数添加默认值，ts会将添加了默认值的参数识别为可选参数
```
function buildName(firstName: string = 'Tom', lastName: string) {
  return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let cat = buildName(undefined, 'Cat');
```
此时就不受[可选参数必须接在参数后面的限制了]

#### 剩余参数
es6中可以使用...rest的方式获取函数中的剩余参数
```
function push(array: any[], ...items: any[]) {
  items.forEach(function(item) {
    array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3);
```
注意rest参数只能是最后一个参数
####重载
```
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
```
上面函数实现了 输入数字反转数字。输入字符串输出反转字符串
这样有一个缺点，就是不能准确的表达，当输入为数字的时候，输出也应该为数字
```
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
```
### 类型断言
####语法
<类型>值
或者
值 as类型

之前说过。当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：
```
function getLength(something: string | number): number {
    return something.length;
}

// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
```
此时可以使用类型断言，将something断言成string
```
function getLength(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}

```
类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的：

### 字符串字面量类型
字符串字面量类型用来约束取值只能是某几个字符串中的一个
```
type Method = 'get' | 'GET' | 'post' | 'POST'
function promessAxiso(url: string, method: Method) {
  // do something
}
promessAxiso('url', 'get')
promessAxiso('url', 'ge') // 报错。methid不能为‘ge’
```
## 类
类的写法。es6上类的写法和ts类似，但多了一些功能
先看一个最简单的class写法
```
class Axios {
  url: string
  constructor(msg: string) {
  this.url = msg
    console.log(msg)
  }
  get() {
    return this.url
  }
}
let axios = new Axios('www.baidu.com')
```
###继承  
使用extends关键字实现继承，子类中使用super关键字来调取父类的构造函数和方法
es6的写法
```
class Animal {
  construtor(name) {
    this.name = name
  }
  sayHi() {
    return `My name is ${this.name}`
  }
}
class Cat extends Animal {
    constructor(name) {
        super(name); // 调用父类的 constructor(name)
        console.log(this.name);
    }
    sayHi() {
        return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
    }
}

let c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Meow, My name is Tom
```
#### 存取器
```
class Animal {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return 'Jack';
  }
  set name(value) {
    console.log('setter: ' + value);
  }
}

let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack
```
#### ts中类的用法
**public private 和 protected**
TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected。
+ public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
+ private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
+ protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

我们希望有的属性是无法直接存取的，这时候就可以用 private 了
```
class Animal {
  private name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';

// index.ts(9,13): error TS2341: Property 'name' is private and only accessible within class 'Animal'.
// index.ts(10,1): error TS2341: Property 'name' is private and only accessible within class 'Animal'.
```
使用private修饰的属性和方法，在子类中也是不允许访问的。
```
class Animal {
    private name;
    public constructor(name) {
        this.name = name;
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name);
        console.log(this.name);
    }
}

// index.ts(11,17): error TS2341: Property 'name' is private and only accessible within class 'Animal'
```
####readonly 
只读属性关键字，只允许出现在属性声明或索引签名中。
```
class Animal {
  readonly name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';

// index.ts(10,3): TS2540: Cannot assign to 'name' because it is a read-only property.
```

#### 抽象类
抽象类是不允许被实例化的：
```
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

let a = new Animal('Jack');

// index.ts(9,11): error TS2511: Cannot create an instance of the abstract class 'Animal'.
```
抽象类中的抽象方法必须被子类实现：
```
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

class Cat extends Animal {
  public sayHi() {
    console.log(`Meow, My name is ${this.name}`);
  }
}

let cat = new Cat('Tom');
```

## 类与接口
接口（Interfaces）可以用于对「对象的形状（Shape）」进行描述
介绍接口的另一个用途，对类的一部分行为进行抽象。
####类实现接口
```
interface Alarm {
    alert();
}

class Door {
}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert');
    }
}

class Car implements Alarm {
    alert() {
        console.log('Car alert');
    }
}
```
一个类可以实现多个接口：
```
interface Alarm {
    alert();
}

interface Light {
    lightOn();
    lightOff();
}

class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}
```

### 接口继承接口
```
interface Alarm {
    alert();
}

interface LightableAlarm extends Alarm {
    lightOn();
    lightOff();
}
```
### 接口继承类
```
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```

## 泛型
泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
```
function createArray(length: number, value: any): Array<any> {
  let result = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```
Array<any> 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 value 的类型

```
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```
上例中，我们在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用了。

#### 泛型约束
在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：
```
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.
```
泛型T不一定包含属性length 所以编译的时候报错
```
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```
我们使用了 extends 约束了泛型 T 必须符合接口 Lengthwise 的形状，也就是必须包含 length 属性。
# ts-demo

## 练习入口
[ts官网]('https://www.tslang.cn/index.html')
[demo gitHub]('https://github.com/yellow-red-blue/ts-demo')
