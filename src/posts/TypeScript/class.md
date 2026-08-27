---
title: "TypeScript class"
date: "2026-08-26"
description: "자바스크립트 클래스 기초부터 타입스크립트 클래스의 필드/생성자/접근 제어자(public, private, protected), 인터페이스 구현까지 정리합니다."
---

## 자바스크립트의 클래스 소개
```ts
class Student {
  // 필드
  name;
  grade;
  age;

  // 생성자
  constructor(name, grade, age) {
    this.name = name;
    this.grade = grade;
    this.age = age;
  }

  // 메서드
  study() {
    console.log("열심히 공부 함");
  }

  introduce() {
    console.log(`안녕하세요!`);
  }
}

let studentB = new Student("홍길동", "A+", 27);

studentB.study(); // 열심히 공부 함
studentB.introduce(); // 안녕하세요!
```

```ts
class StudentDeveloper extends Student {
  // 필드
  favoriteSkill;

  // 생성자
  constructor(name, grade, age, favoriteSkill) {
    super(name, grade, age);
    this.favoriteSkill = favoriteSkill;
  }

  // 메서드
  programming() {
    console.log(`${this.favoriteSkill}로 프로그래밍 함`);
  }
}
```

## 타입스크립트의 클래스
```ts
class Employee {
  // 필드
  name: string = "";
  age: number = 0;
  position?: string = "";  //선택적 프로퍼티

  // 생성자
  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  // 메서드
  work() {
    console.log("일함");
  }
}

const employeeB = new Employee("김석진", 27, "개발자")
console.log(employeeB)

// 타입스크립트의 클래스는 타입으로도 사용할 수 있습니다. 
// 클래스를 타입으로 사용하면 해당 클래스가 생성하는 객체의 타입과 동일한 타입이 됩니다.
const employeeC : Employee = {
    name:"",
    age:0,
    position:"",
    work() {},
}

// 상속

class ExecutiveOfficer extends Employee {
    officeNumber: number;

    constructor(name:string, age: number, position:string, officeNumber: number ) {
        super(name, age, position)
        this.officeNumber = officeNumber;
    }
}
```

## 접근 제어자

### public : 접근 제어자를 지정하지 않으면 기본적으로 public 접근 제어자를 갖게 됩니다.

### private :  클래스 내부에서만 이 필드에 접근할 수 있게 됩니다.

### proteced : 클래스 외부에서는 접근이 안되지만 클래스 내부와 파생 클래스에서 접근이 가능하도록 설정하는 접근 제어자

```ts
// 보통 생성자 매개변수에 접근 제어자를 설정하여 필드 선언과 생성자 내부 코드를 생략하는것이 훨씬 간결하고 빠르게 코드를 작성할 수 있어 좋습니다.
// 필드를 생략할수있따
class Employee {
  // 필드

  // 생성자
  constructor(
    private name: string,
    protected age: number,
    public position: string
  ) {}

  // 메서드
  work() {
    console.log(`${this.name} 일함`);
  }
}
```
## 인터페이스와 클래스
```ts
// 인터페이스를 클래스에서 implements 키워드와 함께 사용하면 이제부터 
// 이 클래스가 생성하는 객체는 모두 이 인터페이스 타입을 만족하도록 클래스를 구현해야 합니다.
interface CharacterInterface {
    name: string;
    moveSpeed:number;
    move():void;
}

class Character implements CharacterInterface{

    // 생성자에 접근제어자를 쓰면 필드와 생성사 상세 생략할수있따
    constructor (public name: string, public moveSpeed: number,) {}
    move() : void {
        console.log(`${this.moveSpeed} 속도로 이동!`)
    }
}

```
