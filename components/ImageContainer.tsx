import React from 'react';

interface ImageContainerProps {
  children: React.ReactNode;
  isContain?: boolean; 
  key?: number | string
  classNames?: string; // Making classNames optional
}

const ImageContainer: React.FC<ImageContainerProps> = ({ children, isContain=false, classNames = '' }) => {
  return <div className={`${isContain ? "object-contain" : ""} ${classNames}`}>{children}</div>;
};

export default ImageContainer;