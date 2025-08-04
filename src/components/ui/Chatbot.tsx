import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Send, HelpCircle, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [chatMode, setChatMode] = useState<'faq' | 'contact' | null>(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "مرحباً! أهلاً وسهلاً بك في أكاديمية روبوت الخاصة بي! 🤖\n\nHello! Welcome to My Robot Academy! 🤖\n\nHow can I help you today? كيف يمكنني مساعدتك اليوم؟",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const detectLanguage = (text: string): 'ar' | 'en' => {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text) ? 'ar' : 'en';
  };

  const aiResponses = {
    greeting: {
      en: [
        "Hello! I'm excited to help you learn about My Robot Academy! What would you like to know?",
        "Hi there! Welcome to My Robot Academy! I'm here to answer any questions about our amazing robotics programs.",
        "Hey! Great to see you interested in robotics education. How can I assist you today?"
      ],
      ar: [
        "مرحباً! أنا متحمس لمساعدتك في التعرف على أكاديمية الروبوت الخاصة بي! ماذا تريد أن تعرف؟",
        "أهلاً بك! مرحباً بك في أكاديمية الروبوت الخاصة بي! أنا هنا للإجابة على أي أسئلة حول برامجنا الرائعة للروبوتات.",
        "مرحباً! من الرائع رؤيتك مهتماً بتعليم الروبوتات. كيف يمكنني مساعدتك اليوم؟"
      ]
    },
    age: {
      en: [
        "We welcome young innovators aged 7-16! Our programs are carefully designed with age-appropriate curriculum that grows with your child's development.",
        "Great question! We serve children from 7 to 16 years old, with each program tailored to different developmental stages and skill levels."
      ],
      ar: [
        "نرحب بالمبدعين الصغار من سن 7-16 سنة! برامجنا مصممة بعناية مع منهج مناسب للعمر ينمو مع تطور طفلك.",
        "سؤال رائع! نخدم الأطفال من سن 7 إلى 16 سنة، مع تصميم كل برنامج ليناسب مراحل التطور ومستويات المهارة المختلفة."
      ]
    },
    pricing: {
      en: [
        "Our program investments range from $129 to $499, varying by duration and complexity. I'd love to help you find the perfect fit! Would you like to know about a specific program?",
        "Investment in your child's future starts at $129! The exact cost depends on the program length and materials. Creating an account will give you detailed pricing for each option."
      ],
      ar: [
        "تتراوح استثماراتنا في البرامج من 129 إلى 499 دولار، تختلف حسب المدة والتعقيد. أحب أن أساعدك في العثور على الخيار المثالي! هل تريد معرفة برنامج معين؟",
        "الاستثمار في مستقبل طفلك يبدأ من 129 دولار! التكلفة الدقيقة تعتمد على طول البرنامج والمواد. إنشاء حساب سيعطيك تسعيراً مفصلاً لكل خيار."
      ]
    },
    programs: {
      en: [
        "We offer three main tracks: Robotics Fundamentals (ages 7-9), Arduino Programming (ages 10-12), and Advanced Engineering (ages 13-16). Each builds critical STEM skills through hands-on projects!",
        "Our curriculum covers everything from basic robot building to advanced programming! Which age group are you interested in learning about?"
      ],
      ar: [
        "نقدم ثلاثة مسارات رئيسية: أساسيات الروبوتات (أعمار 7-9)، برمجة Arduino (أعمار 10-12)، والهندسة المتقدمة (أعمار 13-16). كل منها يبني مهارات STEM الأساسية من خلال مشاريع عملية!",
        "منهجنا يغطي كل شيء من بناء الروبوتات الأساسية إلى البرمجة المتقدمة! أي فئة عمرية تهتم بالتعرف عليها؟"
      ]
    },
    contact: {
      en: [
        "I'd be happy to connect you with our team! You can reach us at contact@myrobotacademy.com or call us at +1 (555) 123-4567. Our team is available Monday-Friday, 9 AM - 6 PM.",
        "For direct contact, please email us at info@myrobotacademy.com or visit our Contact page on the website. We usually respond within 24 hours!"
      ],
      ar: [
        "سأكون سعيداً لتوصيلك بفريقنا! يمكنك التواصل معنا على contact@myrobotacademy.com أو الاتصال بنا على +1 (555) 123-4567. فريقنا متاح من الاثنين إلى الجمعة، من 9 صباحاً إلى 6 مساءً.",
        "للتواصل المباشر، يرجى إرسال بريد إلكتروني إلى info@myrobotacademy.com أو زيارة صفحة الاتصال على الموقع. عادة نرد خلال 24 ساعة!"
      ]
    }
  };

  const handleMenuChoice = (choice: 'faq' | 'contact') => {
    setShowMenu(false);
    setChatMode(choice);
    
    const responseText = choice === 'faq' 
      ? "Perfect! I'm here to answer your questions about our programs. Feel free to ask about ages, pricing, schedules, or anything else!\n\nممتاز! أنا هنا للإجابة على أسئلتك حول برامجنا. لا تتردد في السؤال عن الأعمار، الأسعار، الجداول، أو أي شيء آخر!"
      : "I'll help you get in touch with our team! You can ask me for contact information or I can guide you on how to reach us.\n\nسأساعدك في التواصل مع فريقنا! يمكنك سؤالي عن معلومات الاتصال أو يمكنني إرشادك حول كيفية التواصل معنا.";
    
    const botMessage = {
      id: messages.length + 1,
      text: responseText,
      isBot: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMessage]);
  };

  const getAIResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    const language = detectLanguage(input);
    
    // Handle contact mode
    if (chatMode === 'contact') {
      if (lowercaseInput.includes('email') || lowercaseInput.includes('بريد')) {
        return language === 'ar' 
          ? "بريدنا الإلكتروني هو: contact@myrobotacademy.com. يمكنك أيضاً زيارة صفحة الاتصال على موقعنا للحصول على معلومات أكثر!"
          : "Our email is: contact@myrobotacademy.com. You can also visit our Contact page on the website for more information!";
      }
      if (lowercaseInput.includes('phone') || lowercaseInput.includes('هاتف') || lowercaseInput.includes('رقم')) {
        return language === 'ar'
          ? "رقم هاتفنا: +1 (555) 123-4567. نحن متاحون من الاثنين إلى الجمعة، من 9 صباحاً إلى 6 مساءً."
          : "Our phone number is: +1 (555) 123-4567. We're available Monday-Friday, 9 AM - 6 PM.";
      }
      const contactResponses = aiResponses.contact[language];
      return contactResponses[Math.floor(Math.random() * contactResponses.length)];
    }
    
    // Greeting detection
    if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi') || lowercaseInput.includes('hey') || 
        lowercaseInput.includes('مرحبا') || lowercaseInput.includes('السلام') || lowercaseInput.includes('أهلا')) {
      const greetingResponses = aiResponses.greeting[language];
      return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    }
    
    // Age-related questions
    if (lowercaseInput.includes('age') || lowercaseInput.includes('old') || lowercaseInput.includes('young') ||
        lowercaseInput.includes('عمر') || lowercaseInput.includes('سن') || lowercaseInput.includes('عام')) {
      const ageResponses = aiResponses.age[language];
      return ageResponses[Math.floor(Math.random() * ageResponses.length)];
    }
    
    // Pricing questions
    if (lowercaseInput.includes('price') || lowercaseInput.includes('cost') || lowercaseInput.includes('fee') || lowercaseInput.includes('money') ||
        lowercaseInput.includes('سعر') || lowercaseInput.includes('تكلفة') || lowercaseInput.includes('مال') || lowercaseInput.includes('رسوم')) {
      const pricingResponses = aiResponses.pricing[language];
      return pricingResponses[Math.floor(Math.random() * pricingResponses.length)];
    }
    
    // Program questions
    if (lowercaseInput.includes('program') || lowercaseInput.includes('course') || lowercaseInput.includes('class') ||
        lowercaseInput.includes('برنامج') || lowercaseInput.includes('دورة') || lowercaseInput.includes('حصة')) {
      const programResponses = aiResponses.programs[language];
      return programResponses[Math.floor(Math.random() * programResponses.length)];
    }
    
    // Schedule questions
    if (lowercaseInput.includes('schedule') || lowercaseInput.includes('time') || lowercaseInput.includes('when') ||
        lowercaseInput.includes('جدول') || lowercaseInput.includes('وقت') || lowercaseInput.includes('متى')) {
      return language === 'ar'
        ? "نقدم جداول مرنة مع حصص في أيام الأسبوع وعطلات نهاية الأسبوع! بمجرد التسجيل، ستشاهد جميع الأوقات المتاحة التي تناسب جدول عائلتك."
        : "We offer flexible scheduling with classes on weekdays and weekends! Once you register, you'll see all available time slots that work for your family's schedule.";
    }
    
    // Default conversational responses
    const defaultResponses = language === 'ar' ? [
      "هذا سؤال رائع! أحب أن أساعدك في اكتشاف كيف يمكن لأكاديمية الروبوت الخاصة بي أن تثير اهتمام طفلك بالعلوم والتكنولوجيا. ما الجانب الذي يهمك أكثر؟",
      "أنا هنا لجعل قرارك أسهل! للحصول على معلومات مفصلة حول التسجيل، الجداول، أو برامج معينة، إنشاء حساب سيفتح لك جميع التفاصيل التي تحتاجها.",
      "مثير للاهتمام! بينما أحب أن أعطيك معلومات أكثر تحديداً، أفضل طريقة للحصول على إجابات مفصلة هي من خلال حسابك الشخصي. يستغرق إعداده لحظة فقط!"
    ] : [
      "That's a great question! I'd love to help you discover how My Robot Academy can spark your child's interest in STEM. What specific aspect interests you most?",
      "I'm here to help make your decision easier! For detailed information about enrollment, scheduling, or specific programs, creating an account will unlock all the details you need.",
      "Interesting! While I'd love to give you more specific information, the best way to get detailed answers is through your personalized account. It takes just a moment to set up!"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response delay with typing indicator
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getAIResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, Math.random() * 1000 + 500); // More realistic response time

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg bg-myrobot-orange hover:bg-myrobot-orange/90 text-white"
        size="icon"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-80 h-96 shadow-xl">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="bg-myrobot-navy text-white p-4 rounded-t-lg">
              <h3 className="font-semibold">My Robot Academy Assistant</h3>
              <p className="text-sm text-gray-200">مساعد أكاديمية الروبوت | Ask me anything!</p>
            </div>

            {/* Menu Options */}
            {showMenu && (
              <div className="p-4 border-b">
                <p className="text-xs text-myrobot-gray mb-3 text-center leading-tight">
                  Choose how I can help you:<br/>
                  اختر كيف يمكنني مساعدتك:
                </p>
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => handleMenuChoice('faq')}
                    size="sm"
                    className="w-full bg-myrobot-orange hover:bg-myrobot-orange/90 text-white text-xs py-2"
                  >
                    <HelpCircle size={14} className="mr-1" />
                    FAQ / أسئلة شائعة
                  </Button>
                  <Button
                    onClick={() => handleMenuChoice('contact')}
                    size="sm"
                    variant="outline"
                    className="w-full text-xs py-2"
                  >
                    <Phone size={14} className="mr-1" />
                    Contact / اتصال
                  </Button>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-line ${
                      message.isBot
                        ? 'bg-gray-100 text-myrobot-navy'
                        : 'bg-myrobot-orange text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question... اكتب سؤالك..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-myrobot-orange focus:border-transparent"
                  dir="auto"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  size="icon"
                  className="bg-myrobot-orange hover:bg-myrobot-orange/90"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default Chatbot;