# File Compare

This project was created to showcase skills in react among other technologies. To get started I wanted to say that I took a few liberties with the look and feel of it adding a little styling so as we are not looking at a blank white page. I did not try my best at making it look like a real product but the buttons are pretty cool.

## Run Project

### `npm start`

This will install all dependencies and run the dev server concurrently with the web server. I didn't see much value in setting up any further build steps.

## Stack:

### `React`

I used React for this project because I have been using it for a few years on my own projects, its where the vast majority of companies who are hiring are using and it just made sense in general as you also use it in your stack.

### `SCSS`

Although there is very light styling associated with this project, I still wanted to use a technology that I would normally use.

### `Node/Express`

I hardly think that a super thin web server with a single route qualifies as backend work, however I guess it does illustrate that I know how the tech works.

### `Jest/Enzyme`

Honestly(just trying to be as candid with you all as I can be) I don't have a ton of experience writing tests as we started using React professionally a few months ago at my current job. However, I learned a lot about it in this project. Its one of the things that I hope to gain working with your organization: a deeper understanding of the testing strategies involved with this stack. Tests are located near each module/component.

## Architecture

### `Api`

I set up an api endpoint that would take a csv document in string format.

#### `- logic`

pre-process the csv file and normalize the columns into something that can be mutually readable and comparable on the dom level

### `DOM`

#### `- logic`

I figured if this ever scaled out to be useable with larger files, I would want to do as much pre-processing as possible and thats why I take advantage of the time it takes a user to upload a document and send off a request and receive a response quickly of a pre-processed file. Same pattern for the second upload. The response would contain an object with the csv columns grouped by email so as to aid in the comparing layer in the DOM. I abstracted the business logic of the functional react components out to an es6 module for testing purposes. 1) Now the functions can be tested for their input and 2) it ensures that I am making pure functions. values go in, value comes out. Or callback is invoked. (kinda stretching the bounds of that pure function definition here hehe).

## Bonus

There is a bonus feature that I added. You can not only view your results, but you can also download them in csv format grouped by the offending email. Feel free to try it out and let me know what you think. I put a fair bit of work into this whole thing and want to know what you think either way, good or bad. Cheers!
