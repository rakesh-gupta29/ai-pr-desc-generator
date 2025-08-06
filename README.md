# 🤖 AI PR Description Generator

> A powerful browser extension that automatically generates professional Pull Request titles and descriptions using OpenAI's GPT models or Google's Gemini models by analyzing your GitHub diffs.

[![Web Store](https://img.shields.io/badge/Web%20Store-Install-blue?logo=google-chrome)](https://chromewebstore.google.com/detail/github-pr-desc-generator/ajnplipmiafledgelgdajdfepjamafml/reviews) [![SOON]]
[![Version](https://img.shields.io/badge/version-1.5-brightgreen.svg)](https://github.com/rakesh-gupta29/ai-pr-desc-generator)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ Features

- **🎯 Smart PR Generation**: Automatically analyzes your GitHub diff and generates meaningful PR titles and descriptions
- **🤖 Multiple AI Providers**: Support for both OpenAI GPT models and Google Gemini models
- **📝 Structured Output**: Generates PRs with conventional commit types and organized markdown descriptions
- **🎨 Dark/Light Theme**: Beautiful UI with theme switching capability
- **🔒 Secure**: Your API keys are stored locally and never shared
- **⚡ Fast**: Works instantly on GitHub compare pages
- **📱 Responsive**: Clean, modern interface that works on any screen size
- **🔄 Provider Switching**: Easily switch between OpenAI and Gemini models

## 🚀 Quick Start

### Installation

1. **From Web Store** (Soon)
   - Visit the [Web Store](https://chromewebstore.google.com/detail/github-pr-desc-generator/ajnplipmiafledgelgdajdfepjamafml/reviews)
   - Click "Add to Browser"
   - The extension will be installed automatically

2. **Manual Installation** (Development)
   ```bash
   git clone https://github.com/rakesh-gupta29/ai-pr-desc-generator.git
   cd ai-pr-desc-generator
   npm install
   # In your browser:
   # - Go to extensions
   # - Enable developer mode
   # - Click "Load unpacked"
   # - Select the folder containing the extension
   # DONE!
   ```

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

## 🔑 Key Management

The extension provides comprehensive API key management:

### **Adding Keys**

- Click "🔑 Change API Keys" to open the key management panel
- Enter your API keys in the respective input fields
- Use the eye button (👁️) to toggle visibility of your keys
- Click "Close & Save Keys" to save your changes

### **Deleting Keys**

- Click the "🗑️ Delete" button next to any key to remove it
- A confirmation dialog will appear to prevent accidental deletion
- Deleted keys are immediately removed from storage and the UI
- You can always add keys back later

### **Security Features**

- Keys are stored locally in your browser's secure storage
- Keys are masked by default for privacy
- Confirmation dialogs prevent accidental key deletion
- No keys are ever transmitted to external servers except for API calls

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

### Supported Models

**🔵 OpenAI Models:**

- **GPT-4o-mini** (Recommended) - Fast and cost-effective
- **GPT-4o** - Latest model with enhanced capabilities
- **GPT-4.1** - High-performance model
- **GPT-3.5-turbo** - Good balance of speed and quality
- **GPT-o1-mini, GPT-o2-mini, GPT-o3-mini, GPT-o4-mini** - Advanced reasoning models
- **GPT-o1, GPT-o2, GPT-o3, GPT-o4** - Full performance models
- **GPT-o3-pro** - Premium multimodal model

**🟡 Gemini Models:**

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

## 🛠️ Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Modern web browser

### Local Development Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/rakesh-gupta29/ai-pr-desc-generator.git
   cd ai-pr-desc-generator
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Load Extension in Browser**
   - Open your browser and go to the extensions page
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `ai-pr-desc-generator` folder

4. **Development Commands**

   ```bash
   # Format code with Prettier
   npm run format

   # Check formatting without changes
   npm run format:check

   # Lint code
   npm run lint
   ```

### Project Structure
