"use client";

import React, { useState } from "react";
import {
  Heart,
  ArrowLeft,
  ArrowRight,
  Plus,
  Upload,
  X,
  Image as ImageIcon,
  Edit2,
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

type Idea = {
  id: number;
  title: string;
  date: string;
  tags: string[];
  notes?: string;
  images?: string[];
  image?: string;
};

type PastWork = {
  id: number;
  title: string;
  date: string;
  image?: string;
  time?: string;
  notes?: string;
  images?: string[];
};

// Mock data
const mockPastWork: PastWork[] = [
  {
    id: 1,
    title: "Evening Portrait Study",
    date: "2 months ago",
    image:
      "https://images.unsplash.com/photo-1701958213864-2307a737e853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBhaW50aW5nJTIwYXJ0fGVufDF8fHx8MTc2NDc2NjIzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    time: "3 hours",
    notes:
      "Really enjoyed exploring facial proportions and warm lighting. Used a limited palette of burnt sienna, yellow ochre, and ultramarine blue.",
    images: [
      "https://images.unsplash.com/photo-1701958213864-2307a737e853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBhaW50aW5nJTIwYXJ0fGVufDF8fHx8MTc2NDc2NjIzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 2,
    title: "Mountain Landscape",
    date: "1 month ago",
    image:
      "https://images.unsplash.com/photo-1741722604183-7d94a0403152?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGUlMjBwYWludGluZyUyMG1vdW50YWluc3xlbnwxfHx8fDE3NjQ3ODY3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    time: "2 hours",
    notes:
      "Experimented with atmospheric perspective and layering distant mountains. Focused on creating depth through color temperature.",
    images: [
      "https://images.unsplash.com/photo-1741722604183-7d94a0403152?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGUlMjBwYWludGluZyUyMG1vdW50YWluc3xlbnwxfHx8fDE3NjQ3ODY3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 3,
    title: "Watercolor Botanicals",
    date: "3 weeks ago",
    image:
      "https://images.unsplash.com/photo-1700608277871-a16cfe788293?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwZmxvd2VycyUyMGFydHxlbnwxfHx8fDE3NjQ3ODY3MzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    time: "1.5 hours",
    notes:
      "Loose and expressive floral studies. Let the watercolors flow naturally without overthinking.",
    images: [
      "https://images.unsplash.com/photo-1700608277871-a16cfe788293?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwZmxvd2VycyUyMGFydHxlbnwxfHx8fDE3NjQ3ODY3MzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 4,
    title: "Abstract Color Exploration",
    date: "2 weeks ago",
    image:
      "https://images.unsplash.com/photo-1716901548718-da465a9060fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHBhaW50aW5nJTIwY29sb3JmdWx8ZW58MXx8fHwxNzY0NzgxMjIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    time: "4 hours",
    notes:
      "Pure intuitive painting session. Mixed bold colors and let them blend on canvas. Very therapeutic!",
    images: [
      "https://images.unsplash.com/photo-1716901548718-da465a9060fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHBhaW50aW5nJTIwY29sb3JmdWx8ZW58MXx8fHwxNzY0NzgxMjIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 5,
    title: "Figure Drawing Session",
    date: "1 week ago",
    image:
      "https://images.unsplash.com/photo-1547930684-0827d6426281?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWd1cmUlMjBkcmF3aW5nJTIwc2tldGNofGVufDF8fHx8MTc2NDc4MzgzMnww&ixlib=rb-4.1.0&q=80&w=1080",
    time: "2 hours",
    notes:
      "Quick gesture drawings and longer poses. Working on capturing movement and energy in the lines.",
    images: [
      "https://images.unsplash.com/photo-1547930684-0827d6426281?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWd1cmUlMjBkcmF3aW5nJTIwc2tldGNofGVufDF8fHx8MTc2NDc4MzgzMnww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 6,
    title: "Clay Sculpture Experiment",
    date: "4 days ago",
    image:
      "https://images.unsplash.com/photo-1758522277401-5a11fb4499f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3VscHR1cmUlMjBjbGF5JTIwYXJ0fGVufDF8fHx8MTc2NDc4NjczMXww&ixlib=rb-4.1.0&q=80&w=1080",
    time: "5 hours",
    notes:
      "First time working with polymer clay. Challenging but really enjoyed the tactile experience of sculpting in 3D.",
    images: [
      "https://images.unsplash.com/photo-1758522277401-5a11fb4499f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3VscHR1cmUlMjBjbGF5JTIwYXJ0fGVufDF8fHx8MTc2NDc4NjczMXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
];

const initialIdeas: Idea[] = [
  {
    id: 1,
    title: "Try limited 3-color palette challenge",
    date: "3 weeks ago",
    tags: ["technique", "color", "experiment"],
    notes:
      "Inspired by @jameskgurney's color theory videos. Want to try painting with just primary colors + white to understand color mixing better.",
    images: [
      "https://images.unsplash.com/photo-1635722785255-a79d9fd2d2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvciUyMHBhbGV0dGUlMjBzd2F0Y2hlc3xlbnwxfHx8fDE3NjQ3NTc1Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 2,
    title: "Create a ceramic chess set",
    date: "1 month ago",
    tags: ["3D", "craft", "sculpture", "series"],
    notes:
      "Saw an amazing handmade chess set at the local craft fair. Would be a great long-term project to work on piece by piece.",
    images: [
      "https://images.unsplash.com/photo-1758522277401-5a11fb4499f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3VscHR1cmUlMjBjbGF5JTIwYXJ0fGVufDF8fHx8MTc2NDc4NjczMXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 3,
    title: "Urban sketching downtown",
    date: "2 weeks ago",
    tags: ["sketch", "environment", "practice"],
    notes:
      "Want to spend a morning at the coffee shop downtown and sketch the architecture and people watching. Bring watercolors for quick studies.",
    images: [
      "https://images.unsplash.com/photo-1725245828841-6a4aba26f781?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHNrZXRjaGluZyUyMGNpdHlzY2FwZXxlbnwxfHx8fDE3NjQ3ODY3MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 4,
    title: "Still life painting series",
    date: "5 days ago",
    tags: ["still-life", "painting", "lighting", "study"],
    notes:
      "Set up interesting objects with dramatic lighting. Maybe do a series of small studies focusing on different light sources and times of day.",
    images: [
      "https://images.unsplash.com/photo-1582562231447-8afae47fce5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGlsbCUyMGxpZmUlMjBwYWludGluZ3xlbnwxfHx8fDE3NjQ3ODM5MDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 5,
    title: "Charcoal portrait master copy",
    date: "Yesterday",
    tags: ["portrait", "drawing", "study", "realism"],
    notes:
      "Copy a Sargent charcoal portrait to learn his technique. Focus on the economy of line and value structure.",
    images: [
      "https://images.unsplash.com/photo-1599238328044-4b73a6a33d07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyY29hbCUyMGRyYXdpbmclMjBmYWNlfGVufDF8fHx8MTc2NDc4NjczMnww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
];

// Hashtag suggestions
const hashtagSuggestions = [
  // Medium
  "painting",
  "drawing",
  "digital",
  "3D",
  "sculpture",
  "photography",
  "illustration",
  "printmaking",
  "ceramics",
  "textiles",
  // Technique
  "technique",
  "color",
  "composition",
  "perspective",
  "lighting",
  "shading",
  "linework",
  // Subject
  "portrait",
  "landscape",
  "still-life",
  "abstract",
  "figure",
  "character",
  "environment",
  "concept-art",
  // Style
  "realism",
  "impressionism",
  "surrealism",
  "minimalism",
  "pop-art",
  "street-art",
  // Type
  "sketch",
  "study",
  "finished-piece",
  "practice",
  "experiment",
  "series",
  "commission",
  // Other
  "craft",
  "design",
  "animation",
  "mixed-media",
  "personal",
  "inspired-by",
];

const momentumCards = [
  {
    type: "pastWork",
    title: "Remember this?",
    content: "Evening Portrait Study",
    subtitle: "Created 2 months ago",
    detail:
      "You spent 3 hours on this and were in a great flow state.",
    image:
      "https://images.unsplash.com/photo-1701958213864-2307a737e853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBhaW50aW5nJTIwYXJ0fGVufDF8fHx8MTc2NDc2NjIzOXww&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    type: "inspiration",
    title: "You saved this for inspiration",
    content: "@sarahdipity's limited palette portraits",
    subtitle: "Saved 1 week ago",
    detail:
      "You loved how she achieved warmth with just three colors.",
    image:
      "https://images.unsplash.com/photo-1635722785255-a79d9fd2d2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvciUyMHBhbGV0dGUlMjBzd2F0Y2hlc3xlbnwxfHx8fDE3NjQ3NTc1Njh8MA&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    type: "idea",
    title: "From your idea bank:",
    content: "Try limited 3-color palette challenge",
    subtitle: "You saved this idea 3 weeks ago",
    detail: "Still curious about color mixing and temperature?",
    image:
      "https://images.unsplash.com/photo-1635722785255-a79d9fd2d2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvciUyMHBhbGV0dGUlMjBzd2F0Y2hlc3xlbnwxfHx8fDE3NjQ3NTc1Njh8MA&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    type: "connection",
    title: "Here's a connection:",
    content:
      "Your Evening Portrait Study showed your strength with warm tones. What if you explored that same warmth using the 3-color palette technique from @sarahdipity?",
    subtitle: "",
    detail: "",
    image: "",
  },
  {
    type: "prompt",
    title: "Let's create something:",
    content:
      "Try a 30-minute portrait study using only burnt sienna, yellow ochre, and ultramarine blue. Focus on capturing warm skin tones. Don't worry about details—just explore color temperature and value.",
    subtitle: "",
    detail: "",
    image: "",
  },
];

const energyOptions = [
  {
    value: "Low",
    emoji: "🌙",
    helper: "Keep it light and cozy",
    accent: "bg-[#c7e9ff]",
  },
  {
    value: "Medium",
    emoji: "🙂",
    helper: "Steady focus, steady pace",
    accent: "bg-[#ffe27a]",
  },
  {
    value: "High",
    emoji: "⚡",
    helper: "Ready to sprint",
    accent: "bg-[#c1f27b]",
  },
];

function MomentumApp() {
  const [currentScreen, setCurrentScreen] = useState("checkIn");
  const [timeAvailable, setTimeAvailable] = useState(null);
  const [customMinutes, setCustomMinutes] = useState("");
  const [energyLevel, setEnergyLevel] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [heartedCards, setHeartedCards] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);

  // Idea Bank state
  const [ideas, setIdeas] = useState<Idea[]>(initialIdeas);
  const [showNewIdeaModal, setShowNewIdeaModal] =
    useState(false);
  const [newIdeaTitle, setNewIdeaTitle] = useState("");
  const [newIdeaNotes, setNewIdeaNotes] = useState("");
  const [newIdeaTags, setNewIdeaTags] = useState<string[]>([]);
  const [newIdeaImages, setNewIdeaImages] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [showTagSuggestions, setShowTagSuggestions] =
    useState(false);
  const [editingIdeaId, setEditingIdeaId] = useState<number | null>(null);

  // Past Work state
  const [pastWork, setPastWork] = useState<PastWork[]>(mockPastWork);
  const [showNewWorkModal, setShowNewWorkModal] =
    useState(false);
  const [newWorkTitle, setNewWorkTitle] = useState("");
  const [newWorkTime, setNewWorkTime] = useState("");
  const [newWorkImages, setNewWorkImages] = useState<string[]>([]);
  const [editingWorkId, setEditingWorkId] = useState<number | null>(null);

  // Fullscreen image modal
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Convert time string to seconds
  const timeToSeconds = (timeStr: string | null): number => {
    if (timeStr === "15 min") return 15 * 60;
    if (timeStr === "30 min") return 30 * 60;
    if (timeStr === "1+ hour") return 60 * 60;
    if (timeStr === "custom")
      return parseInt(customMinutes) * 60;
    return 0;
  };

  // Format seconds to MM:SS or HH:MM:SS
  type TimeParts = {
    hours: number;
    minutes: number;
    secs: number;
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts: TimeParts = { hours, minutes, secs };

    if (parts.hours > 0) {
      return `${parts.hours.toString().padStart(2, "0")}:${parts.minutes
        .toString()
        .padStart(2, "0")}:${parts.secs.toString().padStart(2, "0")}`;
    }
    return `${parts.minutes.toString().padStart(2, "0")}:${parts.secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Start timer (countdown)
  const startTimer = () => {
    setIsPaused(false);
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerInterval(null);
          // Timer finished!
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimerInterval(interval);
  };

  // Pause timer
  const pauseTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setIsPaused(true);
  };

  // Resume timer
  const resumeTimer = () => {
    startTimer();
  };

  // Stop timer and reset
  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setRemainingSeconds(0);
    setTotalSeconds(0);
    setIsPaused(false);
  };

  // Get motivational message based on countdown number
  const getMotivationalMessage = (count) => {
    const messages = {
      10: "Get ready to create something amazing!",
      9: "Clear your mind...",
      8: "Feel the creative energy...",
      7: "This is your moment!",
      6: "No pressure, just flow...",
      5: "Trust the process...",
      4: "You've got this!",
      3: "Almost there...",
      2: "Take a deep breath...",
      1: "LET'S GO!",
    };
    return messages[count] || "";
  };

  // Idea Bank functions
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setNewIdeaImages([...newIdeaImages, ...imageUrls]);
  };

  const removeImage = (index: number) => {
    setNewIdeaImages(newIdeaImages.filter((_, i) => i !== index));
  };

  const addTag = (tag: string) => {
    if (tag && !newIdeaTags.includes(tag)) {
      setNewIdeaTags([...newIdeaTags, tag]);
      setTagInput("");
      setShowTagSuggestions(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewIdeaTags(newIdeaTags.filter((tag) => tag !== tagToRemove));
  };

  const filteredHashtagSuggestions = tagInput
    ? hashtagSuggestions.filter(
        (tag) =>
          tag.toLowerCase().includes(tagInput.toLowerCase()) &&
          !newIdeaTags.includes(tag),
      )
    : hashtagSuggestions.filter(
        (tag) => !newIdeaTags.includes(tag),
      );

  const saveNewIdea = () => {
    if (!newIdeaTitle.trim()) return;

    const coverImage = newIdeaImages[0];

    const newIdea: Idea = {
      id: ideas.length + 1,
      title: newIdeaTitle,
      date: "Just now",
      tags: newIdeaTags,
      notes: newIdeaNotes,
      images: newIdeaImages,
      image: coverImage,
    };

    setIdeas([newIdea, ...ideas]);

    // Reset form
    setNewIdeaTitle("");
    setNewIdeaNotes("");
    setNewIdeaTags([]);
    setNewIdeaImages([]);
    setTagInput("");
    setShowNewIdeaModal(false);
  };

  // Edit idea functionality
  const openEditIdea = (idea) => {
    setEditingIdeaId(idea.id);
    setNewIdeaTitle(idea.title);
    setNewIdeaNotes(idea.notes || "");
    setNewIdeaTags(idea.tags || []);
    setNewIdeaImages(idea.images || []);
    setShowNewIdeaModal(true);
  };

  const updateIdea = () => {
    if (!newIdeaTitle.trim()) return;

    const updatedIdeas = ideas.map((idea) =>
      idea.id === editingIdeaId
        ? {
            ...idea,
            title: newIdeaTitle,
            notes: newIdeaNotes,
            tags: newIdeaTags,
            images: newIdeaImages,
          }
        : idea,
    );

    setIdeas(updatedIdeas);

    // Reset form
    setNewIdeaTitle("");
    setNewIdeaNotes("");
    setNewIdeaTags([]);
    setNewIdeaImages([]);
    setTagInput("");
    setEditingIdeaId(null);
    setShowNewIdeaModal(false);
  };

  // Delete idea from Idea Bank
  const deleteIdea = (id: number) => {
    const confirmed = window.confirm("Delete this idea?");
    if (!confirmed) return;
    setIdeas(ideas.filter((idea) => idea.id !== id));
  };

  // Past Work functions
  const handleWorkImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) =>
      URL.createObjectURL(file),
    );
    setNewWorkImages([...newWorkImages, ...imageUrls]);
  };

  const removeWorkImage = (index) => {
    setNewWorkImages(
      newWorkImages.filter((_, i) => i !== index),
    );
  };

  const saveNewWork = () => {
    if (!newWorkTitle.trim()) return;

    const coverImage = newWorkImages[0];

    const newWork: PastWork = {
      id: pastWork.length + 1,
      title: newWorkTitle,
      date: "Just now",
      time: newWorkTime,
      images: newWorkImages,
      image: coverImage,
    };

    setPastWork([newWork, ...pastWork]);

    // Reset form
    setNewWorkTitle("");
    setNewWorkTime("");
    setNewWorkImages([]);
    setShowNewWorkModal(false);
  };

  const openEditWork = (work) => {
    setEditingWorkId(work.id);
    setNewWorkTitle(work.title);
    setNewWorkTime(work.time || "");
    setNewWorkImages(work.images || []);
    setShowNewWorkModal(true);
  };

  const updateWork = () => {
    if (!newWorkTitle.trim()) return;

    const coverImage = newWorkImages[0];

    const updatedWork = pastWork.map((work) =>
      work.id === editingWorkId
        ? {
            ...work,
            title: newWorkTitle,
            time: newWorkTime,
            images: newWorkImages,
            image: coverImage,
          }
        : work,
    );

    setPastWork(updatedWork);

    // Reset form
    setNewWorkTitle("");
    setNewWorkTime("");
    setNewWorkImages([]);
    setEditingWorkId(null);
    setShowNewWorkModal(false);
  };

  // Save current project prompt to Ideas and navigate to Ideas page
  const saveCurrentProjectToIdeas = () => {
    const project = momentumCards[4];
    const title = project.content;
    const newIdea = {
      id: ideas.length + 1,
      title,
      date: "Just now",
      tags: ["prompt"],
      notes: "Saved from session prompt",
      images: project.image ? [project.image] : [],
    };

    setIdeas([newIdea, ...ideas]);
    setCurrentScreen("ideaBank");
  };

  // New Work Modal
  const NewWorkModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="duo-panel shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="flex-shrink-0 bg-white border-b border-[#d9f1ba] px-8 py-6 rounded-t-3xl flex justify-between items-center">
          <h2 className="text-[#0f3012] font-extrabold">
            {editingWorkId ? "Edit Work" : "New Work"}
          </h2>
          <button
            onClick={() => {
              setShowNewWorkModal(false);
              setEditingWorkId(null);
              setNewWorkTitle("");
              setNewWorkTime("");
              setNewWorkImages([]);
            }}
            className="text-[#6e7f5b] hover:text-[#0f3012] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-8 py-6 space-y-6 overflow-y-auto flex-1">
          {/* Title */}
          <div>
            <label className="text-[#1f4613] mb-2 block font-semibold">
              Work Title *
            </label>
            <input
              type="text"
              value={newWorkTitle}
              onChange={(e) => setNewWorkTitle(e.target.value)}
              placeholder="e.g., Evening Portrait Study"
              className="w-full py-3 px-4 rounded-xl border-2 border-[#d9f1ba] bg-white focus:border-[#58cc02] focus:outline-none"
              autoFocus
            />
          </div>

          {/* Time */}
          <div>
            <label className="text-[#1f4613] mb-2 block font-semibold">
              Time Spent
            </label>
            <input
              type="text"
              value={newWorkTime}
              onChange={(e) => setNewWorkTime(e.target.value)}
              placeholder="e.g., 3 hours"
              className="w-full py-3 px-4 rounded-xl border-2 border-[#d9f1ba] bg-white focus:border-[#58cc02] focus:outline-none"
            />
          </div>

          {/* Image uploads */}
          <div>
            <label className="text-[#1f4613] mb-2 block font-semibold">
              Images
            </label>

            {/* Image preview grid */}
            {newWorkImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-4">
                {newWorkImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Upload ${index + 1}`}
                      onClick={() => setFullscreenImage(img)}
                      className="w-full h-32 object-cover rounded-xl cursor-pointer hover:animate-pulse transition-all"
                    />
                    <button
                      onClick={() => removeWorkImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload button */}
            <label className="flex items-center justify-center gap-3 py-4 px-4 border-2 border-dashed border-[#b5e58d] rounded-xl hover:border-[#58cc02] hover:bg-[#e7f9c9] transition-all cursor-pointer">
              <ImageIcon size={24} className="text-[#6e7f5b]" />
              <span className="text-[#2f5b19] font-semibold">
                Click to upload images
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleWorkImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 bg-white border-t border-[#d9f1ba] px-8 py-6 rounded-b-3xl flex gap-4">
          <button
            onClick={() => setShowNewWorkModal(false)}
            className="flex-1 py-3 duo-pill duo-secondary hover:-translate-y-0.5 transition-transform"
          >
            Cancel
          </button>
          <button
            onClick={editingWorkId ? updateWork : saveNewWork}
            disabled={!newWorkTitle.trim()}
            className={`flex-1 py-3 duo-pill transition-colors ${
              newWorkTitle.trim()
                ? "duo-cta"
                : "duo-secondary cursor-not-allowed opacity-60"
            }`}
          >
            {editingWorkId ? "Update Work" : "Save Work"}
          </button>
        </div>
      </div>
    </div>
  );

  // New Idea Modal
  const NewIdeaModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="duo-panel shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="flex-shrink-0 bg-white border-b border-[#d9f1ba] px-8 py-6 rounded-t-3xl flex justify-between items-center">
          <h2 className="text-[#0f3012] font-extrabold">
            {editingIdeaId ? "Edit Idea" : "New Idea"}
          </h2>
          <button
            onClick={() => {
              setShowNewIdeaModal(false);
              setEditingIdeaId(null);
              setNewIdeaTitle("");
              setNewIdeaNotes("");
              setNewIdeaTags([]);
              setNewIdeaImages([]);
            }}
            className="text-[#6e7f5b] hover:text-[#0f3012] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-8 py-6 space-y-6 overflow-y-auto flex-1">
          {/* Title */}
          <div>
            <label className="text-[#1f4613] mb-2 block font-semibold">
              Idea Title *
            </label>
            <input
              type="text"
              value={newIdeaTitle}
              onChange={(e) => setNewIdeaTitle(e.target.value)}
              placeholder="e.g., Try watercolor portraits"
              className="w-full py-3 px-4 rounded-xl border-2 border-[#d9f1ba] bg-white focus:border-[#58cc02] focus:outline-none"
              autoFocus
            />
          </div>

          {/* Notes */}
          <div>
            <label className="text-[#1f4613] mb-2 block font-semibold">
              Notes
            </label>
            <textarea
              value={newIdeaNotes}
              onChange={(e) => setNewIdeaNotes(e.target.value)}
              placeholder="Add any thoughts, references, or details about this idea..."
              className="w-full py-3 px-4 rounded-xl border-2 border-[#d9f1ba] bg-white focus:border-[#58cc02] focus:outline-none resize-none"
              rows={4}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-[#1f4613] mb-2 block font-semibold">
              Tags
            </label>
            <div className="space-y-3">
              {/* Selected tags */}
              {newIdeaTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {newIdeaTags.map((tag) => (
                    <span
                      key={tag}
                      className="duo-chip flex items-center gap-2"
                    >
                      #{tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-500 rounded-full"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Tag input */}
              <div className="relative">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => {
                    setTagInput(e.target.value);
                    setShowTagSuggestions(true);
                  }}
                  onFocus={() => setShowTagSuggestions(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && tagInput) {
                      e.preventDefault();
                      addTag(tagInput);
                    }
                  }}
                  placeholder="Type to search or add custom tags..."
                  className="w-full py-3 px-4 rounded-xl border-2 border-[#d9f1ba] bg-white focus:border-[#58cc02] focus:outline-none"
                />

                {/* Tag suggestions dropdown */}
                {showTagSuggestions &&
                  filteredHashtagSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#d9f1ba] rounded-xl shadow-lg max-h-60 overflow-y-auto z-10">
                      <div className="p-2 space-y-1">
                        {filteredHashtagSuggestions
                          .slice(0, 15)
                          .map((tag) => (
                            <button
                              key={tag}
                              onClick={() => addTag(tag)}
                              className="w-full text-left px-3 py-2 hover:bg-[#e7f9c9] rounded-lg text-[#2f5b19] transition-colors font-semibold"
                            >
                              #{tag}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
              </div>
              <p className="text-[#3c6d23]">
                Popular: technique, portrait, digital, sketch,
                experiment
              </p>
            </div>
          </div>

          {/* Image uploads */}
          <div>
            <label className="text-[#1f4613] mb-2 block font-semibold">
              Reference Images
            </label>

            {/* Image preview grid */}
            {newIdeaImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-4">
                {newIdeaImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Upload ${index + 1}`}
                      onClick={() => setFullscreenImage(img)}
                      className="w-full h-32 object-cover rounded-xl cursor-pointer hover:animate-pulse transition-all"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload button */}
            <label className="flex items-center justify-center gap-3 py-4 px-4 border-2 border-dashed border-[#b5e58d] rounded-xl hover:border-[#58cc02] hover:bg-[#e7f9c9] transition-all cursor-pointer">
              <ImageIcon size={24} className="text-[#6e7f5b]" />
              <span className="text-[#2f5b19] font-semibold">
                Click to upload images
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 bg-white border-t border-[#d9f1ba] px-8 py-6 rounded-b-3xl flex gap-4">
          <button
            onClick={() => setShowNewIdeaModal(false)}
            className="flex-1 py-3 duo-pill duo-secondary hover:-translate-y-0.5 transition-transform"
          >
            Cancel
          </button>
          <button
            onClick={editingIdeaId ? updateIdea : saveNewIdea}
            disabled={!newIdeaTitle.trim()}
            className={`flex-1 py-3 duo-pill transition-colors ${
              newIdeaTitle.trim()
                ? "duo-cta"
                : "duo-secondary cursor-not-allowed opacity-60"
            }`}
          >
            {editingIdeaId ? "Update Idea" : "Save Idea"}
          </button>
        </div>
      </div>
    </div>
  );

  // Screen 1: Check In
  const CheckInScreen = () => (
    <div className="min-h-screen duo-hero p-8 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30 duo-dots" />
      <div className="max-w-md w-full duo-panel shadow-xl p-8 space-y-8 duo-glow relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-left">
              <h1 className="text-2xl font-extrabold text-[#0f3012]">
                Welcome back!
              </h1>
            </div>
          </div>
          <div className="duo-chip text-sm">🔥 Streak 7</div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-[#1f4613] font-semibold mb-3">
              How much time do you have?
            </p>
            <div className="grid grid-cols-3 gap-3">
              {["15 min", "30 min", "1+ hour", "custom"].map(
                (time) => (
                  <button
                    key={time}
                    onClick={() => {
                      setTimeAvailable(time);
                      if (time === "custom") {
                        setCustomMinutes("");
                      }
                    }}
                    className={`duo-pill w-full py-3 px-4 border-2 transition-transform duration-200 ${
                      timeAvailable === time
                        ? "duo-cta text-[#0f2b05] scale-105"
                        : "duo-secondary hover:-translate-y-0.5"
                    }`}
                  >
                    {time}
                  </button>
                ),
              )}
            </div>
            {timeAvailable === "custom" && (
              <input
                type="number"
                value={customMinutes}
                onChange={(e) =>
                  setCustomMinutes(e.target.value)
                }
                placeholder="Enter minutes"
                min="1"
                className="w-full mt-3 py-2 px-4 rounded-xl border-2 border-[#d9f1ba] focus:border-[#58cc02] focus:outline-none bg-white"
              />
            )}
          </div>

          <div>
            <p className="text-[#1f4613] font-semibold mb-3">
              What's your energy like?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {energyOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setEnergyLevel(option.value)}
                  aria-pressed={energyLevel === option.value}
                  className={`w-full text-left duo-pill border-2 transition-all duration-300 bg-white shadow-sm hover:-translate-y-0.5 ${
                    energyLevel === option.value
                      ? "border-[#0f94d4] shadow-lg scale-105"
                      : "border-[#9ac45f]"
                  }`}
                >
                  <div
                    className={`w-full h-full ${option.accent} rounded-xl px-4 py-4 flex items-center gap-3 shadow-inner transition-all duration-300 ${
                      energyLevel === option.value ? "scale-[1.015]" : "scale-100"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow">
                      {option.emoji}
                    </div>
                    <div>
                      <p className="text-[#0f3012] font-black text-lg leading-tight">
                        {option.value}
                      </p>
                      <p className="text-[#1f3014] text-sm font-semibold mt-1 leading-snug">
                        {option.helper}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentScreen("momentum")}
            disabled={
              !timeAvailable ||
              !energyLevel ||
              (timeAvailable === "custom" &&
                (!customMinutes ||
                  parseInt(customMinutes) <= 0))
            }
            className={`duo-pill w-full py-4 text-lg transition-all ${
              timeAvailable &&
              energyLevel &&
              !(
                timeAvailable === "custom" &&
                (!customMinutes || parseInt(customMinutes) <= 0)
              )
                ? "duo-cta"
                : "duo-secondary cursor-not-allowed opacity-70"
            }`}
          >
            Let's Build Momentum →
          </button>
        </div>
      </div>
    </div>
  );

  // Screen 2: Build Momentum
  const MomentumScreen = () => {
    const card = momentumCards[currentCard];
    const isHearted = heartedCards.includes(currentCard);

    return (
      <div className="min-h-screen duo-hero p-8 flex items-center justify-center relative">
      <div className="absolute inset-0 pointer-events-none opacity-25 duo-dots" />
      <div className="max-w-lg w-full space-y-4 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setCurrentScreen("checkIn")}
              className="text-[#2f5b19] hover:text-[#0f3012] flex items-center gap-2 font-semibold"
            >
              <ArrowLeft size={20} /> Back
            </button>
            <button
              onClick={() => {
                if (isHearted) {
                  setHeartedCards(
                    heartedCards.filter(
                      (c) => c !== currentCard,
                    ),
                  );
                } else {
                  setHeartedCards([
                    ...heartedCards,
                    currentCard,
                  ]);
                }
              }}
              className={`transition-all ${
                isHearted
                  ? "text-red-500 scale-110"
                  : "text-[#8bbf4a] hover:text-red-500"
              }`}
            >
              <Heart
                size={24}
                fill={isHearted ? "currentColor" : "none"}
              />
            </button>
          </div>

          <div className="duo-panel shadow-2xl p-10 min-h-[300px] flex flex-col justify-center space-y-6">
            {card.image && (
              <div className="text-6xl text-center">
                <ImageWithFallback
                  src={card.image}
                  alt={card.content}
                  onClick={() => setFullscreenImage(card.image)}
                  className="w-24 h-24 object-cover mx-auto rounded-xl shadow-md cursor-pointer hover:animate-pulse transition-all"
                />
              </div>
            )}
            <div className="text-center space-y-4">
              <p className="text-[#1f4613] uppercase tracking-wide font-semibold">
                {card.title}
              </p>
              <p className="text-[#0f3012] leading-relaxed font-semibold text-lg">
                {card.content}
              </p>
              {card.subtitle && (
                <p className="text-[#40632b]">{card.subtitle}</p>
              )}
              {card.detail && (
                <p className="text-[#2f5b19] italic">
                  {card.detail}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 my-6">
            {momentumCards.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === currentCard
                    ? "w-10 bg-[#58cc02]"
                    : "w-2 bg-[#cfeab0]"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() =>
                setCurrentCard(Math.max(0, currentCard - 1))
              }
              disabled={currentCard === 0}
              className={`flex-1 py-3 duo-pill flex items-center justify-center gap-2 border-2 ${
                currentCard === 0
                  ? "duo-secondary cursor-not-allowed opacity-60"
                  : "duo-secondary hover:-translate-y-0.5 transition-transform"
              }`}
            >
              <ArrowLeft size={20} /> Previous
            </button>
            <button
              onClick={() =>
                setCurrentCard(
                  Math.min(
                    momentumCards.length - 1,
                    currentCard + 1,
                  ),
                )
              }
              disabled={
                currentCard === momentumCards.length - 1
              }
              className={`flex-1 py-3 duo-pill flex items-center justify-center gap-2 border-2 ${
                currentCard === momentumCards.length - 1
                  ? "duo-secondary cursor-not-allowed opacity-60"
                  : "duo-secondary hover:-translate-y-0.5 transition-transform"
              }`}
            >
              Next <ArrowRight size={20} />
            </button>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setCurrentScreen("startCreating")}
              className={`duo-pill w-full py-4 transition-all ${
                currentCard >= 3
                  ? "duo-cta"
                  : "duo-secondary opacity-80"
              }`}
            >
              Feeling Ready? Start Creating →
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Screen 3: Start Creating
  const StartCreatingScreen = () => {
    if (countdown !== null) {
      const scale = countdown <= 3 ? "scale-125" : "scale-100";
      const bgColor =
        countdown === 1
          ? "from-[#c6ff8f] to-[#7ae16f]"
          : "from-[#dff9c1] to-[#b6f0ff]";

      return (
        <div
          className={`min-h-screen bg-gradient-to-br ${bgColor} duo-dots flex items-center justify-center transition-all duration-500`}
        >
          <div className="text-center space-y-8 animate-pulse">
            <div
              className={`text-[#58cc02] mb-4 transition-transform duration-300 ${scale}`}
              style={{
                fontSize: countdown <= 3 ? "12rem" : "8rem",
                fontWeight: "bold",
                textShadow:
                  countdown <= 3
                    ? "0 0 30px rgba(168, 85, 247, 0.5)"
                    : "none",
              }}
            >
              {countdown}
            </div>
            <p className="text-gray-700 animate-bounce">
              {getMotivationalMessage(countdown)}
            </p>
            {countdown <= 3 && (
              <div className="text-6xl animate-spin-slow">
                ✨
              </div>
            )}
          </div>
        </div>
      );
    }

    if (isCreating) {
      const progress =
        totalSeconds > 0
          ? ((totalSeconds - remainingSeconds) / totalSeconds) *
            100
          : 0;
      const isLowTime =
        remainingSeconds <= 60 && remainingSeconds > 0;

      return (
        <div className="min-h-screen duo-hero p-8 flex items-center justify-center">
        <div className="max-w-md w-full duo-panel shadow-xl p-8 text-center space-y-6 relative z-10">
            <div className="text-6xl">🎨</div>
            <h2 className="text-[#0f3012] font-extrabold">
              You're creating!
            </h2>
            <div className="relative">
              <div
                className={`transition-colors duration-500 text-4xl font-extrabold ${
                  isLowTime
                    ? "text-[#ff9100] animate-pulse"
                    : "text-[#58cc02]"
                }`}
              >
                {formatTime(remainingSeconds)}
              </div>
              <div className="text-[#2f5b19] mt-1">remaining</div>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-white/70 border border-[#d9f1ba] rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 duo-progress ${
                  isLowTime ? "bg-orange-500" : ""
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[#2f5b19] font-semibold">
              Working on: Portrait study with limited palette
            </p>
            {remainingSeconds === 0 && (
              <div className="text-[#58cc02] animate-bounce font-bold">
                🎉 Time's up! Great work!
              </div>
            )}
            <div className="flex gap-4 pt-4">
              <button
                onClick={isPaused ? resumeTimer : pauseTimer}
                className="flex-1 py-3 duo-pill duo-secondary hover:-translate-y-0.5 transition-transform"
              >
                {isPaused ? "Resume" : "Pause"}
              </button>
              <button
                onClick={() => {
                  stopTimer();
                  setIsCreating(false);
                  setCurrentScreen("checkIn");
                }}
                className="flex-1 py-3 duo-pill duo-cta"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen duo-hero p-8 flex items-center justify-center relative">
      <div className="absolute inset-0 pointer-events-none opacity-25 duo-dots" />
        <div className="max-w-md w-full duo-panel shadow-xl p-8 space-y-6 relative z-10">
          <button
            onClick={() => setCurrentScreen("momentum")}
            className="text-[#2f5b19] hover:text-[#0f3012] flex items-center gap-2 font-semibold"
          >
            <ArrowLeft size={20} /> Back
          </button>

          <div className="text-center">
            <h2 className="text-[#0f3012] mb-4 font-extrabold text-2xl">
              You're ready!
            </h2>
          </div>

          <div className="bg-gradient-to-br from-[#e8f8ff] to-[#f6ffe7] rounded-2xl p-6 border border-[#dff4b4]">
            <p className="text-[#1cb0f6] uppercase tracking-wide mb-2 font-semibold">
              Your Project:
            </p>
            <p className="text-[#0f3012] leading-relaxed font-semibold">
              {momentumCards[4].content}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-[#1f4613] font-semibold">
              Quick prep:
            </p>
            <label className="flex items-center gap-3 text-[#2f5b19] font-medium">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-2 border-[#d9f1ba]"
              />
              Open Procreate/software
            </label>
            <label className="flex items-center gap-3 text-[#2f5b19] font-medium">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-2 border-[#d9f1ba]"
              />
              Gather references
            </label>
            <label className="flex items-center gap-3 text-[#2f5b19] font-medium">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-2 border-[#d9f1ba]"
              />
              Clear your space
            </label>
          </div>

          <div className="pt-4 space-y-3">
            <p className="text-center text-[#2f5b19] font-semibold">
              Ready when you are...
            </p>
            <button
              onClick={() => {
                let count = 10;
                setCountdown(count);
                const interval = setInterval(() => {
                  count--;
                  if (count === 0) {
                    clearInterval(interval);
                    setCountdown(null);
                    setIsCreating(true);
                    setTotalSeconds(
                      timeToSeconds(timeAvailable),
                    );
                    setRemainingSeconds(
                      timeToSeconds(timeAvailable),
                    );
                    startTimer();
                  } else {
                    setCountdown(count);
                  }
                }, 1000);
              }}
              className="w-full py-4 duo-pill duo-cta text-lg"
            >
              Start Session
            </button>
            <button
              onClick={saveCurrentProjectToIdeas}
              className="w-full py-3 duo-pill duo-secondary hover:-translate-y-0.5 transition-transform"
            >
              Save for Later
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Screen 4: Idea Bank
  const IdeaBankScreen = () => (
    <div className="min-h-screen duo-hero p-8 relative">
      <div className="absolute inset-0 pointer-events-none opacity-25 duo-dots" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setCurrentScreen("checkIn")}
            className="text-[#2f5b19] hover:text-[#0f3012] flex items-center gap-2 font-semibold"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <button
            onClick={() => setShowNewIdeaModal(true)}
            className="duo-pill duo-cta px-4 py-2 flex items-center gap-2 text-base"
          >
            <Plus size={20} /> New Idea
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-[#0f3012] text-2xl font-extrabold">
            Your Idea Bank
          </h2>
          <span className="duo-chip text-xs">
            💡 {ideas.length} ideas saved
          </span>
        </div>

        {ideas.length === 0 ? (
          <div className="text-center text-[#6e7f5b] py-12">
            <p>No ideas yet. Click "New Idea" to add one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {ideas.map((idea) => {
              const cover = idea.image || (idea.images && idea.images[0]);
              return (
                <div
                  key={idea.id}
                  className="duo-panel overflow-hidden shadow-md hover:shadow-xl transition-all relative group"
                >
                  {/* Edit button */}
                  <button
                    onClick={() => openEditIdea(idea)}
                    className="absolute top-4 right-10 p-2 bg-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#e6fbce] z-10 border border-[#d9f1ba]"
                  >
                    <Edit2 size={16} className="text-[#2f5b19]" />
                  </button>

                  {/* Delete button */}
                  <button
                    onClick={() => deleteIdea(idea.id)}
                    className="absolute top-4 right-2 p-2 bg-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 z-10 border border-[#d9f1ba]"
                  >
                    <X size={16} className="text-red-500" />
                  </button>

                  <div className="p-4">
                    {/* Cover Image */}
                    {cover && (
                      <ImageWithFallback
                        src={cover}
                        alt={idea.title}
                        onClick={() => setFullscreenImage(cover)}
                        className="w-full h-40 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-all mb-3"
                      />
                    )}

                    <h3 className="text-[#0f3012] mb-2 font-bold">
                      {idea.title}
                    </h3>

                    {idea.notes && (
                      <p className="text-[#2f5b19] text-sm mb-3 line-clamp-2">
                        {idea.notes}
                      </p>
                    )}

                    {/* Tags */}
                    {idea.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {idea.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="duo-chip text-xs">
                            #{tag}
                          </span>
                        ))}
                        {idea.tags.length > 3 && (
                          <span className="text-[#6e7f5b] text-xs">
                            +{idea.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    <p className="text-[#3c6d23] font-semibold text-sm">
                      {idea.date}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  // Screen 5: Past Work
  const PastWorkScreen = () => (
    <div className="min-h-screen duo-hero p-8 relative">
      <div className="absolute inset-0 pointer-events-none opacity-25 duo-dots" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setCurrentScreen("checkIn")}
            className="text-[#2f5b19] hover:text-[#0f3012] flex items-center gap-2 font-semibold"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <button
            onClick={() => {
              // open empty new work modal
              setEditingWorkId(null);
              setNewWorkTitle("");
              setNewWorkTime("");
              setNewWorkImages([]);
              setShowNewWorkModal(true);
            }}
            className="duo-pill duo-cta px-4 py-2 flex items-center gap-2 text-base"
          >
            <Upload size={20} /> Upload
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-[#0f3012] text-2xl font-extrabold">
            Your Past Work
          </h2>
          <span className="duo-chip text-xs">
            🎯 Keep the wins visible
          </span>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {pastWork.map((work) => (
            <div
              key={work.id}
              className="duo-panel overflow-hidden shadow-md hover:shadow-xl transition-all relative group"
            >
              {/* Edit button */}
              <button
                onClick={() => openEditWork(work)}
                className="absolute top-4 right-10 p-2 bg-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#e6fbce] z-200 border border-[#d9f1ba]"
              >
                <Edit2 size={16} className="text-[#2f5b19]" />
              </button>

              <div className="p-4">
                {/* Image */}
                {work.image && (
                  <ImageWithFallback
                    src={work.image}
                    alt={work.title}
                    onClick={() => setFullscreenImage(work.image)}
                    className="w-full h-40 object-cover rounded-xl cursor-pointer hover:animate-pulse transition-all mb-3"
                  />
                )}
                <h3 className="text-[#0f3012] mb-2 font-bold">
                  {work.title}
                </h3>
                <p className="text-[#3c6d23] mb-1 font-semibold text-sm">
                  {work.date}
                </p>
                <p className="text-[#2f5b19] mb-2 font-semibold">
                  Time: {work.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Navigation
  const NavBar = () => (
    <div
      className="fixed left-0 right-0 px-6 z-50 pointer-events-none"
      style={{
        bottom: "max(16px, env(safe-area-inset-bottom, 16px))",
      }}
    >
      <div className="max-w-4xl mx-auto flex justify-around duo-nav px-2 py-1 shadow-2xl pointer-events-auto">
        <button
          onClick={() => setCurrentScreen("checkIn")}
          className={`flex flex-col items-center gap-1 transition-transform ${
            currentScreen === "checkIn"
              ? "active scale-105"
              : "opacity-75"
          }`}
        >
          <div className="text-2xl">🏠</div>
          <span className="">Home</span>
        </button>
        <button
          onClick={() => setCurrentScreen("ideaBank")}
          className={`flex flex-col items-center gap-1 transition-transform ${
            currentScreen === "ideaBank"
              ? "active scale-105"
              : "opacity-75"
          }`}
        >
          <div className="text-2xl">💡</div>
          <span className="">Ideas</span>
        </button>
        <button
          onClick={() => setCurrentScreen("pastWork")}
          className={`flex flex-col items-center gap-1 transition-transform ${
            currentScreen === "pastWork"
              ? "active scale-105"
              : "opacity-75"
          }`}
        >
          <div className="text-2xl">🎨</div>
          <span className="">Work</span>
        </button>
      </div>
    </div>
  );

  const QuickJump = () => (
    <div className="fixed top-4 right-4 z-40 flex gap-2">
      <button
        onClick={() => setCurrentScreen("ideaBank")}
        className="duo-chip bg-white shadow-md hover:shadow-lg transition-all"
      >
        💡 Ideas
      </button>
      <button
        onClick={() => setCurrentScreen("pastWork")}
        className="duo-chip bg-white shadow-md hover:shadow-lg transition-all"
      >
        🎨 Work
      </button>
    </div>
  );

  return (
    <div className="pb-28 duo-shell">
      <QuickJump />
      {currentScreen === "checkIn" && <CheckInScreen />}
      {currentScreen === "momentum" && <MomentumScreen />}
      {currentScreen === "startCreating" && (
        <StartCreatingScreen />
      )}
      {currentScreen === "ideaBank" && <IdeaBankScreen />}
      {currentScreen === "pastWork" && <PastWorkScreen />}
      <NavBar />
      {showNewIdeaModal && <NewIdeaModal />}
      {showNewWorkModal && <NewWorkModal />}
      
      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all"
          >
            <X size={32} />
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen view"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default MomentumApp;
