import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "AI Tutor App",
    desc: "AI-powered personalized learning platform leveraging AI for customized learning paths. Built with a React JS frontend for a seamless, interactive educational experience.",
    tech: ["React JS", "JavaScript", "AI Integration"],
    gradient: "from-primary/20 to-accent/20",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    link: "https://github.com/krishagrawal3503",
    longDesc: "A comprehensive AI-driven educational tool designed to dynamically adapt to a student's learning pace. It assesses real-time performance to generate personalized curriculums and interactive quizzes.",
    challenges: "Integrating real-time AI response systems without introducing high latency. We implemented sophisticated request batching and aggressive edge-caching to perfectly stream educational content.",
    architecture: "Frontend: React.js & Tailwind CSS. AI Core: OpenAI API integration. State Management: Redux for complex lesson tracing."
  },
  {
    title: "Mindful Mate UI",
    desc: "Complete UI/UX design for an AI-powered mental health companion app with chatbot, mood tracking, and psychiatrist access features.",
    tech: ["Figma", "UI/UX", "Prototyping"],
    gradient: "from-accent/20 to-primary/20",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    link: "https://github.com/krishagrawal3503",
    longDesc: "A deeply researched and beautifully crafted UI/UX conceptual design aimed at providing users with a safe, calming, and highly accessible mental health companion environment.",
    challenges: "Designing an interface that feels medical and trustworthy while simultaneously remaining warm, approachable, and devoid of clinical anxiety. Iterated through 30+ color palettes before settling on the perfect ethereal gradient.",
    architecture: "Tools: Figma (Auto-layout, Components, Advanced Prototyping). User Testing: Maze platform for heuristic evaluation."
  },
  {
    title: "AI Attendance System",
    desc: "Web-based AI attendance management system with a fully responsive interface and real-time dashboard.",
    tech: ["React JS", "Python", "AI"],
    gradient: "from-primary/20 to-primary/10",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    link: "https://ai-attendance.netlify.app",
    longDesc: "An automated facial-recognition attendance tracking system built for modern classrooms. It drastically reduces manual overhead by automatically logging students seamlessly via high-speed IP camera streams.",
    challenges: "Optimizing the facial recognition neural network to run efficiently on low-power devices without sacrificing frame-speed or accuracy. We had to build custom quantization scripts for the Python backend.",
    architecture: "Frontend: React.js. Backend: Python (FastAPI). AI Model: OpenCV & Dlib with a customized ResNet architecture."
  },
];

const ProjectCard = ({
  project,
  i,
}: {
  project: (typeof projects)[0];
  i: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: "-50px" });

  // 3D Tilt Effect Setup (subtler for bento)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          ref={cardRef}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 * i, ease: "easeOut" }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className={`relative group bg-card border-b md:border-b-0 md:border-r border-border overflow-hidden block text-left ${project.colSpan} ${project.rowSpan} last:border-r-0`}
        >
          {/* Background Graphic Area */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
            style={{ transform: "translateZ(10px)" }}
          >
            <motion.div
              animate={{ x: hovered ? "100%" : "-100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent -skew-x-12"
            />
          </div>

          <div
            className="relative z-10 p-8 md:p-12 h-full flex flex-col"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {project.title}
              </h3>
              <motion.div
                animate={{ rotate: hovered ? 45 : 0 }}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-background/50 text-muted-foreground group-hover:text-primary group-hover:border-primary transition-colors"
              >
                <ArrowUpRight size={20} />
              </motion.div>
            </div>

            <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-md flex-grow">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 bg-secondary text-secondary-foreground uppercase tracking-wider font-semibold border border-transparent group-hover:border-border transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] bg-card border-border p-0 gap-0 overflow-hidden">
        <div className={`w-full h-32 bg-gradient-to-br ${project.gradient} opacity-20 absolute top-0 left-0 pointer-events-none`} />
        
        <div className="p-6 md:p-8 relative z-10 max-h-[85vh] overflow-y-auto w-full">
          <DialogHeader className="mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {project.tech.map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-full font-medium tracking-wide uppercase">
                  {t}
                </span>
              ))}
            </div>
            <DialogTitle className="font-display text-3xl md:text-5xl font-bold mb-2">
              {project.title}
            </DialogTitle>
            <DialogDescription className="text-base md:text-lg text-muted-foreground max-w-none text-left">
              {project.desc}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-8 mt-8">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Project Overview</h4>
              <p className="text-foreground leading-relaxed">{project.longDesc}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-secondary/30 p-5 rounded-xl border border-border/50">
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Key Challenges</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.challenges}</p>
              </div>
              <div className="bg-secondary/30 p-5 rounded-xl border border-border/50">
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Architecture</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.architecture}</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-[0_0_20px_hsl(199,89%,48%,0.2)]"
              >
                View Live Project <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const inViewRef = useRef(null);
  const inView = useInView(inViewRef, { once: true, margin: "-100px" });

  useGSAP(
    () => {
      // Only apply pinning on larger screens to avoid mobile jank
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: leftColRef.current,
          pinSpacing: false,
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      id="projects"
      className="border-b border-border bg-background relative overflow-hidden"
      ref={containerRef}
    >
      <div className="max-w-[90rem] mx-auto border-x border-border grid grid-cols-1 md:grid-cols-12 relative">
        {/* Left Column - Pinned Title */}
        <div
          ref={leftColRef}
          className="md:col-span-4 p-6 lg:p-10 border-b md:border-b-0 md:border-r border-border h-fit md:h-screen flex flex-col justify-center bg-glass backdrop-blur-md relative z-10"
        >
          <div ref={inViewRef}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-primary font-medium tracking-widest uppercase text-xs mb-4">
                Selected Work
              </p>
              <h2 className="font-display text-4xl md:text-7xl font-bold uppercase leading-[0.9] tracking-tighter text-foreground">
                Built
                <br />
                For
                <br />
                <span className="text-primary">Scale</span>
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Scrolling Content Grid */}
        <div ref={rightColRef} className="md:col-span-8 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
