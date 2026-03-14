/**
 * Ex No: 2a - Program based on Stateful Class Component
 * Date: 27-01-2026
 * 
 * Description: This example demonstrates a React class component with state management.
 * It shows how class components handle state using this.state and this.setState().
 * Use Case: Counter application in Smart Campus Complaint System
 */

import React from 'react';

class ComplaintCounter extends React.Component {
  constructor(props) {
    super(props);
    
    // Initialize state in constructor
    this.state = {
      totalComplaints: 0,
      resolvedComplaints: 0,
      pendingComplaints: 0,
      categoryCount: {
        infrastructure: 0,
        academic: 0,
        hygiene: 0,
        security: 0
      },
      lastUpdated: new Date().toLocaleString()
    };
  }

  // Method to add a complaint
  addComplaint = () => {
    this.setState((prevState) => ({
      totalComplaints: prevState.totalComplaints + 1,
      pendingComplaints: prevState.pendingComplaints + 1,
      lastUpdated: new Date().toLocaleString()
    }));
  }

  // Method to resolve a complaint
  resolveComplaint = () => {
    if (this.state.pendingComplaints > 0) {
      this.setState((prevState) => ({
        resolvedComplaints: prevState.resolvedComplaints + 1,
        pendingComplaints: prevState.pendingComplaints - 1,
        lastUpdated: new Date().toLocaleString()
      }));
    }
  }

  // Method to increment category count
  addToCategory = (category) => {
    this.setState((prevState) => ({
      categoryCount: {
        ...prevState.categoryCount,
        [category]: prevState.categoryCount[category] + 1
      },
      lastUpdated: new Date().toLocaleString()
    }));
  }

  // Method to reset all counters
  resetCounters = () => {
    this.setState({
      totalComplaints: 0,
      resolvedComplaints: 0,
      pendingComplaints: 0,
      categoryCount: {
        infrastructure: 0,
        academic: 0,
        hygiene: 0,
        security: 0
      },
      lastUpdated: new Date().toLocaleString()
    });
  }

  // Lifecycle method - Called when component mounts
  componentDidMount() {
    console.log('ComplaintCounter component has mounted');
  }

  // Lifecycle method - Called after state update
  componentDidUpdate(prevProps, prevState) {
    if (prevState.totalComplaints !== this.state.totalComplaints) {
      console.log(`Total complaints updated to: ${this.state.totalComplaints}`);
    }
  }

  render() {
    const { 
      totalComplaints, 
      resolvedComplaints, 
      pendingComplaints, 
      categoryCount,
      lastUpdated 
    } = this.state;

    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>📋 Smart Campus Complaint Management System</h1>
        
        {/* Statistics Dashboard */}
        <div style={styles.statsContainer}>
          <div style={styles.statBox}>
            <h2 style={styles.statValue}>{totalComplaints}</h2>
            <p style={styles.statLabel}>Total Complaints</p>
          </div>
          <div style={{...styles.statBox, backgroundColor: '#4CAF50'}}>
            <h2 style={styles.statValue}>{resolvedComplaints}</h2>
            <p style={styles.statLabel}>Resolved</p>
          </div>
          <div style={{...styles.statBox, backgroundColor: '#FF9800'}}>
            <h2 style={styles.statValue}>{pendingComplaints}</h2>
            <p style={styles.statLabel}>Pending</p>
          </div>
        </div>

        {/* Category Statistics */}
        <div style={styles.categorySection}>
          <h2 style={styles.sectionHeading}>📊 Complaints by Category</h2>
          <div style={styles.categoryGrid}>
            <div style={styles.categoryBox}>
              <p style={styles.categoryCount}>{categoryCount.infrastructure}</p>
              <p style={styles.categoryName}>Infrastructure</p>
              <button 
                onClick={() => this.addToCategory('infrastructure')}
                style={styles.smallBtn}
              >
                +
              </button>
            </div>
            <div style={styles.categoryBox}>
              <p style={styles.categoryCount}>{categoryCount.academic}</p>
              <p style={styles.categoryName}>Academic</p>
              <button 
                onClick={() => this.addToCategory('academic')}
                style={styles.smallBtn}
              >
                +
              </button>
            </div>
            <div style={styles.categoryBox}>
              <p style={styles.categoryCount}>{categoryCount.hygiene}</p>
              <p style={styles.categoryName}>Hygiene</p>
              <button 
                onClick={() => this.addToCategory('hygiene')}
                style={styles.smallBtn}
              >
                +
              </button>
            </div>
            <div style={styles.categoryBox}>
              <p style={styles.categoryCount}>{categoryCount.security}</p>
              <p style={styles.categoryName}>Security</p>
              <button 
                onClick={() => this.addToCategory('security')}
                style={styles.smallBtn}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.buttonContainer}>
          <button 
            onClick={this.addComplaint}
            style={{...styles.button, backgroundColor: '#2196F3'}}
          >
            ➕ Add New Complaint
          </button>
          <button 
            onClick={this.resolveComplaint}
            style={{...styles.button, backgroundColor: '#4CAF50'}}
          >
            ✅ Resolve Complaint
          </button>
          <button 
            onClick={this.resetCounters}
            style={{...styles.button, backgroundColor: '#f44336'}}
          >
            🔄 Reset All
          </button>
        </div>

