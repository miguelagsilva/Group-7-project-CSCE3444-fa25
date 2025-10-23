# Lucky7 Software Requirements Specification (SRS)

CSCE 3444 Software Engineering                                                                                                                                         Page 1 of 16






Product Requirements
Project : Leetcode for kids
Team: Lucky 7
Members: Alfredo Guevara ( 11501470 ), Aminat  Usman ( 11846769 ), Miguel Silva
(11911591 ), Arnav Saxena ( 11552665 )
Instructor: Hame d Jalali
Submission Date: 09-16-2025










CSCE 3444 Software Engineering                                                                                                                                         Page 2 of 16

## SECTION 1: Revision History
Date  Version  Description  Author
09/11/2025  1.0 Introduction section  Aminat
09/11/2025  1.1 Stakeholders  Arnav
09/11/2025  1.2 System
Requirements  Miguel
09/11/2025  1.3 Functional
Requirements  All
09/1 6/2025  1.4 Non -Functional
Requirements  Miguel
09/1 6/2025  1.5 Use Case Diagram  Miguel
09/16/2025  1.6 Use Case
Descriptions  All

















CSCE 3444 Software Engineering                                                                                                                                         Page 3 of 16



## SECTION  2: Introduction
Purpose:
This Software Requirements Specification (SRS) defines the requirements for the
LeetCode for Kids  project. The document serves as a blueprint and agreement between
stakeholders and the development team. It ensures all parties have a clear, shared
understanding of what the software will accomplish.  This will be used by developers,
testers, project managers, investors and all stakeholders of this project.
Project Scope:
LeetCode for Kids is an interactive platform designed for children ages 7–12 to learn coding
concepts in a fun and engaging way.
Main Benefits:
The software makes coding easy to understand and enjoyable, bridging the gap between
using technology and understanding it. It encourages problem -solving, creativity, and
logical thinking, while also building a foundation for future exploration of careers in
technology.
Goals:
The project’s goals are to teach coding basics in a playful environment, spark curiosity
about technology, and build confidence through hands -on projects.
Problem Statement:
Children between the ages of 7 and 12 are surrounded by technology but often do not
understand how it works. Most view applications as “magic” rather than systems built
from logical steps and code. This creates a barrier to seeing themselves as creators,
innovators, or problem -solvers.  By introducing coding concepts in a simple, engaging way,
this project addresses that gap.
Definitions and Acronyms
• SRS: Software Requirements Specification
• GUI: Graphical User Interface
• API: Application Programming Interface
CSCE 3444 Software Engineering                                                                                                                                         Page 4 of 16
• IDE: Integrated Development Environment



## SECTION  3: Stakeholders
“Lucky 7” - Investor and Board of directors:
The board of directors  are the team members in the Lucky 7 project: Leet code  for kids.  The
investors in this project are the users, the deve lopers, etc.  The board members will be
included in the project from  day one. This will be done as will be meeting in class and will
be scheduling meetings outside class to work on the project and its documentation .

“Lucky 7” - Product Owner:
The developers/members of the team Lucky 7 are the product owners. They are
responsible for the vision of how they want to build the project: Leet Code for kids .
Some of the product owner responsibilities:
• Defines Features.
• Defines and accepts stories and iterations.
• Contributes to vision.
• Collaborates with Dev team.
• Prioritize needs.
• Evaluate product progress.
End Users:
Children from the age of 7 -12 will be the primary end -users of the product . The developers
will be sending out surveys to these end users and even interviewing them, to get feedback
on the project so improvements can be made.  Some group of students will be involved in
the testing of the product before it is launched , so we can ensure that there are no
problems on the launch of the product.
Software Engine ering team:
The software engineering team is responsible for monitoring and progressing the project’s
life cycle.
These are some of their responsibilities:
CSCE 3444 Software Engineering                                                                                                                                         Page 5 of 16
• Outlining the project requirements.
• Implementing the project and its features.
• Conducting Software engineering.
• Dividing the project into tasks and assigning these to the team members.
• Closely monitoring task progression.
• Resolve any issues which delay the life cycle.
Users:
The target user should have a basic understanding of navigating through a webpage and
should have an updated browser to ensure that everything runs smoothly .


## SECTION  4: System Overview
The project will be a web application that can be accessed on any device with an internet
connection and a modern web browser  with JS, HTML 5 and CSS capabilities.
The website stack:
- Programming languages: JavaScript, Python 3.13
- Frontend: React
- Backend: Flask (REST Api), PostgreSQL
Assumptions and Dependencies
• Users will have a stable internet connection.
• Users will access the system from a modern device capable of running a supported
browser.
• Students and administrators will already have basic familiarity with web
applications.







