---
title: "classnames"
date: "2026-09-15"
description: "React 클래스이름 조건부 렌더링"
---

### 설치
npm install classnames

### 사용 예제
```tsx
import classNames from 'classnames';

const App = ({ isActive, size }) => {
  // classNames 객체 모드
  const buttonClasses = classNames('btn', {
    'btn-active': isActive,
    'btn-small': size === 'small',
    'btn-large': size === 'large',
  });

  return <button className={buttonClasses}>Button</button>;
};
```

```tsx
import classNames from 'classnames/bind';
import styles from './App.module.scss'; 

export default function App() {
    const isLoggedIn = true;
    const cx= classNames.bind(styles)
    return(
        <>
            <button className={cx('button', {
                'primary': true,
                'disabled': false,
                'is-active': isLoggedIn
            })}>
                Button
            </button>
        </>
    )
}

```
