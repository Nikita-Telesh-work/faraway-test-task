## Task

Using the [Star Wars API](https://swapi.dev/) as a data source, implement a React and Typescript SPA application consisting of two pages.
On the main page, display a list or cards of characters, add the ability to paginate and search using the API to the list.
Implement a page with detailed information on the selected character. On this page add the ability to edit and save information about a character locally, without sending it to the server.

Pros:
+ Neat layout
+ Using a UI framework (Material, Ant, Bootstrap, etc.)
  
As an additional task:
+ Tests

## Getting started

Installing dependencies, note that required Node version >=20.11.1 (npm >=10.2.4)

```bash
npm install
```

The project is built on the Next.js framework, so you can easily work with it locally by running development server:

```bash
npm run dev
```

OR you can build production version:

```bash
npm run build
```

And start it locally:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

OR you can check out the production build deployed to Vercel [test-task-swapi](https://test-task-swapi.vercel.app/)

## Implementation

#### Architecture

Project is built on the [Next.js](https://nextjs.org/docs) framework and powered by [FSD](https://feature-sliced.design/docs/get-started/overview).
For such small projects, `FSD` is not required. Moreover, it forces you to spend more time thinking about the architecture,
requires knowledge from each team member, and its advantages are revealed only after a long time in the life of the project.
But I haven’t worked in production with this architecture before and have been looking for a reason to work with it for some time,
so this is a deliberate decision for entertainment purposes ;)

#### UI

[Material UI](https://mui.com/material-ui/getting-started/) was chosen as the UI framework to speed up the work and make the layout consistent. This was also a requirement for the task and judging by the vacancy,
the team uses [Emotion](https://emotion.sh/docs/introduction), so the `Material UI` fits perfectly here

#### Tests

When testing the front, I adhere to the concept that first of all it is necessary to test from the user’s point of view, so for these I chose [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) in
conjunction with [MSW](https://mswjs.io/) for convenient interception of API requests. When testing, I adhered to the idea that we take a component with its logic (included in its hook)
as a module. We carry out separate testing of hooks only for shared hooks

#### Forms

For convenient work with forms, I chose [Formik](https://formik.org/docs/overview), there are no special features, I just like working with it 🙂

#### Additional libraries

[Lodash](https://lodash.com/docs/4.17.15) and [react-use](https://github.com/streamich/react-use) were also used in the project. They were added just for the sake of a couple of functions that would not be  difficult to implement yourself.
But these libraries are well supported, popular and provide other useful functions, so I didn’t see much point in reinventing my wheels and decided to use them

#### No store

From the very beginning of the project, it was decided that the global store (for example `Redux`) would be added only if it was really needed. As can be seen from the code base, the need for it never appeared