CSCE 3444 Software Engineering                                                                                                                                         Page 6 of 16



## SECTION 5: Functional Requirements

Member : User Story
Name:  Description:  Priority:

Alfredo  Challenges  After student practices (practice mode/free
code) this section will provide  moderate
challenges ordered by sections in the
material / learning module.  High
Alfredo  Solution
Module  Simple solution functionality implemented
for students to view after quizzes or failed
maximum attempts at challenges/quizzes.  Medium
Alfredo  Video/Learning  Main learning section includes  learning
modules (each with different topics) /
videos from the very beginning up to more
moderate/advanced topics.  High
Arnav  Practice  After going through the learning videos, the
student will have a chance to practice what
they learned and try to see where they are
at with the coding before they are tested
and given a grade, so this is where they
practice before they are graded.  High
Arnav  Auto Grader  After the students have gone through the
learning process, and practiced what they
were taught, they will now code in the auto
grader where they will be graded on how
well they performed when tested on the
concepts they learned.
Medium
Arnav  Free code  This is a feature where the student can just
practice whatever they want, they can code
whatever they want, this is a feature where
they can practice or just have fun.  Low
Aminat  Code Editor  The Code Editor will let students write, run,
and test code directly within the platform,
offering a hands -on way to practice and apply
what they learn.  High
Amina t
Admin
Dashboard  The Admin Dashboard will be used to
manage the learning platform by creating, High

CSCE 3444 Software Engineering                                                                                                                                         Page 7 of 16

updating, and deleting modules, as well as
adding challenges to support student
learning.
Aminat  Hint Module  The Hint Module will provide students with
fun, encouraging clues to guide them,
offering support without giving away the full
answer and keeping them motivated to
continue learning.  Medium
Miguel  Quiz  The system shall  have an automatically
graded quiz for each module. This
evaluates the user's knowledge through a
series of multiple -choice questions.  High
Miguel  Modules  The system shall have a list of modules that
focus on something in  programming. Each
module has text, a video and quiz/coding
challenge to ensure the user learned.  High
Miguel  Progress Bar The system shall show the number of
completed modules compared to the
available modules.  Low



## SECTION  6: Non -functional Requirements
6.1 Performance :
• The system shall respond to user actions within 0.5 seconds
• The system shall support at least  10 concurrent users .
• The system shall provide feedback (loading indicator) for actions that take longer
than 1 second
6.2 Security :
• The system shall encrypt all sensitive data in transit using TLS.
• The system shall not execute malicious user code.
• The system shall follow OWASP security guidelines.
6.3 Usability :
• The system shall provide consistent navigation across all pages.
• The system shall provide clear error messages and guidance for corrective actions.
• The system shall maintain responsiveness for mobile, tablet, and desktop displays.
• The system shall follow WCAG accessibility guidelines .
CSCE 3444 Software Engineering                                                                                                                                         Page 8 of 16
6.4 Reliability :
• The system shall have 99% uptime .
• The system shall ensure that user data stored in the browser persists across
sessions unless explicitly cleared.



## SECTION 7: Use Case Diagram


















CSCE 3444 Software Engineering                                                                                                                                         Page 9 of 16


## SECTION 8: Use Case Descriptions

### Use Case Number  UC-01
Author  Aminat
Actor  Student
Description  After completing a learning module and practice exercises,
the student proceeds to the final challenge to test their
understanding.
Pre conditions  • The student must have  completed the learning
content for a module.
• The student has access to  the platform .
Main Flow  1. The student opens a challenge from the chosen
module.
2. The system loads the challenge description and the
Code Editor.
3. The student writes and runs code in the editor to
attempt solving the challenge.
4. The system evaluates the student’s code with the
auto grader module.
5. If the code passes, the system displays positive
feedback and marks the challenge as complete.
Alternative Flow  • If the student has not completed the learning
module, it takes the student to the learning page.
• If the student exits mid -challenge, their partial work
is saved temporarily
• If the student’s submission fails, the system
provides encouraging feedback and hints, allowing
them to try again.
Post Conditions  • The student’s progress is recorded in the system.
CSCE 3444 Software Engineering                                                                                                                                         Page 10 of 16
• The completed challenge is marked as done, and the
student can move forward.


### Use Case Number  UC-02
Author  Aminat
Actor  Engineer
Description  The engineer manages learning modules by creating,
updating, or removing content to ensure the platform
remains accurate and engaging.
Preconditions  For update or remove action, at least one module must
exist in the system
Main F low 1. The engineer opens the Manage Modules section.
2. The system displays the current list of modules.
3. The engineer chooses one of the following actions:
• Create a new module
• Update an existing module
• Remove an existing module
4. The system updates the module list to reflect the
changes.

