
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import AccessGate from "@/components/ui/AccessGate";
import { useLanguage } from "@/contexts/LanguageContext";
import { Trophy } from "lucide-react";
import { getEvents, Event as StoredEvent } from "@/lib/localStorage";

// Using the Event interface from localStorage

// Default events for demonstration
const defaultEvents: StoredEvent[] = [
  {
    id: "event1",
    title: "Robotics Summer Camp",
    titleAr: "معسكر الروبوتات الصيفي",
    date: "2025-07-10",
    location: "Main Campus, Building A",
    locationAr: "الحرم الرئيسي، المبنى أ",
    time: "9:00 AM - 4:00 PM",
    capacity: 30,
    description: "A week-long immersive robotics experience where students will build and program their own robots, participate in exciting challenges, and showcase their creations.",
    descriptionAr: "تجربة الروبوتات الغامرة التي تستمر لمدة أسبوع حيث سيقوم الطلاب ببناء وبرمجة الروبوتات الخاصة بهم، والمشاركة في تحديات مثيرة، وعرض إبداعاتهم.",
    price: 299,
    image: "/placeholder.svg",
    enrolled: 18,
    category: "workshop"
  },
  {
    id: "event2",
    title: "Arduino Workshop",
    titleAr: "ورشة عمل أردوينو",
    date: "2025-08-15",
    location: "Tech Lab, Building B",
    locationAr: "مختبر التكنولوجيا، المبنى ب",
    time: "10:00 AM - 2:00 PM",
    capacity: 20,
    description: "Learn the fundamentals of Arduino programming and electronics. Perfect for beginners who want to start their journey into the world of physical computing.",
    descriptionAr: "تعلم أساسيات برمجة الأردوينو والإلكترونيات. مثالي للمبتدئين الذين يرغبون في بدء رحلتهم في عالم الحوسبة المادية.",
    price: 149,
    image: "/placeholder.svg",
    enrolled: 12,
    category: "workshop"
  },
  {
    id: "event3",
    title: "Coding Competition",
    titleAr: "مسابقة البرمجة",
    date: "2025-09-20",
    location: "Innovation Center",
    locationAr: "مركز الابتكار",
    time: "1:00 PM - 6:00 PM",
    capacity: 50,
    description: "Test your programming skills in this fun and challenging competition. Prizes for top performers and certificates for all participants.",
    descriptionAr: "اختبر مهاراتك في البرمجة في هذه المسابقة الممتعة والصعبة. جوائز لأفضل المتسابقين وشهادات لجميع المشاركين.",
    price: 49,
    image: "/placeholder.svg",
    enrolled: 32,
    category: "competition"
  }
];

const Events = () => {
  const { t, language, direction } = useLanguage();
  const navigate = useNavigate();
  const [events, setEvents] = useState<StoredEvent[]>([]);

  useEffect(() => {
    const storedEvents = getEvents();
    // If no events in storage, show default events
    if (storedEvents.length === 0) {
      setEvents(defaultEvents);
    } else {
      setEvents(storedEvents);
    }
  }, []);
  
  return (
    <Layout>
      <div className="container mx-auto py-12">
        <SectionHeading 
          title={language === 'en' ? "Upcoming Events" : "الفعاليات القادمة"} 
          subtitle={language === 'en' ? "Join our special STEM events and workshops" : "انضم إلى فعاليات وورش عمل العلوم والتكنولوجيا والهندسة والرياضيات الخاصة بنا"} 
          centered 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src={event.image} 
                  alt={language === 'en' ? event.title : event.titleAr} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-4 right-4 bg-myrobot-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                  ${event.price}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-myrobot-navy">
                  {language === 'en' ? event.title : event.titleAr}
                </CardTitle>
                <CardDescription className="text-myrobot-charcoal">
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar size={16} className="text-myrobot-orange" />
                    <span>{new Date(event.date).toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA')}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin size={16} className="text-myrobot-orange" />
                    <span>{language === 'en' ? event.location : event.locationAr}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock size={16} className="text-myrobot-orange" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Users size={16} className="text-myrobot-orange" />
                    <span>{event.enrolled}/{event.capacity} {language === 'en' ? 'enrolled' : 'مسجل'}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {language === 'en' ? event.description : event.descriptionAr}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <AccessGate 
                  requiredLevel={2}
                  fallback={
                    <div className="flex gap-2 w-full">
                      <Button variant="outline" className="flex-1" onClick={() => navigate('/auth/register')}>
                        {language === 'en' ? 'Register to View' : 'سجل للعرض'}
                      </Button>
                    </div>
                  }
                >
                  <div className="flex gap-2 w-full">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      {language === 'en' ? 'Details' : 'التفاصيل'}
                    </Button>
                    <Button 
                      className="btn-primary flex-1" 
                      onClick={() => navigate(`/events/${event.id}/register`)}
                    >
                      {language === 'en' ? 'Register Now' : 'سجل الآن'}
                    </Button>
                  </div>
                </AccessGate>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Events;
