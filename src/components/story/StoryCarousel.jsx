import React, { useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { narrate } from '../../utils/audio';
import '../../styles/story.css';

const slidesData = [
  {
    num: 1,
    title: "Alex's Lucky Coin",
    concept: "Trial, Outcome, Event",
    text: "Alex flipped a coin at the Chance Corner carnival booth. Every single flip is called a trial. The result that lands facing up (Heads or Tails) is the outcome!",
    bigQuestion: "What counts as one trial?",
    leoTip: "One flip is one trial. Heads or tails is the outcome.",
    image: "/assets/story/slide1.jpg",
    audioText: "Alex flipped a coin at the Chance Corner carnival booth. Every single flip is called a trial. The outcome is what lands on top: Heads or Tails!"
  },
  {
    num: 2,
    title: "Tally Time",
    concept: "Recording Data with Tallies",
    text: "To keep track of many flips, Maya uses a tally chart. Tallies are grouped in bundles of five (llll) so counting large totals is super fast!",
    bigQuestion: "How do we keep track of many results?",
    leoTip: "Group tallies in fives so counting is fast.",
    image: "/assets/story/slide2.jpg",
    audioText: "To keep track of many flips, Maya uses tallies. Grouping tallies in fives makes counting fast and easy!"
  },
  {
    num: 3,
    title: "What is Frequency?",
    concept: "Frequency = Count of Occurrences",
    text: "Frequency is simply the number of times an event occurred. Alex counted 7 heads out of 10 flips, so the frequency of heads is 7!",
    bigQuestion: "How many heads did we see?",
    leoTip: "Frequency is just a count.",
    image: "/assets/story/slide3.jpg",
    audioText: "Frequency is simply the number of times an event occurred. Alex counted seven heads, so the frequency of heads is seven!"
  },
  {
    num: 4,
    title: "Relative Frequency",
    concept: "Experimental Probability = f ÷ n",
    text: "Relative Frequency is the Experimental Probability! It compares the event frequency (f) to total trials (n). 7 out of 10 is 7/10 = 0.7 = 70%.",
    bigQuestion: "Why compare to the total?",
    leoTip: "7 out of 10 and 70 out of 100 mean different things.",
    image: "/assets/story/slide4.jpg",
    audioText: "Relative frequency is the experimental probability! We calculate it by dividing the frequency by total trials. Seven out of ten is zero point seven or seventy percent."
  },
  {
    num: 5,
    title: "The Dice Booth",
    concept: "Dice Frequencies & Short Experiments",
    text: "At the Dice Dojo booth, Alex rolls a 6-sided die. Short experiments can produce surprising patterns, but over many rolls, every face should appear about equally often!",
    bigQuestion: "Does every face come up equally often?",
    leoTip: "Short experiments can be surprising.",
    image: "/assets/story/slide5.jpg",
    audioText: "At the Dice Dojo, Alex rolls a six-sided die. Short experiments can have surprising results, but every face should come up equally often over time!"
  },
  {
    num: 6,
    title: "Doing It Again",
    concept: "Repeat Experiments & Variation",
    text: "Maya tried 10 flips and got 4 heads, while Alex got 7 heads. Repeat experiments often give different results due to random variation!",
    bigQuestion: "Why did Maya get 4 heads when Alex got 7?",
    leoTip: "Variation is normal.",
    image: "/assets/story/slide6.jpg",
    audioText: "Maya tried ten flips and got four heads, while Alex got seven heads. Repeat experiments often give different results because of random chance!"
  },
  {
    num: 7,
    title: "More Trials, Better Estimates",
    concept: "Law of Large Numbers",
    text: "As trials increase from 10 to 100 to 1,000, the relative frequency settles near a steady true value. More trials give more reliable estimates!",
    bigQuestion: "What happens after 1000 flips?",
    leoTip: "The bigger the sample, the steadier the estimate.",
    image: "/assets/story/slide7.jpg",
    audioText: "As the number of trials increases to one hundred or one thousand, the relative frequency settles near a steady value. This is the Law of Large Numbers!"
  },
  {
    num: 8,
    title: "Predict and Decide",
    concept: "Expected Count ≈ P × N & Fairness",
    text: "We use experimental probability to predict future events. Expected Count = Probability × Total Trials (N). If P(Heads)=0.5, expect 50 heads in 100 flips!",
    bigQuestion: "If we flip 200 times, how many heads should we expect?",
    leoTip: "Predictions are estimates, not promises.",
    image: "/assets/story/slide8.jpg",
    audioText: "We can use experimental probability to predict future outcomes. Expected count equals probability times total trials!"
  }
];

export const StoryCarousel = () => {
  const {
    storyIndex,
    setStoryIndex,
    setPhase,
    markPhaseComplete,
    audioEnabled,
    resetGameProgress
  } = useGameStore();

  const currentSlide = slidesData[storyIndex];

  useEffect(() => {
    if (audioEnabled && currentSlide) {
      narrate(currentSlide.audioText);
    }
  }, [storyIndex, audioEnabled]);

  const handlePrev = () => {
    if (storyIndex > 0) setStoryIndex(storyIndex - 1);
  };

  const handleNext = () => {
    if (storyIndex < slidesData.length - 1) {
      setStoryIndex(storyIndex + 1);
    } else {
      markPhaseComplete('story');
      setPhase('simulate');
    }
  };

  const progressPercent = ((storyIndex + 1) / slidesData.length) * 100;

  return (
    <div className="story-page-bg">
      {/* Background Watermark Numbers (Matching SS layout) */}
      <span className="watermark-text" style={{ top: '8%', left: '12%', fontSize: '72px' }}>100</span>
      <span className="watermark-text" style={{ top: '35%', left: '8%', fontSize: '60px', fontStyle: 'italic' }}>H</span>
      <span className="watermark-text" style={{ bottom: '15%', left: '14%', fontSize: '66px' }}>200</span>
      <span className="watermark-text" style={{ top: '8%', right: '18%', fontSize: '72px' }}>500</span>
      <span className="watermark-text" style={{ top: '26%', right: '9%', fontSize: '68px' }}>347</span>
      <span className="watermark-text" style={{ top: '50%', right: '15%', fontSize: '44px' }}>123</span>
      <span className="watermark-text" style={{ bottom: '18%', right: '20%', fontSize: '76px' }}>999</span>

      {/* Top Story Progress Track Bar */}
      <div className="story-top-progress-container">
        <div className="story-progress-track">
          <div className="story-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="story-progress-text">
          {storyIndex + 1} / {slidesData.length}
        </div>
      </div>

      {/* Main Glassmorphic Story Modal Card */}
      <div className="story-modal-card">
        <div className="story-grid">
          {/* Left Column: Image */}
          <div className="story-image-frame">
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="story-image"
            />
          </div>

          {/* Right Column: Slide Text & Interactive Elements */}
          <div className="story-content-box">
            <h2 className="story-title">{currentSlide.title}</h2>
            <p className="story-text">{currentSlide.text}</p>

            {/* Big Question Pill */}
            <button
              onClick={() => narrate(currentSlide.audioText, true)}
              className="story-question-pill"
              title="Click to replay audio"
            >
              <span>✨</span>
              <span>"{currentSlide.bigQuestion}"</span>
              <span>✨</span>
            </button>

            {/* Leo Tip Speech Pill */}
            <div className="story-tip-pill">
              <div className="story-tip-avatar">🦁</div>
              <span>{currentSlide.leoTip} 🍎</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Controls Bar */}
      <div className="story-controls-bar">
        <button
          disabled={storyIndex === 0}
          onClick={handlePrev}
          className="story-back-btn"
        >
          ← Back
        </button>

        {/* 8 Step Progress Dots */}
        <div className="story-dots-container">
          {slidesData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setStoryIndex(idx)}
              className={`story-dot ${idx === storyIndex ? 'active' : ''}`}
            />
          ))}
        </div>

        <button onClick={handleNext} className="story-next-btn">
          <span>{storyIndex === slidesData.length - 1 ? 'Go to Simulate!' : 'Next'}</span>
          <span>→</span>
        </button>
      </div>

      {/* Footer Reset Progress Button */}
      <button
        onClick={() => {
          if (confirm('Reset lesson progress?')) {
            resetGameProgress();
          }
        }}
        className="wonder-reset-btn"
      >
        Reset Lesson Progress
      </button>
    </div>
  );
};
