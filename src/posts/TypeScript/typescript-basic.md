---
title: "TypeScript Types"
date: "2026-08-25"
description: "타입스크립트가 자체적으로 제공한 타입들 "
---

## 기본 타입
![타입 계층도](/blog/images/typescript/basic-01.png)

### 원시 타입(Primitive Type)
동시에 한개의 값만 저장할 수 있는 타입들을 말합니다.
여러 타입들중 가장 기본이 되는 타입입니다. 
```ts
// number
let num1: number = 123;
let num2: number = -123;
let num3: number = 0.123;
let num4: number = -0.123;
let num5: number = Infinity;
let num6: number = -Infinity;
let num7: number = NaN;
// 숫자를 의미하는 모든 값을 포함하는 타입입니다. 
// 단순 정수 뿐만 아니라 소수, 음수, Infinity, NaN등의 특수한 숫자들도 포함합니다.


//string
let str1: string = "hello";
let str2: string = 'hello';
let str3: string = `hello`;
let str4: string = `hello ${str1}`;
// string 타입은 문자열을 의미하는 타입입니다.
// 단순 쌍따옴표 문자열 뿐만 아니라 작은 따옴표, 백틱, 템플릿 리터럴로 만든 모든 문자열을 포함합니다.


//boolean
let bool1 : boolean = true;
let bool2 : boolean = false;
// boolean 타입은 참과 거짓만을 저장하는 타입입니다. true 또는 false만 이 타입에 해당됩니다.

// null
let null1 : null = null;
// null 타입은 오직 null 값만 포함하는 타입입니다.

// undefined
let unde1 : undefined = undefinde;
//undefined 타입 역시 null 타입과 마찬가지로 오직 하나의 값 undefined만 포함하는 타입입니다.

```
### 리터럴 타입
```ts
// 딱 하나의 값만 포함하는 타입도 존재합니다. 
// 따라서 다음과 같이 변수의 타입을 숫자 10으로 설정하는 것 또한 가능합니다.
let numA: 10 = 10;
// 변수 numA의 타입을 숫자 10으로 설정했습니다. 이렇게 설정하면 이제 numA에는 10 이외의 값을 저장할 수 없게 됩니다.
// 이렇듯 하나의 값만 포함하도록 값 자체로 만들어진 타입을 타입스크립트에서는 ‘리터럴 타입’이라고 부릅니다. 
// 참고로 여기서 리터럴은 우리말로 ‘값’ 이라는 뜻 입니다.
let strA: "hello" = "hello";
let boolA: true = true;
let boolB: false = false;

```

## 배열
```ts
let numArr : number[] = [1,2,3]

// 문자열을 담는 배열의 타입을 정의
let strArr : string[] = ["hello","im","winterlood"]

// 배열의 타입을 정의
let boolArr : Array<boolean> = [true, fasle, true]
// Array<배열요소타입> 형태로도 배열의 타입을 정의할 수 있습니다. 
// 참고로 이렇게 꺽쇠와 함께 타입을 작성하는 문법을 타입스크립트에서는 ‘제네릭’ 이라고 부릅니다.

//다양한 타입 요소를 갖는 배열 타입 정의하기
let nultiArr : (number | string)[] = [1, "hello"]
// 이렇게 정의한 배열 타입은 요소가 number 타입이거나 string 타입이어야 합니다.
// 이렇듯 바(|)를 이용해 여러 타입중 하나를 만족하는 타입을 정의하는 문법을 유니온(Union) 타입 이라고 부릅니다.
// 바를 이용해 여러 타입 중 하나를 만족하는 경우 허용하는 이런 범용적인 타입을 만들 수 있다

// 다차원 배열 타입 정의하기
let doubleArr : number[][] = [
    [1,2,3],
    [4,5]
]

```

## 튜플
튜플은 자바스크립트에는 없는 타입스크립트의 특수한 타입으로 길이와 타입이 고정된 배열을 의미합니다.

