# Vue3

> 官方中文文档：https://cn.vuejs.org/guide/introduction
>
> 英文开始指南（：https://vuejs.org/guide/quick-start
>
> 主要参考教程：https://www.bilibili.com/video/BV1Rs4y127j8?p=15

## 基础知识

### API 风格

Vue 组件有两种风格：**选项式 API（Options API）**和**组合式 API（Composition API）**，

选项式 API 通过在组件定义中使用 `data`、`methods`、`computed`、`watch` 等选项来组织组件的逻辑。组件的状态和行为都被封装在组件实例中。

**组合式 API**基于函数的 API，使用 `setup` 函数来定义组件的状态和行为，其中可以使用 Composition API 提供的函数（如 `ref`、`reactive`、`computed` 等），组件的状态和行为可以更灵活地组织，可以更好地重用和组合逻辑。

**setup 来标记组合式**

```vue
<template>
  <!-- code -->
</template>

<script setup>
<!-- code -->
</script>
```

_本文档两种方式都有使用，主要是因为教程中的案例都是传统式，刚开始我也不知道区别，所以按照教程中的写法进行了测试并记录，有时间我会都调整为组合式 API_

### 模版语法

最基础的为文本插值，它使用的是“Mustache”语法 (即双大括号)：

```vue
<span>Message: {{ msg }}</span>
```

每个绑定仅支持单一表达式，或者是可以被求值的 JavaScript 代码。

（一个简单的判断方法是是否可以合法地写在`return`后面）

**v-html**

双大括号会将值转为纯文本，如果要插入 HTML，则需要用到`v-html`指令。

```vue
<template>
  <div>
    <h1>Vue3</h1>
    <p v-html="rawHtml"></p>
  </div>
</template>

<script setup>
const rawHtml = '<span style="color: red">This should be red.</span>';
</script>
```

### 属性绑定 v-bind(\:)

**v-bind**

双大括号不能在 HTML 属性中用，想要绑定一个 attribute，应该使用`v-bind`指令。

如果绑定的值为`null`或者是`undefined`，那么这个 attribute 将从渲染的元素上移除。

因为`v-bind`非常常用，所以会有简写语法`:id="customeKey"`

```vue
<template>
  <div id="app">
    <h1>Vue3</h1>
    <p v-bind:id="customeId">{{ message }}</p>
    <p :id="customeIdSecond">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello Vue!",
      customeId: "my-id",
      customeIdSecond: "my-id-second",
    };
  },
};
</script>

<style>
#my-id {
  color: red;
}
#my-id-second {
  color: blue;
}
</style>
```

也可以动态绑定多个值，只需要绑定一个包含多个 attribute 的 JavaScript 对象即可。

### 条件渲染 v-if

在 Vue 中，提供了条件渲染，类似 JavaScript 中的条件语句：

- v-if
- v-else
- v-else-if
- v-show

**v-if 和 v-show 区别**：

- `v-if` 是真实的按条件渲染，而且是惰性的，如果初次渲染时条件为 false，不会做任何事。

- `v-show` 总是被渲染，只是“**切换元素的 display 样式**”

总的来说，`v-if` 有更高的切换开销，每次切换都涉及 DOM 创建/销毁，而 `v-show` 有更高的初始渲染开销。

因此，如果频繁切换，还是 `v-show` 更好。如果运行时条件很少改变，则 `v-if` 更合适。

### 列表渲染 v-for

`v-for`指令基于一个数组来渲染一个列表。

值需要使用`item in items`形式的特殊语法，其中`items`是源数据的数组，而`item`是迭代项的别名。

```vue
<template>
  <div id="app">
    <h1>Vue3</h1>
    <p v-for="item in listData" :key="item.id">{{ item.name }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listData: [
        { id: 1, name: "A" },
        { id: 2, name: "B" },
        { id: 3, name: "C" },
      ],
    };
  },
};
</script>
```

`:key="index"`

Vue 默认“就地更新”，通过 `v-for` 来渲染列表，所以如果 DOM 元素顺序改变，也会重新渲染所有元素。

如果想重用和重新排序现有的元素，就需要为每个元素对应的块提供一个唯一的`key`attribute，来减少内存的消耗。

_绑定的期待是一个基础类型的值，如字符串或者 number 类型_

真实的应用中，不推荐使用`index`作为`key` 值，因为要确保每一条数据的唯一索性不会发生改变，一般使用自定义的`id` 来作为 `key` 值。

### 事件处理 v-on(@)

监听 DOM 事件，并在事件触发时执行对应的 JavaScript。

#### 按键修饰符

在监听键盘事件时，我们经常需要检查特定的按键。

