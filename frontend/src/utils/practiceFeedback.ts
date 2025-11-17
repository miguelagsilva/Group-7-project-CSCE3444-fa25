// Random encouraging feedback messages for practice exercises

export const successMessages = [
  "🎉 Awesome! You're a coding superstar!",
  "⭐ Perfect! You nailed it!",
  "🚀 Amazing work! You're becoming a Python pro!",
  "💯 Excellent! You got it right!",
  "🌟 Fantastic! You're on fire!",
  "🎊 Brilliant! You're a natural coder!",
  "✨ Outstanding! Keep up the great work!",
  "🏆 Incredible! You're crushing it!",
  "💪 You did it! You're a coding champion!",
  "🎯 Perfect execution! You're amazing!",
  "🦸 Superhero coding! You rock!",
  "🎨 Beautiful code! You're an artist!",
  "🔥 You're on a roll! Keep going!",
  "🌈 Wonderful! You're making magic happen!",
  "⚡ Lightning fast and correct! Impressive!",
];

export const partialMessages = [
  "💭 You're close! Check your output carefully.",
  "🔍 Almost there! Take another look at what you printed.",
  "🎯 Good try! Compare your output with the expected result.",
  "🤔 Not quite! Review the instructions and try again.",
  "📝 You're on the right track! Double-check your code.",
  "💡 Good effort! Look at the hints if you need help.",
  "🔄 Try again! You're learning and that's what matters!",
  "🎓 Keep going! Learning takes practice!",
];

export const incorrectMessages = [
  "💭 Hmm, that's not quite right. Want to try again?",
  "🤔 Not quite! Check the example code for guidance.",
  "💡 Give it another shot! Look at the hints below.",
  "🔍 Let's try again! Compare your code with the example.",
  "📚 Take your time! Go back to the code example if you're stuck.",
  "🎯 Keep trying! Every mistake is a step toward learning!",
  "🌱 You're learning! Try reviewing the lesson content.",
  "💪 Don't give up! You can do this!",
];

export const getRandomFeedback = (type: 'success' | 'partial' | 'incorrect'): string => {
  let messages: string[];
  
  switch (type) {
    case 'success':
      messages = successMessages;
      break;
    case 'partial':
      messages = partialMessages;
      break;
    case 'incorrect':
      messages = incorrectMessages;
      break;
    default:
      messages = incorrectMessages;
  }
  
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};