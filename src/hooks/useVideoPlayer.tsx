import { useEffect, useRef, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { fetchDashUrlSelector, fetchHlsUrlSelector } from "../recoil/playState";
import { IUseVideoPlayer } from "../types/data.types";

const licenseUri = import.meta.env.VITE_URI_LICENSE;
const fairplayCertUri = import.meta.env.VITE_URI_FAIRPLAY_CERT;

const widevineToken = import.meta.env.VITE_TOKEN_WIDEVINE;
const playreadyToken = import.meta.env.VITE_TOKEN_PLAYREADY;
const fairplayToken = import.meta.env.VITE_TOKEN_FAIRPLAY;

const useVideoPlayer = (episodeNumber: number): IUseVideoPlayer => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerInitialized = useRef<boolean>(false);
  let player: any = null;

  const dashUriLoadable = useRecoilValueLoadable(
    fetchDashUrlSelector({ episodeNumber })
  );
  const hlsUriLoadable = useRecoilValueLoadable(
    fetchHlsUrlSelector({ episodeNumber })
  );

  const [drmType, setDrmType] = useState<string>("No DRM");
  const [browser, setBrowser] = useState<string>("Non-DRM browser");
  const [error, setError] = useState<boolean>(false);

  const checkBrowser = () => {
    const agent = navigator.userAgent.toLowerCase();
    let detectedBrowser = "Unknown";

    if (agent.includes("edge/")) detectedBrowser = "Edge";
    else if (agent.includes("opr")) detectedBrowser = "Opera";
    else if (agent.includes("whale")) detectedBrowser = "Whale";
    else if (agent.includes("chrome")) detectedBrowser = "Chrome";
    else if (agent.includes("safari")) detectedBrowser = "Safari";
    else if (agent.includes("firefox")) detectedBrowser = "Firefox";

    setBrowser(detectedBrowser);
    return detectedBrowser;
  };

  const checkSupportedDRM = async () => {
    const config = [
      {
        initDataTypes: ["cenc"],
        audioCapabilities: [{ contentType: 'audio/mp4;codecs="mp4a.40.2"' }],
        videoCapabilities: [{ contentType: 'video/mp4;codecs="avc1.42E01E"' }],
      },
    ];

    const drmKeys = [
      { name: "Widevine", key: "com.widevine.alpha" },
      { name: "PlayReady", key: "com.microsoft.playready" },
      { name: "FairPlay", key: "com.apple.fps.1_0" },
    ];

    for (const drm of drmKeys) {
      try {
        await navigator
          .requestMediaKeySystemAccess(drm.key, config)
          .then(() => {
            setDrmType(drm.name);
          })
          .catch(() => {});
      } catch (e) {
        console.error(e);
      }
    }
  };

  // 플레이어 초기화
  const initializePlayer = async () => {
    if (playerInitialized.current) {
      console.warn("Player is already initialized. Skipping initialization.");
      return;
    }

    const video = videoRef.current;
    if (!video || !window.shaka) {
      console.error("Video element or Shaka Player not available.");
      return;
    }

    player = new window.shaka.Player(video);
    window.player = player;
    playerInitialized.current = true;

    player.addEventListener("error", onErrorEvent);

    let contentUri =
      drmType === "FairPlay"
        ? hlsUriLoadable.contents
        : dashUriLoadable.contents;
    if (!contentUri) {
      console.error("No valid URI to load.");
      setError(true);
      return;
    }

    let playerConfig: any = {
      streaming: { autoLowLatencyMode: true },
    };

    try {
      if (drmType === "FairPlay") {
        const fairplayCert = await getFairplayCert();
        playerConfig.drm = {
          servers: { "com.apple.fps": licenseUri },
          advanced: { "com.apple.fps": { serverCertificate: fairplayCert } },
        };
        configureDRMRequest(player, fairplayToken, "com.apple.fps.1_0");
      } else if (drmType === "Widevine") {
        playerConfig.drm = {
          servers: { "com.widevine.alpha": licenseUri },
          advanced: { "com.widevine.alpha": { persistentStateRequired: true } },
        };
        configureDRMRequest(player, widevineToken, "com.widevine.alpha");
      } else if (drmType === "PlayReady") {
        playerConfig.drm = {
          servers: { "com.microsoft.playready": licenseUri },
        };
        configureDRMRequest(player, playreadyToken, "com.microsoft.playready");
      }

      player.setTextTrackVisibility(true);
      player.configure(playerConfig);

      setTimeout(async () => {
        try {
          await player.load(contentUri);
          console.log("Video loaded successfully");
        } catch (error) {
          console.error("Failed to load video", error);
          setError(true);
        }
      }, 1000);
    } catch (error) {
      console.error("Player initialization failed", error);
      setError(true);
    }
  };

  const getFairplayCert = async () => {
    try {
      const response = await fetch(fairplayCertUri);
      const base64Data = await response.text();
      return window.shaka.util.Uint8ArrayUtils.fromBase64(base64Data);
    } catch (error) {
      console.error("Failed to fetch getFairplayCert", error);
      throw error;
    }
  };

  const configureDRMRequest = (player: any, token: string, drmType: string) => {
    player
      .getNetworkingEngine()
      .registerRequestFilter((type: any, request: any) => {
        if (type === window.shaka.net.NetworkingEngine.RequestType.LICENSE) {
          request.headers["pallycon-customdata-v2"] = token;
          if (drmType === "com.apple.fps.1_0") {
            const originalPayload = new Uint8Array(request.body as ArrayBuffer);
            const base64Payload =
              window.shaka.util.Uint8ArrayUtils.toBase64(originalPayload);
            const params = "spc=" + encodeURIComponent(base64Payload);
            request.body = window.shaka.util.StringUtils.toUTF8(params);
            request.headers["Content-Type"] =
              "application/x-www-form-urlencoded";
          }
        }
      });
  };

  const onErrorEvent = (event: any) => {
    const { code } = event.detail;

    if (code === 6012) {
      setError(true);
      setTimeout(() => initializePlayer(), 500);
    }
    if (code === 6012 && browser === "Edge") {
      setError(true);
      window.player?.destroy();
      setTimeout(() => initializePlayer(), 500);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const setupPlayer = async () => {
      try {
        if (isMounted) {
          checkBrowser();
          await checkSupportedDRM();
        }
      } catch (error) {
        if (isMounted) {
          console.error("SetupPlayer failed", error);
        }
      }
    };

    setupPlayer();

    return () => {
      isMounted = false;
    };
  }, [episodeNumber]);

  useEffect(() => {
    if (
      dashUriLoadable.state === "hasValue" &&
      hlsUriLoadable.state === "hasValue" &&
      (drmType === "Widevine" ||
        drmType === "FairPlay" ||
        drmType === "PlayReady") &&
      !playerInitialized.current
    ) {
      const contentUri =
        drmType === "FairPlay"
          ? hlsUriLoadable.contents
          : dashUriLoadable.contents;

      if (contentUri) {
        setTimeout(() => initializePlayer(), 1000);
      } else {
        console.error("No valid URI found.");
      }
    }
  }, [dashUriLoadable, hlsUriLoadable, drmType]);

  return { videoRef, browser, drmType, error };
};

export default useVideoPlayer;
