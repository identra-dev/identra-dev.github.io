"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.85, 1] : [0.92, 1];
  };

  // No tilt: the card only scales up and rises slightly as it enters. (Was a
  // rotateX from 20deg → 0; removed per design direction.)
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [20, -30]);

  return (
    <div
      className="relative flex h-[38rem] items-center justify-center p-2 md:h-[48rem] md:p-20"
      ref={containerRef}
    >
      <div className="relative w-full pt-2 pb-10 md:pt-4 md:pb-16">
        <Header translate={translate} titleComponent={titleComponent} />
        <Card translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  scale,
  children,
}: {
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{ scale }}
      // Light neumorphic frame around the dark product board. mt keeps it clear
      // of the two-line header above (which also translates on scroll).
      className="neu mx-auto mt-6 h-[24rem] w-full max-w-5xl rounded-[34px] bg-background p-3 md:h-[34rem] md:p-4"
    >
      <div className="h-full w-full overflow-hidden rounded-[24px] bg-[#1a1618]">
        {children}
      </div>
    </motion.div>
  );
};
