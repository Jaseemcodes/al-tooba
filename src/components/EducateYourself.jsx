import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { blogPosts } from '../data/blogPosts';

export default function EducateYourself() {
  // Take the first 3 posts
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="bg-[#FBF8F1] py-20 relative overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8">
        
        {/* Header Area */}
        <div className="flex flex-col items-center justify-center text-center mb-10 relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-[#0D3B2A] mb-4"
          >
            Educate Yourself
          </motion.h2>
          <div className="w-12 h-[2px] bg-[#D4A24C] mx-auto"></div>
          
          {/* Global Read More Button */}
          <div className="absolute right-0 bottom-0 md:bottom-2 mt-4 md:mt-0">
             <Link 
               to="/journal"
               className="text-sm font-sans font-bold text-forest hover:text-[#D4A24C] transition-colors flex items-center gap-1 uppercase tracking-widest"
             >
               Read More
               <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
               </svg>
             </Link>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
          {posts.map((post, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              key={post.id}
              className="bg-white rounded-[24px] overflow-hidden shadow-[0_8px_24px_rgba(31,58,29,0.04)] hover:shadow-[0_12px_36px_rgba(31,58,29,0.08)] transition-shadow duration-300 flex flex-col h-full border border-forest/5"
            >
              {/* Image Container */}
              <div className="w-full h-56 relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Text Content */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="font-sans font-bold text-2xl text-[#1a1a1a] mb-3 leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="font-sans text-[15px] text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {post.shortDesc}
                </p>
                
                {/* Button Area */}
                <div className="mt-auto">
                  <Link
                    to={`/journal/${post.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1e3b1d] text-white text-sm font-sans font-semibold hover:bg-[#0f2413] transition-colors"
                  >
                    Read Article
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
