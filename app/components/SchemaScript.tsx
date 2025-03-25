'use client';

import { useEffect, useRef } from 'react';
import { 
  generatePersonSchema, 
  generateWebsiteSchema, 
  generateOrganizationSchema,
  generateProjectsSchema,
  generateWorkExperienceSchema,
  generateResumeSchema
} from './structuredData';

export default function SchemaScript() {
  const isInjected = useRef(false);

  useEffect(() => {
    if (isInjected.current) return;
    
    const scripts = [
      generatePersonSchema(),
      generateWebsiteSchema(),
      generateOrganizationSchema(),
      generateProjectsSchema(),
      generateWorkExperienceSchema(),
      generateResumeSchema()
    ];

    scripts.forEach((scriptData) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(scriptData);
      document.head.appendChild(script);
    });

    isInjected.current = true;
  }, []);

  return null;
} 