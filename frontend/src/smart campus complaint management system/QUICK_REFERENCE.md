# Quick Reference Guide - React Examples

## 📚 One-Page Reference

### Exercise 2a: Class Component Pattern

```javascript
// SYNTAX
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }; // Initialize state
  }

  // Method
  handleClick = () => {
    this.setState({ count: this.state.count + 1 }); // Update state
  }

  // Lifecycle
  componentDidMount() { /* Runs on mount */ }
  componentDidUpdate() { /* Runs after update */ }
  componentWillUnmount() { /* Cleanup */ }

  // Render
  render() {
    return <div>{this.state.count}</div>;
  }
}
```

**When to use**: Legacy code, complex lifecycle needs

---

### Exercise 2b: Functional Component Pattern

```javascript
// SYNTAX
function MyComponent(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
}

// OR with destructuring
function MyComponent({ title, description, onClick }) {
  return <div onClick={onClick}>{title}</div>;
}
```

**When to use**: Simple display components, reusable components

---

### Exercise 3a: useState Hook Pattern

```javascript
// SYNTAX
const [state, setState] = useState(initialValue);

// EXAMPLES
const [count, setCount] = useState(0);
const [name, setName] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [items, setItems] = useState([]); // Array
const [user, setUser] = useState({}); // Object

// UPDATING
setCount(count + 1);                    // Direct value
setCount(prev => prev + 1);             // Function form
setItems([...items, newItem]);          // Array spread
setUser({ ...user, name: 'New' });      // Object spread
```

**When to use**: State in functional components

---

### Exercise 3a: useEffect Hook Pattern

```javascript
// SYNTAX
useEffect(() => {
  // Side effect code
  return () => { // Cleanup function (optional)
    // Cleanup code
  };
}, [dependencies]); // Dependency array

// PATTERNS
// 1. Run once on mount
useEffect(() => { /* init */ }, [])

// 2. Run on dependency change
useEffect(() => { /* update */ }, [dep1, dep2])

// 3. Run on every render (avoid!)
useEffect(() => { /* always */ })

// 4. Only cleanup
useEffect(() => {
  return () => { /* cleanup */ };
}, [])

// COMMON USE CASES
// Fetch data
useEffect(() => {
  fetch('/api/data').then(r => r.json()).then(setData);
}, [])

// Interval
useEffect(() => {
  const timer = setInterval(() => { /* ... */ }, 1000);
  return () => clearInterval(timer);
}, [])

// Event listener
useEffect(() => {
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, [])
```

**When to use**: Side effects, subscriptions, timers, API calls

---

### Exercise 3b: useContext Hook Pattern

```javascript
// 1. CREATE CONTEXT
const MyContext = createContext();

// 2. PROVIDER COMPONENT
function MyProvider({ children }) {
  const value = { /* your state */ };
  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
}

// 3. CUSTOM HOOK
function useMyContext() {
  return useContext(MyContext);
}

// 4. USE IN COMPONENT
function MyComponent() {
  const { value } = useMyContext();
  return <div>{value}</div>;
}

// 5. WRAP APP
<MyProvider>
  <App />
</MyProvider>
```

**When to use**: Global state (theme, auth, lang), avoid prop drilling

---

### Exercise 3b: useReducer Hook Pattern

```javascript
// SYNTAX
const [state, dispatch] = useReducer(reducer, initialState);

// 1. DEFINE REDUCER
function reducer(state, action) {
  switch(action.type) {
    case 'ADD':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'UPDATE':
      return { ...state, count: action.payload };
    default:
      return state;
  }
}

// 2. INITIALIZE
const [state, dispatch] = useReducer(reducer, {
  items: [],
  count: 0
});

// 3. DISPATCH ACTIONS
dispatch({ type: 'ADD', payload: newItem });
dispatch({ type: 'REMOVE', payload: itemId });
dispatch({ type: 'UPDATE', payload: 5 });
```

**When to use**: Complex state with multiple related values, multiple actions

---

### Exercise 3b: useRef Hook Pattern

```javascript
// SYNTAX
const ref = useRef(initialValue);

// ACCESS
ref.current // Get/set value (doesn't trigger re-render)

// USE CASES

// 1. Focus element
const inputRef = useRef(null);
useEffect(() => inputRef.current?.focus(), []);
<input ref={inputRef} />

// 2. Get input value
const handleClick = () => {
  const value = inputRef.current?.value;
  console.log(value);
};

// 3. Store mutable value
const countRef = useRef(0);
const increment = () => {
  countRef.current += 1; // No re-render
};

// 4. Store timer ID
const timerRef = useRef(null);
timerRef.current = setInterval(() => {}, 1000);
clearInterval(timerRef.current);
```

**When to use**: DOM access, focus management, storing mutable values

---

## 🔄 Comparison Matrix

| Task | Class | Functional | useState | useEffect | useReducer | useRef |
|------|-------|-----------|---------|-----------|-----------|--------|
| **State** | ✓ | ✗ | ✓ | ✗ | ✓ | ✗ |
| **Simple Props** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Lifecycle** | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ |
| **Side Effects** | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ |
| **Global State** | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| **DOM Access** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Form Handling** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Performance** | Good | Better | Better | Better | Best | Best |

