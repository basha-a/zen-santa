import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

export default function ScrachCard({
  prizeText = "🎉 You got a $50 Apple gift card!",
  imageUrl = "https://assets.codepen.io/4175254/apple-gift-card.png",
  threshold = 45, // % to clear
}) {
  const isSafari =
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const canvasRef = useRef(null);
  const coverRef = useRef(null);
  const coverContainerRef = useRef(null);
  const canvasRenderRef = useRef(null);
  const textRef = useRef(null);
  const prizeImageRef = useRef(null);

  const [hasCleared, setHasCleared] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cover = coverRef.current;
    const coverContainer = coverContainerRef.current;
    const imageRender = canvasRenderRef.current;
    const text = textRef.current;
    const prizeImage = prizeImageRef.current;
    const ctx = canvas.getContext("2d");

    let pointerDown = false;
    let lastX, lastY;
    let clearTimeoutCheck = null;
    let setImageTimeout = null;

    // Set canvas resolution
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth * dpr;
    const height = canvas.offsetHeight * dpr;

    canvas.width = width;
    canvas.height = height;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    if (isSafari) canvas.classList.add("hidden");

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const plotLine = (ctx, x1, y1, x2, y2) => {
      const dist = Math.hypot(x2 - x1, y2 - y1);
      const step = dist / 50;

      for (let i = 0; i < dist; i += step) {
        const t = i / dist;
        const x = x1 + (x2 - x1) * t;
        const y = y1 + (y2 - y1) * t;

        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const setImageFromCanvas = () => {
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);

        if (imageRender.src) {
          URL.revokeObjectURL(imageRender.src);
        }

        imageRender.src = url;
        imageRender.classList.remove("hidden");
      });
    };

    const checkRevealPercentage = () => {
      const img = ctx.getImageData(0, 0, width, height);
      const data = img.data;

      let blackCount = 0;

      for (let i = 0; i < data.length; i += 4) {
        if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) {
          blackCount++;
        }
      }

      const percentage = (blackCount * 100) / (width * height);

      if (percentage >= threshold && !hasCleared) {
        setHasCleared(true);

        coverContainer.classList.add("clear");
        text.textContent = prizeText;
        prizeImage.classList.add("animate");

        confetti({
          particleCount: 120,
          spread: 90,
          origin: {
            y: (text.getBoundingClientRect().bottom + 60) / window.innerHeight,
          },
        });

        coverContainer.addEventListener(
          "transitionend",
          () => coverContainer.classList.add("hidden"),
          { once: true }
        );
      }
    };

    const onPointerMove = (e) => {
      const pos = getPos(e);
      plotLine(ctx, lastX, lastY, pos.x, pos.y);
      lastX = pos.x;
      lastY = pos.y;

      if (isSafari) {
        clearTimeout(setImageTimeout);
        setImageTimeout = setTimeout(setImageFromCanvas, 5);
      }
    };

    const onPointerDown = (e) => {
      cover.classList.remove("shine");
      const pos = getPos(e);
      lastX = pos.x;
      lastY = pos.y;

      pointerDown = true;
      clearTimeout(clearTimeoutCheck);

      canvas.addEventListener("pointermove", onPointerMove);
    };

    const onPointerUp = () => {
      pointerDown = false;
      canvas.removeEventListener("pointermove", onPointerMove);

      clearTimeoutCheck = setTimeout(() => {
        checkRevealPercentage();
      }, 500);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointermove", onPointerMove);
    };
  }, [hasCleared, threshold, prizeText, imageUrl]);

  return (
    <div className="scratchcardpage-body">
      {/* Scratch Card */}
      <div className="scratch-card">
        <div
          className="scratch-card-cover-container"
          ref={coverContainerRef}
        >
          <canvas
            className="scratch-card-canvas"
            ref={canvasRef}
          />
          <img
            ref={canvasRenderRef}
            className="scratch-card-canvas-render hidden"
            alt=""
          />
          <div className="scratch-card-cover shine" ref={coverRef}>
            {/* SVG Cover Layer (unchanged from your JSX) */}
          </div>
        </div>

        <img
          ref={prizeImageRef}
          className="scratch-card-image"
          src={imageUrl}
          alt="Prize"
        />
      </div>

      <p className="scratch-card-text" ref={textRef}>
        🎁 Scratch for a surprise!
      </p>
    </div>
  );
}
