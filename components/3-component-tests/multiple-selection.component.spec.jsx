/// <reference types="Cypress" />

import React from "react";
import { mount } from "@cypress/react";
import { VirtualList } from "../VirtualList/VirtualList";

const RenderItem = ({ item, selected, onClick }) => {
  const even = parseInt(item.id.toString()) % 2;

  // the colors are helpful to easily distinguish the rows
  const backgroundColor = selected
    ? even
      ? "#0357d8"
      : "#007AFF"
    : even
    ? "#DDD"
    : "#EEE";

  return (
    <div
      style={{
        height: "30px",
        backgroundColor,
        fontSize: 15,
        fontFamily: "arial",
      }} // the item must call the onClick callback to get the selection work
      onClick={(event) => {
        onClick({ item, event });
      }}
    >
      {item.name}
    </div>
  );
};

// wrap the VirtualList to internally manage the selection, passing outside only the new selection
function SelectableList(props) {
  const { onSelect, ...virtualListProps } = props;

  // store the selection in an internal state
  const [selectedItems, setSelectedItems] = React.useState([]);
  const handleSelect = React.useCallback(
    ({ newSelectedIds }) => {
      setSelectedItems(newSelectedIds);
      // call the passed spy to notify the test about the new selected ids
      onSelect(newSelectedIds);
    },
    [setSelectedItems, onSelect]
  );

  // Transparently renders the VirtualList, apart from:
  // - storing the selection
  // - passing the new selection back to the test
  return (
    <VirtualList
      selectedItemIds={selectedItems}
      onSelect={handleSelect}
      // VirtualList props passed from the test
      {...virtualListProps}
    />
  );
}

describe("VirtualList wrapper", () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(300, 300);
  });

  it("The additive selection should work", () => {
    // ------------------------------------------
    // Arrange

    // creating the data
    const itemHeight = 30;
    const listHeight = 90;
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
    ];

    // mounting the component
    mount(
      <SelectableList
        // test-specific props
        onSelect={cy.spy().as("onSelect")}
        // VirtualList props
        items={items}
        getItemHeights={() => itemHeight}
        RenderItem={RenderItem}
        listHeight={listHeight}
      />
    );

    // ------------------------------------------
    // click on the first item
    // Act
    cy.findByText("Item 1")
      .click()
      // Assert
      .get("@onSelect")
      .should((spy) => {
        expect(spy).to.have.been.calledOnce;
        expect(spy).to.have.been.calledWith([1]);
      });

    // ------------------------------------------
    // click on the second item
    // Act
    // keep the meta button  pressed
    cy.get("body").type("{meta}", { release: false });

    cy.findByText("Item 2")
      .click()
      // Assert
      .get("@onSelect")
      .should((spy) => {
        expect(spy).to.have.been.calledTwice;
        expect(spy).to.have.been.calledWith([1, 2]);
      });

    // release the meta button
    cy.get("body").type("{meta}", { release: true });
  });

  it("Playground: The subtractive selection should work", () => {
    // ------------------------------------------
    // Arrange

    // creating the data
    const itemHeight = 30;
    const listHeight = 90;
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
    ];

    // mounting the component
    mount(
      <SelectableList
        // test-specific props
        onSelect={cy.spy().as("onSelect")}
        // VirtualList props
        items={items}
        getItemHeights={() => itemHeight}
        RenderItem={RenderItem}
        listHeight={listHeight}
      />
    );

    // ------------------------------------------
    // click on the first item
    // Act
    cy.findByText("Item 1")
      .click()
      // Assert
      .get("@onSelect")
      .should((spy) => {
        expect(spy).to.have.been.calledOnce;
        expect(spy).to.have.been.calledWith([1]);
      });

    // ------------------------------------------
    // click on the second item
    // Act
    // keep the alt button  pressed
    cy.get("body").type("{alt}", { release: false });

    cy.findByText("Item 1")
      .click()
      // Assert
      .get("@onSelect")
      .should((spy) => {
        expect(spy).to.have.been.calledTwice;
        expect(spy).to.have.been.calledWith([]);
      });

    // release the alt button
    cy.get("body").type("{alt}", { release: true });
  });

  it("Playground: The range selection should work", () => {
    // ------------------------------------------
    // Arrange

    // creating the data
    const itemHeight = 30;
    const listHeight = 90;
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
    ];

    // mounting the component
    mount(
      <SelectableList
        // test-specific props
        onSelect={cy.spy().as("onSelect")}
        // VirtualList props
        items={items}
        getItemHeights={() => itemHeight}
        RenderItem={RenderItem}
        listHeight={listHeight}
      />
    );

    // ------------------------------------------
    // click on the first item
    // Act
    cy.findByText("Item 1")
      .click()
      // Assert
      .get("@onSelect")
      .should((spy) => {
        expect(spy).to.have.been.calledOnce;
        expect(spy).to.have.been.calledWith([1]);
      });

    // ------------------------------------------
    // click on the second item
    // Act
    // keep the shift button  pressed
    cy.get("body").type("{shift}", { release: false });

    cy.findByText("Item 3")
      .click()
      // Assert
      .get("@onSelect")
      .should((spy) => {
        expect(spy).to.have.been.calledTwice;
        expect(spy).to.have.been.calledWith([1, 2, 3]);
      });

    // release the shift button
    cy.get("body").type("{shift}", { release: true });
  });
});
