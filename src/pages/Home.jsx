import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

/**
 * Home Page - Portal introduction with animated welcome.
 * Demonstrates: useState, useEffect, JSX, conditional rendering, event handling.
 */
const Home = () => {
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowWelcome(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const features = [
        {
            icon: '🧱',
            title: 'Visual Math Builder',
            description: 'Build numbers using blocks and shapes – no rush, no stress',
        },
        {
            icon: '🔢',
            title: 'Pattern Recognition',
            description: 'Discover number patterns through calming visual sequences',
        },
        {
            icon: '🔁',
            title: 'Concept Reinforcement',
            description: 'Same idea shown in many ways to help it stick gently',
        },
        {
            icon: '💚',
            title: 'Gentle Feedback',
            description: 'Soft encouragement with every step – no negative sounds',
        },
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: showWelcome ? 1 : 0, y: showWelcome ? 0 : 30 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <div className="hero-badge">🌱 Calm · Visual · Inclusive</div>
                    <h1 className="hero-title">
                        Welcome to <span className="highlight">MathSense</span>
                    </h1>
                    <p className="hero-subtitle">
                        A gentle, visual math learning portal designed with love for children
                        with autism. Learn at your own pace, with colors, shapes, and calm
                        interactions.
                    </p>
                    <div className="hero-actions">
                        <Link to="/learn" className="btn btn-primary">
                            🧩 Start Learning
                        </Link>
                        <Link to="/product" className="btn btn-secondary">
                            📋 Learn More
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    <div className="hero-shapes">
                        <div className="shape shape-circle">🟢</div>
                        <div className="shape shape-triangle">🔷</div>
                        <div className="shape shape-star">⭐</div>
                        <div className="shape shape-heart">💚</div>
                        <div className="shape shape-block">🟩</div>
                    </div>
                    <div className="hero-equation">
                        <span className="eq-num">2</span>
                        <span className="eq-op">+</span>
                        <span className="eq-num">3</span>
                        <span className="eq-op">=</span>
                        <span className="eq-result">🟢🟢🟢🟢🟢</span>
                    </div>
                </motion.div>
            </section>

            {/* Features */}
            <section className="features-section">
                <h2 className="section-title">How MathSense Helps</h2>
                <p className="section-subtitle">
                    Every interaction is designed to be calm, visual, and encouraging
                </p>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            className="feature-card card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 * index }}
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Why Section */}
            <section className="why-section">
                <motion.div
                    className="why-card card"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2>🌈 Why MathSense?</h2>
                    <div className="why-grid">
                        <div className="why-item">
                            <span className="why-icon">🧠</span>
                            <h4>Memory Improvement</h4>
                            <p>Visual cues help cement math concepts in long-term memory</p>
                        </div>
                        <div className="why-item">
                            <span className="why-icon">😌</span>
                            <h4>Reduced Anxiety</h4>
                            <p>No timers, no failure sounds – just calm, supportive learning</p>
                        </div>
                        <div className="why-item">
                            <span className="why-icon">🎯</span>
                            <h4>Better Focus</h4>
                            <p>Minimal distractions with a clean, predictable interface</p>
                        </div>
                        <div className="why-item">
                            <span className="why-icon">📐</span>
                            <h4>Number Sense</h4>
                            <p>Understand quantities through tangible visual objects</p>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
