/// <reference types="Cypress" />

import { mountHook } from "@cypress/react";
import { useDelayedShow } from "../hooks/useDelayedShow";

// wrap the useDelayedShow hook
describe("useDelayedShow", () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(300, 300);
  });

  it("Should set `visible` to `true` after a delay", () => {
    cy.clock();

    // ------------------------------------------
    // Arrange
    mountHook(() => useDelayedShow()).then((hook) => {
      // ------------------------------------------
      // Act
      hook.current.show();
      // Assert
      // `visible` must not become `true` immediately!
      expect(hook.current.visible).to.eq(false);

      // ------------------------------------------
      // Act
      cy.tick(300);
      // Assert
      cy.wrap(hook).its("current.visible").should("eq", true);
    });
  });

  it("Should set `visible` to `true` after a delay, then set `visible` to `false` immediately", () => {
    cy.clock();

    // ------------------------------------------
    // Arrange
    mountHook(() => useDelayedShow()).then((hook) => {
      // ------------------------------------------
      // Act
      hook.current.show();
      // Assert
      expect(hook.current.visible).to.eq(false);

      // ------------------------------------------
      // Act
      cy.tick(300);
      // Assert
      cy.wrap(hook).its("current.visible").should("eq", true);

      cy.then(() => {
        // ------------------------------------------
        // Act
        hook.current.hide();
        // Assert
        // `visible` must be set to `false` immediately
        expect(hook.current.visible).to.eq(false);

        // ------------------------------------------
        // Act
        cy.tick(10000);
        // Assert
        // `visible` must not return to `true` because of uncleared timeouts
        cy.wrap(hook).its("current.visible").should("eq", false);
      });
    });
  });
});
