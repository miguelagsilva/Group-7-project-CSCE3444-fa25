// Mock API Data for LeetCode for Kids Platform
import { newChallengesData, newQuizzesData } from './challenges-quizzes-data-fixed';

export interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  lessonsCount: number;
  duration: string;
  icon: string;
  available: boolean;
  progress?: number;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  lessonsCount: number;
  completed: boolean;
  locked: boolean;
  progress: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  type: 'video' | 'interactive' | 'reading';
  duration: string;
  completed: boolean;
  content: LessonContent;
}

export interface LessonContent {
  introduction: string;
  videoUrl?: string; // YouTube video URL to explain the concept
  mainContent: string[];
  codeExamples?: CodeExample[];
  keyPoints?: string[];
}

export interface CodeExample {
  title: string;
  code: string;
  explanation: string;
}

export interface PracticeProblem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  starterCode: string;
  solution: string;
  hints: string[];
  testCases: TestCase[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface Challenge {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  timeLimit: number; // in seconds
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  starterCode: string;
  solution: string;
  testCases: TestCase[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  timeLimit: number; // in seconds
  questions: QuizQuestion[];
}

export interface UserProgress {
  coursesCompleted: number;
  totalCourses: number;
  lessonsCompleted: number;
  totalLessons: number;
  challengesCompleted: number;
  totalChallenges: number;
  quizzesPassed: number;
  totalQuizzes: number;
  currentStreak: number;
  totalPoints: number;
  badges: Badge[];
  recentActivity: Activity[];
  weeklyProgress: WeeklyProgress[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

export interface Activity {
  id: string;
  type: 'lesson' | 'quiz' | 'challenge' | 'practice';
  title: string;
  date: string;
  points: number;
}

export interface WeeklyProgress {
  day: string;
  minutes: number;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  age: number;
  text: string;
  rating: number;
  avatar: string;
}

// ==================== COURSES DATA ====================
export const coursesData: Course[] = [
  {
    id: 'python-adventures',
    title: 'Python Adventures',
    description: 'Learn Python basics through fun games and interactive challenges',
    level: 'Beginner',
    lessonsCount: 12,
    duration: '4 weeks',
    icon: '🐍',
    available: true,
    progress: 45
  },
  {
    id: 'web-wizardry',
    title: 'Web Wizardry',
    description: 'Create amazing websites with HTML, CSS, and JavaScript',
    level: 'Beginner',
    lessonsCount: 15,
    duration: '6 weeks',
    icon: '🌐',
    available: false
  },
  {
    id: 'game-maker',
    title: 'Game Maker',
    description: 'Build your own games from scratch',
    level: 'Intermediate',
    lessonsCount: 20,
    duration: '8 weeks',
    icon: '🎮',
    available: false
  }
];

// ==================== MODULES DATA ====================
export const modulesData: Module[] = [
  {
    id: 'module-1',
    courseId: 'python-adventures',
    title: 'Getting Started with Python',
    description: 'Learn the basics of Python programming',
    lessonsCount: 4,
    completed: true,
    locked: false,
    progress: 100
  },
  {
    id: 'module-2',
    courseId: 'python-adventures',
    title: 'Variables and Data Types',
    description: 'Discover how to store and use different types of data',
    lessonsCount: 5,
    completed: false,
    locked: false,
    progress: 60
  },
  {
    id: 'module-3',
    courseId: 'python-adventures',
    title: 'Loops and Conditionals',
    description: 'Make your code smarter with decisions and repetition',
    lessonsCount: 1,
    completed: false,
    locked: false,
    progress: 0
  },
  {
    id: 'module-4',
    courseId: 'python-adventures',
    title: 'Functions and Methods',
    description: 'Create reusable code blocks',
    lessonsCount: 1,
    completed: false,
    locked: false,
    progress: 0
  },
  {
    id: 'module-5',
    courseId: 'python-adventures',
    title: 'Lists and Collections',
    description: 'Store multiple items and organize your data',
    lessonsCount: 1,
    completed: false,
    locked: false,
    progress: 0
  },
  {
    id: 'module-6',
    courseId: 'python-adventures',
    title: 'Loops: For and While',
    description: 'Repeat actions and automate tasks',
    lessonsCount: 1,
    completed: false,
    locked: false,
    progress: 0
  },
  {
    id: 'module-7',
    courseId: 'python-adventures',
    title: 'Dictionaries and Data',
    description: 'Work with key-value pairs and complex data',
    lessonsCount: 1,
    completed: false,
    locked: false,
    progress: 0
  },
  {
    id: 'module-8',
    courseId: 'python-adventures',
    title: 'Building Projects',
    description: 'Put it all together and create awesome programs!',
    lessonsCount: 1,
    completed: false,
    locked: false,
    progress: 0
  }
];

// ==================== LESSONS DATA ====================
export const lessonsData: Lesson[] = [
  // MODULE 1: Getting Started with Python
  {
    id: 'lesson-m1-1',
    moduleId: 'module-1',
    title: 'Welcome to Python!',
    type: 'interactive',
    duration: '10 min',
    completed: true,
    content: {
      introduction: '🎉 Welcome to the exciting world of Python programming! Python is a friendly programming language that helps computers understand what you want them to do.',
      videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8',
      mainContent: [
        'Python is one of the most popular programming languages in the world! It\'s used to make games, websites, apps, and even control robots!',
        'What makes Python special is that it\'s easy to read and write. The code looks almost like English!',
        'You can use Python to create amazing things - from simple calculators to complex video games!'
      ],
      codeExamples: [
        {
          title: 'Your Very First Python Program',
          code: `# This is a comment - Python ignores these!
# Let's say hello to the world

print("Hello, World!")
print("My name is Alex")
print("I'm learning Python!")`,
          explanation: 'The print() function displays messages on the screen. Anything inside the quotes will be shown exactly as you write it!'
        }
      ],
      keyPoints: [
        'Python is a beginner-friendly programming language',
        'Use print() to display messages',
        'Comments start with # and help explain your code',
        'Python reads your code from top to bottom'
      ]
    }
  },
  {
    id: 'lesson-m1-2',
    moduleId: 'module-1',
    title: 'Making the Computer Talk',
    type: 'interactive',
    duration: '12 min',
    completed: true,
    content: {
      introduction: 'Let\'s learn how to make the computer display messages and talk to us! The print() function is your new best friend.',
      videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
      mainContent: [
        'The print() function is like a megaphone - it announces whatever you tell it to!',
        'You can print words, numbers, emojis, and even combine them together.',
        'Everything you want to print goes inside the parentheses ( ).'
      ],
      codeExamples: [
        {
          title: 'Printing Different Things',
          code: `# Print text (must use quotes)
print("I love coding!")

# Print numbers (no quotes needed)
print(42)
print(3.14)

# Print multiple things at once
print("My favorite number is", 7)

# Fun with emojis!
print("🎮 Let's code! 🚀")`,
          explanation: 'Text needs quotes, but numbers don\'t! You can print multiple things by separating them with commas.'
        }
      ],
      keyPoints: [
        'Use quotes for text: "like this"',
        'Numbers don\'t need quotes: 123',
        'Separate multiple items with commas',
        'Each print() starts on a new line'
      ]
    }
  },
  {
    id: 'lesson-m1-3',
    moduleId: 'module-1',
    title: 'Python as a Calculator',
    type: 'interactive',
    duration: '15 min',
    completed: true,
    content: {
      introduction: 'Did you know Python is amazing at math? Let\'s turn Python into your personal super calculator! 🔢',
      videoUrl: 'https://www.youtube.com/embed/Os4gZUI1ZxM',
      mainContent: [
        'Python can do all the math operations you know: addition, subtraction, multiplication, and division.',
        'Python follows the same order of operations you learn in school (PEMDAS).',
        'You can use parentheses ( ) to change the order of calculations, just like in math class!'
      ],
      codeExamples: [
        {
          title: 'Basic Math Operations',
          code: `# Addition
print(5 + 3)        # Result: 8

# Subtraction
print(10 - 4)       # Result: 6

# Multiplication (use *)
print(6 * 7)        # Result: 42

# Division (use /)
print(20 / 4)       # Result: 5.0

# Power (** means "to the power of")
print(2 ** 3)       # Result: 8 (2×2×2)`,
          explanation: 'Python understands math symbols! Use + - * / for basic operations, and ** for powers.'
        },
        {
          title: 'Order of Operations',
          code: `# Without parentheses
print(5 + 3 * 2)    # Result: 11 (does 3*2 first)

# With parentheses
print((5 + 3) * 2)  # Result: 16 (does 5+3 first)

# Complex calculation
print(10 + 5 * 2 - 3)  # Result: 17`,
          explanation: 'Python follows PEMDAS: Parentheses, Exponents, Multiplication/Division, Addition/Subtraction!'
        }
      ],
      keyPoints: [
        'Python can do addition (+), subtraction (-), multiplication (*), and division (/)',
        '** means "to the power of"',
        'Use parentheses ( ) to control the order',
        'Python follows PEMDAS rules'
      ]
    }
  },
  {
    id: 'lesson-m1-4',
    moduleId: 'module-1',
    title: 'Getting Input from Users',
    type: 'interactive',
    duration: '18 min',
    completed: true,
    content: {
      introduction: 'Want to make your programs interactive? Let\'s learn how to ask questions and get answers from users! 💬',
      videoUrl: 'https://www.youtube.com/embed/I2wURDqiXdM',
      mainContent: [
        'The input() function lets you ask the user a question and wait for their answer.',
        'Whatever the user types will be stored so you can use it later.',
        'This makes your programs interactive and fun - like having a conversation with the computer!'
      ],
      codeExamples: [
        {
          title: 'Asking for User Input',
          code: `# Ask for the user's name
name = input("What's your name? ")
print("Hello,", name, "! Nice to meet you!")

# Ask for their age
age = input("How old are you? ")
print("Wow!", age, "is a great age!")

# Ask about their favorite color
color = input("What's your favorite color? ")
print(color, "is an awesome color! 🎨")`,
          explanation: 'The input() function displays a question and waits. Whatever the user types gets stored in a variable!'
        }
      ],
      keyPoints: [
        'input() asks a question and waits for an answer',
        'The answer gets stored in a variable',
        'Always put your question inside quotes',
        'Make your programs interactive and fun!'
      ]
    }
  },
  
  // MODULE 2: Variables and Data Types
  {
    id: 'lesson-1',
    moduleId: 'module-2',
    title: 'What are Variables?',
    type: 'interactive',
    duration: '15 min',
    completed: true,
    content: {
      introduction: 'Variables are like boxes where you can store information. Just like you put toys in a toy box, you can put numbers, words, or other data in variables!',
      videoUrl: 'https://www.youtube.com/embed/Z1Yd7upQsXY',
      mainContent: [
        'Think of a variable as a labeled container. You give it a name, and then you can put something inside it.',
        'In Python, creating a variable is super easy. You just choose a name, use the equals sign (=), and then tell it what to store.',
        'Variables can hold different types of information: numbers, words (we call these "strings"), and more!'
      ],
      codeExamples: [
        {
          title: 'Creating Your First Variable',
          code: `# Store a number in a variable
age = 10

# Store text in a variable
name = "Alex"

# Store a decimal number
height = 4.5

# Print the variables
print(name)  # Prints: Alex
print(age)   # Prints: 10`,
          explanation: 'Here we created three variables: age (a whole number), name (text), and height (a decimal number). We can print them to see what\'s inside!'
        }
      ],
      keyPoints: [
        'Variables store information for later use',
        'Choose clear, descriptive names for your variables',
        'Use = to assign a value to a variable',
        'You can change what\'s in a variable anytime'
      ]
    }
  },
  {
    id: 'lesson-2',
    moduleId: 'module-2',
    title: 'Numbers in Python',
    type: 'interactive',
    duration: '20 min',
    completed: true,
    content: {
      introduction: 'Python is great at math! Let\'s learn about different types of numbers and how to use them.',
      videoUrl: 'https://www.youtube.com/embed/khKv-8q7YmY',
      mainContent: [
        'Python has two main types of numbers: integers (whole numbers) and floats (decimal numbers).',
        'You can do all sorts of math operations: addition (+), subtraction (-), multiplication (*), and division (/).',
        'Python follows the same math rules you learn in school, like doing multiplication before addition!'
      ],
      codeExamples: [
        {
          title: 'Math Operations',
          code: `# Basic math
apples = 5
oranges = 3
total_fruit = apples + oranges
print(total_fruit)  # Prints: 8

# More math
cookies = 12
friends = 4
cookies_per_friend = cookies / friends
print(cookies_per_friend)  # Prints: 3.0`,
          explanation: 'We can use variables in math just like regular numbers. Python does the calculation and gives us the answer!'
        }
      ],
      keyPoints: [
        'Integers are whole numbers (1, 2, 3...)',
        'Floats are decimal numbers (1.5, 2.7...)',
        'Use +, -, *, / for math operations',
        'Python calculates math for you automatically'
      ]
    }
  },
  {
    id: 'lesson-3',
    moduleId: 'module-2',
    title: 'Working with Strings',
    type: 'interactive',
    duration: '18 min',
    completed: true,
    content: {
      introduction: 'Strings are how we work with text in Python. Let\'s learn how to create and manipulate them!',
      videoUrl: 'https://www.youtube.com/embed/lSItwlnF0eU',
      mainContent: [
        'A string is just text surrounded by quotes. You can use single quotes (\') or double quotes (").',
        'You can combine strings together - this is called concatenation.',
        'Strings have special powers called "methods" that let you do cool things like make them uppercase or lowercase!'
      ],
      codeExamples: [
        {
          title: 'String Fun',
          code: `# Create strings
first_name = "Emma"
last_name = "Smith"

# Combine strings
full_name = first_name + " " + last_name
print(full_name)  # Prints: Emma Smith

# String methods
message = "hello world"
print(message.upper())  # Prints: HELLO WORLD
print(message.title())  # Prints: Hello World`,
          explanation: 'We can join strings together with + and use methods like .upper() and .title() to change how they look!'
        }
      ],
      keyPoints: [
        'Strings are text in quotes',
        'Use + to combine strings',
        'Methods like .upper() and .lower() transform strings',
        'Strings can contain letters, numbers, and symbols'
      ]
    }
  },
  {
    id: 'lesson-4',
    moduleId: 'module-2',
    title: 'Boolean Values: True or False',
    type: 'interactive',
    duration: '16 min',
    completed: false,
    content: {
      introduction: 'Sometimes in programming, we need to answer questions with "Yes" or "No". In Python, we use Boolean values: True and False! 🎯',
      videoUrl: 'https://www.youtube.com/embed/9OK32jb_TdI',
      mainContent: [
        'Boolean values are special - they can only be True or False (notice the capital letters!).',
        'We use booleans to make decisions in our programs, like "Is the game over?" or "Did the player win?"',
        'You can compare numbers and strings to get boolean answers!'
      ],
      codeExamples: [
        {
          title: 'Working with Booleans',
          code: `# Store boolean values
is_raining = False
has_homework = True
loves_coding = True

print("Is it raining?", is_raining)
print("Do I have homework?", has_homework)
print("Do I love coding?", loves_coding)

# Comparing numbers
print(5 > 3)   # True
print(10 < 8)  # False
print(7 == 7)  # True (equal to)`,
          explanation: 'Booleans help us answer yes/no questions. We can also compare values to get True or False answers!'
        }
      ],
      keyPoints: [
        'Boolean values are either True or False',
        'Always capitalize: True and False',
        'Use == to check if two things are equal',
        'Use >, <, >=, <= to compare numbers'
      ]
    }
  },
  {
    id: 'lesson-5',
    moduleId: 'module-2',
    title: 'Changing Variable Values',
    type: 'interactive',
    duration: '14 min',
    completed: false,
    content: {
      introduction: 'One of the coolest things about variables is that you can change what\'s inside them! Let\'s learn how to update variables. 🔄',
      videoUrl: 'https://www.youtube.com/embed/cQT33yu9pY8',
      mainContent: [
        'Variables aren\'t stuck with one value forever - you can change them anytime!',
        'You can even use the old value to calculate the new value, like increasing a score or counting up.',
        'This is super useful for games, counters, and keeping track of changes!'
      ],
      codeExamples: [
        {
          title: 'Updating Variables',
          code: `# Start with a score
score = 0
print("Starting score:", score)

# Player earns points!
score = score + 10
print("After level 1:", score)

# Earn more points
score = score + 25
print("After level 2:", score)

# A shorter way to add
score += 15  # Same as: score = score + 15
print("Final score:", score)`,
          explanation: 'We can update variables by giving them new values! The += operator is a shortcut for adding to a variable.'
        },
        {
          title: 'Counting and Tracking',
          code: `# Count apples
apples = 5
print("I have", apples, "apples")

# Eat some apples
apples = apples - 2
print("After eating 2:", apples, "apples left")

# Find more apples
apples += 3
print("After finding 3 more:", apples, "apples total! 🍎")`,
          explanation: 'Variables help us keep track of changing values, perfect for games and counters!'
        }
      ],
      keyPoints: [
        'Variables can be changed anytime',
        'You can use the old value to calculate the new value',
        '+= is a shortcut for adding to a variable',
        '-= is a shortcut for subtracting from a variable'
      ]
    }
  },
  
  // MODULE 3: Loops and Conditionals
  {
    id: 'lesson-m3-1',
    moduleId: 'module-3',
    title: 'Making Decisions with If Statements',
    type: 'interactive',
    duration: '20 min',
    completed: false,
    content: {
      introduction: 'Time to make your programs smart! Learn how to make decisions using if statements - they\'re like giving your code superpowers to think! 🧠',
      videoUrl: 'https://www.youtube.com/embed/f4KOjWS_KZs',
      mainContent: [
        'An if statement lets your program make choices based on conditions. Think of it like "IF it\'s raining, THEN bring an umbrella!"',
        'You can use comparison operators like == (equal), > (greater than), < (less than) to check conditions.',
        'The code inside an if statement only runs when the condition is True!'
      ],
      codeExamples: [
        {
          title: 'Your First If Statement',
          code: `# Simple decision making
age = 10

if age >= 10:
    print("You're old enough to join the coding club! 🎉")
    print("Welcome aboard!")

# Checking equality
favorite_color = "blue"

if favorite_color == "blue":
    print("Blue is my favorite too! 💙")`,
          explanation: 'The code after the if statement only runs when the condition is True. Notice the indentation - it shows what code belongs to the if!'
        },
        {
          title: 'If-Else: Two Choices',
          code: `# Check a number
number = 7

if number > 5:
    print("Your number is greater than 5! ✨")
else:
    print("Your number is 5 or less.")

# Password checker
password = "python123"

if password == "python123":
    print("✅ Access granted! Welcome!")
else:
    print("❌ Wrong password. Try again!")`,
          explanation: 'else gives you a backup plan! If the condition is False, the else code runs instead.'
        },
        {
          title: 'Multiple Conditions with elif',
          code: `# Grade checker
score = 85

if score >= 90:
    print("Amazing! You got an A! 🌟")
elif score >= 80:
    print("Great job! You got a B! 🎉")
elif score >= 70:
    print("Good work! You got a C! 👍")
else:
    print("Keep practicing! You'll improve! 💪")`,
          explanation: 'elif (else-if) lets you check multiple conditions! Python checks them in order and runs the first one that\'s True.'
        }
      ],
      keyPoints: [
        'if statements make decisions in your code',
        'Use : (colon) after the condition and indent the code inside',
        'else provides an alternative when the condition is False',
        'elif checks additional conditions in order',
        'Comparison operators: == (equal), != (not equal), >, <, >=, <='
      ]
    }
  },
  
  // MODULE 4: Functions and Methods
  {
    id: 'lesson-m4-1',
    moduleId: 'module-4',
    title: 'Creating Your Own Functions',
    type: 'interactive',
    duration: '22 min',
    completed: false,
    content: {
      introduction: 'Functions are like magic spells you can create and use over and over! Learn to write your own reusable code blocks. 🪄',
      videoUrl: 'https://www.youtube.com/embed/NSbOtYzIQI0',
      mainContent: [
        'A function is a reusable block of code that performs a specific task. Instead of writing the same code multiple times, you create a function!',
        'You define a function using the def keyword, give it a name, and tell it what to do.',
        'Once created, you can "call" (use) your function as many times as you want!'
      ],
      codeExamples: [
        {
          title: 'Creating Simple Functions',
          code: `# Define a function
def say_hello():
    print("Hello! 👋")
    print("Welcome to Python!")

# Call (use) the function
say_hello()
say_hello()  # We can use it again!

# Another function
def celebrate():
    print("🎉 Woohoo!")
    print("🎊 You're awesome!")
    print("⭐ Keep coding!")

celebrate()`,
          explanation: 'def creates a function. The code inside runs every time you call the function by writing its name with ()!'
        },
        {
          title: 'Functions with Parameters',
          code: `# Function that takes input
def greet(name):
    print("Hello,", name, "! 🌟")
    print("Nice to meet you!")

# Call with different names
greet("Alex")
greet("Emma")
greet("Mia")

# Function with multiple parameters
def introduce(name, age):
    print("Hi! I'm", name)
    print("I'm", age, "years old! 🎈")

introduce("Sam", 10)
introduce("Jordan", 12)`,
          explanation: 'Parameters let you pass information to your function! The function can use different values each time.'
        },
        {
          title: 'Functions that Return Values',
          code: `# Function that calculates and returns
def add_numbers(a, b):
    result = a + b
    return result

# Use the returned value
total = add_numbers(5, 3)
print("5 + 3 =", total)

# Another example
def double(number):
    return number * 2

doubled = double(7)
print("Double of 7 is:", doubled)

# Use directly in print
print("Double of 10 is:", double(10))`,
          explanation: 'return sends a value back from the function so you can use it! Think of it like the function\'s answer.'
        }
      ],
      keyPoints: [
        'def creates a function',
        'Functions must be defined before you can use them',
        'Parameters let functions receive input values',
        'return sends a value back from the function',
        'Functions help organize code and avoid repetition'
      ]
    }
  },
  
  // MODULE 5: Lists and Collections
  {
    id: 'lesson-m5-1',
    moduleId: 'module-5',
    title: 'Introduction to Lists',
    type: 'interactive',
    duration: '20 min',
    completed: false,
    content: {
      introduction: 'Lists are like super-powered variables that can hold multiple items! Learn how to organize and manage collections of data. 📝',
      videoUrl: 'https://www.youtube.com/embed/ohCDWZgNIU0',
      mainContent: [
        'A list is a container that can hold multiple items in order. Think of it like a shopping list or a playlist!',
        'Lists use square brackets [ ] and items are separated by commas.',
        'You can store different types of data in a list: numbers, strings, or even mix them together!'
      ],
      codeExamples: [
        {
          title: 'Creating Lists',
          code: `# List of favorite games
games = ["Minecraft", "Roblox", "Fortnite"]
print("My favorite games:", games)

# List of high scores
scores = [100, 85, 92, 78, 95]
print("High scores:", scores)

# Mixed list
my_info = ["Alex", 10, "Python", True]
print("About me:", my_info)

# Empty list (we'll add items later!)
shopping_cart = []
print("Cart:", shopping_cart)`,
          explanation: 'Lists hold multiple values in order. You can create them with different types of items or start with an empty list!'
        },
        {
          title: 'Accessing List Items',
          code: `# Create a list of fruits
fruits = ["apple", "banana", "orange", "grape"]

# Access by index (position starts at 0!)
print(fruits[0])  # First item: apple
print(fruits[1])  # Second item: banana
print(fruits[3])  # Fourth item: grape

# Access the last item
print(fruits[-1])  # Last item: grape

# Get list length
print("Total fruits:", len(fruits))`,
          explanation: 'Access items using their index (position). Remember: counting starts at 0! Use -1 to get the last item.'
        },
        {
          title: 'Modifying Lists',
          code: `# Start with a list
colors = ["red", "blue", "green"]
print("Original:", colors)

# Add items
colors.append("yellow")  # Add to the end
print("After append:", colors)

# Change an item
colors[1] = "purple"  # Change blue to purple
print("After change:", colors)

# Remove an item
colors.remove("red")  # Remove red
print("After remove:", colors)

# Insert at specific position
colors.insert(0, "pink")  # Add pink at start
print("After insert:", colors)`,
          explanation: 'Lists are flexible! You can add items with append(), change items by index, remove items, and insert at specific positions.'
        }
      ],
      keyPoints: [
        'Lists store multiple items in order using [ ]',
        'Index starts at 0 (first item is [0])',
        'Use -1 to access the last item',
        'append() adds items to the end',
        'remove() deletes a specific item',
        'Lists can be modified after creation'
      ]
    }
  },
  
  // MODULE 6: Loops (For and While)
  {
    id: 'lesson-m6-1',
    moduleId: 'module-6',
    title: 'Repeating with For Loops',
    type: 'interactive',
    duration: '22 min',
    completed: false,
    content: {
      introduction: 'Stop writing the same code over and over! Learn how to use loops to repeat actions automatically. 🔄',
      videoUrl: 'https://www.youtube.com/embed/94UHCEmprCY',
      mainContent: [
        'A for loop repeats code a specific number of times. It\'s like telling Python "do this 10 times!"',
        'For loops are perfect for going through lists, counting, or repeating any action.',
        'The loop variable changes each time, letting you do something different on each repetition.'
      ],
      codeExamples: [
        {
          title: 'Basic For Loops',
          code: `# Count from 0 to 4
for i in range(5):
    print("Count:", i)

print("Done counting! 🎉")

# Print a message multiple times
for i in range(3):
    print("I love Python! ❤️")

# Count from 1 to 5 (start, stop)
for number in range(1, 6):
    print("Number:", number)`,
          explanation: 'range(5) creates numbers 0-4. range(1, 6) creates 1-5. The loop runs once for each number!'
        },
        {
          title: 'Looping Through Lists',
          code: `# Loop through a list of names
friends = ["Emma", "Liam", "Sophia", "Noah"]

for friend in friends:
    print("Hello,", friend, "! 👋")

# Loop through numbers
scores = [95, 87, 92, 88, 100]
total = 0

for score in scores:
    total = total + score
    print("Current score:", score)

print("Total points:", total)
print("Average:", total / len(scores))`,
          explanation: 'You can loop through any list! The variable (friend, score) takes each value one at a time.'
        },
        {
          title: 'Fun with Loops',
          code: `# Countdown!
print("Rocket launch countdown:")
for num in range(10, 0, -1):
    print(num)
print("🚀 Blast off!")

# Build a pattern
for i in range(1, 6):
    stars = "⭐" * i
    print(stars)

# Shopping list
items = ["apples", "bread", "milk", "cookies"]
print("🛒 Shopping List:")
for item in items:
    print("  ✓", item)`,
          explanation: 'range(10, 0, -1) counts backwards! You can use loops to create patterns, countdowns, and more.'
        }
      ],
      keyPoints: [
        'for loops repeat code a specific number of times',
        'range(n) creates numbers from 0 to n-1',
        'range(start, stop) creates numbers from start to stop-1',
        'You can loop through lists with for item in list',
        'range(start, stop, step) lets you count by different amounts',
        'Loops save you from writing repetitive code'
      ]
    }
  },
  
  // MODULE 7: Dictionaries and Data
  {
    id: 'lesson-m7-1',
    moduleId: 'module-7',
    title: 'Working with Dictionaries',
    type: 'interactive',
    duration: '20 min',
    completed: false,
    content: {
      introduction: 'Dictionaries are like real dictionaries - they store pairs of keys and values! Learn to organize data with labels. 📖',
      videoUrl: 'https://www.youtube.com/embed/XCcpzWs773o',
      mainContent: [
        'A dictionary stores data as key-value pairs. The key is like a label that helps you find the value.',
        'Think of it like a real dictionary: the word (key) helps you find the definition (value)!',
        'Dictionaries use curly braces { } and colons : to connect keys to values.'
      ],
      codeExamples: [
        {
          title: 'Creating Dictionaries',
          code: `# Create a character profile
character = {
    "name": "Code Knight",
    "level": 5,
    "health": 100,
    "magic": 75
}

print("Character:", character)
print("Name:", character["name"])
print("Level:", character["level"])

# Game inventory
inventory = {
    "sword": 1,
    "potions": 5,
    "gold": 150
}

print("Gold:", inventory["gold"])`,
          explanation: 'Dictionaries use keys (like "name") to access values (like "Code Knight"). Much better than remembering positions!'
        },
        {
          title: 'Modifying Dictionaries',
          code: `# Player stats
player = {
    "name": "Alex",
    "score": 0,
    "lives": 3
}

print("Starting stats:", player)

# Change a value
player["score"] = 100
print("After gaining points:", player)

# Add a new key-value pair
player["level"] = 2
print("After leveling up:", player)

# Update multiple values
player["score"] = player["score"] + 50
player["lives"] = player["lives"] - 1
print("After playing:", player)`,
          explanation: 'You can change values, add new keys, and update existing data. Dictionaries are super flexible!'
        },
        {
          title: 'Dictionary Methods',
          code: `# Student information
student = {
    "name": "Emma",
    "age": 10,
    "grade": "5th",
    "favorite_subject": "Math"
}

# Get all keys
print("Keys:", student.keys())

# Get all values
print("Values:", student.values())

# Check if key exists
if "age" in student:
    print("Age:", student["age"])

# Get with default value
hobby = student.get("hobby", "Unknown")
print("Hobby:", hobby)`,
          explanation: 'Dictionary methods help you explore and safely access data. .get() prevents errors if a key doesn\'t exist!'
        }
      ],
      keyPoints: [
        'Dictionaries store key-value pairs using { }',
        'Access values using keys: dict[key]',
        'Keys are like labels for your data',
        'Add new items: dict[new_key] = value',
        'Use .get() to safely access keys',
        'Perfect for storing related information together'
      ]
    }
  },
  
  // MODULE 8: Building Projects
  {
    id: 'lesson-m8-1',
    moduleId: 'module-8',
    title: 'Building a Number Guessing Game',
    type: 'interactive',
    duration: '25 min',
    completed: false,
    content: {
      introduction: 'Time to build a real project! Let\'s create a fun number guessing game using everything you\'ve learned! 🎮',
      videoUrl: 'https://www.youtube.com/embed/8ext9G7xspg',
      mainContent: [
        'Building projects is the best way to practice programming! You\'ll use variables, conditionals, loops, and functions.',
        'We\'ll create a guessing game where the computer picks a number and you try to guess it.',
        'This project combines all your Python skills into one awesome game!'
      ],
      codeExamples: [
        {
          title: 'Simple Guessing Game',
          code: `# Import random module
import random

# Computer picks a number
secret_number = random.randint(1, 10)
print("🎮 Welcome to the Guessing Game!")
print("I'm thinking of a number between 1 and 10...")

# Player guesses
guess = int(input("What's your guess? "))

# Check if correct
if guess == secret_number:
    print("🎉 Amazing! You got it!")
elif guess < secret_number:
    print("📈 Too low! Try again!")
else:
    print("📉 Too high! Try again!")

print("The number was:", secret_number)`,
          explanation: 'This simple version uses random numbers, input, and if-elif-else to create a basic game!'
        },
        {
          title: 'Enhanced Game with Loop',
          code: `import random

secret_number = random.randint(1, 20)
attempts = 0
max_attempts = 5

print("🎮 Number Guessing Game!")
print("Guess a number between 1 and 20")
print(f"You have {max_attempts} attempts!")

for attempt in range(max_attempts):
    attempts += 1
    guess = int(input(f"\\nAttempt {attempts}: "))
    
    if guess == secret_number:
        print(f"🎉 You won in {attempts} attempts!")
        break
    elif guess < secret_number:
        print("📈 Higher!")
    else:
        print("📉 Lower!")
else:
    print(f"\\n😅 Game over! The number was {secret_number}")`,
          explanation: 'This version uses a for loop to give multiple attempts. The break statement ends the loop when you win!'
        },
        {
          title: 'Complete Game with Functions',
          code: `import random

def play_game():
    secret = random.randint(1, 50)
    attempts = 0
    
    print("\\n🎮 Number Guessing Game!")
    print("Guess between 1 and 50")
    
    while True:
        try:
            guess = int(input("\\nYour guess: "))
            attempts += 1
            
            if guess == secret:
                print(f"🎉 Winner! You got it in {attempts} tries!")
                return attempts
            elif guess < secret:
                print("📈 Go higher!")
            else:
                print("📉 Go lower!")
                
        except:
            print("❌ Please enter a valid number!")

# Main game
print("Welcome, Player! 🌟")
score = play_game()

if score <= 3:
    print("⭐⭐⭐ Excellent!")
elif score <= 7:
    print("⭐⭐ Good job!")
else:
    print("⭐ Keep practicing!")`,
          explanation: 'The complete game uses functions, while loops, error handling, and gives you a star rating! This is real programming!'
        }
      ],
      keyPoints: [
        'Projects combine multiple programming concepts',
        'Functions help organize your code',
        'Loops let users play multiple times',
        'Error handling makes your program robust',
        'Building projects is the best way to learn',
        'Start simple, then add features gradually'
      ]
    }
  }
];

// ==================== PRACTICE PROBLEMS DATA ====================
export const practiceProblemsData: PracticeProblem[] = [
  {
    id: 'practice-1',
    title: 'Hello, Name!',
    difficulty: 'easy',
    description: 'Write a program that asks for someone\'s name and then says hello to them.',
    starterCode: `# Ask for the user's name
name = input("What's your name? ")

# Say hello to them
# YOUR CODE HERE`,
    solution: `# Ask for the user's name
name = input("What's your name? ")

# Say hello to them
print("Hello, " + name + "!")`,
    hints: [
      'Use the print() function to display the greeting',
      'Combine "Hello, " with the name variable using +',
      'Don\'t forget to add an exclamation mark at the end!'
    ],
    testCases: [
      { input: 'Alex', expectedOutput: 'Hello, Alex!' },
      { input: 'Emma', expectedOutput: 'Hello, Emma!' }
    ]
  },
  {
    id: 'practice-2',
    title: 'Age Calculator',
    difficulty: 'easy',
    description: 'Create a program that calculates how old someone will be next year.',
    starterCode: `# Ask for current age
current_age = int(input("How old are you? "))

# Calculate next year's age
# YOUR CODE HERE`,
    solution: `# Ask for current age
current_age = int(input("How old are you? "))

# Calculate next year's age
next_year_age = current_age + 1
print("Next year you will be " + str(next_year_age) + " years old!")`,
    hints: [
      'Add 1 to the current age to get next year\'s age',
      'Store the result in a variable',
      'Use str() to convert the number to text when printing'
    ],
    testCases: [
      { input: '10', expectedOutput: 'Next year you will be 11 years old!' },
      { input: '8', expectedOutput: 'Next year you will be 9 years old!' }
    ]
  },
  {
    id: 'practice-3',
    title: 'Favorite Color',
    difficulty: 'easy',
    description: 'Write a program that asks for someone\'s favorite color and creates a fun sentence about it.',
    starterCode: `# Ask for favorite color
color = input("What's your favorite color? ")

# Create a fun sentence
# YOUR CODE HERE`,
    solution: `# Ask for favorite color
color = input("What's your favorite color? ")

# Create a fun sentence
print("Wow! " + color.title() + " is an awesome color!")`,
    hints: [
      'Use the .title() method to capitalize the color',
      'Combine strings to create your sentence',
      'Be creative with your message!'
    ],
    testCases: [
      { input: 'blue', expectedOutput: 'Wow! Blue is an awesome color!' },
      { input: 'red', expectedOutput: 'Wow! Red is an awesome color!' }
    ]
  }
];

// ==================== CHALLENGES DATA ====================
// Each module has exactly ONE unique challenge
export const challengesData: Challenge[] = newChallengesData;

// ==================== QUIZ DATA ====================
// Each module has exactly 3 quizzes
export const quizzesData: Quiz[] = newQuizzesData;

// OLD CODE BELOW - TO BE REMOVED
/*
  // MODULE 1: Getting Started with Python
  {
    id: 'challenge-m1',
    moduleId: 'module-1',
    title: 'Personal Introduction Generator',
    description: 'Create a program that asks for your name, age, and favorite hobby, then prints a fun introduction about yourself!',
    timeLimit: 300,
    difficulty: 'easy',
    points: 100,
    starterCode: `# Get two numbers from the user
num1 = int(input("Enter first number: "))
num2 = int(input("Enter second number: "))

# Calculate and display results
# YOUR CODE HERE`,
    solution: `# Get two numbers from the user
num1 = int(input("Enter first number: "))
num2 = int(input("Enter second number: "))

# Calculate and display results
sum_result = num1 + num2
diff_result = num1 - num2
product_result = num1 * num2

print("Sum: " + str(sum_result))
print("Difference: " + str(diff_result))
print("Product: " + str(product_result))`,
    testCases: [
      { input: '5, 3', expectedOutput: 'Sum: 8\nDifference: 2\nProduct: 15' },
      { input: '10, 2', expectedOutput: 'Sum: 12\nDifference: 8\nProduct: 20' }
    ]
  },
  {
    id: 'challenge-2',
    title: 'Story Builder',
    description: 'Build a program that asks for a name, place, and animal, then creates a fun story!',
    timeLimit: 420,
    difficulty: 'medium',
    points: 150,
    starterCode: `# Ask for story elements
name = input("Enter a name: ")
place = input("Enter a place: ")
animal = input("Enter an animal: ")

# Create the story
# YOUR CODE HERE`,
    solution: `# Ask for story elements
name = input("Enter a name: ")
place = input("Enter a place: ")
animal = input("Enter an animal: ")

# Create the story
story = "Once upon a time, " + name + " went to " + place + "."
story = story + " There, they met a friendly " + animal + "!"
story = story + " They became best friends and had many adventures together."

print(story)`,
    testCases: [
      { input: 'Alex, the park, dog', expectedOutput: 'Once upon a time, Alex went to the park. There, they met a friendly dog! They became best friends and had many adventures together.' }
    ]
  }
];
*/

// ==================== FEATURES DATA ====================
export const featuresData: Feature[] = [
  {
    title: 'Interactive Learning',
    description: 'Learn by doing with hands-on coding exercises and instant feedback',
    icon: '🎯'
  },
  {
    title: 'Gamified Experience',
    description: 'Earn badges, points, and unlock achievements as you progress',
    icon: '🏆'
  },
  {
    title: 'Kid-Friendly Content',
    description: 'Age-appropriate lessons designed specifically for young learners',
    icon: '🎨'
  },
  {
    title: 'Track Progress',
    description: 'Monitor your learning journey with detailed progress tracking',
    icon: '📊'
  },
  {
    title: 'Fun Challenges',
    description: 'Test your skills with exciting coding challenges and puzzles',
    icon: '🎮'
  },
  {
    title: 'Safe Environment',
    description: 'A secure, ad-free platform designed for kids',
    icon: '🛡️'
  }
];

// ==================== TESTIMONIALS DATA ====================
export const testimonialsData: Testimonial[] = [
  {
    name: 'Emma',
    age: 10,
    text: 'I love learning Python! The lessons are so fun and easy to understand. I made my first game last week!',
    rating: 5,
    avatar: '👧'
  },
  {
    name: 'Alex',
    age: 9,
    text: 'This is the best coding website ever! I earned 5 badges already and I can\'t wait to learn more.',
    rating: 5,
    avatar: '👦'
  },
  {
    name: 'Sofia',
    age: 11,
    text: 'The challenges are really cool! I like solving coding puzzles and seeing my progress go up.',
    rating: 5,
    avatar: '👧'
  },
  {
    name: 'Liam',
    age: 8,
    text: 'I didn\'t know coding could be this fun! Now I want to become a game developer when I grow up.',
    rating: 5,
    avatar: '👦'
  }
];

// ==================== USER PROGRESS DATA ====================
export const userProgressData: UserProgress = {
  coursesCompleted: 0,
  totalCourses: 1,
  lessonsCompleted: 6,
  totalLessons: 12,
  challengesCompleted: 3,
  totalChallenges: 10,
  quizzesPassed: 2,
  totalQuizzes: 4,
  currentStreak: 7,
  totalPoints: 850,
  badges: [
    {
      id: 'first-lesson',
      title: 'First Steps',
      description: 'Completed your first lesson',
      icon: '🎯',
      earned: true,
      earnedDate: '2025-10-07'
    },
    {
      id: 'quick-learner',
      title: 'Quick Learner',
      description: 'Completed 5 lessons in one week',
      icon: '⚡',
      earned: true,
      earnedDate: '2025-10-10'
    },
    {
      id: 'code-warrior',
      title: 'Code Warrior',
      description: 'Solved 10 practice problems',
      icon: '⚔️',
      earned: true,
      earnedDate: '2025-10-12'
    },
    {
      id: 'streak-master',
      title: 'Streak Master',
      description: 'Maintained a 7-day learning streak',
      icon: '🔥',
      earned: true,
      earnedDate: '2025-10-14'
    },
    {
      id: 'quiz-champion',
      title: 'Quiz Champion',
      description: 'Pass 5 quizzes with 100% score',
      icon: '🏆',
      earned: false
    },
    {
      id: 'challenge-master',
      title: 'Challenge Master',
      description: 'Complete all challenges in a module',
      icon: '🎮',
      earned: false
    }
  ],
  recentActivity: [
    {
      id: 'activity-1',
      type: 'lesson',
      title: 'Completed "Working with Strings"',
      date: '2025-10-14',
      points: 50
    },
    {
      id: 'activity-2',
      type: 'challenge',
      title: 'Solved "The Math Magician"',
      date: '2025-10-13',
      points: 100
    },
    {
      id: 'activity-3',
      type: 'quiz',
      title: 'Passed "Variables and Data Types Quiz"',
      date: '2025-10-13',
      points: 150
    },
    {
      id: 'activity-4',
      type: 'practice',
      title: 'Completed "Age Calculator"',
      date: '2025-10-12',
      points: 50
    },
    {
      id: 'activity-5',
      type: 'lesson',
      title: 'Completed "Numbers in Python"',
      date: '2025-10-11',
      points: 50
    }
  ],
  weeklyProgress: [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 60 },
    { day: 'Wed', minutes: 30 },
    { day: 'Thu', minutes: 75 },
    { day: 'Fri', minutes: 50 },
    { day: 'Sat', minutes: 90 },
    { day: 'Sun', minutes: 40 }
  ]
};

// ==================== API FUNCTIONS ====================

export const getCourses = (): Promise<Course[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(coursesData), 100);
  });
};

