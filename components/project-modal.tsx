'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Monitor, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    name: string;
    description: string;
    logo: string;
    desktopImages: string[];
    mobileImages: string[];
    tech: string[];
    liveUrl?: string;
    githubUrl?: string;
  } | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 rounded-xl flex items-center justify-center">
                  <Image
                    src={project.logo || '/placeholder.svg'}
                    alt={`${project.name} logo`}
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-gray-100 text-lime-600 text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Sobre o Projeto</h3>
                <p className="text-gray-600 leading-relaxed">{project.description}</p>
              </div>

              {/* Desktop Screenshots */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Monitor className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Versão Desktop</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.desktopImages.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden group cursor-pointer"
                    >
                      <Image
                        src={image || '/placeholder.svg'}
                        alt={`${project.name} desktop ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile Screenshots */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Smartphone className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Versão Mobile</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.mobileImages.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                      className="relative aspect-[9/16] bg-gray-100 rounded-xl overflow-hidden group cursor-pointer"
                    >
                      <Image
                        src={image || '/placeholder.svg'}
                        alt={`${project.name} mobile ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              {(project.liveUrl || project.githubUrl) && (
                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
                  {project.liveUrl && (
                    <Button asChild className="bg-lime-400 hover:bg-lime-500 text-black font-medium">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        Ver projeto
                      </a>
                    </Button>
                  )}
                  {/* {project.githubUrl && (
                    <Button variant="outline" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        Ver no GitHub
                      </a>
                    </Button>
                  )} */}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
