import { useEffect } from 'react';

function Creator() {
    useEffect(() => {
      try {
        const script = document.createElement('script');
        script.src = 'https://www.socialintents.com/api/socialintents.1.3.js#2c9fab3587fe4872018800eaf6bf01bd';
        script.async = true;
        document.body.appendChild(script);
      } catch (err) {
        console.error(err);
      }
    }, []);
  
    return null;
  }

export default Creator;