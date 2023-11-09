# Frontend Mentor - Interactive rating component solution

This is a solution to the [Interactive rating component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-rating-component-koxpeBUmI). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Select and submit a number rating
- See the "Thank you" card state after submitting a rating

### Screenshot

| Desktop  | Mobile |
| ------------- | ------------- |
| <img width="600" alt="desktop rating page" src="https://github.com/gracepal/frontend-mentor/assets/131278381/936d32fc-fa0d-494e-8ecf-0ddeafa2dfe5"> | <img width="300" alt="mobile rating page" src="https://github.com/gracepal/frontend-mentor/assets/131278381/515b5302-d2a4-4675-a2af-a77e343c9b64"> |
| <img width="600" alt="desktop thanks page" src="https://github.com/gracepal/frontend-mentor/assets/131278381/c65d82f9-81cd-4c88-9d4d-793510b75512"> | <img width="300" alt="mobile thanks page" src="https://github.com/gracepal/frontend-mentor/assets/131278381/5f5e793b-754a-4d07-ae35-2376ba8b526a"> |

- Rating Page:
  - On hover rating element, rating background to orange
  - On click rating element, rating background to grey
  - On click  another rating element, background color states to toggle
  - note: currently does not have UNDO/Clear selection feature -> only updates when new one is selected
  - On click submit button inverts background and font colors orange and white
  - On click submit button with no rating selection, does nothing and reverts to pre-inverted colors
  - On click submit button with rating selected, changes background to grey, hides current card and displays thanks card and saves selected rating to global variable

- Thanks Page:
  - Reads in selected rating and displays in pill element

### Links

- Solution URL: https://github.com/gracepal/frontend-mentor/tree/main/4-interactive-rating-component
- Live Site URL: https://vermillion-manatee-58c03d.netlify.app/
