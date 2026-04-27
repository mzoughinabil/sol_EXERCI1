// Updated BulletItem interface and corrected instances to remove isMath

interface BulletItem {
    content: string;
    // Removed isMath property as RichText now parses LaTeX delimiters automatically
}

const bulletItems: BulletItem[] = [
    { content: "This is a bullet item with LaTeX: $E=mc^2$" },
    { content: "Another bullet item with LaTeX: $\frac{a}{b}$" },
    // other items...
];

// ... rest of the file implementation