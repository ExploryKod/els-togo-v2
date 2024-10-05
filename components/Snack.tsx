"use client"
import { useEffect, useState } from 'react'

type SnackProps = {
    id: string,
    preview: boolean,
    platform: string,
    theme: string
}

const Snack = ({ id, platform = 'web', preview = true, theme = 'light'}:SnackProps) => {
  const embedUrl = `https://snack.expo.dev/embedded/${id}`;
  const iframeHeight = platform === 'web' ? '100%' : '500px';

   // Check if component is mounted to solve hydration issues with iframe from snack
   const [isMounted, setIsMounted] = useState(false)

   useEffect(() => {
    // Set to true once the component is mounted
    setIsMounted(true)
}, [])

  if (!isMounted) {
    return null;  
  }
  

  return (
    <iframe
      src={`${embedUrl}?platform=${platform}&preview=${preview}&theme=${theme}`}
      height={iframeHeight}
      width="100%"
      style={{
        overflow: "hidden",
        backgroundColor: "#fbfcfd",
        border: "1px solid var(--color-border)",
        borderRadius: "4px",
        height: "505px",
        width: "100%"
      }}
      
    />
  );
};

export default Snack;

