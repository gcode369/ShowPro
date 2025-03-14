import { supabase } from '../supabase';
import type { Booking } from '../../types/booking';

export class BookingService {
  async createBooking(data: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) {
    const { data: timeSlot, error: slotError } = await supabase
      .from('showing_time_slots')
      .select('current_attendees, max_attendees')
      .eq('id', data.time_slot_id)
      .single();

    if (slotError) throw slotError;

    if (timeSlot.current_attendees + data.attendees > timeSlot.max_attendees) {
      throw new Error('Exceeds maximum attendees limit');
    }

    // Start transaction
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        time_slot_id: data.time_slot_id,
        client_id: data.client_id,
        agent_id: data.agent_id,
        property_id: data.property_id,
        status: 'pending',
        attendees: data.attendees,
        notes: data.notes
      })
      .select()
      .single();

    if (error) throw error;

    // Update time slot
    const { error: updateError } = await supabase
      .from('showing_time_slots')
      .update({
        current_attendees: timeSlot.current_attendees + data.attendees,
        is_booked: timeSlot.current_attendees + data.attendees >= timeSlot.max_attendees
      })
      .eq('id', data.time_slot_id);

    if (updateError) throw updateError;

    return booking;
  }

  async updateBookingStatus(bookingId: string, status: Booking['status']) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export const bookingService = new BookingService();