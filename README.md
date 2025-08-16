# 🤖 AI PR Description Generator

### Problem
I would prefer writing the PR descriptions myself; giving a proper context of the task, decisions and changes. 

But, developers and managers are obsessed with AI adoption for everything. so they would use Github copilot to evalute the work which will evaluate the work based on PR desc.

### Solution
Use GPTs to write a good for nothing, lengthy AI description which gives the idea to the those tools that this is like Grade A work. and I am the best developer.


## ✨ Features

- **🎯 Smart PR Generation**: Automatically analyzes your GitHub diff and generates meaningful PR titles and descriptions
- **🤖 Multiple AI Providers**: Support for both OpenAI GPT models and Google Gemini models
- **📝 Structured Output**: Generates PRs with conventional commit types and organized markdown descriptions
- **🎨 Dark/Light Theme**: Beautiful UI with theme switching capability
- **🔒 Secure**: Your API keys are stored locally and never shared
- **⚡ Fast**: Works instantly on GitHub compare pages
- **📱 Responsive**: Clean, modern interface that works on any screen size
- **🔄 Provider Switching**: Easily switch between OpenAI and Gemini models

### Setup

1. **Get API Keys**

   **For OpenAI:**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy the key (you'll need it for the extension)

   **For Gemini:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key (you'll need it for the extension)

2. **Configure Extension**
   - Click the extension icon in your browser toolbar
   - Click "🔑 Change API Keys"
   - Enter your OpenAI and/or Gemini API keys
   - Click "Close & Save Keys"


## 📖 How to Use

### Generating a PR

1. **Navigate to GitHub**
   - Go to any GitHub repository
   - Create a new pull request or navigate to the compare page
   - Make sure you're on a page with the URL pattern: `https://github.com/*/*/compare/*`

2. **Generate PR Content**
   - Click the AI PR Description Generator extension icon
   - Select your preferred AI model and provider (OpenAI or Gemini)
   - Click "🚀 Generate PR"
   - Wait for the AI to analyze your diff and generate content

3. **Review and Submit**
   - The extension will automatically populate the PR title and description
   - Review the generated content
   - Make any necessary adjustments
   - Submit your pull request!

---
### Supported Models

**🔵 OpenAI Models:**

- **GPT-4o-mini** (Recommended) - Fast and cost-effective
- **GPT-4o** - Latest model with enhanced capabilities
- **GPT-4.1** - High-performance model
- **GPT-3.5-turbo** - Good balance of speed and quality
- **GPT-o1-mini, GPT-o2-mini, GPT-o3-mini, GPT-o4-mini** - Advanced reasoning models
- **GPT-o1, GPT-o2, GPT-o3, GPT-o4** - Full performance models
- **GPT-o3-pro** - Premium multimodal model

### **🟡 Gemini Models:**
**Gemini 2.5 Series:**
- **gemini-2.5-pro** - Enhanced thinking and reasoning, multimodal understanding, advanced coding
- **gemini-2.5-flash** - Adaptive thinking, cost efficiency
**Gemini 2.0 Series:**
- **gemini-2.0-flash** - Next generation features, speed, and realtime streaming
- **gemini-2.0-flash-lite** - Cost efficiency and low latency
**Gemini 1.5 Series:**
- **gemini-1.5-flash** - Fast and versatile performance across diverse tasks
- **gemini-1.5-flash-8b** - High volume and lower intelligence tasks
- **gemini-1.5-pro** - High-quality responses

