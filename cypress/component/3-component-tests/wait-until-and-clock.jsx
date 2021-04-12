/// <reference types="Cypress" />
/// <reference types="cypress-wait-until" />

import React from "react";
import { mount } from "@cypress/react";
import { VirtualList } from "../VirtualList/VirtualList";

// The item renderer to be passed to the list
const RenderItem = ({ item }) => {
  // the colors are helpful to easily distinguish the rows
  const backgroundColor = parseInt(item.id.toString()) % 2 ? "#DDD" : "#EEE";

  return (
    <div
      style={{
        height: "30px",
        backgroundColor,
        fontSize: 15,
        fontFamily: "arial",
      }}
    >
      {item.name}
    </div>
  );
};

describe("VirtualList", () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(300, 300);
  });

  it("Should render only the visible items", () => {
    // ------------------------------------------
    // Arrange

    // creating the data
    const itemHeight = 30;
    const listHeight = 90; // must be `itemHeight` multiplied by the number of visible items
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
      { id: 4, name: "Item 4" },
      { id: 5, name: "Item 5" },
      { id: 6, name: "Item 6" },
      { id: 7, name: "Item 7" },
      { id: 8, name: "Item 8" },
      { id: 9, name: "Item 9" },
      { id: 10, name: "Item 10" },
      { id: 11, name: "Item 11" },
      { id: 12, name: "Item 12" },
      { id: 13, name: "Item 13" },
      { id: 14, name: "Item 14" },
      { id: 15, name: "Item 15" },
      { id: 16, name: "Item 16" },
      { id: 17, name: "Item 17" },
      { id: 18, name: "Item 18" },
      { id: 19, name: "Item 19" },
      { id: 20, name: "Item 20" },
    ];

    // mounting the component
    mount(
      <VirtualList
        items={items}
        getItemHeights={() => itemHeight}
        RenderItem={RenderItem}
        listHeight={listHeight}
      />
    );

    // ------------------------------------------
    // Act
    // scroll the list
    cy.findAllByTestId("VirtualList").first().trigger("wheel", {
      deltaX: 0,
      deltaY: 200,
    });

    // wait until the handle stopped
    let previousTop = 0;
    cy.get(".scrollbar-thumb-y").waitUntil(($handle) => {
      const currentTop = $handle.position().top;

      // the handle hasn't moved yet
      if (currentTop <= 0) return false;

      const difference = currentTop - previousTop;
      previousTop = currentTop;

      // ends when the handle stops
      return difference === 0;
    });

    // ------------------------------------------
    // Assert
    cy.findByText("Item 6").should("not.exist");
    cy.findByText("Item 7").should("be.visible");
    cy.findByText("Item 8").should("be.visible");
    cy.findByText("Item 9").should("be.visible");
    cy.findByText("Item 10").should("be.visible");
    cy.findByText("Item 11").should("not.exist");
  });

  it("Playground: Control che browser clock to avoid the waiting", () => {
    // ------------------------------------------
    // Arrange

    // creating the data
    const itemHeight = 30;
    const listHeight = 90; // must be `itemHeight` multiplied by the number of visible items
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
      { id: 4, name: "Item 4" },
      { id: 5, name: "Item 5" },
      { id: 6, name: "Item 6" },
      { id: 7, name: "Item 7" },
      { id: 8, name: "Item 8" },
      { id: 9, name: "Item 9" },
      { id: 10, name: "Item 10" },
      { id: 11, name: "Item 11" },
      { id: 12, name: "Item 12" },
      { id: 13, name: "Item 13" },
      { id: 14, name: "Item 14" },
      { id: 15, name: "Item 15" },
      { id: 16, name: "Item 16" },
      { id: 17, name: "Item 17" },
      { id: 18, name: "Item 18" },
      { id: 19, name: "Item 19" },
      { id: 20, name: "Item 20" },
    ];

    // mounting the component
    mount(
      <VirtualList
        items={items}
        getItemHeights={() => itemHeight}
        RenderItem={RenderItem}
        listHeight={listHeight}
      />
    );

    // ------------------------------------------
    // Act

    // control the clock
    cy.clock();

    cy.findAllByTestId("VirtualList").first().trigger("wheel", {
      deltaX: 0,
      deltaY: 200,
    });

    // tick the clock by a second
    cy.tick(1000)
      // restore the normal clock behavior
      .invoke("restore");

    // ------------------------------------------
    // Assert
    cy.findByText("Item 6").should("not.exist");
    cy.findByText("Item 7").should("be.visible");
    cy.findByText("Item 8").should("be.visible");
    cy.findByText("Item 9").should("be.visible");
    cy.findByText("Item 10").should("be.visible");
    cy.findByText("Item 11").should("not.exist");
  });
});
