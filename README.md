# 📱 Phone Authentication System

A modern, responsive authentication system built with Next.js that implements phone number-based OTP authentication. Features a beautiful glassmorphic UI design and secure authentication flow.

## ✨ Features

### Authentication Flow
- 🔐 Phone number-based authentication
- 📲 OTP verification system
- 🚪 Separate Login & Register flows
- 🛡️ Protected routes with middleware
- 🔄 Token-based session management

### UI/UX
- 🎨 Modern glassmorphic design
- 📱 Responsive layout (mobile-first)
- ⚡ Smooth transitions & animations
- 🎯 Clear user feedback
- ♿ Accessible forms & notifications

### Technical Features
- 🔒 Secure token storage
- 🌐 API integration ready
- 🔄 Fallback offline support
- 🎭 Role-based access control
- 📝 Form validation

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Font**: Inter (Google Fonts)
- **Authentication**: JWT (stored in localStorage)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd phone-auth-system
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3004
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Project Structure

```
phone-auth-system/
├── app/
│   ├── login/
│   │   └── page.js       # Login page
│   ├── register/
│   │   └── page.js       # Registration page
│   ├── verify/
│   │   └── page.js       # OTP verification
│   ├── profile/
│   │   └── page.js       # Protected profile page
│   ├── layout.js         # Root layout
│   └── Toast.js          # Toast notification component
├── public/               # Static assets
├── .env.local           # Environment variables
└── package.json         # Project dependencies
```

## 🔌 API Integration

The system is designed to work with the following API endpoints:

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/send-otp` | Send OTP to mobile | No |
| POST | `/api/auth/verify-otp` | Verify OTP & login | No |
| GET | `/api/auth/profile` | Get user profile | Yes |
| POST | `/api/auth/logout` | Logout user | Yes |

### API Request Examples

#### Send OTP
```javascript
POST /api/auth/send-otp
{
  "phone": "1234567890",
  "action": "login" // or "register"
}
```

#### Verify OTP
```javascript
POST /api/auth/verify-otp
{
  "phone": "1234567890",
  "otp": "123456",
  "action": "login" // or "register"
}
```

## 🔐 Authentication Flow

1. User enters phone number (Login/Register)
2. System sends OTP to phone
3. User verifies OTP
4. System issues JWT token
5. Protected routes check token
6. Profile page shows user data

## 🎨 UI Components

- **Glassmorphic Cards**: Semi-transparent with backdrop blur
- **Gradient Buttons**: Interactive with hover/focus states
- **Toast Notifications**: Non-intrusive feedback
- **Loading States**: Spinners and disabled states
- **Error Messages**: Clear validation feedback

## 📱 Responsive Design

- Mobile-first approach
- Flexible layouts
- Touch-friendly inputs
- Readable typography
- Adaptive spacing

## 🛡️ Security Features

- Input validation
- Protected routes
- Secure token storage
- API error handling
- Session management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
