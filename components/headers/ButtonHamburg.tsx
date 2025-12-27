"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ButtonHamburger() {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  // 1. Close menu automatically when the user navigates to a new page
  useEffect(() => {
    setIsActive(false);
  }, [pathname]);

  // 2. Handle Body Scroll Lock
  useEffect(() => {
    if (isActive) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    // Cleanup function: Removes the class if the component unmounts
    // or if the user somehow leaves the page while it's open.
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isActive]);

  return (
    <button
      className={`hamburger ${isActive ? 'is-active' : ''}`}
      onClick={() => setIsActive(!isActive)}
      aria-expanded={isActive}
      aria-label="Toggle Menu"
    >
      <div className="hamburger-box">
        <div className="hamburger-inner"></div>
      </div>
    </button>
  );
}