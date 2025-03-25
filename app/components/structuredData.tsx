export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rakib Ahmed",
    "url": "https://rakibahmed.com",
    "image": "https://rakibahmed.com/images/profile.jpg",
    "sameAs": [
      "https://github.com/IamRakibAhmed",
      "https://linkedin.com/in/iamrakibahmed",
      "mailto:rakibofficial@gmail.com"
    ],
    "jobTitle": "Senior Software Development Officer",
    "worksFor": {
      "@type": "Organization",
      "name": "The City Bank PLC"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dhaka",
      "addressRegion": "Dhaka",
      "postalCode": "1216",
      "addressCountry": "Bangladesh"
    },
    "email": "rakibofficial@gmail.com",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University of Liberal Arts Bangladesh",
      "sameAs": "https://ulab.edu.bd/"
    },
    "knowsAbout": [
      "Java", "Spring Boot", "Microservices", "React", 
      "Docker", "Kubernetes", "REST API", "MySQL", 
      "MongoDB", "Machine Learning", "NLP", "Python",
      "TypeScript", "JavaScript", "C#", "C++", "Git",
      "Kafka", "ELK Stack", "CI/CD", "Jenkins",
      "Banking Software", "Payment Systems", "Digital Banking"
    ],
    "knowsLanguage": [
      {
        "@type": "Language",
        "name": "English"
      },
      {
        "@type": "Language",
        "name": "Bengali"
      }
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Bachelor of Science in Computer Science and Engineering",
        "credentialCategory": "degree",
        "recognizedBy": {
          "@type": "Organization",
          "name": "University of Liberal Arts Bangladesh"
        },
        "dateCreated": "2022-10"
      }
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "IEEE"
      }
    ]
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Rakib Ahmed | Portfolio",
    "url": "https://rakibahmed.com",
    "description": "Senior Software Engineer specializing in Java, Spring Boot, Microservices, React, and Cloud technologies with experience in banking software and NLP projects.",
    "author": {
      "@type": "Person",
      "name": "Rakib Ahmed"
    }
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Rakib Ahmed",
    "url": "https://rakibahmed.com",
    "logo": "https://rakibahmed.com/images/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "rakibofficial@gmail.com",
      "contactType": "Customer Support"
    },
    "sameAs": [
      "https://github.com/IamRakibAhmed",
      "https://linkedin.com/in/iamrakibahmed"
    ]
  };
}

export function generateResumeSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Document",
    "name": "Rakib Ahmed's Resume",
    "author": {
      "@type": "Person",
      "name": "Rakib Ahmed"
    },
    "about": {
      "@type": "Person",
      "name": "Rakib Ahmed"
    },
    "datePublished": "2024-03-25",
    "url": "https://rakibahmed.com/resume.pdf",
    "encodingFormat": "application/pdf",
    "description": "Resume of Rakib Ahmed, a Senior Software Engineer specializing in Java, Spring Boot, Microservices, and React."
  };
}

export function generateProjectsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "SoftwareSourceCode",
        "position": 1,
        "name": "Bengali Parts-of-Speech Tagger",
        "description": "Created and deployed a Parts-of-Speech tagger that can predict the Parts-of-Speech of a given word or sequence with 98.39% accuracy.",
        "programmingLanguage": ["Python", "JavaScript"],
        "codeRepository": "https://github.com/IamRakibAhmed/bengali-pos-tagger",
        "author": {
          "@type": "Person",
          "name": "Rakib Ahmed"
        }
      },
      {
        "@type": "SoftwareSourceCode",
        "position": 2,
        "name": "Bengali Next Word Prediction",
        "description": "Created and deployed a system that can predict the next word of a given word or sequence and complete the whole sentence with 84.13% accuracy.",
        "programmingLanguage": ["Python", "JavaScript"],
        "codeRepository": "https://github.com/IamRakibAhmed/bengali-word-prediction",
        "author": {
          "@type": "Person",
          "name": "Rakib Ahmed"
        }
      },
      {
        "@type": "SoftwareSourceCode",
        "position": 3,
        "name": "Profile Management System",
        "description": "A system that manages user profiles and their information.",
        "programmingLanguage": ["React JS", "Spring Boot", "MySQL"],
        "author": {
          "@type": "Person",
          "name": "Rakib Ahmed"
        }
      }
    ]
  };
}

export function generateWorkExperienceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "WorkExperience",
        "position": 1,
        "name": "The City Bank PLC",
        "description": "Senior Software Development Officer",
        "startDate": "2022-03",
        "endDate": "", // Current job
        "employmentType": "Full-time",
        "location": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Dhaka",
            "addressCountry": "Bangladesh"
          }
        }
      },
      {
        "@type": "WorkExperience",
        "position": 2,
        "name": "Apurba Technologies Ltd.",
        "description": "Software Engineer",
        "startDate": "2020-11",
        "endDate": "2022-02",
        "employmentType": "Full-time",
        "location": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Dhaka",
            "addressCountry": "Bangladesh"
          }
        }
      }
    ]
  };
} 