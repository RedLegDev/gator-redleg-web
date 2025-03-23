
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, Download, Calendar, Search, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample newsletter archive data
const newsletters = [
  {
    id: 1,
    title: "Summer 2023 Edition",
    date: "June 15, 2023",
    description: "Featuring our annual golf tournament recap, scholarship recipients, and upcoming events.",
    pdfUrl: "#"
  },
  {
    id: 2,
    title: "Spring 2023 Edition",
    date: "March 10, 2023",
    description: "Featuring our 5K run results, member spotlight, and community service initiatives.",
    pdfUrl: "#"
  },
  {
    id: 3,
    title: "Winter 2022 Edition",
    date: "December 22, 2022",
    description: "Featuring St. Barbara's Day Ball coverage, end-of-year recap, and holiday message.",
    pdfUrl: "#"
  },
  {
    id: 4,
    title: "Fall 2022 Edition",
    date: "September 18, 2022",
    description: "Featuring Kenny Fike Memorial Softball Tournament results and fall activities.",
    pdfUrl: "#"
  },
  {
    id: 5,
    title: "Summer 2022 Edition",
    date: "June 12, 2022",
    description: "Featuring golf tournament highlights, scholarship announcements, and summer events.",
    pdfUrl: "#"
  },
  {
    id: 6,
    title: "Spring 2022 Edition",
    date: "March 15, 2022",
    description: "Featuring spring activities, member updates, and upcoming events calendar.",
    pdfUrl: "#"
  },
  {
    id: 7,
    title: "Winter 2021 Edition",
    date: "December 20, 2021",
    description: "Featuring St. Barbara's Day Ball, holiday activities, and year-in-review.",
    pdfUrl: "#"
  },
  {
    id: 8,
    title: "Fall 2021 Edition",
    date: "September 15, 2021",
    description: "Featuring softball tournament results, fall member social, and community outreach.",
    pdfUrl: "#"
  }
];

// Years for filtering
const years = ["All", "2023", "2022", "2021", "2020", "2019", "2018"];

const NewsletterArchive = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-gray-500 mb-6">
              <Link to="/" className="hover:text-redleg">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link to="/newsletter" className="hover:text-redleg">Newsletter</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700">Archive</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-artillery section-heading">
              Newsletter Archive
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Browse our collection of past newsletters to learn about our chapter's history, activities, and impact.
            </p>
            
            {/* Search and filter */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search newsletters..."
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg"
                  />
                </div>
                
                <select className="px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg">
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Newsletter list */}
            <div className="space-y-6 mb-12">
              {newsletters.map((newsletter) => (
                <div key={newsletter.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-artillery mb-2">{newsletter.title}</h3>
                        <div className="flex items-center mb-3">
                          <Calendar className="h-4 w-4 text-redleg mr-2" />
                          <span className="text-sm text-gray-600">{newsletter.date}</span>
                        </div>
                        <p className="text-artillery-muted">{newsletter.description}</p>
                      </div>
                      <a 
                        href={newsletter.pdfUrl} 
                        className="flex-shrink-0 bg-white text-redleg border border-redleg py-2 px-4 rounded-md hover:bg-redleg/5 transition duration-300 flex items-center"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mb-12">
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
            
            {/* Newsletter subscription */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <Mail className="h-6 w-6 text-redleg" />
                </div>
                <h3 className="text-2xl font-bold text-artillery">Subscribe to Our Newsletter</h3>
              </div>
              
              <p className="text-artillery-muted mb-6">
                Never miss an issue! Subscribe to receive our quarterly newsletter directly in your inbox.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg"
                />
                <button
                  type="submit"
                  className="bg-redleg text-white py-2 px-6 rounded-md hover:bg-redleg/90 transition duration-300"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="text-sm text-gray-500 mt-3">
                We respect your privacy. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsletterArchive;
