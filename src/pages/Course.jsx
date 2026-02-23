import { motion } from 'framer-motion';
import './Course.css';

/**
 * Course Information Page - Mandatory page with exact details.
 * Demonstrates: JSX, functional components, data display.
 */
const Course = () => {
    const courseDetails = [
        { label: 'Course Code', value: '23CSE461' },
        { label: 'Course Name', value: 'Full Stack Frameworks' },
        { label: 'Category', value: 'Lab Evaluation – 2' },
        { label: 'Semester', value: 'Even Semester 2025–2026' },
    ];

    const teacherDetails = [
        { label: 'Name', value: 'Dr. T. Senthil Kumar' },
        { label: 'Designation', value: 'Professor' },
        { label: 'Department', value: 'Amrita School of Computing' },
        { label: 'Institution', value: 'Amrita Vishwa Vidyapeetham' },
        { label: 'Location', value: 'Coimbatore – 641112' },
        { label: 'Email', value: 't_senthilkumar@cb.amrita.edu' },
    ];

    const reactConcepts = [
        { concept: 'Functional Components', usage: 'Every component (Navbar, Footer, pages) is a functional component' },
        { concept: 'JSX', usage: 'HTML-like syntax used throughout for rendering UI elements' },
        { concept: 'useState', usage: 'Managing interactive state in Math Builder, Pattern Recognition, and navigation' },
        { concept: 'Props', usage: 'TeamMemberCard receives member data as props for reusable rendering' },
        { concept: 'Conditional Rendering', usage: 'Activity tabs, feedback messages, mobile menu toggle' },
        { concept: 'Event Handling', usage: 'onClick handlers for dot selection, answer checking, tab switching' },
        { concept: 'Array Mapping', usage: 'Rendering lists of features, team members, patterns, and nav links' },
        { concept: 'React Router', usage: 'Multi-page navigation with BrowserRouter, Routes, and NavLink' },
        { concept: 'Component Reusability', usage: 'Layout, TeamMemberCard, and shared CSS used across pages' },
    ];

    return (
        <div className="page course-page">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="page-title">🎓 Course Information</h1>
                <p className="page-subtitle">
                    Academic details for Lab Evaluation–2
                </p>
            </motion.div>

            {/* Course Details */}
            <motion.section
                className="course-section card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <h2>📚 Course Details</h2>
                <div className="details-grid">
                    {courseDetails.map((detail) => (
                        <div key={detail.label} className="detail-item">
                            <span className="detail-label">{detail.label}</span>
                            <span className="detail-value">{detail.value}</span>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* Teacher Details */}
            <motion.section
                className="course-section card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h2>👨‍🏫 Course Teacher</h2>
                <div className="teacher-card">
                    <div className="teacher-avatar">
                        <span>👨‍🏫</span>
                    </div>
                    <div className="teacher-info">
                        {teacherDetails.map((detail) => (
                            <div key={detail.label} className="detail-item">
                                <span className="detail-label">{detail.label}</span>
                                <span className="detail-value">
                                    {detail.label === 'Email' ? (
                                        <a href={`mailto:${detail.value}`}>{detail.value}</a>
                                    ) : (
                                        detail.value
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Student Details */}
            <motion.section
                className="course-section card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <h2>🧑‍🎓 Student Details</h2>
                <div className="details-grid">
                    <div className="detail-item">
                        <span className="detail-label">Name</span>
                        <span className="detail-value">Amal Godwin J</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Roll Number</span>
                        <span className="detail-value">CB.SC.U4CSE23407</span>
                    </div>
                </div>
            </motion.section>

            {/* React Concepts Used */}
            <motion.section
                className="course-section card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h2>⚛️ ReactJS Concepts Demonstrated</h2>
                <div className="concepts-list">
                    {reactConcepts.map((item, index) => (
                        <motion.div
                            key={item.concept}
                            className="concept-item"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                        >
                            <span className="concept-name">{item.concept}</span>
                            <span className="concept-usage">{item.usage}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
};

export default Course;
