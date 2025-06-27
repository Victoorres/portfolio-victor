'use client';

import type React from 'react';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, ArrowUpRight, Loader2, Clock, X } from 'lucide-react';
import emailjs from 'emailjs-com';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const whatsappNumber = process.env.NEXT_PUBLIC_CONTACT_PHONE;
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [showTimeRemaining, setShowTimeRemaining] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID as string);
    const storedTime = localStorage.getItem('lastContactSubmitTime');
    if (storedTime) {
      const parsedTime = Number.parseInt(storedTime, 10);
      setLastSubmitTime(parsedTime);

      const currentTime = Date.now();
      const elapsedTime = currentTime - parsedTime;
      const waitTime = 30 * 60 * 1000;

      if (elapsedTime < waitTime) {
        setTimeRemaining(Math.ceil((waitTime - elapsedTime) / 1000));
        setShowTimeRemaining(true);
      }
    }
  }, []);

  useEffect(() => {
    if (timeRemaining <= 0 || !showTimeRemaining) {
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowTimeRemaining(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, showTimeRemaining]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const checkTimeLimit = (): boolean => {
    if (!lastSubmitTime) return true;

    const currentTime = Date.now();
    const elapsedTime = currentTime - lastSubmitTime;
    const waitTime = 30 * 60 * 1000; // 30 minutos em milissegundos

    if (elapsedTime < waitTime) {
      const remainingSeconds = Math.ceil((waitTime - elapsedTime) / 1000);
      setTimeRemaining(remainingSeconds);
      setShowTimeRemaining(true);
      return false;
    }

    return true;
  };

  const handleSubmitAttempt = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!checkTimeLimit()) {
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmation(false);
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

      if (!serviceId || !templateId) {
        toast({
          title: 'Erro',
          description: 'Variáveis de ambiente não estão definidas.',
        });
        return;
      }

      await emailjs
        .send(serviceId, templateId, {
          name: formData.name,
          message: formData.message,
          email: formData.email,
        })
        .then(
          (result) => {
            toast({
              title: 'Sucesso',
              description: 'Mensagem enviada com sucesso!',
            });
          },
          (error) => {
            toast({
              title: 'Erro ao enviar mensagem',
              description: 'Servidor indisponível, tente novamente mais tarde.',
            });
            console.error(error.text);
          }
        );

      const currentTime = Date.now();
      localStorage.setItem('lastContactSubmitTime', currentTime.toString());
      setLastSubmitTime(currentTime);
      setTimeRemaining(30 * 60);
      setShowTimeRemaining(true);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelSubmit = () => {
    setShowConfirmation(false);
  };

  const formatTimeRemaining = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <section id="contact" ref={ref} className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-lime-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-lime-400/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-sm text-lime-400 mb-2 font-medium tracking-wider uppercase"
              >
                Entre em contato
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
              >
                Vamos criar algo
                <br />
                <span className="text-lime-400">incrível juntos?</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-300 text-base lg:text-lg leading-relaxed"
            >
              Transformo ideias em experiências digitais memoráveis. Vamos conversar sobre seu próximo projeto e como
              posso ajudar a torná-lo realidade.
            </motion.p>

            <div className="space-y-6 pt-4">
              {[
                { icon: Mail, text: 'victoorres@icloud.com', delay: 0.4 },
                { icon: Phone, text: '+55 (62) 98532-9181', delay: 0.5 },
                { icon: MapPin, text: 'Anápolis, Brasil', delay: 0.6 },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: item.delay }}
                  className="flex items-center space-x-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center group-hover:bg-gray-700 transition-all duration-300 backdrop-blur-sm border border-gray-700 group-hover:border-lime-400/50">
                    <item.icon className="w-5 h-5 text-lime-400" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Form Container */}
            <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl mt-1 lg:mt-[3vh]">
              <form onSubmit={handleSubmitAttempt} className="relative space-y-6">
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="space-y-2"
                  >
                    <label className="text-gray-300 text-sm font-medium">Nome</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-lime-400 transition-all duration-300 rounded-xl h-12"
                      placeholder="Seu nome"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="space-y-2"
                  >
                    <label className="text-gray-300 text-sm font-medium">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-lime-400 transition-all duration-300 rounded-xl h-12"
                      placeholder="seu@email.com"
                    />
                  </motion.div>
                </div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="space-y-2"
                >
                  <label className="text-gray-300 text-sm font-medium">Mensagem</label>
                  <Textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-lime-400 transition-all duration-300 rounded-xl resize-none"
                    placeholder="Conte-me mais sobre seu projeto..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="pt-4"
                >
                  <Button
                    type="submit"
                    className="group relative w-full bg-lime-400 hover:bg-lime-500 text-black font-medium h-14 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl overflow-hidden"
                    disabled={isSubmitting || showTimeRemaining}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : showTimeRemaining ? (
                      <>
                        <Clock className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        Aguarde {formatTimeRemaining(timeRemaining)}
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative flex items-center justify-center space-x-2">
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          <span>Enviar Mensagem</span>
                        </span>
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={cancelSubmit}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-bold mb-4">Confirmar envio</h3>
            <p className="mb-6">Você só poderá enviar outra mensagem após 30 minutos. Deseja continuar?</p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={cancelSubmit}
                className="group relative w-full text-black font-medium h-14 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl overflow-hidden"
              >
                Cancelar
              </Button>
              <Button
                size="lg"
                className="group relative w-full bg-lime-400 hover:bg-lime-500 text-black font-medium h-14 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl overflow-hidden"
                onClick={handleConfirmSubmit}
              >
                Confirmar envio
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
