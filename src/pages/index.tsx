import { useState, useRef, useCallback } from 'react';
import Head from 'next/head';
import styled, { keyframes } from 'styled-components';

const rose = '#e8a0b8';
const roseDark = '#c77d9a';
const cream = '#fff5f7';
const blush = '#f8d7da';
const text = '#5c3a45';
const heart = '#e6396f';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const Container = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  background: linear-gradient(165deg, ${cream} 0%, ${blush} 40%, ${rose} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  color: ${text};
  padding: 1.5rem;
  font-family: 'Quicksand', -apple-system, sans-serif;
  position: relative;
`;

const floatSlow = keyframes`
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-15px) rotate(2deg); }
`;

const floatSlowAlt = keyframes`
  0%, 100% { transform: translateY(0) rotate(2deg); }
  50% { transform: translateY(-12px) rotate(-2deg); }
`;

const BgDeco = styled.span<{
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $width: number;
  $delay: number;
  $alt?: boolean;
}>`
  position: absolute;
  width: ${(p) => p.$width}px;
  height: ${(p) => p.$width * 1.25}px;
  opacity: 0.35;
  pointer-events: none;
  animation: ${(p) => (p.$alt ? floatSlowAlt : floatSlow)} 6s ease-in-out infinite;
  animation-delay: ${(p) => p.$delay}s;
  top: ${(p) => p.$top ?? 'auto'};
  bottom: ${(p) => p.$bottom ?? 'auto'};
  left: ${(p) => p.$left ?? 'auto'};
  right: ${(p) => p.$right ?? 'auto'};
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
  @media (max-width: 480px) {
    width: ${(p) => p.$width * 0.6}px;
    height: ${(p) => p.$width * 1.25 * 0.6}px;
    opacity: 0.28;
  }
`;

const Page = styled.div`
  text-align: center;
  max-width: 420px;
  width: 100%;
`;

const floatRotate = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(5deg); }
`;

const floatBounce = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-8px) scale(1.1); }
`;

const iconSize = (size: number) => `${size * 10}px`;

const FloatIcon = styled.span<{
  $delay: number;
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $size?: number;
  $bounce?: boolean;
}>`
  position: absolute;
  width: ${(p) => iconSize(p.$size ?? 2)};
  height: ${(p) => iconSize(p.$size ?? 2)};
  opacity: 0.6;
  animation: ${(p) => (p.$bounce ? floatBounce : floatRotate)} 4s ease-in-out infinite;
  animation-delay: ${(p) => p.$delay}s;
  top: ${(p) => p.$top ?? 'auto'};
  bottom: ${(p) => p.$bottom ?? 'auto'};
  left: ${(p) => p.$left ?? 'auto'};
  right: ${(p) => p.$right ?? 'auto'};
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
  @media (max-width: 480px) {
    width: ${(p) => iconSize((p.$size ?? 2) * 0.7)};
    height: ${(p) => iconSize((p.$size ?? 2) * 0.7)};
  }
`;

const InlineIcon = styled.img<{ $size?: number }>`
  width: ${(p) => (p.$size ?? 1) * 1.1}em;
  height: ${(p) => (p.$size ?? 1) * 1.1}em;
  vertical-align: middle;
  object-fit: contain;
  display: inline-block;
`;

const Title = styled.h1`
  font-size: clamp(1.6rem, 5vw, 2.2rem);
  font-weight: 700;
  color: ${text};
  margin-bottom: 0.5rem;
  line-height: 1.3;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

const TitleDe = styled.p`
  font-size: clamp(1.1rem, 3.5vw, 1.35rem);
  font-weight: 600;
  color: ${roseDark};
  margin-bottom: 1.5rem;
  line-height: 1.4;
  font-style: italic;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  flex-wrap: wrap;
`;

const Sub = styled.p`
  font-size: clamp(0.95rem, 2.5vw, 1.1rem);
  color: ${roseDark};
  margin-bottom: 2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  flex-wrap: wrap;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  min-height: 56px;
  min-width: 260px;
  position: relative;
`;

const Btn = styled.button`
  font-family: inherit;
  font-size: 1.15rem;
  font-weight: 600;
  padding: 0.85rem 1.8rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, left 0.15s ease-out, top 0.15s ease-out;
  &:active {
    transform: scale(0.97);
  }
`;

const BtnYes = styled(Btn)`
  background: linear-gradient(145deg, ${heart}, ${roseDark});
  color: white;
  box-shadow: 0 4px 16px rgba(230, 57, 111, 0.4);
  position: relative;
  z-index: 2;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(230, 57, 111, 0.5);
  }
`;

