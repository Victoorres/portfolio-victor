'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section id="home" className="pt-24 pb-20 px-4 relative overflow-hidden bg-gray-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-lime-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-lime-400/5 to-lime-400/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-4xl text-center relative mt-[2rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="relative inline-block">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-40 h-40 md:w-60 md:h-60 mx-auto mb-8 cursor-hover"
            >
              {/* Glowing Ring */}
              <div className="absolute inset-0 bg-lime-400 rounded-full blur-md opacity-30 animate-pulse"></div>
              {/* Outer Ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-lime-400/10 rounded-full animate-spin-slow"></div>
              <Image
                src="/victor.jpeg?height=192&width=192"
                alt="Profile"
                fill
                className="rounded-full object-cover border-4 border-white shadow-2xl relative z-10"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -top-6 -right-6 md:-top-4 md:-right-12 bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center space-x-2 z-20 border border-lime-200 cursor-hover"
            >
              <Sparkles className="w-4 h-4 text-lime-400" />
              <span className="whitespace-nowrap">Olá, eu sou Victor!</span>
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-3xl md:text-6xl font-bold text-gray-900 leading-tight px-4"
          >
            Menos complexidade. <br /> <span className="text-lime-400">Mais solução.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button
              onClick={scrollToContact}
              size="lg"
              className="group relative bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 md:px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden border border-gray-700"
            >
              <div className="absolute inset-0 bg-lime-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center">
                Fale comigo
                <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
