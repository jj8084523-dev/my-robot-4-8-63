
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { getCourses, type Course } from "@/lib/localStorage";
import SectionHeading from "@/components/ui/SectionHeading";
import ProgramCard from "@/components/ui/ProgramCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import AccessGate from "@/components/ui/AccessGate";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Code, Cpu, Zap } from "lucide-react";

const Index = () => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Load courses from localStorage for featured section
    const savedCourses = getCourses();
    setFeaturedCourses(savedCourses.slice(0, 3)); // Show first 3 courses as featured
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-myrobot-navy to-myrobot-navy/90 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-myrobot-orange blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-myrobot-mint blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-block bg-myrobot-orange/20 text-myrobot-orange px-4 py-2 rounded-full text-sm font-medium mb-4">
                Where Future Engineers Begin
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Building <span className="text-myrobot-orange">Innovators</span> of Tomorrow
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
                Hands-on STEM education for children aged 7-16, focusing on robotics, programming, and engineering through fun, interactive learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/programs">
                  <Button className="btn-primary text-lg px-8 py-6">
                    Explore Programs
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8 py-6">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Children working with robots" 
                className="rounded-lg shadow-2xl floating-element"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <SectionHeading 
            title="Featured Programs" 
            subtitle="Our curriculum is designed to make STEM subjects accessible and exciting through hands-on projects and interactive learning."
            centered={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Static Featured Programs */}
            <ProgramCard 
              title="Robotics Fundamentals"
              description="Children build and program their first robots while learning core engineering concepts."
              icon={<Cpu size={24} />}
              ageGroup="7-9"
              course={{
                id: 1,
                title: "Robotics Fundamentals",
                description: "A fun, hands-on introduction to robotics where children build and program simple robots while learning foundational engineering concepts.",
                ageGroup: "7-9",
                levels: ["Beginner"],
                details: [
                  "Learn basic robot components and functions",
                  "Build simple, programmable robots",
                  "Develop foundational logical thinking",
                  "Work on collaborative building challenges"
                ],
                price: 199,
                duration: "8 weeks",
                schedule: "Sat & Mon, 4-6 PM"
              }}
            />
            <ProgramCard 
              title="Arduino Programming"
              description="Students learn to code and create interactive electronic projects using Arduino."
              icon={<Code size={24} />}
              ageGroup="10-12"
              course={{
                id: 5,
                title: "Arduino Programming",
                description: "Introduction to Arduino microcontrollers where students learn to code and build interactive electronic projects.",
                ageGroup: "10-12",
                levels: ["Beginner", "Intermediate"],
                details: [
                  "Learn C/C++ programming basics",
                  "Build circuits with LEDs, motors, and sensors",
                  "Create interactive electronic projects",
                  "Develop debugging skills"
                ],
                price: 249,
                duration: "10 weeks",
                schedule: "Mon & Wed, 10-12 PM"
              }}
            />
            <ProgramCard 
              title="Advanced Engineering"
              description="Teens tackle complex engineering challenges, designing and building sophisticated robots."
              icon={<Zap size={24} />}
              ageGroup="13-16"
              course={{
                id: 7,
                title: "Advanced Robotics & AI",
                description: "Students design, build, and program sophisticated robots using advanced sensors and artificial intelligence concepts.",
                ageGroup: "13-16",
                levels: ["Advanced"],
                details: [
                  "Design complex robotic systems",
                  "Implement machine learning algorithms",
                  "Work with computer vision",
                  "Participate in robotics competitions"
                ],
                price: 499,
                duration: "16 weeks",
                schedule: "Tue & Thu, 3-5 PM"
              }}
            />
            
            {/* Dynamic Featured Courses from Admin */}
            {featuredCourses.map((course) => (
              <ProgramCard 
                key={course.id}
                title={course.name}
                description={course.description || "Course created by admin"}
                icon={<Cpu size={24} />}
                ageGroup={course.ageRange}
                course={{
                  id: parseInt(course.id),
                  title: course.name,
                  description: course.description || "Course created by admin",
                  ageGroup: course.ageRange,
                  levels: [course.level],
                  details: [
                    "Learn with experienced instructors",
                    "Hands-on practical projects",
                    "Interactive learning environment",
                    "Certificate upon completion"
                  ],
                  price: course.price || 199,
                  duration: "8 weeks",
                  schedule: course.schedule
                }}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/programs">
              <Button className="btn-primary">View All Programs</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <SectionHeading 
            title="Why Choose My Robot Academy?" 
            subtitle="We provide a comprehensive learning experience that combines technology, creativity, and practical skills."
            centered={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center">
              <div className="bg-myrobot-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF8C42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl text-myrobot-navy mb-2">Hands-On Learning</h3>
              <p className="text-myrobot-gray">Practical projects that make abstract concepts tangible and memorable.</p>
            </div>
            
            <div className="card text-center">
              <div className="bg-myrobot-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF8C42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20"></path>
                  <path d="M20 12H4"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl text-myrobot-navy mb-2">Small Class Sizes</h3>
              <p className="text-myrobot-gray">Personalized attention ensures every student gets the support they need.</p>
            </div>
            
            <div className="card text-center">
              <div className="bg-myrobot-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF8C42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
                  <line x1="3" y1="22" x2="21" y2="22"></line>
                </svg>
              </div>
              <h3 className="font-bold text-xl text-myrobot-navy mb-2">Expert Instructors</h3>
              <p className="text-myrobot-gray">Passionate educators with deep technical knowledge and teaching experience.</p>
            </div>
            
            <div className="card text-center">
              <div className="bg-myrobot-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF8C42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl text-myrobot-navy mb-2">Community Focus</h3>
              <p className="text-myrobot-gray">Collaborative environment where students learn teamwork alongside technical skills.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <SectionHeading 
            title="What Parents Say" 
            subtitle="Hear from parents about how our programs have impacted their children's learning and confidence."
            centered={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              content="My son has always been interested in technology, but 'My Robot' has transformed that interest into a passion. The instructors make complex concepts accessible and fun!"
              author="Jennifer L."
              role="Parent of 9-year-old"
            />
            <TestimonialCard 
              content="I was amazed when my daughter built her first Arduino project after just three weeks. The confidence she's gained through these classes has extended to her schoolwork too."
              author="Michael T."
              role="Parent of 12-year-old"
            />
            <TestimonialCard 
              content="The robotics competition team has taught my teenager not just technical skills, but also leadership, collaboration, and how to work under pressure."
              author="Sarah K."
              role="Parent of 15-year-old"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-myrobot-navy to-myrobot-navy/80 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Child's STEM Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Registration is now open for our summer programs. Space is limited, so secure your spot today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/programs">
              <Button className="btn-primary text-lg px-8 py-6">
                Explore Programs
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8 py-6">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
