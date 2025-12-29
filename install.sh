#!/bin/bash
set -e

echo "🚀 Installing Kodus CLI..."

# Detect OS
OS="$(uname -s)"
case "${OS}" in
    Linux*)     MACHINE=Linux;;
    Darwin*)    MACHINE=Mac;;
    *)          MACHINE="UNKNOWN:${OS}"
esac

if [ "$MACHINE" = "UNKNOWN:${OS}" ]; then
    echo "❌ Unsupported OS: ${OS}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is required but not installed."
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

# Install globally
echo "📦 Installing @kodus/cli..."
npm install -g @kodus/cli

# Verify installation
if command -v kodus &> /dev/null; then
    echo "✅ Kodus CLI installed successfully!"
    echo ""
    kodus --version
    echo ""
    echo "Get started with: kodus auth login"
else
    echo "❌ Installation failed"
    exit 1
fi

