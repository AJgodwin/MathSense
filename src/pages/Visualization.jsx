import { useState } from 'react';
import { motion } from 'framer-motion';
import './Visualization.css';

/**
 * Visualization & Outputs Page
 * Demonstrates: useState, conditional rendering, array mapping
 */
const Visualization = () => {
    const [activeSection, setActiveSection] = useState('how');

    const learningSteps = [
        {
            step: 1,
            icon: '👁️',
            title: 'See the Problem Visually',
            description: 'Numbers are shown as real objects — dots, blocks, or shapes. The child sees "3" as three green dots, not an abstract symbol.',
        },
        {
            step: 2,
            icon: '🖐️',
            title: 'Interact by Touching/Clicking',
            description: 'The child taps or clicks on objects to count them. This tactile interaction builds a stronger neural connection to the number.',
        },
        {
            step: 3,
            icon: '🧠',
            title: 'Brain Connects Visual to Number',
            description: 'After seeing 3 dots multiple times in different colors and shapes, the brain starts associating the quantity "3" with the visual pattern.',
        },
        {
            step: 4,
            icon: '🔁',
            title: 'Reinforcement Through Repetition',
            description: 'The same concept appears as dots, then blocks, then stars. Repetition in varied forms strengthens memory without boredom.',
        },
        {
            step: 5,
            icon: '🌟',
            title: 'Gentle Confirmation',
            description: 'A soft "Wonderful!" message and a gentle animation confirms success. No harsh sounds, no red alerts — just calm encouragement.',
        },
    ];

    const outcomes = [
        {
            icon: '🧮',
            title: 'Number Comprehension',
            before: 'Child sees "5" as a meaningless symbol',
            after: 'Child understands "5" as five objects they can count',
        },
        {
            icon: '🔢',
            title: 'Pattern Awareness',
            before: 'Number sequences feel random and confusing',
            after: 'Child recognizes "2, 4, 6, 8" as adding 2 each time',
        },
        {
            icon: '➕',
            title: 'Addition Skills',
            before: 'Abstract "3 + 2 = ?" causes anxiety',
            after: 'Visual dots make addition feel like counting objects',
        },
        {
            icon: '🧠',
            title: 'Memory Retention',
            before: 'Concepts forgotten within minutes',
            after: 'Multi-representation approach creates lasting memories',
        },
        {
            icon: '😌',
            title: 'Emotional Well-being',
            before: 'Math causes stress and avoidance',
            after: 'Calm interface makes learning feel safe and enjoyable',
        },
    ];

    const screenshots = [
        {
            title: 'Visual Math Builder',
            description: 'Children see addition problems as groups of colorful objects. They tap dots to count their answer visually.',
            emoji: '🟢🟢 + 🟢🟢🟢 = ?',
        },
        {
            title: 'Pattern Recognition',
            description: 'Number sequences are displayed as cards with emojis. Hints guide the child toward discovering the pattern.',
            emoji: '🔵2 → 🔵4 → 🔵6 → ❓',
        },
        {
            title: 'Concept Reinforcement',
            description: 'The number 5 is shown as five dots, five blocks, a tally mark, and a full hand — building deep understanding.',
            emoji: '🟡🟡🟡🟡🟡 = ⭐⭐⭐⭐⭐',
        },
    ];

    const sections = [
        { id: 'how', label: '📖 How It Works' },
        { id: 'outputs', label: '📊 Outputs' },
        { id: 'screens', label: '🖥️ Screens' },
    ];

    return (
        <div className="page viz-page">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="page-title">📊 Visualization & Outputs</h1>
                <p className="page-subtitle">
                    Understanding how visual learning transforms math education
                </p>
            </motion.div>

            {/* Tabs */}
            <div className="viz-tabs">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        className={`activity-tab ${activeSection === section.id ? 'active' : ''}`}
                        onClick={() => setActiveSection(section.id)}
                    >
                        {section.label}
                    </button>
                ))}
            </div>

            {/* How Learning Happens */}
            {activeSection === 'how' && (
                <motion.div
                    className="viz-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="section-heading">🧠 How Visual Learning Works</h2>
                    <div className="steps-timeline">
                        {learningSteps.map((step, index) => (
                            <motion.div
                                key={step.step}
                                className="step-card card"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="step-number">{step.step}</div>
                                <div className="step-icon">{step.icon}</div>
                                <div className="step-content">
                                    <h4>{step.title}</h4>
                                    <p>{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Learning Outcomes */}
            {activeSection === 'outputs' && (
                <motion.div
                    className="viz-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="section-heading">📈 Learning Outcomes</h2>
                    <div className="outcomes-grid">
                        {outcomes.map((outcome, index) => (
                            <motion.div
                                key={outcome.title}
                                className="outcome-card card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <span className="outcome-icon">{outcome.icon}</span>
                                <h4>{outcome.title}</h4>
                                <div className="outcome-compare">
                                    <div className="outcome-before">
                                        <span className="compare-label">Before</span>
                                        <p>{outcome.before}</p>
                                    </div>
                                    <div className="outcome-arrow">→</div>
                                    <div className="outcome-after">
                                        <span className="compare-label">After</span>
                                        <p>{outcome.after}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Screenshots */}
            {activeSection === 'screens' && (
                <motion.div
                    className="viz-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="section-heading">🖥️ Activity Screens</h2>
                    <div className="screens-grid">
                        {screenshots.map((screen, index) => (
                            <motion.div
                                key={screen.title}
                                className="screen-card card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.15 }}
                            >
                                <div className="screen-preview">
                                    <span>{screen.emoji}</span>
                                </div>
                                <h4>{screen.title}</h4>
                                <p>{screen.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Visualization;
