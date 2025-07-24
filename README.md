# 📱 Phone Authentication System

A modern, responsive authentication system built with Next.js that implements phone number-based OTP authentication. Features a beautiful glassmorphic UI design and secure authentication flow.

**[🚀 View Live Demo](https://phone-auth-system.netlify.app/)**

## ✨ Features

### Authentication Flow
- 🔐 Phone number-based authentication
- 📲 OTP verification system
- 🚪 Separate Login & Register flows
- 🛡️ Protected routes with middleware (client-side protection implemented)
- 🔄 Token-based session management

### UI/UX
- 🎨 Modern glassmorphic design with a vibrant color palette
- 📱 Responsive layout (mobile-first)
- ⚡ Smooth transitions & animations
- 🎯 Clear user feedback (loading states, errors)
- ♿ Accessible forms & toast notifications for success messages

### Technical Features
- 📝 Comprehensive user registration (Name, Email, Phone)
- 🔒 Secure token storage in `localStorage`
- 🌐 API integration with Axios
- 🔄 Graceful fallback for offline/local development
- 🚀 Seamless navigation between pages using Next.js App Router

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Font**: Inter (from `next/font`)
- **Authentication**: JWT (simulated with a demo token)

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

3. Create a `.env.local` file in the root directory and add your backend API URL:
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
│   │   └── page.js       # OTP verification page
│   ├── profile/
│   │   └── page.js       # Protected profile page
│   ├── layout.js         # Root layout
│   └── Toast.js          # Reusable toast notification component
├── public/               # Static assets
├── .env.local            # Environment variables
└── package.json          # Project dependencies
```

## 🔌 API Integration

The system is designed to work with the following API endpoints:

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/send-otp` | Send OTP to a phone number | No |
| POST | `/api/auth/verify-otp` | Verify OTP & login/register | No |
| GET | `/api/auth/profile` | Get user profile data | Yes |
| POST | `/api/auth/logout` | Invalidate token and logout user | Yes |

### API Request Examples

#### Send OTP (Login)
```javascript
POST /api/auth/send-otp
{
  "phone": "1234567890",
  "action": "login"
}
```

#### Send OTP (Register)
```javascript
POST /api/auth/send-otp
{
  "name": "John Doe",
  "phone": "1234567890",
  "email": "john.doe@example.com",
  "action": "register"
}
```

#### Verify OTP
The payload is the same for both login and register flows.
```javascript
POST /api/auth/verify-otp
{
  "phone": "1234567890",
  "otp": "123456",
  "action": "login" // or "register"
}
```

## 🔐 Authentication Flow

1.  **Welcome Page**: User chooses to Login or Register.
2.  **Register**: User provides Name, Phone, and Email. An OTP is sent.
3.  **Login**: User provides their Phone Number. An OTP is sent.
4.  **Verification**: User enters the 6-digit OTP.
5.  **Token Generation**: On successful verification, the backend issues a JWT token, which is stored in `localStorage`.
6.  **Profile Access**: The user is redirected to the `/profile` page, which is protected. If the token is invalid or missing, the user is redirected back to `/login`.
7.  **Logout**: The user can log out, which clears the token from `localStorage` and invalidates the session on the backend.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

