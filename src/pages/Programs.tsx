import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { getCourses, type Course } from "@/lib/localStorage";
import SectionHeading from "@/components/ui/SectionHeading";
import AccessGate from "@/components/ui/AccessGate";
import { Button } from "@/components/ui/button";
import { Cpu, Code, Calculator, Zap, BookOpen, Star } from "lucide-react";
import { Link } from "react-router-dom";
import CourseDetailsDialog from "@/components/programs/CourseDetailsDialog";
import { useLanguage } from "@/contexts/LanguageContext";

const Programs = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { language } = useLanguage();
  const [dynamicPrograms, setDynamicPrograms] = useState<Course[]>([]);

  useEffect(() => {
    // Load courses from localStorage
    const savedCourses = getCourses();
    setDynamicPrograms(savedCourses);
  }, []);

  const ageGroups = [
    { id: "all", label: language === 'en' ? "All Ages" : "جميع الأعمار" },
    { id: "7-9", label: language === 'en' ? "Ages 7-9" : "الأعمار 7-9" },
    { id: "10-12", label: language === 'en' ? "Ages 10-12" : "الأعمار 10-12" },
    { id: "13-16", label: language === 'en' ? "Ages 13-16" : "الأعمار 13-16" }
  ];

  const programsData = [
    {
      id: 1,
      title: language === 'en' ? "Introduction to Robotics" : "مقدمة في الروبوتات",
      description: language === 'en' ? "A fun, hands-on introduction to robotics where children build and program simple robots while learning foundational engineering concepts." : "مقدمة ممتعة وعملية في الروبوتات حيث يقوم الأطفال ببناء وبرمجة روبوتات بسيطة أثناء تعلم مفاهيم الهندسة الأساسية.",
      ageGroup: "7-9",
      icon: <Cpu size={24} />,
      levels: [language === 'en' ? "Beginner" : "مبتدئ"],
      details: language === 'en' ? [
        "Learn basic robot components and functions",
        "Build simple, programmable robots",
        "Develop foundational logical thinking",
        "Work on collaborative building challenges"
      ] : [
        "تعلم مكونات الروبوت الأساسية ووظائفها",
        "بناء روبوتات بسيطة قابلة للبرمجة",
        "تطوير التفكير المنطقي الأساسي",
        "العمل على تحديات البناء التعاوني"
      ],
      price: 199,
      duration: language === 'en' ? "8 weeks" : "8 أسابيع",
      schedule: language === 'en' ? "Sat & Mon, 4-6 PM" : "السبت والاثنين، 4-6 مساءً"
    },
    {
      id: 2,
      title: language === 'en' ? "Block Coding Fundamentals" : "أساسيات البرمجة بالكتل",
      description: language === 'en' ? "Children learn the basics of programming logic through visual block-based coding tools, creating simple games and animations." : "يتعلم الأطفال أساسيات منطق البرمجة من خلال أدوات البرمجة المرئية القائمة على الكتل، وإنشاء ألعاب ورسوم متحركة بسيطة.",
      ageGroup: "7-9",
      icon: <Code size={24} />,
      levels: [language === 'en' ? "Beginner" : "مبتدئ"],
      details: language === 'en' ? [
        "Develop computational thinking skills",
        "Create simple games and animations",
        "Learn about loops, conditions, and variables",
        "Build problem-solving abilities"
      ] : [
        "تطوير مهارات التفكير الحسابي",
        "إنشاء ألعاب ورسوم متحركة بسيطة",
        "تعلم عن الحلقات والشروط والمتغيرات",
        "بناء قدرات حل المشكلات"
      ],
      price: 149,
      duration: language === 'en' ? "6 weeks" : "6 أسابيع",
      schedule: language === 'en' ? "Tue & Thu, 3-5 PM" : "الثلاثاء والخميس، 3-5 مساءً"
    },
    {
      id: 3,
      title: language === 'en' ? "Junior Math Explorers" : "مكتشفون الرياضيات الابتدائية",
      description: language === 'en' ? "Making math fun through hands-on activities, puzzles, and games that reinforce core mathematical concepts." : "جعل الرياضيات ممتعة من خلال الأنشطة العملية، الألغاز، والألعاب التي تؤكد على مفاهيم الرياضيات الأساسية.",
      ageGroup: "7-9",
      icon: <Calculator size={24} />,
      levels: ["Beginner", "Intermediate"],
      details: language === 'en' ? [
        "Strengthen number sense and operations",
        "Explore geometry through hands-on activities",
        "Develop logical reasoning skills",
        "Apply math to real-world situations"
      ] : [
        "تعزيز مهارات القدرة على التعرف على الأعداد والحسابات",
        "استكشاف الهندسة من خلال الأنشطة العملية",
        "تطوير مهارات التفكير المنطقي",
        "تطبيق الرياضيات في الأنشطة العملية"
      ],
      price: 129,
      duration: language === 'en' ? "5 weeks" : "5 أسابيع",
      schedule: language === 'en' ? "Wed & Fri, 10-12 PM" : "الثلاثاء والخميس، 10-12 مساءً"
    },
    {
      id: 4,
      title: language === 'en' ? "Intermediate Robotics" : "الروبوتات المتوسطة",
      description: language === 'en' ? "Students build more complex robots with sensors and advanced programming, tackling real-world engineering challenges." : "يقوم الطلاب بناء روبوتات أكثر صعوبة مع الأجهزة المراقبة والبرمجة المتقدمة، مع حل تحديات الهندسة العملية.",
      ageGroup: "10-12",
      icon: <Cpu size={24} />,
      levels: ["Intermediate"],
      details: language === 'en' ? [
        "Work with sensors and motors",
        "Program autonomous behaviors",
        "Implement basic algorithms",
        "Participate in mini-competitions"
      ] : [
        "عمل مع الأجهزة المراقبة والمحركات",
        "برمجة أفعال مستقلة",
        "تنفيذ أسلوبات بسيطة",
        "المشاركة في مسابقات صغيرة"
      ],
      price: 249,
      duration: language === 'en' ? "10 weeks" : "10 أسابيع",
      schedule: language === 'en' ? "Mon & Wed, 10-12 PM" : "الإثنين والثلاثاء، 10-12 مساءً"
    },
    {
      id: 5,
      title: language === 'en' ? "Arduino Programming" : "برمجة Arduino",
      description: language === 'en' ? "Introduction to Arduino microcontrollers where students learn to code and build interactive electronic projects." : "مقدمة في مراقبات Arduino حيث يتعلم الطلاب كيفية البرمجة وبناء ألعاب إلكترونية مفاعلية.",
      ageGroup: "10-12",
      icon: <Code size={24} />,
      levels: ["Beginner", "Intermediate"],
      details: language === 'en' ? [
        "Learn C/C++ programming basics",
        "Build circuits with LEDs, motors, and sensors",
        "Create interactive electronic projects",
        "Develop debugging skills"
      ] : [
        "تعلم أساسيات البرمجة C/C++",
        "بناء صياغات معروفة باستخدام ألوان LED، محركات، وأجهزة المراقبة",
        "إنشاء ألعاب إلكترونية مفاعلية",
        "تطوير مهارات التتبع"
      ],
      price: 249,
      duration: language === 'en' ? "10 weeks" : "10 أسابيع",
      schedule: language === 'en' ? "Mon & Wed, 10-12 PM" : "الإثنين والثلاثاء، 10-12 مساءً"
    },
    {
      id: 6,
      title: language === 'en' ? "Applied Mathematics" : "رياضيات التطبيقية",
      description: language === 'en' ? "Connecting mathematical concepts to real-world applications through interactive projects and problem-solving." : "ربط مفاهيم الرياضيات مع التطبيقات العملية من خلال الأنشطة التفاعلية والحلول.",
      ageGroup: "10-12",
      icon: <Calculator size={24} />,
      levels: ["Intermediate"],
      details: language === 'en' ? [
        "Apply algebra to programming challenges",
        "Use geometry in design and construction",
        "Learn data analysis and visualization",
        "Explore mathematical modeling"
      ] : [
        "تطبيق الجبر في تحديات البرمجة",
        "استخدام الهندسة في تصميم وبناء",
        "تعلم التحليل الإحصائي والعرض",
        "استكشاف مدل الرياضيات"
      ],
      price: 199,
      duration: language === 'en' ? "8 weeks" : "8 أسابيع",
      schedule: language === 'en' ? "Sat & Mon, 4-6 PM" : "السبت والاثنين، 4-6 مساءً"
    },
    {
      id: 7,
      title: language === 'en' ? "Advanced Robotics & AI" : "الروبوتات المتقدمة وAI",
      description: language === 'en' ? "Students design, build, and program sophisticated robots using advanced sensors and artificial intelligence concepts." : "يقوم الطلاب بناء وبناء وبرمجة روبوتات متقدمة باستخدام الأجهزة المراقبة المتقدمة والمبادئ الأساسية لتعلم الذكاء الاصطناعي.",
      ageGroup: "13-16",
      icon: <Zap size={24} />,
      levels: ["Advanced"],
      details: language === 'en' ? [
        "Design complex robotic systems",
        "Implement machine learning algorithms",
        "Work with computer vision",
        "Participate in robotics competitions"
      ] : [
        "تصميم نظام روبوتات متقدمة",
        "تنفيذ أسلوبات الذكاء الاصطناعي",
        "عمل مع تقنيات الرؤية الحاسوبية",
        "المشاركة في مسابقات الروبوتات"
      ],
      price: 499,
      duration: language === 'en' ? "16 weeks" : "16 أسابيع",
      schedule: language === 'en' ? "Tue & Thu, 3-5 PM" : "الثلاثاء والخميس، 3-5 مساءً"
    },
    {
      id: 8,
      title: language === 'en' ? "Python Programming" : "برمجة Python",
      description: language === 'en' ? "Comprehensive introduction to Python programming, focusing on application development, data analysis, and automation." : "مقدمة شاملة في البرمجة في Python، تركز على تطوير التطبيقات، التحليل الإحصائي، والاتاحة للعملية.",
      ageGroup: "13-16",
      icon: <Code size={24} />,
      levels: ["Intermediate", "Advanced"],
      details: language === 'en' ? [
        "Master Python fundamentals",
        "Build web applications",
        "Create data visualization projects",
        "Develop automation scripts"
      ] : [
        "تعلم أساسيات البرمجة في Python",
        "بناء تطبيقات الويب",
        "إنشاء ألعاب تحليلية",
        "تطوير أكواد التحكم"
      ],
      price: 399,
      duration: language === 'en' ? "12 weeks" : "12 أسابيع",
      schedule: language === 'en' ? "Wed & Fri, 10-12 PM" : "الخميس والسبت، 10-12 مساءً"
    },
    {
      id: 9,
      title: language === 'en' ? "Engineering Design" : "تصميم الهندسة",
      description: language === 'en' ? "Students learn the engineering design process, working on projects that combine mechanical, electrical, and software engineering." : "يتعلم الطلاب عملية تصميم الهندسة، ويعملون على المشاريع التي تجمع بين الهندسة الميكانيكية، الكهربائية، وتصميم البرمجيات.",
      ageGroup: "13-16",
      icon: <BookOpen size={24} />,
      levels: ["Intermediate", "Advanced"],
      details: language === 'en' ? [
        "Learn the engineering design process",
        "Create CAD designs",
        "Build and test prototypes",
        "Develop project management skills"
      ] : [
        "تعلم عملية تصميم الهندسة",
        "إنشاء تصميمات CAD",
        "بناء وتجربة الموديلات",
        "تطوير مهارات إدارة المشاريع"
      ],
      price: 399,
      duration: language === 'en' ? "12 weeks" : "12 أسابيع",
      schedule: language === 'en' ? "Wed & Fri, 10-12 PM" : "الخميس والسبت، 10-12 مساءً"
    }
  ];

  // Convert localStorage courses to program format
  const convertedDynamicPrograms = dynamicPrograms.map(course => ({
    id: parseInt(course.id),
    title: course.name,
    description: course.description || "Course description",
    ageGroup: course.ageRange,
    icon: <Cpu size={24} />,
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
  }));

  // Combine static programs with dynamic courses
  const allPrograms = [...programsData, ...convertedDynamicPrograms];
  
  const filteredPrograms = activeFilter === "all" 
    ? allPrograms 
    : allPrograms.filter(program => program.ageGroup === activeFilter);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-myrobot-navy to-myrobot-navy/90 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-myrobot-orange blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-myrobot-mint blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 z-10 py-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'en' ? "Our Learning Programs" : "برامجنا التعليمية"}
            </h1>
            <p className="text-xl text-gray-300">
              {language === 'en' 
                ? "Explore our age-appropriate STEM programs designed to inspire curiosity, build skills, and foster innovation."
                : "استكشف برامجنا التعليمية المناسبة للأعمار المختلفة والتي تم تصميمها لإلهام الفضول وبناء المهارات وتعزيز الابتكار."}
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <SectionHeading 
            title={language === 'en' ? "Programs by Age Group" : "البرامج حسب الفئة العمرية"} 
            subtitle={language === 'en' 
              ? "Our curriculum is carefully designed to meet the developmental needs and interests of children at different ages."
              : "تم تصميم منهجنا بعناية لتلبية الاحتياجات التنموية واهتمامات الأطفال في مختلف الأعمار."
            }
            centered={true}
          />
          
          {/* Age Group Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {ageGroups.map(group => (
              <button
                key={group.id}
                className={`px-6 py-3 rounded-full transition-all ${
                  activeFilter === group.id
                    ? "bg-myrobot-navy text-white shadow-md"
                    : "bg-gray-100 text-myrobot-navy hover:bg-gray-200"
                }`}
                onClick={() => setActiveFilter(group.id)}
              >
                {group.label}
              </button>
            ))}
          </div>
          
          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map(program => (
              <div key={program.id} className="card border-l-4 border-myrobot-orange group hover:shadow-xl">
                <div className="flex items-start">
                  <div className="bg-myrobot-orange/10 p-4 rounded-xl text-myrobot-orange mr-4">
                    {program.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-myrobot-navy mb-2">{program.title}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-myrobot-navy/10 text-myrobot-navy text-xs px-3 py-1 rounded-full">
                        {language === 'en' ? "Ages " : "الأعمار "} {program.ageGroup}
                      </span>
                      {program.levels.map((level, index) => (
                        <span 
                          key={index}
                          className={`text-xs px-3 py-1 rounded-full ${
                            level === "Beginner" || level === "مبتدئ"
                              ? "bg-green-100 text-green-800" 
                              : level === "Intermediate" || level === "متوسط"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {level}
                        </span>
                      ))}
                    </div>
                    <p className="text-myrobot-gray mb-4">{program.description}</p>
                    
                    <AccessGate 
                      requiredLevel={4}
                      fallback={
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-myrobot-gray mb-2">Register as a parent to view full course details and pricing</p>
                          <Link to="/auth/register">
                            <Button size="sm" className="btn-primary">Register Account</Button>
                          </Link>
                        </div>
                      }
                    >
                      {/* Program Details */}
                      <ul className="mb-4 space-y-2">
                        {program.details.map((detail, index) => (
                          <li key={index} className="flex items-start">
                            <Star className="text-myrobot-orange mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-myrobot-gray">{detail}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <CourseDetailsDialog course={{...program}} />
                    </AccessGate>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <SectionHeading 
            title="Learning Path" 
            subtitle="Our structured learning path ensures continuous growth and skill development as students progress through our programs."
            centered={true}
          />
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-1 bg-myrobot-orange/20 hidden md:block"></div>
              
              {/* Timeline items */}
              <div className="space-y-16">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-myrobot-orange text-white flex items-center justify-center font-bold z-10 mr-3 hidden md:flex">1</div>
                      <h3 className="text-xl font-bold text-myrobot-navy">Beginner Level</h3>
                    </div>
                    <p className="text-myrobot-orange font-medium">Ages 7-9</p>
                  </div>
                  <div className="md:w-2/3 md:pl-8">
                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-myrobot-orange">
                      <p className="text-myrobot-gray mb-4">
                        Students start with foundational concepts in robotics, block-based coding, and hands-on math activities. They build simple robots, create basic programs, and develop logical thinking skills through play-based learning.
                      </p>
                      <p className="text-myrobot-gray">
                        <strong>Key Outcomes:</strong> Basic understanding of robotics components, introduction to programming concepts, improved problem-solving abilities, and enhanced teamwork skills.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-myrobot-orange text-white flex items-center justify-center font-bold z-10 mr-3 hidden md:flex">2</div>
                      <h3 className="text-xl font-bold text-myrobot-navy">Intermediate Level</h3>
                    </div>
                    <p className="text-myrobot-orange font-medium">Ages 10-12</p>
                  </div>
                  <div className="md:w-2/3 md:pl-8">
                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-myrobot-orange">
                      <p className="text-myrobot-gray mb-4">
                        At this level, students work with more complex robots featuring sensors and actuators. They transition to text-based programming with Arduino, apply mathematical concepts to engineering challenges, and participate in small-scale competitions.
                      </p>
                      <p className="text-myrobot-gray">
                        <strong>Key Outcomes:</strong> Understanding of sensors and electronics, basic algorithm implementation, ability to design and build working prototypes, and application of math to real-world problems.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-myrobot-orange text-white flex items-center justify-center font-bold z-10 mr-3 hidden md:flex">3</div>
                      <h3 className="text-xl font-bold text-myrobot-navy">Advanced Level</h3>
                    </div>
                    <p className="text-myrobot-orange font-medium">Ages 13-16</p>
                  </div>
                  <div className="md:w-2/3 md:pl-8">
                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-myrobot-orange">
                      <p className="text-myrobot-gray mb-4">
                        Advanced students design sophisticated robotic systems incorporating AI concepts, develop Python applications, and tackle complex engineering design challenges. They work on long-term projects and participate in regional and national competitions.
                      </p>
                      <p className="text-myrobot-gray">
                        <strong>Key Outcomes:</strong> Proficiency in Python programming, understanding of AI and machine learning fundamentals, mastery of the engineering design process, and ability to manage complex projects from concept to completion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-myrobot-navy to-myrobot-navy/80 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {language === 'en' ? "Ready to Enroll Your Child?" : "هل أنت مستعد لتسجيل طفلك؟"}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            {language === 'en'
              ? "Spaces fill quickly! Register now or contact us to discuss which program is right for your child."
              : "الأماكن تمتلئ بسرعة! سجل الآن أو اتصل بنا لمناقشة البرنامج المناسب لطفلك."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button className="btn-primary text-lg">
                {language === 'en' ? "Register Now" : "سجل الآن"}
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="text-white border-white hover:bg-white/10 text-lg">
                {language === 'en' ? "Contact Us" : "اتصل بنا"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Programs;