```ts
// 길이가 2로 고정된 2개의 number 타입 요소를 갖는 튜플(배열) 타입은 다음과 같이 정의
let tup1 : [number, number] = [1,2]

// 다음과 같이 다양한 타입을 갖는 튜플 타입도 정의
let tup2 : [number, string, boolean] = [1, "hello", true]

// 튜플은 결국 배열입니다.
// 그러므로 배열 메서드인 push나 pop을 이용해 고정된 길이를 무시하고 요소를 추가하거나 삭제할 수 있습니다.
// 따라서 튜플을 사용할 때에는 최대한 배열 메서드를 이용해 요소를 추가하거나 삭제하는 등의 연산을 할 때에는 각별히 주의하는 게 좋습니다.

```
### 튜플을 왜 쓰는 걸까?
```ts
const users: [string, number][] = [
  ["이정환", 1],
  ["이아무개", 2],
  ["김아무개", 3],
  ["박아무개", 4],
  [5, "조아무개"], // 오류 발생
];
```

## 객체 타입을 정의하는 방법

### object로 정의하기
```ts  
// 객체 타입
let user = {
    id: 1,
    name :"이승환",
}

// user의 타입을 객체를 의미하는 object로 정의
let user : object = {
    id:1,
    name: "이승환",
}
user.id;  //오류발생  'object' 타입에 'id' 프로퍼티가 없다고 나옵니다.
// 타입스크립트의 object 타입은 단순 값이 객체임을 표현하는 것 외에는 아무런 정보도 제공하지 않는 타입이기 때문입니다.
// 따라서 이 타입은 객체의 프로퍼티에 대한 정보를 전혀 가지고 있지 않습니다. 
// 그렇기 때문에 이렇게 프로퍼티에 접근하려고 하면 오류가 발생합니다.
// 변수 user에 저장된 객체의 구조를 그대로 타입으로 만들고 싶었는데 그럼 어떻게 해야 할까요?
// 이럴 때에는 object가 아닌 객체 리터럴 타입을 이용해야 합니다.

```
### 객체 리터럴 타입
```ts
let user : {
    id: number;
    name: string;
} = {
    id:1,
    name:"이승환"
}

use.id;
// 변수 user의 타입을 number 타입의 id 그리고 string 타입의 name 프로퍼티를 갖는 객체 타입으로 정의했습니다.
// 이렇듯 객체 리터럴과 비슷한 문법으로 객체 타입을 정의한 타입을 객체 리터럴 타입이라고 부릅니다.
// 변수의 타입을 객체 리터럴 타입으로 정의하면 이제 타입내에 정의되어있는 프로퍼티에 이상 없이 접근할 수 있게 됩니다. 
// 지금은 점 표기법으로 접근했지만 괄호 표기법을 사용할 때에도 동일하게 잘 접근됩니다.

```
### 선택적 프로퍼티(Optional Property)
자바스크립트에서 객체를 다루다보면 자주 특정 프로퍼티는 있어도 되고 없어도 되는 그런 상황이 존재합니다. 
예를 들어 다음과 같이 이름은 있지만 아직 id가 없는 유저가 존재할 수도 있습니다.
```ts
let user : {
    id: number;
    name: string;
} = {
    id:1,
    name:"이승환",
}

user = {
    name:"홍길동" // 오류발생
}

// 특정 프로퍼티를 상황에 따라 생략하도록 만들고 싶다면 해당 프로퍼티를 선택적 프로퍼티로 만들어줘야 합니다.
let user : {
    id? : number; //선택적 프로퍼티가 된 id
    name : string;
} = {
    id:1,
    name:"이승환"
}

user = {
    name:" 홍길동"
}

```

### 읽기전용 프로퍼티(Readonly Property)
```ts   
let user: {
    id?:number;
    readonly name : string; // name은 이제 Readonly 프로퍼티가 되었음
} = {
    id:1,
    name:"이정환"
}

user.name ="홍길동"; // 오류발생
// name 프로퍼티는 이제 읽기 전용 프로퍼티가 되었기 때문에 마지막 라인처럼 프로퍼티의 값을 수정하려고 하면 오류가 발생하게 됩니다. 
// 이를 통해 의도치 않은 프로퍼티의 수정을 방지할 수 있습니다.

```

