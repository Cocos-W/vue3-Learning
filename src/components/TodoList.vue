<script setup>
import { ref, computed } from 'vue'

// Todo项的数据结构
const newTodo = ref('')
const todos = ref([
  { id: 1, text: '学习Vue 3', completed: true },
  { id: 2, text: '完成TodoList项目', completed: false },
  { id: 3, text: '阅读Vue官方文档', completed: false },
])

// 筛选条件
const filter = ref('all') //'all' | 'active' | 'completed'

// 计算属性：根据筛选条件显示不同的todo
const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'active':
      return todos.value.filter((todo) => !todo.completed)
    case 'completed':
      return todos.value.filter((todo) => todo.completed)
    default:
      return todos.value
  }
})
/*
// 计算属性：根据筛选条件显示不同的todo
const filteredTodos = computed(() => {
  // 根据filter的值，返回不同的任务列表
  if (filter.value === 'active') {
    // let a = todos.value.filter((todo) => todo.completed === false)
    let a = todos.value.filter((todo) => !todo.completed)
    console.log(`aaa`, a)
    return a
  } else if (filter.value === 'completed') {
    let b = todos.value.filter((todo) => {
      return todo.completed == true //此处注意不要忘掉return.
    })
    console.log(`bbbbb`, b)
    return b
  } else {
    return todos.value
  }
})
*/
// 计算属性：统计未完成的任务数量
const remainingCount = computed(() => {
  return todos.value.filter((todo) => !todo.completed).length
})

// 计算属性：是否有任务
const hasTodos = computed(() => {
  return todos.value.length > 0
})

// 方法：添加新任务
function addTodo() {
  if (newTodo.value.trim() === '') return

  todos.value.push({
    id: Date.now(), // 用时间戳做唯一ID
    text: newTodo.value.trim(),
    completed: false, // 默认未完成
  })

  newTodo.value = ''
}

// 方法：删除任务
function removeTodo(id) {
  // console.log(`id`, id)
  todos.value = todos.value.filter((todo) => todo.id !== id)

  // let todosNew = ref()
  /*
  for (let i = 0; i < todos.value.length; i++) {
    let todo = todos.value[i]
    console.log(`todo`, todo)
    if (todo.id === id) {
      // todosNew.value = todos.value.splice(id)
      // console.log(`todos.splice`, todos.value)
      // console.log(`todosNew.splice`, todosNew.value)
      todos.value.splice(i, 1) // 删除当前位置的1个元素
      break // 找到并删除后跳出循环
    } else {
      console.warn('未找到对应任务')
    }
  }
  */
}

// 方法：切换任务状态
function toggleTodo(id) {
  // 新增：切换完成状态的方法
  // 1.找到用户点击的这个任务在数组（列表）中的位置
  // [ 我们只知道任务的 ID，不知道它在数组的哪个位置！所以使用 find() ：按条件找人]

  let todo = todos.value.find((todo) => todo.id === id)
  if (todo) {
    //2. 把用户点击的那个任务的 completed 从 false 改成 true
    // console.log('切换完成状态的方法', todo.completed)
    todo.completed = !todo.completed
  }
  /*
  //  方式二：  // 遍历所有任务
  for (let i = 0; i < todos.value.length; i++) {
    // 如果找到id匹配的任务
    if (todos.value[i] === id) {
      // 切换状态
      todos.value[i].completed = !todos.value[i].completed
      return // 找到后就可以退出了
    }
  }
  // 如果循环结束都没找到，什么也不做
  */
}

// 方法：清除所有已完成任务
function clearCompleted() {
  // let todosNew = todos.value.filter((todo) => !todo.completed)
  // console.log(`cc`, todosNew)
  todos.value = todos.value.filter((todo) => !todo.completed)
}

// 方法：切换所有任务状态
function toggleAll() {
  const allCompleted = todos.value.every((todo) => todo.completed)
  console.log(`000`, allCompleted)
  todos.value.forEach((todo) => {
    todo.completed = !allCompleted
  })
}
</script>

