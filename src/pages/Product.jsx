import { motion } from 'framer-motion';
import './Product.css';

/**
 * Product Description Page - Mandatory page with full product details.
 * Demonstrates: JSX, array mapping, props-like data structures, component reuse.
 */
const Product = () => {
    const challenges = [
        { icon: '🔢', text: 'Difficulty understanding abstract numerical concepts' },
        { icon: '😰', text: 'Anxiety from time-pressured or competitive environments' },
        { icon: '🧠', text: 'Challenges with working memory and recall' },
        { icon: '📖', text: 'Difficulty processing text-heavy instructions' },
        { icon: '🔊', text: 'Sensory overload from loud sounds and bright visuals' },
        { icon: '🔄', text: 'Need for repetitive, consistent learning patterns' },
    ];

    const highlights = [
        { icon: '🎨', title: 'Visual-First Design', desc: 'Every concept is taught through shapes, colors, and objects' },
        { icon: '🕊️', title: 'Zero Pressure', desc: 'No timers, no scores, no failure — only encouragement' },
        { icon: '🔁', title: 'Repetition-Based', desc: 'Same concept in multiple visual formats for deep retention' },
        { icon: '🌿', title: 'Autism-Friendly UI', desc: 'Soft colors, rounded shapes, predictable navigation' },
        { icon: '📱', title: 'Responsive', desc: 'Works on tablets and desktops used in therapy settings' },
        { icon: '🧩', title: 'Step-by-Step', desc: 'Break complex problems into small, visual, manageable steps' },
    ];

    const collaborators = [
        {
            type: 'Academic Collaborator',
            name: 'Dr. T. Senthil Kumar',
            role: 'Professor, Amrita School of Computing',
            org: 'Amrita Vishwa Vidyapeetham, Coimbatore',
            focus: 'Full Stack Frameworks & EdTech Research',
        },
        {
            type: 'Industry Collaborator',
            name: 'Autism Education Tech Initiative',
            role: 'EdTech Research Group',
            org: 'Inclusive Learning Foundation',
            focus: 'Technology-based interventions for neurodiverse learners',
        },
    ];

    return (
        <div className="page product-page">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="page-title">📋 About MathSense</h1>
                <p className="page-subtitle">
                    Understanding the product, its purpose, and why it matters
                </p>
            </motion.div>

            {/* What is MathSense */}
            <motion.section
                className="product-section card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h2>🌿 What is MathSense?</h2>
                <p>
                    MathSense is a <strong>calm, visual math learning portal</strong> designed
                    specifically for children with autism spectrum disorder (ASD). Unlike
                    traditional math games that rely on speed, competition, and text-heavy
                    instructions, MathSense uses <strong>visual objects, soft animations, and
                        gentle feedback</strong> to teach fundamental math concepts.
                </p>
                <p>
                    The portal focuses on building number sense through block-based counting,
                    pattern recognition, and concept reinforcement — all at the child's own
                    pace, without any pressure or negative feedback.
                </p>
            </motion.section>

            {/* Target Users */}
            <motion.section
                className="product-section card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
            >
                <h2>👧 Target Users</h2>
                <div className="target-users">
                    <div className="user-group">
                        <span className="user-icon">🧒</span>
                        <h4>Children with Autism (Ages 4–12)</h4>
                        <p>Primary users who interact with visual math activities</p>
                    </div>
                    <div className="user-group">
                        <span className="user-icon">👩‍⚕️</span>
                        <h4>Therapists & Special Educators</h4>
                        <p>Use MathSense as a supplementary teaching tool</p>
                    </div>
                    <div className="user-group">
                        <span className="user-icon">👨‍👩‍👧</span>
                        <h4>Parents & Caregivers</h4>
                        <p>Support learning at home in a stress-free environment</p>
                    </div>
                </div>
            </motion.section>

            {/* Why Required */}
            <motion.section
                className="product-section card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
            >
                <h2>❓ Why This Portal is Required</h2>
                <p>
                    Most math learning tools are designed for neurotypical children, using
                    fast-paced games, leaderboards, and competitive mechanics. These approaches
                    can cause <strong>sensory overload, anxiety, and frustration</strong> for
                    children on the autism spectrum.
                </p>
                <p>
                    MathSense fills this gap by providing a <strong>structured, predictable,
                        and visually rich</strong> learning environment that respects the unique
                    cognitive and sensory needs of autism children.
                </p>
            </motion.section>

            {/* Challenges */}
            <motion.section
                className="product-section card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h2>⚡ Challenges Faced by Autism Kids</h2>
                <div className="challenges-grid">
                    {challenges.map((challenge, index) => (
                        <div key={index} className="challenge-item">
                            <span className="challenge-icon">{challenge.icon}</span>
                            <p>{challenge.text}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* Highlights */}
            <motion.section
                className="product-section card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h2>✨ Highlights & Novelty</h2>
                <div className="highlights-grid">
                    {highlights.map((item, index) => (
                        <div key={index} className="highlight-item">
                            <span className="highlight-icon">{item.icon}</span>
                            <h4>{item.title}</h4>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* Importance of Visualization */}
            <motion.section
                className="product-section card visualization-importance"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h2>👁️ Importance of Visualization</h2>
                <div className="viz-content">
                    <div className="viz-text">
                        <p>
                            Research shows that children with autism are often <strong>visual
                                learners</strong>. They process and retain visual information more
                            effectively than text or verbal instructions.
                        </p>
                        <ul className="viz-list">
                            <li>🟢 Visual representations make abstract numbers concrete</li>
                            <li>🟢 Color-coded feedback reduces cognitive load</li>
                            <li>🟢 Step-by-step visual guides reduce overwhelm</li>
                            <li>🟢 Consistent visual patterns build predictability</li>
                            <li>🟢 Object-based counting develops true number sense</li>
                        </ul>
                    </div>
                    <div className="viz-demo">
                        <div className="viz-example">
                            <p className="viz-label">Instead of this:</p>
                            <div className="viz-text-only">3 + 2 = ?</div>
                        </div>
                        <div className="viz-example">
                            <p className="viz-label">We show this:</p>
                            <div className="viz-visual">
                                <span>🟢🟢🟢</span>
                                <span className="viz-plus">+</span>
                                <span>🟢🟢</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* GitHub */}
            <motion.section
                className="product-section card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h2>🔗 Repository Details</h2>
                <div className="repo-info">
                    <div className="repo-item">
                        <span className="repo-label">Project</span>
                        <span className="repo-value">MathSense – Calm Visual Math Learning Portal</span>
                    </div>
                    <div className="repo-item">
                        <span className="repo-label">Student</span>
                        <span className="repo-value">Amal Godwin J (CB.SC.U4CSE23407)</span>
                    </div>
                    <div className="repo-item">
                        <span className="repo-label">Course</span>
                        <span className="repo-value">23CSE461 – Full Stack Frameworks</span>
                    </div>
                    <div className="repo-item">
                        <span className="repo-label">Tech Stack</span>
                        <span className="repo-value">React + Vite + React Router + Framer Motion</span>
                    </div>
                    <div className="repo-item">
                        <span className="repo-label">GitHub</span>
                        <span className="repo-value">
                            <a href="https://github.com/AJgodwin" target="_blank" rel="noreferrer">
                                github.com/AJgodwin
                            </a>
                        </span>
                    </div>
                </div>
            </motion.section>

            {/* Collaborators */}
            <motion.section
                className="product-section card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h2>🤝 Collaborators</h2>
                <div className="collab-grid">
                    {collaborators.map((collab, index) => (
                        <div key={index} className="collab-card">
                            <span className="collab-type badge badge-green">{collab.type}</span>
                            <h4>{collab.name}</h4>
                            <p className="collab-role">{collab.role}</p>
                            <p className="collab-org">{collab.org}</p>
                            <p className="collab-focus">Focus: {collab.focus}</p>
                        </div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
};

export default Product;
