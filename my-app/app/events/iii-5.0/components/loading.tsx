'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let completeTimer: ReturnType<typeof setTimeout> | undefined;

    const showTimer = setTimeout(() => {
      setFadeOut(true);
      completeTimer = setTimeout(onComplete, 450);
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      if (completeTimer) clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      style={{ background: '#000000' }}
    >
      <div className="intro-loader relative z-10" role="status" aria-live="polite">
        <div className="loader-logo" aria-hidden="true">
          <Image
            src="/gravity-logo.ico"
            alt="Gravity Logo"
            width={72}
            height={72}
            className="object-contain"
            priority
          />
        </div>
        <p className="loader-text">Loading...</p>
      </div>

      <style jsx>{`
        .intro-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
        }

        .loader-logo {
          width: 72px;
          height: 72px;
          animation: spin-pause 2.4s ease-in-out infinite;
          filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.35));
        }

        .loader-text {
          color: #ffffff;
          font-size: 1rem;
          font-weight: 500;
          margin: 0;
        }

        @keyframes spin-pause {
          0% { transform: rotate(0deg); }
          60% { transform: rotate(360deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
