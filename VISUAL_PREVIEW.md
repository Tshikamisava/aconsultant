# Visual Preview: Gmail Error Handling

## 🎨 What Users See

### Scenario 1: Normal Operation (Gmail Working)
```
┌─────────────────────────────────────────────────────────┐
│                    Get In Touch                          │
│         Ready to start your next project?                │
└─────────────────────────────────────────────────────────┘

┌──────────────────────┐  ┌──────────────────────┐
│   Contact Form       │  │   Contact Info       │
│                      │  │                      │
│  [Name field]        │  │  📧 Email Us         │
│  [Email field]       │  │  📞 Call Us          │
│  [Message field]     │  │  📍 Visit Us         │
│                      │  │                      │
│  [Send Message] ✓    │  │                      │
└──────────────────────┘  └──────────────────────┘

                    ╔══════════════════════════╗
                    ║ ✅ Message sent          ║
                    ║    successfully!         ║
                    ║                          ║
                    ║ We'll get back to you    ║
                    ║ shortly.                 ║
                    ╚══════════════════════════╝
                         (Green Toast)
```

### Scenario 2: Gmail Authorization Error
```
┌─────────────────────────────────────────────────────────┐
│                    Get In Touch                          │
│         Ready to start your next project?                │
└─────────────────────────────────────────────────────────┘

╔═════════════════════════════════════════════════════════╗
║ ⚠️  Email Service Temporarily Unavailable               ║
║                                                          ║
║ Our email service needs to be reconnected.              ║
║ Please contact us directly:                             ║
║                                                          ║
║ 📧 Email: lhlongwane81@gmail.com (clickable)           ║
║ 📞 Phone: +27 (0) 76 1020 672 (clickable)              ║
║                                                          ║
║ Admin Note: To fix this, go to your EmailJS            ║
║ Dashboard → Email Services → Select your Gmail          ║
║ service → Click "Reconnect" and re-authorize            ║
╚═════════════════════════════════════════════════════════╝
         (Red Alert Banner - Full Width)

┌──────────────────────┐  ┌──────────────────────┐
│   Contact Form       │  │   Contact Info       │
│                      │  │                      │
│  [Name: John]        │  │  📧 Email Us         │
│  [Email: john@..]    │  │  📞 Call Us          │
│  [Message: Help..]   │  │  📍 Visit Us         │
│                      │  │                      │
│  [Send Message]      │  │                      │
└──────────────────────┘  └──────────────────────┘

                    ╔══════════════════════════╗
                    ║ ❌ Gmail authorization   ║
                    ║    expired               ║
                    ║                          ║
                    ║ Please contact us        ║
                    ║ directly at              ║
                    ║ lhlongwane81@gmail.com   ║
                    ║ or call us.              ║
                    ╚══════════════════════════╝
                         (Red Toast - 10s)
```

## 📱 Mobile View

### With Error:
```
┌─────────────────────────┐
│    Get In Touch         │
│                         │
│  ⚠️ Email Service       │
│  Temporarily            │
│  Unavailable            │
│                         │
│  📧 lhlongwane81@...    │
│  📞 +27 (0) 76 1020..   │
│                         │
│  Admin: Reconnect in    │
│  EmailJS Dashboard      │
└─────────────────────────┘

┌─────────────────────────┐
│  Contact Form           │
│  [Name]                 │
│  [Email]                │
│  [Message]              │
│  [Send Message]         │
└─────────────────────────┘

┌─────────────────────────┐
│  📧 Email Us            │
│  📞 Call Us             │
│  📍 Visit Us            │
└─────────────────────────┘
```

## 🎨 Color Scheme

### Alert Banner (Gmail Error):
- Background: Red/Destructive variant
- Border: Darker red
- Icon: AlertCircle (⚠️)
- Links: Underlined, bold
- Admin note: Smaller text, 80% opacity

### Toast Notifications:
- **Success Toast:**
  - Background: Green/Success
  - Icon: ✅
  - Duration: Default (4s)
  
- **Error Toast (Gmail):**
  - Background: Red/Destructive
  - Icon: ❌
  - Duration: 10 seconds (longer to read)
  
- **Error Toast (Other):**
  - Background: Red/Destructive
  - Icon: ❌
  - Duration: 7 seconds

## 💬 Message Variants

### Success:
```
Title: "Message sent successfully!"
Description: "We'll get back to you shortly."
```

### Gmail Auth Error:
```
Title: "Gmail authorization expired"
Description: "Please contact us directly at lhlongwane81@gmail.com or call us."
```

### Generic Error:
```
Title: "Failed to send message"
Description: [Actual error from EmailJS]
```

## 🔍 Console Output

### Success:
```javascript
EmailJS initialized
SUCCESS! 200 OK
```

### Gmail Auth Error:
```javascript
EmailJS initialized
EmailJS error details: {
  error: {...},
  status: 400,
  statusText: "Bad Request",
  message: "Gmail_API: Invalid grant. Please reconnect your Gmail account",
  text: "Gmail_API: Invalid grant. Please reconnect your Gmail account",
  serviceId: "service_f6dfp3s",
  templateId: "template_7g2jvm7",
  origin: "http://localhost:5173"
}
```

## 🎯 User Journey

### Happy Path:
1. User fills form → Clicks send
2. Loading state: "Sending..."
3. Success toast appears (green, 4s)
4. Form resets
5. User sees "Message sent successfully!"

### Error Path (Gmail Auth):
1. User fills form → Clicks send
2. Loading state: "Sending..."
3. Red alert banner slides in (stays until refresh)
4. Error toast appears (red, 10s)
5. Form keeps data (not reset)
6. User clicks email/phone link from banner
7. User contacts directly

### Admin Fix Path:
1. Admin sees error reported
2. Opens GMAIL_RECONNECT_GUIDE.md
3. Goes to EmailJS dashboard
4. Clicks "Reconnect"
5. Authorizes Gmail
6. Tests contact form
7. ✅ Working again!

## 📊 Implementation Details

**React State:**
- `sending: boolean` - Button loading state
- `gmailAuthError: boolean` - Shows/hides alert banner

**Error Detection:**
```typescript
const errorText = error?.text || error?.message || '';
const isGmailAuthError = 
  errorText.includes('Gmail_API') && 
  (errorText.includes('Invalid grant') || 
   errorText.includes('invalid_grant'));
```

**UI Components Used:**
- `Alert` - Red banner at top
- `toast()` - Notification toasts
- `Button` - Submit with loading state
- `Input/Textarea` - Form fields
- `Card` - Layout containers

**Accessibility:**
- Alert has AlertCircle icon
- Links are keyboard navigable
- Toast has proper ARIA labels
- Error messages are screen-reader friendly
- High contrast colors for readability
