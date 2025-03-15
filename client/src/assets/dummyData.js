export const testimonials = [
    {
      name: "Aarav Mehta",
      role: "Software Engineer at Google",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      feedback:
        "This platform transformed my career! The Full-Stack Development course was top-notch. The real-world projects helped me land my dream job at Google!",
    },
    {
      name: "Sanya Kapoor",
      role: "Data Scientist at Microsoft",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      rating: 4,
      feedback:
        "The Data Science Bootcamp exceeded my expectations. The curriculum, hands-on experience, and mentor support were incredible. Highly recommended!",
    },
    {
      name: "Rohan Sharma",
      role: "AI Engineer at Amazon",
      image: "https://randomuser.me/api/portraits/men/50.jpg",
      rating: 4,
      feedback:
        "Taking the AI & Machine Learning course was a game-changer for me. The in-depth knowledge helped me get hired at Amazon. Truly a great learning experience!",
    },
  ];
  



  export const allCourses = [
    {
      id: 1,
      image: "https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29kaW5nfGVufDB8fDB8fHww",
      title: "Full-Stack Web Development",
      instructor: "John Doe",
      rating: 4.8,
      reviews: 1200,
      price: 4999,
      description:
        "Master full-stack web development with this comprehensive course that covers front-end and back-end technologies. You'll learn how to build responsive websites using HTML, CSS, and JavaScript, develop dynamic web applications with React, and create robust server-side applications using Node.js and Express. Additionally, you'll explore database management with MongoDB, authentication techniques, API development, and best practices for scalable web applications. By the end of the course, you'll have built real-world projects, preparing you for a career in web development.",
      isPublished: true,
      discount: 10,
      courseContent: [
        {
          chapterId: 1,
          chapterOrder: 1,
          chapterTitle: "Introduction to Web Development",
          chapterContent: [
            { lectureId: 1, title: "What is Web Development?", duration: "10:30", url: "NkwFxeHARqc", isPreview: true, lectureOrder: 1 },
            { lectureId: 2, title: "Setting Up Your Development Environment", duration: "15:20", url: "#", isPreview: false, lectureOrder: 2 },
          ],
        },
        {
          chapterId: 2,
          chapterOrder: 2,
          chapterTitle: "Frontend Development Basics",
          chapterContent: [
            { lectureId: 3, title: "HTML & CSS Fundamentals", duration: "20:00", url: "#", isPreview: false, lectureOrder: 1 },
            { lectureId: 4, title: "JavaScript Essentials", duration: "25:45", url: "#", isPreview: false, lectureOrder: 2 },
          ],
        },
        {
          chapterId: 3,
          chapterOrder: 3,
          chapterTitle: "Backend Development with Node.js",
          chapterContent: [
            { lectureId: 5, title: "Understanding Node.js", duration: "18:00", url: "ooBxSg1Cl1w", isPreview: true, lectureOrder: 1 },
            { lectureId: 6, title: "Express.js Basics", duration: "22:30", url: "#", isPreview: false, lectureOrder: 2 },
          ],
        },
      ],
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1562813733-b31f71025d54?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
      title: "Artificial Intelligence & ML",
      instructor: "Sarah Lee",
      rating: 4.7,
      reviews: 950,
      price: 5999,
      description:
        "Artificial Intelligence (AI) and Machine Learning (ML) are transforming industries across the world. This course introduces fundamental AI concepts and practical machine learning techniques using Python. You'll learn about supervised and unsupervised learning, neural networks, and deep learning using TensorFlow and PyTorch. The course also covers data preprocessing, feature engineering, and model optimization techniques. Whether you're a beginner or an experienced developer, this course provides hands-on experience with real-world AI projects.",
      isPublished: true,
      discount: 15,
      courseContent: [
        {
          chapterId: 1,
          chapterOrder: 1,
          chapterTitle: "Introduction to AI & ML",
          chapterContent: [
            { lectureId: 1, title: "Understanding Artificial Intelligence", duration: "12:30", url: "6dqAwh2MCg0", isPreview: true, lectureOrder: 1 },
            { lectureId: 2, title: "Machine Learning Basics", duration: "18:20", url: "#", isPreview: false, lectureOrder: 2 },
          ],
        },
        {
          chapterId: 2,
          chapterOrder: 2,
          chapterTitle: "Deep Learning & Neural Networks",
          chapterContent: [
            { lectureId: 3, title: "Introduction to Neural Networks", duration: "22:10", url: "#", isPreview: false, lectureOrder: 1 },
            { lectureId: 4, title: "Training Deep Learning Models", duration: "30:45", url: "#", isPreview: false, lectureOrder: 2 },
          ],
        },
      ],
    },
    {
      id: 3,
      image: "https://media.istockphoto.com/id/1354397311/photo/top-view-of-laptop-with-text-python.webp?a=1&b=1&s=612x612&w=0&k=20&c=AKyxaNx_uFuWW8AgbfsTnwV11Zlb0PxVHGxypfMT3Sc=",
      title: "Python for Data Science",
      instructor: "Michael Smith",
      rating: 4.6,
      reviews: 800,
      price: 3999,
      description:
        "Python is one of the most popular languages for data science, and this course will guide you through the essential tools and libraries required for data analysis. You'll start by learning Python basics before diving into NumPy, Pandas, Matplotlib, and Seaborn for data manipulation and visualization. The course also covers data wrangling, statistical analysis, and machine learning techniques to help you become a proficient data analyst. Hands-on projects will reinforce your learning and prepare you for real-world applications.",
      isPublished: true,
      discount: 20,
      courseContent: [
        {
          chapterId: 1,
          chapterOrder: 1,
          chapterTitle: "Python Basics",
          chapterContent: [
            { lectureId: 1, title: "Introduction to Python", duration: "10:00", url: "v9bOWjwdTlg", isPreview: true, lectureOrder: 1 },
            { lectureId: 2, title: "Data Types & Variables", duration: "12:45", url: "#", isPreview: false, lectureOrder: 2 },
          ],
        },
        {
          chapterId: 2,
          chapterOrder: 2,
          chapterTitle: "Data Science Libraries",
          chapterContent: [
            { lectureId: 3, title: "Exploring NumPy", duration: "14:30", url: "#", isPreview: false, lectureOrder: 1 },
            { lectureId: 4, title: "Data Analysis with Pandas", duration: "20:15", url: "#", isPreview: false, lectureOrder: 2 },
          ],
        },
        {
          chapterId: 3,
          chapterOrder: 3,
          chapterTitle: "Data Visualization",
          chapterContent: [
            { lectureId: 5, title: "Matplotlib & Seaborn Basics", duration: "22:00", url: "#", isPreview: true, lectureOrder: 1 },
            { lectureId: 6, title: "Creating Stunning Visuals", duration: "18:45", url: "#", isPreview: false, lectureOrder: 2 },
          ],
        },
      ],
    },
    {
      id: 4,
      image: "https://media.istockphoto.com/id/1345778718/photo/cloud-computing-the-data-transfer-and-storage-concept-consists-of-a-white-polygonal.webp?a=1&b=1&s=612x612&w=0&k=20&c=VkIf7KcPdfhVGaGF_zhC4nfjBQhnkYCczVTTeLx0SF4=",
      title: "AWS Cloud Computing",
      instructor: "James Wilson",
      rating: 4.9,
      reviews: 1100,
      price: 6999,
      description:
        "This course provides an in-depth look into Amazon Web Services (AWS), one of the leading cloud computing platforms. You'll learn about core AWS services such as EC2, S3, Lambda, and RDS. The course also explores cloud security, DevOps best practices, and infrastructure automation using Terraform and CloudFormation. With hands-on labs and real-world projects, you'll gain the skills needed to manage cloud infrastructure efficiently and prepare for AWS certification exams.",
      isPublished: false,
      discount: 25,
      courseContent: [
        {
          chapterId: 1,
          chapterOrder: 1,
          chapterTitle: "Introduction to Cloud Computing",
          chapterContent: [
            { lectureId: 1, title: "What is Cloud Computing?", duration: "14:30", url: "8C_kHJ5YEiA", isPreview: true, lectureOrder: 1 },
            { lectureId: 2, title: "AWS Overview", duration: "20:15", url: "#", isPreview: false, lectureOrder: 2 },
          ],
        },
        {
          chapterId: 2,
          chapterOrder: 2,
          chapterTitle: "AWS Services",
          chapterContent: [
            { lectureId: 3, title: "Understanding EC2", duration: "25:00", url: "#", isPreview: false, lectureOrder: 1 },
            { lectureId: 4, title: "AWS Lambda Functions", duration: "22:15", url: "#", isPreview: false, lectureOrder: 2 },
          ],
        },
      ],
    },
  ];
  
  
 export  const DashBoardData = {
    totalEnrollments: 120,
    totalEarnings: 5000, // Example in dollars
    totalCourses: 8,
    enrolledStudents: [
      {
        courseTitle: "React for Beginners",
        student:
          { name: "Alice Johnson", imgUrl: "https://randomuser.me/api/portraits/women/1.jpg" }
          
        
      },
      {
        courseTitle: "Advanced Node.js",
        student: 
          { name: "Emma Wilson", imgUrl: "https://randomuser.me/api/portraits/women/2.jpg" }
        
      },
      {
        courseTitle: "Full-Stack Web Development",
        student: 
          { name: "Olivia Brown", imgUrl: "https://randomuser.me/api/portraits/women/3.jpg" }
      }
    ]
  };
  
  export default DashBoardData;
  