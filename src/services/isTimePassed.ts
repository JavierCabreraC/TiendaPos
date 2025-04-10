import {TimeSlot} from "@/types/client";


export const isSlotPassed = (slot: TimeSlot, date: string): boolean => {
    const now = new Date();
    const slotDateTime = new Date(`${date} ${slot.start}`);
    return slotDateTime <= now;
};
