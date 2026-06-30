import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

export default function JournalPost() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) {
      navigate('/journal');
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [slug, post, navigate]);

  if (!post) return null;

  // Recommended posts (exclude current)
  const recommendations = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="pt-24 pb-20 bg-parchment min-h-screen">
      <div className="max-w-4xl mx-auto mt-8 px-6 sm:px-8">
        {/* Navigation back */}
        <div className="flex items-center space-x-2 text-xs font-sans font-bold uppercase tracking-widest text-forest/50 mb-10">
          <Link to="/" className="hover:text-forest">Home</Link>
          <span>/</span>
          <Link to="/journal" className="hover:text-forest">Journal</Link>
          <span>/</span>
          <span className="text-forest truncate max-w-[200px]">{post.title}</span>
        </div>

        {/* Post Metadata */}
        <div className="text-center sm:text-left mb-8">
          <span className="bg-forest/10 text-forest text-xs font-sans font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            {post.category}
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-forest mt-6 mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center sm:justify-start gap-4 text-xs font-sans font-bold uppercase tracking-wider text-forest/40">
            <span>Published on {post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Hero image */}
        <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-forest/10 mb-12 bg-white shadow-sm">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content body */}
        <div className="prose prose-forest max-w-none text-base text-forest/85 font-sans leading-relaxed space-y-6 border-b border-forest/10 pb-16 mb-16">
          <p className="text-lg font-serif italic text-forest leading-relaxed border-l-4 border-gold pl-6 py-2 my-8">
            {post.shortDesc}
          </p>

          <p className="first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:text-forest first-letter:font-bold">
            {post.content}
          </p>

          <h3 className="font-serif font-bold text-2xl text-forest pt-6">Understanding the Botanical Framework</h3>
          <p>
            When utilizing prophetic cures, modern science reveals that the quality of sourcing is paramount. For instance, active compounds like thymoquinone or methylglyoxal are highly heat-sensitive. Standard commercial heating processes neutralize these enzymes, stripping the remedy of its therapeutic capability. This is why cold pressing and raw, unpasteurized treatment are not just modern trends, but essential criteria for restoring true natural healing.
          </p>

          <blockquote className="bg-white/50 border border-forest/10 p-6 rounded-2xl italic font-serif text-forest text-center my-8 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
            "We have trace minerals and organic enzymes behaving like tiny keys, unlocking biological pathways in our immune cells that synthetic compounds simply fail to recognize."
          </blockquote>

          <h3 className="font-serif font-bold text-2xl text-forest pt-4">Integrating Tradition into Daily Living</h3>
          <p>
            Starting with a teaspoon of black seed oil combined with raw honey in warm water every morning on an empty stomach is one of the most effective ways to experience these benefits. It activates the metabolic pathway, kickstarts digestion, and creates an alkaline shield across the gastrointestinal tract. Over consistent weeks of use, patients often report enhanced respiratory health, reduced joint discomfort, and stabilized digestive systems.
          </p>
        </div>

        {/* Next Articles recommendations */}
        {recommendations.length > 0 && (
          <div>
            <h3 className="font-serif font-bold text-2xl text-forest mb-8 tracking-tight">Recommended Readings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {recommendations.map((p) => (
                <div key={p.id} className="bg-white border border-forest/10 rounded-2xl p-6 flex flex-col justify-between group hover:shadow-md transition-shadow">
                  <div>
                    <span className="text-[10px] text-muted-green font-sans font-bold uppercase tracking-wider block mb-2">{p.category}</span>
                    <h4 className="font-serif font-bold text-lg text-forest group-hover:text-gold transition-colors mb-3 leading-snug">
                      <Link to={`/journal/${p.slug}`}>
                        {p.title}
                      </Link>
                    </h4>
                  </div>
                  <Link
                    to={`/journal/${p.slug}`}
                    className="text-xs font-sans font-bold uppercase tracking-wider text-forest/50 hover:text-forest transition-colors mt-4 inline-block"
                  >
                    Read Post →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
