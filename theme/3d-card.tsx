"use client";

import React, { useState, useRef, useEffect } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  borderRadius?: string;
  shadowIntensity?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(79, 70, 229, 0.15)',
  borderRadius = '1rem',
  shadowIntensity = 0.8,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const rotateXFactor = 2; // Reduced by 80% from 15
    const rotateYFactor = 2; // Reduced by 80% from 15
    
    const rotateX = ((mouseY - centerY) / (rect.height / 2)) * rotateXFactor;
    const rotateY = ((centerX - mouseX) / (rect.width / 2)) * rotateYFactor;
    
    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-200 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovering ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` : 'perspective(1000px) rotateX(0) rotateY(0)',
        borderRadius,
        boxShadow: isHovering 
          ? `0 10px 30px -5px ${glowColor}, 0 0 10px 0 ${glowColor}`
          : `0 5px 15px -5px ${glowColor}`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      {children}
    </div>
  );
};

interface CardItemProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const CardItem: React.FC<CardItemProps> = ({
  title,
  description,
  icon,
  className = '',
  onClick,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Reduced rotation factor for subtle effect
    const rotateXFactor = 2;
    const rotateYFactor = 2;
    
    const rotateX = ((mouseY - centerY) / (rect.height / 2)) * rotateXFactor;
    const rotateY = ((centerX - mouseX) / (rect.width / 2)) * rotateYFactor;
    
    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      ref={cardRef}
      className={`p-6 bg-white dark:bg-gray-800 rounded-xl transition-all duration-300 
      cursor-pointer ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovering 
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)` 
          : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
        boxShadow: isHovering 
          ? '0 10px 30px -5px rgba(79, 70, 229, 0.6), 0 0 15px 0 rgba(79, 70, 229, 0.4)' 
          : '0 4px 14px 0 rgba(79, 70, 229, 0.25), 0 1px 5px 0 rgba(79, 70, 229, 0.15)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {icon && (
        <div className="flex justify-center items-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

interface CardGridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: string;
  className?: string;
}

export const CardGrid: React.FC<CardGridProps> = ({
  children,
  columns = 3,
  gap = '1.5rem',
  className = '',
}) => {
  return (
    <div
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap,
      }}
    >
      {children}
    </div>
  );
};
