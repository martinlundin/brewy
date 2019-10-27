# :beers: Brewy
Making several brews simuntantiously can get messy and confusing very quick. **Keep orginized with Brewy**. We help you keep track and collect data for your brews.

Create your brew recepies and see what others are doing. Set rating on the brews and, eventually you might see some patterns of what works well and what does not.

---

## Pages

| Pages                 | Status                | Description |
| --------------------- | :-------------------: | ----------- | 
| `/`                   | :soon:                | Home page, feed of popular and new brews, if logged in display your latest brews |
| `/login`              | :white_check_mark:    | Login with phone number |
| `/profile`            | :soon:    | Edit current user profile |
| `/user/:userId`       | :x:                   | User profile, show edit buttons for fields if user is logged in and own the user|
| `/brewery`            | :soon:                | Welcome to the brewery, start a new brew or pick up where you left on the previous |
| `/brewery/:brewId`    | :soon:                | Edit page of specific brew |
| `/brew/:brewId`       | :x:                   | Show brew and all its data, show edit button for fields if user is logged in and own the brew |

## Components

| Components            | Status                | Description |
| --------------------- | :-------------------: | ----------- | 
| `BrewFeed`            | :x:                   | Shows feed of brews, different queries/results depending on what props is pushed in |
| `BrewSlider`          | :x:                   | Shows a slider of brews, similar to BrewFeed, but horizontal scroll |
| `BrewTile`            | :soon:                | Preview of brew, this is used in BrewFeed & BrewSlider |
| `StartBrew`           | :soon:                | Form for starting a new brew |
| `BrewProcesses`       | :soon:                | Form for modifying processes on a brew |
| `ProcessIngredients`  | :soon:                | Form for modifying ingredients on a process |
| `Header`              | :white_check_mark:    | Just a header |
| `Footer`              | :x:                   | Just a footer |

---

## Todo
| Status    | Description |
| :-------: | ----------- | 
| :x:       | Add public user page
| :x:       | Add brewery
| :x:       | Enforce firestore schema to ensure valid data is added/changed 

---

## Improvments
| Status    | Description |
| :-------: | ----------- | 
| :x:       | Router transitions for more fluid ux

---

## Contribute
You are very welcome to contribute to the project. Follow these steps to install for development.

#### Installation
- Clone this project from git, in terminal run `git clone https://github.com/martinlundin/brewy-firebase.git`

[Todo make comprehensive insallation guide]