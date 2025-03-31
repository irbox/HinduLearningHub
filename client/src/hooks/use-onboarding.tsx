import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Joyride, { CallBackProps, Step, STATUS } from "react-joyride";

type OnboardingContextType = {
  startTour: (tourName: string) => void;
  endTour: () => void;
  isTourActive: boolean;
  setTourName: (name: string) => void;
  tourName: string;
};

const OnboardingContext = createContext<OnboardingContextType | null>(null);

// Define all the tours available in the application
const tours: Record<string, Step[]> = {
  home: [
    {
      target: ".welcome-card",
      content:
        "Welcome to our Hindu spiritual learning platform. Here you can explore a variety of spiritual content.",
      disableBeacon: true,
      placement: "center",
    },
    {
      target: "header",
      content:
        "Use this navigation menu to explore different sections of our platform.",
      disableBeacon: true,
      placement: "bottom",
    },
    {
      target: ".featured-section",
      content:
        "Discover our featured course designed to help you deepen your spiritual practice.",
      disableBeacon: true,
    },
    {
      target: ".video-section",
      content:
        "Watch lectures from our expert teachers on various spiritual topics.",
      disableBeacon: true,
    },
    {
      target: ".course-section",
      content:
        "Explore comprehensive courses on philosophy, meditation, and scriptures.",
      disableBeacon: true,
    },
  ],
  videos: [
    {
      target: ".video-filters",
      content:
        "Filter videos by different categories to find what interests you.",
      disableBeacon: true,
    },
    {
      target: ".video-card",
      content:
        "Click on any video to watch and learn from our expert teachers.",
      disableBeacon: true,
    },
  ],
  courses: [
    {
      target: ".courses-hero",
      content:
        "Welcome to our spiritual learning path. Here you can find courses on Hindu philosophy, meditation, and more.",
      disableBeacon: true,
      placement: "bottom",
    },
    {
      target: ".featured-courses",
      content:
        "Explore our featured courses specially selected for spiritual seekers.",
      disableBeacon: true,
    },
    {
      target: ".all-courses",
      content:
        "Browse our complete collection of courses to deepen your spiritual knowledge.",
      disableBeacon: true,
    },
    {
      target: ".courses-filters",
      content:
        "Filter courses by different categories such as Philosophy, Scripture, and Practice.",
      disableBeacon: true,
    },
  ],
  materials: [
    {
      target: ".materials-tabs",
      content:
        "Access different types of study materials including texts, audio lectures, and study guides.",
      disableBeacon: true,
    },
    {
      target: ".material-card",
      content:
        "Download or view these materials to deepen your understanding of Hindu spirituality.",
      disableBeacon: true,
    },
    {
      target: ".advanced-search",
      content:
        "Use the advanced search to find specific materials by topic, format, or language.",
      disableBeacon: true,
    },
  ],
  "video-page": [
    {
      target: ".video-player",
      content:
        "Watch the video here. You can control playback and adjust volume.",
      disableBeacon: true,
    },
    {
      target: ".video-transcript",
      content:
        "Read along with the transcript to better understand the teachings.",
      disableBeacon: true,
    },
    {
      target: ".related-videos",
      content: "Explore related videos on similar topics.",
      disableBeacon: true,
    },
  ],
  search: [
    {
      target: ".search-input",
      content:
        "Type keywords to search for videos, courses, and study materials.",
      disableBeacon: true,
    },
    {
      target: ".search-filters",
      content: "Refine your search using these filters.",
      disableBeacon: true,
    },
    {
      target: ".search-results",
      content:
        "Browse through the search results and click on any item to view it.",
      disableBeacon: true,
    },
  ],
};

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [tourName, setTourName] = useState<string>("");
  const [isTourActive, setIsTourActive] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);
  const [runTour, setRunTour] = useState(false);

  // Check localStorage to see if the user has previously seen the tour
  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour");
    if (!hasSeenTour && window.location.pathname === "/") {
      // Automatically start the home tour for first-time visitors
      setTourName("home");
      setIsTourActive(true);
      setRunTour(true);
    }
  }, []);

  // Update steps when tour name changes
  useEffect(() => {
    if (tourName && tours[tourName]) {
      setSteps(tours[tourName]);
      setRunTour(isTourActive);
    } else {
      setSteps([]);
      setRunTour(false);
    }
  }, [tourName, isTourActive]);

  const startTour = (name: string) => {
    setTourName(name);
    setIsTourActive(true);
    setRunTour(true);
  };

  const endTour = () => {
    setIsTourActive(false);
    setRunTour(false);
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setIsTourActive(false);
      setRunTour(false);
      localStorage.setItem("hasSeenTour", "true");
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        startTour,
        endTour,
        isTourActive,
        setTourName,
        tourName,
      }}
    >
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: "#7E57C2", // Match with our primary color
            zIndex: 10000,
          },
          buttonNext: {
            backgroundColor: "#7E57C2",
          },
          buttonBack: {
            color: "#7E57C2",
          },
        }}
      />
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
