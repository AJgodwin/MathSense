import { motion } from 'framer-motion';
import './Team.css';

/**
 * TeamMemberCard - Reusable component receiving props.
 * Demonstrates: Props, functional components, component reusability.
 */
const TeamMemberCard = ({ member, index }) => {
    return (
        <motion.div
            className="team-card card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
        >
            <div className="member-avatar">
                <span className="avatar-emoji">{member.avatar}</span>
            </div>
            <h3 className="member-name">{member.name}</h3>
            <p className="member-roll">{member.rollNo}</p>
            <span className="badge badge-green">{member.role}</span>
            {member.department && (
                <p className="member-dept">{member.department}</p>
            )}
        </motion.div>
    );
};

/**
 * Team Page - Mandatory page displaying team members.
 * Demonstrates: Array mapping, props, reusable components.
 */
const Team = () => {
    // Team data array for mapping
    const teamMembers = [
        {
            name: 'Amal Godwin J',
            rollNo: 'CB.SC.U4CSE23407',
            role: 'Developer',
            avatar: '👨‍💻',
            department: 'B.Sc. Computer Science & Engineering',
        },
    ];

    const mentors = [
        {
            name: 'Dr. T. Senthil Kumar',
            rollNo: 'Professor',
            role: 'Course Teacher',
            avatar: '👨‍🏫',
            department: 'Amrita School of Computing',
        },
    ];

    return (
        <div className="page team-page">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="page-title">👥 Team Members</h1>
                <p className="page-subtitle">
                    The people behind MathSense
                </p>
            </motion.div>

            {/* Developer */}
            <section className="team-section">
                <h2 className="team-section-title">🧑‍💻 Developer</h2>
                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <TeamMemberCard key={member.rollNo} member={member} index={index} />
                    ))}
                </div>
            </section>

            {/* Mentor */}
            <section className="team-section">
                <h2 className="team-section-title">🎓 Course Mentor</h2>
                <div className="team-grid">
                    {mentors.map((member, index) => (
                        <TeamMemberCard key={member.name} member={member} index={index} />
                    ))}
                </div>
            </section>

            {/* Acknowledgment */}
            <motion.div
                className="card acknowledgment-card"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h3>🙏 Acknowledgment</h3>
                <p>
                    This project was developed as part of the <strong>Lab Evaluation–2</strong> for
                    the course <strong>23CSE461 – Full Stack Frameworks</strong> at
                    Amrita Vishwa Vidyapeetham, Coimbatore. Special thanks to Dr. T. Senthil Kumar
                    for guidance and mentorship throughout the development of MathSense.
                </p>
            </motion.div>
        </div>
    );
};

export default Team;
