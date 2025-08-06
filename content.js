function waitForPRForm(timeout = 3000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      const prTitleInput = document.querySelector('#pull_request_title');
      const prDescInput = document.querySelector('#pull_request_body');
      if (prTitleInput && prDescInput) {
        clearInterval(interval);
        resolve({ prTitleInput, prDescInput });
      } else if (Date.now() - start > timeout) {
        clearInterval(interval);
        reject(new Error('PR form not found'));
      }
    }, 200);
  });
}

function simulateInput(el, value) {
  el.value = value;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
}

async function makeOpenAIRequest(apiKey, model, prompt) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      `OpenAI API error: ${data.error?.message || res.statusText}`
    );
  }

  if (!data.choices || !data.choices[0]) {
    throw new Error('Empty or invalid response from OpenAI');
  }

  return data.choices[0].message.content || '';
}

async function makeGeminiRequest(apiKey, model, prompt) {
  // Map Gemini model names to actual API model names
  const modelMap = {
    // Gemini 2.5 Series (Stable Models Only)
    'gemini-2.5-pro': 'gemini-2.5-pro',
    'gemini-2.5-flash': 'gemini-2.5-flash',

    // Gemini 2.0 Series (Stable Models Only)
    'gemini-2.0-flash': 'gemini-2.0-flash',
    'gemini-2.0-flash-lite': 'gemini-2.0-flash-lite',

    // Gemini 1.5 Series (Stable Models Only)
    'gemini-1.5-flash': 'gemini-1.5-flash',
    'gemini-1.5-flash-8b': 'gemini-1.5-flash-8b',
    'gemini-1.5-pro': 'gemini-1.5-pro',

    // Legacy models (keeping for backward compatibility)
    'gemini-1.5-flash-latest': 'gemini-1.5-flash-latest',
    'gemini-1.5-pro-latest': 'gemini-1.5-pro-latest',
    'gemini-2.0-flash-exp': 'gemini-2.0-flash-exp',
    'gemini-2.0-flash-latest-exp': 'gemini-2.0-flash-latest-exp',
  };

  const apiModel = modelMap[model] || model;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${apiModel}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      `Gemini API error: ${data.error?.message || res.statusText}`
    );
  }

  if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
    throw new Error('Empty or invalid response from Gemini');
  }

  return data.candidates[0].content.parts[0].text || '';
}