## 타입 별칭(Type Alias)
타입 별칭을 이용하면 다음과 같이 변수를 선언하듯 타입을 별도로 정의할 수 있습니다.
```ts
type User = {
    id: number;
    name: string;
    nickname: string;
    birth: string;
    bio: string;
    location: string;
}
// type 타입_이름 = 타입 형태로 타입을 정의합니다.
// 타입 이름으로는 User 그리고 타입으로는 여러개의 프로퍼티가 있는 객체 타입을 정의했습니다.
// 변수의 타입을 정의할 때 타입 주석과 함께 이용할 수 있습니다.

let user : User = {
    id:1,
    name:"이승환",
    nickName:"little prince",
    birth:"1997.01.01"
    bio:"안녕하세요",
    location:"서울시"
}
let user2: User = {
  id: 2,
  name: "홍길동",
  nickname: "winterlood",
  birth: "1997.01.07",
  bio: "안녕하세요",
  location: "부천시",
};

// 참고로 동일한 스코프에 동일한 이름의 타입 별칭을 선언하는 것은 불가능합니다. 마치 변수 선언과 유사합니다.
type User = {}

//그러나 스코프가 다르다면 다음과 같이 중복된 이름으로 여러개의 별칭을 선언해도 상관 없습니다.
function test() {
  type User = string;
}

```

## 인덱스 시그니처(Index Signature)
인덱스 시그니쳐는 객체 타입을 유연하게 정의할 수 있도록 돕는 특수한 문법입니다.
다양한 국가들의 영어 코드를 저장하는 객체가 하나 있다고 가정합니다.
```ts
type CountryCodes = {
    korea:string;
    UnitedState : string;
    UnitedKingdom : string;
}

let contryCodes : CountryCodes = {
    korea: "ko",
    UnitedState :"us",
    UnitedKingdom: "uk"
}
// 만약 이때 countryCodes에 100개의 프로퍼티(국가 코드)가 추가 되어야 한다면 타입 정의에도 각 프로퍼티를 모두 정의해주어야 하기 때문에 매우 불편할 것 입니다.
// 바로 이럴때 인덱스 시그니쳐를 이용하면 다음과 같이 간단하게 타입을 정의할 수 있습니다.

type CountryCodes = {
    [key:string] : string;
}

let countryCodes: CountryCodes = {
    Korea: "ko",
    UnitedState: "us",
    UnitedKingdom: "uk",
    // (... 약 100개의 국가)
    Brazil : 'bz'
}
// [key : string] : string 은 인덱스 시그니쳐 문법으로 이 객체 타입에는 key가 string 타입이고 value가 string 타입인 모든 프로퍼티를 포함된다 라는 의미입니다.

type CountryNumberCodes = {
  [key: string]: number;
  Korea: number;
};

type CountryNumberCodes = {
  [key: string]: number;
  Korea: string; // 오류!
};

// 인덱스 시그니쳐를 사용하면서 동시에 추가적인 프로퍼티를 또 정의할 때에는 인덱스 시그니쳐의 value 타입과 직접 추가한 프로퍼티의 value 타입이 호환되거나 일치해야 합니다. 

```

## 열거형(Enum) 타입
열거형 타입은 자바스크립트에는 존재하지 않고 오직 타입스크립트에서만 사용할 수 있는 특별한 타입입니다.
열거형은 다음과 같이 여러개의 값을 나열하는 용도로 사용합니다.
```ts   
eunm Role {
    ADMIN,
    USER,
    GUEST,
}

// 여러가지 값들에 각각 이름을 부여해 열겨해두고 사용하는 타입
enum Role {
  ADMIN = 0,
  USER = 1,
  GUEST = 2,
}

const user1 = {
  name: "이정환",
  role: Role.ADMIN, //관리자
};

const user2 = {
  name: "홍길동",
  role: Role.USER, // 회원
};

const user3 = {
  name: "아무개",
  role: Role.GUEST, // 게스트
};

// enum 멤버에 숫자 값을 직접 할당하지 않아도 0 부터 1씩 늘어나는 값으로 자동으로 할당됩니다.
enum Role {
  ADMIN, // 0 할당(자동)  
  USER,  // 1 할당(자동)
  GUEST, // 2 할당(자동)
}

const user1 = {
  name: "이정환",
  role: Role.ADMIN, // 0
};

const user2 = {
  name: "홍길동",
  role: Role.USER, // 1
};

const user3 = {
  name: "아무개",
  role: Role.GUEST, // 2
};
// 자동 할당되는 값은 기본적으로 0부터 시작합니다. 
// 만약 이 값을 변경하고 싶다면 다음과 같이 시작하는 위치에 값을 직접 할당해주면 됩니다. 
// 그럼 자동으로 그 아래의 멤버들은 1씩 증가된 값으로 할당됩니다.

enum Role {
  ADMIN = 10, // 10 할당 
  USER,       // 11 할당(자동)
  GUEST,      // 12 할당(자동)
}

const user1 = {
  name: "이정환",
  role: Role.ADMIN, // 10
};

const user2 = {
  name: "홍길동",
  role: Role.USER, // 11
};

const user3 = {
  name: "아무개",
  role: Role.GUEST, // 12
};

```

