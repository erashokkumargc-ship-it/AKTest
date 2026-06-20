const ideaInput = document.getElementById('ideaInput');
const output = document.getElementById('output');
const generateBtn = document.getElementById('generateBtn');
const sampleBtn = document.getElementById('sampleBtn');

function cleanText(text) {
  return text.trim().replace(/\s+/g, ' ');
}

function normalizeIdea(idea) {
  return cleanText(idea).replace(/[.,;:!?]+$/g, '').replace(/\s+/g, ' ').trim();
}

function stripPunctuation(text) {
  return text.replace(/[.,;:!?()\[\]{}"']/g, ' ').replace(/\s+/g, ' ').trim();
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function makeTitle(idea) {
  const normalized = normalizeIdea(idea);
  const shortWords = stripPunctuation(normalized)
    .split(' ')
    .filter(Boolean)
    .slice(0, 6);

  if (shortWords.length === 0) {
    return 'One-Line Idea';
  }

  return shortWords.map((word, index) => {
    if (index === 0) return capitalize(word);
    return word;
  }).join(' ');
}

function createSection(title, body) {
  return `
    <section>
      <h3>${title}</h3>
      ${body}
    </section>
  `;
}

function buildDescription(idea) {
  const cleanIdea = normalizeIdea(idea);
  const conciseIdea = stripPunctuation(cleanIdea).toLowerCase();
  const title = makeTitle(cleanIdea);
  const summary = `This concept explores how ${conciseIdea} can create meaningful value for users, teams, and organizations. It focuses on solving a real problem while keeping the experience practical, clear, and easy to adopt.`;
  const overview = `At its core, ${conciseIdea} combines a clear purpose with a thoughtful approach to execution. The idea is designed to reduce confusion, improve outcomes, and help turn a simple concept into something useful and actionable.`;
  const benefits = [
    'It helps people understand the value of the idea quickly and confidently.',
    'It creates a clear structure that saves time and supports better decisions.',
    'It encourages consistency, creativity, and long-term growth.'
  ];
  const useCases = 'This style of description works well for startup pitches, project proposals, educational content, product planning, and internal strategy documents.';
  const conclusion = `In short, ${conciseIdea} offers a strong starting point for progress. When explained clearly, it can inspire action, guide planning, and create lasting impact for the people who use it.`;

  return `
    <h2>${title}</h2>
    <p>${summary}</p>
    ${createSection('Overview', `<p>${overview}</p>`) }
    ${createSection('Key Benefits', `<ul>${benefits.map((item) => `<li>${item}</li>`).join('')}</ul>`) }
    ${createSection('Use Cases', `<p>${useCases}</p>`) }
    ${createSection('Conclusion', `<p>${conclusion}</p>`) }
  `;
}

function renderDescription() {
  const idea = ideaInput.value;
  if (!cleanText(idea)) {
    output.innerHTML = '<p class="placeholder">Please enter a one-line idea to generate a description.</p>';
    return;
  }

  output.innerHTML = buildDescription(idea);
}

generateBtn.addEventListener('click', renderDescription);
sampleBtn.addEventListener('click', () => {
  ideaInput.value = 'A platform that helps small teams manage projects, communication, and deadlines in one place.';
  renderDescription();
});

ideaInput.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    event.preventDefault();
    renderDescription();
  }
});

renderDescription();

