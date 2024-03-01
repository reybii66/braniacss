
let eventGuid: number = 0;
let todayStr: string = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: Event[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  }
];

export function createEventId(): string {
  return String(eventGuid++);
}

interface Event {
  id: string;
  title: string;
  start: string;
}
