import React, { useEffect, useState } from "react";
import PWAPrompt from 'react-ios-pwa-prompt'
import AddToHomeScreen from '@ideasio/add-to-homescreen-react';
// import AddToHomeScreen from '@ideasio/add-to-homescreen-react';


const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    window.addEventListener('appinstalled', () => {
      // Hide the app-provided install promotion
      console.log("por favor DEUS");
      // Clear the deferredPrompt so it can be garbage collected
    
      // Optionally, send analytics event to indicate successful install
      console.log('PWA was installed');
    });
    const handler = e => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    
    window.addEventListener("beforeinstallprompt", handler);
    console.log(promptInstall);
    return () => window.removeEventListener("transitionend", handler);
  }, [promptInstall]);

  const onClick = evt => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  // return <AddToHomeScreen></AddToHomeScreen>;
  if (!supportsPWA) {
    return <PWAPrompt promptOnVisit={1} timesToShow={3} copyClosePrompt="Close" permanentlyHideOnDismiss={false}/>;
  }
  return (
    <button
      className="link-button"
      id="setup_button"
      aria-label="Install app"
      title="Install app"
      onClick={onClick}
    >
      Install
    </button>
  );
};

export default InstallPWA;