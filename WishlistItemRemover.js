(function() {
  const MAX_ITEMS_TO_DELETE = 10;
  const ITEM_CONTAINER_CLASS = '.AllListItem--alllistItemContainer--3BpNMAE';
  const PRODUCT_NAME_CLASS = '.AllListItem--productNameText--3aZEYzK';
  const INVALID_TEXT_CLASS = '.AllListItem--invalidText--35SAIma';

  // Function to pause execution
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Function to trigger delete action and handle confirmation
  async function triggerDeleteWithConfirmation(deleteButton) {
    // Trigger the delete button click
    deleteButton.childNodes[0].childNodes[0].click();
    // Wait for the alert to appear
    await sleep(500);
    // Find and click the confirmation button
    const confirmButton = Array.from(document.querySelectorAll('.comet-modal button')).find(
      button => button.textContent.trim() === 'Delete'
    );

    if (confirmButton) {
      confirmButton.click();
      return true;
    }

    return false;
  }

  // Function to delete an item
  async function deleteItem(item) {
    const listItem = item.closest(ITEM_CONTAINER_CLASS);
    if (!listItem) {
      console.log("Couldn't find the list item container.");
      return false;
    }

    // Extract the item name
    const nameElement = listItem.querySelector(PRODUCT_NAME_CLASS);
    const itemName = nameElement ? nameElement.textContent.trim() : 'Unknown item';

    const buttonsContainer = listItem.nextElementSibling;
    if (!buttonsContainer) {
      console.log(`Couldn't find buttons container for: "${itemName}".`);
      return false;
    }

    const deleteButton = Array.from(buttonsContainer.querySelectorAll('button')).find(
      button => button.textContent.trim() === 'Delete'
    );
    if (!deleteButton) {
      console.log(`Couldn't find delete button for: "${itemName}".`);
      return false;
    }

    const success = await triggerDeleteWithConfirmation(deleteButton);
    if (success) {
      console.log(`Deleted: "${itemName}".`);
      await sleep(1000);
      return true;
    } else {
      console.log(`Failed deletion for: "${itemName}".`);
      return false;
    }
  }

  // Function to find the first unavailable item
  function findFirstUnavailableItem() {
    return document.querySelector(INVALID_TEXT_CLASS);
  }

  // Function to scroll until an unavailable item is found or end of page is reached
  async function scrollUntilUnavailableItemFound() {
    let unavailableItem = findFirstUnavailableItem();
    while (!unavailableItem) {
      const previousHeight = document.body.scrollHeight;
      window.scrollTo(0, document.body.scrollHeight);
      await sleep(1000); // Wait for for content to load
      if (document.body.scrollHeight === previousHeight) {
        // We've reached the end of the page
        return null;
      }
      unavailableItem = findFirstUnavailableItem();
    }
    return unavailableItem;
  }

  // Delete unavailable items
  async function deleteUnavailableItems() {
    let deletedCount = 0;
    let failedAttempts = 0;
    const MAX_FAILED_ATTEMPTS = 3;

    while (deletedCount < MAX_ITEMS_TO_DELETE && failedAttempts < MAX_FAILED_ATTEMPTS) {
      const unavailableItem = await scrollUntilUnavailableItemFound();
      if (!unavailableItem) {
        console.log("No more unavailable items found.");
        break;
      }

      const success = await deleteItem(unavailableItem);
      if (success) {
        deletedCount++;
        failedAttempts = 0;
        console.log(`Deleted ${deletedCount}/${MAX_ITEMS_TO_DELETE} items.`);
      } else {
        failedAttempts++;
        console.log(`Failed attempt ${failedAttempts}/${MAX_FAILED_ATTEMPTS}.`);
      }
    }

    if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
      console.log(`Stopped after ${MAX_FAILED_ATTEMPTS} consecutive failed attempts.`);
    }

    console.log(`Finished. Deleted ${deletedCount} unavailable item(s).`);
  }

  // Run the deletion process
  deleteUnavailableItems();
})();
