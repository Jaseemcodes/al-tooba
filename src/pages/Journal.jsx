import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

export default function Journal() {
  return (
    <div className="pt-24 pb-20 bg-parchment min-h-screen">
      <div className="max-w-7xl mx-auto mt-8 px-6 sm:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-xs font-sans font-bold uppercase tracking-[0.25em]">THE AL TOOBA JOURNAL</span>
          <h1 className="font-serif font-bold text-4xl sm:text-6xl text-forest mt-3 tracking-tight">Prophetic Healing Wisdom</h1>
          <p className="text-sm sm:text-base text-forest/70 max-w-xl mx-auto mt-4 leading-relaxed font-sans">
            Read our scientific reviews, health guides, and origin articles tracing traditional remedies back to Islamic Tibb-e-Nabawi scriptures.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white border border-forest/10 rounded-3xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(31,58,29,0.05)] transition-all duration-300 flex flex-col h-full group"
            >
              {/* Image Frame */}
              <div className="aspect-[16/10] overflow-hidden bg-parchment/20 relative border-b border-forest/5">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-forest text-parchment text-[9px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Text Area */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-3 text-[10px] font-sans font-bold uppercase tracking-wider text-forest/40 mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-forest group-hover:text-gold transition-colors mb-3 leading-snug">
                    <Link to={`/journal/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-forest/70 font-sans leading-relaxed mb-6">
                    {post.shortDesc}
                  </p>
                </div>
                <div>
                  <Link
                    to={`/journal/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-widest text-forest group-hover:text-gold transition-colors"
                  >
                    Read Article
                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Journal Newsletter Block */}
        <div className="mt-24 border border-forest/10 rounded-3xl bg-[#1e3b1d] text-parchment p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-md">
          <span className="text-gold text-xs font-sans font-bold uppercase tracking-[0.2em] block mb-3">STAY CURRENT WITH TIBB RESEARCH</span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-parchment mb-4">Subscribe to our Healing Letters</h2>
          <p className="text-xs sm:text-sm text-muted-green max-w-lg mx-auto mb-8 font-sans leading-relaxed">
            Get monthly emails detailing scientific studies, recipe formulations, and natural remedy tips directly in your inbox.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); e.target.reset(); }} className="flex flex-col sm:flex-row gap-4 items-stretch max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              required
              className="flex-grow bg-white/10 border border-parchment/20 rounded-full px-5 py-3 text-sm font-sans text-parchment placeholder-muted-green focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="rounded-full px-8 py-3 bg-gold hover:bg-[#b09359] text-forest text-xs font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
