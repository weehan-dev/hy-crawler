export interface ICrawler {
  id: number;
  name: string;
  activeTotal: number;
  occupied: number;
  available: number;
  usagePercentage: number;
}
