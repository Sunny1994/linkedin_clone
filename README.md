# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

The first login page looks like the below. You can give in your details and also upload a display picture for which I imported
{getStorage, ref, uploadBytesResumable, getDownloadURL} packages from "firebase/storage"

![image](https://github.com/Sunny1994/linkedin_clone/assets/33688792/971b1525-d14c-4003-8d54-def3d5d35e55)

After you login, it'll redirect to the homepage like below. It is not a completely dynamic page. The number of profile views
are hardcoded values for now.

The newsfeed is filled with statuses from all users. The user can write what they feel like on the text tab and press enter after which it
gets posted on the newsfeed. The The user can delete only his/her status not the other users' status. The user can like the status as well

The right side widget has the latest news and headlines which is being consumed from Google News API. 

You can logout when you click on your display picture on the top right side of the page

![image](https://github.com/Sunny1994/linkedin_clone/assets/33688792/3b23205a-e982-4a9b-8e1c-f587f26b0efd)



