/// <reference types="Cypress" />

import React from "react";
import { mount } from "@cypress/react";
import { useDelayedShow } from "../hooks/useDelayedShow";

// wrap the useDelayedShow hook
function HookConsumer() {
  const { visible, show, hide, toggle } = useDelayedShow();

  return (
    <>
      <p>Visible: {visible.toString()}</p>
      <button onClick={show}>Show</button>
      <button onClick={hide}>Hide</button>
      <button onClick={toggle}>Toggle</button>
    </>
  );
}

// skipped because the hook must be updated by adding `toggle` before running the tests
describe.skip("useDelayedShow", () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(300, 300);
  });

  it("Should set `visible` to `true` after a delay", () => {
    // ------------------------------------------
    // Arrange
    mount(<HookConsumer />);

    // ------------------------------------------
    // Act
    cy.contains("Toggle").click();
    // Assert
    cy.contains("Visible: false").should("be.visible");

    // ------------------------------------------
    // Act
    cy.clock().tick(300);
    // Assert
    cy.contains("Visible: true").should("be.visible");
  });

  it("Should set `visible` to `true` after a delay, then set `visible` to `false` immediately", () => {
    // ------------------------------------------
    // Arrange
    mount(<HookConsumer />);
    cy.clock();

    // ------------------------------------------
    // Act
    cy.contains("Toggle").click();
    // Assert
    cy.contains("Visible: false").should("be.visible");
    cy.tick(300);
    cy.contains("Visible: true").should("be.visible");

    // ------------------------------------------
    // Act
    cy.contains("Toggle").click();
    // Assert
    // `visible` must become `false` immediately!
    cy.contains("Visible: false", { timeout: 0 }).should("be.visible");

    // ------------------------------------------
    // Act
    cy.tick(10000);
    // Assert
    // `visible` must not return to `true` because of uncleared timeouts
    cy.contains("Visible: false").should("be.visible");
  });
});
