// Challenges and Quizzes Data for all 8 modules
import { Challenge, Quiz } from './data';

// ==================== CHALLENGES DATA ====================
// Each module has exactly ONE unique challenge
export const newChallengesData: Challenge[] = [
  // MODULE 1: Getting Started with Python
  {
    id: 'challenge-m1',
    moduleId: 'module-1',
    title: 'Personal Introduction Generator',
    description: 'Create a program that asks for your name, age, and favorite hobby, then prints a fun introduction about yourself!',
    timeLimit: 300,
    difficulty: 'easy',
    points: 100,
    starterCode: `# Ask for user information
name = input("What's your name? ")
age = input("How old are you? ")
hobby = input("What's your favorite hobby? ")

# Create and print introduction
# YOUR CODE HERE`,
    solution: `# Ask for user information
name = input("What's your name? ")
age = input("How old are you? ")
hobby = input("What's your favorite hobby? ")

# Create and print introduction
print("Hi! My name is", name)
print("I am", age, "years old")
print("I love to", hobby, "!")
print("Nice to meet you! 🎉")`,
    testCases: [
      { input: 'Alex, 10, play soccer', expectedOutput: 'Hi! My name is Alex\\nI am 10 years old\\nI love to play soccer !\\nNice to meet you! 🎉' }
    ]
  },
  
  // MODULE 2: Variables and Data Types
  {
    id: 'challenge-m2',
    moduleId: 'module-2',
    title: 'The Math Magician',
    description: 'Create a program that asks for two numbers and shows their sum, difference, product, and which number is larger!',
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
print("Sum:", num1 + num2)
print("Difference:", num1 - num2)
print("Product:", num1 * num2)
if num1 > num2:
    print("Larger number:", num1)
else:
    print("Larger number:", num2)`,
    testCases: [
      { input: '5, 3', expectedOutput: 'Sum: 8\\nDifference: 2\\nProduct: 15\\nLarger number: 5' }
    ]
  },
  
  // MODULE 3: Loops and Conditionals
  {
    id: 'challenge-m3',
    moduleId: 'module-3',
    title: 'Grade Evaluator',
    description: 'Build a program that takes a test score and tells the student if they got an A (90+), B (80-89), C (70-79), or need to study more!',
    timeLimit: 360,
    difficulty: 'medium',
    points: 150,
    starterCode: `# Get the test score
score = int(input("Enter your test score: "))

# Evaluate and print the grade
# YOUR CODE HERE`,
    solution: `# Get the test score
score = int(input("Enter your test score: "))

# Evaluate and print the grade
if score >= 90:
    print("Amazing! You got an A! 🌟")
elif score >= 80:
    print("Great job! You got a B! 🎉")
elif score >= 70:
    print("Good work! You got a C! 👍")
else:
    print("Keep studying! You can do better! 💪")`,
    testCases: [
      { input: '95', expectedOutput: 'Amazing! You got an A! 🌟' },
      { input: '85', expectedOutput: 'Great job! You got a B! 🎉' }
    ]
  },
  
  // MODULE 4: Functions and Methods
  {
    id: 'challenge-m4',
    moduleId: 'module-4',
    title: 'Function Master',
    description: 'Create functions that calculate the area of a rectangle and a circle, then use them to solve problems!',
    timeLimit: 420,
    difficulty: 'medium',
    points: 150,
    starterCode: `# Create a function to calculate rectangle area
def rectangle_area(length, width):
    # YOUR CODE HERE
    pass

# Create a function to calculate circle area (use 3.14 for pi)
def circle_area(radius):
    # YOUR CODE HERE
    pass

# Test your functions
print("Rectangle (5 x 3):", rectangle_area(5, 3))
print("Circle (radius 4):", circle_area(4))`,
    solution: `# Create a function to calculate rectangle area
def rectangle_area(length, width):
    return length * width

# Create a function to calculate circle area (use 3.14 for pi)
def circle_area(radius):
    return 3.14 * radius * radius

# Test your functions
print("Rectangle (5 x 3):", rectangle_area(5, 3))
print("Circle (radius 4):", circle_area(4))`,
    testCases: [
      { input: '', expectedOutput: 'Rectangle (5 x 3): 15\\nCircle (radius 4): 50.24' }
    ]
  },
  
  // MODULE 5: Lists and Collections
  {
    id: 'challenge-m5',
    moduleId: 'module-5',
    title: 'Shopping List Manager',
    description: 'Create a shopping list program that stores items, displays them, and counts how many items you have!',
    timeLimit: 360,
    difficulty: 'medium',
    points: 150,
    starterCode: `# Create an empty shopping list
shopping_list = []

# Add 3 items to the list
# YOUR CODE HERE

# Display the list and count
# YOUR CODE HERE`,
    solution: `# Create an empty shopping list
shopping_list = []

# Add 3 items to the list
shopping_list.append("apples")
shopping_list.append("bread")
shopping_list.append("milk")

# Display the list and count
print("Shopping List:", shopping_list)
print("Total items:", len(shopping_list))
print("First item:", shopping_list[0])`,
    testCases: [
      { input: '', expectedOutput: "Shopping List: ['apples', 'bread', 'milk']\\nTotal items: 3\\nFirst item: apples" }
    ]
  },
  
  // MODULE 6: Loops: For and While
  {
    id: 'challenge-m6',
    moduleId: 'module-6',
    title: 'Countdown Timer',
    description: 'Build a countdown program that counts from 10 to 1, then prints "Blast off!"',
    timeLimit: 300,
    difficulty: 'easy',
    points: 100,
    starterCode: `# Create a countdown from 10 to 1
# YOUR CODE HERE

# Print blast off message
# YOUR CODE HERE`,
    solution: `# Create a countdown from 10 to 1
for i in range(10, 0, -1):
    print(i)

# Print blast off message
print("Blast off! 🚀")`,
    testCases: [
      { input: '', expectedOutput: '10\\n9\\n8\\n7\\n6\\n5\\n4\\n3\\n2\\n1\\nBlast off! 🚀' }
    ]
  },
  
  // MODULE 7: Dictionaries and Data
  {
    id: 'challenge-m7',
    moduleId: 'module-7',
    title: 'Student Profile Creator',
    description: 'Create a dictionary to store a student\'s name, age, grade, and favorite subject, then display it nicely!',
    timeLimit: 360,
    difficulty: 'medium',
    points: 150,
    starterCode: `# Create a student dictionary
student = {
    # YOUR CODE HERE
}

# Display the student information
# YOUR CODE HERE`,
    solution: `# Create a student dictionary
student = {
    "name": "Alex",
    "age": 10,
    "grade": "5th",
    "favorite_subject": "Math"
}

# Display the student information
print("Student Profile:")
print("Name:", student["name"])
print("Age:", student["age"])
print("Grade:", student["grade"])
print("Favorite Subject:", student["favorite_subject"])`,
    testCases: [
      { input: '', expectedOutput: 'Student Profile:\\nName: Alex\\nAge: 10\\nGrade: 5th\\nFavorite Subject: Math' }
    ]
  },
  
  // MODULE 8: Building Projects
  {
    id: 'challenge-m8',
    moduleId: 'module-8',
    title: 'Mini Calculator Project',
    description: 'Build a calculator that can add, subtract, multiply, and divide two numbers based on user choice!',
    timeLimit: 480,
    difficulty: 'hard',
    points: 200,
    starterCode: `# Get two numbers from user
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))
operation = input("Choose operation (+, -, *, /): ")

# Perform calculation based on operation
# YOUR CODE HERE`,
    solution: `# Get two numbers from user
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))
operation = input("Choose operation (+, -, *, /): ")

# Perform calculation based on operation
if operation == "+":
    result = num1 + num2
    print("Result:", result)
elif operation == "-":
    result = num1 - num2
    print("Result:", result)
elif operation == "*":
    result = num1 * num2
    print("Result:", result)
elif operation == "/":
    if num2 != 0:
        result = num1 / num2
        print("Result:", result)
    else:
        print("Error: Cannot divide by zero!")
else:
    print("Invalid operation!")`,
    testCases: [
      { input: '10, 5, +', expectedOutput: 'Result: 15.0' },
      { input: '10, 5, *', expectedOutput: 'Result: 50.0' }
    ]
  }
];

