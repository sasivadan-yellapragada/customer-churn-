/**
 * Ex No: 2b - Program based on Stateless Functional Component
 * Date: 27-01-2026
 * 
 * Description: This example demonstrates React functional components without state.
 * Stateless components are simple, reusable, and receive data via props.
 * Use Case: Displaying complaint details in Smart Campus System
 */

// 1. Simple Stateless Component - Complaint Card
function ComplaintCard(props) {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>{props.title}</h3>
        <span style={styles.priorityBadge(props.priority)}>
          {props.priority}
        </span>
      </div>
      <p style={styles.cardText}><strong>Category:</strong> {props.category}</p>
      <p style={styles.cardText}><strong>Description:</strong> {props.description}</p>
      <p style={styles.cardText}><strong>Submitted by:</strong> {props.submittedBy}</p>
      <p style={styles.cardText}><strong>Date:</strong> {props.date}</p>
      <div style={styles.cardFooter}>
        <span style={styles.statusBadge(props.status)}>
          {props.status}
        </span>
      </div>
    </div>
  );
}

// 2. Another Stateless Component - User Profile
function UserProfile(props) {
  return (
    <div style={styles.profileCard}>
      <img 
        src={props.avatar} 
        alt={props.name}
        style={styles.avatar}
      />
      <h2 style={styles.profileName}>{props.name}</h2>
      <p style={styles.profileEmail}>{props.email}</p>
      <p style={styles.profileRole}>{props.role}</p>
      <div style={styles.statsRow}>
        <div style={styles.statItem}>
          <p style={styles.statNumber}>{props.complaintsSubmitted}</p>
          <p style={styles.statText}>Submitted</p>
        </div>
        <div style={styles.statItem}>
          <p style={styles.statNumber}>{props.complaintsResolved}</p>
          <p style={styles.statText}>Resolved</p>
        </div>
      </div>
    </div>
  );
}

// 3. Stateless Component - Category List Item
function CategoryItem(props) {
  return (
    <li style={styles.listItem}>
      <span style={styles.categoryIcon}>{props.icon}</span>
      <div style={styles.categoryInfo}>
        <p style={styles.categoryTitle}>{props.category}</p>
        <p style={styles.categoryCount}>{props.count} complaints</p>
      </div>
    </li>
  );
}

// 4. Main Stateless Component - Complaint Management Dashboard
function ComplaintDashboard() {
  // Sample data - In real app, this would come from props or API
  const sampleComplaints = [
    {
      id: 1,
      title: "Broken Chairs in Classroom A",
      category: "Infrastructure",
      description: "Several chairs in classroom A block-1 are broken and need replacement.",
      submittedBy: "John Doe",
      date: "2026-03-07",
      priority: "High",
      status: "In Progress"
    },
    {
      id: 2,
      title: "WiFi Issue in Hostel",
      category: "Technical",
      description: "WiFi connectivity is very poor in hostel block C during peak hours.",
      submittedBy: "Sarah Singh",
      date: "2026-03-06",
      priority: "Medium",
      status: "Open"
    },
    {
      id: 3,
      title: "Cleanliness Issue in Cafeteria",
      category: "Hygiene",
      description: "Cafeteria needs immediate cleaning and better maintenance.",
      submittedBy: "Mike Johnson",
      date: "2026-03-05",
      priority: "High",
      status: "Resolved"
    }
  ];

  const sampleUsers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@campus.edu",
      role: "Student",
      avatar: "👨‍🎓",
      complaintsSubmitted: 5,
      complaintsResolved: 2
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.admin@campus.edu",
      role: "Admin",
      avatar: "👩‍💼",
      complaintsSubmitted: 0,
      complaintsResolved: 12
    }
  ];

  const categories = [
    { icon: "🏗️", category: "Infrastructure", count: 24 },
    { icon: "📚", category: "Academic", count: 18 },
    { icon: "🧹", category: "Hygiene", count: 15 },
    { icon: "🔒", category: "Security", count: 9 }
  ];

  return (
    <div style={styles.dashboardContainer}>
      <header style={styles.header}>
        <h1 style={styles.mainHeading}>📋 Smart Campus Complaint Management</h1>
        <p style={styles.subtitle}>Functional Components - Stateless Demo</p>
      </header>

      {/* Section 1: Recent Complaints */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>📝 Recent Complaints</h2>
        <div style={styles.complaintGrid}>
          {sampleComplaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              title={complaint.title}
              category={complaint.category}
              description={complaint.description}
              submittedBy={complaint.submittedBy}
              date={complaint.date}
              priority={complaint.priority}
              status={complaint.status}
            />
          ))}
        </div>
      </section>

      {/* Section 2: User Profiles */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>👥 Active Users</h2>
        <div style={styles.profileGrid}>
          {sampleUsers.map((user) => (
            <UserProfile
              key={user.id}
              name={user.name}
              email={user.email}
              role={user.role}
              avatar={user.avatar}
              complaintsSubmitted={user.complaintsSubmitted}
              complaintsResolved={user.complaintsResolved}
            />
          ))}
        </div>
      </section>

      {/* Section 3: Category Statistics */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>📊 Complaints by Category</h2>
        <ul style={styles.categoryList}>
          {categories.map((cat, index) => (
            <CategoryItem
              key={index}
              icon={cat.icon}
              category={cat.category}
              count={cat.count}
            />
          ))}
        </ul>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.componentInfo}>
          ✓ Functional Components | ✓ Stateless | ✓ Props Based | ✓ Reusable
        </p>
        <p style={styles.componentDetails}>
          Render Date: {new Date().toLocaleString()}
        </p>
      </footer>
    </div>
  );
}

