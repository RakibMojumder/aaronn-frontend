"use client";

import Image from "next/image";
import { useState } from "react";
import contactImg from "../../../../public/assets/contact.png";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container mx-auto min-h-screen text-white px-4 pt-16 pb-28 relative">
      <div className="w-[200px] h-[80px] absolute top-28 -left-16 xl:left-10 bg-white blur-[100px] opacity-60 hidden lg:block"></div>
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <h1 className="text-3xl md:text-5xl font-semibold mb-2">Contact Me</h1>
        <p className="text-gray-400 mb-24">For Any Project Knock Us</p>

        <hr className="py-10 border-neutral-600" />

        {/* Contact Form Section */}
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
              Get in
              <br />
              Touch With
              <br />
              Us
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm text-gray-400">
                NAME
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-transparent border-b border-gray-600 focus:border-white py-2 outline-none transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="subject" className="text-sm text-gray-400">
                SUBJECT
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full bg-transparent border-b border-gray-600 focus:border-white py-2 outline-none transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="message" className="text-sm text-gray-400">
                MESSAGE
              </label>
              <input
                type="text"
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-transparent border-b border-gray-600 focus:border-white py-2 outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="bg-[#FF5C00] text-white px-8 py-2 rounded-full hover:bg-[#FF7A33] transition-colors"
            >
              SEND
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="mb-16 rounded-2xl overflow-hidden">
          <Image
            src={contactImg}
            alt="Laptop with colorful lighting"
            width={1200}
            height={600}
            className="w-full object-cover"
          />
        </div>

        {/* Footer Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
          <div className="text-gray-400">Street Avenue 21, CA</div>
          <div className="text-gray-400">+9 0283353</div>
          <div>
            <a href="mailto:info@aaronn.com" className="text-white underline">
              info@aaronn.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