Vue 允许在 `v-on` 或 `@` 监听按键事件时添加按键修饰符。

```vue
<!-- 仅在 `key` 为 `Enter` 时调用 `submit` -->
<input @keyup.enter="submit" />
```

例如我希望在输入框中，按下 Enter 执行我自定义的方法，就可以这样：

```vue
<template>
  <div id="app">
    <h1>Vue3</h1>
    <input @keydown.enter.prevent="handleSend" placeholder="Enter message" />
  </div>
</template>
```

等价于标准的 JS 写法：

```js
<input
  @keydown="(event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend(event);
    }
  }"
/>
```

它表示：

- `keydown` → 绑定键盘按下事件

- `.enter` → 只在 `event.key === 'Enter'` 时触发

- `.prevent` → 自动调用 `event.preventDefault()`，阻止默认行为（例如在表单中按下回车会提交）

### 数组变化侦测

数组变化有两种方法：变更方法和替换数组。

**变更方法**：Vue 能够侦听响应式数组的变更方法，并在调用时触发相关的更新。这些变更方法包括：

- `push()`

- `pop()`

- `shift()`

- `unshift()`

- `splice()`

- `sort()`

- `reverse`

**替换数组**：有一些不可变的方法(immnutable)，如`filter()`，`concat()`和`slice()`，这些不会更改数组，而是**返回一个新数组**，这些方法就不会导致
UI 变化，需要重新赋值才能更新页面：

```vue
<template>
  <div>
    <!-- 第一种方式数组会直接更新 -->
    <button @click="name1.push('Smith')">Add Smith</button>
    <!-- 第二种方式如果不重新赋值是没有变化的 -->
    <button @click="addName()">Add Smith</button>
    <ul>
      <li v-for="(name, index) in name1" :key="index">{{ name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name1: ["John", "Doe", "Jane"],
    };
  },
  methods: {
    addName() {
      this.name1 = this.name1.concat("Smith");
    },
  },
};
</script>
```

### [计算属性 computed()](https://cn.vuejs.org/guide/essentials/computed.html)

### 表单输入绑定 v-model

待补充

### 计算属性 computed

待补充

### 侦听器 watch/watchEffect

待补充

## API

### 生命周期钩子 onMounted

待补充

### CSS 功能

#### 深度选择器

处于 `scoped` 样式中的选择器如果想要做更“深度”的选择，也即：影响到子组件，可以使用 `:deep()` 这个伪类：

```vue
<template>
  <div class="parent">
    <h1>Parent</h1>
    <child-component></child-component>
  </div>
</template>
<style scoped>
/* ... */
.parent :deep(.child) {
  color: blue;
}
</style>
```

## Router

> 主要参考视频教程：https://www.bilibili.com/video/BV1xt421h7LC

### 设置路由

**查询字符串或路径传递参数**

```vue
<!-- 查询字符串 -->
{{ #route.query.id }}

<!-- 路径传递参数 -->
id: {{ $route.params.id }}
<!-- router/index.js -->
const routes = [ { path: "/users/:id?",
<!-- 如果有？表示是可选参数 -->
component: () => import("@/views/Users.vue"), } ];
```

也可以定义别名，这样就可以使用别名来访问对应的组件

```vue
<!-- router/index.js -->
const routes = [ { path: "/", alias: ["/home", "/index"],
<!-- 如果是单个别名，可以使用字符串就好 -->
name: "Home", component: () => import("@/views/Home.vue"), } ];
```

**嵌套路由**

主要就是使用`children`这个参数。

```vue
<!-- router/index.js -->
const routes = [ { path: "/vip", name: "VIP", component: () =>
import("@/views/VIP.vue"), children: [ { path: "", name: "VIPHome", component:
() => import("@/views/vip/Home.vue"), }, { path: "profile", name: "VIPProfile",
component: () => import("@/views/vip/Profile.vue"), }, { path: "orders", name:
"VIPOrders", component: () => import("@/views//vip/Orders.vue"), }, ], }, ];
<!-- src/views/VIP.vue -->
<template>
  <div>
    <p>Welcome to the VIP Page!</p>
    <router-link to="/vip">Home</router-link> |
    <router-link to="/vip/orders">Orders</router-link> |
    <router-link to="/vip/profile">Profile</router-link>
  </div>
  <!-- 记得添加渲染标签，才能显示子路由的内容 -->
  <router-view></router-view>
</template>

<script></script>
```

**重定向**

主要使用`redirect`这个参数。

