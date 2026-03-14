/**
 * Ex No: 3a - Program based on React Hooks using useState and useEffect
 * Date: 03-02-2026
 * 
 * Description: This example demonstrates React hooks for state management and side effects.
 * useState: Manages state in functional components
 * useEffect: Handles side effects (API calls, subscriptions, timers)
 * Use Case: Complaint form submission and real-time updates
 */

import React, { useState, useEffect } from 'react';

function ComplaintFormWithHooks() {
  // State variables using useState hook
  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    priority: 'Medium'
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [serverTime, setServerTime] = useState(new Date().toLocaleString());

  // useEffect: Simulates fetching complaints from API on mount
  useEffect(() => {
    console.log('Component mounted - Fetching initial data');
    // Simulate API call
    const initialComplaints = [
      {
        id: 1,
        title: 'Broken Chairs',
        category: 'Infrastructure',
        description: 'Chairs in classroom broken',
        priority: 'High',
        date: new Date(Date.now() - 3600000).toLocaleString(),
        status: 'Open'
      },
      {
        id: 2,
        title: 'WiFi Down',
        category: 'Technical',
        description: 'Internet not working in hostel',
        priority: 'High',
        date: new Date(Date.now() - 7200000).toLocaleString(),
        status: 'In Progress'
      }
    ];
    setComplaints(initialComplaints);
    setFilteredComplaints(initialComplaints);
    setLoading(false);
  }, []); // Empty dependency array - runs only on mount

  // useEffect: Update server time every second
  useEffect(() => {
    console.log('Setting up interval for server time');
    const interval = setInterval(() => {
      setServerTime(new Date().toLocaleString());
    }, 1000);

    // Cleanup function - runs when component unmounts
    return () => {
      console.log('Cleaning up interval');
      clearInterval(interval);
    };
  }, []); // Runs once on mount, cleanup on unmount

  // useEffect: Filter and sort complaints when dependencies change
  useEffect(() => {
    console.log('Filtering/Sorting complaints...');
    let filtered = complaints.filter(complaint =>
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort based on sortBy state
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'priority') {
      const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
      filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    setFilteredComplaints(filtered);
  }, [complaints, searchTerm, sortBy]); // Runs when any dependency changes

  // useEffect: Show success message and auto-hide after 3 seconds
  useEffect(() => {
    if (successMessage) {
      console.log('Success message displayed:', successMessage);
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [successMessage]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.description) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newComplaint = {
        id: complaints.length + 1,
        ...formData,
        date: new Date().toLocaleString(),
        status: 'Open'
      };

      setComplaints(prev => [newComplaint, ...prev]);
      setFormData({ title: '', category: '', description: '', priority: 'Medium' });
      setLoading(false);
      setSuccessMessage('✅ Complaint submitted successfully!');
    }, 1500);
  };

  // Handle delete complaint
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      setComplaints(prev => prev.filter(complaint => complaint.id !== id));
    }
  };

  // Calculate statistics
  const stats = {
    total: complaints.length,
    open: complaints.filter(c => c.status === 'Open').length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    high: complaints.filter(c => c.priority === 'High').length
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>🎯 Smart Campus Complaint System</h1>
        <p style={styles.subtitle}>React Hooks - useState & useEffect Demo</p>
        <p style={styles.serverTime}>Server Time: {serverTime}</p>
      </header>

      {/* Statistics Dashboard */}
      <div style={styles.statsContainer}>
        <div style={{...styles.statCard, backgroundColor: '#2196F3'}}>
          <p style={styles.statValue}>{stats.total}</p>
          <p style={styles.statLabel}>Total Complaints</p>
        </div>
        <div style={{...styles.statCard, backgroundColor: '#FF9800'}}>
          <p style={styles.statValue}>{stats.open}</p>
          <p style={styles.statLabel}>Open</p>
        </div>
        <div style={{...styles.statCard, backgroundColor: '#4CAF50'}}>
          <p style={styles.statValue}>{stats.inProgress}</p>
          <p style={styles.statLabel}>In Progress</p>
        </div>
        <div style={{...styles.statCard, backgroundColor: '#f44336'}}>
          <p style={styles.statValue}>{stats.high}</p>
          <p style={styles.statLabel}>High Priority</p>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div style={styles.successMessage}>
          {successMessage}
        </div>
      )}

      {/* Complaint Form */}
      <div style={styles.formSection}>
        <h2 style={styles.sectionTitle}>📝 Submit New Complaint</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter complaint title"
              style={styles.input}
              maxLength="100"
            />
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Category:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={styles.select}
              >
                <option value="">Select Category</option>
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
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
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
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your complaint in detail"
              style={styles.textarea}
              rows="4"
              maxLength="500"
            />
            <p style={styles.charCount}>
              {formData.description.length}/500 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={styles.submitBtn}
          >
            {loading ? '⏳ Submitting...' : '✉️ Submit Complaint'}
          </button>
        </form>
      </div>

      {/* Search and Filter Section */}
      <div style={styles.filterSection}>
        <h2 style={styles.sectionTitle}>🔍 View Complaints</h2>
        <div style={styles.filterControls}>
          <input
            type="text"
            placeholder="🔍 Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.sortSelect}
          >
            <option value="date">Sort by Date (Newest)</option>
            <option value="priority">Sort by Priority</option>
          </select>
        </div>
      </div>

      {/* Complaints List */}
      <div style={styles.complaintsList}>
        {filteredComplaints.length === 0 ? (
          <div style={styles.emptyState}>
            <p>📭 No complaints found</p>
          </div>
        ) : (
          filteredComplaints.map(complaint => (
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
                <strong>Submitted:</strong> {complaint.date}
              </p>
              <button
                onClick={() => handleDelete(complaint.id)}
                style={styles.deleteBtn}
              >
                🗑️ Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          ✓ useState Hook | ✓ useEffect Hook | ✓ Controlled Components
        </p>
        <p style={styles.footerSubtext}>
          Total Visible: {filteredComplaints.length} | Total Records: {complaints.length}
        </p>
      </footer>
    </div>
  );
}

// Styles
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#f5f5f5'
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
  serverTime: {
    margin: '10px 0 0 0',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px',
    marginBottom: '30px'
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
  successMessage: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
    animation: 'slideDown 0.3s ease'
  },
  formSection: {
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
    color: '#333'
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
    fontFamily: 'inherit',
    backgroundColor: 'white'
  },
  textarea: {
    padding: '10px',
    border: '2px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  charCount: {
    fontSize: '12px',
    color: '#999',
    margin: '5px 0 0 0'
  },
  submitBtn: {
    padding: '12px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px'
  },
  filterSection: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '8px',
    marginBottom: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  filterControls: {
    display: 'grid',
    gridTemplateColumns: '1fr 150px',
    gap: '15px'
  },
  searchInput: {
    padding: '10px',
    border: '2px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px'
  },
  sortSelect: {
    padding: '10px',
    border: '2px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px'
  },
  complaintsList: {
    marginBottom: '30px'
  },
  emptyState: {
    backgroundColor: 'white',
    padding: '40px',
    textAlign: 'center',
    borderRadius: '8px',
    color: '#999'
  },
  complaintCard: {
    backgroundColor: 'white',
    padding: '20px',
    marginBottom: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
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
    fontSize: '18px'
  },
  badges: {
    display: 'flex',
    gap: '10px'
  },
  priorityBadge: (priority) => ({
    padding: '4px 10px',
    borderRadius: '15px',
    fontSize: '12px',
    fontWeight: 'bold',
    backgroundColor:
      priority === 'High' ? '#f44336' :
      priority === 'Medium' ? '#FF9800' :
      '#4CAF50',
    color: 'white'
  }),
  statusBadge: (status) => ({
    padding: '4px 10px',
    borderRadius: '15px',
    fontSize: '12px',
    fontWeight: 'bold',
    backgroundColor:
      status === 'Open' ? '#2196F3' :
      status === 'In Progress' ? '#9C27B0' :
      '#4CAF50',
    color: 'white'
  }),
  complaintInfo: {
    margin: '8px 0',
    color: '#666',
    fontSize: '14px'
  },
  deleteBtn: {
    marginTop: '10px',
    padding: '8px 15px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    borderTop: '2px solid #ddd',
    color: '#666'
  },
  footerText: {
    margin: '0',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  footerSubtext: {
    margin: '10px 0 0 0',
    fontSize: '12px',
    color: '#999'
  }
};

export default ComplaintFormWithHooks;

/**
 * 
 * EXPECTED OUTPUT:
 * 
 * ┌───────────────────────────────────────────────────────────────────┐
 * │        🎯 Smart Campus Complaint System                           │
 * │      React Hooks - useState & useEffect Demo                      │
 * │   Server Time: DD-MM-YYYY HH:MM:SS (updates every second)         │
 * └───────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────┬──────────┬──────────────┬──────────────┐
 * │  Total: 2   │ Open: 1  │ In Progress: 1 │ High Pri: 2 │
 * └─────────────┴──────────┴──────────────┴──────────────┘
 * 
 * ┌───────────────────────────────────────────────────────────────────┐
 * │ 📝 Submit New Complaint                                            │
 * ├───────────────────────────────────────────────────────────────────┤
 * │ Title:                                                             │
 * │ [________________________________]                               │
 * │                                                                   │
 * │ Category:            Priority:                                    │
 * │ [Select Category]    [Medium ▼]                                   │
 * │                                                                   │
 * │ Description:                                                      │
 * │ [________________________________________________]                  │
 * │ 0/500 characters                                                 │
 * │                                                                   │
 * │              [✉️ Submit Complaint]                               │
 * └───────────────────────────────────────────────────────────────────┘
 * 
 * ┌───────────────────────────────────────────────────────────────────┐
 * │ 🔍 View Complaints                                                 │
 * │                                                                   │
 * │ [🔍 Search complaints...]  [Sort by Date ▼]                       │
 * └───────────────────────────────────────────────────────────────────┘
 * 
 * ┌───────────────────────────────────────────────────────────────────┐
 * │ Broken Chairs                              [High] [Open]           │
 * │ Category: Infrastructure                                           │
 * │ Description: Chairs in classroom broken                            │
 * │ Submitted: DD-MM-YYYY HH:MM:SS                                     │
 * │                                            [🗑️ Delete]            │
 * └───────────────────────────────────────────────────────────────────┘
 * 
 * ┌───────────────────────────────────────────────────────────────────┐
 * │ WiFi Down                                  [High] [In Progress]     │
 * │ Category: Technical                                                │
 * │ Description: Internet not working in hostel                        │
 * │ Submitted: DD-MM-YYYY HH:MM:SS                                     │
 * │                                            [🗑️ Delete]            │
 * └───────────────────────────────────────────────────────────────────┘
 * 
 * ✓ useState Hook | ✓ useEffect Hook | ✓ Controlled Components
 * Total Visible: 2 | Total Records: 2
 * 
 * AFTER SUBMITTING A NEW COMPLAINT:
 * 
 * ┌────────────────────────────────────────┐
 * │ ✅ Complaint submitted successfully!   │ (auto-hides after 3s)
 * └────────────────────────────────────────┘
 * 
 * CONSOLE OUTPUT:
 * > Component mounted - Fetching initial data
 * > Setting up interval for server time
 * > Filtering/Sorting complaints...
 * > Success message displayed: ✅ Complaint submitted successfully!
 * > Filtering/Sorting complaints...
 * 
 * KEY HOOKS DEMONSTRATED:
 * 
 * 1. useState Hook:
 *    - Managing form data
 *    - Managing complaints list
 *    - Managing loading state
 *    - Managing success messages
 *    - Managing search and sort
 * 
 * 2. useEffect Hook:
 *    - Initial data fetching (empty dependency array)
 *    - Side effect with cleanup (interval, timer)
 *    - Filtering/sorting based on dependencies
 *    - Auto-hiding success messages
 * 
 * 3. Dependency Arrays:
 *    - [] = runs once on mount
 *    - [dep1, dep2] = runs when dependencies change
 *    - Cleanup functions for memory management
 * 
 * ADVANTAGES:
 * ✓ Simpler syntax compared to class components
 * ✓ Easier state management
 * ✓ Better side effect handling
 * ✓ Reusable logic through custom hooks
 * ✓ Better performance optimization
 * 
 */