<template>
  <div class="todo-app">
    <h2>Vue 3 Todo List</h2>

    <!-- 添加任务表单 -->
    <div class="add-todo">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="输入新任务，按回车添加"
        class="todo-input"
      />
      <button @click="addTodo" class="add-btn">添加</button>
    </div>

    <!-- 任务列表 -->
    <div v-if="hasTodos" class="todo-list-container">
      <!-- 全选/取消全选 -->
      <div class="toggle-all-container">
        <button
          @click="toggleAll"
          :class="{ active: todos.every((t) => t.completed) }"
          class="toggle-all-btn"
        >
          ✓
        </button>
        <span>点击切换所有任务状态</span>
      </div>

      <!-- 任务列表 -->
      <ul class="todo-list">
        <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          :class="{ completed: todo.completed }"
          class="todo-item"
        >
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(todo.id)"
            class="todo-checkbox"
          />
          <span class="todo-text">{{ todo.text }}</span>
          <button @click="removeTodo(todo.id)" class="delete-btn">×</button>
        </li>
      </ul>

      <!-- 底部统计和筛选 -->
      <div class="todo-footer">
        <span class="todo-count"> {{ remainingCount }} 个任务未完成 </span>

        <!-- 筛选按钮 -->
        <div class="filters">
          <button @click="filter = 'all'" :class="{ active: filter === 'all' }">全部</button>
          <button @click="filter = 'active'" :class="{ active: filter === 'active' }">
            未完成
          </button>
          <button @click="filter = 'completed'" :class="{ active: filter === 'completed' }">
            已完成
          </button>
        </div>

        <!-- 清除已完成 -->
        <button
          @click="clearCompleted"
          v-if="todos.some((todo) => todo.completed)"
          class="clear-btn"
        >
          清除已完成
        </button>
      </div>
    </div>

    <!-- 没有任务时的提示 -->
    <div v-else class="empty-state">
      <p>🎉 目前没有任务，添加一个吧！</p>
    </div>

    <!-- 数据统计 -->
    <div class="stats">
      <h4>数据统计</h4>
      <p>总任务数: {{ todos.length }}</p>
      <p>已完成: {{ todos.filter((t) => t.completed).length }}</p>
      <p>未完成: {{ remainingCount }}</p>
      <p>
        完成率:
        {{
          todos.length
            ? Math.round((todos.filter((t) => t.completed).length / todos.length) * 100)
            : 0
        }}%
      </p>
    </div>
  </div>
</template>

<style scoped>
.todo-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.add-todo {
  display: flex;
  margin-bottom: 30px;
}

.todo-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #42b983;
  border-radius: 6px;
  font-size: 16px;
  margin-right: 10px;
  transition: border-color 0.3s;
}

.todo-input:focus {
  outline: none; /* 去掉input在聚焦时的默认样式 */
  border-color: #3aa876;
}

.add-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  background: #42b983;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.add-btn:hover {
  background: #3aa876;
}

.todo-list-container {
  border: 2px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.toggle-all-container {
  padding: 12px 16px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 10px; /* 每个子元素之间10px间距 */
}

.toggle-all-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #42b983;
  font-size: 12px;
  cursor: pointer;
  /* 设置背景为完全透明 = 能看到后面的内容*/
  background: transparent;
  /* 文字也透明  = 看不见但占位置 */
  color: transparent;
  transition: all 0.3s;
}

.toggle-all-btn.active {
  background: #42b983; /* 激活时有背景色 */
  color: white; /* 激活时有背景色 */
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  /* background-color: #bbe0b6; */
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
  transition: background 0.3s;
}

.todo-item:hover {
  background: #f8f9fa;
}

.todo-item:last-child {
  /* border-bottom: none; */
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  cursor: pointer;
}

.todo-text {
  flex: 1; /* 让文本占满剩余空间 */
  font-size: 16px;
  transition: color 0.3s;
}

/* 切换完成状态 */
.todo-item.completed .todo-text {
  color: #888;
  text-decoration: line-through; /* 删除线效果 */
}

.delete-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: #ff6b6b;
  color: white;
  cursor: pointer;
  font-size: 18px;
  opacity: 0;
  transition: opacity 0.3s;
}

.todo-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  background: #ff5252;
}

.todo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  /* border-top: 1px solid #eee; */
}

.todo-count {
  color: #666;
}

.filters {
  display: flex;
  gap: 8px;
}

.filters button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
}

.filters button.active {
  background: #42b983;
  color: white;
  border-color: #42b983;
}

.clear-btn {
  padding: 6px 12px;
  border: 1px solid #ff6b6b;
  border-radius: 4px;
  background: white;
  color: #ff6b6b;
  cursor: pointer;
  transition: all 0.3s;
}

.clear-btn:hover {
  background: #ff6b6b;
  color: white;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
}

.stats {
  margin-top: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.stats h4 {
  margin-top: 0;
  color: #333;
}
</style>
