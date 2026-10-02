// All structured texts of the site. Longer prose lives in Markdown:
// src/pages/privacy.md and src/data/press/*.md.

export type LaunchStatus = 'announced' | 'preorder' | 'released';

export const app = {
  name: 'Inquizitive',
  tagline: "A fact-checked quiz on anything you're curious about.",
  author: 'Peter Kurzok',
  email: 'inquizitive@peterkurzok.de',
  appStoreId: '6817424653',
  appStoreUrl: 'https://apps.apple.com/app/id6817424653',
  launchDate: '18 October 2026',
  // The one value to change: 'preorder' after App Review, 'released' on launch day.
  status: 'announced' as LaunchStatus,
  badge: {
    preorder: { file: 'app-store-preorder', alt: 'Pre-order on the App Store' },
    released: { file: 'app-store-download', alt: 'Download on the App Store' },
  },
  // While the status is 'announced' the two calls to action are buttons; afterwards they are
  // the App Store badge of the status.
  heroCta: { label: 'Coming 18 October: see it in action', href: '#screenshots' },
  downloadCta: { label: 'Write to me', href: 'mailto:inquizitive@peterkurzok.de' },
  downloadText: {
    announced:
      'Coming to the App Store on 18 October 2026 for iPhone, iPad, Mac and Apple Vision Pro. Free to try with three quizzes; Pro, a one-time purchase, unlocks unlimited quizzes and removes the ads.',
    preorder:
      'Available for pre-order now. It arrives automatically on 18 October 2026 for iPhone, iPad, Mac and Apple Vision Pro. Free to try with three quizzes; Pro, a one-time purchase, unlocks unlimited quizzes and removes the ads.',
    released:
      'Available now on the App Store for iPhone, iPad, Mac and Apple Vision Pro. Free to try with three quizzes; Pro, a one-time purchase, unlocks unlimited quizzes and removes the ads.',
  } as Record<LaunchStatus, string>,
};

// Entries starting with "#" are sections of the homepage.
export const nav = [
  { label: 'Features', href: '#features' },
  { label: 'Screenshots', href: '#screenshots' },
  { label: 'Support', href: '#faq' },
  { label: 'Press', href: '/press/' },
];

export const navCta = { label: 'Get the app', href: '#download' };

// Shown on every page, including the shared-quiz page.
export const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy/' },
  { label: 'Terms of Service', href: 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula' },
];

export const footerLinks = [
  ...legalLinks,
  { label: 'Press Kit', href: '/press/' },
  { label: 'Imprint', href: 'https://apps.peterkurzok.de/imprint' },
  { label: 'More Apps', href: 'https://apps.peterkurzok.de' },
];

export const social = [
  { icon: 'mastodon', label: 'Mastodon', href: 'https://kind.social/@filmaniac' },
  { icon: 'github', label: 'GitHub', href: 'https://github.com/pkurzok' },
] as const;

export const copyright = '© 2026 Peter Kurzok';

export const hero = {
  title: "Ten fact-checked questions on anything you're curious about.",
  subtitle:
    'Type a topic, answer three quick questions, and learn from sources you can check. Native on iPhone, iPad, Mac and Apple Vision Pro.',
  trust: ['No account', 'No tracking', 'Free to try'],
  // A file in src/assets/images/screenshots/.
  image: 'iphone-01-question.jpg',
  imageAlt: 'A quiz question in Inquizitive on iPhone',
};

export const sections = {
  screenshots: {
    title: 'A look inside',
    description: 'Pick a topic, tailor it, and learn from sources you can check.',
  },
  features: {
    title: 'Built to help you remember',
    description: 'A quiz written for you, checked against real sources.',
  },
  requirements: {
    title: 'Requires Apple Intelligence',
    description:
      "Inquizitive writes its quizzes with Apple Intelligence, on Apple's Private Cloud Compute or right on your device.",
  },
  faq: {
    title: 'Support',
    description: 'Something not working, or an idea? Write to inquizitive@peterkurzok.de. I read every message.',
  },
  download: { title: 'Get Inquizitive' },
};

