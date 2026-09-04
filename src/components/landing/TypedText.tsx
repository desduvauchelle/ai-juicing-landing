/** Full text stays available to assistive technology and without JavaScript.
 * Word wrappers preserve natural wrapping while letters animate without reflow.
 */
export function TypedText({ text }: { text: string }) {
  return <span className="typed-text">
    <span className="sr-only">{text}</span>
    <span aria-hidden="true">{text.split(/(\s+)/).map((word, index) => /^\s+$/.test(word) ? word : <span className="typed-word" key={index}>{Array.from(word).map((letter, letterIndex) => <span className="typed-letter" key={letterIndex}>{letter}</span>)}</span>)}</span>
  </span>
}