export const getCourseById = (id: string): Promise<Course | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(coursesData.find(c => c.id === id)), 100);
  });
};

export const getModulesByCourseId = (courseId: string): Promise<Module[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(modulesData.filter(m => m.courseId === courseId)), 100);
  });
};

export const getModuleById = (id: string): Promise<Module | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(modulesData.find(m => m.id === id)), 100);
  });
};

export const getLessonsByModuleId = (moduleId: string): Promise<Lesson[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(lessonsData.filter(l => l.moduleId === moduleId)), 100);
  });
};

export const getLessonById = (id: string): Promise<Lesson | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(lessonsData.find(l => l.id === id)), 100);
  });
};

export const getPracticeProblems = (): Promise<PracticeProblem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(practiceProblemsData), 100);
  });
};

export const getPracticeProblemById = (id: string): Promise<PracticeProblem | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(practiceProblemsData.find(p => p.id === id)), 100);
  });
};

export const getChallenges = (): Promise<Challenge[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(challengesData), 100);
  });
};

export const getChallengeById = (id: string): Promise<Challenge | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(challengesData.find(c => c.id === id)), 100);
  });
};

export const getChallengeByModuleId = (moduleId: string): Promise<Challenge | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(challengesData.find(c => c.moduleId === moduleId)), 100);
  });
};

export const getQuizzesByModuleId = (moduleId: string): Promise<Quiz[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(quizzesData.filter(q => q.moduleId === moduleId)), 100);
  });
};

export const getQuizByModuleId = (moduleId: string): Promise<Quiz | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(quizzesData.find(q => q.moduleId === moduleId)), 100);
  });
};

export const getFeatures = (): Promise<Feature[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(featuresData), 100);
  });
};

export const getTestimonials = (): Promise<Testimonial[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(testimonialsData), 100);
  });
};

export const getUserProgress = (): Promise<UserProgress> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(userProgressData), 100);
  });
};
