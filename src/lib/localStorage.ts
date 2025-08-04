export interface Child {
  id: number;
  name: string;
  age: string;
  grade: string;
  interests?: string;
}

export interface Course {
  id: string;
  name: string;
  level: string;
  ageRange: string;
  enrolled: number;
  capacity: number;
  schedule: string;
  coordinator: string;
  description?: string;
  price?: number;
}

export interface Event {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  date: string;
  location: string;
  locationAr: string;
  time: string;
  capacity: number;
  price: number;
  category: string;
  image: string;
  enrolled: number;
}

export interface Notification {
  id: string;
  message: string;
  type: 'login' | 'register' | 'course_registration';
  timestamp: string;
  read: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  student: string;
  description: string;
  image: string;
  type: 'image' | 'video';
  category: 'projects' | 'events';
  date?: string;
  achievement?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'coordinator' | 'parent' | 'child';
  parentId?: string; // For child accounts
  childId?: number; // For child accounts - links to Child profile
  courseIds?: string[]; // For coordinators
  createdAt: string;
}

// Children Management
export const getChildren = (): Child[] => {
  const children = localStorage.getItem('myrobot_children');
  return children ? JSON.parse(children) : [];
};

export const saveChildren = (children: Child[]): void => {
  localStorage.setItem('myrobot_children', JSON.stringify(children));
};

export const addChild = (child: Omit<Child, 'id'>): Child => {
  const children = getChildren();
  const newChild: Child = {
    ...child,
    id: Date.now()
  };
  const updatedChildren = [...children, newChild];
  saveChildren(updatedChildren);
  return newChild;
};

export const updateChild = (id: number, updatedChild: Partial<Child>): void => {
  const children = getChildren();
  const updatedChildren = children.map(child =>
    child.id === id ? { ...child, ...updatedChild } : child
  );
  saveChildren(updatedChildren);
};

export const deleteChild = (id: number): void => {
  const children = getChildren();
  const updatedChildren = children.filter(child => child.id !== id);
  saveChildren(updatedChildren);
};

// Courses Management
export const getCourses = (): Course[] => {
  const courses = localStorage.getItem('myrobot_courses');
  return courses ? JSON.parse(courses) : [
    {
      id: "1",
      name: "Robotics 101",
      level: "Beginner",
      ageRange: "7-9",
      enrolled: 15,
      capacity: 20,
      schedule: "Mon, Wed 4-6 PM",
      coordinator: "Sarah Johnson",
      description: "Introduction to robotics for young learners",
      price: 150
    },
    {
      id: "2",
      name: "Arduino Electronics",
      level: "Intermediate",
      ageRange: "10-12",
      enrolled: 12,
      capacity: 15,
      schedule: "Tue, Thu 5-7 PM",
      coordinator: "Michael Smith",
      description: "Learn electronics with Arduino",
      price: 200
    },
    {
      id: "3",
      name: "Programming for Kids",
      level: "Beginner",
      ageRange: "8-10",
      enrolled: 18,
      capacity: 20,
      schedule: "Sat 10 AM - 1 PM",
      coordinator: "Emma Davis",
      description: "Introduction to programming concepts",
      price: 180
    }
  ];
};

export const saveCourses = (courses: Course[]): void => {
  localStorage.setItem('myrobot_courses', JSON.stringify(courses));
};

export const addCourse = (course: Omit<Course, 'id'>): Course => {
  const courses = getCourses();
  const newCourse: Course = {
    ...course,
    id: Date.now().toString()
  };
  const updatedCourses = [...courses, newCourse];
  saveCourses(updatedCourses);
  return newCourse;
};

export const updateCourse = (id: string, updatedCourse: Partial<Course>): void => {
  const courses = getCourses();
  const updatedCourses = courses.map(course =>
    course.id === id ? { ...course, ...updatedCourse } : course
  );
  saveCourses(updatedCourses);
};

export const deleteCourse = (id: string): void => {
  const courses = getCourses();
  const updatedCourses = courses.filter(course => course.id !== id);
  saveCourses(updatedCourses);
};

// Events Management
export const getEvents = (): Event[] => {
  const events = localStorage.getItem('myrobot_events');
  return events ? JSON.parse(events) : [];
};

export const saveEvents = (events: Event[]): void => {
  localStorage.setItem('myrobot_events', JSON.stringify(events));
};

export const addEvent = (event: Omit<Event, 'id'>): Event => {
  const events = getEvents();
  const newEvent: Event = {
    ...event,
    id: Date.now().toString()
  };
  const updatedEvents = [...events, newEvent];
  saveEvents(updatedEvents);
  return newEvent;
};

export const updateEvent = (id: string, updatedEvent: Partial<Event>): void => {
  const events = getEvents();
  const updatedEvents = events.map(event =>
    event.id === id ? { ...event, ...updatedEvent } : event
  );
  saveEvents(updatedEvents);
};

export const deleteEvent = (id: string): void => {
  const events = getEvents().filter(event => event.id !== id);
  saveEvents(events);
};

// Notifications Management
export const getNotifications = (): Notification[] => {
  const notifications = localStorage.getItem('myrobot_notifications');
  return notifications ? JSON.parse(notifications) : [];
};

export const saveNotifications = (notifications: Notification[]): void => {
  localStorage.setItem('myrobot_notifications', JSON.stringify(notifications));
};

