"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Breadcrumb, Section, SectionLabel, SectionTitle } from "../components/ui";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Terms of Use" },
          ]}
        />

        <Section>
          <SectionLabel>Legal</SectionLabel>
          <SectionTitle className="mb-4">
            Terms of <span className="text-text-main">Use</span>
          </SectionTitle>
          <p className="text-sm text-text-secondary mb-12">Last updated: January 2025</p>

          <div className="max-w-4xl space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-text-secondary leading-relaxed">
                By accessing and using the Samurai Systems website, you accept and agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use our website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">2. Use of Website</h2>
              <p className="text-text-secondary leading-relaxed">
                You may use this website for lawful purposes only. You agree not to use the website in any way that is unlawful, harmful, or that could damage, disable, or impair the site or interfere with other users' enjoyment of it.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">3. Intellectual Property</h2>
              <p className="text-text-secondary leading-relaxed">
                All content on this website, including text, graphics, logos, and images, is the property of Samurai Systems and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">4. Disclaimer</h2>
              <p className="text-text-secondary leading-relaxed">
                This website is provided on an "as is" basis. Samurai Systems makes no representations or warranties of any kind regarding the accuracy, completeness, or suitability of the information on this site.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">5. Governing Law</h2>
              <p className="text-text-secondary leading-relaxed">
                These Terms of Use are governed by the laws of Saudi Arabia. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts of Riyadh, Saudi Arabia.
              </p>
            </div>
          </div>
        </Section>
      </div>
      <Footer />
    </>
  );
}
