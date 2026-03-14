/**
 * Ex No: 3b - Program based on React Hooks using useContext, useReducer, useRef
 * Date: 11-03-2026
 * 
 * Description: Advanced React hooks for complex state management and DOM manipulation.
 * useContext: Share state across components without prop drilling
 * useReducer: Complex state logic with multiple sub-values
 * useRef: Access DOM directly and persist mutable values
 * Use Case: Advanced complaint management system with global state
 */

import React, { createContext, useReducer, useContext, useRef, useState, useEffect } from 'react';

// ============================================
// 1. Create Context for global state
// ============================================
const ComplaintContext = createContext();

// ============================================
// 2. Reducer function for managing complex state
// ============================================
const complaintReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_COMPLAINT':
      return {
        ...state,
        complaints: [action.payload, ...state.complaints],
        totalCount: state.totalCount + 1
      };

    case 'DELETE_COMPLAINT':
      return {
        ...state,
        complaints: state.complaints.filter(c => c.id !== action.payload),
        totalCount: state.totalCount - 1
      };

    case 'UPDATE_COMPLAINT':
      return {
        ...state,
        complaints: state.complaints.map(c =>
          c.id === action.payload.id ? { ...c, ...action.payload.updates } : c
        )
      };

    case 'SET_FILTER':
      return {
        ...state,
        currentFilter: action.payload
      };

    case 'SET_SEARCH':
      return {
        ...state,
        searchTerm: action.payload
      };

    case 'RESET_ALL':
      return {
        complaints: [],
        totalCount: 0,
        currentFilter: 'All',
        searchTerm: ''
      };

    default:
      return state;
  }
};

// ============================================
// 3. Provider Component
// ============================================
function ComplaintProvider({ children }) {
  const initialState = {
    complaints: [
      {
        id: 1,
        title: 'Broken Furniture',
        category: 'Infrastructure',
        priority: 'High',
        status: 'Open',
        description: 'Several desks are broken',
        date: new Date(Date.now() - 86400000).toLocaleString()
      },
      {
        id: 2,
        title: 'Network Issues',
        category: 'Technical',
        priority: 'High',
        status: 'In Progress',
        description: 'WiFi connectivity problems',
        date: new Date(Date.now() - 172800000).toLocaleString()
      }
    ],
    totalCount: 2,
    currentFilter: 'All',
    searchTerm: ''
  };

  const [state, dispatch] = useReducer(complaintReducer, initialState);

  return (
    <ComplaintContext.Provider value={{ state, dispatch }}>
      {children}
    </ComplaintContext.Provider>
  );
}

// ============================================
// 4. Custom Hook to use Context
// ============================================
function useComplaint() {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error('useComplaint must be used within ComplaintProvider');
  }
  return context;
}

