// App.tsx
// DailyMotivationApp – soft pastel, paper-texture aesthetic
// One-page Expo React Native app with morning/evening palette

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useEffect, useMemo, useState } from 'react';

// Longer excerpts kept short of full poems (fair-use length)
const QUOTES: { text: string; author: string }[] = [
  {
    text:
      'Peace comes from within. Do not seek it without. When the mind is calm, clarity appears, and compassion follows naturally.',
    author: 'Buddha',
  },
  {
    text:
      'Where there is ruin, there is hope for a treasure. Try not to turn away from what troubles you; remain curious.',
    author: 'Rumi',
  },
  {
    text:
      'The world always seems brighter when you’ve just made something, and truer when you’ve made it with care.',
    author: 'Neil Gaiman',
  },
  {
    text:
      'Understanding is love’s other name. When you understand someone, you cannot help but love them, even when it is difficult.',
    author: 'Thích Nhất Hạnh (How to Love)',
  },
  {
    text:
      'Trying to define yourself is like trying to bite your own teeth. You are not a thing; you are a process.',
    author: 'Alan Watts',
  },
  {
    text:
      'Those who have a “why” can bear almost any “how.” Meaning does not arise from comfort, but from responsibility.',
    author: 'Viktor Frankl',
  },
  {
    text:
      'Be patient toward all that is unsolved in your heart and try to love the questions themselves. Live the questions now.',
    author: 'Rainer Maria Rilke',
  },
  {
    text:
      'The best way out is always through. Somewhere, walking takes you somewhere worth going.',
    author: 'Robert Frost',
  },
  {
    text:
      'You only have to let the soft animal of your body love what it loves. Tell me about your despair, yours, and I will tell you mine.',
    author: 'Mary Oliver',
  },
  {
    text:
      'When despair grows in me and I wake in the night at the least sound, I go and lie down where the wood drake rests in his beauty on the water.',
    author: 'Wendell Berry — “The Peace of Wild Things”',
  },
  {
    text:
      'The time will come when, with elation, you will greet yourself arriving at your own door, and each will smile at the other’s welcome.',
    author: 'Derek Walcott — “Love After Love”',
  },
];

function useDayPalette() {
  const hour = new Date().getHours();
  const isMorning = hour >= 5 && hour < 17;

  return useMemo(
    () =>
      isMorning
        ? {
            background: '#f6f3f8', // lavender morning
            paper: '#fffefe',
            ink: '#4a4458',
            muted: '#8a8399',
            line: '#e6e1ec',
            accentBg: '#f2eef7',
            accentLine: '#c9c3d8',
          }
        : {
            background: '#f1f0f6', // dusk blue
            paper: '#fbfbfd',
            ink: '#3f3a4d',
            muted: '#7b748a',
            line: '#dedbea',
            accentBg: '#ebe9f2',
            accentLine: '#bfb9d1',
          },
    [hour]
  );
}

export default function App() {
  const palette = useDayPalette();
  const [current, setCurrent] = useState(QUOTES[0]);

  useEffect(() => {
    // Gentle refresh on mount
    setCurrent(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  const nextQuote = () => {
    let q = current;
    while (q === current) {
      q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    }
    setCurrent(q);
  };

  return (
    <View style={[styles.container, { backgroundColor: palette.background }]}>
      {/* Paper texture layers */}
      <View style={[styles.paperShadow, { backgroundColor: palette.paper }]} />
      <View style={[styles.card, { backgroundColor: palette.paper, borderColor: palette.line }]}>        
        <Text style={[styles.quote, { color: palette.ink }]}>“{current.text}”</Text>

        {/* sketch divider */}
        <View style={[styles.divider, { borderBottomColor: palette.line }]} />

        <Text style={[styles.author, { color: palette.muted }]}>— {current.author}</Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: palette.accentBg, borderColor: palette.accentLine }]}
          onPress={nextQuote}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { color: palette.ink }]}>Another thought</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paperShadow: {
    position: 'absolute',
    width: '92%',
    maxWidth: 440,
    height: '70%',
    borderRadius: 22,
    opacity: 0.5,
    transform: [{ translateY: 6 }],
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 20,
    padding: 28,
    borderWidth: 1,
  },
  quote: {
    fontSize: 19,
    lineHeight: 30,
    marginBottom: 20,
  },
  divider: {
    borderBottomWidth: 1,
    width: '40%',
    marginBottom: 18,
  },
  author: {
    fontSize: 14,
    marginBottom: 28,
  },
  button: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 999,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    letterSpacing: 0.3,
  },
});
