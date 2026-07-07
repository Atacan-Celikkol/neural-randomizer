/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo(props: LogoProps) {
  const { className = '', size = 40 } = props;

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Glow Backing */}
      <div className="absolute inset-0 bg-peloka-primary/20 rounded-full blur-md animate-pulse" />
      
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full text-peloka-primary"
      >
        {/* Connection Lines (Constellation style) */}
        {/* Cat Ears */}
        <line x1="20" y1="25" x2="35" y2="40" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="35" y1="40" x2="50" y2="35" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="50" y1="35" x2="65" y2="40" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="65" y1="40" x2="80" y2="25" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
        
        {/* Cat Head Outline & Face */}
        <line x1="20" y1="25" x2="15" y2="55" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="80" y1="25" x2="85" y2="55" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="15" y1="55" x2="35" y2="75" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="85" y1="55" x2="65" y2="75" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="35" y1="75" x2="50" y2="85" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="65" y1="75" x2="50" y2="85" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
        
        {/* Inner Facial connections */}
        <line x1="35" y1="40" x2="50" y2="55" stroke="#adc7f7" strokeWidth="1" strokeOpacity="0.8" />
        <line x1="65" y1="40" x2="50" y2="55" stroke="#adc7f7" strokeWidth="1" strokeOpacity="0.8" />
        <line x1="15" y1="55" x2="50" y2="55" stroke="#adc7f7" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="85" y1="55" x2="50" y2="55" stroke="#adc7f7" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="35" y1="75" x2="50" y2="55" stroke="#adc7f7" strokeWidth="1.2" strokeOpacity="0.6" />
        <line x1="65" y1="75" x2="50" y2="55" stroke="#adc7f7" strokeWidth="1.2" strokeOpacity="0.6" />

        {/* Constellation Star Nodes (Glow circles) */}
        {/* Ear Tips */}
        <circle cx="20" cy="25" r="4.5" fill="#ffb77d" className="animate-pulse" />
        <circle cx="80" cy="25" r="4.5" fill="#ffb77d" className="animate-pulse" />
        
        {/* Head Side Joints */}
        <circle cx="15" cy="55" r="3.5" fill="#ff8c00" />
        <circle cx="85" cy="55" r="3.5" fill="#ff8c00" />
        
        {/* Lower Chin Joints */}
        <circle cx="35" cy="75" r="3.5" fill="#ffb77d" />
        <circle cx="65" cy="75" r="3.5" fill="#ffb77d" />
        <circle cx="50" cy="85" r="4.5" fill="#ff8c00" />
        
        {/* Inner Core Eye/Nose Nodes (Teal & Blue Biotech Nodes) */}
        <circle cx="35" cy="40" r="4" fill="#adc7f7" />
        <circle cx="65" cy="40" r="4" fill="#adc7f7" />
        <circle cx="50" cy="35" r="3" fill="#ea9748" />
        <circle cx="50" cy="55" r="5" fill="#14b8a6" className="animate-ping" style={{ animationDuration: '3s' }} />
        <circle cx="50" cy="55" r="4" fill="#14b8a6" />
      </svg>
    </div>
  );
}
