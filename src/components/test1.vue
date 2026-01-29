<script setup>
import { ref, shallowRef, computed } from 'vue'
const objDeep = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar'],
})
const stateShallow = shallowRef({ count: 1 })

function mutateDeeply() {
  // 以下都会按照期望工作
  objDeep.value.nested.count++
  objDeep.value.arr.push('baz')
}

function mutateShallowLy() {
  // stateShallow.value.count = 2 // 不会触发更改。
  // stateShallow.value++ // 返回NAN
  stateShallow.value = { count: 2 } // 会触发更改。浅层 ref只能通过替换整个根状态来触发更新！！
}

const author = ref({
  name: 'John Doe',
  books: ['Vue 2 - Advanced Guide', 'Vue 3 - Basic Guide', 'Vue 4 - The Mystery'],
})
// 一个计算属性 ref.计算属性值会基于其响应式依赖被缓存。一个计算属性仅会在其响应式依赖更新时才重新计算。
const publishedBooksMessage = computed(() => {
  return author.value.books.length > 0 ? 'Yes' : 'No'
})

const firstName = ref('John')
const lastName = ref('Doe')
const fullName = computed({
  // 计算属性的getter.应只做计算而没有任何其他的副作用.举例来说，不要改变其他状态、不要在 getter 中做异步请求或者更改 DOM！
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法.
    ;[firstName.value, lastName.value] = newValue.split(' ')
  },
})

const awesome = ref(true)
const itemsArr = ref([{ message: 'Foo' }, { message: 'Bar' }])
const parentMessage = ref('listParent')
const forInObject = ref({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10',
})
const myObject = ref()

const numbersArr = ref([1, 2, 3, 4, 5])
//希望显示数组经过过滤或排序后的内容，而不实际变更或重置原始数据。在这种情况下，你可以创建返回已过滤或已排序数组的计算属性。
const evenNumbersArr = computed(() => {
  // 使用 filter 过滤偶数,返回一个新数组
  // return numbersArr.value.filter(n => n % 2 === 0) 一步到位或者分为下面两步
  const filtered = numbersArr.value.filter((n) => {
    // console.log('过滤后的数组:', filtered) // 调试日志
    //在JavaScript中，箭头函数如果省略了花括号，则直接返回表达式的结果。但是这里使用了花括号，所以必须显式使用return。
    return n % 2 === 0
  })
  return filtered
})
const sets = ref([
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
])
function getNewArr(arr) {
  return arr.filter((n) => n % 2 === 0)
}

const message = ref('')
//访问原生事件对象
function updateMeaasge(event) {
  message.value = event.target.value
}
const coordinates = ref({ x: 0, y: 0 })
// 鼠标事件
function showCoordinates(event) {
  coordinates.value = {
    x: event.clientX,
    y: event.clientY,
  }
}
//键盘事件
function onKeyPress(event) {
  console.log(`按下了键盘：${event.key}, 键码: ${event.keyCode}`)
}

const multipleMessage = ref('')
const picked = ref('女')
const selected = ref('')

// 复杂表单对象
const form = ref({
  username: '',
  password: '',
  age: 18,
  gender: 'male',
  interests: [],
  country: '',
  bio: '',
  agree: false,
})
</script>

