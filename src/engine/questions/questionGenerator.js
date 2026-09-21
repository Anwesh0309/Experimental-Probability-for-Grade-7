import { makeRng, randInt, pick, shuffle, simplify } from '../rng';

const NAMES = ['Alex', 'Maya', 'Sam', 'Emma', 'Lucas', 'Sophia', 'Ethan', 'Oliver'];
const SETTINGS = ['Carnival Game', 'School Fair', 'CCA Sports Day', 'Arcade Booth', 'Science Lab'];

export const generateWorldQuestions = (worldId, sessionSeed = Date.now()) => {
  const seed = (sessionSeed * 10007 + worldId * 997) >>> 0;
  const rng = makeRng(seed);
  const questions = [];

  for (let i = 1; i <= 10; i++) {
    const qIndex = (worldId - 1) * 10 + i;
    const name = pick(rng, NAMES);
    const setting = pick(rng, SETTINGS);

    switch (worldId) {
      case 1: {
        // World 1: Chance Camp - Trial, Outcome, Event, Fair/Unfair
        const trials = pick(rng, [10, 20, 50]);
        questions.push({
          id: `w1-q${i}`,
          qNum: qIndex,
          topicTag: '✦ TRIAL & OUTCOME ✦',
          prompt: `${name} flipped a coin ${trials} times at the ${setting}. What counts as ONE single trial?`,
          options: [
            { text: 'A single coin flip', isCorrect: true },
            { text: 'All 10 coin flips combined', isCorrect: false },
            { text: 'Getting Heads on top', isCorrect: false },
            { text: 'The total number of heads', isCorrect: false },
          ],
          explanation: 'One flip is a single trial. Heads or tails is the outcome of that trial.',
        });
        break;
      }
      case 2: {
        // World 2: Tally Town - Tally Reading & Frequency Tables
        const fives = randInt(rng, 2, 5);
        const rem = randInt(rng, 1, 4);
        const totalTally = fives * 5 + rem;
        questions.push({
          id: `w2-q${i}`,
          qNum: qIndex,
          topicTag: '✦ TALLY CHARTS ✦',
          prompt: `${name} recorded coin flip tallies as ${fives} groups of 5 plus ${rem} extra tally lines. What is the frequency?`,
          visual: { type: 'tally', fives, rem },
          options: [
            { text: `${totalTally}`, isCorrect: true },
            { text: `${fives + rem}`, isCorrect: false },
            { text: `${totalTally + 5}`, isCorrect: false },
            { text: `${fives * 5}`, isCorrect: false },
          ],
          explanation: `Frequency = (${fives} × 5) + ${rem} = ${totalTally}.`,
        });
        break;
      }
      case 3: {
        // World 3: Frequency Falls - Frequency & Total Trials
        const n = pick(rng, [30, 40, 50, 60]);
        const f = randInt(rng, 5, n - 10);
        questions.push({
          id: `w3-q${i}`,
          qNum: qIndex,
          topicTag: '✦ FREQUENCY & TOTAL ✦',
          prompt: `${name} conducted ${n} trials in total and recorded an event frequency of ${f}. What was the total number of trials conducted?`,
          options: [
            { text: `${n}`, isCorrect: true },
            { text: `${f}`, isCorrect: false },
            { text: `${n - f}`, isCorrect: false },
            { text: `${n + f}`, isCorrect: false },
          ],
          explanation: `The total number of trials conducted is N = ${n}. Frequency is the count f = ${f}.`,
        });
        break;
      }
      case 4: {
        // World 4: Relative Bay - f / n as Fraction, Decimal, %
        const n = pick(rng, [20, 25, 40, 50, 100]);
        const f = randInt(rng, 4, n - 4);
        const [num, den] = simplify(f, n);
        const dec = (f / n).toFixed(2);
        const pct = Math.round((f / n) * 100);

        questions.push({
          id: `w4-q${i}`,
          qNum: qIndex,
          topicTag: '✦ RELATIVE FREQUENCY ✦',
          prompt: `${name} rolled a die ${n} times and got a 6 on ${f} rolls. What is the relative frequency of rolling a 6?`,
          options: [
            { text: `${num}/${den} (or ${dec})`, isCorrect: true },
            { text: `${f}/${n - f}`, isCorrect: false },
            { text: `${n}/${f}`, isCorrect: false },
            { text: `${n - f}/${n}`, isCorrect: false },
          ],
          explanation: `Relative Frequency = f ÷ n = ${f} ÷ ${n} = ${num}/${den} = ${dec} (${pct}%).`,
        });
        break;
      }
      case 5: {
        // World 5: Coin Cove - Coin Experiments & Simplifying
        const n = pick(rng, [20, 50, 100]);
        const heads = randInt(rng, 8, n - 8);
        const tails = n - heads;
        const [num, den] = simplify(tails, n);

        questions.push({
          id: `w5-q${i}`,
          qNum: qIndex,
          topicTag: '✦ COIN EXPERIMENTS ✦',
          prompt: `${name} flipped a coin ${n} times and got ${heads} Heads. What is the experimental probability of getting TAILS?`,
          options: [
            { text: `${num}/${den}`, isCorrect: true },
            { text: `${heads}/${n}`, isCorrect: false },
            { text: `${heads}/${tails}`, isCorrect: false },
            { text: `${tails}/${heads}`, isCorrect: false },
          ],
          explanation: `Tails count = ${n} - ${heads} = ${tails}. P(Tails) = ${tails}/${n} = ${num}/${den}.`,
        });
        break;
      }
      case 6: {
        // World 6: Dice Dunes - Dice Experiments & Comparing Faces
        const rolls = 60;
        const countSix = randInt(rng, 8, 16);
        const [num, den] = simplify(countSix, rolls);

        questions.push({
          id: `w6-q${i}`,
          qNum: qIndex,
          topicTag: '✦ DICE EXPERIMENTS ✦',
          prompt: `In ${rolls} die rolls at the Dice Dojo, face 5 appeared ${countSix} times. What is the experimental probability of rolling a 5?`,
          options: [
            { text: `${num}/${den}`, isCorrect: true },
            { text: `${countSix}/6`, isCorrect: false },
            { text: `${rolls - countSix}/${rolls}`, isCorrect: false },
            { text: `1/6`, isCorrect: false },
          ],
          explanation: `Experimental probability uses actual trial data: f ÷ n = ${countSix}/${rolls} = ${num}/${den}.`,
        });
        break;
      }
      case 7: {
        // World 7: Spinner Springs - Spinner & Marble Bags
        const totalDraws = 50;
        const redDraws = randInt(rng, 15, 30);
        const pct = Math.round((redDraws / totalDraws) * 100);

        questions.push({
          id: `w7-q${i}`,
          qNum: qIndex,
          topicTag: '✦ SPINNER & MARBLES ✦',
          prompt: `${name} drew a marble ${totalDraws} times with replacement and got red ${redDraws} times. What percentage of draws were red?`,
          options: [
            { text: `${pct}%`, isCorrect: true },
            { text: `${redDraws}%`, isCorrect: false },
            { text: `${totalDraws - redDraws}%`, isCorrect: false },
            { text: `${pct / 2}%`, isCorrect: false },
          ],
          explanation: `Relative frequency = ${redDraws} ÷ ${totalDraws} = ${redDraws / totalDraws} = ${pct}%.`,
        });
        break;
      }
      case 8: {
        // World 8: Variation Valley - Repeat Experiments & Group Variation
        questions.push({
          id: `w8-q${i}`,
          qNum: qIndex,
          topicTag: '✦ EXPERIMENTAL VARIATION ✦',
          prompt: `${name} flipped a fair coin 10 times and got 8 heads. Maya flipped the same coin 10 times and got 4 heads. Why did their results differ?`,
          options: [
            { text: 'Random chance and variation in short trials', isCorrect: true },
            { text: 'The coin became biased during Alex flips', isCorrect: false },
            { text: 'Maya flipped the coin incorrectly', isCorrect: false },
            { text: 'Fair coins must always give 5 heads', isCorrect: false },
          ],
          explanation: 'Short experiments naturally show random variation. That is completely normal!',
        });
        break;
      }
      case 9: {
        // World 9: Big Numbers Bridge - Law of Large Numbers
        questions.push({
          id: `w9-q${i}`,
          qNum: qIndex,
          topicTag: '✦ LAW OF LARGE NUMBERS ✦',
          prompt: `Which experiment provides a more reliable estimate of a coin's true probability of landing heads?`,
          options: [
            { text: 'Flipping the coin 1,000 times', isCorrect: true },
            { text: 'Flipping the coin 10 times', isCorrect: false },
            { text: 'Flipping the coin 3 times', isCorrect: false },
            { text: 'They are equally reliable', isCorrect: false },
          ],
          explanation: 'As total trials increase, experimental probability settles near the true value (Law of Large Numbers).',
        });
        break;
      }
      case 10: {
        // World 10: Predict Palace - Expected Count P × N & Fairness
        const N = pick(rng, [100, 200, 500]);
        const P = 0.4;
        const expectedCount = Math.round(P * N);

        questions.push({
          id: `w10-q${i}`,
          qNum: qIndex,
          topicTag: '✦ EXPECTED COUNTS ✦',
          prompt: `A carnival game has an experimental win probability of P = 0.40. If ${name} plays ${N} times, how many wins should be expected?`,
          options: [
            { text: `${expectedCount} wins`, isCorrect: true },
            { text: `${N / 2} wins`, isCorrect: false },
            { text: `${expectedCount + 20} wins`, isCorrect: false },
            { text: `${N - expectedCount} wins`, isCorrect: false },
          ],
          explanation: `Expected Count = P × N = 0.40 × ${N} = ${expectedCount} wins.`,
        });
        break;
      }
      default:
        break;
    }

    // Shuffle option choices deterministically
    questions[questions.length - 1].options = shuffle(rng, questions[questions.length - 1].options);
  }

  return questions;
};
