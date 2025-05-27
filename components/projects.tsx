'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Strelo Protocol',
    category: 'Blockchain',
    description: 'Plataforma DeFi inovadora para trading de criptomoedas',
    tech: ['React', 'Web3', 'Solidity'],
    color: 'bg-blue-500',
  },
  {
    title: 'Digital Agency',
    category: 'Website',
    description: 'Site corporativo moderno para agência digital',
    tech: ['Next.js', 'Tailwind', 'Framer Motion'],
    color: 'bg-purple-500',
  },
  {
    title: 'Tatoo Salon',
    category: 'E-commerce',
    description: 'Plataforma de agendamento para estúdio de tatuagem',
    tech: ['React', 'Node.js', 'MongoDB'],
    color: 'bg-pink-500',
  },
  {
    title: 'Metacode',
    category: 'SaaS',
    description: 'Ferramenta de desenvolvimento colaborativo',
    tech: ['Vue.js', 'Python', 'PostgreSQL'],
    color: 'bg-green-500',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="projects" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Projetos em Destaque</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Alguns dos projetos que desenvolvi recentemente, cada um com suas próprias características e desafios
            únicos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-500 mb-4">{project.category}</p>
                    </div>
                    <div
                      className={`w-12 h-12 ${project.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Button size="icon" variant="ghost" className="text-white hover:bg-transparent">
                        <ExternalLink className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
