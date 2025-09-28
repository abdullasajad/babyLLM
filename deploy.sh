#!/bin/bash

# babyLLM Deployment Script
# This script helps you deploy babyLLM to production

set -e

echo "🚀 babyLLM Deployment Script"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git first."
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    print_success "All dependencies are installed!"
}

# Setup environment files
setup_environment() {
    print_status "Setting up environment files..."
    
    # Backend environment
    if [ ! -f "backend/.env" ]; then
        print_status "Creating backend .env file..."
        cat > backend/.env << EOF
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/babyllm
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CORS_ORIGIN=http://localhost:3000
# Optional API keys for full functionality
# BING_SEARCH_API_KEY=your_bing_api_key
# OPENAI_API_KEY=your_openai_api_key
EOF
        print_warning "Please edit backend/.env with your actual values!"
    fi
    
    # Frontend environment
    if [ ! -f "frontend/.env" ]; then
        print_status "Creating frontend .env file..."
        cat > frontend/.env << EOF
EXPO_PUBLIC_API_URL=http://localhost:5000/api
EOF
        print_warning "Please edit frontend/.env with your backend URL!"
    fi
    
    print_success "Environment files created!"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install root dependencies
    if [ -f "package.json" ]; then
        npm install
    fi
    
    # Install backend dependencies
    print_status "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    
    # Install frontend dependencies (if using npm)
    if [ -f "frontend/package.json" ]; then
        print_status "Installing frontend dependencies..."
        cd frontend
        npm install --legacy-peer-deps || npm install --force
        cd ..
    fi
    
    print_success "Dependencies installed!"
}

# Build project
build_project() {
    print_status "Building project..."
    
    # No build step needed for our simple setup
    print_success "Project ready!"
}

# Deploy to Railway (Backend)
deploy_backend() {
    print_status "Deploying backend to Railway..."
    
    if ! command -v railway &> /dev/null; then
        print_warning "Railway CLI not installed. Installing..."
        npm install -g @railway/cli
    fi
    
    print_status "Please login to Railway and deploy manually:"
    echo "1. Run: railway login"
    echo "2. Run: railway up"
    echo "3. Set environment variables in Railway dashboard"
}

# Deploy to Vercel (Frontend)
deploy_frontend() {
    print_status "Deploying frontend to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI not installed. Installing..."
        npm install -g vercel
    fi
    
    print_status "Please login to Vercel and deploy manually:"
    echo "1. Run: vercel login"
    echo "2. Run: cd frontend && vercel --prod"
    echo "3. Set environment variables in Vercel dashboard"
}

# Main deployment function
main() {
    echo
    print_status "Starting babyLLM deployment process..."
    echo
    
    check_dependencies
    setup_environment
    install_dependencies
    build_project
    
    echo
    print_success "Local setup complete!"
    echo
    print_status "Next steps for production deployment:"
    echo "1. Set up MongoDB Atlas database"
    echo "2. Deploy backend to Railway"
    echo "3. Deploy frontend to Vercel"
    echo "4. Update environment variables"
    echo
    print_status "See HOSTING_GUIDE.md for detailed instructions!"
    echo
    
    # Ask if user wants to deploy
    read -p "Do you want to deploy to production now? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        deploy_backend
        echo
        deploy_frontend
    else
        print_status "Deployment skipped. Run this script again when ready!"
    fi
    
    echo
    print_success "🎉 babyLLM deployment script completed!"
    print_status "Your app is ready to be hosted!"
}

# Run main function
main "$@"
