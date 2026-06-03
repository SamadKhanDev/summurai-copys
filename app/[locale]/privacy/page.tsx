"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Breadcrumb, Section, SectionLabel, SectionTitle } from "../components/ui";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Privacy Policy" },
          ]}
        />

        <Section>
          <SectionLabel>Legal</SectionLabel>
          <SectionTitle className="mb-4">
            Privacy <span className="text-text-main">Policy</span>
          </SectionTitle>
          <p className="text-sm text-text-secondary mb-12">Last updated: January 2025</p>

          <div className="max-w-4xl space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">1. Data We Collect</h2>
              <p className="text-text-secondary leading-relaxed">
                We collect information you provide directly to us, such as when you contact us, request an assessment, or submit a form on our website. This includes your name, organization, corporate email address, phone number, and the content of your inquiry.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">2. How We Use Your Data</h2>
              <p className="text-text-secondary leading-relaxed">
                We use the information we collect to respond to your inquiries, provide the services you request, send relevant communications, improve our website and services, and comply with our legal obligations under PDPL and other applicable regulations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">3. Cookie Policy</h2>
              <p className="text-text-secondary leading-relaxed">
                Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user behavior. You can control cookie settings through your browser preferences.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">4. Data Retention</h2>
              <p className="text-text-secondary leading-relaxed">
                We retain personal data for as long as necessary to provide our services and comply with our legal obligations. You may request deletion of your data at any time by contacting us at connect@samurai.systems.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">5. Your Rights under PDPL</h2>
              <p className="text-text-secondary leading-relaxed">
                Under Saudi Arabia's Personal Data Protection Law (PDPL), you have the right to access, correct, and request deletion of your personal data. To exercise these rights, contact our Data Protection Officer at connect@samurai.systems.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">6. Contact for Data Requests</h2>
              <p className="text-text-secondary leading-relaxed">
                For any data protection inquiries or to exercise your rights, please contact us at: connect@samurai.systems | Office 804, Abdar Commercial Complex, Riyadh, Saudi Arabia.
              </p>
            </div>
          </div>
        </Section>
      </div>
      <Footer />
    </>
  );
}
