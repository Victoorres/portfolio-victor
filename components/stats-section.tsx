'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Code, Users, Coffee, Award } from 'lucide-react';

const stats = [
  {
    icon: Code,
    number: 15,
    label: 'Projetos Concluídos',
    suffix: '+',
    description: 'Sites, apps e sistemas desenvolvidos',
  },
  {
    icon: Users,
    number: 15,
    label: 'Clientes Satisfeitos',
    suffix: '+',
    description: 'Pessoas que confiaram no meu trabalho',
  },
  {
    icon: Coffee,
    number: 3999,
    label: 'Xícaras de Café',
    suffix: '+',
    description: 'Combustível para a criatividade',
  },
  {
    icon: Award,
    number: 7,
    label: 'Anos de Experiência',
    suffix: '',
    description: 'Aperfeiçoando habilidades constantemente',
  },
];

function CountUp({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, hasStarted]);

  const startAnimation = () => {
    setHasStarted(true);
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="stats" ref={ref} className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-64 h-64 bg-lime-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-lime-400/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm text-gray-400 mb-2">Estatísticas</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Números que
              <br />
              <span className="text-lime-400">Falam</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-end"
          >
            <p className="text-gray-400 text-base lg:text-lg">
              Cada projeto é uma oportunidade de crescer e entregar resultados excepcionais. Aqui estão alguns números
              que representam minha jornada.
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group text-center"
            >
              <div className="relative">
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="w-20 h-20 mx-auto mb-6 bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-800 group-hover:border-lime-400/50 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-lime-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  <stat.icon className="w-8 h-8 text-lime-400 relative z-10" />
                </motion.div>

                {/* Number */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  className="mb-2"
                >
                  <span className="text-4xl md:text-5xl font-bold text-white group-hover:text-lime-400 transition-colors duration-300">
                    {isInView && <CountUp end={stat.number} suffix={stat.suffix} />}
                  </span>
                </motion.div>

                {/* Label */}
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-lime-400 transition-colors duration-300">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">{stat.description}</p>

                {/* Decorative line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                  className="h-px bg-gradient-to-r from-transparent via-lime-400/50 to-transparent mt-6"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
            <span className="text-gray-300 text-sm">Disponível para novos projetos</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
