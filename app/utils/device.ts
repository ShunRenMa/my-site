
export function isDesktopDevice(): boolean {
  return matchMedia('(hover: hover) and (pointer: fine)').matches
}