// Inline Styles
const styles = {
  dashboardContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '30px 20px',
    borderRadius: '8px'
  },
  mainHeading: {
    margin: '0',
    fontSize: '36px',
    fontWeight: '700'
  },
  subtitle: {
    margin: '10px 0 0 0',
    fontSize: '16px',
    opacity: '0.9'
  },
  section: {
    marginBottom: '40px',
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  sectionTitle: {
    color: '#333',
    fontSize: '24px',
    marginTop: '0',
    marginBottom: '20px',
    borderBottom: '3px solid #667eea',
    paddingBottom: '10px'
  },
  complaintGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
  },
  card: {
    backgroundColor: '#f9f9f9',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '10px'
  },
  cardTitle: {
    margin: '0',
    color: '#333',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  priorityBadge: (priority) => ({
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    backgroundColor: 
      priority === 'High' ? '#ff4444' :
      priority === 'Medium' ? '#ffbb33' :
      '#00C851',
    color: 'white'
  }),
  statusBadge: (status) => ({
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    backgroundColor:
      status === 'Open' ? '#ff6b6b' :
      status === 'In Progress' ? '#ffa500' :
      status === 'Resolved' ? '#51cf66' :
      '#999',
    color: 'white'
  }),
  cardText: {
    margin: '8px 0',
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5'
  },
  cardFooter: {
    marginTop: '15px',
    paddingTop: '10px',
    borderTop: '1px solid #ddd'
  },
  profileGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  },
  profileCard: {
    backgroundColor: '#f9f9f9',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  avatar: {
    fontSize: '60px',
    marginBottom: '10px'
  },
  profileName: {
    margin: '10px 0',
    color: '#333',
    fontSize: '20px'
  },
  profileEmail: {
    margin: '5px 0',
    color: '#666',
    fontSize: '14px'
  },
  profileRole: {
    margin: '5px 0 15px 0',
    color: '#667eea',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #ddd'
  },
  statItem: {
    textAlign: 'center'
  },
  statNumber: {
    margin: '0',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#667eea'
  },
  statText: {
    margin: '5px 0 0 0',
    fontSize: '12px',
    color: '#666'
  },
  categoryList: {
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  categoryIcon: {
    fontSize: '32px',
    marginRight: '15px'
  },
  categoryInfo: {
    flex: '1'
  },
  categoryTitle: {
    margin: '0',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333'
  },
  categoryCount: {
    margin: '5px 0 0 0',
    fontSize: '13px',
    color: '#999'
  },
  footer: {
    textAlign: 'center',
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '2px solid #ddd',
    color: '#666'
  },
  componentInfo: {
    margin: '0',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  componentDetails: {
    margin: '10px 0 0 0',
    fontSize: '12px',
    color: '#999'
  }
};

export default ComplaintDashboard;

/**
 * 
 * EXPECTED OUTPUT:
 * 
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │          📋 Smart Campus Complaint Management                        │
 * │         Functional Components - Stateless Demo                       │
 * └─────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 📝 Recent Complaints                                                 │
 * ├─────────────────────────────────────────────────────────────────────┤
 * │                                                                       │
 * │  ┌─────────────────────────┐ ┌─────────────────────────┐            │
 * │  │ Broken Chairs in A   [H] │ │ WiFi Issue in Hostel [M]│            │
 * │  │ Category: Infrastructure │ │ Category: Technical     │            │
 * │  │ Desc: Several chairs... │ │ Desc: WiFi connectivity │            │
 * │  │ By: John Doe           │ │ By: Sarah Singh         │            │
 * │  │ Date: 2026-03-07       │ │ Date: 2026-03-06        │            │
 * │  │ [In Progress]          │ │ [Open]                  │            │
 * │  └─────────────────────────┘ └─────────────────────────┘            │
 * │                                                                       │
 * │  ┌─────────────────────────────────────────────────────────────┐   │
 * │  │ Cleanliness Issue in Cafeteria                          [H] │   │
 * │  │ Category: Hygiene                                           │   │
 * │  │ Desc: Cafeteria needs immediate cleaning...                │   │
 * │  │ By: Mike Johnson                                            │   │
 * │  │ Date: 2026-03-05                                            │   │
 * │  │ [Resolved]                                                  │   │
 * │  └─────────────────────────────────────────────────────────────┘   │
 * │                                                                       │
 * └─────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 👥 Active Users                                                      │
 * ├─────────────────────────────────────────────────────────────────────┤
 * │                                                                       │
 * │  ┌──────────────────────────┐  ┌──────────────────────────┐         │
 * │  │        👨‍🎓               │  │        👩‍💼               │         │
 * │  │    Rajesh Kumar          │  │    Priya Sharma          │         │
 * │  │ rajesh@campus.edu        │  │ priya.admin@campus.edu   │         │
 * │  │      Student             │  │       Admin              │         │
 * │  │  Submitted: 5 │ Resolved: 2 │  Submitted: 0 │ Resolved: 12 │       │
 * │  └──────────────────────────┘  └──────────────────────────┘         │
 * │                                                                       │
 * └─────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 📊 Complaints by Category                                            │
 * ├─────────────────────────────────────────────────────────────────────┤
 * │ 🏗️  Infrastructure ...................... 24 complaints              │
 * │ 📚  Academic ............................ 18 complaints              │
 * │ 🧹  Hygiene ............................. 15 complaints              │
 * │ 🔒  Security ............................. 9 complaints               │
 * └─────────────────────────────────────────────────────────────────────┘
 * 
 * ✓ Functional Components | ✓ Stateless | ✓ Props Based | ✓ Reusable
 * Render Date: DD-MM-YYYY HH:MM:SS
 * 
 * KEY FEATURES DEMONSTRATED:
 * 1. Functional components (no class inheritance)
 * 2. Props parameter to receive data
 * 3. Conditional rendering using ternary operators
 * 4. Array mapping for dynamic component rendering
 * 5. Inline style objects for styling
 * 6. Component composition and reusability
 * 7. No state management needed
 * 8. Simple, clean, and easy to understand
 * 9. Performance optimized (no lifecycle methods)
 * 10. Easy to test and maintain
 * 
 * ADVANTAGES OF STATELESS COMPONENTS:
 * ✓ Simpler and more readable code
 * ✓ No this binding issues
 * ✓ Better performance
 * ✓ Easier to test
 * ✓ More reusable (pure components)
 * ✓ Reduced memory footprint
 * 
 */
