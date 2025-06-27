'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ChevronLeft, ChevronRight, Building, Clock, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  fullContent: string;
  rating: number;
  avatar: string;
  duration: string;
}

interface TestimonialsModalProps {
  isOpen: boolean;
  onClose: (scroll: boolean) => void;
  testimonial: Testimonial | null;
  allTestimonials: Testimonial[];
}

export default function TestimonialsModal({ isOpen, onClose, testimonial, allTestimonials }: TestimonialsModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(testimonial);

  useEffect(() => {
    if (testimonial) {
      const index = allTestimonials.findIndex((t) => t.id === testimonial.id);
      setCurrentIndex(index);
      setCurrentTestimonial(testimonial);
    }
  }, [testimonial, allTestimonials]);

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : allTestimonials.length - 1;
    setCurrentIndex(newIndex);
    setCurrentTestimonial(allTestimonials[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex < allTestimonials.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setCurrentTestimonial(allTestimonials[newIndex]);
  };

  if (!currentTestimonial) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => onClose(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Image
                    src={currentTestimonial.avatar || '/placeholder.svg'}
                    alt={currentTestimonial.name}
                    width={100}
                    height={100}
                    className="rounded-full border-2 border-lime-400 w-[4rem] h-[4rem]"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-lime-400 rounded-full flex items-center justify-center">
                    <span className="text-black text-xs font-bold">✓</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentTestimonial.name}</h2>
                  <p className="text-gray-600">{currentTestimonial.role}</p>
                  {/* <div className="flex items-center space-x-1 mt-1">
                    <Building className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500 text-sm">{currentTestimonial.company}</span>
                  </div> */}
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => onClose(false)} className="rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Rating */}
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-lime-400 text-lime-400 mx-1" />
                  ))}
                </div>
                <p className="text-gray-500 text-sm">{currentTestimonial.rating}/5 - Avaliação do Cliente</p>
              </div>

              {/* Full Testimonial */}
              <div className="bg-gray-50 rounded-2xl p-6 ml-14 mr-14">
                <blockquote className="text-gray-700 text-lg leading-relaxed italic">
                  "{currentTestimonial.fullContent}"
                </blockquote>
              </div>

              {/* Project Details */}
              {/* <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-lime-50 rounded-xl">
                  <Code className="w-8 h-8 text-lime-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Tipo de Projeto</h3>
                  <p className="text-gray-600 text-sm">{currentTestimonial.projectType}</p>
                </div>

                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Duração</h3>
                  <p className="text-gray-600 text-sm">{currentTestimonial.duration}</p>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <Building className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Empresa</h3>
                  <p className="text-gray-600 text-sm">{currentTestimonial.company}</p>
                </div>
              </div> */}

              {/* Technologies Used */}
              {/* <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tecnologias Utilizadas</h3>
                <div className="flex flex-wrap gap-3">
                  {currentTestimonial.technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="px-4 py-2 bg-gray-900 text-white text-sm rounded-full font-medium hover:bg-lime-400 hover:text-black transition-colors cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div> */}

              {/* Pagination Dots */}
              <div className="flex justify-center space-x-2 pt-4">
                {allTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setCurrentTestimonial(allTestimonials[index]);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentIndex ? 'bg-lime-400 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              {/* Call to Action */}
              <div className="text-center pt-6 border-t border-gray-200">
                <p className="text-gray-600 mb-4">Gostou do que viu? Vamos conversar sobre seu projeto!</p>
                <Button
                  onClick={() => onClose(true)}
                  className="bg-lime-400 hover:bg-lime-500 text-black font-medium px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
                >
                  Entrar em Contato
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
