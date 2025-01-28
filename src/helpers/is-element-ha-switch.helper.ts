/**
 * Check if the target element is an `ha-switch` element
 * @param targetElement
 * @returns boolean
 */
export const isElementHaSwitch = (targetElement: HTMLInputElement): boolean => {
  return (targetElement.tagName ?? '').toLowerCase() === 'ha-switch';
};
