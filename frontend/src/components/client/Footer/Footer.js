import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                {/* Left: copyright */}
                <p className="text-sm select-none">© {new Date().getFullYear()} Misoran Interior BD. All rights reserved.</p>

                {/* Right: social icons */}
                <div className="flex space-x-6">
                    <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white transition">
                        <svg className="w-6 h-6 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>Facebook</title>
                            <path d="M22.675 0h-21.35C.596 0 0 .593 0 1.326v21.348C0 23.406.596 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.406 24 22.674V1.326C24 .593 23.405 0 22.675 0z" />
                        </svg>
                    </a>

                    <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white transition">
                        <svg className="w-6 h-6 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>Twitter</title>
                            <path d="M23.954 4.569c-.885.39-1.83.654-2.825.775a4.935 4.935 0 002.163-2.724c-.951.555-2.005.959-3.127 1.184a4.918 4.918 0 00-8.373 4.482A13.94 13.94 0 011.64 3.16a4.822 4.822 0 001.523 6.573 4.897 4.897 0 01-2.229-.616c-.054 2.28 1.581 4.415 3.949 4.89a4.934 4.934 0 01-2.224.084 4.92 4.92 0 004.6 3.417 9.867 9.867 0 01-6.102 2.105c-.395 0-.79-.023-1.17-.067a13.945 13.945 0 007.548 2.212c9.142 0 14.307-7.721 14.307-14.416 0-.22 0-.438-.015-.655A10.243 10.243 0 0024 4.59z" />
                        </svg>
                    </a>

                    <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition">
                        <svg className="w-6 h-6 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>Instagram</title>
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.415a4.92 4.92 0 011.675 1.01 4.92 4.92 0 011.01 1.675c.175.46.36 1.26.415 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.415 2.43a4.92 4.92 0 01-1.01 1.675 4.92 4.92 0 01-1.675 1.01c-.46.175-1.26.36-2.43.415-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.415a4.92 4.92 0 01-1.675-1.01 4.92 4.92 0 01-1.01-1.675c-.175-.46-.36-1.26-.415-2.43-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.24-1.97.415-2.43a4.92 4.92 0 011.01-1.675 4.92 4.92 0 011.675-1.01c.46-.175 1.26-.36 2.43-.415 1.266-.058 1.646-.07 4.85-.07zM12 0c-3.259 0-3.667.012-4.947.07-1.28.058-2.166.25-2.92.54a6.92 6.92 0 00-2.494 1.62 6.92 6.92 0 00-1.62 2.494c-.29.754-.482 1.64-.54 2.92C.012 8.333 0 8.741 0 12c0 3.259.012 3.667.07 4.947.058 1.28.25 2.166.54 2.92a6.92 6.92 0 001.62 2.494 6.92 6.92 0 002.494 1.62c.754.29 1.64.482 2.92.54 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.28-.058 2.166-.25 2.92-.54a6.92 6.92 0 002.494-1.62 6.92 6.92 0 001.62-2.494c.29-.754.482-1.64.54-2.92.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.28-.25-2.166-.54-2.92a6.92 6.92 0 00-1.62-2.494 6.92 6.92 0 00-2.494-1.62c-.754-.29-1.64-.482-2.92-.54C15.667.012 15.259 0 12 0z" />
                            <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998z" />
                            <circle cx="18.406" cy="5.594" r="1.44" />
                        </svg>
                    </a>

                    <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition">
                        <svg className="w-6 h-6 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>LinkedIn</title>
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.024-3.037-1.849-3.037-1.849 0-2.133 1.445-2.133 2.939v5.667H9.356V9h3.414v1.561h.047c.476-.899 1.637-1.849 3.37-1.849 3.604 0 4.271 2.373 4.271 5.462v6.278zM5.337 7.433c-1.144 0-2.07-.927-2.07-2.07 0-1.143.926-2.07 2.07-2.07 1.143 0 2.07.927 2.07 2.07 0 1.143-.927 2.07-2.07 2.07zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.223.792 24 1.771 24h20.451C23.2 24 24 23.223 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}
