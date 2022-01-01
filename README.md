This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the sign in page.

- Open [http://localhost:3000/send-page?address={address}](http://localhost:3000/send-page?address={address}) to the send page where you can send jobcoins, see your balance, and see your transaction history

Run tests with:

```bash
npm run test
# or
yarn test
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## About this project

This project was built to be totally server side rendered (SSR). It uses:

- [Next.js with create-next-app](https://nextjs.org/docs/api-reference/create-next-app) for really quick bootstrapper for a NextJs project. Using NextJS of course to make the app server side rendered.
- [Nivo](https://nivo.rocks/line/) for the line chart, it can be SSRed
- [ky universal](https://github.com/sindresorhus/ky-universal) for requests as it can be used in Node environments, and therefore can be SSRed
- [Material UI](https://mui.com/getting-started/usage/) for some off the shelf battle-tested foundational componentry
- [Self hosted fonts](https://www.npmjs.com/package/@fontsource/roboto) for the faster paint render times than if it had been CDNed
- [normalize.css](https://necolas.github.io/normalize.css/) to get rid of the styling wonkiness between browsers
- [Emotion](https://emotion.sh/docs/introduction) as the CSS-in-JS solution since you folks use it and I never had before.
- [prettier](https://prettier.io/docs/en/install.html) because that plus fixing on save is a huge productivity boost

For testing, I'm using:

- [react testing library](https://testing-library.com/docs/react-testing-library/intro/) as the unit testing library
- [jest](https://jestjs.io/) as the test runner

I wish I'd:

- Just used [react-hook-form](https://react-hook-form.com/) for the form state logic. Form state is always trickier than you think it'll be
- Used more of the layout helpers in Material UI. I could have sped up development more if I'd leaned into that
- Had time to build a custom tooltip in the Nivo ResponsiveLine chart. The data points are not useable near the edges of the screen
- Added pagination to the line chart so that addresses with a higher number of transactions don't get squished
- Added [cypress](https://docs.cypress.io/guides/getting-started/installing-cypress) for functional testing in the app, in a perfect world.
- Picked a different library for handling the API the requests. I feel like the way I used it with the post endpoint is an anti-pattern with the library. It has hooks that let you do things on completion of the request for mutations, but it was really hard to make that reusable for the services I made. Maybe I could have found a better way to make more logic reusable for elsewhere, but it was tricky. Maybe another fetch library could have worked better.