Alternative Flow  If required details are missing during Create or Update, the
system prompts the engineer to complete the information
before saving.
Post Conditions  • The module list reflects the engineer’s changes.
• Students will have access only to the updated set of
modules.




CSCE 3444 Software Engineering                                                                                                                                         Page 11 of 16


### Use Case Number  UC-03
User Case Name  Practice Coding
Author
Arnav Saxena
Actor  Student
Description  The student  will practice coding the concepts they
had just learned after going through  the learning
modules, they  do this practice before they code on
the auto grader , where their code will be graded.
Pre  Condit ions  The student/user must have gone through or going
through  the learning modules before they start
practicing coding .
Main flow  1. The user codes what they want to practice.
2. System then give  the output of whatever the
user coded.
3. Then the user will check if this was the desired
outcome they wanted.
Alternative flow  If there is an error when the user is practicing,  then
they are suggested to refresh the page.
Post  Cond itions  After done with the practice  coding, the user will be
going to  be graded on the autograder to test what they
have learned.





CSCE 3444 Software Engineering                                                                                                                                         Page 12 of 16


### Use Case Number  UC-04
User Case Name  Autograder/submit code
Author
Arnav Saxena
Actor  Student
Description  The student will submit they code they
were asked to and then the  submitted
code will be graded.
Pre  Condit ions  The student/user must have gone
through the learning module and must
have done the practice before they can
attempt the graded session.
Main flow  1. Actor will read the instructions of
the code they are asked to make.
2. Actor will then code to the best
of their ability to check all the
requirements .
3. System will then  grade the code
which was submitted.
Alternative flow  If there is an error when the user is
submitting code , then they are
suggested to refresh the page.
Post  Cond itions  After done with the auto grader, the
user will then be given a grade.






CSCE 3444 Software Engineering                                                                                                                                         Page 13 of 16

### Use Case Number  UC-05
User Case Name  Free Coding
Author
Arnav Saxena
Actor  Student
Description  In this feature the student can free
code whatever they want, be it
practicing or just having fun with
coding.
Preconditons  The student/user must have access to
this learning platform to start free
coding.
Main flow  1. The user codes what they want
to practice or what ever  they
want to code.
2. The code then give s an out put.
3. The user can check if the output
is what they wanted to have.
Alternative flow  If there is an error when the user is
practicing.  Freecoding, then they are
suggested to refresh the page.
Post  Condtions  After done with the practice/free
coding, the user can move on to the
learning modules and start learning.







CSCE 3444 Software Engineering                                                                                                                                         Page 14 of 16


### Use Case Number  UC-06
User Case Name  Progress Bar
Author
Miguel Silva
Actor  Student
Description  In this feature the student can check on
their progress in the learning.
Preconditions  The student/user must have access to
this learning platform to start free
coding.
Main flow  1. The user accesses the progress
bar
2. The system compares the
number of completed modules
to all available modules
3. The user can check their
progress from 0 to 100%.
Alternative flow  If there i s no progress available, the
user is advised to start the modules
Postconditions  After seeing their progress, the user can
complete modules to improve it.









CSCE 3444 Software Engineering                                                                                                                                         Page 15 of 16

### Use Case Number  UC-07
User Case Name  Quiz
Author
Alfredo Guevara
Actor  Student
Description  After completing a learning module, the
student takes a quiz to test their
knowledge before progressing further.
Pre  Condit ions  The student has access to the platform.
The student has completed the
required learning module for the quiz.
Main flow  1.  The student selects the quiz
from the module page.
2. The system loads the quiz
questions.
3. The student answers the quiz
questions (multiple -choice,
true/false, etc.).
4. The student submits the quiz for
grading.
5. The system evaluates the
answers automatically and
displays the score with
feedback.
Alternative flow  1. If the student exits before submitting,
their answers are saved temporarily.
2. If the student fails, the system
provides hints and suggests reviewing
the learning content.

Post  Cond itions   The student’s quiz score and progress
are recorded. If the student passes,
they can unlock the next module or
challenge.

CSCE 3444 Software Engineering                                                                                                                                         Page 16 of 16



## SECTION  9: Individual Contributions
Member  ID Tasks
Alfredo Guevara  11501470  SRS
1. Title Page
2. Revision History
3. Functional Requirements
4. Use Case Description
Aminat Usman  11846769  SRS
1. Introduction
2. Functional Requirements
3. Use Case Description
Arnav Saxena  11552665  SRS
1. Section 3  StakeHolders
2. Functional Requirements
3. Use Case Description

Miguel Silva  11911591  SRS
- Section 4, 5 (partial) ,6,7,9
- Formatting
Project setup