// ============================================
// 5. Complaint Form Component with useRef
// ============================================
function ComplaintFormWithRef() {
  const { dispatch } = useComplaint();
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const formRef = useRef(null);
  const [formState, setFormState] = useState({
    category: 'Infrastructure',
    priority: 'Medium'
  });

  // Focus on title input when component mounts
  useEffect(() => {
    console.log('Focusing on title input');
    titleRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Access DOM values using useRef
    const title = titleRef.current?.value.trim();
    const description = descriptionRef.current?.value.trim();

    if (!title || !description) {
      alert('Please fill all fields');
      return;
    }

    const newComplaint = {
      id: Date.now(),
      title,
      description,
      category: formState.category,
      priority: formState.priority,
      status: 'Open',
      date: new Date().toLocaleString()
    };

    dispatch({ type: 'ADD_COMPLAINT', payload: newComplaint });

    // Reset form using useRef
    if (formRef.current) {
      formRef.current.reset();
      titleRef.current?.focus();
    }

    console.log('New complaint added:', newComplaint);
  };

  return (
    <div style={styles.formSection}>
      <h2 style={styles.sectionTitle}>📝 Add New Complaint</h2>
      <form ref={formRef} onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Title:</label>
          <input
            ref={titleRef}
            type="text"
            placeholder="Enter complaint title"
            style={styles.input}
            maxLength="100"
          />
        </div>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Category:</label>
            <select
              value={formState.category}
              onChange={(e) => setFormState(prev => ({ ...prev, category: e.target.value }))}
              style={styles.select}
            >
              <option value="Infrastructure">Infrastructure</option>
              <option value="Academic">Academic</option>
              <option value="Hygiene">Hygiene</option>
              <option value="Security">Security</option>
              <option value="Technical">Technical</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Priority:</label>
            <select
              value={formState.priority}
              onChange={(e) => setFormState(prev => ({ ...prev, priority: e.target.value }))}
              style={styles.select}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description:</label>
          <textarea
            ref={descriptionRef}
            placeholder="Describe your complaint in detail"
            style={styles.textarea}
            rows="4"
            maxLength="500"
          />
        </div>

        <button type="submit" style={styles.submitBtn}>
          ✉️ Submit Complaint
        </button>
      </form>
    </div>
  );
}

// ============================================
// 6. Complaint List Component with Context
// ============================================
function ComplaintList() {
  const { state, dispatch } = useComplaint();

  // Filter complaints based on current filter and search
  const filteredComplaints = state.complaints.filter(complaint => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(state.searchTerm.toLowerCase());

    const matchesFilter =
      state.currentFilter === 'All' ||
      complaint.status === state.currentFilter ||
      complaint.priority === state.currentFilter;

    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (id, newStatus) => {
    dispatch({
      type: 'UPDATE_COMPLAINT',
      payload: { id, updates: { status: newStatus } }
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this complaint?')) {
      dispatch({ type: 'DELETE_COMPLAINT', payload: id });
      console.log('Complaint deleted:', id);
    }
  };

  return (
    <div style={styles.listSection}>
      <h2 style={styles.sectionTitle}>📋 All Complaints</h2>
      {filteredComplaints.length === 0 ? (
        <div style={styles.emptyState}>
          <p>📭 No complaints found</p>
        </div>
      ) : (
        <div style={styles.complaintsList}>
          {filteredComplaints.map(complaint => (
            <div key={complaint.id} style={styles.complaintCard}>
              <div style={styles.complaintHeader}>
                <h3 style={styles.complaintTitle}>{complaint.title}</h3>
                <div style={styles.badges}>
                  <span style={styles.priorityBadge(complaint.priority)}>
                    {complaint.priority}
                  </span>
                  <span style={styles.statusBadge(complaint.status)}>
                    {complaint.status}
                  </span>
                </div>
              </div>

              <p style={styles.complaintInfo}>
                <strong>Category:</strong> {complaint.category}
              </p>
              <p style={styles.complaintInfo}>
                <strong>Description:</strong> {complaint.description}
              </p>
              <p style={styles.complaintInfo}>
                <strong>Date:</strong> {complaint.date}
              </p>

              <div style={styles.actionButtons}>
                <select
                  value={complaint.status}
                  onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                  style={styles.statusSelect}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <button
                  onClick={() => handleDelete(complaint.id)}
                  style={styles.deleteBtn}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// 7. Filter Controls with useRef
// ============================================
function FilterControls() {
  const { state, dispatch } = useComplaint();
  const searchInputRef = useRef(null);

  const handleClearSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
      dispatch({ type: 'SET_SEARCH', payload: '' });
    }
  };

  return (
    <div style={styles.filterSection}>
      <h2 style={styles.sectionTitle}>🔍 Search & Filter</h2>
      <div style={styles.filterControls}>
        <div style={styles.searchGroup}>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="🔍 Search complaints..."
            onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
            style={styles.searchInput}
          />
          <button onClick={handleClearSearch} style={styles.clearBtn}>
            ✕ Clear
          </button>
        </div>

        <div style={styles.filterButtons}>
          {['All', 'Open', 'In Progress', 'Resolved', 'High', 'Medium', 'Low'].map(filter => (
            <button
              key={filter}
              onClick={() => dispatch({ type: 'SET_FILTER', payload: filter })}
              style={{
                ...styles.filterBtn,
                backgroundColor: state.currentFilter === filter ? '#667eea' : '#ddd',
                color: state.currentFilter === filter ? 'white' : '#333'
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// 8. Statistics Dashboard with Context
// ============================================
function Dashboard() {
  const { state } = useComplaint();

  const stats = {
    total: state.complaints.length,
    open: state.complaints.filter(c => c.status === 'Open').length,
    inProgress: state.complaints.filter(c => c.status === 'In Progress').length,
    resolved: state.complaints.filter(c => c.status === 'Resolved').length,
    highPriority: state.complaints.filter(c => c.priority === 'High').length
  };

  return (
    <div style={styles.dashboardSection}>
      <h2 style={styles.sectionTitle}>📊 Dashboard Statistics</h2>
      <div style={styles.statsContainer}>
        <StatCard title="Total Complaints" value={stats.total} color="#2196F3" />
        <StatCard title="Open" value={stats.open} color="#FF9800" />
        <StatCard title="In Progress" value={stats.inProgress} color="#9C27B0" />
        <StatCard title="Resolved" value={stats.resolved} color="#4CAF50" />
        <StatCard title="High Priority" value={stats.highPriority} color="#f44336" />
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div style={{ ...styles.statCard, backgroundColor: color }}>
      <p style={styles.statValue}>{value}</p>
      <p style={styles.statLabel}>{title}</p>
    </div>
  );
}

// ============================================
// 9. Main App Component
// ============================================
function ComplaintManagementApp() {
  const { state, dispatch } = useComplaint();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🎓 Smart Campus Complaint Management System</h1>
        <p style={styles.subtitle}>Advanced React Hooks - useContext, useReducer, useRef</p>
      </header>

      <Dashboard />

      <div style={styles.mainContent}>
        <div style={styles.leftColumn}>
          <ComplaintFormWithRef />
        </div>
        <div style={styles.rightColumn}>
          <FilterControls />
          <ComplaintList />
        </div>
      </div>

      <div style={styles.footer}>
        <button
          onClick={() => {
            if (window.confirm('Reset all complaints?')) {
              dispatch({ type: 'RESET_ALL' });
            }
          }}
          style={styles.resetBtn}
        >
          🔄 Reset All
        </button>
        <p style={styles.footerText}>
          ✓ useContext Hook | ✓ useReducer Hook | ✓ useRef Hook
        </p>
        <p style={styles.footerStats}>
          Total: {state.complaints.length} | Filter: {state.currentFilter} | Search: "{state.searchTerm}"
        </p>
      </div>
    </div>
  );
}

// ============================================
// 10. Styles
// ============================================
const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#f0f2f5'
  },
  header: {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '30px 20px',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '30px'
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '32px'
  },
  subtitle: {
    margin: '0',
    fontSize: '16px',
    opacity: '0.9'
  },
  dashboardSection: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '8px',
    marginBottom: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  sectionTitle: {
    fontSize: '24px',
    color: '#333',
    marginTop: '0',
    marginBottom: '20px',
    borderBottom: '3px solid #667eea',
    paddingBottom: '10px'
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px'
  },
  statCard: {
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  statValue: {
    margin: '0',
    fontSize: '32px',
    fontWeight: 'bold'
  },
  statLabel: {
    margin: '5px 0 0 0',
    fontSize: '14px'
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '30px'
  },
  leftColumn: {},
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formSection: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
    fontSize: '14px'
  },
  input: {
    padding: '10px',
    border: '2px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px',
    fontFamily: 'inherit'
  },
  select: {
    padding: '10px',
    border: '2px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px',
    backgroundColor: 'white'
  },
  textarea: {
    padding: '10px',
    border: '2px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px',
    fontFamily: 'inherit'
  },
  submitBtn: {
    padding: '12px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  filterSection: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  filterControls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  searchGroup: {
    display: 'flex',
    gap: '10px'
  },
  searchInput: {
    flex: '1',
    padding: '10px',
    border: '2px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px'
  },
  clearBtn: {
    padding: '10px 15px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  filterButtons: {
    display: 'flex',
    gap: '5px',
    flexWrap: 'wrap'
  },
  filterBtn: {
    padding: '8px 12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s'
  },
  listSection: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#999'
  },
  complaintsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  complaintCard: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '5px',
    borderLeft: '5px solid #667eea'
  },
  complaintHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '10px'
  },
  complaintTitle: {
    margin: '0',
    color: '#333',
    fontSize: '16px'
  },
  badges: {
    display: 'flex',
    gap: '8px'
  },
  priorityBadge: (priority) => ({
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 'bold',
    backgroundColor:
      priority === 'High' ? '#f44336' :
      priority === 'Medium' ? '#FF9800' :
      '#4CAF50',
    color: 'white'
  }),
  statusBadge: (status) => ({
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 'bold',
    backgroundColor:
      status === 'Open' ? '#2196F3' :
      status === 'In Progress' ? '#9C27B0' :
      '#4CAF50',
    color: 'white'
  }),
  complaintInfo: {
    margin: '5px 0',
    color: '#666',
    fontSize: '12px'
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px'
  },
  statusSelect: {
    flex: '1',
    padding: '6px',
    border: '2px solid #ddd',
    borderRadius: '4px',
    fontSize: '12px'
  },
  deleteBtn: {
    padding: '6px 10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  resetBtn: {
    padding: '10px 20px',
    backgroundColor: '#9C27B0',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '15px'
  },
  footerText: {
    margin: '10px 0 0 0',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333'
  },
  footerStats: {
    margin: '5px 0 0 0',
    fontSize: '12px',
    color: '#666'
  }
};

// ============================================
// 11. Main Export with Provider
// ============================================
export default function App() {
  return (
    <ComplaintProvider>
      <ComplaintManagementApp />
    </ComplaintProvider>
  );
}

/**
 * 
 * EXPECTED OUTPUT:
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │    🎓 Smart Campus Complaint Management System                   │
 * │  Advanced React Hooks - useContext, useReducer, useRef           │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 📊 Dashboard Statistics                                          │
 * │ ┌────────┬────────┬────────┬────────┬────────┐                  │
 * │ │ Total:2│ Open:1 │InProg:1│Resolved:0│ High:2 │            │
 * │ └────────┴────────┴────────┴────────┴────────┘                  │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────┬─────────────────────────────┐
 * │       LEFT COLUMN                │     RIGHT COLUMN            │
 * │                                  │                             │
 * │ ┌──────────────────────────────┐ │ ┌────────────────────────┐  │
 * │ │ 📝 Add New Complaint          │ │ │ 🔍 Search & Filter    │  │
 * │ │                              │ │ │                        │  │
 * │ │ Title: [___________]         │ │ │ [🔍 Search...] [✕]    │  │
 * │ │                              │ │ │                        │  │
 * │ │ Category: [Infra v]          │ │ │ [All][Open][Progress] │  │
 * │ │ Priority: [Medium v]         │ │ │ [Resolved][High][Med] │  │
 * │ │                              │ │ │ [Low]                 │  │
 * │ │ Description:                 │ │ └────────────────────────┘  │
 * │ │ [__________________]         │ │                             │
 * │ │                              │ │ ┌────────────────────────┐  │
 * │ │ [✉️ Submit Complaint]         │ │ │ 📋 All Complaints    │  │
 * │ │                              │ │ │                        │  │
 * │ │                              │ │ │ ┌──────────────────┐   │  │
 * │ │                              │ │ │ │Broken Furniture  │   │  │
 * │ │                              │ │ │ │[High][Open]      │   │  │
 * │ │                              │ │ │ │Infrastructure    │   │  │
 * │ │                              │ │ │ │Status:[v] [🗑️]   │   │  │
 * │ │                              │ │ │ └──────────────────┘   │  │
 * │ │                              │ │ │                        │  │
 * │ │                              │ │ │ ┌──────────────────┐   │  │
 * │ │                              │ │ │ │Network Issues    │   │  │
 * │ │                              │ │ │ │[High][InProgres] │   │  │
 * │ │                              │ │ │ │Technical         │   │  │
 * │ │                              │ │ │ │Status:[v] [🗑️]   │   │  │
 * │ │                              │ │ │ └──────────────────┘   │  │
 * │ └──────────────────────────────┘ │ │                        │  │
 * │                                  │ │ 📭 (if empty)         │  │
 * │                                  │ └────────────────────────┘  │
 * └─────────────────────────────────┴─────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ [🔄 Reset All]                                                   │
 * │                                                                 │
 * │ ✓ useContext Hook | ✓ useReducer Hook | ✓ useRef Hook          │
 * │ Total: 2 | Filter: All | Search: ""                             │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * CONSOLE OUTPUT:
 * > Focusing on title input
 * > New complaint added: {id: 1710115..., title: 'Leaking Faucet', ...}
 * > Complaint deleted: 1710115...
 * 
 * KEY HOOKS DEMONSTRATED:
 * 
 * 1. useContext Hook:
 *    - Creates ComplaintContext for global state
 *    - Avoids prop drilling
 *    - Provides dispatch to all components
 *    - Custom hook: useComplaint() for easier access
 * 
 * 2. useReducer Hook:
 *    - Manages complex state with complaintReducer function
 *    - Actions: ADD_COMPLAINT, DELETE_COMPLAINT, UPDATE_COMPLAINT
 *    - Actions: SET_FILTER, SET_SEARCH, RESET_ALL
 *    - Better for multi-related state values
 * 
 * 3. useRef Hook:
 *    - titleRef: Direct DOM access to input element
 *    - descriptionRef: Access textarea value directly
 *    - formRef: Reset form without re-render
 *    - searchInputRef: Clear search input
 *    - Persists across re-renders without causing re-render
 * 
 * ADVANTAGES:
 * ✓ Global state management without prop drilling
 * ✓ Clean dispatch-based actions
 * ✓ Direct DOM manipulation with useRef
 * ✓ Complex state logic organized in reducer
 * ✓ Better performance with proper memoization potential
 * ✓ Scalable architecture for large applications
 * 
 * USE CASES:
 * 1. useContext: Share auth state, theme, user data across app
 * 2. useReducer: Form state, shopping cart, complex workflows
 * 3. useRef: Focus management, form clearing, DOM measurement
 * 
 */
