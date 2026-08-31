export interface Singer {
  id: string;
  name: string;            // Chinese name e.g. "鄧麗君"
  initial: string;         // First char e.g. "鄧"
  gradientFrom: string;    // CSS/Tailwind color class for background gradient starting
  gradientTo: string;      // CSS/Tailwind color class for background gradient ending
  songCount: number;
}