export const features = [
  {
    icon: 'lightbulb',
    title: 'Any topic',
    text: "The solar system, jazz history, Spanish verbs, the city you're visiting next. Answer three quick questions, beginner or expert, broad or deep, and the quiz fits you.",
  },
  {
    icon: 'patch-check',
    title: 'Fact-checked, with sources',
    text: "Questions are researched on Wikipedia, Wiktionary and Wikidata while they're written. Every answer comes with a short explanation and a source you can tap to read more.",
  },
  {
    icon: 'arrow-repeat',
    title: 'Practice what you missed',
    text: 'Retry only the questions you got wrong until they stick. Your best score is kept for every quiz, and your quizzes sync through iCloud.',
  },
  {
    icon: 'laptop',
    title: 'Native on iPhone, iPad, Mac and Vision Pro',
    text: 'One app, built for each device: a sidebar on iPad and Mac, a window of its own on Apple Vision Pro. Quizzes sync between them through iCloud.',
  },
  {
    icon: 'translate',
    title: 'In 17 languages',
    text: "Inquizitive speaks your language, and so do its sources: questions are researched in your language's Wikipedia.",
  },
  {
    icon: 'shield-lock',
    title: 'Private by design',
    text: "No account, no analytics, no tracking. Quizzes are written by Apple Intelligence, on your device or on Apple's Private Cloud Compute.",
  },
] as const;

export const requirements = [
  {
    title: 'Supported devices',
    text: 'iPhone 15 Pro or later, iPad and Mac with M1 or later, and Apple Vision Pro, running iOS, iPadOS, macOS or visionOS 27.',
  },
  {
    title: 'Turn it on',
    text: 'Apple Intelligence must be switched on in Settings → Apple Intelligence & Siri.',
  },
  {
    title: 'Free to try, Pro for more',
    text: 'Your first three quizzes are free. Pro, a one-time purchase of €4.99, unlocks unlimited quizzes and removes the ads on all your devices. No subscription, no account.',
  },
];

export const faq = [
  {
    question: 'Why is New Quiz disabled?',
    answer:
      'Inquizitive needs Apple Intelligence to write quizzes. Check that your device supports it (iPhone 15 Pro or later, iPad or Mac with M1 or later, Apple Vision Pro), that it runs version 27, and that Apple Intelligence is turned on in Settings → Apple Intelligence & Siri. After you turn it on, the model may need a few minutes to download.',
  },
  {
    question: 'Where do the facts come from?',
    answer:
      "When Apple's Private Cloud Compute is available, questions are researched on Wikipedia, Wiktionary and Wikidata while they're written, and each answer shows its sources. On the on-device model, quizzes are written without live research.",
  },
  {
    question: 'How do my quizzes get to my other devices?',
    answer:
      "Through your own private iCloud database. I have no access to it. If you don't use iCloud, your quizzes stay on the device.",
  },
  {
    question: 'What does Pro unlock?',
    answer:
      'Unlimited quizzes and no ads. Your first three quizzes are free; after that, making a new quiz needs Pro. Pro is a one-time purchase of €4.99 (prices vary by country) and works on your iPhone, iPad, Mac and Apple Vision Pro with the same Apple Account.',
  },
  {
    question: 'Do you collect any data about me?',
    answer:
      "No. There's no account, no analytics and no crash reporting, and the app never asks to track you. The free version shows banners for other indie apps from Kickstart Exchange, which counts views and taps per app, never per person or device. The privacy policy sets out exactly what leaves your device and to whom.",
  },
  {
    question: 'What do the tips unlock?',
    answer:
      'Nothing. "Buy me a coffee" and "Buy me lunch" in Settings are optional ways to support development. Pro is the purchase that unlocks unlimited quizzes and removes the ads.',
  },
  {
    question: 'How do I get in touch?',
    answer: 'Write to inquizitive@peterkurzok.de.',
  },
];

// Files in src/assets/images/screenshots/, shared by the homepage carousel and the press
// gallery. `alt` is the short title (carousel, lightbox heading), `caption` the longer line
// under the image in the press gallery.
export const screenshots = [
  {
    file: 'iphone-01-question.jpg',
    alt: 'A smart quiz on any topic',
    caption: 'A smart quiz on any topic',
  },
  {
    file: 'iphone-02-tailor.jpg',
    alt: 'Tailored to you',
    caption: 'Tailored to you: three quick questions set the level and focus',
  },
  {
    file: 'iphone-03-research.jpg',
    alt: 'Fact-checked with Wikipedia',
    caption: 'Fact-checked with Wikipedia while the quiz is written',
  },
  {
    file: 'iphone-04-explanation.jpg',
    alt: "Learn why it's right",
    caption: "Learn why it's right: an explanation and sources for every answer",
  },
  {
    file: 'iphone-05-results.jpg',
    alt: 'Memorize what you missed',
    caption: 'Memorize what you missed',
  },
  {
    file: 'iphone-06-library.jpg',
    alt: 'All your quizzes, synced',
    caption: 'All your quizzes, synced through iCloud',
  },
] as const;

