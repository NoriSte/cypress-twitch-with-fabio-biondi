# Twitch with Fabio Biondi

## Description

This is the [reference repository](https://github.com/NoriSte/cypress-twitch-with-fabio-biondi) with all the contents and the examples of the Twitch episode with Fabio Biondi.

We are going to walk through
- a [basic E2E test](./cypress/integration/exercises/1-e2e-tests/signup.e2e.spec.js) for the signup flow
- an [optimized version of the previous test](./cypress/integration/exercises/1-e2e-tests/custom-command.e2e.spec.js)
- a [basic UI Integration Test](./cypress/integration/exercises/2-ui-integration-tests/signup.integration-spec.js) (an E2E test without a working server) test for the signup flow
- some basic [Unit tests on a React component](./components/3-component-tests/basic.component.spec.jsx)
- some basic [Unit tests on a React hook](./components/4-hook-tests/toggle.hook.spec.jsx)

## Environment

Requirements
- Git 2.29
- Node.js 14
- NPM 6.14

## Getting ready to play with the exercises

Check out with the following guide.

- Installing everything listed in the [Environment](#environment) section
- Launching `$ npm install`
- Launching `$ npm run test:smoke`

The steps above launch the back-end and application, the front-end application, and Cypress. If you see something like

```bash
      Spec                           Tests  Passing  Failing  Pending  Skipped
┌─────────────────────────────────────────────────────────────────────────────┐
│ ✔  realworld/smoke.spec.js  00:01     1        1        -        -        - │
└─────────────────────────────────────────────────────────────────────────────┘
  ✔  All specs passed!        00:01     1        1        -        -        -
```
you're ready!


## During the exercises

The most important scripts are:
- `$ npm run cy:open`: starts the Cypress UI
- `$ npm run realworld:frontend:start`: starts only the front-end project

## About me

<img src="https://avatars.githubusercontent.com/u/173663" alt="Stefano Magni" style="max-width: 40%;"/>


I'm Stefano Magni, I'm a passionate and positive-minded **Senior Front-end Engineer**, a Speaker, and an Instructor from Italy (working remotely since 2018). Developing User Interfaces, solving problems, and helping people are my passions.

I have worked in this field for more than ten years, including experience with different codebases (currently working on a 250K-LOC one) and various companies: a mid-size company, a Bitcoin startup, a web-agency, etc. organized through Scrum, Kanban, or classic Waterfall.

What I love:
- working with passionate people
- coding User Interfaces, solving the closest to the user problems
- writing maintainable and easy to refactor code
- guaranteeing the highest possible quality of my work with precise execution and problems prevention
- easing other developers and stakeholders work with high proactivity, communication, providing a lot of feedback, mentoring, and improving workflows
- actively looking for and proposing solutions for every kind of problem I see
- learning and solidifying/spreading my knowledge by speaking and teaching

In the last years, I became a speaker again, revamping my learning path completely, including answering on StackOverflow, writing articles, sharing plugins, and speaking at meetups.

I'm currently focused on React, TypeScript and all their ecosystems.

I wrote a big [UI Testing Best Practices](https://github.com/NoriSte/ui-testing-best-practices) project on GitHub.

[GitHub](https://github.com/NoriSte) - [LinkedIn](https://www.linkedin.com/in/noriste/) - [Twitter](https://twitter.com/NoriSte)




<!--
## Resources

### Cypress Docs

- [E2E testing Best Practices](https://docs.cypress.io)
### Articles

- Stefano Magni: [Test the request and response payloads](https://github.com/NoriSte/ui-testing-best-practices/blob/master/sections/server-communication-testing/test-request-and-response-payload.md)
- Kent C. Dodds: [Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests/)
- Stefano Magni: [Component vs (UI) Integration vs E2E tests](https://dev.to/noriste/component-vs-ui-integration-vs-e2e-tests-3i0d)
- Stefano Magni: [Await, do not make your E2E tests sleep](https://dev.to/noriste/await-do-not-make-your-e2e-tests-sleep-4g1o)
- Kent C. Dodds: [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)
- Kent C. Dodds: [Avoid Nesting when you're Testing](https://kentcdodds.com/blog/avoid-nesting-when-youre-testing)
- Stefano Magni: [Front-end productivity boost: Cypress as your main development browser](https://dev.to/noriste/front-end-productivity-boost-cypress-as-your-main-development-browser-5cdk)
- Gil Tayar: [Testing Your Frontend Code: Part V (Visual Testing)](https://medium.com/@giltayar/testing-your-frontend-code-part-v-visual-testing-935864cfb5c7)
- Kent C. Dodds: [How to know what to test](https://kentcdodds.com/blog/how-to-know-what-to-test)
- Gil Tayar (talk): [Writing Tests For CSS Is Possible! Don’t Believe The Rumors](https://www.youtube.com/watch?v=Dl_XMd_1F6E)
- Kent C. Dodds: [Common Testing Mistakes](https://kentcdodds.com/blog/common-testing-mistakes)
- Kent C. Dodds: [React is an implementation detail](https://kentcdodds.com/blog/react-is-an-implementation-detail)
- Stefano Magni: [The concept of "Monitoring Tests"](https://dev.to/noriste/the-concept-of-monitoring-tests-4l5j)
- Nivedita Sood: [Storyshots a powerful side of Storybook to Visual Test React Components](https://medium.com/@nivedita.sood/storyshots-a-powerful-side-of-storybook-to-visual-test-react-components-1cf994084d65)
- Josh McClure: [How to test for accessibility with Cypress](https://www.deque.com/blog/how-to-test-for-accessibility-with-cypress/)
- Steve Sanderson: [Selective Unit Testing – Costs and Benefits](http://blog.stevensanderson.com/2009/11/04/selective-unit-testing-costs-and-benefits/)
- Filip Hric: [Improve your custom command logs in Cypress](https://filiphric.com/improve-your-custom-command-logs-in-cypress)
- Gleb Bahmutov: [12 Recipes for testing React applications using cypress-react-unit-test](https://dev.to/bahmutov/12-recipes-for-testing-react-applications-using-cypress-react-unit-test-46g6#component-cleans-up-on-unmount)
- J. B. Rainsberger: [Integrated Tests Are A Scam](https://www.youtube.com/watch?v=VDfX44fZoMc)


### Additional courses

- Kent C. Dodds: [Testing JevaScript](https://testingjavascript.com/)
- Egghead.io: [Test Production Ready Apps with Cypress](https://egghead.io/courses/test-production-ready-apps-with-cypress)

### Extensive resources

- [Cypress documentation](https://docs.cypress.io/guides/overview/why-cypress.html)
- Toast UI: [Pragmatic Front-End Testing Strategies](https://medium.com/@toastui/pragmatic-front-end-testing-strategies-1-4a969ab09453)
- Yoni Goldberg: [JavaScript & Node.js Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- Yoni Goldberg: [JavaScript Testing A-Z](https://github.com/goldbergyoni/javascript-testing-a-to-z) (still in private mode at the time of writing)
- Stefano Magni: [UI Testing Best Practices](https://github.com/NoriSte/ui-testing-best-practices) -->