        {/* Timestamp */}
        <div style={styles.footer}>
          <p><strong>Last Updated:</strong> {lastUpdated}</p>
          <p style={styles.componentInfo}>✓ Class Component | ✓ Stateful | ✓ Lifecycle Methods</p>
        </div>
      </div>
    );
  }
}

// Inline styles
const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px'
  },
  heading: {
    color: '#333',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '28px'
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px',
    marginBottom: '30px'
  },
  statBox: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  statValue: {
    margin: '0',
    fontSize: '36px',
    fontWeight: 'bold'
  },
  statLabel: {
    margin: '5px 0 0 0',
    fontSize: '14px',
    opacity: '0.9'
  },
  categorySection: {
    marginBottom: '30px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px'
  },
  sectionHeading: {
    color: '#333',
    marginTop: '0',
    fontSize: '20px'
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '15px'
  },
  categoryBox: {
    backgroundColor: '#f9f9f9',
    border: '2px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    textAlign: 'center'
  },
  categoryCount: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2196F3',
    margin: '0'
  },
  categoryName: {
    fontSize: '14px',
    color: '#666',
    margin: '5px 0'
  },
  smallBtn: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  button: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'opacity 0.3s',
    fontWeight: 'bold'
  },
  footer: {
    textAlign: 'center',
    color: '#666',
    fontSize: '13px',
    borderTop: '2px solid #ddd',
    paddingTop: '15px',
    marginTop: '20px'
  },
  componentInfo: {
    fontSize: '12px',
    color: '#999'
  }
};

export default ComplaintCounter;

/**
 * 
 * EXPECTED OUTPUT:
 * 
 * ┌─────────────────────────────────────────────────────────────┐
 * │     📋 Smart Campus Complaint Management System              │
 * ├─────────────────────────────────────────────────────────────┤
 * │                                                               │
 * │    ┌──────────────┬──────────────┬──────────────┐            │
 * │    │   Total: 0   │  Resolved: 0 │  Pending: 0  │            │
 * │    └──────────────┴──────────────┴──────────────┘            │
 * │                                                               │
 * │    📊 Complaints by Category                                 │
 * │    ┌──────────────┬──────────────┬──────────┬──────────┐    │
 * │    │Infrastructure│  Academic    │ Hygiene  │ Security │    │
 * │    │      0 (+)   │    0 (+)     │  0 (+)   │  0 (+)   │    │
 * │    └──────────────┴──────────────┴──────────┴──────────┘    │
 * │                                                               │
 * │    [➕ Add New Complaint] [✅ Resolve] [🔄 Reset All]        │
 * │                                                               │
 * │    Last Updated: DD-MM-YYYY HH:MM:SS                         │
 * │    ✓ Class Component | ✓ Stateful | ✓ Lifecycle Methods     │
 * │                                                               │
 * └─────────────────────────────────────────────────────────────┘
 * 
 * AFTER CLICKING "Add New Complaint" 3 TIMES:
 * ┌─────────────────────────────────────────────────────────────┐
 * │    ┌──────────────┬──────────────┬──────────────┐            │
 * │    │   Total: 3   │  Resolved: 0 │  Pending: 3  │            │
 * │    └──────────────┴──────────────┴──────────────┘            │
 * └─────────────────────────────────────────────────────────────┘
 * 
 * CONSOLE OUTPUT:
 * > ComplaintCounter component has mounted
 * > Total complaints updated to: 1
 * > Total complaints updated to: 2
 * > Total complaints updated to: 3
 * 
 * KEY FEATURES DEMONSTRATED:
 * 1. Class Component inheritance from React.Component
 * 2. State initialization in constructor
 * 3. setState() method for state updates
 * 4. Arrow functions to maintain 'this' context
 * 5. componentDidMount() lifecycle method
 * 6. componentDidUpdate() lifecycle method
 * 7. Conditional rendering based on state
 * 8. Multiple state properties management
 * 9. Nested object state updates with spread operator
 * 10. Event handling with this.method binding
 * 
 */
