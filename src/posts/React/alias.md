---
title: "alias @ 별칭 경로 "
date: "2026-08-28"
description: "tsconfig와 Vite 설정에서 @ 별칭을 src 경로로 연결해 절대경로로 임포트하는 방법을 정리합니다."
---

## @ alias(절대경로)
- @를 src로 연결하는 방식입니다.
```ts
// tsconfig.app.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

```
- Vite도 별도로 alias를 인식하도록 설정해야 합니다.
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
        // CommonJS 방식
        "@": path.resolve(__dirname, "./src"),

        // ES Module(ESM) 방식 (최신)
        "@": path.resolve(import.meta.dirname, "./src")
    },
  },
});
```