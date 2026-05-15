"use client";

import { useEffect } from "react";
import { useSettings } from "@/contexts/SettingsContext";

export default function VLibras() {
  const { librasEnabled } = useSettings();

  useEffect(() => {
    if (!librasEnabled) return;

    const scriptId = "vlibras-script-tag";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
      script.async = true;
      script.onload = () => {
        // @ts-ignore
        if (window.VLibras) {
          // @ts-ignore
          new window.VLibras.Widget("https://vlibras.gov.br/app");
        }
      };
      document.body.appendChild(script);
    } else {
      // @ts-ignore
      if (window.VLibras) {
        // @ts-ignore
        new window.VLibras.Widget("https://vlibras.gov.br/app");
      }
    }

    return () => {
      // Cleanup DOM when disabled so it can be re-initialized cleanly
      const widget = document.querySelector(".vw-plugin-wrapper");
      if (widget) widget.remove();
      const button = document.querySelector("[vw]");
      if (button) button.remove();
    };
  }, [librasEnabled]);

  if (!librasEnabled) return null;

  return (
    <div vw="true" className="enabled">
      <div vw-access-button="true" className="active" />
      <div vw-plugin-wrapper="true">
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
}



