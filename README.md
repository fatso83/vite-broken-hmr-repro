# Vite HMR regression

## EDIT: I found a solution for this issue. See below

## Original issue
HMR stopped working when we upgraded Vite from 2.5 to 2.8. 
After some bisecting I found that Vite 2.6.14 works fine
and every version from Vite 2.7.0-beta.0 and up does not.

This is the minimal reproducible test case I was able to come
up with after pruning everything away from our own app.

Seeing how few things are moving in this app, I suspect
it might have to do with how Vite and React works together
(Fast refresh plugin?)

### Repro
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

## Solution
By creating this repro I was able to see that if I forgot setting up `@vitejs/plugin-react-refresh`
the Vite 2.6 setup did not work either. Which reminded me that the plugin, not Vite core, 
is what is really making this HMR thing work! So I went to the [NPM site][npmsite] for that plugin
and saw nothing special, but I wanted to see the Changelog. Turns out that lead to a [404][404]!

That was a bit strange, so I went up the tree and ventured into `/packages` and found the
`plugin-react` package. In [its Changelog's Legacy section][changelog] it says this package

> Before @vitejs/plugin-react, there was @vitejs/plugin-react-refresh.

So the real solution was simply
```
npm remove @vitejs/plugin-react-refresh 
npm i @vitejs/plugin-react
sed -i.bak -e 's/plugin-react-refresh/plugin-react/' -e 's/reactRefresh/react/' vite.config.ts
```



[npmsite]: https://www.npmjs.com/package/@vitejs/plugin-react-refresh
[404]: https://github.com/vitejs/vite/tree/main/packages/plugin-react-refresh#readme
[changelog]: https://github.com/vitejs/vite/blob/main/packages/plugin-react/CHANGELOG.md#legacy