```vue
<!-- router/index.js -->
const routes = [ { path: "/", alias: ["/home", "/index"],
<!-- 如果是单个别名，可以使用字符串就好 -->
name: "Home", component: () => import("@/views/Home.vue"), }, { path: "/svip",
redirect: "/", }, ];
```

**动态属性绑定**

```vue
<router-link :to="{ path: '/users', query: { id: 1 } }">Users</router-link>
<!-- 必须在路由中定义了名字，才可以使用路径传参（params） -->
<router-link
  :to="{ name: 'Users', params: { id: 1 } }"
>Users-Params</router-link>
<!-- src/views/Users.vue -->
<template>
  <div>
    <h2>Users Page</h2>
    <p>This is the Users Page</p>
    <!-- Display the id from the URL, if no id is provided, it will be empty -->
    <p v-if="$route.query.id">User ID: {{ $route.query.id }}</p>
    <p v-else>No Query ID</p>
    <!-- Display the id from the URL, if no id is provided, it will be empty -->
    <p v-if="$route.params.id">User ID: {{ $route.params.id }}</p>
    <p v-else>No Param ID</p>
  </div>
</template>
```

### 使用路由

**编程式导航**

通过使用 useRouter，可以实现编程导航，参数类似上面案例中的`:to="..."`。

```vue
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goTo = (path) => router.push(path);
</script>
<template>
  <div id="app">
    <h1 class="text-2xl font-bold text-center">Vue Router</h1>
    <nav class="nav">
      <router-link to="/">Home</router-link>
      <a class="cursor-pointer" @click="goTo('/contact')">Contact</a>
    </nav>
    <router-view></router-view>
  </div>
</template>
```

**全局守卫**

全局前置守卫使用比较多。

通过使用`router.beforeEach`函数，就可以实现**全局前置守卫**，用于在路由切换之前执行一些逻辑。它的作用是拦截所有路由导航，在路由切换之前执行一些操作，比如权限验证、路由跳转逻辑等。

```vue
<!-- router/index.js -->
import { createRouter, createWebHistory } from 'vue-router'; const router =
createRouter({ history: createWebHistory(), routes: [ // 定义路由 ] });
router.beforeEach((to, from, next) => { // 在路由导航开始之前执行的逻辑 //
可以在这里进行权限验证、路由跳转等操作 // 示例：验证用户是否已经登录 if
(to.meta.requiresAuth && !isLoggedIn()) { //
如果需要登录且用户未登录，则跳转到登录页面 next('/login'); } else { //
否则，继续路由导航 next(); } }); export default router;
```

`to`和`from`参数，分别记录了将要去的页面以及之前页面的对象信息。

`meta`为路由定义中的自定义元信息。

以下为一个更加标准的路由定义文件：

```vue
<!-- router/index.js -->
import { createRouter, createWebHistory } from 'vue-router'; const routes = [ {
path: '/', name: 'Home', component: Home }, { path: '/dashboard', name:
'Dashboard', component: Dashboard, // 添加 requiresAuth 元信息 meta: {
requiresAuth: true } }, { path: '/login', name: 'Login', component: Login } ];
const router = createRouter({ history: createWebHistory(), routes });
router.beforeEach((to, from, next) => { // 在路由导航开始之前执行的逻辑 //
可以在这里根据路由的 meta 元信息进行权限验证等操作 // 检查是否需要认证 if
(to.meta.requiresAuth) { // 假设在这里进行认证逻辑判断 const isAuthenticated =
checkAuth(); if (!isAuthenticated) { // 如果用户未认证，则导航到登录页面
next('/login'); } else { // 如果用户已认证，则继续路由导航 next(); } } else { //
如果不需要认证，则直接继续路由导航 next(); } }); export default router;
```

**在 Vue Router 中，`useRoute` 和 `useRouter` 有什么区别？**

`useRoute` 用于获取当前路由信息，而 `useRouter` 用于获取路由实例，它们各自用于不同的场景和目的。

1. **useRoute**:
   - `useRoute` 是用于在组件的 `setup()` 函数中获取当前路由信息的函数。
   - 它返回一个包含当前路由信息的响应式对象，你可以通过访问该对象的属性来获取路由信息，如 `path`, `params`, `query` 等。
   - 通常用于需要根据当前路由信息进行一些逻辑处理的情况，比如根据路由参数渲染不同的内容。
2. **useRouter**:
   - `useRouter` 是用于在组件的 `setup()` 函数中获取路由实例的函数。
   - 它返回一个路由实例，该实例具有诸如 `push`, `replace`, `go` 等方法，用于编程式导航以及访问路由的其他属性和方法。
   - 通常用于需要在组件中进行编程式导航或者访问路由实例的情况，比如在点击事件中导航到其他路由。

```

```
