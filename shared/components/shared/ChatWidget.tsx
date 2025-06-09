'use client';

import { useEffect } from 'react';

const ChatWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://chat.key.live/bundles/widget.min.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // @ts-ignore
      window.KeyCRM?.render({
        token: "3198b62a-e60f-42a4-92c6-ccbbfa48c524",
      });
    };

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
};

export default ChatWidget;