const BtnNo = styled(Btn)<{ $left?: number; $top?: number; $moved: boolean }>`
  background: linear-gradient(145deg, #f0f0f0, #e0e0e0);
  color: ${text};
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  position: ${(p) => (p.$moved ? 'absolute' : 'relative')};
  z-index: 1;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
  left: ${(p) => (p.$moved ? `${p.$left ?? 0}px` : 'auto')};
  top: ${(p) => (p.$moved ? `${p.$top ?? 0}px` : 'auto')};
  transform: ${(p) => (p.$moved ? 'none' : 'none')};
`;

const QuestionSection = styled.section<{ $hide: boolean }>`
  transition: opacity 0.4s;
  opacity: ${(p) => (p.$hide ? 0 : 1)};
  pointer-events: ${(p) => (p.$hide ? 'none' : 'auto')};
  ${(p) => p.$hide && 'position: absolute;'}
`;

const SuccessSection = styled.section<{ $show: boolean }>`
  display: ${(p) => (p.$show ? 'block' : 'none')};
  animation: ${fadeIn} 0.6s ease;
`;

const SuccessTitle = styled.p`
  font-size: clamp(1.8rem, 6vw, 2.5rem);
  font-weight: 700;
  color: ${heart};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  flex-wrap: wrap;
`;

const SuccessSub = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: ${text};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  flex-wrap: wrap;
`;

const Thanks = styled.div`
  background: rgba(255, 255, 255, 0.6);
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
  margin-top: 1rem;
  font-size: 1rem;
  line-height: 1.6;
  strong {
    color: ${roseDark};
  }
