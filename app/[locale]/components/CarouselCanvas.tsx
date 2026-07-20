'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTranslations, useLocale } from 'next-intl';
import Carousel from './Carousel';
import {
  Shield,
  Cloud,
  Scale,
  Bot,
  RefreshCw,
  Settings,
  Server
} from 'lucide-react';

const PILLAR_TAGS: Record<string, string[]> = {
  cyber: ["SIEM/SOAR", "EDR/XDR", "NCA ECC", "MITRE ATT&CK", "Zero Trust", "VA/PT"],
  cloud: ["Azure", "AWS", "Oracle OCI", "ITSM", "Hybrid IT"],
  grc: ["OT/ICS", "SCADA", "NCA OTCC", "Penetration Testing", "IEC 62443"],
  bcm: ["SOCaaS", "MDR", "24/7 Monitoring", "Incident Response", "VAPT"],
  ai: ["LangChain", "AutoGPT", "NLP", "Computer Vision"],
  dt: ["SOC Advisory", "Process Development", "IT Strategy", "Technical Assessments"],
  infrastructure: ["Cyber Awareness", "ISO 27001 Training", "LMS Solutions", "Human Risk"],
};

export default function CarouselCanvas() {
  const tServices = useTranslations('services');
  const tHome = useTranslations('home');
  const locale = useLocale();

  const services = [
    { key: 'cyber', icon: Shield, href: '/services/cybersecurity' },
    { key: 'cloud', icon: Cloud, href: '/services/cloud' },
    { key: 'grc', icon: Scale, href: '/services/grc' },
    { key: 'dt', icon: Settings, href: '/services/digital-transformation' },
    { key: 'ai', icon: Bot, href: '/services/ai' },
    { key: 'bcm', icon: RefreshCw, href: '/services/business-continuity' },
    { key: 'infrastructure', icon: Server, href: '/services/cloud-infrastructure' },
  ];

  const translatedServices = services.map((s) => ({
    ...s,
    title: tServices(`${s.key}.breadcrumb`),
    description: tServices(`${s.key}.description`),
    tags: PILLAR_TAGS[s.key] || [],
    linkText: locale === 'ar' ? 'استكشف ←' : 'Explore →',
  }));

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <Suspense fallback={null}>
          <Carousel services={translatedServices} locale={locale} />
        </Suspense>
      </Canvas>
    </div>
  );
}