---

## 🎯 Decision Tree

```
Need state in functional component?
├─ Yes → Simple state?
│        ├─ Yes → Use useState
│        └─ No → Use useReducer
└─ No → Use functional component

Need side effects?
├─ Yes → Use useEffect with dependencies
└─ No → Skip useEffect

Need global state?
├─ Yes → Simple?
│        ├─ Yes → Use useContext
│        └─ No → Use useContext + useReducer
└─ No → Use local state

Need DOM access?
├─ Yes → Use useRef or ref attribute
└─ No → Skip useRef
```

---

## 📝 Code Snippets

### Complete Counter with useState
```javascript
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
```

### Complete Todo with useReducer
```javascript
function todos(state, action) {
  switch(action.type) {
    case 'ADD': return [...state, action.payload];
    case 'REMOVE': return state.filter(t => t.id !== action.payload);
    default: return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todos, []);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    dispatch({ type: 'ADD', payload: { id: Date.now(), text: input } });
    setInput('');
  };

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      {todos.map(t => (
        <div key={t.id}>
          {t.text}
          <button onClick={() => dispatch({ type: 'REMOVE', payload: t.id })}>×</button>
        </div>
      ))}
    </div>
  );
}
```

### Complete Global State with useContext
```javascript
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

function MyComponent() {
  const { theme, setTheme } = useTheme();
  return (
    <div style={{ background: theme === 'dark' ? '#000' : '#fff' }}>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MyComponent />
    </ThemeProvider>
  );
}
```

---

## ⚡ Performance Tips

```javascript
// ✓ GOOD - Only re-render when dependencies change
useEffect(() => { /* expensive operation */ }, [dependency])

// ✗ BAD - Runs every render
useEffect(() => { /* expensive operation */ })

// ✓ GOOD - Use useCallback to memoize callback
const handleClick = useCallback(() => { /* ... */ }, [])

// ✓ GOOD - Use useMemo to memoize values
const expensiveValue = useMemo(() => heavyCalculation(), [dependency])

// ✓ GOOD - Cleanup timers and subscriptions
useEffect(() => {
  const timer = setTimeout(() => {}, 1000);
  return () => clearTimeout(timer);
}, [])

// ✗ BAD - Creating new objects in render
const obj = { key: value }; // Creates new object every render
const arr = [item1, item2];  // Creates new array every render

// ✓ GOOD - Memoize objects and arrays
const obj = useMemo(() => ({ key: value }), [value])
const arr = useMemo(() => [item1, item2], [item1, item2])
```

---

## 🐛 Common Mistakes

```javascript
// ✗ WRONG - Setting state based on state without function form
setState(state + 1);
setState(state + 1); // May not work as expected

// ✓ CORRECT - Use function form
setState(prev => prev + 1);

// ✗ WRONG - Missing dependency array
useEffect(() => { /* uses dependency */ }) // Infinite loop!

// ✓ CORRECT - Include all dependencies
useEffect(() => { /* uses dependency */ }, [dependency])

// ✗ WRONG - Calling hooks conditionally
if (condition) {
  const [state, setState] = useState(0);
}

// ✓ CORRECT - Always call at top level
const [state, setState] = useState(0);

// ✗ WRONG - Not cleaning up side effects
useEffect(() => {
  window.addEventListener('resize', handler); // Memory leak!
}, [])

// ✓ CORRECT - Return cleanup function
useEffect(() => {
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, [])

// ✗ WRONG - Direct state mutation
state.arr.push(item); // Don't mutate!

// ✓ CORRECT - Create new object/array
setState([...state.arr, item]);
```

---

## 📚 Cheat Sheet Summary

| Hook | Purpose | Usage | Cleanup |
|------|---------|-------|---------|
| **useState** | Manage state | `const [state, setState] = useState(init)` | N/A |
| **useEffect** | Side effects | `useEffect(() => {...}, [deps])` | Return function |
| **useContext** | Share state | `const value = useContext(Context)` | N/A |
| **useReducer** | Complex state | `const [s, d] = useReducer(fn, init)` | N/A |
| **useRef** | DOM access | `const ref = useRef(null)` | N/A |
| **useCallback** | Memoize callback | `const cb = useCallback(() => {...}, [deps])` | N/A |
| **useMemo** | Memoize value | `const val = useMemo(() => {...}, [deps])` | N/A |

---

## 🎓 Learning Path

```
Week 1: Functional Components (Ex 2b)
├─ Props and destructuring
├─ Component composition
└─ Array mapping and conditional rendering

Week 2: Class Components (Ex 2a)
├─ State and setState
├─ Lifecycle methods
└─ Event handling and binding

Week 3: Basic Hooks (Ex 3a)
├─ useState for state
├─ useEffect for side effects
├─ Dependency arrays
└─ Form handling

Week 4: Advanced Hooks (Ex 3b)
├─ useContext for global state
├─ useReducer for complex logic
├─ useRef for DOM access
└─ Custom hooks
```

---

**Last Updated**: 08-03-2026  
**Version**: 1.0  
**Ready for**: Production Demo
