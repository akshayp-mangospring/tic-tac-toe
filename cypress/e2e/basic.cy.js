import { getHomePageLink } from '../data_utils';

describe('My First Test', () => {
  const env = 'local';
  const homePageLink = getHomePageLink(env);

  it('Visits the home page of the App', () => {
    cy.visit(homePageLink);
  });
});
