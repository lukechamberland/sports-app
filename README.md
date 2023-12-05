# Hot-take sports application

This is my first post-graduation passion project, A sports community application where users can 
sign up/login and share popular/unpopular opinions on certain sports related topics.  Anything from NBA GOAT debates, NFL MVP opinions or any other take a user may want to share, can do so on this website.  

## The app itself

As previously mentioned, this app allows any opinion/take to be shared and allows for full conversations among users.  The app begins with a basic login/signup system, where the users first name, last name, email, password and username will be safely stored in the projects database. The user is then brought to the home page, where they can view a wide array of takes, listed by most popular to least popular.  Users of course can then click on any post, and view the full take, and corresponding replies.  For the take itself, users can like, unlike and even vote on a take, depending on how much they agree.  Below the post are the corresponging replies, where users can then click on the comment icon and view the full reply. Then users can leave another reply to any level of a nested reply.  The header at the top of every page past the login/signup consists of a profile page which allows users to edit any profile details, a home page which navigates users to the home page, a search bar which searches through every post to find the best match for the users input, an addition icon which allows users to post a take themselves, a heart icon which allows them to view the takes they've liked, and a bars icon which shows them their own takes, their own replies and an option to logout.  

## Stack

This application was built entirely through React and Express, with a basic SQL database for data management.  The idea of this project was to build as much of it from scratch as possible, and accordingly, it doesn't use many other frameworks or external libraries such as MaterialUI or AuthO. The total stack list is:

- React.js
- Express.js
- SQL
- FontAwesome library

## Limitations

This app does currently have some limitations.  All these limitations will be fixed in the future.

- Votes are final and cannot be undone (changed or deleted)
- Replies can not be deleted, only posts can be deleted
- Only the first level of nested replies can be liked, which are displayed directly below each post
- This app is currently not formatted correctly for phones, to avoid any display issues it's best to view it full screen on a computer

## Running the app

This application can be seen at: [](https://www.youtube.com/watch?v=jZ8nPkWRjFw)

If you prefer the traditional route and wan't to run this application only on your system, you can follow these steps:

1. Clone this repository
2. Open 2 terminal windows
3. Cd one of your windows into react-front-end and run `npm install`
4. In the same directory run `npm start`
5. In your other directory cd into express-back-end run `npm install`
6. In the same directory run `npm start`
7. Visit this app in your browser at localhost:3000

## Contact

- Email: `luke.chamberland@shaw.ca`
- Discord: `Luke23#6561`

If you have any questions/concerns or feedback for my app please contact me!