# :beer: Brewy
Keep track and collect data for your brews. [Add more description]

---

## Pages

| Pages                 | Status                | Description |
| --------------------- | :-------------------: | ----------- | 
| `/`                   | :soon:                | Home page, feed of popular and new brews, if logged in display your latest brews |
| `/login`              | :white_check_mark:    | Login form page |
| `/register`           | :white_check_mark:    | Register form page |
| `/user/:userId`       | :x:                   | User profile, show edit buttons for fields if user is logged in and own the user|
| `/brew`               | :soon:                | Start new brew here |
| `/brew/:brewId`       | :x:                   | Show brew and all its data, show edit button for fields if user is logged in and own brew |

## Components

| Components            | Status                | Description |
| --------------------- | :-------------------: | ----------- | 
| `BrewFeed`            | :x:                   | Shows feed of brews, different queries/results depending on what props is pushed in |
| `BrewSlider`          | :x:                   | Shows a slider of brews, similar to BrewFeed, but horizontal scroll |
| `BrewPreview`         | :x:                   | Preview of brew, this is used in BrewFeed & BrewSlider |
| `CreateBrew`          | :soon:                | Form for creating new brew |
| `Header`              | :white_check_mark:    | Just a header |
| `Footer`              | :x:                   | Just a footer |

---

## Todo
| Status    | Description |
| :-------: | ----------- | 
| :x:       | Add error messages for validation error
| :x:       | Add user profile and link it in header when logged in
| :x:       | Add password reset

---

## Improvments
| Status    | Description |
| :-------: | ----------- | 
| :x:       | Extend token lifetime
| :x:       | Create logo & identity, make a theme of it
| :x:       | Router transitions for more fluid ux

---

## Contribute
You are very welcome to contribute to the project. Follow these steps to install for development.

#### Installation
- Clone this project from git, in terminal run `git clone https://github.com/martinlundin/brewy-firebase.git`
- In package.json add your url to proxy

[Todo make comprehensive insallation guide]