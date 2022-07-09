import { getHomePageLink } from '../data_utils';

describe('Pink Win Combinations', () => {
  const env = Cypress.env('testEnv');
  const homePageLink = getHomePageLink(env);
  const checkOverlayVisible = () => {
    cy.get('#success-pop').then(($overlay) => {
      $overlay.is('visible');
    });
    cy.contains('Pink has Won the Game!');
  };

  beforeEach(() => {
    cy.visit(homePageLink);
  });

  afterEach(() => {
    checkOverlayVisible();
  });

  it('Checks horizontal combinations', () => {
    cy.get('.cell').eq(3).click();
    cy.get('.cell').eq(0).click();
    cy.get('.cell').eq(4).click();
    cy.get('.cell').eq(1).click();
    cy.get('.cell').eq(6).click();
    cy.get('.cell').eq(2).click();
  });

  it('Checks horizontal combinations', () => {
    cy.get('.cell').eq(0).click();
    cy.get('.cell').eq(3).click();
    cy.get('.cell').eq(1).click();
    cy.get('.cell').eq(4).click();
    cy.get('.cell').eq(6).click();
    cy.get('.cell').eq(5).click();
  });

  it('Checks horizontal combinations', () => {
    cy.get('.cell').eq(3).click();
    cy.get('.cell').eq(6).click();
    cy.get('.cell').eq(4).click();
    cy.get('.cell').eq(7).click();
    cy.get('.cell').eq(0).click();
    cy.get('.cell').eq(8).click();
  });

  it('Checks vertical combinations', () => {
    cy.get('.cell').eq(1).click();
    cy.get('.cell').eq(0).click();
    cy.get('.cell').eq(4).click();
    cy.get('.cell').eq(3).click();
    cy.get('.cell').eq(2).click();
    cy.get('.cell').eq(6).click();
  });

  it('Checks vertical combinations', () => {
    cy.get('.cell').eq(0).click();
    cy.get('.cell').eq(1).click();
    cy.get('.cell').eq(3).click();
    cy.get('.cell').eq(4).click();
    cy.get('.cell').eq(2).click();
    cy.get('.cell').eq(7).click();
  });

  it('Checks vertical combinations', () => {
    cy.get('.cell').eq(1).click();
    cy.get('.cell').eq(2).click();
    cy.get('.cell').eq(4).click();
    cy.get('.cell').eq(5).click();
    cy.get('.cell').eq(0).click();
    cy.get('.cell').eq(8).click();
  });

  it('Checks clockwise diagonal combinations', () => {
    cy.get('.cell').eq(1).click();
    cy.get('.cell').eq(2).click();
    cy.get('.cell').eq(0).click();
    cy.get('.cell').eq(4).click();
    cy.get('.cell').eq(3).click();
    cy.get('.cell').eq(6).click();
  });

  it('Checks anticlockwise diagonal combinations', () => {
    cy.get('.cell').eq(1).click();
    cy.get('.cell').eq(0).click();
    cy.get('.cell').eq(2).click();
    cy.get('.cell').eq(4).click();
    cy.get('.cell').eq(5).click();
    cy.get('.cell').eq(8).click();
  });
});