`;

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = useCallback(() => {
    const container = buttonsRef.current;
    const noBtn = noBtnRef.current;
    if (!container || !noBtn) return;
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    const btnW = noBtn.offsetWidth;
    const btnH = noBtn.offsetHeight;
    const maxX = Math.max(0, w - btnW);
    const maxY = Math.max(0, h - btnH);
    setNoPos({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
  }, []);

  return (
    <>
      <Head>
        <title>Mai Anh, will you be my Valentine?</title>
        <meta name="description" content="Mai Anh, will you be my Valentine?" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Container>
        <BgDeco $bottom="5%" $left="0" $width={72} $delay={0} aria-hidden><img src="/deco/buddy-pink.svg" alt="" /></BgDeco>
        <BgDeco $top="8%" $right="0" $width={68} $delay={1.2} $alt aria-hidden><img src="/deco/buddy-rose.svg" alt="" /></BgDeco>
        <BgDeco $top="35%" $left="-8px" $width={56} $delay={0.6} aria-hidden><img src="/deco/buddy-cream.svg" alt="" /></BgDeco>
        <BgDeco $top="40%" $right="-8px" $width={60} $delay={1.8} $alt aria-hidden><img src="/deco/buddy-heart.svg" alt="" /></BgDeco>
        <BgDeco $bottom="12%" $right="2%" $width={52} $delay={2.4} aria-hidden><img src="/deco/buddy-pink.svg" alt="" /></BgDeco>
        <BgDeco $bottom="15%" $left="2%" $width={58} $delay={1} $alt aria-hidden><img src="/deco/buddy-cream.svg" alt="" /></BgDeco>

        <FloatIcon $delay={0} $top="12%" $left="10%" $size={2.2} aria-hidden><img src="/icons/heart.svg" alt="" /></FloatIcon>
        <FloatIcon $delay={0.5} $top="18%" $right="15%" $size={1.8} aria-hidden><img src="/icons/flower.svg" alt="" /></FloatIcon>
        <FloatIcon $delay={1} $bottom="25%" $left="12%" $size={2} aria-hidden><img src="/icons/heart.svg" alt="" /></FloatIcon>
        <FloatIcon $delay={1.5} $bottom="20%" $right="10%" $size={1.6} aria-hidden><img src="/icons/sparkle.svg" alt="" /></FloatIcon>
        <FloatIcon $delay={0.8} $top="50%" $left="5%" $size={1.8} aria-hidden><img src="/icons/heart.svg" alt="" /></FloatIcon>
        <FloatIcon $delay={1.2} $top="45%" $right="8%" $size={2} aria-hidden><img src="/icons/rose.svg" alt="" /></FloatIcon>
        <FloatIcon $delay={0.3} $top="8%" $right="25%" $size={1.4} aria-hidden><img src="/icons/star.svg" alt="" /></FloatIcon>
        <FloatIcon $delay={1.8} $bottom="35%" $left="8%" $size={1.5} aria-hidden><img src="/icons/gift.svg" alt="" /></FloatIcon>
        <FloatIcon $delay={0.6} $bottom="15%" $right="20%" $size={1.6} aria-hidden><img src="/icons/rose.svg" alt="" /></FloatIcon>
        <FloatIcon $delay={0.2} $top="22%" $left="6%" $size={1.3} $bounce aria-hidden><img src="/icons/butterfly.svg" alt="" /></FloatIcon>
        <FloatIcon $delay={1.1} $top="6%" $right="8%" $size={1.2} $bounce aria-hidden><img src="/icons/sparkle.svg" alt="" /></FloatIcon>
        <FloatIcon $delay={0.9} $bottom="30%" $right="5%" $size={1.4} $bounce aria-hidden><img src="/icons/flower.svg" alt="" /></FloatIcon>
        <FloatIcon $delay={1.4} $bottom="8%" $left="20%" $size={1.3} aria-hidden><img src="/icons/gift.svg" alt="" /></FloatIcon>
        <FloatIcon $delay={0.4} $top="38%" $right="12%" $size={1.5} aria-hidden><img src="/icons/heart.svg" alt="" /></FloatIcon>
        <FloatIcon $delay={1.6} $top="55%" $right="6%" $size={1.2} $bounce aria-hidden><img src="/icons/star.svg" alt="" /></FloatIcon>

        <Page>
          <QuestionSection $hide={accepted}>
            <Title>
              <InlineIcon src="/icons/heart.svg" $size={1.2} alt="" /> Mai Anh, will you be my Valentine? <InlineIcon src="/icons/rose.svg" $size={1.2} alt="" /> <InlineIcon src="/icons/heart.svg" $size={1} alt="" />
            </Title>
            <TitleDe>
              Mai Anh, willst du meine Valentine sein?
            </TitleDe>
            <Sub>
              Pick one / Such dir einen aus <InlineIcon src="/icons/heart.svg" $size={1} alt="" /> <InlineIcon src="/icons/flower.svg" $size={1} alt="" /> <InlineIcon src="/icons/sparkle.svg" $size={1} alt="" /> <InlineIcon src="/icons/heart.svg" $size={1} alt="" /> <InlineIcon src="/icons/rose.svg" $size={1} alt="" />
            </Sub>
            <ButtonsWrapper ref={buttonsRef}>
              <BtnYes type="button" onClick={() => setAccepted(true)}>
                Yes
              </BtnYes>
              <BtnNo
                ref={noBtnRef}
                type="button"
                $moved={noPos !== null}
                $left={noPos?.x}
                $top={noPos?.y}
                onMouseEnter={moveNoButton}
                onTouchStart={(e) => {
                  e.preventDefault();
                  moveNoButton();
                }}
              >
                No
              </BtnNo>
            </ButtonsWrapper>
          </QuestionSection>

          <SuccessSection $show={accepted}>
            <SuccessTitle>
              <InlineIcon src="/icons/celebration.svg" $size={1.3} alt="" /> Yay, Mai Anh! <InlineIcon src="/icons/heart.svg" $size={1.2} alt="" />
            </SuccessTitle>
            <SuccessSub>
              <InlineIcon src="/icons/flower.svg" $size={1} alt="" /> Congratulations! / Herzlichen Glückwunsch! <InlineIcon src="/icons/sparkle.svg" $size={1} alt="" /> <InlineIcon src="/icons/heart.svg" $size={1} alt="" />
            </SuccessSub>
            <Thanks>
              <p>
                <strong><InlineIcon src="/icons/heart.svg" $size={1} alt="" /> Thank you, Mai Anh!</strong> / <strong>Danke, Mai Anh! <InlineIcon src="/icons/heart.svg" $size={1} alt="" /></strong>
              </p>
              <p style={{ marginTop: '0.5rem' }}>
                I'm so happy you said yes, Mai Anh. Ich freue mich so, dass du ja gesagt hast. <InlineIcon src="/icons/rose.svg" $size={0.9} alt="" /> <InlineIcon src="/icons/heart.svg" $size={0.9} alt="" /> <InlineIcon src="/icons/sparkle.svg" $size={0.9} alt="" /> <InlineIcon src="/icons/gift.svg" $size={0.9} alt="" /> <InlineIcon src="/icons/flower.svg" $size={0.9} alt="" />
              </p>
            </Thanks>
          </SuccessSection>
        </Page>
      </Container>
    </>
  );
}
