import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} This is Filmon's Blog. All rights reserved.</p>
      </div>
      <div className="footer-socials">
        <a href="https://github.com/Filmon24" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.58 2 12.26C2 16.62 4.87 20.26 8.84 21.5C9.34 21.59 9.5 21.3 9.5 21.05C9.5 20.82 9.49 20.18 9.49 19.38C7 19.91 6.48 18.36 6.48 18.36C6.04 17.23 5.37 16.95 5.37 16.95C4.39 16.3 5.45 16.32 5.45 16.32C6.54 16.41 7.09 17.54 7.09 17.54C8.06 19.23 9.68 18.77 10.3 18.52C10.39 17.77 10.68 17.27 10.99 17.01C8.98 16.75 6.85 15.98 6.85 12.85C6.85 11.92 7.18 11.16 7.74 10.56C7.65 10.3 7.36 9.36 7.82 8.09C7.82 8.09 8.53 7.81 9.5 8.61C10.18 8.43 10.92 8.34 11.66 8.34C12.4 8.34 13.14 8.43 13.82 8.61C14.79 7.81 15.5 8.09 15.5 8.09C15.96 9.36 15.67 10.3 15.58 10.56C16.14 11.16 16.47 11.92 16.47 12.85C16.47 15.99 14.33 16.75 12.32 17.01C12.72 17.34 13.09 18.01 13.09 19.01C13.09 20.36 13.08 21.41 13.08 21.05C13.08 21.3 13.24 21.59 13.74 21.5C17.71 20.26 20.58 16.62 20.58 12.26C20.58 6.58 16.1 2 12 2Z" fill="#fff"/>
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/filmon-ataklty" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm15.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v5.62z" fill="#fff"/>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