<template>
  <div class="box">
    <div class="marginBottom">
      <!-- 注意，在模板中使用 ref 时，我们不需要附加 .value。 -->
      <p>{{ objDeep }}</p>
      <button @click="mutateDeeply">点击看效果：深层响应性</button>
    </div>

    <div class="marginBottom">
      <p class="font-size: 1.2em; color: #42b983; margin: 15px 0;">{{ stateShallow }}</p>
      <button @click="mutateShallowLy">点击看效果：浅层作用形式</button>
    </div>

    <div class="marginBottom">
      <p>Has published books:</p>
      <span>{{ publishedBooksMessage }}</span>
    </div>

    <div class="marginBottom">
      <h2>
        计算属性默认是只读的。你需要用到“可写”的属性，可以通过同时提供 getter 和 setter 来创建：
      </h2>
      <span>{{ fullName }}</span>
    </div>

    <div class="marginBottom">
      <h2>v-if 指令</h2>
      <span v-if="awesome">这块内容只会在指令的表达式返回真值时才被渲染。</span>
    </div>

    <div class="marginBottom">
      <span v-if="awesome">Vue is awesome！</span>
      <h2 v-else>走v-else部分</h2>
      <button @click="awesome = !awesome">Toggle</button>
    </div>

    <div class="marginBottom">
      <div>
        <h2>v-for 指令</h2>
        <span>
          使用 v-for 指令基于一个数组来渲染一个列表,v-for 指令的值需要使用 item in
          items形式的特殊语法.
        </span>
        <ul v-for="item in itemsArr">
          <li>{{ item.message }}</li>
        </ul>

        <h3>在v-for块中可以完整访问父作用域内的属性和变量。</h3>
        <li v-for="(item, index) in itemsArr">
          {{ parentMessage }} - {{ index }} - {{ item.message }}
        </li>

        <h3>实际上，你也可以在定义 v-for 的变量别名时使用解构，和解构函数参数类似</h3>
        <li v-for="{ message } in itemsArr">{{ message }}</li>
        <!--有 index 索引时-->
        <li v-for="({ message }, index) in itemsArr">{{ message }} - {{ index }}</li>

        <h3>
          对于多层嵌套的 v-for，作用域的工作方式和函数的作用域很类似。每个 v-for
          作用域都可以访问到父级作用域:
        </h3>
        <li v-for="item in itemsArr">
          <span v-for="childItem in item"> {{ item.message }} - {{ childItem }}</span>
        </li>

        <h3>你也可以使用 of 作为分隔符来替代 in，这更接近 JavaScript 的迭代器语法</h3>
        <div v-for="item of itemsArr">{{ item }}</div>
      </div>

      <div>
        <h2>v-for 与对象</h2>
        <li v-for="value in forInObject">{{ value }}</li>
        <!--可以通过提供第二个参数表示属性名 (例如 key)：-->
        <li v-for="(value, key) in myObject">{{ key }}: {{ value }}</li>
        <!--第三个参数表示位置索引：-->
        <li v-for="(value, key, index) in myObject">{{ index }}. {{ key }}: {{ value }}</li>
      </div>

      <div>
        <h2>在 v-for 里使用范围值</h2>
        <span v-for="i in 10">{{ i }}</span>
      </div>

      <div>
        <h2>template 上的 v-for</h2>
        <ul>
          <template v-for="item in itemsArr">
            <li>{{ item }}</li>
            <li class="divider" role="presentation"></li>
          </template>
        </ul>
      </div>

      <div>
        <h2>通过 key 管理状态:推荐在任何可行的时候为 v-for 提供一个 key attribute</h2>
        <span>
          Vue 默认按照“就地更新”的策略来更新通过 v-for 渲染的元素列表。当数据项的顺序改变时，Vue
          不会随之移动 DOM 元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染。
        </span>
        <div v-for="item in itemsArr" v-bind:key="item.id">
          <!-- 内容 -->
        </div>
      </div>

      <div>
        <h2>当你使用 `template v-for `时，key 应该被放置在这个 template 容器上：</h2>
        <ul>
          <template v-for="todo in itemsArr" :key="todo.id">
            <li>{{ todo.message }}</li>
          </template>
        </ul>
      </div>
    </div>

    <div class="marginBottom">
      <h2>数组变化侦测</h2>
      <div>
        <h3>
          展示过滤或排序后的数组结果，而不实际变更原数组。在这种情况下，你可以创建返回已过滤或已排序数组的计算属性。【数组方法，例如
          filter()，concat() 和 slice()，这些都不会更改原数组，而总是返回一个新数组。】
        </h3>
        <ul>
          <li v-for="n in evenNumbersArr" :key="n">{{ n }}</li>
        </ul>
      </div>
    </div>

    <div class="marginBottom">
      <div>
        <h3>在计算属性不可行的情况下 (例如在多层嵌套的 v-for 循环中)，在嵌套 v-for 中使用方法：</h3>
        <ul v-for="(setArr, index) in sets" :key="index">
          <h4>第{{ index + 1 }}组:</h4>
          <li v-for="n in getNewArr(setArr)" :key="n">{{ n }}</li>
        </ul>
      </div>
    </div>

    <div class="marginBottom">
      <h2>v-on事件绑定</h2>

      <!-- 访问原生事件对象 -->
      <div>
        <input type="text" @input="updateMeaasge" />
        <p>输入的内容: {{ message }}</p>
      </div>

      <!-- 鼠标事件 -->
      <div
        @mousemove="showCoordinates"
        style="height: 100px; border: 1px solid #ccc; margin: 10px 0"
      >
        鼠标在此区域移动: ({{ coordinates.x }}, {{ coordinates.y }})
      </div>

      <!-- 键盘事件 -->
      <input type="text " @keydown="onKeyPress" placeholder="按键盘试试" />

      <!-- 事件修饰符 -->
      <h2>事件修饰符</h2>

      <!-- .stop 阻止事件冒泡 -->
      <div @click="console.log('外层事件！')" style="padding: 20px; background: #eee">
        <button @click.stop="console.log('内层事件')">点击我（不会触发外层）</button>
      </div>

      <!-- .prevent 阻止默认行为 -->
      <form @submit.prevent="onSubmit">
        <input type="text" />
        <button type="submit">提交（不会刷新页面）</button>
      </form>

      <!-- 按键修饰符 -->
      <input
        type="text"
        @keyup.enter="console.log(`按下了回车键`)"
        @keyup.esc="console.log(`按下了ESC键`)"
        placeholder="按回车键或ESC键"
      />

      <!-- 鼠标按键修饰符 -->
      <button @click.right.prevent="console.log(`右键点击`)">右键点击我</button>
    </div>
    <div class="marginBottom">
      <h2>表单输入绑定</h2>
      <p>文本: {{ message }}</p>
      <input v-model="message" placeholder="edit me" />

      <p style="white-space: pre-line">{{ multipleMessage }}</p>
      <!-- 注意在 <textarea> 中是不支持插值表达式的。 -->
      <textarea v-model="multipleMessage" placeholder="add multiple lines"></textarea>

      <h3>复选框</h3>
      <div>
        <label for="checkbox1">基本的复选框: </label>
        <input type="checkbox" id="checkbox1" name="checkbox1" />
        <br />
        <label for="checkbox2">带有默认勾选的复选框(使用checked属性): </label>
        <input type="checkbox" id="checkbox2" name="checkbox2" checked />
      </div>

      <!-- 多个复选框 -->
      <div>
        <h6 style="color: red">
          多个复选框的组合(当在表单中组合多个复选框，可以通过name属性将它们关联起来，以便在提交表单时一起发送。）
        </h6>
        <label for="checkbox3">选项3</label>
        <input type="checkbox" id="checkbox3" name="options" />
        <label for="checkbox4">选项4</label>
        <input type="checkbox" id="checkbox4" name="options" checked />
      </div>

      <h6 style="color: red">
        使用fieldset和legend组织复选框(为了更好地组织多个复选框，可以使用fieldset 和legend标签。) ‌
        复选框的核心属性包括：name:分组标识，相同 name
        的复选框属于同一组。value：选中时提交的值。checked：布尔属性，设置默认选中状态。disabled：禁用复选框交互。‌
        注意：所有需要提交的表单元素（包括复选框）都必须放在
        form标签内，这样才能通过表单提交机制发送数据。
      </h6>
      <fieldset>
        <legend>选择你的兴趣</legend>
        <label for="interest1">篮球</label>
        <input type="checkbox" id="interest1" name="interests" value="basketball" />
        <label for="interest2">足球</label>
        <input type="checkbox" id="interest2" name="interests" value="soccer" />
      </fieldset>

      <div>
        <label for="disabledCheckbox">不可选选项(禁用复选框): </label>
        <input type="checkbox" id="disabledCheckbox" name="disabledCheckbox" disabled />
      </div>

      <!-- 单选按钮 -->
      <div style="margin-top: 20px">
        <h2>单选按钮radio: {{ picked }}</h2>
        <input type="radio" value="男" v-model="picked" id="picked1" name="picked" />
        <label for="picked1">男</label>
        <input type="radio" value="女" v-model="picked" id="picked2" name="picked" />
        <label for="picked2">女</label>
      </div>

      <!-- 多选下拉 -->
      <div>
        <h2>select选择器： {{ selected }}</h2>
        <!-- 如果有使用 label -->
        <label for="my-select">选择城市: </label>
        <select id="my-select" v-model="selected">
          <option disabled value="">请选择e</option>
          <option>北京</option>
          <option>上海</option>
          <option>广州</option>
          <option>深圳</option>
        </select>

        <!-- 或者不使用 id，直接包裹 -->
        <label>
          请选择一个选项：
          <select v-model="selected">
            <option disabled value="">Please select one</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </label>
      </div>

      <!-- 修饰符 -->
      <!--
      <div>
        <label>.lazy修饰符（输入时不会立即更新）: </label>
        <input v-model.lazy="text" placeholder="试试输入然后移开焦点" />
        <p>值: {{ text }}</p>

        <label>.number修饰符（转为数字）: </label>
        <input v-model.number="form.age" type="number" />
        <p>类型: {{ typeof form.age }}</p>

        <label>.trim修饰符（去除首尾空格）: </label>
        <input v-model.trim="form.username" placeholder="输入带空格的名字" />
        <p>值: "{{ form.username }}"</p>
      </div>
-->
    </div>

    <!-- 完整表单示例 -->
    <div class="marginBottom">
      <h4>用户注册表单</h4>
      <form class="user-form" @submit.prevent="submitForm">
        <div>
          <label>用户名：</label>
          <input v-model="form.username" />
        </div>
        <div>
          <label>密码：</label>
          <input type="password" v-model="form.password" />
        </div>
        <div>
          <label>年龄：</label>
          <input type="number" v-model.number="form.age" min="0" max="120" />
        </div>
        <div>
          <p>性别：</p>
          <label for="picked1">男</label>
          <input type="radio" value="男" name="picked" id="picked1" v-model="form.gender" />
          <label for="picked2">女</label>
          <input type="radio" value="女" name="picked" id="picked2" v-model="form.gender" />
        </div>
        <div>
          <label>个人简介：</label>
          <textarea v-model="form.bio" rows="3"></textarea>
        </div>
        <div>
          <label>
            <input type="checkbox" v-model="form.agree" />
            同意服务条款
          </label>
        </div>
        <button type="submit" :disabled="!form.agree">提交表单</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
}

.marginBottom {
  margin-bottom: 50px;
}

.user-form div {
  margin: 10px 0;
}
.user-form label {
  display: inline-block;
  width: 100px;
}
.user-form input,
.user-form select,
.user-form textarea {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