// ==================== QUIZ DATA ====================
// Each module has exactly 3 quizzes
export const newQuizzesData: Quiz[] = [
  // MODULE 1 QUIZZES (3 quizzes)
  {
    id: 'quiz-m1-1',
    moduleId: 'module-1',
    title: 'Getting Started Quiz 1',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m1-1',
        question: 'What does the print() function do in Python?',
        options: ['Prints documents', 'Displays output on the screen', 'Saves files', 'Creates variables'],
        correctAnswer: 1,
        explanation: 'The print() function displays output on the screen, showing whatever you put inside the parentheses.'
      },
      {
        id: 'q2-m1-1',
        question: 'Which symbol is used for comments in Python?',
        options: ['//', '#', '/*', '--'],
        correctAnswer: 1,
        explanation: 'In Python, comments start with the # symbol. Everything after # on that line is ignored by Python.'
      },
      {
        id: 'q3-m1-1',
        question: 'What will print("Hello", "World") display?',
        options: ['HelloWorld', 'Hello World', 'Hello, World', 'Error'],
        correctAnswer: 1,
        explanation: 'When you separate items with commas in print(), Python automatically adds a space between them.'
      }
    ]
  },
  {
    id: 'quiz-m1-2',
    moduleId: 'module-1',
    title: 'Getting Started Quiz 2',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m1-2',
        question: 'What is the result of 10 + 5 * 2 in Python?',
        options: ['30', '20', '15', '25'],
        correctAnswer: 1,
        explanation: 'Python follows PEMDAS, so multiplication happens first: 5 * 2 = 10, then 10 + 10 = 20.'
      },
      {
        id: 'q2-m1-2',
        question: 'What symbol is used for multiplication in Python?',
        options: ['x', '*', 'X', 'mult'],
        correctAnswer: 1,
        explanation: 'Python uses the asterisk (*) symbol for multiplication.'
      },
      {
        id: 'q3-m1-2',
        question: 'What will 2 ** 3 evaluate to?',
        options: ['6', '8', '5', '9'],
        correctAnswer: 1,
        explanation: '** means "to the power of", so 2 ** 3 means 2³ = 2 × 2 × 2 = 8.'
      }
    ]
  },
  {
    id: 'quiz-m1-3',
    moduleId: 'module-1',
    title: 'Getting Started Quiz 3',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m1-3',
        question: 'What does the input() function do?',
        options: ['Prints text', 'Gets input from the user', 'Does math', 'Creates files'],
        correctAnswer: 1,
        explanation: 'The input() function asks the user to type something and waits for their response.'
      },
      {
        id: 'q2-m1-3',
        question: 'Do you need quotes around numbers when using print()?',
        options: ['Yes, always', 'No, numbers don\'t need quotes', 'Only for big numbers', 'Only for negative numbers'],
        correctAnswer: 1,
        explanation: 'Numbers don\'t need quotes. Quotes are only for text (strings). print(42) works fine!'
      },
      {
        id: 'q3-m1-3',
        question: 'What will print(10 / 2) display?',
        options: ['5', '5.0', '10/2', 'Error'],
        correctAnswer: 1,
        explanation: 'Division in Python always returns a decimal number (float), so 10 / 2 gives 5.0.'
      }
    ]
  },

  // MODULE 2 QUIZZES (3 quizzes)
  {
    id: 'quiz-m2-1',
    moduleId: 'module-2',
    title: 'Variables Quiz 1',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m2-1',
        question: 'What symbol do we use to assign a value to a variable in Python?',
        options: ['=', '==', ':', '->'],
        correctAnswer: 0,
        explanation: 'We use the single equals sign (=) to assign values to variables. The double equals (==) is used for comparing values.'
      },
      {
        id: 'q2-m2-1',
        question: 'Which of these is a valid variable name in Python?',
        options: ['2cool', 'my-variable', 'my_age', 'my variable'],
        correctAnswer: 2,
        explanation: 'Variable names can contain letters, numbers, and underscores, but cannot start with a number or contain spaces or hyphens.'
      },
      {
        id: 'q3-m2-1',
        question: 'What type of data is "Hello, World!"?',
        options: ['Integer', 'String', 'Float', 'Boolean'],
        correctAnswer: 1,
        explanation: 'Text in quotes is called a string. It can contain letters, numbers, and symbols.'
      }
    ]
  },
  {
    id: 'quiz-m2-2',
    moduleId: 'module-2',
    title: 'Variables Quiz 2',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m2-2',
        question: 'What will this code print? x = 5 + 3',
        options: ['5 + 3', '8', 'x', 'Error'],
        correctAnswer: 1,
        explanation: 'Python calculates 5 + 3 and stores the result (8) in the variable x.'
      },
      {
        id: 'q2-m2-2',
        question: 'How do you combine two strings together?',
        options: ['Using the + symbol', 'Using the * symbol', 'Using the - symbol', 'Using the / symbol'],
        correctAnswer: 0,
        explanation: 'The + operator combines (concatenates) strings together. For example: "Hello" + "World" becomes "HelloWorld".'
      },
      {
        id: 'q3-m2-2',
        question: 'What is the difference between an integer and a float?',
        options: ['There is no difference', 'Integers are whole numbers, floats have decimals', 'Floats are bigger', 'Integers can be negative'],
        correctAnswer: 1,
        explanation: 'Integers are whole numbers (like 5, 10, -3), while floats are decimal numbers (like 3.14, 2.5).'
      }
    ]
  },
  {
    id: 'quiz-m2-3',
    moduleId: 'module-2',
    title: 'Variables Quiz 3',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m2-3',
        question: 'What are the only two Boolean values in Python?',
        options: ['Yes and No', 'True and False', '1 and 0', 'On and Off'],
        correctAnswer: 1,
        explanation: 'Boolean values in Python are True and False (with capital letters).'
      },
      {
        id: 'q2-m2-3',
        question: 'What does the += operator do?',
        options: ['Compares two values', 'Adds and assigns', 'Subtracts values', 'Creates a list'],
        correctAnswer: 1,
        explanation: 'The += operator adds a value to a variable and stores the result. x += 5 is the same as x = x + 5.'
      },
      {
        id: 'q3-m2-3',
        question: 'What will "hello".upper() return?',
        options: ['hello', 'HELLO', 'Hello', 'HeLLo'],
        correctAnswer: 1,
        explanation: 'The .upper() method converts all letters in a string to uppercase.'
      }
    ]
  },

  // MODULE 3 QUIZZES (3 quizzes)
  {
    id: 'quiz-m3-1',
    moduleId: 'module-3',
    title: 'Conditionals Quiz 1',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m3-1',
        question: 'What symbol is used at the end of an if statement?',
        options: [';', ':', '!', '.'],
        correctAnswer: 1,
        explanation: 'Python uses a colon (:) at the end of if statements to show where the condition ends.'
      },
      {
        id: 'q2-m3-1',
        question: 'What does == mean in Python?',
        options: ['Assign a value', 'Check if equal', 'Not equal', 'Greater than'],
        correctAnswer: 1,
        explanation: 'The == operator checks if two values are equal. A single = assigns values.'
      },
      {
        id: 'q3-m3-1',
        question: 'What is elif short for?',
        options: ['Else if', 'Eliminate if', 'Electric if', 'Element if'],
        correctAnswer: 0,
        explanation: 'elif stands for "else if" and lets you check additional conditions.'
      }
    ]
  },
  {
    id: 'quiz-m3-2',
    moduleId: 'module-3',
    title: 'Conditionals Quiz 2',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m3-2',
        question: 'In an if-elif-else chain, which part is required?',
        options: ['All three parts', 'Only if', 'Only else', 'if and else'],
        correctAnswer: 1,
        explanation: 'Only the if part is required. elif and else are optional.'
      },
      {
        id: 'q2-m3-2',
        question: 'What does the > operator check?',
        options: ['Equal to', 'Greater than', 'Less than', 'Not equal'],
        correctAnswer: 1,
        explanation: 'The > operator checks if the left value is greater than the right value.'
      },
      {
        id: 'q3-m3-2',
        question: 'When does the else block run?',
        options: ['Always', 'Never', 'When all if/elif conditions are False', 'When the first condition is True'],
        correctAnswer: 2,
        explanation: 'The else block runs only when all the if and elif conditions before it are False.'
      }
    ]
  },
  {
    id: 'quiz-m3-3',
    moduleId: 'module-3',
    title: 'Conditionals Quiz 3',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m3-3',
        question: 'What is indentation in Python?',
        options: ['Adding comments', 'Spaces at the start of lines', 'Variable names', 'Print statements'],
        correctAnswer: 1,
        explanation: 'Indentation is the spaces at the beginning of lines. Python uses it to group code together.'
      },
      {
        id: 'q2-m3-3',
        question: 'What will (5 != 5) evaluate to?',
        options: ['True', 'False', 'Error', '0'],
        correctAnswer: 1,
        explanation: 'The != operator means "not equal". Since 5 equals 5, this is False.'
      },
      {
        id: 'q3-m3-3',
        question: 'Can you have multiple elif statements?',
        options: ['No, only one', 'Yes, as many as you need', 'Only two', 'Only if you have else'],
        correctAnswer: 1,
        explanation: 'You can have as many elif statements as you need to check multiple conditions.'
      }
    ]
  },

  // MODULE 4 QUIZZES (3 quizzes)
  {
    id: 'quiz-m4-1',
    moduleId: 'module-4',
    title: 'Functions Quiz 1',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m4-1',
        question: 'What keyword is used to create a function in Python?',
        options: ['function', 'def', 'create', 'func'],
        correctAnswer: 1,
        explanation: 'The def keyword is used to define (create) functions in Python.'
      },
      {
        id: 'q2-m4-1',
        question: 'What are parameters in a function?',
        options: ['Output values', 'Input values', 'Variable names', 'Return statements'],
        correctAnswer: 1,
        explanation: 'Parameters are the input values that a function receives when it\'s called.'
      },
      {
        id: 'q3-m4-1',
        question: 'How do you call a function named greet?',
        options: ['call greet', 'greet()', 'run greet', 'execute greet'],
        correctAnswer: 1,
        explanation: 'To call a function, write its name followed by parentheses: greet().'
      }
    ]
  },
  {
    id: 'quiz-m4-2',
    moduleId: 'module-4',
    title: 'Functions Quiz 2',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m4-2',
        question: 'What does the return statement do?',
        options: ['Ends the program', 'Sends a value back from the function', 'Prints output', 'Creates a variable'],
        correctAnswer: 1,
        explanation: 'The return statement sends a value back from the function so you can use it elsewhere.'
      },
      {
        id: 'q2-m4-2',
        question: 'Can a function have multiple parameters?',
        options: ['No', 'Yes', 'Only two', 'Only if they\'re the same type'],
        correctAnswer: 1,
        explanation: 'Functions can have as many parameters as you need, separated by commas.'
      },
      {
        id: 'q3-m4-2',
        question: 'What happens if you don\'t use return in a function?',
        options: ['Error occurs', 'Function returns None', 'Program crashes', 'Function repeats'],
        correctAnswer: 1,
        explanation: 'If a function doesn\'t have a return statement, it automatically returns None.'
      }
    ]
  },
  {
    id: 'quiz-m4-3',
    moduleId: 'module-4',
    title: 'Functions Quiz 3',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m4-3',
        question: 'Why are functions useful?',
        options: ['They make code colorful', 'They let you reuse code', 'They make programs slower', 'They delete variables'],
        correctAnswer: 1,
        explanation: 'Functions let you write code once and reuse it many times, making your programs cleaner and easier to manage.'
      },
      {
        id: 'q2-m4-3',
        question: 'What are the values you pass to a function called?',
        options: ['Parameters', 'Arguments', 'Returns', 'Outputs'],
        correctAnswer: 1,
        explanation: 'The values you pass when calling a function are called arguments. The function receives them as parameters.'
      },
      {
        id: 'q3-m4-3',
        question: 'Can you call a function before defining it?',
        options: ['Yes, always', 'No, define it first', 'Only sometimes', 'Only in Python 3'],
        correctAnswer: 1,
        explanation: 'You must define a function before you can call it. Python reads code from top to bottom.'
      }
    ]
  },

  // MODULE 5 QUIZZES (3 quizzes)
  {
    id: 'quiz-m5-1',
    moduleId: 'module-5',
    title: 'Lists Quiz 1',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m5-1',
        question: 'What symbols are used to create a list?',
        options: ['( )', '{ }', '[ ]', '< >'],
        correctAnswer: 2,
        explanation: 'Lists use square brackets [ ]. For example: my_list = [1, 2, 3].'
      },
      {
        id: 'q2-m5-1',
        question: 'What is the index of the first item in a list?',
        options: ['1', '0', '-1', 'first'],
        correctAnswer: 1,
        explanation: 'Python lists start counting from 0, so the first item is at index 0.'
      },
      {
        id: 'q3-m5-1',
        question: 'How do you add an item to the end of a list?',
        options: ['list.add()', 'list.append()', 'list.insert()', 'list.push()'],
        correctAnswer: 1,
        explanation: 'The .append() method adds an item to the end of a list.'
      }
    ]
  },
  {
    id: 'quiz-m5-2',
    moduleId: 'module-5',
    title: 'Lists Quiz 2',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m5-2',
        question: 'What does len() do with a list?',
        options: ['Sorts the list', 'Counts the items', 'Deletes the list', 'Reverses the list'],
        correctAnswer: 1,
        explanation: 'The len() function returns the number of items in a list.'
      },
      {
        id: 'q2-m5-2',
        question: 'Can a list contain different types of data?',
        options: ['No, all must be the same', 'Yes, you can mix types', 'Only numbers and strings', 'Only in Python 3'],
        correctAnswer: 1,
        explanation: 'Lists can contain different types of data: numbers, strings, booleans, even other lists!'
      },
      {
        id: 'q3-m5-2',
        question: 'What does list[2] access?',
        options: ['Second item', 'Third item', 'Last item', 'First item'],
        correctAnswer: 1,
        explanation: 'Since indexing starts at 0, list[2] accesses the third item (index 0, 1, 2).'
      }
    ]
  },
  {
    id: 'quiz-m5-3',
    moduleId: 'module-5',
    title: 'Lists Quiz 3',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m5-3',
        question: 'How do you access the last item using negative indexing?',
        options: ['list[0]', 'list[-1]', 'list[last]', 'list[end]'],
        correctAnswer: 1,
        explanation: 'Use list[-1] to access the last item. Negative indices count from the end.'
      },
      {
        id: 'q2-m5-3',
        question: 'What does list.remove(item) do?',
        options: ['Removes all items', 'Removes the first occurrence of item', 'Removes the last item', 'Empties the list'],
        correctAnswer: 1,
        explanation: 'The .remove() method removes the first occurrence of the specified item from the list.'
      },
      {
        id: 'q3-m5-3',
        question: 'Can you change items in a list after creating it?',
        options: ['No, lists are permanent', 'Yes, lists are mutable', 'Only with special permission', 'Only empty lists'],
        correctAnswer: 1,
        explanation: 'Lists are mutable, meaning you can change, add, or remove items after creating the list.'
      }
    ]
  },

  // MODULE 6 QUIZZES (3 quizzes)
  {
    id: 'quiz-m6-1',
    moduleId: 'module-6',
    title: 'Loops Quiz 1',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m6-1',
        question: 'What does a for loop do?',
        options: ['Repeats code a specific number of times', 'Makes decisions', 'Creates variables', 'Defines functions'],
        correctAnswer: 0,
        explanation: 'A for loop repeats a block of code a specific number of times or for each item in a sequence.'
      },
      {
        id: 'q2-m6-1',
        question: 'What function creates a sequence of numbers for a for loop?',
        options: ['sequence()', 'numbers()', 'range()', 'loop()'],
        correctAnswer: 2,
        explanation: 'The range() function creates a sequence of numbers commonly used in for loops.'
      },
      {
        id: 'q3-m6-1',
        question: 'What will range(5) generate?',
        options: ['1, 2, 3, 4, 5', '0, 1, 2, 3, 4', '5, 4, 3, 2, 1', '0, 1, 2, 3, 4, 5'],
        correctAnswer: 1,
        explanation: 'range(5) generates numbers from 0 up to (but not including) 5: 0, 1, 2, 3, 4.'
      }
    ]
  },
  {
    id: 'quiz-m6-2',
    moduleId: 'module-6',
    title: 'Loops Quiz 2',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m6-2',
        question: 'When does a while loop stop?',
        options: ['After 10 iterations', 'When the condition becomes False', 'Never', 'When you press stop'],
        correctAnswer: 1,
        explanation: 'A while loop continues as long as its condition is True, and stops when it becomes False.'
      },
      {
        id: 'q2-m6-2',
        question: 'What does the break statement do in a loop?',
        options: ['Pauses the loop', 'Exits the loop immediately', 'Skips to next iteration', 'Breaks the computer'],
        correctAnswer: 1,
        explanation: 'The break statement immediately exits the loop, no matter how many iterations are left.'
      },
      {
        id: 'q3-m6-2',
        question: 'What does range(1, 10, 2) generate?',
        options: ['1, 3, 5, 7, 9', '1, 2, 10', '2, 4, 6, 8, 10', '1, 10, 2'],
        correctAnswer: 0,
        explanation: 'range(1, 10, 2) starts at 1, stops before 10, and steps by 2, giving: 1, 3, 5, 7, 9.'
      }
    ]
  },
  {
    id: 'quiz-m6-3',
    moduleId: 'module-6',
    title: 'Loops Quiz 3',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m6-3',
        question: 'What does the continue statement do?',
        options: ['Ends the loop', 'Skips to the next iteration', 'Restarts the loop', 'Does nothing'],
        correctAnswer: 1,
        explanation: 'The continue statement skips the rest of the current iteration and goes to the next one.'
      },
      {
        id: 'q2-m6-3',
        question: 'Can you loop through a list with a for loop?',
        options: ['No', 'Yes', 'Only numbers', 'Only strings'],
        correctAnswer: 1,
        explanation: 'For loops can iterate through any sequence, including lists, strings, and ranges.'
      },
      {
        id: 'q3-m6-3',
        question: 'What is an infinite loop?',
        options: ['A very long loop', 'A loop that never ends', 'A loop with no code', 'A loop that runs once'],
        correctAnswer: 1,
        explanation: 'An infinite loop is a loop whose condition never becomes False, so it runs forever.'
      }
    ]
  },

  // MODULE 7 QUIZZES (3 quizzes)
  {
    id: 'quiz-m7-1',
    moduleId: 'module-7',
    title: 'Dictionaries Quiz 1',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m7-1',
        question: 'What symbols are used to create a dictionary?',
        options: ['[ ]', '( )', '{ }', '< >'],
        correctAnswer: 2,
        explanation: 'Dictionaries use curly braces { }. For example: my_dict = {"key": "value"}.'
      },
      {
        id: 'q2-m7-1',
        question: 'What are the two parts of each dictionary item?',
        options: ['Name and value', 'Key and value', 'Index and value', 'Type and value'],
        correctAnswer: 1,
        explanation: 'Each dictionary item has a key (the label) and a value (the data).'
      },
      {
        id: 'q3-m7-1',
        question: 'How do you access a value in a dictionary?',
        options: ['dict[index]', 'dict[key]', 'dict.value', 'dict(key)'],
        correctAnswer: 1,
        explanation: 'Access dictionary values using their key: dict[key] or dict.get(key).'
      }
    ]
  },
  {
    id: 'quiz-m7-2',
    moduleId: 'module-7',
    title: 'Dictionaries Quiz 2',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m7-2',
        question: 'Can dictionary keys be duplicated?',
        options: ['Yes', 'No, keys must be unique', 'Only sometimes', 'Only for strings'],
        correctAnswer: 1,
        explanation: 'Dictionary keys must be unique. If you use the same key twice, the second value overwrites the first.'
      },
      {
        id: 'q2-m7-2',
        question: 'How do you add a new item to a dictionary?',
        options: ['dict.add(key, value)', 'dict[key] = value', 'dict.append(key, value)', 'dict.insert(key, value)'],
        correctAnswer: 1,
        explanation: 'Add a new item by assigning a value to a new key: dict[key] = value.'
      },
      {
        id: 'q3-m7-2',
        question: 'What does .get() method do?',
        options: ['Deletes a key', 'Safely retrieves a value', 'Adds a new key', 'Lists all keys'],
        correctAnswer: 1,
        explanation: 'The .get() method safely retrieves a value. If the key doesn\'t exist, it returns None instead of an error.'
      }
    ]
  },
  {
    id: 'quiz-m7-3',
    moduleId: 'module-7',
    title: 'Dictionaries Quiz 3',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m7-3',
        question: 'What method returns all the keys in a dictionary?',
        options: ['.keys()', '.values()', '.items()', '.all()'],
        correctAnswer: 0,
        explanation: 'The .keys() method returns all the keys in a dictionary.'
      },
      {
        id: 'q2-m7-3',
        question: 'Can dictionary values be any data type?',
        options: ['Only strings', 'Only numbers', 'Yes, any type', 'Only lists'],
        correctAnswer: 2,
        explanation: 'Dictionary values can be any data type: strings, numbers, lists, even other dictionaries!'
      },
      {
        id: 'q3-m7-3',
        question: 'How do you remove a key from a dictionary?',
        options: ['dict.remove(key)', 'del dict[key]', 'dict.delete(key)', 'dict.pop(key)'],
        correctAnswer: 1,
        explanation: 'Use del dict[key] or dict.pop(key) to remove a key-value pair from a dictionary.'
      }
    ]
  },

  // MODULE 8 QUIZZES (3 quizzes)
  {
    id: 'quiz-m8-1',
    moduleId: 'module-8',
    title: 'Building Projects Quiz 1',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m8-1',
        question: 'What module do you import to generate random numbers?',
        options: ['math', 'random', 'numbers', 'generate'],
        correctAnswer: 1,
        explanation: 'The random module provides functions for generating random numbers.'
      },
      {
        id: 'q2-m8-1',
        question: 'What does random.randint(1, 10) do?',
        options: ['Returns a float between 1 and 10', 'Returns an integer between 1 and 10 (inclusive)', 'Returns only 1 or 10', 'Returns a random string'],
        correctAnswer: 1,
        explanation: 'random.randint(1, 10) returns a random integer between 1 and 10, including both 1 and 10.'
      },
      {
        id: 'q3-m8-1',
        question: 'Why is it good to break large programs into functions?',
        options: ['Makes code slower', 'Makes code organized and reusable', 'Makes code longer', 'Makes code colorful'],
        correctAnswer: 1,
        explanation: 'Functions help organize code into manageable pieces and let you reuse code easily.'
      }
    ]
  },
  {
    id: 'quiz-m8-2',
    moduleId: 'module-8',
    title: 'Building Projects Quiz 2',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m8-2',
        question: 'What is error handling in programming?',
        options: ['Finding bugs', 'Preventing crashes by catching errors', 'Writing comments', 'Testing code'],
        correctAnswer: 1,
        explanation: 'Error handling uses try-except blocks to catch and handle errors gracefully instead of crashing.'
      },
      {
        id: 'q2-m8-2',
        question: 'When building a project, should you start simple or complex?',
        options: ['Always start complex', 'Start simple and add features gradually', 'It doesn\'t matter', 'Start in the middle'],
        correctAnswer: 1,
        explanation: 'It\'s best to start with a simple version that works, then gradually add features.'
      },
      {
        id: 'q3-m8-2',
        question: 'What is debugging?',
        options: ['Deleting bugs from your computer', 'Finding and fixing errors in code', 'Writing new code', 'Making code faster'],
        correctAnswer: 1,
        explanation: 'Debugging is the process of finding and fixing errors (bugs) in your code.'
      }
    ]
  },
  {
    id: 'quiz-m8-3',
    moduleId: 'module-8',
    title: 'Building Projects Quiz 3',
    timeLimit: 600,
    questions: [
      {
        id: 'q1-m8-3',
        question: 'What makes a good project for beginners?',
        options: ['Very complex and long', 'Simple but functional', 'Requires advanced math', 'Has no errors'],
        correctAnswer: 1,
        explanation: 'Good beginner projects are simple but functional, combining concepts you\'ve learned.'
      },
      {
        id: 'q2-m8-3',
        question: 'Why is it important to test your code?',
        options: ['To make it longer', 'To find and fix bugs before users do', 'To slow it down', 'It\'s not important'],
        correctAnswer: 1,
        explanation: 'Testing helps you find and fix bugs before your program is used, ensuring it works correctly.'
      },
      {
        id: 'q3-m8-3',
        question: 'What is the best way to learn programming?',
        options: ['Just read about it', 'Build projects and practice', 'Watch videos only', 'Memorize syntax'],
        correctAnswer: 1,
        explanation: 'The best way to learn programming is by building projects and practicing. Learning by doing is most effective!'
      }
    ]
  }
];

// Helper functions to retrieve data by module ID
export function getChallengeByModuleId(moduleId: string): Challenge | undefined {
  return newChallengesData.find(challenge => challenge.moduleId === moduleId);
}

export function getQuizzesByModuleId(moduleId: string): Quiz[] {
  return newQuizzesData.filter(quiz => quiz.moduleId === moduleId);
}
