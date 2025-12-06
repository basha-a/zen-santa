import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export default function ScratchCard2() {
  const canvasRef = useRef(null);
  const coverRef = useRef(null);
  const coverContainerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const canvasRenderRef = useRef(null);

  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(
      navigator.userAgent
    );

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const cover = coverRef.current;
    const coverContainer = coverContainerRef.current;
    const text = textRef.current;
    const image = imageRef.current;
    const canvasRender = canvasRenderRef.current;

    let isPointerDown = false;
    let positionX = 0;
    let positionY = 0;
    let clearDetectionTimeout = null;
    let setImageTimeout = null;

    const devicePixelRatio = window.devicePixelRatio || 1;

    const canvasWidth = canvas.offsetWidth * devicePixelRatio;
    const canvasHeight = canvas.offsetHeight * devicePixelRatio;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    context.scale(devicePixelRatio, devicePixelRatio);

    if (isSafari) canvas.classList.add("hidden");

    const getPosition = ({ clientX, clientY }) => {
      const { left, top } = canvas.getBoundingClientRect();
      return { x: clientX - left, y: clientY - top };
    };

    const plotLine = (ctx, x1, y1, x2, y2) => {
      const diffX = Math.abs(x2 - x1);
      const diffY = Math.abs(y2 - y1);
      const dist = Math.sqrt(diffX * diffX + diffY * diffY);
      const step = dist / 50;

      let i = 0;
      while (i < dist) {
        const t = Math.min(1, i / dist);
        const x = x1 + (x2 - x1) * t;
        const y = y1 + (y2 - y1) * t;

        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.fill();

        i += step;
      }
    };

    const setImageFromCanvas = () => {
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const previousUrl = canvasRender.src;
        canvasRender.src = url;
        if (!previousUrl) {
          canvasRender.classList.remove("hidden");
        } else {
          URL.revokeObjectURL(previousUrl);
        }
      });
    };

    const checkBlackFillPercentage = () => {
      const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
      const pixelData = imageData.data;

      let blackPixelCount = 0;

      for (let i = 0; i < pixelData.length; i += 4) {
        const [red, green, blue, alpha] = pixelData.slice(i, i + 4);
        if (red === 0 && green === 0 && blue === 0 && alpha === 255) {
          blackPixelCount++;
        }
      }

      const blackFillPercentage =
        (blackPixelCount * 100) / (canvasWidth * canvasHeight);

      if (blackFillPercentage >= 45) {
        coverContainer.classList.add("clear");

        confetti({
          particleCount: 100,
          spread: 90,
          origin: {
            y: (text.getBoundingClientRect().bottom + 60) / window.innerHeight,
          },
        });

        text.textContent = "🎉 Your giftee revealed";
        image.classList.add("animate");

        coverContainer.addEventListener(
          "transitionend",
          () => coverContainer.classList.add("hidden"),
          { once: true }
        );
      }
    };

    const plot = (e) => {
      const { x, y } = getPosition(e);
      plotLine(context, positionX, positionY, x, y);
      positionX = x;
      positionY = y;

      if (isSafari) {
        clearTimeout(setImageTimeout);
        setImageTimeout = setTimeout(() => {
          setImageFromCanvas();
        }, 5);
      }
    };

    const pointerDownHandler = (e) => {
      cover.classList.remove("shine");
      ({ x: positionX, y: positionY } = getPosition(e));
      clearTimeout(clearDetectionTimeout);

      canvas.addEventListener("pointermove", plot);

      window.addEventListener(
        "pointerup",
        () => {
          canvas.removeEventListener("pointermove", plot);
          clearDetectionTimeout = setTimeout(checkBlackFillPercentage, 500);
        },
        { once: true }
      );
    };

    canvas.addEventListener("pointerdown", pointerDownHandler);

    return () => {
      canvas.removeEventListener("pointerdown", pointerDownHandler);
      canvas.removeEventListener("pointermove", plot);
    };
  }, []);

  return (
    <div className="scratchcardpage-body">

        <svg width="0" height="0" style={{ position: "absolute" }}>
  <filter id="remove-black" colorInterpolationFilters="sRGB">
    <feColorMatrix
      type="matrix"
      values="1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
             -1 -1 -1 0 1"
      result="black-pixels"
    />
    <feComposite in="SourceGraphic" in2="black-pixels" operator="out" />
  </filter>

  <filter id="noise">
    <feTurbulence baseFrequency="0.5" />
  </filter>
</svg>


      <div className="scratch-card">
        <div
          className="scratch-card-cover-container"
          ref={coverContainerRef}
        >
          <canvas
            className="scratch-card-canvas"
            width="520"
            height="520"
            ref={canvasRef}
          ></canvas>

          <img
            className="scratch-card-canvas-render hidden"
            ref={canvasRenderRef}
            alt=""
          />

          <div className="scratch-card-cover shine" ref={coverRef}>
            {/* Your SVG */}
          </div>
        </div>

        <img
          className="scratch-card-image"
          src="https://blogger.googleusercontent.com/img/a/AVvXsEidiaXnSyLvxK53RqJ8N3qmIMDXYN4YBdL86HFfcsbk12GMVRGGEbbLSHq-POcKpN_UKwpx4SaUiOiBceTWl0zUmmdvrL6RbeGYR-h9452SjX-us5nH0Xu8SWZhzWDy4RbPWm6yjMMtdqR-AXN1sJZVIvwvyuvDlzKuCtvmqRGRLCa9RwSJENpbWJy1nxw"
          ref={imageRef}
          alt="Apple 50$ gift card"
        />
        <h4 className="text-center position-relative" style={{bottom:"70%"}}>Basha</h4>
      </div>

      <p className="scratch-card-text" ref={textRef}>
        🎁 Scratch to find your giftee!
      </p>

      {/* Definitions */}
      <svg width="0" height="0">
        {/* Filters */}
      </svg>
    </div>
  );
}
