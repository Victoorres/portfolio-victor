'use client';

import { Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Footer() {
  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://instagram.com/iamvictormt',
      label: 'Instagram',
      color: 'hover:bg-pink-500',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/iamvictormt',
      label: 'LinkedIn',
      color: 'hover:bg-blue-600',
    },
  ];

  return (
    <footer className="py-12 bg-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Left Side - Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} <span className="text-lime-400 font-medium">Victor Torres</span>. Todos os
              direitos reservados.
            </p>
            <p className="text-gray-500 text-xs mt-1">Desenvolvido com muito café</p>
          </motion.div>

          {/* Right Side - Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex space-x-4"
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className={`relative group w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:border-lime-400/50 ${social.color}`}
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="relative overflow-hidden"
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-lime-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                    {/* Icon */}
                    <social.icon className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />

                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-gray-700">
                      {social.label}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </a>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 pt-8 border-t border-gray-800"
        >
          <div className="text-center">
            <p className="text-gray-500 text-xs">
              Feito com <span className="text-lime-400">Next.js</span>,{' '}
              <span className="text-lime-400">Tailwind CSS</span> e <span className="text-lime-400">Framer Motion</span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
