# Buzz & Fade Booking System

A comprehensive booking management system for the Buzz & Fade barbershop with admin controls and customer booking interface.

## Features

### Admin Booking Management (`/booking`)
- **Calendar View**: Visual calendar showing all bookings with color coding
  - Green: Confirmed bookings
  - Red: Pending bookings
  - Yellow: Mixed status bookings
- **List View**: Detailed table view with all booking information
- **Booking Management**:
  - Add new bookings
  - Edit existing bookings
  - Delete bookings
  - Toggle booking status (Pending/Confirmed)
  - Mark reminders as sent
- **Customer Information**: Store name, email, phone, service, notes
- **Date Navigation**: Navigate between months and days
- **Real-time Updates**: All changes reflect immediately

### Customer Booking Interface (`/book-now`)
- **User-friendly Form**: Easy-to-use booking form for customers
- **Service Selection**: Predefined list of services
- **Time Slot Selection**: Available time slots throughout the day
- **Form Validation**: Required fields and date restrictions
- **Confirmation Page**: Success message with next steps
- **Responsive Design**: Works on all devices

### Database Structure
Bookings are stored in Firebase Firestore with the following fields:
- `id`: Unique booking identifier
- `name`: Customer name
- `email`: Customer email (optional)
- `phone`: Customer phone number (optional)
- `service`: Selected service
- `dateTime`: Combined date and time (ISO string)
- `confirmed`: Boolean status
- `notes`: Additional notes (optional)
- `createdAt`: Booking creation timestamp
- `reminderSent`: Boolean for reminder tracking
- `reminderDate`: When reminder was sent (optional)

## Setup Instructions

### 1. Firebase Configuration
Ensure your Firebase configuration is set up in `lib/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};
```

### 2. Environment Variables
Create a `.env.local` file with your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Twilio Integration Setup

### 1. Install Twilio SDK
```bash
npm install twilio
```

### 2. Add Twilio Environment Variables
Add to your `.env.local`:
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

### 3. Update Twilio Service
Uncomment and configure the functions in `lib/twilioService.ts`:

```typescript
import twilio from 'twilio';

const client = twilio(config.accountSid, config.authToken);

export const sendSMS = async (config: TwilioConfig, message: SMSMessage) => {
  return client.messages.create({
    body: message.body,
    from: config.phoneNumber,
    to: message.to
  });
};
```

### 4. Automated Reminders
The system is prepared for automated reminders:

- **24-hour reminders**: Send SMS reminders the day before appointments
- **Confirmation calls**: Automated calls to confirm appointments
- **Status updates**: SMS notifications when booking status changes

### 5. Scheduled Tasks
Set up cron jobs or serverless functions to run:
- `sendDailyReminders()`: Daily at 9 AM
- `sendWeeklyReports()`: Weekly on Monday

## Usage

### For Customers
1. Navigate to `/book-now`
2. Fill out the booking form
3. Submit the request
4. Wait for confirmation (within 24 hours)

### For Admins
1. Navigate to `/booking`
2. Use Calendar or List view to manage bookings
3. Click on bookings to edit details
4. Toggle status and mark reminders as sent
5. Add new bookings manually if needed

## Future Enhancements

### Planned Features
- [ ] Email notifications
- [ ] Online payment integration
- [ ] Customer portal for booking management
- [ ] Staff scheduling integration
- [ ] Analytics and reporting dashboard
- [ ] Multi-location support

### Twilio Automation Features
- [ ] Automated confirmation calls
- [ ] SMS reminders and confirmations
- [ ] Voice menu for booking changes
- [ ] Missed appointment follow-ups
- [ ] Customer feedback collection

## API Endpoints

The booking system uses the following Firebase Firestore operations:

- `fetchBookings()`: Get all bookings
- `fetchBookingsByDateRange()`: Get bookings within date range
- `addBooking()`: Create new booking
- `updateBooking()`: Update existing booking
- `deleteBooking()`: Delete booking
- `toggleBookingStatus()`: Change confirmation status
- `markReminderSent()`: Mark reminder as sent

## Security Considerations

- All booking data is stored securely in Firebase
- Phone numbers are validated before storage
- Admin access should be restricted in production
- Consider implementing user authentication for admin access

## Support

For questions or issues with the booking system, refer to the Firebase and Twilio documentation, or contact the development team. 