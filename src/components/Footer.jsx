import './Footer.css';

/**
 * Footer - Simple functional component demonstrating JSX and props-free reusable design.
 */
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <span className="footer-icon">🌿</span>
                    <span className="footer-name">MathSense</span>
                </div>
                <p className="footer-tagline">
                    A calm visual math learning portal for autism children
                </p>
                <div className="footer-details">
                    <span>Amal Godwin J</span>
                    <span className="footer-dot">·</span>
                    <span>CB.SC.U4CSE23407</span>
                    <span className="footer-dot">·</span>
                    <span>23CSE461 – Full Stack Frameworks</span>
                </div>
                <p className="footer-copyright">
                    © 2026 MathSense · Built with 💚 for inclusive education
                </p>
            </div>
        </footer>
    );
};

export default Footer;
