import { getHomePageLink } from '../data_utils';

describe('Tic Tac Toe basics', () => {
  const env = Cypress.env('testEnv');
  const homePageLink = getHomePageLink(env);

  beforeEach(() => {
    cy.visit(homePageLink);
  });

  const clicksForGameTied = () => {
    cy.get('.cell').eq(0).click();
    cy.get('.cell').eq(1).click();
    cy.get('.cell').eq(3).click();
    cy.get('.cell').eq(4).click();
    cy.get('.cell').eq(7).click();
    cy.get('.cell').eq(6).click();
    cy.get('.cell').eq(2).click();
    cy.get('.cell').eq(8).click();
    cy.get('.cell').eq(5).click();
  };

  const checkOverlayVisible = () => {
    cy.get('#success-pop').then(($overlay) => {
      $overlay.is('visible');
    });
  };

  it('Visits the home page of the App', () => {
  });

  it('Checks if the game board is visible', () => {
    cy.get('#game-board').then(($board) => $board.is('visible'));
  });

  it('Checks if all elements on the board are clickable', () => {
    clicksForGameTied();
  });

  it('Checks if the game finished overlay is visible', () => {
    clicksForGameTied();

    checkOverlayVisible();
  });

  it('Checks if the Game Ties', () => {
    clicksForGameTied();

    checkOverlayVisible();
    cy.contains('It\'s a tie! Play again!!');
  });

  it('Checks if Blue wins the game', () => {
    for (let i = 0; i < 7; i += 1) {
      cy.get('.cell').eq(i).click();
    }

    checkOverlayVisible();
    cy.contains('Blue has Won the Game!');
  });

  it('Checks if Pink wins the game', () => {
    cy.get('.cell').eq(1).click();
    cy.get('.cell').eq(0).click();
    cy.get('.cell').eq(3).click();
    cy.get('.cell').eq(4).click();
    cy.get('.cell').eq(2).click();
    cy.get('.cell').eq(8).click();

    checkOverlayVisible();
    cy.contains('Pink has Won the Game!');
  });
});
