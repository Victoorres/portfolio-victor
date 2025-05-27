'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

const galleryProjects = [
  {
    id: 1,
    username: 'iamvictormt',
    avatar: '/victor-rosto.jpeg?height=40&width=40',
    image: '/post-lucas.png',
    likes: 1234,
    comments: 89,
    caption: 'Portfólio digital para um web design.',
    tags: ['#design', '#bookstore', '#vintage', '#branding'],
    timeAgo: '2h',
  },
  {
    id: 2,
    username: 'iamvictormt',
    avatar: '/victor-rosto.jpeg?height=40&width=40',
    image: '/post-beatriz.png?height=400&width=400',
    likes: 892,
    comments: 45,
    caption: 'Portfólio digital para uma designer.',
    tags: ['#ecommerce', '#sustainable', '#fashion', '#ux'],
    timeAgo: '1d',
  },
  {
    id: 3,
    username: 'iamvictormt',
    avatar: '/victor-rosto.jpeg?height=40&width=40',
    image: '/post-juliana.png?height=400&width=400',
    likes: 567,
    comments: 23,
    caption: 'Landing page para uma designer.',
    tags: ['#landing page', '#fitness', '#dataviz', '#mobile'],
    timeAgo: '3d',
  },
  {
    id: 4,
    username: 'iamvictormt',
    avatar: '/victor-rosto.jpeg?height=40&width=40',
    image: '/post-matheus.png?height=400&width=400',
    likes: 1456,
    comments: 78,
    caption: 'Landing page para um contador.',
    tags: ['#contabil', '#web', '#portfolio', '#landingpage'],
    timeAgo: '5d',
  },
  {
    id: 5,
    username: 'iamvictormt',
    avatar: '/victor-rosto.jpeg?height=40&width=40',
    image: '/post-joao.png?height=400&width=400',
    likes: 723,
    comments: 34,
    caption: 'Portfólio criado para estudos.',
    tags: ['#spline', '#portfolio', '#skills', '#web'],
    timeAgo: '1w',
  },
  {
    id: 6,
    username: 'iamvictormt',
    avatar: '/victor-rosto.jpeg?height=40&width=40',
    image: '/ideia-portfolio.png?height=400&width=400',
    likes: 934,
    comments: 56,
    caption: 'Portfólio criado para estudos.',
    tags: ['#spline', '#portfolio', '#aboutme', '#projects'],
    timeAgo: '1w',
  },
];

export default function ProjectsGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  // Load liked posts from localStorage on component mount
  useEffect(() => {
    const savedLikes = localStorage.getItem('portfolio-liked-posts');
    if (savedLikes) {
      try {
        setLikedPosts(JSON.parse(savedLikes));
      } catch (error) {
        console.error('Error loading liked posts:', error);
      }
    }
  }, []);

  // Save liked posts to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('portfolio-liked-posts', JSON.stringify(likedPosts));
  }, [likedPosts]);

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]));
  };

  return (
    <>
      <section id="gallery" ref={ref} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm text-gray-500 mb-2">Galeria</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                Galeria de
                <br />
                <span className="text-lime-400">Projetos</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-end"
            >
              <p className="text-gray-600 text-base lg:text-lg">
                Trabalhos autorais e projetos em andamento, apresentados como posts para revelar o processo por trás de
                cada criação.
              </p>
            </motion.div>
          </div>

          {/* Instagram-like Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {galleryProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-hover"
              >
                {/* Post Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center cursor-hover">
                      <Image
                        src={project.avatar || '/placeholder.svg'}
                        alt={project.username}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{project.username}</p>
                      <p className="text-gray-500 text-xs">{project.timeAgo}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Post Image */}
                <div className="relative aspect-square bg-gray-100 cursor-hover">
                  <Image src={project.image || '/placeholder.svg'} alt="Project" fill className="object-cover" />
                </div>

                {/* Post Actions */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <button onClick={() => toggleLike(project.id)} className="transition-colors">
                        <Heart
                          className={`w-6 h-6 ${
                            likedPosts.includes(project.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-700 hover:text-red-500'
                          }`}
                        />
                      </button>
                      <button className="text-gray-700 hover:text-gray-900 transition-colors">
                        <MessageCircle className="w-6 h-6" />
                      </button>
                      <button className="text-gray-700 hover:text-gray-900 transition-colors">
                        <Share className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  {/* Likes Count */}
                  <p className="font-semibold text-gray-900 text-sm mb-2">
                    {(project.likes + (likedPosts.includes(project.id) ? 1 : 0)).toLocaleString()} curtidas
                  </p>

                  {/* Caption */}
                  <div className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">{project.username}</span> {project.caption}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-lime-500 text-sm hover:underline cursor-hover">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Comments */}
                  <button className="text-gray-500 text-sm hover:text-gray-700 transition-colors">
                    Ver todos os {project.comments} comentários
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