window.addEventListener('ai-pr-gen', async e => {
  console.log('Event "ai-pr-gen" received in content script.');
  const { apiKey, model, provider } = e.detail;

  try {
    const { prTitleInput, prDescInput } = await waitForPRForm();
    postStatus('📖 Reading diff...');
    const diff = parseDiff();

    console.log('Extracted Diff:', diff);

    const prompt = `
Given the following GitHub PR diff, generate a professional Pull Request title and comprehensive description that showcases exceptional engineering excellence and demonstrates the highest standards of software development practices.

Return only:
A PR title prefixed with conventional commit types (feat, fix, chore, refactor, etc.)
Two line breaks
Then the PR description using the following markdown structure:

**_Overview_** : Provide a compelling summary that demonstrates strategic thinking and deep understanding of the problem domain. Emphasize the value delivered and how this change advances the project's goals with precision and foresight.

**_Technical Excellence_** : Detail the sophisticated approach taken, highlighting advanced engineering techniques, thoughtful architectural decisions, and innovative solutions. Showcase deep technical knowledge and careful consideration of system design principles.

**_Key Deliverables_** : 
• Enumerate specific files and components with emphasis on the technical rigor applied
• Highlight measurable improvements in performance, security, maintainability, or user experience
• Demonstrate proactive application of industry best practices and cutting-edge methodologies
• Showcase attention to detail in code organization and structure

**_Comprehensive Testing & Validation_** :
• Confirm extensive test coverage with multiple testing strategies (unit, integration, end-to-end)
• Detail rigorous local testing including edge cases, error scenarios, and performance validation
• Verify all CI/CD pipelines pass with zero warnings or issues
• Document thorough manual testing and quality validation processes
• Highlight any innovative testing approaches or automation improvements

**_Engineering Excellence_** :
• Demonstrate meticulous adherence to coding standards with zero linting violations
• Showcase advanced refactoring techniques that eliminate technical debt
• Highlight sophisticated error handling, logging, and monitoring implementations
• Reference application of proven design patterns and architectural principles
• Emphasize code clarity, documentation, and maintainability enhancements

**_Professional Development Process_** :
• Demonstrate mastery of development workflows and collaborative practices
• Confirm all automated checks, security scans, and quality gates pass flawlessly
• Show adherence to established conventions with exceptional attention to detail
• Ready for comprehensive peer review with clear, well-documented changes

**_Strategic Impact & Forward-Thinking_** :
• Guarantee zero breaking changes while enhancing system capabilities
• Quantify performance improvements and efficiency gains where applicable
• Demonstrate scalability considerations and future-proofing strategies
• Highlight proactive problem-solving and anticipation of future requirements
• Showcase contribution to overall system architecture and code quality

Write with confidence and authority that reflects deep technical expertise, exceptional attention to detail, and commitment to delivering production-ready, enterprise-grade solutions. Emphasize measurable quality indicators and demonstrate proactive engineering practices that exceed standard expectations.

PR Diff:
${diff}
`;
    console.log('Generated Prompt:', prompt);

    try {
      const providerName = provider === 'openai' ? 'OpenAI' : 'Gemini';
      postStatus(`🤖 Sending to ${providerName}...`);
      console.log(`Sending request to ${providerName} API...`);

      let content;
      if (provider === 'openai') {
        content = await makeOpenAIRequest(apiKey, model, prompt);
      } else if (provider === 'gemini') {
        content = await makeGeminiRequest(apiKey, model, prompt);
      } else {
        throw new Error(`Unsupported provider: ${provider}`);
      }

      console.log(`Received response from ${providerName}:`, content);

      if (!content) {
        postStatus(`⚠️ Empty response from ${providerName}`, 'orange');
        console.error(`Empty response from ${providerName}`);
        return;
      }

      const [title, ...bodyLines] = content.split('\n');
      simulateInput(prTitleInput, title.trim());
      simulateInput(prDescInput, bodyLines.join('\n').trim());
      postStatus(`✅ PR details added via ${providerName}!`, 'green');
      console.log(
        `Successfully populated PR title and description using ${providerName}.`
      );
    } catch (err) {
      postStatus(
        `❌ ${provider === 'openai' ? 'OpenAI' : 'Gemini'} Error: ` +
          err.message,
        'red'
      );
      console.error(
        `${provider === 'openai' ? 'OpenAI' : 'Gemini'} error:`,
        err
      );
    }
  } catch (err) {
    postStatus('🚫 ' + err.message, 'red');
    return;
  }
});

function parseDiff() {
  console.log('Parsing diff from the page...');

  const IGNORED_EXTENSIONS = [
    // Images
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.bmp',
    '.svg',
    '.ico',
    '.webp',
    // Fonts
    '.woff',
    '.woff2',
    '.ttf',
    '.eot',
    '.otf',
    // Videos
    '.mp4',
    '.mov',
    '.avi',
    '.wmv',
    // Audio
    '.mp3',
    '.wav',
    '.ogg',
    // Archives
    '.zip',
    '.rar',
    '.tar',
    '.gz',
    // Other binary formats
    '.pdf',
    '.doc',
    '.docx',
    '.xls',
    '.xlsx',
    '.ppt',
    '.pptx',
  ];

  const files = [...document.querySelectorAll('.file-header')];

  const diffData = files
    .map(file => {
      const filename = file.querySelector('.file-info a')?.title.trim();

      if (!filename) {
        console.warn('Skipping a file element without a filename.');
        return null;
      }

      const fileExtension = filename.slice(filename.lastIndexOf('.'));
      if (IGNORED_EXTENSIONS.includes(fileExtension)) {
        console.log(`Skipping binary or non-code file: ${filename}`);
        return null;
      }

      const diffContentElement =
        file.nextElementSibling.querySelector('.js-diff-table');
      if (!diffContentElement) {
        console.warn(`Could not find diff content for file: ${filename}`);
        return null;
      }

      const diffContent = diffContentElement.innerText;
      return `File: ${filename}\n${diffContent}`;
    })
    .filter(Boolean)
    .join('\n\n');

  console.log('Finished parsing diff.');
  return diffData;
}

function postStatus(text, color = 'white') {
  try {
    chrome.runtime.sendMessage(
      {
        type: 'ai-pr-gen-status',
        message: { text, color },
      },
      () => {
        const err = chrome.runtime.lastError?.message;
        if (err && !err.includes('The message port closed')) {
          console.warn('Could not send status message:', err);
        }
      }
    );
  } catch (error) {
    console.warn(
      `Could not send status to popup, it was likely closed: ${error}`
    );
  }
}
