'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import ProjectModal from './project-modal';

const skills = [
  {
    number: '01',
    name: 'WEB DEVELOPMENT',
    category: 'web',
    experience: '7+ anos',
    projects: '15+ projetos',
    description:
      'Desenvolvimento de aplicações web modernas com Angular, React, Next.js, TypeScript e NodeJS. Foco em performance e experiência do usuário.',
  },
  {
    number: '02',
    name: 'MOBILE DEVELOPMENT',
    category: 'mobile',
    experience: '5+ anos',
    projects: '3+ projetos',
    description: 'Desenvolvimento de aplicações mobile nativas e híbridas com Ionic, integradas a APIs REST.',
  },
  {
    number: '03',
    name: 'BACKEND DEVELOPMENT',
    category: 'backend',
    experience: '7+ anos',
    projects: '15+ projetos',
    description:
      'Desenvolvimento de APIs robustas, microserviços e arquiteturas escaláveis com Java, NodeJS e bancos de dados.',
  },
];

const projects = [
  {
    name: 'Monteiro Branding',
    deadline: '5 dias',
    size: 'large',
    delay: 0.2,
    logo: '/monteiro-branding-logo.svg?height=60&width=60',
    description: 'Uma plataforma que expressa a expertise de um estúdio em identidade visual e branding.',
    desktopImages: [
      '/monteiro-branding-desktop-1.png?height=400&width=600',
      '/monteiro-branding-desktop-2.png?height=400&width=600',
    ],
    mobileImages: [
      '/monteiro-branding-mobile-1.png?height=600&width=300',
      '/monteiro-branding-mobile-2.png?height=600&width=300',
    ],
    tech: ['React', 'NextJS', 'Tailwind', 'Framer Motion'],
    liveUrl: 'https://monteiro-branding.vercel.app/',
  },
  {
    name: 'Cliqui',
    deadline: '3 dias',
    size: 'large',
    delay: 0.4,
    logo: '/cliqui-logo.png?height=60&width=60',
    description: 'Plataforma especializada no desenvolvimento de landing pages otimizadas para conversão.',
    desktopImages: ['/cliqui-desktop-1.png?height=400&width=600', '/cliqui-desktop-2.png?height=400&width=600'],
    mobileImages: ['/cliqui-mobile-1.png?height=600&width=300', '/cliqui-mobile-2.png?height=600&width=300'],
    tech: ['React', 'NextJS', 'Tailwind', 'Framer Motion'],
    liveUrl: 'https://usecliqui.com.br',
  },
  {
    name: 'UP Connection',
    deadline: '7 dias',
    size: 'large',
    delay: 0.6,
    logo: '/up-logo.png?height=60&width=60',
    description: 'Clube de benefícios que conecta arquitetos e designers de interiores a oportunidades únicas.',
    desktopImages: ['/up-desktop-1.png?height=400&width=600', '/up-desktop-2.png?height=400&width=600'],
    mobileImages: ['/up-mobile-1.png?height=600&width=300', '/up-mobile-2.png?height=600&width=300'],
    tech: ['React', 'NextJS', 'Tailwind', 'Framer Motion', 'NestJS', 'PostgreSQL', 'Docker'],
    liveUrl: 'https://upconnection.app',
  },
  {
    name: 'Higor Giovane - Portfólio',
    deadline: '7 dias',
    size: 'large',
    delay: 0.8,
    logo: '/higor-portfolio-logo.svg?height=60&width=60',
    description: 'Portfólio interativo para desenvolvedores, com visual inspirado em terminal (CMD).',
    desktopImages: [
      '/higor-portfolio-desktop-1.png?height=400&width=600',
      '/higor-portfolio-desktop-2.png?height=400&width=600',
    ],
    mobileImages: [
      '/higor-portfolio-mobile-1.png?height=600&width=300',
      '/higor-portfolio-mobile-2.png?height=600&width=300',
    ],
    tech: ['React', 'NextJS', 'Tailwind', 'Framer Motion'],
    liveUrl: '',
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string>('web'); // Default to web development

  const openProjectModal = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleSkillClick = (category: string) => {
    setActiveSkill(activeSkill === category ? 'web' : category); // Always keep one selected, default to web
  };

  const activeSkillData = skills.find((skill) => skill.category === activeSkill);

  return (
    <>
      <section id="about" ref={ref} className="py-20 bg-gray-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-64 h-64 bg-lime-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-lime-400/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Side - About */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-6 lg:space-y-8"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Olá, eu sou
                <br />
                <span className="text-lime-400">Victor Torres!</span>
              </h2>

              <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                Desenvolvedor Full Stack apaixonado por criar soluções digitais inovadoras que transformam ideias em
                realidade!
              </p>

              <div className="space-y-4 lg:space-y-6 pt-4 lg:pt-8">
                {skills.map((skill, index) => (
                  <motion.button
                    key={skill.number}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    onClick={() => handleSkillClick(skill.category)}
                    className="flex items-center w-full text-left group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  >
                    <span
                      className={`text-sm font-mono transition-colors mr-4 lg:mr-6 ${
                        activeSkill === skill.category ? 'text-lime-400' : 'text-gray-500'
                      }`}
                    >
                      {skill.number}
                    </span>
                    <div className="flex-1 relative">
                      <div
                        className={`h-px transition-all duration-300 ${
                          activeSkill === skill.category
                            ? 'bg-lime-400 w-48 md:w-64 lg:w-80'
                            : 'bg-gray-700 w-40 md:w-56 lg:w-72'
                        }`}
                      ></div>
                      {activeSkill === skill.category && (
                        <motion.div
                          layoutId="skillIndicator"
                          className="absolute -top-1 -bottom-1 left-0 w-48 md:w-64 lg:w-80 bg-lime-400/20 rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                    <span
                      className={`text-xs md:text-sm font-medium tracking-wider transition-colors ml-4 lg:ml-6 ${
                        activeSkill === skill.category ? 'text-lime-400' : 'text-white group-hover:text-lime-400'
                      }`}
                    >
                      {skill.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Skill Details */}
              {activeSkillData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 lg:p-6 border border-gray-700/50"
                >
                  <h3 className="text-lime-400 font-semibold text-base lg:text-lg mb-2 lg:mb-3">
                    {activeSkillData.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3 lg:mb-4">{activeSkillData.description}</p>
                  <div className="flex space-x-4 lg:space-x-6">
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider">Experiência</p>
                      <p className="text-white font-medium text-sm">{activeSkillData.experience}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider">Projetos</p>
                      <p className="text-white font-medium text-sm">{activeSkillData.projects}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Right Side - Projects Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-3 lg:gap-4 h-fit"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group cursor-pointer cursor-hover"
                  onClick={() => openProjectModal(project)}
                >
                  <div className="bg-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 h-[240px] lg:h-[280px] hover:bg-gray-750 transition-all duration-300 hover:scale-[1.02] relative flex flex-col justify-between border border-gray-700/50 hover:border-lime-400/30">
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-lime-400/5 rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Project Title */}
                    <h3 className="text-white font-semibold text-sm lg:text-lg leading-tight relative z-10">
                      {project.name}
                    </h3>

                    {/* Large Centered Logo Area */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                        className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl lg:rounded-3xl flex items-center justify-center group-hover:border-lime-400/50 transition-all duration-300"
                      >
                        <Image
                          src={project.logo || '/placeholder.svg'}
                          alt={`${project.name} logo`}
                          width={100}
                          height={100}
                          className="lg:w-full lg:h-full rounded-xl lg:rounded-2xl"
                        />
                      </motion.div>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex items-end justify-between relative z-10">
                      {/* Project Deadline */}
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider font-medium mb-1">
                          PRAZO DO PROJETO
                        </p>
                        <p className="text-gray-300 text-xs lg:text-sm">{project.deadline}</p>
                      </div>

                      {/* Enhanced Retro Button */}
                      <div className="relative">
                        <div className="absolute top-1 left-1 w-8 h-8 lg:w-10 lg:h-10 bg-gray-900 rounded-full"></div>
                        <div className="relative w-8 h-8 lg:w-10 lg:h-10 bg-lime-400 hover:bg-lime-300 text-black rounded-full flex items-center justify-center transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 group-hover:scale-110 shadow-lg">
                          <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <ProjectModal isOpen={isModalOpen} onClose={closeModal} project={selectedProject} />
    </>
  );
}
