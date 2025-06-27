'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import TestimonialsModal from './testimonials-modal';

const testimonials = [
  {
    id: 1,
    name: 'Matheus S.',
    role: 'Estudande Eng. Computação',
    content:
      'Trabalhar com o Victor foi simplesmente sensacional! Desde o início, ele entendeu direitinho o que eu queria e conseguiu transformar minhas ideias em um site moderno e super funcional...',
    fullContent:
      'Trabalhar com o Victor foi simplesmente sensacional! Desde o início, ele entendeu direitinho o que eu queria e conseguiu transformar minhas ideias em um site moderno e super funcional. Sempre muito atencioso, ouviu cada sugestão com carinho e manteve a comunicação clara o tempo todo. O resultado ficou até melhor do que eu imaginava! Sem dúvida, quero contar com ele de novo nos próximos projetos.',
    rating: 5,
    avatar: './matheus.png',
    duration: '3 semanas',
  },
  {
    id: 2,
    name: 'Dimas N.',
    role: 'TI',
    content:
      'O Victor foi essencial pra tirarmos do papel o nosso sistema interno de gestão. Sempre comprometido com os prazos e super proativo, ele não só executou o que pedimos, como também...',
    fullContent:
      'O Victor foi essencial pra tirarmos do papel o nosso sistema interno de gestão. Sempre comprometido com os prazos e super proativo, ele não só executou o que pedimos, como também trouxe várias ideias que melhoraram muito o nosso fluxo de trabalho. A entrega superou as expectativas: uma interface intuitiva, desempenho excelente e tudo funcionando redondinho. Recomendo demais pra quem procura um desenvolvedor confiável, talentoso e parceiro de verdade.',
    rating: 5,
    avatar: './dimas.png',
    duration: '2 meses',
  },
  {
    id: 3,
    name: 'Beatriz F.',
    role: 'Designer Gráfico',
    content:
      'O Victor criou meu site pessoal e eu simplesmente amei! Ele conseguiu traduzir direitinho minha personalidade e estilo em cada detalhe. Além disso deixou tudo super responsivo e fácil de atualizar...',
    fullContent:
      'O Victor criou meu site pessoal e eu simplesmente amei! Ele conseguiu traduzir direitinho minha personalidade e estilo em cada detalhe. Além disso, deixou tudo super responsivo e fácil de atualizar. Até hoje recebo elogios sobre como o site é bonito e rápido! E o atendimento? Impecável. Sempre paciente, atencioso e dedicado. Recomendo de olhos fechados!',
    rating: 5,
    avatar: './beatriz.png',
    duration: '1 mês',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedTestimonial, setSelectedTestimonial] = useState<(typeof testimonials)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openTestimonialModal = (testimonial: (typeof testimonials)[0]) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const closeModal = (scroll: boolean) => {
    setIsModalOpen(false);
    setSelectedTestimonial(null);

    if (scroll) scrollToContact();
  };

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
    <>
      <section ref={ref} className="py-20 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm text-gray-500 mb-2">Comentários</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                O que meus
                <br />
                clientes <span className="text-lime-400">acham</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-end"
            >
              <p className="text-gray-600 text-base lg:text-lg">
                As impressões dos clientes são essenciais para o meu trabalho e ficarei feliz em compartilhar as
                experiências deles com você.
              </p>
            </motion.div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group cursor-pointer cursor-hover"
                onClick={() => openTestimonialModal(testimonial)}
              >
                <div className="bg-gray-900 text-white p-4 lg:p-6 rounded-xl lg:rounded-2xl h-full hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between min-h-[280px] lg:min-h-[300px]">
                  {/* Stars */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-lime-400 text-lime-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-300 text-lg leading-relaxed mb-6 flex-grow">{testimonial.content}</p>

                  {/* Bottom Section */}
                  <div className="flex items-end justify-between">
                    {/* Author */}
                    <div className="flex items-center space-x-3">
                      <Image
                        src={testimonial.avatar || '/placeholder.svg'}
                        alt={testimonial.name}
                        width={100}
                        height={100}
                        className="rounded-full w-[4rem] h-[4rem]"
                      />
                      <div>
                        <p className="font-semibold text-white text-xl">{testimonial.name}</p>
                        <p className="text-gray-400 text-base">{testimonial.role}</p>
                      </div>
                    </div>

                    {/* Button */}
                    <div className="relative">
                      <div className="absolute top-1 left-1 w-8 h-8 lg:w-10 lg:h-10 bg-gray-700 rounded-full"></div>
                      <div className="relative w-8 h-8 lg:w-10 lg:h-10 bg-lime-400 hover:bg-lime-300 text-black rounded-full flex items-center justify-center transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 group-hover:scale-110">
                        <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        testimonial={selectedTestimonial}
        allTestimonials={testimonials}
      />
    </>
  );
}
