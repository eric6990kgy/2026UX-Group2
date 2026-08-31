import { useState, useRef, useCallback } from 'react';

const COMMON_DEMO_TEXTS = [
  '月亮代表我的心',
  '鄧麗君',
  '甜蜜蜜',
  '愛拼才會贏',
  '費玉清',
  '綠島小夜曲',
];

export function useVoiceSearch(onResult?: (text: string) => void) {
  const [isListening, setIsListening] = useState(false);
  const [statusText, setStatusText] = useState('按下開始說話');
  const [recognizedText, setRecognizedText] = useState('');
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setIsListening(true);
    setStatusText('聆聽中…');
    setRecognizedText('');

    // Stage 1: Listening (1.2 seconds)
    // Stage 2: Processing (1.3 seconds)
    // Total 2.5 seconds delay
    timerRef.current = setTimeout(() => {
      setStatusText('聽到了！尋找中…');
      
      // Select a random popular karaoke query
      const result = COMMON_DEMO_TEXTS[Math.floor(Math.random() * COMMON_DEMO_TEXTS.length)];
      setRecognizedText(result);
      
      // Delay slightly and then call result callback
      timerRef.current = setTimeout(() => {
        setIsListening(false);
        if (onResult) {
          onResult(result);
        }
      }, 1000);

    }, 1500);
  }, [onResult]);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsListening(false);
    setStatusText('已取消');
    setRecognizedText('');
  }, []);

  return {
    isListening,
    statusText,
    recognizedText,
    start,
    stop,
  };
}
