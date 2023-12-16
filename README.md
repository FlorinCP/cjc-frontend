# cjc-frontend


In this project I wanted to create a web app whos purpose is to serve as a tool for lawyers in order to increase their
potential revenue.  
The app was deigned for romanian user -> therefore romanian language used in the demo  

Obviously there is a lot of work to be done even if the vast majority of the functionality is already implemented.  
My next goals are:
1. Better user experience. - the flow should be simplified
2. UI rework to ensure consistency
3. The schedule is not mobile responsive
4. Accessibility issues should be taken into account.
5. Using a web friendly format for pictures to improve LightHouse report
6. Context Menu for handling more efficiently the schedule.
7. Downloading the send files into a custom directory using the FILE API
8. Documenting each method using JS DOCs
9. Better State Management
10. Add internationalisation 
11. International Phone Number Input
12. Stripe integration 


The flow of the application goes like this :  
1. After visiting the landing page where the user will find out details about the  
 services that are being provided by the lawyer they are given proper explanation about the whole process
 they can leave a question through a form which is meant to give the lawyer a small insight about their potential client problem.

"Login/Register"  

![img_13.png](src/demo/img_13.png) ![img_14.png](src/demo/img_14.png)

"Landing Page"
![img.png](src/demo/img.png)

"Add question Form"
![img_1.png](src/demo/img_1.png)
- the user can enter a title .
- the second field represents the question itself.
- the user has the option to add suggestive files that might help the lawyer better understand the situation.  


"Mobile View"  

![img_2.png](src/demo/img_2.png)

2. After leaving a question the lawyer might choose whether to accept it or not, depending on its expertise .

"Lawyer View of the questions"
![img_5.png](src/demo/img_5.png)

As you can see the view is composed of a sidebar in which the lawyer can choose between Waiting Questions,  
Accepted Questions, Rejected Questions and Working Cases.  
A question might be accepted or not, if accepted the user is notified and the next step is to choose a time to hold a videocall  
with the lawyer.  

When Choosing whether the question should be accepted or not, the lawyer can see the sent files in order to gain a better  
perspective about the case itself.
![img_4.png](src/demo/img_4.png)


By clicking on the buttons the question will be accepted or rejected.
![img_6.png](src/demo/img_6.png)


3. In case of an accepted question the user will have the option to choose when to make an appointment

"This is a proof of concept about what the user should see, it looks pretty ugly"
![img_7.png](src/demo/img_7.png)

"In case of an appointment being made the lawyer can see a full schedule of their clients appointments"
![img_8.png](src/demo/img_8.png)

@TODO Create Context Menu for marking a time slot as free or not :  
![img_9.png](src/demo/img_9.png)

4. The consultation itself is supposed to be taking place on the designated VideoCall component:

"Web view of VideoCall"
![img_10.png](src/demo/img_10.png)

"Mobile View"  
![img_11.png](src/demo/img_11.png)
![img_12.png](src/demo/img_12.png)