// The press kit. Its longer texts are src/data/press/*.md.
export const press = {
  title: 'Press Kit',
  lead: "Ten fact-checked questions on anything you're curious about, in about a minute, on iPhone, iPad, Mac and Apple Vision Pro. Free to try, with no account; Pro, a one-time purchase, unlocks unlimited quizzes.",
  leadLaunch: {
    announced: 'Launching on the App Store on 18 October 2026.',
    preorder: 'Launching on the App Store on 18 October 2026, available for pre-order now.',
    released: 'Available on the App Store since 18 October 2026.',
  } as Record<LaunchStatus, string>,
  // The ZIP archives are assets of the GitHub release press-kit-en-US; public/_redirects
  // sends the /press/ URLs there. The counts and sizes name what the release holds: update
  // them when the archives are replaced.
  downloads: [
    {
      title: 'Framed screenshots',
      text: '20 captioned images (iPhone, iPad and Mac in Apple device bezels, Vision Pro unframed). ZIP, 7.8\u00a0MB.',
      href: '/press/Inquizitive-Framed-Screenshots-en-US.zip',
      label: 'Download ZIP',
    },
    {
      title: 'Raw screenshots',
      text: '20 unframed full-resolution captures. ZIP, 42\u00a0MB.',
      href: '/press/Inquizitive-Raw-Screenshots-en-US.zip',
      label: 'Download ZIP',
    },
    {
      title: 'App icon',
      text: '1024 × 1024 PNG.',
      href: '/images/app-icon.png',
      label: 'Download PNG',
      download: 'Inquizitive-App-Icon.png',
    },
  ] as { title: string; text: string; href: string; label: string; download?: string }[],
  downloadsNote: "Framed and raw screenshots in the app's other 16 languages are available on request.",
  facts: [
    {
      label: 'Launch',
      value: {
        announced: '18 October 2026 on the App Store',
        preorder: '18 October 2026 on the App Store (available for pre-order now)',
        released: '18 October 2026 on the App Store',
      }[app.status],
    },
    {
      label: 'Price',
      value: 'free to try (three quizzes, with ads); Pro €4.99, one-time, on all platforms; no subscription',
    },
    {
      label: 'Platforms',
      value: 'iPhone and iPad (iOS/iPadOS 27), Mac (macOS 27), Apple Vision Pro (visionOS 27)',
    },
    {
      label: 'Requires Apple Intelligence',
      value:
        'iPhone 15 Pro or later, iPad and Mac with M1 or later, or Apple Vision Pro, with Apple Intelligence turned on',
    },
    {
      label: 'Languages',
      value:
        'English, Chinese (Simplified), Chinese (Traditional), Danish, Dutch, French, German, Italian, Japanese, Korean, Norwegian Bokmål, Portuguese (Brazil), Portuguese (Portugal), Spanish, Swedish, Turkish, Vietnamese',
    },
    // There is no App Store page to link while the app is only announced.
    ...(app.status === 'announced'
      ? []
      : [{ label: 'App Store', value: app.appStoreUrl.replace('https://', ''), href: app.appStoreUrl }]),
    { label: 'Website', value: 'inquizitive.peterkurzok.de', href: 'https://inquizitive.peterkurzok.de' },
    { label: 'Press page', value: 'inquizitive.peterkurzok.de/press/', href: 'https://inquizitive.peterkurzok.de/press/' },
    { label: 'Review access', value: 'TestFlight or a Pro promo code on request' },
  ] as { label: string; value: string; href?: string }[],
  contact: {
    name: 'Peter Kurzok',
    email: app.email,
    // Shown below the address; nothing is shown once the app is released.
    note: {
      announced: 'Review access before launch is available via TestFlight or a Pro promo code on request.',
      preorder: 'Review access before launch is available via TestFlight or a Pro promo code on request.',
      released: null,
    } as Record<LaunchStatus, string | null>,
  },
};

// The paths the sitemap lists. /s/ is not among them: it is noindex.
export const pages = ['/', '/privacy/', '/press/'];
