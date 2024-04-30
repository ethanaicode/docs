# Typescript

## TSConfig

### 基本选项

以下是我建议所有项目使用的基本选项。

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "skipLibCheck": true,
    "target": "es2022",
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true
  }
}
```

- esModuleInterop：帮助修复 `CommonJS` 和 `ES`模块之间的一些障碍。
- skipLibCheck：跳过检查`.d.ts`文件的类型。这对性能很重要，否则所有的 `node_modules` 都会被检查。
- target：你要目标的 `JavaScript`版本。我推荐 `es2022`而不是 `esnext`，因为它更稳定。
- allowJs 和 resolveJsonModule：允许你导入`.js`和`.json`文件。非常有用。
- moduleDetection：此选项强制 `TypeScript`将所有文件视为模块。这有助于避免“无法重新声明块作用域变量”错误。
- isolatedModules：此选项防止了一些在将模块视为隔离文件时不安全的 `TS` 特性。

### 严格性

以下是我建议所有项目使用的严格性选项。

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

- strict: 启用所有严格的类型检查选项。不可或缺。
- noUncheckedIndexedAccess: 在访问数组或对象之前，防止未先检查其是否已定义。这是防止运行时错误的好方法，应该真正包含在严格模式中。
  许多人推荐在 `tsconfig/bases` 中使用严格性选项，这是一个很棒的仓库，记录了`TSConfig` 的选项。这些选项包括许多我认为太“复杂”的规则，如 `noImplicitReturns`、`noUnusedLocals`、`noUnusedParameters` 和 `noFallthroughCasesInSwitch`。我建议你只有在需要时才将这些规则添加到你的 `tsconfig.json` 中。

**使用 TypeScript 进行转译**

如果你正在使用`tsc` 进行代码转译（创建 `JavaScript`文件），你会想要这些选项。

```json
{
  "compilerOptions": {
    "moduleResolution": "NodeNext",
    "module": "NodeNext",
    "outDir": "dist"
  }
}
```

- moduleResolution: 告诉 `TypeScript`如何解析模块。对于你编写的代码是要在 `Node` 中运行的情况，`NodeNext`是最佳选项。
- module: 告诉 `TypeScript`使用什么模块语法。对于 `Node`，`NodeNext`是最佳选项。
- outDir: 告诉 `TypeScript`将编译后的 `JavaScript`文件放在哪里。`dist`是默认的约定，但可以你自定义。

### 构建库

如果你正在构建一个库，你会想要 `declaration: true`。

```json
{
  "compilerOptions": {
    "declaration": true
  }
}
```

- declaration: 告诉 `TypeScript`生成`.d.ts`文件。这是必需的，这样库可以在你创建的 .js 文件上获得自动补全。

**在单体库中构建库**

如果你在单体库中构建一个库，你还会想要这些选项。

```json
{
  "compilerOptions": {
    "declaration": true,
    "composite": true,
    "sourceMap": true,
    "declarationMap": true
  }
}
```

- composite: 告诉 `TypeScript`生成`.tsbuildinfo`文件。这告诉 `TypeScript`你的项目是单体库的一部分，并帮助它缓存构建以提高运行速度。
- sourceMap 和 declarationMap: 告诉`TypeScript`生成源映射和声明映射。这些是必需的，这样你的库的使用者在调试时可以跳转到原始源代码。

**不使用 TypeScript 进行代码转译**

如果你不使用 `tsc`进行代码转译，也就是说，将 `TypeScript`更多地用作 `linter`，你会想要这些选项。

```json
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "preserve",
    "noEmit": true
  }
}
```

- moduleResolution: 对于你编写的代码需要与类似 `Webpack`、`Rollup`、`Babel`、`SWC` 或 `ESBuild`等工具一起打包的情况，`Bundler`是最佳选项。
- module: `preserve`是最佳选项，因为它最接近`Bundler`处理模块的方式。

**在 DOM 中运行**

如果你的代码在 DOM 中运行，你会想要这些选项。

```json
{
  "compilerOptions": {
    "lib": ["es2022", "dom", "dom.iterable"]
  }
}
```

- lib: 告诉 `TypeScript`包含哪些内置类型。对于稳定性，`es2022` 是最佳选项。`dom`和`dom.iterable` 为你提供了 `window`、`document`等类型。

**不在 DOM 中运行**

如果你的代码不在 `DOM` 中运行，你会想要 `lib: ["es2022"]`。

```json
{
  "compilerOptions": {
    "lib": ["es2022"]
  }
}
```

这与上述相同，但没有`dom`和 `dom.iterable` 类型。
