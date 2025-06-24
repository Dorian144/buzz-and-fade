// Twilio service for booking automation
// This file will be used when you integrate Twilio for automated reminders

export interface TwilioConfig {
  accountSid: string;
  authToken: string;
  phoneNumber: string;
}

export interface SMSMessage {
  to: string;
  body: string;
}

export interface CallMessage {
  to: string;
  message: string;
}

// SMS Functions (to be implemented with Twilio SDK)
export const sendSMS = async (config: TwilioConfig, message: SMSMessage) => {
  // TODO: Implement with Twilio SDK
  console.log('SMS would be sent:', message);
  
  // Example implementation:
  // const client = require('twilio')(config.accountSid, config.authToken);
  // return client.messages.create({
  //   body: message.body,
  //   from: config.phoneNumber,
  //   to: message.to
  // });
};

// Voice Call Functions (to be implemented with Twilio SDK)
export const makeCall = async (config: TwilioConfig, call: CallMessage) => {
  // TODO: Implement with Twilio SDK
  console.log('Call would be made:', call);
  
  // Example implementation:
  // const client = require('twilio')(config.accountSid, config.authToken);
  // return client.calls.create({
  //   twiml: `<Response><Say>${call.message}</Say></Response>`,
  //   from: config.phoneNumber,
  //   to: call.to
  // });
};

// Booking Reminder Functions
export const sendBookingReminder = async (booking: any) => {
  const message = `Hi ${booking.name}! This is a reminder for your appointment tomorrow at ${booking.time} for ${booking.service}. Please call us if you need to reschedule.`;
  
  if (booking.phoneNumber) {
    // await sendSMS(twilioConfig, {
    //   to: booking.phoneNumber,
    //   body: message
    // });
    console.log('Reminder SMS would be sent to:', booking.phoneNumber);
  }
};

export const sendBookingConfirmation = async (booking: any) => {
  const message = `Hi ${booking.name}! Your appointment for ${booking.service} on ${booking.date} at ${booking.time} has been confirmed. We look forward to seeing you!`;
  
  if (booking.phoneNumber) {
    // await sendSMS(twilioConfig, {
    //   to: booking.phoneNumber,
    //   body: message
    // });
    console.log('Confirmation SMS would be sent to:', booking.phoneNumber);
  }
};

export const makeConfirmationCall = async (booking: any) => {
  const message = `Hi ${booking.name}, this is Buzz and Cut calling to confirm your appointment for ${booking.service} on ${booking.date} at ${booking.time}. Please press 1 to confirm, 2 to reschedule, or 3 to cancel.`;
  
  if (booking.phoneNumber) {
    // await makeCall(twilioConfig, {
    //   to: booking.phoneNumber,
    //   message: message
    // });
    console.log('Confirmation call would be made to:', booking.phoneNumber);
  }
};

// Utility Functions
export const formatPhoneNumber = (phone: string) => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Add +1 prefix if it's a US number without country code
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  }
  
  // Add + if it doesn't have one
  if (!cleaned.startsWith('+')) {
    return `+${cleaned}`;
  }
  
  return cleaned;
};

export const validatePhoneNumber = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
};

// Scheduled Task Functions (for future cron jobs)
export const sendDailyReminders = async () => {
  // TODO: Implement daily reminder sending
  // This would be called by a cron job or scheduled function
  console.log('Daily reminders would be sent');
};

export const sendWeeklyReports = async () => {
  // TODO: Implement weekly booking reports
  console.log('Weekly reports would be generated');
}; 