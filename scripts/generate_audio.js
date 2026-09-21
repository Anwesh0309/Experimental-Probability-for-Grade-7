import fs from 'fs';
import path from 'path';

const API_KEY = 'sk_0af55b573c54fe31387443150c45624fed865ccc914cd486';
const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
const MODEL_ID = 'eleven_multilingual_v2';

const phrases = [
  { key: 'wonder_intro', text: 'Alex flipped a mystery coin ten times and got seven heads. Does that mean the coin is unfair? How can we find out without guessing?' },
  { key: 'story_s1_text', text: 'Alex flipped a coin at the Chance Corner carnival booth. Every single flip is called a trial. The outcome is what lands on top: Heads or Tails!' },
  { key: 'story_s1_q', text: 'What counts as one trial?' },
  { key: 'story_s1_tip', text: 'One flip is one trial. Heads or tails is the outcome.' },
  { key: 'story_s2_text', text: 'To keep track of many flips, Maya uses tallies. Grouping tallies in fives makes counting fast and easy!' },
  { key: 'story_s2_q', text: 'How do we keep track of many results?' },
  { key: 'story_s2_tip', text: 'Group tallies in fives so counting is fast.' },
  { key: 'story_s3_text', text: 'Frequency is simply the number of times an event occurred. Alex counted seven heads, so the frequency of heads is seven!' },
  { key: 'story_s3_q', text: 'How many heads did we see?' },
  { key: 'story_s3_tip', text: 'Frequency is just a count.' },
  { key: 'story_s4_text', text: 'Relative frequency is the experimental probability! We calculate it by dividing the frequency by total trials. Seven out of ten is zero point seven or seventy percent.' },
  { key: 'story_s4_q', text: 'Why compare to the total?' },
  { key: 'story_s4_tip', text: '7 out of 10 and 70 out of 100 mean different things.' },
  { key: 'story_s5_text', text: 'At the Dice Dojo, Alex rolls a six-sided die. Short experiments can have surprising results, but every face should come up equally often over time!' },
  { key: 'story_s5_q', text: 'Does every face come up equally often?' },
  { key: 'story_s5_tip', text: 'Short experiments can be surprising.' },
  { key: 'story_s6_text', text: 'Maya tried ten flips and got four heads, while Alex got seven heads. Repeat experiments often give different results because of random chance!' },
  { key: 'story_s6_q', text: 'Why did Maya get 4 heads when Alex got 7?' },
  { key: 'story_s6_tip', text: 'Variation is normal.' },
  { key: 'story_s7_text', text: 'As the number of trials increases to one hundred or one thousand, the relative frequency settles near a steady value. This is the Law of Large Numbers!' },
  { key: 'story_s7_q', text: 'What happens after 1000 flips?' },
  { key: 'story_s7_tip', text: 'The bigger the sample, the steadier the estimate.' },
  { key: 'story_s8_text', text: 'We can use experimental probability to predict future outcomes. Expected count equals probability times total trials!' },
  { key: 'story_s8_q', text: 'If we flip 200 times, how many heads should we expect?' },
  { key: 'story_s8_tip', text: 'Predictions are estimates, not promises.' },
  { key: 'feedback_correct', text: 'Awesome job! You got it right!' },
  { key: 'feedback_wrong', text: 'Not quite! Check the explanation and try again!' },
  { key: 'reflect_prompt', text: 'What did you learn about experimental probability? Explain it to Leo with an example!' }
];

const audioDir = path.resolve('public/assets/audio');
const utilsDir = path.resolve('src/utils');

if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });
if (!fs.existsSync(utilsDir)) fs.mkdirSync(utilsDir, { recursive: true });

const audioMap = {};

async function generate() {
  console.log('Starting ElevenLabs TTS audio generation check...');
  for (const item of phrases) {
    const filename = `${item.key}.mp3`;
    const filePath = path.join(audioDir, filename);

    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
      console.log(`[EXIST] Saved asset: ${filename}`);
      audioMap[item.text] = `/assets/audio/${filename}`;
      continue;
    }

    console.log(`[GEN] Requesting ElevenLabs TTS for ${filename}...`);
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg'
        },
        body: JSON.stringify({
          text: item.text,
          model_id: MODEL_ID,
          voice_settings: {
            stability: 0.35,
            similarity_boost: 0.75,
            style: 0.5,
            use_speaker_boost: true
          }
        })
      });

      if (response.ok) {
        const buffer = Buffer.from(await response.arrayBuffer());
        fs.writeFileSync(filePath, buffer);
        console.log(`[DONE] Saved ${filename} (${buffer.length} bytes)`);
        audioMap[item.text] = `/assets/audio/${filename}`;
      } else {
        console.warn(`[WARN] ElevenLabs API returned ${response.status}. Client Web Speech API speech synthesis will be active for "${item.key}".`);
      }
    } catch (err) {
      console.warn(`[WARN] Network error for ${filename}. Client fallback will be used.`);
    }
  }

  const audioMapContent = `// AUTO-GENERATED AUDIO MAP
export const audioMap = ${JSON.stringify(audioMap, null, 2)};
`;
  fs.writeFileSync(path.join(utilsDir, 'audioMap.js'), audioMapContent);
  console.log('Audio map written to src/utils/audioMap.js');
}

generate();
