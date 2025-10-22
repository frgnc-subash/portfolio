import React, { useEffect, useState } from "react";

const Loading = ({ onComplete }) => {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev === 3 ? 1 : prev + 1));
    }, 500);

    const timeout = setTimeout(() => {
      onComplete();
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  const dotStr = ".".repeat(dots);

  return (
    <div
      style={{
        fontFamily: "'Silkscreen', Courier, monospace",
        fontWeight: "bold",
        fontSize: "1.7rem",
        letterSpacing: "0.2rem",
        color: "#00FF00",
        textShadow: "1px 1px 0 #000",
        userSelect: "none",
        textAlign: "center",
        marginTop: "44vh",
      }}
    >
      Loading{dotStr}
    </div>
  );
};

export default Loading;