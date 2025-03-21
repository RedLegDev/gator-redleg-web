
import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-artillery">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Have questions or want to get involved? Get in touch with the Gator Redlegs Chapter leadership.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-artillery">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 mr-4 text-redleg flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-600">Florida National Guard Headquarters</p>
                  <p className="text-gray-600">St. Augustine, FL</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-6 w-6 mr-4 text-redleg flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a href="mailto:info@gatorredleg.org" className="text-redleg hover:underline">info@gatorredleg.org</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-6 w-6 mr-4 text-redleg flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600">(904) 555-1234</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-artillery">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg"
                  placeholder="How can we help?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg"
                  placeholder="Your message..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-redleg text-white py-3 px-6 rounded-md hover:bg-redleg/90 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
