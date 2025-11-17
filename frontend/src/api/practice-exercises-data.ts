// Practice exercises data for all lessons
import { PracticeExercise } from './data';

export const practiceExercisesMap: Record<string, PracticeExercise[]> = {
  'lesson-m1-4': [
    {
      id: 'practice-m1-4-1',
      title: '🎯 Now Try This: Ask for a Name',
      description: 'Create a program that asks for someone\'s name and greets them!',
      instructions: [
        'Use input() to ask "What\'s your name?"',
        'Store the answer in a variable called name',
        'Print a greeting like "Hello, [name]!"'
      ],
      starterCode: `# Ask for the user's name\n\n# Greet them\n`,
      hints: [
        'Use: name = input("What\'s your name? ")',
        'Then print: print("Hello,", name, "!")',
        'Don\'t forget the space in your question!'
      ],
      expectedOutput: '',  // Any greeting is acceptable
      solution: `# Ask for the user's name\nname = input("What's your name? ")\n\n# Greet them\nprint("Hello,", name, "!")`,
      validation: {
        type: 'pattern',
        checks: [
          { rule: 'not_empty', message: '💡 You need to print a greeting!' },
          { rule: 'min_length', value: 3, message: '💡 Your greeting seems too short!' }
        ]
      }
    }
  ],
  'lesson-m2-1': [
    {
      id: 'practice-m2-1-1',
      title: '🎯 Now Try This: Create Your Own Variables',
      description: 'Can you create variables for your name, age, and favorite game?',
      instructions: [
        'Create a variable called name with your name',
        'Create a variable called age with your age',
        'Create a variable called game with your favorite game',
        'Print all three variables'
      ],
      starterCode: `# Create your variables\n\n\n\n# Print them\n`,
      hints: [
        'Use quotes for text: name = "Alex"',
        'No quotes for numbers: age = 10',
        'Print each variable on its own line'
      ],
      expectedOutput: '',  // Any output is acceptable
      solution: `# Create your variables\nname = "Alex"\nage = 10\ngame = "Minecraft"\n\n# Print them\nprint(name)\nprint(age)\nprint(game)`,
      validation: {
        type: 'pattern',
        codeChecks: [
          { type: 'variable_declared', value: 'name', message: '💡 You need to create a variable called "name"!' },
          { type: 'variable_declared', value: 'age', message: '💡 You need to create a variable called "age"!' },
          { type: 'variable_declared', value: 'game', message: '💡 You need to create a variable called "game"!' },
          { type: 'function_called', value: 'print', message: '💡 You need to print your variables!' }
        ],
        checks: [
          { rule: 'not_empty', message: '💡 You need to print something!' },
          { rule: 'min_lines', value: 3, message: '💡 You need to print all three variables on separate lines!' }
        ]
      }
    }
  ],
  'lesson-m2-2': [
    {
      id: 'practice-m2-2-1',
      title: '🎯 Now Try This: Math with Variables',
      description: 'Can you calculate the total number of fruits?',
      instructions: [
        'Create a variable apples = 5',
        'Create a variable oranges = 3',
        'Add them together and store in total_fruit',
        'Print the total'
      ],
      starterCode: `# Create fruit variables\n\n\n# Calculate total\n\n# Print the result\n`,
      hints: [
        'apples = 5 and oranges = 3',
        'total_fruit = apples + oranges',
        'print(total_fruit)'
      ],
      expectedOutput: '8',
      solution: `# Create fruit variables\napples = 5\noranges = 3\n\n# Calculate total\ntotal_fruit = apples + oranges\n\n# Print the result\nprint(total_fruit)`,
      validation: {
        type: 'exact',
        expectedOutput: '8',
        ignoreWhitespace: true,
        allowPartialCredit: false
      }
    }
  ],
  'lesson-m2-3': [
    {
      id: 'practice-m2-3-1',
      title: '🎯 Now Try This: Combine Your Name',
      description: 'Can you combine your first and last name?',
      instructions: [
        'Create first_name with your first name',
        'Create last_name with your last name',
        'Combine them with a space in between',
        'Print the full name'
      ],
      starterCode: `# Create name variables\n\n\n# Combine them\n\n# Print full name\n`,
      hints: [
        'first_name = "Emma"',
        'Use + to combine: first_name + " " + last_name',
        'Don\'t forget the space " " in the middle!'
      ],
      expectedOutput: '',  // Any name is acceptable
      solution: `# Create name variables\nfirst_name = "Emma"\nlast_name = "Smith"\n\n# Combine them\nfull_name = first_name + " " + last_name\n\n# Print full name\nprint(full_name)`,
      validation: {
        type: 'hybrid',
        checks: [
          { rule: 'not_empty', message: '💡 You need to print your full name!' },
          { rule: 'contains', value: ' ', message: '💡 Make sure to include a space between first and last name!' },
          { rule: 'min_length', value: 3, message: '💡 Your name seems too short!' }
        ]
      }
    }
  ],
  'lesson-m2-4': [
    {
      id: 'practice-m2-4-1',
      title: '🎯 Now Try This: Compare Numbers',
      description: 'Can you compare two numbers and print the result?',
      instructions: [
        'Print the result of 10 > 5',
        'Print the result of 3 == 3',
        'Print the result of 7 < 4'
      ],
      starterCode: `# Compare and print\n\n\n`,
      hints: [
        'Use print(10 > 5)',
        '== checks if two numbers are equal',
        'The results will be True or False'
      ],
      expectedOutput: 'True\nTrue\nFalse',
      solution: `# Compare and print\nprint(10 > 5)\nprint(3 == 3)\nprint(7 < 4)`
    }
  ],
  'lesson-m2-5': [
    {
      id: 'practice-m2-5-1',
      title: '🎯 Now Try This: Track Your Score',
      description: 'Start with a score of 0 and add points!',
      instructions: [
        'Create score = 0',
        'Add 10 points to the score',
        'Print the new score',
        'Add 5 more points',
        'Print the final score'
      ],
      starterCode: `# Start with 0 points\n\n# Add 10 points\n\n\n# Add 5 more points\n\n`,
      hints: [
        'score = 0',
        'score = score + 10 (or score += 10)',
        'Use print(score) to see the current value'
      ],
      expectedOutput: '10\n15',
      solution: `# Start with 0 points\nscore = 0\n\n# Add 10 points\nscore = score + 10\nprint(score)\n\n# Add 5 more points\nscore += 5\nprint(score)`
    }
  ],
  'lesson-m3-1': [
    {
      id: 'practice-m3-1-1',
      title: '🎯 Now Try This: Age Checker',
      description: 'Check if someone is old enough for coding club!',
      instructions: [
        'Create a variable age = 10',
        'If age is greater than or equal to 8, print "You can join!"',
        'Otherwise, print "Come back when you\'re older!"'
      ],
      starterCode: `# Set the age\nage = 10\n\n# Check if old enough\n`,
      hints: [
        'Use if age >= 8:',
        'Remember to indent the code inside the if',
        'Add else: for the alternative'
      ],
      expectedOutput: 'You can join!',
      solution: `# Set the age\nage = 10\n\n# Check if old enough\nif age >= 8:\n    print("You can join!")\nelse:\n    print("Come back when you're older!")`
    },
    {
      id: 'practice-m3-1-2',
      title: '🎯 Now Try This: Grade Checker',
      description: 'Check a test score and give feedback!',
      instructions: [
        'Create score = 85',
        'If score >= 90, print "Excellent! A grade!"',
        'Elif score >= 80, print "Great! B grade!"',
        'Elif score >= 70, print "Good! C grade!"',
        'Else print "Keep practicing!"'
      ],
      starterCode: `# Set the score\nscore = 85\n\n# Check the grade\n`,
      hints: [
        'Use if, elif, elif, else',
        'Remember the colon : after each condition',
        'Indent all the print statements'
      ],
      expectedOutput: 'Great! B grade!',
      solution: `# Set the score\nscore = 85\n\n# Check the grade\nif score >= 90:\n    print("Excellent! A grade!")\nelif score >= 80:\n    print("Great! B grade!")\nelif score >= 70:\n    print("Good! C grade!")\nelse:\n    print("Keep practicing!")`
    }
  ],
  'lesson-m4-1': [
    {
      id: 'practice-m4-1-1',
      title: '🎯 Now Try This: Create a Greeting Function',
      description: 'Make a function that greets someone by name!',
      instructions: [
        'Create a function called greet',
        'It should take a parameter called name',
        'Inside, print "Hello, [name]!"',
        'Call the function with your name'
      ],
      starterCode: `# Define the greet function\n\n\n\n# Call it with your name\n`,
      hints: [
        'Use def greet(name):',
        'Don\'t forget to indent the code inside',
        'Call it with: greet("Alex")'
      ],
      expectedOutput: '',  // Any greeting is acceptable
      solution: `# Define the greet function\ndef greet(name):\n    print("Hello,", name, "!")\n\n# Call it with your name\ngreet("Alex")`
    },
    {
      id: 'practice-m4-1-2',
      title: '🎯 Now Try This: Add Function',
      description: 'Create a function that adds two numbers!',
      instructions: [
        'Create a function called add_numbers',
        'It should take two parameters: a and b',
        'Return the sum of a + b',
        'Call it with add_numbers(5, 3) and print the result'
      ],
      starterCode: `# Define the add function\n\n\n\n# Call it and print result\n`,
      hints: [
        'Use def add_numbers(a, b):',
        'Use return a + b',
        'result = add_numbers(5, 3)'
      ],
      expectedOutput: '8',
      solution: `# Define the add function\ndef add_numbers(a, b):\n    return a + b\n\n# Call it and print result\nresult = add_numbers(5, 3)\nprint(result)`
    }
  ],
  'lesson-m5-1': [
    {
      id: 'practice-m5-1-1',
      title: '🎯 Now Try This: Create a Shopping List',
      description: 'Make a list of items you want to buy!',
      instructions: [
        'Create a list called shopping with 3 items',
        'Add a 4th item using append()',
        'Print the entire list',
        'Print how many items are in the list using len()'
      ],
      starterCode: `# Create shopping list\n\n# Add an item\n\n# Print the list\n\n# Print the count\n`,
      hints: [
        'shopping = ["apples", "bread", "milk"]',
        'shopping.append("cookies")',
        'Use len(shopping) to get the count'
      ],
      expectedOutput: '',  // Any list is acceptable
      solution: `# Create shopping list\nshopping = ["apples", "bread", "milk"]\n\n# Add an item\nshopping.append("cookies")\n\n# Print the list\nprint(shopping)\n\n# Print the count\nprint(len(shopping))`
    },
    {
      id: 'practice-m5-1-2',
      title: '🎯 Now Try This: Access List Items',
      description: 'Get specific items from a list of fruits!',
      instructions: [
        'Create fruits = ["apple", "banana", "orange", "grape"]',
        'Print the first fruit (index 0)',
        'Print the last fruit (use -1)',
        'Print the second fruit (index 1)'
      ],
      starterCode: `# Create the fruits list\nfruits = ["apple", "banana", "orange", "grape"]\n\n# Print specific fruits\n`,
      hints: [
        'Use fruits[0] for the first item',
        'Use fruits[-1] for the last item',
        'Remember: counting starts at 0!'
      ],
      expectedOutput: 'apple\ngrape\nbanana',
      solution: `# Create the fruits list\nfruits = ["apple", "banana", "orange", "grape"]\n\n# Print specific fruits\nprint(fruits[0])\nprint(fruits[-1])\nprint(fruits[1])`
    }
  ],
  'lesson-m6-1': [
    {
      id: 'practice-m6-1-1',
      title: '🎯 Now Try This: Count to 5',
      description: 'Use a for loop to count from 1 to 5!',
      instructions: [
        'Create a for loop using range(1, 6)',
        'Print each number',
        'After the loop, print "Done counting!"'
      ],
      starterCode: `# Loop and count\n\n\n# Print done message\n`,
      hints: [
        'Use: for num in range(1, 6):',
        'Remember to indent print(num)',
        'range(1, 6) gives you 1, 2, 3, 4, 5'
      ],
      expectedOutput: '1\n2\n3\n4\n5\nDone counting!',
      solution: `# Loop and count\nfor num in range(1, 6):\n    print(num)\n\n# Print done message\nprint("Done counting!")`
    },
    {
      id: 'practice-m6-1-2',
      title: '🎯 Now Try This: Loop Through Friends',
      description: 'Print a greeting for each friend in a list!',
      instructions: [
        'Create friends = ["Emma", "Liam", "Sophia"]',
        'Loop through each friend',
        'Print "Hello, [friend]!" for each one'
      ],
      starterCode: `# Create friends list\nfriends = ["Emma", "Liam", "Sophia"]\n\n# Loop and greet each friend\n`,
      hints: [
        'Use: for friend in friends:',
        'Inside the loop: print("Hello,", friend, "!")',
        'The loop runs once for each name'
      ],
      expectedOutput: 'Hello, Emma!\nHello, Liam!\nHello, Sophia!',
      solution: `# Create friends list\nfriends = ["Emma", "Liam", "Sophia"]\n\n# Loop and greet each friend\nfor friend in friends:\n    print("Hello,", friend, "!")`,
      validation: {
        type: 'hybrid',
        expectedOutput: 'Hello, Emma!\nHello, Liam!\nHello, Sophia!',
        ignoreWhitespace: true,
        codeChecks: [
          { type: 'contains', value: 'for', message: '💡 You need to use a for loop!' }
        ],
        checks: [
          { rule: 'contains', value: 'Emma', message: '💡 Make sure you have Emma in the list!' },
          { rule: 'contains', value: 'Liam', message: '💡 Make sure you have Liam in the list!' },
          { rule: 'contains', value: 'Sophia', message: '💡 Make sure you have Sophia in the list!' },
          { rule: 'contains', value: 'Hello', message: '💡 Print a greeting with "Hello"!' }
        ]
      }
    }
  ],
  'lesson-m7-1': [
    {
      id: 'practice-m7-1-1',
      title: '🎯 Now Try This: Create a Player Profile',
      description: 'Make a dictionary with player information!',
      instructions: [
        'Create a dictionary called player',
        'Add keys: "name", "score", and "level"',
        'Give them any values you want',
        'Print the player\'s name and score'
      ],
      starterCode: `# Create player dictionary\n\n\n# Print name and score\n`,
      hints: [
        'Use: player = {"name": "Alex", "score": 100, "level": 5}',
        'Access with: player["name"]',
        'print(player["name"], player["score"])'
      ],
      expectedOutput: '',  // Any output is acceptable
      solution: `# Create player dictionary\nplayer = {\n    "name": "Alex",\n    "score": 100,\n    "level": 5\n}\n\n# Print name and score\nprint(player["name"])\nprint(player["score"])`
    },
    {
      id: 'practice-m7-1-2',
      title: '🎯 Now Try This: Update Dictionary Values',
      description: 'Change values in a character dictionary!',
      instructions: [
        'Create character = {"health": 100, "magic": 50}',
        'Increase health by 20',
        'Add a new key "strength" with value 75',
        'Print the updated dictionary'
      ],
      starterCode: `# Create character\ncharacter = {"health": 100, "magic": 50}\n\n# Update health\n\n# Add strength\n\n# Print result\n`,
      hints: [
        'character["health"] = character["health"] + 20',
        'character["strength"] = 75',
        'print(character)'
      ],
      expectedOutput: '',  // Structure matters more than exact output
      solution: `# Create character\ncharacter = {"health": 100, "magic": 50}\n\n# Update health\ncharacter["health"] = character["health"] + 20\n\n# Add strength\ncharacter["strength"] = 75\n\n# Print result\nprint(character)`
    }
  ],
  'lesson-m8-1': [
    {
      id: 'practice-m8-1-1',
      title: '🎯 Now Try This: Simple Number Game',
      description: 'Create a basic guessing game!',
      instructions: [
        'Set secret_number = 7',
        'Ask the user to guess (use input and int())',
        'If they\'re correct, print "You got it!"',
        'Otherwise print "Try again!"'
      ],
      starterCode: `import random\n\n# Set the secret number\nsecret_number = 7\n\n# Get user's guess\n\n# Check if correct\n`,
      hints: [
        'guess = int(input("Guess a number: "))',
        'Use if guess == secret_number:',
        'Add else: for the wrong guess case'
      ],
      expectedOutput: '',  // Depends on user input
      solution: `import random\n\n# Set the secret number\nsecret_number = 7\n\n# Get user's guess\nguess = int(input("Guess a number: "))\n\n# Check if correct\nif guess == secret_number:\n    print("You got it!")\nelse:\n    print("Try again!")`
    }
  ]
};