export const addNotification = (message: string, type: Notification['type']): void => {
  const notifications = getNotifications();
  const newNotification: Notification = {
    id: Date.now().toString(),
    message,
    type,
    timestamp: new Date().toISOString(),
    read: false
  };
  const updatedNotifications = [newNotification, ...notifications];
  saveNotifications(updatedNotifications);
};

export const markNotificationAsRead = (id: string): void => {
  const notifications = getNotifications();
  const updatedNotifications = notifications.map(notification =>
    notification.id === id ? { ...notification, read: true } : notification
  );
  saveNotifications(updatedNotifications);
};

export const getUnreadNotificationsCount = (): number => {
  const notifications = getNotifications();
  return notifications.filter(notification => !notification.read).length;
};

// Gallery Management
export const getGalleryItems = (): GalleryItem[] => {
  const items = localStorage.getItem('myrobot_gallery');
  return items ? JSON.parse(items) : [
    {
      id: "1",
      title: "Automated Pet Feeder",
      student: "Emma, Age 12",
      description: "Arduino-based pet feeder with timer and portion control",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      type: "image",
      category: "projects"
    },
    {
      id: "2",
      title: "Robot Soccer Championship",
      student: "Advanced Robotics Team",
      description: "Competition-ready robots designed for autonomous soccer gameplay",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      type: "video",
      category: "projects"
    },
    {
      id: "3",
      title: "Regional Robotics Championship 2024",
      student: "MyRobot Academy",
      description: "Our students placed 2nd in the regional competition",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      type: "image",
      category: "events",
      date: "March 15, 2024",
      achievement: "2nd Place"
    }
  ];
};

export const saveGalleryItems = (items: GalleryItem[]): void => {
  localStorage.setItem('myrobot_gallery', JSON.stringify(items));
};

export const addGalleryItem = (item: Omit<GalleryItem, 'id'>): GalleryItem => {
  const items = getGalleryItems();
  const newItem: GalleryItem = {
    ...item,
    id: Date.now().toString()
  };
  const updatedItems = [...items, newItem];
  saveGalleryItems(updatedItems);
  return newItem;
};

export const updateGalleryItem = (id: string, updatedItem: Partial<GalleryItem>): void => {
  const items = getGalleryItems();
  const updatedItems = items.map(item =>
    item.id === id ? { ...item, ...updatedItem } : item
  );
  saveGalleryItems(updatedItems);
};

export const deleteGalleryItem = (id: string): void => {
  const items = getGalleryItems();
  const updatedItems = items.filter(item => item.id !== id);
  saveGalleryItems(updatedItems);
};

// Achievements Management
export const getAchievements = (): Achievement[] => {
  const achievements = localStorage.getItem('myrobot_achievements');
  return achievements ? JSON.parse(achievements) : [
    {
      id: "1",
      title: "Regional Robotics Champions",
      description: "Our advanced team won the Regional Robotics Championship 2024",
      date: "March 2024",
      icon: "Trophy",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "2",
      title: "STEM Education Excellence Award",
      description: "Recognized for outstanding contribution to STEM education in the community",
      date: "January 2024",
      icon: "Award",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "3",
      title: "500+ Students Graduated",
      description: "Successfully graduated over 500 students since our founding",
      date: "2020-2024",
      icon: "Users",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];
};

export const saveAchievements = (achievements: Achievement[]): void => {
  localStorage.setItem('myrobot_achievements', JSON.stringify(achievements));
};

export const addAchievement = (achievement: Omit<Achievement, 'id'>): Achievement => {
  const achievements = getAchievements();
  const newAchievement: Achievement = {
    ...achievement,
    id: Date.now().toString()
  };
  const updatedAchievements = [...achievements, newAchievement];
  saveAchievements(updatedAchievements);
  return newAchievement;
};

export const updateAchievement = (id: string, updatedAchievement: Partial<Achievement>): void => {
  const achievements = getAchievements();
  const updatedAchievements = achievements.map(achievement =>
    achievement.id === id ? { ...achievement, ...updatedAchievement } : achievement
  );
  saveAchievements(updatedAchievements);
};

export const deleteAchievement = (id: string): void => {
  const achievements = getAchievements();
  const updatedAchievements = achievements.filter(achievement => achievement.id !== id);
  saveAchievements(updatedAchievements);
};

// Users Management
export const getUsers = (): User[] => {
  const users = localStorage.getItem('myrobot-users');
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users: User[]): void => {
  localStorage.setItem('myrobot-users', JSON.stringify(users));
};

export const addUser = (user: Omit<User, 'id' | 'createdAt'>): User => {
  const users = getUsers();
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const updateUser = (id: string, updatedUser: Partial<User>): void => {
  const users = getUsers();
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    saveUsers(users);
  }
};

export const deleteUser = (id: string): void => {
  const users = getUsers().filter(user => user.id !== id);
  saveUsers(users);
};

export const getUsersByRole = (role: User['role']): User[] => {
  return getUsers().filter(user => user.role === role);
};

export const getChildrenByParent = (parentId: string): User[] => {
  return getUsers().filter(user => user.role === 'child' && user.parentId === parentId);
};

// Check if a child already has an account
export const hasChildAccount = (childId: number): boolean => {
  const users = getUsers();
  return users.some(user => user.role === 'child' && user.childId === childId);
};

// Get account for a specific child
export const getChildAccount = (childId: number): User | undefined => {
  const users = getUsers();
  return users.find(user => user.role === 'child' && user.childId === childId);
};