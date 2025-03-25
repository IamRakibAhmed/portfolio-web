'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Comprehensive list of all countries
const countries = [
  { code: '', name: 'Select Country' },
  { code: 'AF', name: 'Afghanistan' },
  { code: 'AX', name: 'Åland Islands' },
  { code: 'AL', name: 'Albania' },
  { code: 'DZ', name: 'Algeria' },
  { code: 'AS', name: 'American Samoa' },
  { code: 'AD', name: 'Andorra' },
  { code: 'AO', name: 'Angola' },
  { code: 'AI', name: 'Anguilla' },
  { code: 'AQ', name: 'Antarctica' },
  { code: 'AG', name: 'Antigua and Barbuda' },
  { code: 'AR', name: 'Argentina' },
  { code: 'AM', name: 'Armenia' },
  { code: 'AW', name: 'Aruba' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'AZ', name: 'Azerbaijan' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'BB', name: 'Barbados' },
  { code: 'BY', name: 'Belarus' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BZ', name: 'Belize' },
  { code: 'BJ', name: 'Benin' },
  { code: 'BM', name: 'Bermuda' },
  { code: 'BT', name: 'Bhutan' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BA', name: 'Bosnia and Herzegovina' },
  { code: 'BW', name: 'Botswana' },
  { code: 'BV', name: 'Bouvet Island' },
  { code: 'BR', name: 'Brazil' },
  { code: 'IO', name: 'British Indian Ocean Territory' },
  { code: 'BN', name: 'Brunei Darussalam' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'BI', name: 'Burundi' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'CM', name: 'Cameroon' },
  { code: 'CA', name: 'Canada' },
  { code: 'CV', name: 'Cape Verde' },
  { code: 'KY', name: 'Cayman Islands' },
  { code: 'CF', name: 'Central African Republic' },
  { code: 'TD', name: 'Chad' },
  { code: 'CL', name: 'Chile' },
  { code: 'CN', name: 'China' },
  { code: 'CX', name: 'Christmas Island' },
  { code: 'CC', name: 'Cocos (Keeling) Islands' },
  { code: 'CO', name: 'Colombia' },
  { code: 'KM', name: 'Comoros' },
  { code: 'CG', name: 'Congo' },
  { code: 'CD', name: 'Congo, The Democratic Republic of the' },
  { code: 'CK', name: 'Cook Islands' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'CI', name: 'Côte d\'Ivoire' },
  { code: 'HR', name: 'Croatia' },
  { code: 'CU', name: 'Cuba' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DK', name: 'Denmark' },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'DM', name: 'Dominica' },
  { code: 'DO', name: 'Dominican Republic' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'EG', name: 'Egypt' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GQ', name: 'Equatorial Guinea' },
  { code: 'ER', name: 'Eritrea' },
  { code: 'EE', name: 'Estonia' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'FK', name: 'Falkland Islands (Malvinas)' },
  { code: 'FO', name: 'Faroe Islands' },
  { code: 'FJ', name: 'Fiji' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'GF', name: 'French Guiana' },
  { code: 'PF', name: 'French Polynesia' },
  { code: 'TF', name: 'French Southern Territories' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GM', name: 'Gambia' },
  { code: 'GE', name: 'Georgia' },
  { code: 'DE', name: 'Germany' },
  { code: 'GH', name: 'Ghana' },
  { code: 'GI', name: 'Gibraltar' },
  { code: 'GR', name: 'Greece' },
  { code: 'GL', name: 'Greenland' },
  { code: 'GD', name: 'Grenada' },
  { code: 'GP', name: 'Guadeloupe' },
  { code: 'GU', name: 'Guam' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'GG', name: 'Guernsey' },
  { code: 'GN', name: 'Guinea' },
  { code: 'GW', name: 'Guinea-Bissau' },
  { code: 'GY', name: 'Guyana' },
  { code: 'HT', name: 'Haiti' },
  { code: 'HM', name: 'Heard Island and Mcdonald Islands' },
  { code: 'VA', name: 'Holy See (Vatican City State)' },
  { code: 'HN', name: 'Honduras' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IS', name: 'Iceland' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IR', name: 'Iran, Islamic Republic Of' },
  { code: 'IQ', name: 'Iraq' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IM', name: 'Isle of Man' },
  { code: 'IL', name: 'Israel' },
  { code: 'IT', name: 'Italy' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'JP', name: 'Japan' },
  { code: 'JE', name: 'Jersey' },
  { code: 'JO', name: 'Jordan' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'KE', name: 'Kenya' },
  { code: 'KI', name: 'Kiribati' },
  { code: 'KP', name: 'Korea, Democratic People\'s Republic of' },
  { code: 'KR', name: 'Korea, Republic of' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'KG', name: 'Kyrgyzstan' },
  { code: 'LA', name: 'Lao People\'s Democratic Republic' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'LS', name: 'Lesotho' },
  { code: 'LR', name: 'Liberia' },
  { code: 'LY', name: 'Libyan Arab Jamahiriya' },
  { code: 'LI', name: 'Liechtenstein' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MO', name: 'Macao' },
  { code: 'MK', name: 'Macedonia, The Former Yugoslav Republic of' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'MW', name: 'Malawi' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'MV', name: 'Maldives' },
  { code: 'ML', name: 'Mali' },
  { code: 'MT', name: 'Malta' },
  { code: 'MH', name: 'Marshall Islands' },
  { code: 'MQ', name: 'Martinique' },
  { code: 'MR', name: 'Mauritania' },
  { code: 'MU', name: 'Mauritius' },
  { code: 'YT', name: 'Mayotte' },
  { code: 'MX', name: 'Mexico' },
  { code: 'FM', name: 'Micronesia, Federated States of' },
  { code: 'MD', name: 'Moldova, Republic of' },
  { code: 'MC', name: 'Monaco' },
  { code: 'MN', name: 'Mongolia' },
  { code: 'ME', name: 'Montenegro' },
  { code: 'MS', name: 'Montserrat' },
  { code: 'MA', name: 'Morocco' },
  { code: 'MZ', name: 'Mozambique' },
  { code: 'MM', name: 'Myanmar' },
  { code: 'NA', name: 'Namibia' },
  { code: 'NR', name: 'Nauru' },
  { code: 'NP', name: 'Nepal' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'AN', name: 'Netherlands Antilles' },
  { code: 'NC', name: 'New Caledonia' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'NE', name: 'Niger' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'NU', name: 'Niue' },
  { code: 'NF', name: 'Norfolk Island' },
  { code: 'MP', name: 'Northern Mariana Islands' },
  { code: 'NO', name: 'Norway' },
  { code: 'OM', name: 'Oman' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PW', name: 'Palau' },
  { code: 'PS', name: 'Palestinian Territory, Occupied' },
  { code: 'PA', name: 'Panama' },
  { code: 'PG', name: 'Papua New Guinea' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Peru' },
  { code: 'PH', name: 'Philippines' },
  { code: 'PN', name: 'Pitcairn' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'QA', name: 'Qatar' },
  { code: 'RE', name: 'Reunion' },
  { code: 'RO', name: 'Romania' },
  { code: 'RU', name: 'Russian Federation' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'SH', name: 'Saint Helena' },
  { code: 'KN', name: 'Saint Kitts and Nevis' },
  { code: 'LC', name: 'Saint Lucia' },
  { code: 'PM', name: 'Saint Pierre and Miquelon' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines' },
  { code: 'WS', name: 'Samoa' },
  { code: 'SM', name: 'San Marino' },
  { code: 'ST', name: 'Sao Tome and Principe' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SN', name: 'Senegal' },
  { code: 'RS', name: 'Serbia' },
  { code: 'SC', name: 'Seychelles' },
  { code: 'SL', name: 'Sierra Leone' },
  { code: 'SG', name: 'Singapore' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'SB', name: 'Solomon Islands' },
  { code: 'SO', name: 'Somalia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'GS', name: 'South Georgia and the South Sandwich Islands' },
  { code: 'ES', name: 'Spain' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'SD', name: 'Sudan' },
  { code: 'SR', name: 'Suriname' },
  { code: 'SJ', name: 'Svalbard and Jan Mayen' },
  { code: 'SZ', name: 'Swaziland' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'SY', name: 'Syrian Arab Republic' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'TJ', name: 'Tajikistan' },
  { code: 'TZ', name: 'Tanzania, United Republic of' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TL', name: 'Timor-Leste' },
  { code: 'TG', name: 'Togo' },
  { code: 'TK', name: 'Tokelau' },
  { code: 'TO', name: 'Tonga' },
  { code: 'TT', name: 'Trinidad and Tobago' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'TM', name: 'Turkmenistan' },
  { code: 'TC', name: 'Turks and Caicos Islands' },
  { code: 'TV', name: 'Tuvalu' },
  { code: 'UG', name: 'Uganda' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'UM', name: 'United States Minor Outlying Islands' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'VU', name: 'Vanuatu' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'VG', name: 'Virgin Islands, British' },
  { code: 'VI', name: 'Virgin Islands, U.S.' },
  { code: 'WF', name: 'Wallis and Futuna' },
  { code: 'EH', name: 'Western Sahara' },
  { code: 'YE', name: 'Yemen' },
  { code: 'ZM', name: 'Zambia' },
  { code: 'ZW', name: 'Zimbabwe' },
];

// Keep Select Country at the beginning
countries.sort((a, b) => {
  if (a.code === '') return -1;
  if (b.code === '') return 1;
  return a.name.localeCompare(b.name);
});

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    country: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  
  // Refs for dynamic height calculation
  const formContainerRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const connectCardRef = useRef<HTMLDivElement>(null);
  
  // Component mount detection
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Update map height based on form height
  useEffect(() => {
    if (!isMounted) return;
    
    const updateMapHeight = () => {
      if (formContainerRef.current && mapContainerRef.current && connectCardRef.current) {
        // Get exact height measurements
        const formHeight = formContainerRef.current.getBoundingClientRect().height;
        const connectCardHeight = connectCardRef.current.getBoundingClientRect().height;
        const gap = 12; // space-y-3 = 0.75rem = 12px
        
        // Calculate map height: form height - connect card height - gap
        const mapHeight = formHeight - connectCardHeight - gap;
        
        // Set the map height
        mapContainerRef.current.style.height = `${mapHeight}px`;
        
        // Log for debugging
        console.log({
          formHeight,
          connectCardHeight,
          mapHeight,
        });
      }
    };
    
    // Initial update with a slight delay to ensure DOM is ready
    setTimeout(updateMapHeight, 100);
    
    // Run update a few more times to handle any race conditions or layout shifts
    setTimeout(updateMapHeight, 500);
    setTimeout(updateMapHeight, 1000);
    
    // Create a ResizeObserver to monitor size changes of the form
    const resizeObserver = new ResizeObserver(() => {
      updateMapHeight();
    });
    
    // Create a MutationObserver to detect DOM changes
    const mutationObserver = new MutationObserver(() => {
      updateMapHeight();
    });
    
    // Observe the form container
    if (formContainerRef.current) {
      resizeObserver.observe(formContainerRef.current);
      mutationObserver.observe(formContainerRef.current, { 
        attributes: true, 
        childList: true, 
        subtree: true 
      });
    }
    
    // Update on window resize
    window.addEventListener('resize', updateMapHeight);
    
    // Cleanup
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('resize', updateMapHeight);
    };
  }, [submitSuccess, isMounted]); // Re-run when form success state changes or component mounts
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '', phone: '', country: '' });
    }, 1500);
  };
  
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Background elements for modern aesthetic */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-purple-500/5 dark:from-primary/15 dark:to-purple-500/10 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-gradient-to-tr from-accent/10 to-primary/5 dark:from-accent/15 dark:to-primary/10 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-gradient-to-r from-purple-500/10 to-primary/5 dark:from-purple-500/15 dark:to-primary/10 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-primary text-sm font-mono tracking-wider bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 py-1 px-3 rounded-full mb-4"
            >
              CONNECT WITH ME
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mt-4 mb-4 font-title"
            >
              Let's <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Collaborate</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-poppins"
            >
              I'm open to collaborations, job opportunities, and interesting projects. Let's build something amazing together.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2"
            >
              <div className="space-y-3">
                {/* Location Map - Dynamic height */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300 hover:border-primary/20 dark:hover:border-primary/20 group relative overflow-hidden">
                  {/* Map container with dynamic height */}
                  <div ref={mapContainerRef} className="w-full relative" style={{ height: 'calc(70vh - 150px)', maxHeight: '600px', transition: 'height 0.3s ease' }}>
                    {/* Minimalistic map - using iframe for simplicity */}
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.0554295185!2d90.2549592432499!3d23.780863188421717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2s!4v1690918760971!5m2!1sen!2s"
                      className="absolute inset-0 w-full h-full"
                      style={{ border: 0, filter: 'grayscale(1) contrast(1.1) opacity(0.9)' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
                
                {/* Compact Connect Card */}
                <div ref={connectCardRef} className="bg-white dark:bg-gray-900 p-2.5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300 hover:border-primary/20 dark:hover:border-primary/20">
                  <div className="flex justify-center items-center h-8">
                    <div className="flex space-x-2">
                      <a 
                        href="https://github.com/IamRakibAhmed" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-800/80 text-gray-700 dark:text-gray-300 flex items-center justify-center rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 group/icon relative overflow-hidden"
                        aria-label="GitHub"
                      >
                        {/* Subtle gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover/icon:from-primary/5 group-hover/icon:to-accent/10 dark:group-hover/icon:from-primary/10 dark:group-hover/icon:to-accent/15 transition-colors ease-out duration-200 -z-10"></div>
                        
                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 rounded-full bg-primary/5 dark:bg-primary/10 blur-lg transform scale-150"></div>
                        </div>
                        
                        {/* Icon with subtle scale and color transition */}
                        <motion.div
                          whileHover={{ scale: 1.08 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 15 
                          }}
                          className="relative z-10 text-gray-700 dark:text-gray-300 group-hover/icon:text-primary dark:group-hover/icon:text-primary transition-colors duration-200"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </motion.div>
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/iamrakibahmed" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-800/80 text-gray-700 dark:text-gray-300 flex items-center justify-center rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 group/icon relative overflow-hidden"
                        aria-label="LinkedIn"
                      >
                        {/* Subtle gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover/icon:from-primary/5 group-hover/icon:to-accent/10 dark:group-hover/icon:from-primary/10 dark:group-hover/icon:to-accent/15 transition-colors ease-out duration-200 -z-10"></div>
                        
                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 rounded-full bg-primary/5 dark:bg-primary/10 blur-lg transform scale-150"></div>
                        </div>
                        
                        {/* Icon with subtle scale and color transition */}
                        <motion.div
                          whileHover={{ scale: 1.08 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 15 
                          }}
                          className="relative z-10 text-gray-700 dark:text-gray-300 group-hover/icon:text-primary dark:group-hover/icon:text-primary transition-colors duration-200"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </motion.div>
                      </a>
                      <a 
                        href="mailto:rakibofficial@gmail.com" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-800/80 text-gray-700 dark:text-gray-300 flex items-center justify-center rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 group/icon relative overflow-hidden"
                        aria-label="Email"
                      >
                        {/* Subtle gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover/icon:from-primary/5 group-hover/icon:to-accent/10 dark:group-hover/icon:from-primary/10 dark:group-hover/icon:to-accent/15 transition-colors ease-out duration-200 -z-10"></div>
                        
                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 rounded-full bg-primary/5 dark:bg-primary/10 blur-lg transform scale-150"></div>
                        </div>
                        
                        {/* Icon with subtle scale and color transition */}
                        <motion.div
                          whileHover={{ scale: 1.08 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 15 
                          }}
                          className="relative z-10 text-gray-700 dark:text-gray-300 group-hover/icon:text-primary dark:group-hover/icon:text-primary transition-colors duration-200"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </motion.div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-3"
            >
              <div ref={formContainerRef} className="bg-gradient-to-br from-white to-white/90 dark:from-gray-900 dark:to-gray-900/80 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-900/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2 font-title">Message Sent!</h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6 font-poppins">Thank you for reaching out. I'll get back to you soon.</p>
                    <button 
                      onClick={() => setSubmitSuccess(false)}
                      className="text-sm bg-gradient-to-r from-primary/20 to-accent/20 text-primary px-5 py-2 rounded-lg font-medium hover:from-primary/30 hover:to-accent/30 transition-all duration-300 font-poppins"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="relative">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent transition-colors font-poppins text-sm peer pt-6 placeholder-transparent"
                          placeholder="Name"
                          onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Please enter your full name for proper identification and communication purposes.')}
                          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                        />
                        <label htmlFor="name" className="absolute text-xs font-medium text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-2 scale-75 top-3 left-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 peer-focus:text-primary font-poppins">
                          Full Name*
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent transition-colors font-poppins text-sm peer pt-6 placeholder-transparent"
                          placeholder="Email"
                          onInvalid={(e) => {
                            const input = e.target as HTMLInputElement;
                            if (input.validity.valueMissing) {
                              input.setCustomValidity('Please provide a valid email address for correspondence regarding your inquiry.');
                            } else if (input.validity.typeMismatch) {
                              input.setCustomValidity('Please enter a properly formatted email address (e.g., name@example.com).');
                            }
                          }}
                          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                        />
                        <label htmlFor="email" className="absolute text-xs font-medium text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-2 scale-75 top-3 left-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 peer-focus:text-primary font-poppins">
                          Email Address*
                        </label>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="relative">
                        <div className="relative group">
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={(e) => {
                              handleChange(e);
                              (e.target as HTMLSelectElement).setCustomValidity('');
                            }}
                            required
                            className="w-full px-4 py-3.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent transition-colors font-poppins text-sm appearance-none pt-6"
                            onInvalid={(e) => (e.target as HTMLSelectElement).setCustomValidity('Please select your country of residence from the dropdown menu.')}
                            onInput={(e) => (e.target as HTMLSelectElement).setCustomValidity('')}
                          >
                            {countries.map(country => (
                              <option key={country.code} value={country.code}>{country.name}</option>
                            ))}
                          </select>
                          <label 
                            htmlFor="country" 
                            className="absolute text-xs font-medium text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-2 scale-75 top-3 left-4 z-10 origin-[0] peer-focus:text-primary font-poppins"
                          >
                            Country*
                          </label>
                          
                          {/* Custom dropdown arrow */}
                          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-primary/70 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent transition-colors font-poppins text-sm peer pt-6 placeholder-transparent"
                          placeholder="Phone"
                        />
                        <label htmlFor="phone" className="absolute text-xs font-medium text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-2 scale-75 top-3 left-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 peer-focus:text-primary font-poppins">
                          Phone Number
                        </label>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <textarea
                        id="subject"
                        name="subject"
                        rows={1}
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent transition-colors resize-none font-poppins text-sm peer pt-7 placeholder-transparent"
                        placeholder="Subject"
                        onInvalid={(e) => (e.target as HTMLTextAreaElement).setCustomValidity('Please provide a clear subject line to categorize your inquiry appropriately.')}
                        onInput={(e) => (e.target as HTMLTextAreaElement).setCustomValidity('')}
                      />
                      <label htmlFor="subject" className="absolute text-xs font-medium text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-2 scale-75 top-3 left-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 peer-focus:text-primary font-poppins">
                        Subject*
                      </label>
                    </div>
                    
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent transition-colors resize-none font-poppins text-sm peer pt-7 placeholder-transparent"
                        placeholder="Message"
                        onInvalid={(e) => (e.target as HTMLTextAreaElement).setCustomValidity('Please provide details regarding your inquiry to enable a comprehensive response.')}
                        onInput={(e) => (e.target as HTMLTextAreaElement).setCustomValidity('')}
                      />
                      <label htmlFor="message" className="absolute text-xs font-medium text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-2 scale-75 top-3 left-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 peer-focus:text-primary font-poppins">
                        Your Message*
                      </label>
                    </div>
                    
                    <div className="flex items-center mb-1 relative">
                      <input
                        id="privacy-policy"
                        type="checkbox"
                        required
                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary/30 dark:bg-gray-700 dark:border-gray-600"
                        title="Please agree to the privacy policy to submit the form"
                        data-error="You must agree to the privacy policy before submitting"
                        onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Please acknowledge the privacy policy to proceed. Your information will be handled securely as outlined in the document.')}
                        onChange={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                      />
                      <label htmlFor="privacy-policy" className="ml-2 text-xs text-gray-600 dark:text-gray-400 font-poppins">
                        I agree that my data will be stored and processed to respond to my request. 
                        <button 
                          type="button"
                          onClick={() => setIsPrivacyPolicyOpen(true)}
                          className="text-primary hover:underline focus:outline-none ml-1"
                        >
                          Privacy Policy*
                        </button>
                      </label>
                    </div>
                    
                    <div className="pt-2">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full px-6 py-3.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-medium transition-all font-poppins flex items-center justify-center ${
                          isSubmitting ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-primary/20'
                        }`}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyPolicyOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-auto"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-900 z-10">
                <h3 className="text-lg font-bold font-title">Privacy Policy</h3>
                <button 
                  onClick={() => setIsPrivacyPolicyOpen(false)} 
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-4 font-poppins text-sm text-gray-600 dark:text-gray-400">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Introduction</h4>
                <p>
                  Welcome to my portfolio website. I value your privacy and am committed to protecting any personal information you share with me. This Privacy Policy explains how I collect, use, and safeguard your information when you visit my website or use the contact form.
                </p>
                
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Information I Collect</h4>
                <p>
                  When you use the contact form on my portfolio website, I collect the following information:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Your name</li>
                  <li>Email address</li>
                  <li>Country</li>
                  <li>Phone number (if provided)</li>
                  <li>Subject and message content</li>
                </ul>
                <p>
                  Additionally, my website may collect standard technical information such as browser type, device information, and cookies to improve your experience. This data is collected anonymously and is not used to personally identify you.
                </p>
                
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">How I Use Your Information</h4>
                <p>
                  I use the information you provide through the contact form solely for the following purposes:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>To respond to your inquiries or messages</li>
                  <li>To discuss potential collaboration opportunities or projects</li>
                  <li>To communicate with you if you've shown interest in my services</li>
                  <li>To improve my website's functionality and user experience</li>
                </ul>
                <p>
                  I do not use your information for marketing purposes, nor do I share, sell, or rent your personal information to third parties.
                </p>
                
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Data Storage and Security</h4>
                <p>
                  I take reasonable precautions to protect your personal information. Your contact form submissions are stored securely and are only accessible by me. As this is a personal portfolio website, I do not employ complex data processing systems.
                </p>
                <p>
                  Please note that while I implement security measures to protect your information, no method of transmission over the internet or electronic storage is 100% secure. I cannot guarantee absolute security of your data.
                </p>
                
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Data Retention</h4>
                <p>
                  I retain your contact information only as long as necessary to respond to your inquiry or to maintain our professional relationship. If we have no ongoing professional relationship, I will delete your contact information after a reasonable period.
                </p>
                
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Your Rights</h4>
                <p>
                  You have several rights regarding your personal data:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The right to access your personal data</li>
                  <li>The right to rectify inaccurate information</li>
                  <li>The right to request deletion of your data</li>
                  <li>The right to object to processing of your data</li>
                  <li>The right to data portability</li>
                </ul>
                <p>
                  If you wish to exercise any of these rights, please contact me using the information provided below.
                </p>
                
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Cookies</h4>
                <p>
                  This website may use cookies to enhance your browsing experience. Cookies are small text files stored on your device that help analyze web traffic and customize website content to your preferences. You can control cookies through your browser settings.
                </p>
                
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Third-Party Links</h4>
                <p>
                  My portfolio may contain links to external websites, such as GitHub, LinkedIn, or project demos. This Privacy Policy applies only to my portfolio website. I cannot be responsible for the privacy practices or content of external sites.
                </p>
                
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Children's Privacy</h4>
                <p>
                  My portfolio website is not directed at children under 16. I do not knowingly collect personal information from children. If you believe a child has provided me with personal information, please contact me so I can delete it.
                </p>
                
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Contact Information</h4>
                <p>
                  If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact me at rakibofficial@gmail.com.
                </p>
                
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Policy Updates</h4>
                <p>
                  I may update this Privacy Policy from time to time to reflect changes in legal requirements or my practices. I encourage you to review this policy periodically.
                </p>
                
                <p className="text-xs text-gray-500 dark:text-gray-500 pt-2">Last updated: June 1, 2023</p>
              </div>
              <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                <button 
                  onClick={() => setIsPrivacyPolicyOpen(false)}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg text-sm font-medium hover:shadow-md hover:shadow-primary/20 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 