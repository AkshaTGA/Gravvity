'use client';

import { useEffect, useRef, useState } from 'react';
import { CircleCheck as CheckCircle2, Circle as XCircle } from 'lucide-react';
import CardWebOverlay from './card-web-overlay';

const dos = [
  'Teams of 1 to 4 members',
  'All college students eligible',
  'Both online and offline participation',
  'Open source tools and frameworks allowed',
  'Mentor sessions available throughout',
  'Projects must be built during the event',
];

const donts = [
  'No pre-built projects or templates',
  'No plagiarism or reusing past work',
  'No more than 4 members per team',
  'Code must be original — no copied repos',
];

const faqs = [
  { q: 'Who can participate?', a: 'Any college student from any institution. Open to all branches and years.' },
  { q: 'Can I participate solo?', a: 'Yes! Teams can range from 1 to 4 members.' },
  { q: 'Is it online or offline?', a: 'Hybrid — offline at IIITA campus or online. Your choice.' },
  { q: 'What should I bring?', a: 'Your laptop, charger, and ideas. Food and refreshments will be provided.' },
  { q: 'How will judging work?', a: 'Teams will demo their projects to a panel of expert judges at the end.' },
];

export default function DetailsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="details" ref={ref} className="relative z-10 py-24 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        <div
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-10">
            <span className="text-[#A68CFF] text-xs tracking-[0.3em] uppercase font-medium">Rules & Guidelines</span>
            <h2 className="mt-3 text-4xl font-bold text-white">What You Need to Know</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="card-glow group p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.01]"
            >
              <CardWebOverlay />
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-7 bg-purple-500/60" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[#8AE8FF]">Guidelines</span>
              </div>
              <h3 className="text-2xl font-bold mb-5">What You Can Do</h3>
              <ul className="space-y-3">
                {dos.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#A68CFF] mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/70 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="card-glow group p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.01]"
            >
              <CardWebOverlay />
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-7 bg-purple-500/60" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[#8AE8FF]">Not Allowed</span>
              </div>
              <h3 className="text-2xl font-bold mb-5">What To Avoid</h3>
              <ul className="space-y-3">
                {donts.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-[#A68CFF] mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/70 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white">
              Frequently Asked{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #A68CFF, #8AE8FF)' }}
              >
                Questions
              </span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="card-glow group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01] relative"
              >
                <CardWebOverlay />
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-px w-6 bg-purple-500/60" />
                    <span className="text-white text-sm font-medium">{faq.q}</span>
                  </div>
                  <span
                    className="text-[#A68CFF] text-lg transition-transform duration-200 flex-shrink-0"
                    style={{ transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)' }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
