import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { format, parseISO } from "date-fns";

export interface Booking {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  service: string;
  dateTime: string;
  confirmed: boolean;
  notes?: string;
  createdAt: string;
  reminderSent?: boolean;
  reminderDate?: string;
}

// Utility function to format dates in dd/mm/yyyy format
export const formatDate = (dateString: string) => {
  try {
    const date = parseISO(dateString);
    return format(date, "dd/MM/yyyy");
  } catch (error) {
    return dateString; // Return original if parsing fails
  }
};

// Utility function to format date and time
export const formatDateTime = (dateString: string) => {
  try {
    const date = parseISO(dateString);
    return format(date, "dd/MM/yyyy h:mm a");
  } catch (error) {
    return dateString; // Return original if parsing fails
  }
};

export const fetchBookings = async () => {
  const ref = collection(db, "bookings");
  const q = query(ref, orderBy("dateTime", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Booking[];
};

export const fetchBookingsByDateRange = async (startDate: string, endDate: string) => {
  const ref = collection(db, "bookings");
  const q = query(
    ref,
    where("dateTime", ">=", startDate),
    where("dateTime", "<=", endDate),
    orderBy("dateTime", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Booking[];
};

export const addBooking = async (form: any) => {
  const ref = collection(db, "bookings");
  await addDoc(ref, {
    name: form.name,
    email: form.email || "",
    phone: form.phone || "",
    service: form.service,
    dateTime: `${form.date}T${form.time}`,
    confirmed: form.status === "Confirmed",
    notes: form.notes || "",
    createdAt: new Date().toISOString(),
    reminderSent: false,
  });
};

export const updateBooking = async (id: string, updates: Partial<Booking>) => {
  const bookingRef = doc(db, "bookings", id);
  await updateDoc(bookingRef, updates);
};

export const deleteBooking = async (id: string) => {
  const bookingRef = doc(db, "bookings", id);
  await deleteDoc(bookingRef);
};

export const toggleBookingStatus = async (id: string, confirmed: boolean) => {
  const bookingRef = doc(db, "bookings", id);
  await updateDoc(bookingRef, { confirmed });
};

export const markReminderSent = async (id: string) => {
  const bookingRef = doc(db, "bookings", id);
  await updateDoc(bookingRef, { 
    reminderSent: true,
    reminderDate: new Date().toISOString()
  });
};