## 문자열 열거형
enum의 멤버에는 숫자 말고도 문자열 값도 할당할 수 있습니다.
```ts
enum Language {
  korean = "ko",
  english = "en",
}
enum Role {
  ADMIN,
  USER,
  GUEST,
}

const uer1 = {
    name:"김석진",
    role: Role.ADMIN, //0
    language : Language.korea, // "ko"
}

```
### enum은 컴파일 결과 객체가 된다.
enum은 컴파일될 때 다른 타입들 처럼 사라지지 않고 자바스크립트 객체로 변환됩니다. 
따라서 우리가 위에서 했던 것 처럼 값으로 사용할 수 있는 것 입니다.


## any 타입
any 타입은 타입스크립트에서만 제공되는 특별한 타입으로 타입 검사를 받지 않는 특수한 치트키 타입입니다.
```ts
let anyVar: any = 10;
anyVar = "hello";

anyVar = true;
anyVar = {};

anyVar.toUpperCase();
anyVar.toFixed();
anyVar.a;

// any 타입은 어떠한 타입 검사도 받지 않기 때문에 아무 타입의 값이나 범용적으로 담아 사용할 수 있고 또 다양한 타입의 메서드도 마음대로 호출해서 사용해도 문제가 되지 않습니다.
```
### any는 최대한 사용하지 마세요

## Unknown 타입
unknown 타입은 any 타입과 비슷하지만 보다 안전한 타입입니다.
unknown 타입의 변수는 다음과 같이 어떤 타입의 값이든 다 저장할 수 있습니다.
```ts
let unknownVar: unknown;

unknownVar = "";
unknownVar = 1;
unknownVar = () => {};

// 그러나 반대로는 안됩니다. unknown 타입의 값은 어떤 타입의 변수에도 저장할 수 없습니다.
// 또 unknown 타입의 값은 어떤 연산에도 참여할 수 없으며, 어떤 메서드도 사용할 수 없습니다.
// 오직 값을 저장하는 행위밖에 할 수 없게 됩니다.

```

## void
void 타입은 아무런 값도 없음을 의미하는 타입입니다.
보통은 다음과 같이 아무런 값도 반환하지 않는 함수의 반환값 타입을 정의할 때 사용합니다.

```ts
function func2(): void {
  console.log("hello");
}
```

## never
never 타입은 불가능을 의미하는 타입입니다.
보통 다음과 같이 함수가 어떠한 값도 반환할 수 없는 상황일 때 해당 함수의 반환값 타입을 정의할 때 사용됩니다.
```ts
function func3(): never {
  while (true) {}
}

// 함수 func3는 무한 루프를 돌기 때문에 아무런 값도 반환할 수 없습니다. 
// 엄밀히 말하면 이 함수는 영원히 종료될 수 없기 때문에 뭔가를 반환한다는 것 자체가 '불가능' 합니다.
// 이렇게 불가능 한 값의 타입을 정의할 때 never 타입을 사용합니다.

//무한 루프 외에도 다음과 같이 의도적으로 오류를 발생시키는 함수도 never 타입으로 반환값 타입을 정의할 수 있습니다.
function func4(): never {
  throw new Error();
}

```
