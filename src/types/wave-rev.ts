import { ReactNode } from "react";


export interface WaveRevealProps {
  /**
   * The text to animate
   */
  text: string;

  /**
   * Additional classes for the container
   */
  className?: string;

  /**
   * The direction of the animation
   * @default "down"
   */
  direction?: "up" | "down";

  /**
   * The mode of the animation
   * @default "letter"
   */
  mode?: "letter" | "word";

  /**
   * Duration of the animation
   * E.g. 2000ms
   */
  duration?: string;

  /**
   * If true, the text will apply a blur effect as seen in WWDC.
   */
  blur?: boolean;

  letterClassName?: string;

  /**
   * Delay for each letter/word in ms
   */
  delay?: number;
}
export interface ReducedValue extends Pick<WaveRevealProps, "direction" | "mode"> {
    nodes: ReactNode[];
    offset: number;
    duration: number | string;
    delay: number;
    blur?: boolean;
    className?: string;
    wordsLength: number;
    textLength: number;
  }