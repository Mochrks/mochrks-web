export interface NavbarVariants {
  top: {
    open: { rotate: string[]; top: string[] };
    closed: { rotate: string[]; top: string[] };
  };
  middle: {
    open: { rotate: string[] };
    closed: { rotate: string[] };
  };
  bottom: {
    open: { rotate: string[]; bottom: string[]; left: string };
    closed: { rotate: string[]; bottom: string[]; left: string };
  };
}
