
# Improved Khoury TA Application Platform
#### Team: Nathan Pedowitz, Brendan Prestage, Aditya Mohekar

#### Description
In this project, we attempted to clone the functionality of Khoury's TA application platform while providing a few bits of extra information for prospective TAs. We wanted TAs to know which professor would be teaching the course they're considering TAing and to see a brief statement written by the professor that explains their approach to teaching the course. Our goal was to explore having a greater degree of transparency in the TA application process with the hope of encouraging Khoury to do the same.
#### [Link to data model](https://drive.google.com/file/d/1Vnin7vfMZVQszR-2F3iTl46PKdlupQY1/view?usp=sharing)
#### Description of user data model: 
Our platform has two primary user groups: students and professors. The professors are responsible for sections, and students can submit applications for specific courses. Both users have all the fields expected for users, from their names to emails to dates of birth.
#### Description of the two domain object data models: 
One domain object data model worth mentioning is an application. Students can submit applications to apply to be a TA for a given course, including the semester for which they're applying and a URL pointing to the student's resume. Each application has an associated status representing where the application stands in the process, whether reviewed, assigned, rejected, etc. Another domain object data model is a course, including a title and code as well as a description of the course content.
#### Description of the user to domain object relationship: 
Students are related to applications in that they can CRUD their applications. Students can submit applications to apply to be a TA for a given course, including the semester for which they're applying and a URL pointing to the student's resume. 
#### Description of the domain object to domain object relationship: 
Applications are related to courses in that each application is for a given course, and each course has many applications. 
#### Description of the portable enumeration(s): 
The enumeration is a status for applications. Each application has an associated status representing where the application stands in the process, whether reviewed, assigned, rejected, etc.
#### Description of user interface requirements: 
Each of our domain object models and user models have a user interface screen, accessible from the home page, in which all of the entries from the corresponding table are listed. On this screen, there is an add button which takes the user to an interface where they can add an entry to the table. Each entry in the list of all entries can be clicked to take the user to a screen where they can edit the fields of that entry. This screen has buttons to go back, apply any changes made, or delete the entry. If an item has a relationship with other items, links to all related items are present in the edit screen for that item.