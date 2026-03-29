import React from 'react';
import footerLogo from '../assets/footer/footer-logo.png';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Ebraj',
      links: [
        'Ebraj Company',
        'Ebraj Plan',
        'Ebraj Shields',
        'White Paper',
        'Reviwes',
        'News',
        'FAQs'
      ]
    },
    {
      title: 'Ebrajers',
      links: [
        'Talk',
        'Vote',
        'Fraud'
      ]
    },
    {
      title: 'Core',
      links: [
        'Mayors',
        'Brainers',
        'Developers',
        'Investors',
        'Invitations'
      ]
    },
    {
      title: 'Support',
      links: [
        'Help',
        'Learn',
        'Feedback'
      ]
    },
    {
      title: 'Arms',
      links: [
        'E.Platform',
        'E-Company',
        'S-Company'
      ]
    }
  ];

  return (
    <footer className="w-full bg-white font-sans flex flex-col">
      {/* Top Main Footer Section */}
      <div className="py-16 px-6 lg:px-10 max-w-7xl mx-auto w-full">
        {/* Section 1: Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8">
          {footerLinks.map((section, index) => (
            <div key={index} className="flex flex-col">
              <h3 className="font-bold mb-8 text-black text-[15px]">{section.title}</h3>
              <ul className="space-y-6">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-[14px] text-gray-500 hover:text-black transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Section 2: Bottom Row (Socials & Dropdowns) */}
        <div className="mt-16 flex flex-col md:flex-row justify-end items-center gap-8">
          
          {/* LEFT: Social media icons */}
          <div className="flex items-center space-x-5 text-black">
            <a href="#" className="hover:text-gray-500 transition-colors" aria-label="Facebook">
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="hover:text-gray-500 transition-colors" aria-label="Instagram">
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="hover:text-gray-500 transition-colors" aria-label="YouTube">
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s-.002 3.254-.42 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.812.419-7.812.419s-6.252 0-7.812-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.254 2 12 2 12s.002-3.254.42-4.814a2.507 2.507 0 0 1 1.768-1.768C5.748 5 12 5 12 5s6.252 0 7.812.418ZM10 15.5l6-3.5-6-3.5v7Z" clipRule="evenodd" />
                </svg>
            </a>
            <a href="#" className="hover:text-gray-500 transition-colors" aria-label="TikTok">
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.9 2.9 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-gray-500 transition-colors" aria-label="X (Twitter)">
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-gray-500 transition-colors" aria-label="LinkedIn">
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/>
              </svg>
            </a>
          </div>

          {/* RIGHT: Dropdowns */}
          <div className="flex space-x-3">
            <div className="relative">
              <select 
                className="appearance-none border border-gray-300 rounded block w-[120px] pl-4 pr-10 py-[8px] text-[15px] bg-white text-black outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors cursor-pointer"
                defaultValue="English"
              >
                <option value="English">English</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black">
                <svg className="w-[10px] h-[10px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <select 
                className="appearance-none border border-gray-300 rounded block w-[150px] pl-4 pr-10 py-[8px] text-[15px] bg-white text-black outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors cursor-pointer"
                defaultValue="S USD (USD)"
              >
                <option value="S USD (USD)">S USD (USD)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black">
                <svg className="w-[10px] h-[10px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section (Part 1: Horizontal Links) */}
      <div className="w-full px-6 lg:px-10 border-t border-gray-200 py-6">
        <ul className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-xs font-semibold text-gray-500 uppercase">
          <li><a href="#" className="hover:text-gray-900 transition-colors">Trust & Safety</a></li>
          <li><a href="#" className="hover:text-gray-900 transition-colors">Terms of Use</a></li>
          <li><a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-gray-900 transition-colors">Cookie Policy</a></li>
          <li><a href="#" className="hover:text-gray-900 transition-colors">Accessibility Statement</a></li>
          <li><a href="#" className="hover:text-gray-900 transition-colors">My Personal Information</a></li>
        </ul>
      </div>

      {/* Part 2: Bottom Bar (Dark Section) */}
      <div className="w-full bg-gradient-to-r from-slate-900 to-blue-900 px-6 lg:px-10 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Left Side */}
          <div className="flex items-center space-x-3">
            <img src={footerLogo} alt="Ebraj Footer Logo" className="h-10 w-auto object-contain" />
            <div className="flex flex-col justify-center">
              <span className="text-white text-sm font-semibold tracking-wide">Ebrajers SF</span>
              <span className="text-gray-300 text-[10px]">Ebraj powered by Ebrajers</span>
            </div>
          </div>

          {/* Right Side */}
          <div className="text-yellow-400 text-xs tracking-wide">
            © 2026 Ebraj, LLC. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
