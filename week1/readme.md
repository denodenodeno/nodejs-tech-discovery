Week 1 / Welcome to the asynchronous world
========


### Read:
* [Event loop - core concept described](http://bytearcher.com/articles/event-loop-10-000ft/)
* [Parallel vs. concurrent](http://bytearcher.com/articles/parallel-vs-concurrent/)
* [I/O vs CPU bound](http://bytearcher.com/articles/io-vs-cpu-bound/)

or

* [Asynchrony in depth](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20&%20performance/ch1.md)

### Watch:
* [Learn Node.js (Level 1)](https://www.youtube.com/watch?v=GJmFG4ffJZU) (10 min)
* [Philip Roberts: What the heck is the event loop anyway? | JSConf EU 2014](https://www.youtube.com/watch?v=8aGhZQkoFbQ) (26 min)
	
### Try out:
* For awareness (checkout the [EventLoop Demo](http://gitlab.mentormate.bg/all-js/node-js-tech-discovery/blob/master/week1/00-The-EventLoop/event-loop-demo.js))
  - Track the event loop in the code. Describe the sequence of operations.
  - Which lines of this code are synchronous? Are the blocking the program?
  - What is 'process' in Node.js? Checkout the [documentation](https://nodejs.org/api/process.html) and take a note which other methods could be useful for you. 
  
So far we've learned that Node.js is mainly about communication over the network. 
But what about the communication between us? Is it secure enough?
### Let the hacking begin...

Source code: [01-Secrets/](http://gitlab.mentormate.bg/plamen.stoev/node-js-tech-discovery/blob/master/week1/01-Secrets/)

### Tasks of choice:
1. #### Easy:
   - Encrypt / decrypt all files from a given directory (at once), not only single files
   
   ###### tip: use the EventLoop demo [code](http://gitlab.mentormate.bg/all-js/node-js-tech-discovery/blob/master/week1/00-The-EventLoop/event-loop-demo.js)
2. #### Golden:
   - Transform the synchronous-written code to work asynchronous & ensure it’s non-blocking.
   - Add more encryption algorithms to your code and let the user to select which one to use (read it as argument from the terminal)

3. #### Advanced:
   - Validate arguments softly. Don't exit the program when a not-valid data is given. 
   Prompt the user to enter a new file name, select mode from a list of choices or whatever. Continue the program when all agruments are valid.
 
4. #### Expert \*
   - Learn what pgp key is, generate one for yourself, share your public key with your friends
   - Encrypt the message with your pgp key
   
   ###### tip: use [openpgpjs](https://github.com/openpgpjs/openpgpjs) module via npm
   - Send the encrypted message by email
   
   ###### tip: use [nodemailer](https://github.com/andris9/Nodemailer) module via npm

\* It's not that hard - you can do this, but it's time-consuming