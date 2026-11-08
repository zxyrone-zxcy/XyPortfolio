import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import "../styles/spotify.css";

const PLAYLIST_URL = "https://open.spotify.com/playlist/0wck30kaigb3UkfT2FfmbR?si=e2824631a4e54ead";

// Spotify playlist embed built with the Spotify iFrame API, with custom Play / Pause buttons.
export default function SpotifyPlayer() {
  const embedRef = useRef(null);
  const controllerRef = useRef(null);
  const [iFrameAPI, setIFrameAPI] = useState(undefined);
  const [playerLoaded, setPlayerLoaded] = useState(false);

  // Load the Spotify iFrame API script
  useEffect(() => {
    window.onSpotifyIframeApiReady = (api) => setIFrameAPI(api);

    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Create the player once the API is ready
  useEffect(() => {
    if (!iFrameAPI || !embedRef.current) return undefined;

    // The API replaces its target element, so give it a throwaway child
    // to keep React's own DOM node intact.
    const mount = document.createElement("div");
    embedRef.current.appendChild(mount);

    iFrameAPI.createController(
      mount,
      { width: "100%", height: "352", url: PLAYLIST_URL },
      (controller) => {
        controller.addListener("ready", () => setPlayerLoaded(true));
        controllerRef.current = controller;
      }
    );

    return () => {
      controllerRef.current?.destroy?.();
      controllerRef.current = null;
      embedRef.current?.replaceChildren();
    };
  }, [iFrameAPI]);

  return (
    <div className="spotify-player">
      <div ref={embedRef} className="spotify-embed" />
      {!playerLoaded && <p className="spotify-loading">Loading player…</p>}
      <div className="spotify-controls">
        <button type="button" aria-label="Play" onClick={() => controllerRef.current?.play()}>
          <Play size={16} aria-hidden="true" />
          <span>Play</span>
        </button>
        <button type="button" aria-label="Pause" onClick={() => controllerRef.current?.pause()}>
          <Pause size={16} aria-hidden="true" />
          <span>Pause</span>
        </button>
      </div>
    </div>
  );
}
