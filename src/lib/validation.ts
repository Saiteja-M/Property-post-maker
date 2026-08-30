import { PropertyPost } from "./types";

export interface FormErrors {
  propertyTitle?: string;
  location?: string;
  price?: string;
  highlights?: string;
}

export function validatePost(post: PropertyPost): FormErrors {
  const errors: FormErrors = {};

  if (!post.propertyTitle.trim()) {
    errors.propertyTitle = "Enter the property name so the post has a headline.";
  }

  if (!post.location.trim()) {
    errors.location = "Add a location — buyers filter by area first.";
  }

  if (!post.price.trim()) {
    errors.price = "Add a price, even an approximate range.";
  }

  const highlightLines = post.highlights
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (highlightLines.length === 0) {
    errors.highlights = "Add at least one highlight, one per line.";
  }

  return errors;
}

export function isValid(errors: FormErrors) {
  return Object.keys(errors).length === 0;
}

export function highlightList(highlights: string): string[] {
  return highlights
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 8);
}

export function formatPrice(price: string): string {
  const trimmed = price.trim();
  if (!trimmed) return "";
  if (/[₹$€£]/.test(trimmed)) return trimmed;
  return `₹ ${trimmed}`;
}
