export type IntroUtilsT = {
  key: string;
  title: string;
  desc: string;
  image: any;
}[];

export const introSlides = (): IntroUtilsT => [
  {
    key: "intro1",
    title: "Tell Us About Your Business",
    desc: "Share your story, location, and what makes your services unique. We'll help you turn that into a beautiful, easy-to-discover profile.",
    image: require("../assets/onBoarding/business/chat.png"),
  },
  {
    key: "intro2",
    title: "Stand Out Online",
    desc: "Upload photos, list your team and services, and create a professional presence clients can trust.",
    image: require("../assets/onBoarding/business/paint.png"),
  },
  {
    key: "intro3",
    title: "Start Accepting Bookings",
    desc: "Your profile is live. Clients can now browse your services and book directly through the app no extra tools needed.",
    image: require("../assets/onBoarding/business/calendar.png"),
  },
];
