# Vite HMR regression

HMR stopped working when we upgraded Vite from 2.5 to 2.8. 
After some bisecting I found that Vite 2.6.14 works fine
and every version from Vite 2.7.0-beta.0 and up does not.

This is the minimal reproducible test case I was able to come
up with after pruning everything away from our own app.

Seeing how few things are moving in this app, I suspect
it might have to do with how Vite and React works together
(Fast refresh plugin?)

## Repro
```
npm i
npx vite
open localhost:3000

# change the line with "title" in AppHeaderLoggedIn.tsx and observe a full reload happening

# kill vite 

npm i vite@2.6

open localhost:3000

# change the line with "title" in AppHeaderLoggedIn.tsx and observe no reload happening
# hmr is working!
```
