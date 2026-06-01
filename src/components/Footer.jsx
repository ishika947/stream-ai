import './Footer.css';

function Footer() {
  return (
    <footer className="mt-12 bg-darkBg text-gray-100 border-t border-purple-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Left: Logo + tagline */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-purple-400">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
                <path d="M7 12a5 5 0 0 0 10 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 7v5l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <div className="font-semibold text-lg">LiveOps AI</div>
                <div className="text-sm text-gray-400">Real-time intelligence for modern infrastructure.</div>
              </div>
            </div>
          </div>

          {/* Middle: Links */}
          <div className="flex-1 grid grid-cols-2 gap-6 max-w-md w-full">
            <div>
              <h4 className="text-sm font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="inline-flex min-h-11 items-center hover:text-white">Features</a></li>
                <li><a href="#" className="inline-flex min-h-11 items-center hover:text-white">Pricing</a></li>
                <li><a href="#" className="inline-flex min-h-11 items-center hover:text-white">Docs</a></li>
                <li><a href="#" className="inline-flex min-h-11 items-center hover:text-white">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="inline-flex min-h-11 items-center hover:text-white">About</a></li>
                <li><a href="#" className="inline-flex min-h-11 items-center hover:text-white">Blog</a></li>
                <li><a href="#" className="inline-flex min-h-11 items-center hover:text-white">Careers</a></li>
                <li><a href="#" className="inline-flex min-h-11 items-center hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Right: Social icons */}
          <div className="flex-1 flex items-start md:justify-end">
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="inline-flex min-h-11 min-w-11 items-center justify-center text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 .5a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.26 1.86 1.26 1.08 1.84 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.25-.12-.3-.54-1.5.12-3.12 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.62.24 2.82.12 3.12.77.85 1.23 1.93 1.23 3.25 0 4.63-2.81 5.66-5.48 5.96.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.83.57A12 12 0 0012 .5z"/>
                </svg>
              </a>

              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="inline-flex min-h-11 min-w-11 items-center justify-center text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M23 4.5c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.4 1.7-2.4-.7.4-1.6.6-2.5.8C19.6 2.6 18.4 2 17 2c-2 0-3.6 1.6-3.6 3.6 0 .3 0 .7.1 1C10.1 6.5 6.6 4.6 4 1.8c-.4.6-.6 1.4-.6 2.2 0 1.3.7 2.4 1.7 3-.6 0-1.2-.2-1.7-.5 0 1.9 1.3 3.6 3.2 4-.4.1-.8.2-1.3.2-.3 0-.6 0-.9-.1.6 1.9 2.3 3.3 4.3 3.3-1.6 1.3-3.6 2.1-5.8 2.1-.4 0-.8 0-1.2-.1 2 1.3 4.4 2 6.9 2 8.3 0 12.8-7 12.8-13v-.6c.9-.6 1.6-1.4 2.1-2.3-.8.4-1.6.6-2.5.7z"/>
                </svg>
              </a>

              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="inline-flex min-h-11 min-w-11 items-center justify-center text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M4.98 3.5a2.5 2.5 0 11-.001 5.001A2.5 2.5 0 014.98 3.5zM3 9h4v12H3zM9 9h3.8v1.6h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6v7.3H18v-6.5c0-1.6 0-3.6-2.2-3.6-2.2 0-2.6 1.8-2.6 3.5V21H9z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400 text-center md:text-left">
          <div>© 2026 LiveOps AI. All rights reserved.</div>
          <div className="flex gap-4 mt-3 md:mt-0">
            <a href="#" className="inline-flex min-h-11 items-center hover:text-white">Privacy Policy</a>
            <a href="#" className="inline-flex min-h-11 items-center hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
