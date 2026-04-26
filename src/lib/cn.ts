/**
 * Utility for combining className strings.
 * Filters out falsy values and joins with spaces.
 * @param classes - Strings or falsy values to combine
 * @returns Combined className string
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
	return classes.filter(Boolean).join(' ');
}
