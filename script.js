const ideaInput = document.getElementById('ideaInput');
const output = document.getElementById('output');
const generateBtn = document.getElementById('generateBtn');
const sampleBtn = document.getElementById('sampleBtn');

function cleanText(text) {
  return text.trim().replace(/\s+/g, ' ');
}

function normalizeIdea(idea) {
  return cleanText(idea)
    .replace(/[\s.,;:!?]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripPunctuation(text) {
  return text.replace(/[\s.,;:!?()\[\]{}"']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function makeTitle(idea) {
  const normalized = normalizeIdea(idea);
  const words = stripPunctuation(normalized)
    .split(' ')
    .filter(Boolean)
    .slice(0, 8);
  return capitalize(words.join(' '));
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
  const conciseIdea = stripPunctuation(cleanIdea.toLowerCase());
  const title = makeTitle(cleanIdea);
  const summary = `This concept explores how ${conciseIdea} can create meaningful value for users, teams, or organizations. It focuses on solving a real problem while making the experience practical, efficient, and easy to adopt.`;
  const overview = `At its core, ${conciseIdea} brings together a clear purpose, a thoughtful approach, and a strong user experience. The idea is designed to reduce friction, improve outcomes, and make progress more visible and manageable.`;
  const benefits = [
    'It helps people understand the situation more clearly and act with confidence.',
    'It creates a structure that saves time, reduces confusion, and supports better decisions.',
    'It encourages consistency, innovation, and long-term growth.'
  ];
  const useCases = 'This approach can be useful in startups, classrooms, workplaces, community programs, and personal productivity efforts. In each setting, the goal is the same: turn a single idea into something practical and valuable.';
  const conclusion = `In short, ${conciseIdea} offers a strong foundation for progress. When presented clearly and used thoughtfully, it can inspire action, improve results, and create long-lasting impact.`;

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

