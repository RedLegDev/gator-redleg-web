import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Gallery = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-gray-500 mb-6">
              <Link to="/" className="hover:text-redleg">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link to="/photos" className="hover:text-redleg">Photos</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700">Gallery</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-artillery section-heading">
              Photo Gallery
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Browse our collection of photos from chapter events, community service activities, and more.
            </p>
            
            {/* Category filter */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    category === "All" 
                      ? "bg-redleg text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Gallery grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {galleryImages.map((image) => (
                <div key={image.id} className="relative overflow-hidden rounded-lg group">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-white font-medium">{image.alt}</span>
                    <span className="text-white text-sm opacity-80">{image.category}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mb-8">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-redleg text-white flex items-center justify-center">1</button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100">2</button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100">3</button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
            
            {/* Call to action */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-artillery mb-4">Have Photos to Share?</h3>
              <p className="text-artillery-muted mb-6 max-w-2xl mx-auto">
                If you have photos from Gator Redleg events or activities that you'd like to share,
                please contact us. We'd love to add them to our gallery.
              </p>
              <Link to="/more/contact">
                <button className="button-red">Contact Us</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
