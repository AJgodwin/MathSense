import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Learn.css';

/**
 * Learn Page - 3 interactive learning activities.
 * Demonstrates: useState, conditional rendering, event handling,
 * array mapping, props via sub-components, algorithms:
 *   - Visual object counting algorithm
 *   - Pattern matching logic
 *   - Step validation logic
 *   - Reinforcement feedback logic
 *   - Progress tracking logic
 */

/* ============================================================
   ACTIVITY 1: VISUAL STEP-BY-STEP MATH BUILDER
   Algorithm: Visual object counting + Step validation
============================================================ */
const MathBuilder = () => {
    const problems = [
        { a: 2, b: 3, emoji: '🟢' },
        { a: 1, b: 4, emoji: '🔵' },
        { a: 3, b: 2, emoji: '🟡' },
        { a: 4, b: 1, emoji: '⭐' },
        { a: 2, b: 2, emoji: '🟣' },
        { a: 5, b: 1, emoji: '🍎' },
        { a: 3, b: 3, emoji: '🍊' },
        { a: 4, b: 2, emoji: '🍇' },
        { a: 2, b: 5, emoji: '🍪' },
        { a: 1, b: 2, emoji: '🐶' },
    ];

    const [currentProblem, setCurrentProblem] = useState(0);
    const [selectedCount, setSelectedCount] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [completed, setCompleted] = useState([]);

    // Keyboard Focus State
    const [focusIndex, setFocusIndex] = useState(0); // 0 to 9 for dots

    const problem = problems[currentProblem];
    const correctAnswer = problem.a + problem.b;
    const maxDots = 10;

    // Visual Object Counting Algorithm
    const handleDotClick = (index) => {
        // Allow changing answer even if feedback is shown, unless correct
        if (isCorrect) return;

        setShowFeedback(false); // Hide outdated feedback on new selection
        const newCount = index + 1;
        setSelectedCount(newCount);
        setFocusIndex(index);
    };

    // Step Validation Logic
    const handleCheck = () => {
        const correct = selectedCount === correctAnswer;
        setIsCorrect(correct);
        setShowFeedback(true);

        if (correct && !completed.includes(currentProblem)) {
            setCompleted([...completed, currentProblem]);
        }
    };

    const handleNext = () => {
        setShowFeedback(false);
        setSelectedCount(0);
        setIsCorrect(false);
        // Randomize next problem or sequential? Sequential for now with wrap around
        setCurrentProblem((currentProblem + 1) % problems.length);
        setFocusIndex(0);
    };

    const handleReset = () => {
        setShowFeedback(false);
        setSelectedCount(0);
        setIsCorrect(false);
        setFocusIndex(0);
    };

    // Keyboard Navigation Effect
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                setFocusIndex(prev => (prev + 1) % maxDots);
            } else if (e.key === 'ArrowLeft') {
                setFocusIndex(prev => (prev - 1 + maxDots) % maxDots);
            } else if (e.key === 'Enter') {
                if (isCorrect) {
                    handleNext();
                } else if (!isCorrect && selectedCount > 0 && e.shiftKey) {
                    // Shift+Enter to Check (or just Enter if count selected)
                    handleCheck();
                } else {
                    handleDotClick(focusIndex);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [focusIndex, selectedCount, isCorrect, maxDots]);
    // Removed unstable function dependencies to prevent loop/crash and satisfy linter/runtime

    // Progress Tracking Logic
    const progress = Math.round((completed.length / problems.length) * 100);

    return (
        <div className="activity-content">
            {/* Progress Bar */}
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                <span className="progress-text">{completed.length}/{problems.length} completed</span>
            </div>

            <div className="math-builder-display">
                {/* Visual Problem Display */}
                <div className="problem-visual">
                    <div className="visual-group">
                        <span className="visual-label">{problem.a}</span>
                        <div className="dot-group">
                            {Array.from({ length: problem.a }).map((_, i) => (
                                <span key={`a-${i}`} className="visual-dot">{problem.emoji}</span>
                            ))}
                        </div>
                    </div>
                    <span className="operator">+</span>
                    <div className="visual-group">
                        <span className="visual-label">{problem.b}</span>
                        <div className="dot-group">
                            {Array.from({ length: problem.b }).map((_, i) => (
                                <span key={`b-${i}`} className="visual-dot">{problem.emoji}</span>
                            ))}
                        </div>
                    </div>
                    <span className="operator">=</span>
                    <span className="question-mark">?</span>
                </div>

                {/* Answer Selection - Visual Object Counting */}
                <div className="answer-section">
                    <p className="instruction">Tap dots or use arrows + Enter:</p>
                    <div className="dot-selector">
                        {Array.from({ length: maxDots }).map((_, i) => (
                            <motion.button
                                key={i}
                                className={`selectable-dot ${i < selectedCount ? 'selected' : ''} ${i === focusIndex ? 'focused' : ''}`}
                                onClick={() => handleDotClick(i)}
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={`Select ${i + 1} dots`}
                            >
                                {problem.emoji}
                            </motion.button>
                        ))}
                    </div>
                    <p className="count-display">
                        Your answer: <strong>{selectedCount}</strong>
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                    {!isCorrect ? (
                        <>
                            <button className="btn btn-primary" onClick={handleCheck} disabled={selectedCount === 0}>
                                ✅ Check (Shift+Enter)
                            </button>
                            <button className="btn btn-secondary" onClick={handleReset}>
                                🔄 Reset
                            </button>
                        </>
                    ) : (
                        <button className="btn btn-primary" onClick={handleNext}>
                            ➡️ Next Problem (Enter)
                        </button>
                    )}
                </div>

                {/* Gentle Feedback */}
                <AnimatePresence>
                    {showFeedback && (
                        <motion.div
                            className={`feedback ${isCorrect ? 'feedback-correct' : 'feedback-try'}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {isCorrect ? (
                                <>
                                    <span className="feedback-icon">🌟</span>
                                    <p>Wonderful! {problem.a} + {problem.b} = {correctAnswer}. You did great!</p>
                                </>
                            ) : (
                                <>
                                    <span className="feedback-icon">🌱</span>
                                    <p>Almost there! Try counting the dots again. You selected {selectedCount}, but the answer is {correctAnswer}.</p>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

/* ============================================================
   ACTIVITY 2: PATTERN RECOGNITION & SEQUENCING
   Algorithm: Pattern matching logic
============================================================ */
const PatternRecognition = () => {
    const patterns = [
        { sequence: [2, 4, 6, 8], answer: 10, hint: 'Adding 2 each time', emoji: '🔵' },
        { sequence: [1, 3, 5, 7], answer: 9, hint: 'Odd numbers going up', emoji: '🟢' },
        { sequence: [5, 10, 15, 20], answer: 25, hint: 'Adding 5 each time', emoji: '⭐' },
        { sequence: [1, 2, 4, 8], answer: 16, hint: 'Doubling each time', emoji: '🟡' },
        { sequence: [10, 8, 6, 4], answer: 2, hint: 'Subtracting 2 each time', emoji: '🟣' },
        { sequence: [3, 6, 9, 12], answer: 15, hint: 'Adding 3 each time', emoji: '🔺' },
        { sequence: [20, 15, 10, 5], answer: 0, hint: 'Subtracting 5 each time', emoji: '🟩' },
        { sequence: [1, 1, 2, 3], answer: 5, hint: 'Adding the two previous numbers', emoji: '🔷' },
    ];

    const [currentPattern, setCurrentPattern] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [completedPatterns, setCompletedPatterns] = useState([]);

    const pattern = patterns[currentPattern];

    // Pattern Matching Logic - Generate options
    const generateOptions = (correctAnswer) => {
        const options = new Set([correctAnswer]);
        while (options.size < 4) {
            const offset = Math.floor(Math.random() * 6) - 2;
            const option = correctAnswer + offset;
            if (option >= 0 && option !== correctAnswer) options.add(option);
        }
        return Array.from(options).sort((a, b) => a - b);
    };

    // Re-generate options when pattern changes
    // Using simple memoization based on pattern index would be better, but inline for now
    const [options, setOptions] = useState([]);

    // Initial load and updates
    if (options.length === 0) {
        setOptions(generateOptions(pattern.answer));
    }

    const handleSelect = (answer) => {
        if (isCorrect) return; // Prevent changing if already correct
        setShowResult(false); // Clear previous feedback
        setSelectedAnswer(answer);
    };

    const handleSubmit = () => {
        const correct = selectedAnswer === pattern.answer;
        setIsCorrect(correct);
        setShowResult(true);
        if (correct && !completedPatterns.includes(currentPattern)) {
            setCompletedPatterns([...completedPatterns, currentPattern]);
        }
    };

    const handleNextPattern = () => {
        setSelectedAnswer(null);
        setShowResult(false);
        setIsCorrect(false);
        setShowHint(false);
        setOptions([]); // Force regen options
        setCurrentPattern((currentPattern + 1) % patterns.length);
    };

    const progress = Math.round((completedPatterns.length / patterns.length) * 100);

    return (
        <div className="activity-content">
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                <span className="progress-text">{completedPatterns.length}/{patterns.length} completed</span>
            </div>

            <div className="pattern-display">
                <p className="instruction">Find the next number in the pattern:</p>

                {/* Visual Pattern Sequence */}
                <div className="pattern-sequence">
                    {pattern.sequence.map((num, i) => (
                        <motion.div
                            key={i}
                            className="pattern-item"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.15 }}
                        >
                            <span className="pattern-emoji">{pattern.emoji}</span>
                            <span className="pattern-number">{num}</span>
                        </motion.div>
                    ))}
                    <div className="pattern-item pattern-unknown">
                        <span className="pattern-emoji">❓</span>
                        <span className="pattern-number">{isCorrect ? pattern.answer : '?'}</span>
                    </div>
                </div>

                {/* Hint */}
                <button className="hint-button" onClick={() => setShowHint(!showHint)}>
                    💡 {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>
                {showHint && (
                    <motion.p
                        className="hint-text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Hint: {pattern.hint}
                    </motion.p>
                )}

                {/* Answer Options */}
                <div className="options-grid">
                    {options.map((option) => (
                        <motion.button
                            key={option}
                            className={`option-btn ${selectedAnswer === option ? 'option-selected' : ''} ${showResult && isCorrect && option === pattern.answer ? 'option-correct' : ''
                                } ${showResult && !isCorrect && selectedAnswer === option ? 'option-wrong' : ''}`}
                            onClick={() => handleSelect(option)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {option}
                        </motion.button>
                    ))}
                </div>

                {/* Actions */}
                <div className="action-buttons">
                    {!isCorrect ? (
                        <button className="btn btn-primary" onClick={handleSubmit} disabled={selectedAnswer === null}>
                            ✅ Check Pattern
                        </button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleNextPattern}>
                            ➡️ Next Pattern
                        </button>
                    )}
                </div>

                {/* Feedback */}
                <AnimatePresence>
                    {showResult && (
                        <motion.div
                            className={`feedback ${isCorrect ? 'feedback-correct' : 'feedback-try'}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            {isCorrect ? (
                                <>
                                    <span className="feedback-icon">🌟</span>
                                    <p>Excellent! The pattern is: {pattern.hint}. The next number is {pattern.answer}!</p>
                                </>
                            ) : (
                                <>
                                    <span className="feedback-icon">🌱</span>
                                    <p>Good try! Look closely at the numbers and try again.</p>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

/* ============================================================
   ACTIVITY 3: NUMBER–MAGNITUDE ASSOCIATION
   Algorithm: Quantity comparison logic
============================================================ */
const NumberMagnitude = () => {
    const problems = [
        { target: 3, options: [2, 3, 5], emoji: '🍎' },
        { target: 5, options: [5, 4, 1], emoji: '🍌' },
        { target: 2, options: [1, 2, 4], emoji: '🍇' },
        { target: 4, options: [3, 2, 4], emoji: '🍊' },
        { target: 6, options: [6, 3, 5], emoji: '🍓' },
        { target: 1, options: [2, 3, 1], emoji: '🍍' },
        { target: 7, options: [5, 7, 6], emoji: '🍒' },
        { target: 8, options: [8, 4, 2], emoji: '🥝' },
    ];

    const [currentProblem, setCurrentProblem] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [completed, setCompleted] = useState([]);

    const problem = problems[currentProblem];

    const handleSelect = (option) => {
        if (isCorrect) return;
        setShowResult(false);
        setSelectedOption(option);
    };

    const handleCheck = () => {
        const correct = selectedOption === problem.target;
        setIsCorrect(correct);
        setShowResult(true);
        if (correct && !completed.includes(currentProblem)) {
            setCompleted([...completed, currentProblem]);
        }
    };

    const handleNext = () => {
        setSelectedOption(null);
        setShowResult(false);
        setIsCorrect(false);
        setCurrentProblem((currentProblem + 1) % problems.length);
    };

    const progress = Math.round((completed.length / problems.length) * 100);

    return (
        <div className="activity-content">
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                <span className="progress-text">{completed.length}/{problems.length} completed</span>
            </div>

            <div className="magnitude-display">
                <p className="instruction">Which group has <strong>{problem.target}</strong> items?</p>

                <div className="options-grid magnitude-options">
                    {problem.options.map((option, i) => (
                        <motion.button
                            key={i}
                            className={`option-card ${selectedOption === option ? 'selected' : ''} ${showResult && isCorrect && option === problem.target ? 'correct' : ''
                                } ${showResult && !isCorrect && selectedOption === option ? 'wrong' : ''}`}
                            onClick={() => handleSelect(option)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="visual-group">
                                {Array.from({ length: option }).map((_, j) => (
                                    <span key={j} className="visual-emoji">{problem.emoji}</span>
                                ))}
                            </div>
                            {/* REMOVED: Number label displayed below emojis */}
                        </motion.button>
                    ))}
                </div>

                <div className="action-buttons">
                    {!isCorrect ? (
                        <button className="btn btn-primary" onClick={handleCheck} disabled={selectedOption === null}>
                            ✅ Check Answer
                        </button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleNext}>
                            ➡️ Next Problem
                        </button>
                    )}
                </div>

                <AnimatePresence>
                    {showResult && (
                        <motion.div
                            className={`feedback ${isCorrect ? 'feedback-correct' : 'feedback-try'}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            {isCorrect ? (
                                <>
                                    <span className="feedback-icon">🌟</span>
                                    <p>Correct! That group has exactly {problem.target} items.</p>
                                </>
                            ) : (
                                <>
                                    <span className="feedback-icon">🌱</span>
                                    <p>Not quite. Try counting the items in each group again!</p>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

/* ============================================================
   ACTIVITY 4: PART–WHOLE NUMBER DECOMPOSITION
   Algorithm: Missing addend search
============================================================ */
const PartWholeDecomposition = () => {
    const problems = [
        { whole: 5, part: 3, answer: 2, emoji: '🔵' },
        { whole: 4, part: 2, answer: 2, emoji: '🟢' },
        { whole: 6, part: 1, answer: 5, emoji: '🔴' },
        { whole: 3, part: 1, answer: 2, emoji: '🟡' },
        { whole: 7, part: 4, answer: 3, emoji: '🟣' },
        { whole: 8, part: 5, answer: 3, emoji: '🔶' },
        { whole: 10, part: 5, answer: 5, emoji: '🔷' },
        { whole: 9, part: 7, answer: 2, emoji: '🔺' },
    ];

    const [currentProblem, setCurrentProblem] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [completed, setCompleted] = useState([]);

    const problem = problems[currentProblem];
    // Generate options: correct answer + 2 random close numbers
    const [options, setOptions] = useState([]);

    // Initialize options when problem changes
    if (options.length === 0) {
        const opts = new Set([problem.answer]);
        while (opts.size < 3) {
            const r = Math.max(1, problem.answer + (Math.random() > 0.5 ? 1 : -1) * Math.ceil(Math.random() * 2));
            if (r !== problem.answer && r < problem.whole) opts.add(r);
        }
        setOptions(Array.from(opts).sort((a, b) => a - b));
    }

    const handleSelect = (val) => {
        if (isCorrect) return;
        setShowResult(false);
        setSelectedAnswer(val);
    };

    const handleCheck = () => {
        const correct = selectedAnswer === problem.answer;
        setIsCorrect(correct);
        setShowResult(true);
        if (correct && !completed.includes(currentProblem)) {
            setCompleted([...completed, currentProblem]);
        }
    };

    const handleNext = () => {
        setSelectedAnswer(null);
        setShowResult(false);
        setIsCorrect(false);
        setOptions([]); // Reset options for next problem
        setCurrentProblem((currentProblem + 1) % problems.length);
    };

    const progress = Math.round((completed.length / problems.length) * 100);

    return (
        <div className="activity-content">
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                <span className="progress-text">{completed.length}/{problems.length} completed</span>
            </div>

            <div className="decomposition-display">
                <p className="instruction">Complete the number bond!</p>

                <div className="number-bond">
                    <div className="bond-whole">
                        <span className="bond-label">Whole: {problem.whole}</span>
                        <div className="bond-dots">
                            {Array.from({ length: problem.whole }).map((_, i) => (
                                <span key={i} className="visual-dot large">{problem.emoji}</span>
                            ))}
                        </div>
                    </div>
                    <div className="bond-legs">
                        <div className="bond-part">
                            <span className="bond-label">Part: {problem.part}</span>
                            <div className="bond-dots">
                                {Array.from({ length: problem.part }).map((_, i) => (
                                    <span key={i} className="visual-dot">{problem.emoji}</span>
                                ))}
                            </div>
                        </div>
                        <div className="bond-part unknown">
                            <span className="bond-label">Part: ?</span>
                            <div className="bond-question">{isCorrect ? problem.answer : '❓'}</div>
                        </div>
                    </div>
                </div>

                <div className="options-row">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            className={`option-btn ${selectedAnswer === opt ? 'option-selected' : ''} ${showResult && isCorrect && opt === problem.answer ? 'option-correct' : ''
                                } ${showResult && !isCorrect && selectedAnswer === opt ? 'option-wrong' : ''}`}
                            onClick={() => handleSelect(opt)}
                        >
                            {opt}
                        </button>
                    ))}
                </div>

                <div className="action-buttons">
                    {!isCorrect ? (
                        <button className="btn btn-primary" onClick={handleCheck} disabled={selectedAnswer === null}>
                            ✅ Check
                        </button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleNext}>
                            ➡️ Next
                        </button>
                    )}
                </div>

                <AnimatePresence>
                    {showResult && (
                        <motion.div
                            className={`feedback ${isCorrect ? 'feedback-correct' : 'feedback-try'}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {isCorrect ? (
                                <p>Great job! {problem.part} and {problem.answer} make {problem.whole}.</p>
                            ) : (
                                <p>Try again! count up from {problem.part} to {problem.whole}.</p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

/* ============================================================
   ACTIVITY 5: BALANCE EQUALITY LEARNING TOOL
   Algorithm: Equality check logic
============================================================ */
const BalanceEquality = () => {
    // left side sum should equal right side sum (a+b = c+?)
    const problems = [
        { leftA: 2, leftB: 3, rightC: 1, answer: 4 }, // 5 = 1 + 4
        { leftA: 4, leftB: 4, rightC: 4, answer: 4 }, // 8 = 4 + 4
        { leftA: 3, leftB: 2, rightC: 2, answer: 3 }, // 5 = 2 + 3
        { leftA: 1, leftB: 5, rightC: 3, answer: 3 }, // 6 = 3 + 3
        { leftA: 5, leftB: 5, rightC: 2, answer: 8 }, // 10 = 2 + 8
        { leftA: 3, leftB: 3, rightC: 1, answer: 5 }, // 6 = 1 + 5
        { leftA: 2, leftB: 6, rightC: 4, answer: 4 }, // 8 = 4 + 4
        { leftA: 7, leftB: 1, rightC: 5, answer: 3 }, // 8 = 5 + 3
    ];

    const [currentProblem, setCurrentProblem] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [completed, setCompleted] = useState([]);

    const problem = problems[currentProblem];
    const leftSum = problem.leftA + problem.leftB;

    const [options, setOptions] = useState([]);

    if (options.length === 0) {
        const opts = new Set([problem.answer]);
        while (opts.size < 3) {
            const r = Math.max(1, problem.answer + (Math.random() > 0.5 ? 1 : -1) * Math.ceil(Math.random() * 2));
            if (r !== problem.answer && r > 0) opts.add(r);
        }
        setOptions(Array.from(opts).sort((a, b) => a - b));
    }

    const handleSelect = (val) => {
        if (isCorrect) return;
        setShowResult(false);
        setSelectedAnswer(val);
    };

    const handleCheck = () => {
        const correct = selectedAnswer === problem.answer;
        setIsCorrect(correct);
        setShowResult(true);
        if (correct && !completed.includes(currentProblem)) {
            setCompleted([...completed, currentProblem]);
        }
    };

    const handleNext = () => {
        setSelectedAnswer(null);
        setShowResult(false);
        setIsCorrect(false);
        setOptions([]);
        setCurrentProblem((currentProblem + 1) % problems.length);
    };

    const progress = Math.round((completed.length / problems.length) * 100);

    return (
        <div className="activity-content">
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                <span className="progress-text">{completed.length}/{problems.length} completed</span>
            </div>

            <div className="balance-display">
                <p className="instruction">Make both sides equal!</p>

                <div className="scale-container">
                    <div className="scale-arm left">
                        <div className="weight-box">{problem.leftA}</div>
                        <div className="weight-plus">+</div>
                        <div className="weight-box">{problem.leftB}</div>
                        <div className="scale-sum">(Total: {leftSum})</div>
                    </div>
                    <div className="scale-pivot">🔺</div>
                    <div className="scale-arm right">
                        <div className="weight-box">{problem.rightC}</div>
                        <div className="weight-plus">+</div>
                        <div className={`weight-box question ${showResult && isCorrect ? 'revealed' : ''}`}>
                            {showResult && isCorrect ? problem.answer : '?'}
                        </div>
                        <div className="scale-sum">(Total: {problem.rightC} + ?)</div>
                    </div>
                </div>

                <div className="options-row">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            className={`option-btn ${selectedAnswer === opt ? 'option-selected' : ''} ${showResult && isCorrect && opt === problem.answer ? 'option-correct' : ''
                                } ${showResult && !isCorrect && selectedAnswer === opt ? 'option-wrong' : ''}`}
                            onClick={() => handleSelect(opt)}
                        >
                            {opt}
                        </button>
                    ))}
                </div>

                <div className="action-buttons">
                    {!isCorrect ? (
                        <button className="btn btn-primary" onClick={handleCheck} disabled={selectedAnswer === null}>
                            ✅ Check Balance
                        </button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleNext}>
                            ➡️ Next
                        </button>
                    )}
                </div>

                <AnimatePresence>
                    {showResult && (
                        <motion.div
                            className={`feedback ${isCorrect ? 'feedback-correct' : 'feedback-try'}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {isCorrect ? (
                                <p>Perfect balance! {problem.leftA} + {problem.leftB} is the same as {problem.rightC} + {problem.answer}.</p>
                            ) : (
                                <p>Oops! The scale is tipped. Try another number.</p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

/* ============================================================
   ACTIVITY 6: FEED THE PANDA
   Algorithm: Bounding Box Collision Detection
============================================================ */
const FeedThePanda = () => {
    const targetNumber = 5;
    const [bamboosEaten, setBamboosEaten] = useState(0);
    const [bambooItems, setBambooItems] = useState(
        Array.from({ length: 7 }, (_, i) => ({ id: i + 1, eaten: false }))
    );
    const dropRef = useRef(null);

    const handleDragEnd = (id, event, info) => {
        if (!dropRef.current) return;
        const rect = dropRef.current.getBoundingClientRect();

        // Use the native DOM PointerEvent's coordinates — much more reliable
        // than framer-motion's info.point which can be {0,0} in some versions
        let px = 0, py = 0;
        if (event && typeof event.clientX === 'number') {
            px = event.clientX;
            py = event.clientY;
        } else if (event && event.nativeEvent && typeof event.nativeEvent.clientX === 'number') {
            px = event.nativeEvent.clientX;
            py = event.nativeEvent.clientY;
        } else if (info && info.point) {
            px = info.point.x || 0;
            py = info.point.y || 0;
        }

        // Add generous 40px padding for easier drops (child-friendly)
        const pad = 40;
        if (
            px >= rect.left - pad &&
            px <= rect.right + pad &&
            py >= rect.top - pad &&
            py <= rect.bottom + pad
        ) {
            setBambooItems(prev => prev.map(item =>
                item.id === id ? { ...item, eaten: true } : item
            ));
            setBamboosEaten(prev => prev + 1);
        }
    };

    const handleReset = () => {
        setBamboosEaten(0);
        setBambooItems(Array.from({ length: 7 }, (_, i) => ({ id: i + 1, eaten: false })));
    };

    const handleCapture = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ preferredDisplaySurface: 'browser' });
            const video = document.createElement('video');
            video.srcObject = stream;
            video.onloadedmetadata = async () => {
                await video.play();
                setTimeout(() => {
                    const canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL("image/png");
                    link.download = `MathSense-PandaFeed-${new Date().toISOString().slice(0, 10)}.png`;
                    link.click();
                    stream.getTracks().forEach(track => track.stop());
                }, 500);
            };
        } catch (err) {
            console.error("Error capturing screen:", err);
        }
    };

    const done = bamboosEaten >= targetNumber;

    return (
        <div className="activity-content">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '20px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <p className="instruction" style={{ margin: 0 }}>
                        Feed <strong>{targetNumber}</strong> bamboos 🎋 to the Panda!
                    </p>
                    <button className="btn-capture-small" onClick={handleCapture}>📸 Capture</button>
                </div>

                {/* Drop Zone — the Panda */}
                <div
                    ref={dropRef}
                    style={{
                        width: '180px',
                        height: '180px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: done ? '4px solid #4CAF50' : '4px dashed #aaa',
                        borderRadius: '50%',
                        backgroundColor: done ? '#e8f5e9' : '#fafafa',
                        fontSize: '80px',
                        transition: 'all 0.3s ease',
                        userSelect: 'none',
                    }}
                >
                    {done ? '😋' : '🐼'}
                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#555' }}>
                        {bamboosEaten} / {targetNumber}
                    </span>
                </div>

                {/* Instruction */}
                <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>
                    {done ? '' : '↑ Drag a bamboo onto the panda above ↑'}
                </p>

                {/* Bamboo Grid — clearly separated from the panda */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    justifyContent: 'center',
                    padding: '20px',
                    backgroundColor: '#f0faf0',
                    borderRadius: '16px',
                    border: '2px solid #c8e6c9',
                    minHeight: '80px',
                }}>
                    {bambooItems.map(item => !item.eaten ? (
                        <motion.div
                            key={item.id}
                            drag
                            dragSnapToOrigin
                            dragElastic={0.5}
                            onDragEnd={(e, info) => handleDragEnd(item.id, e, info)}
                            whileHover={{ scale: 1.2 }}
                            whileDrag={{ scale: 1.3, zIndex: 999 }}
                            style={{
                                fontSize: '48px',
                                cursor: 'grab',
                                userSelect: 'none',
                                touchAction: 'none',
                                lineHeight: 1,
                            }}
                        >
                            🎋
                        </motion.div>
                    ) : (
                        <div key={item.id} style={{ fontSize: '48px', opacity: 0.15, lineHeight: 1 }}>🎋</div>
                    ))}
                </div>

                {/* Feedback */}
                {done && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{ textAlign: 'center' }}
                    >
                        <p style={{ fontSize: '22px', color: '#2e7d32', fontWeight: 'bold' }}>
                            🌟 Yum! The panda is full! 🌟
                        </p>
                        <button className="btn btn-primary" onClick={handleReset}>Feed Again</button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

/* ============================================================
   ACTIVITY 7: KEYBOARD COUNTING
   Algorithm: Key press event matching
============================================================ */
const KeyboardCounting = () => {
    const [target, setTarget] = useState(3);
    const [input, setInput] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const num = parseInt(e.key);
            if (!isNaN(num)) {
                setInput(num);
                if (num === target) setIsCorrect(true);
                else setIsCorrect(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [target]);

    const nextProblem = () => {
        setTarget(Math.floor(Math.random() * 9) + 1);
        setInput(null);
        setIsCorrect(false);
    };

    return (
        <div className="activity-content">
            <div className="keyboard-display">
                <p className="instruction">Count the stars and press the number on your keyboard!</p>

                <div className="star-field">
                    {Array.from({ length: target }).map((_, i) => (
                        <motion.span
                            key={i}
                            className="visual-star"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            ⭐
                        </motion.span>
                    ))}
                </div>

                <div className="keyboard-feedback">
                    <p>You pressed: <span className="key-display">{input !== null ? input : '_'}</span></p>
                    {isCorrect && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <p className="correct-msg">Correct! 🎉</p>
                            <button className="btn btn-primary" onClick={nextProblem}>Next (Press Enter)</button>
                        </motion.div>
                    )}
                </div>

                <div className="visual-keypad">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
                        <div key={num} className={`v-key ${input === num ? (isCorrect ? 'v-key-correct' : 'v-key-wrong') : ''}`}>
                            {num}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ============================================================
                     MAIN LEARN PAGE - Activity Switcher
============================================================ */
const Learn = () => {
    const [activeActivity, setActiveActivity] = useState('builder');

    // Keyboard Navigation State
    // We will use a ref or simple document listener, but a 'focus' state is better for visual accessibility
    // For simplicity in this specific "game" context, we'll enable global arrow keys for the ACTIVE game components 
    // by passing specific props or wrapping them. 
    // HOWEVER, the user request asks to "Improve the interaction level... using keyboards". 
    // A clean way is to wrap the ActiveComponent or handle it at the top level if possible.
    // Given the structure, passing a Ref or using a custom hook inside games is best.
    // For now, let's implement the Screen Capture here as it applies to the whole page.

    const handleCapture = async () => {
        try {
            console.log("Requesting screen capture...");
            // Ask user to select screen area
            const stream = await navigator.mediaDevices.getDisplayMedia({
                preferredDisplaySurface: 'browser',
            });

            const video = document.createElement('video');
            video.srcObject = stream;
            video.onloadedmetadata = async () => {
                await video.play();

                // Capture frame after brief delay to ensuring rendering
                setTimeout(() => {
                    const canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    const context = canvas.getContext('2d');
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);

                    // Save file
                    const image = canvas.toDataURL("image/png");
                    const link = document.createElement('a');
                    link.href = image;
                    link.download = `MathSense-Progress-${new Date().toISOString().slice(0, 10)}.png`;
                    link.click();

                    // Stop sharing
                    stream.getTracks().forEach(track => track.stop());
                }, 500);
            };
        } catch (err) {
            console.error("Error capturing screen:", err);
            // alert("Could not capture screen. Please allow permission when prompted.");
        }
    };

    const activities = [
        { id: 'builder', label: '🧱 Math Builder', component: MathBuilder },
        { id: 'pattern', label: '🔢 Patterns', component: PatternRecognition },
        { id: 'magnitude', label: '🍎 Magnitude', component: NumberMagnitude },
        { id: 'partwhole', label: '🧩 Part-Whole', component: PartWholeDecomposition },
        { id: 'balance', label: '⚖️ Balance', component: BalanceEquality },
        { id: 'panda', label: '🐼 Feed Panda', component: FeedThePanda },
        { id: 'keycount', label: '⌨️ Key Counter', component: KeyboardCounting },
    ];

    const ActiveComponent = activities.find(a => a.id === activeActivity)?.component || MathBuilder;

    return (
        <div className="page learn-page">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="learn-header"
            >
                <div className="header-text">
                    <h1 className="page-title">🧩 Visual Learning Activities</h1>
                    <p className="page-subtitle">
                        Learn math through calm visual interactions — no rush, no pressure
                    </p>
                </div>
                <button className="btn-capture" onClick={handleCapture} title="Screenshot your progress">
                    📸 Capture Progress
                </button>
            </motion.div>

            {/* Activity Tabs - demonstrates event handling & conditional rendering */}
            <div className="activity-tabs">
                {activities.map((activity) => (
                    <button
                        key={activity.id}
                        className={`activity-tab ${activeActivity === activity.id ? 'active' : ''}`}
                        onClick={() => setActiveActivity(activity.id)}
                    >
                        {activity.label}
                    </button>
                ))}
            </div>

            {/* Active Activity */}
            <motion.div
                key={activeActivity}
                className="activity-container card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {/* 
                   Ideally, we would pass 'isActive' prop or similar to enable keyboard listeners 
                   Specifically for that component. 
                   For this implementation, components are self-contained. 
                */}
                <ActiveComponent />
            </motion.div>

            <div className="interaction-hint">
                <p>💡 <strong>Pro Tip:</strong> Use ⬅️ ➡️ Arrow keys to select and <strong>Enter</strong> to check answer!</p>
            </div>
        </div>
    );
};

export default Learn;
