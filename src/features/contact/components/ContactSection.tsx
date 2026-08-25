'use client'

import React, { useState } from 'react'
import { siteConfig } from '@/config/site'
import { Tag } from '@/components/ui/Tag'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <Section id="contact" darker className="relative">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <RevealOnScroll>
              <Tag variant="v2">Get In Touch</Tag>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="heading-display text-neutral-900">
                LET'S SPARK <br />
                <span className="text-[#EB4604]">SOMETHING GREAT.</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="text-xl text-neutral-600 font-light leading-relaxed max-w-lg">
                Have an ambitious idea? Let's transform it into a meaningful digital experience built for performance and growth.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3} className="space-y-6 pt-6 border-t border-[#e2e2e7]">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                  Phone / WhatsApp
                </span>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="heading-03 text-neutral-900 hover:text-[#EB4604] transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                  Email
                </span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="heading-03 text-neutral-900 hover:text-[#EB4604] transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                  Location
                </span>
                <p className="heading-04 text-neutral-900">Dakar, Senegal</p>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column - Contact Form */}
          <RevealOnScroll delay={0.2}>
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#e2e2e7] shadow-sm">
              {submitted ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#EB4604]/10 text-[#EB4604] flex items-center justify-center text-3xl mx-auto mb-4">
                    ✓
                  </div>
                  <h3 className="heading-02 text-neutral-900">Spark Received!</h3>
                  <p className="text-neutral-600 text-base max-w-md mx-auto">
                    Thank you for reaching out. Our team will review your message and get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline" size="sm" className="mt-6 border-neutral-300 text-neutral-900 hover:bg-neutral-100">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#f9f9fb] border border-[#e2e2e7] text-neutral-900 focus:outline-none focus:border-[#EB4604] transition-colors text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@organization.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#f9f9fb] border border-[#e2e2e7] text-neutral-900 focus:outline-none focus:border-[#EB4604] transition-colors text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium">
                      Service Interested In
                    </label>
                    <select className="w-full px-4 py-3.5 rounded-xl bg-[#f9f9fb] border border-[#e2e2e7] text-neutral-900 focus:outline-none focus:border-[#EB4604] transition-colors text-sm">
                      <option>Digital Solutions & Web Apps</option>
                      <option>Brand & Communication</option>
                      <option>UI/UX & Product Design</option>
                      <option>Audiovisual & Voice</option>
                      <option>Training & Capacity Building</option>
                      <option>SPARKlearn Initiatives</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your project vision, goals, and timeline..."
                      className="w-full px-4 py-3.5 rounded-xl bg-[#f9f9fb] border border-[#e2e2e7] text-neutral-900 focus:outline-none focus:border-[#EB4604] transition-colors text-sm resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-[#EB4604] hover:bg-[#D43D00]" disabled={loading}>
                    {loading ? 'Sending Spark...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </Section>
  )
}
