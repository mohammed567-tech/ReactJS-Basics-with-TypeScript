/**
 * Slices the input text to a specified maximum length.
 *
 * This function takes a string `txt` and an optional maximum length `max`.
 * If the length of the string is greater than or equal to `max`, the string is sliced
 * to the specified length. If the length of the string is less than `max`, the original
 * string is returned.
 *
 * @param {string} txt - The input text to be sliced.
 * @param {number} [max=50] - The maximum length of the sliced text. Defaults to 50.
 * @returns {string} The sliced text if its length is greater than or equal to `max`, otherwise the original text.
 */
export function TextSlicer(txt: string, max: number = 50) {
  if (txt.length >= 50) {
    return txt.slice(0, max);
  } else {
    return txt;
  }
}
