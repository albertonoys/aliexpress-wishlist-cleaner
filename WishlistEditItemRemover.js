(function () {
	const MAX_ITEMS_TO_SELECT = 10;
	const ITEM_CONTAINER_CLASS = ".AllItemsPage--listItemContainer--1iA48ky";
	const PRODUCT_NAME_CLASS = ".AllListItem--productNameText--3aZEYzK";
	const INVALID_TEXT_CLASS = ".AllListItem--invalidText--35SAIma";
	const CHECKBOX_SELECTOR = '.comet-checkbox input[type="checkbox"]';
	const FOOTER_BUTTON_CLASS = ".AllItemsPage--footerButton--358555";
	const RIGHT_CONTAINER_CLASS = ".NavBar--rightContainer--2z3E4as";

	// Function to pause execution
	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	// Function to select an item's checkbox
	async function selectItem(item) {
		const listItem = item.closest(ITEM_CONTAINER_CLASS);
		if (!listItem) {
			console.log("Couldn't find the list item container.");
			return false;
		}

		// Extract the item name
		const nameElement = listItem.querySelector(PRODUCT_NAME_CLASS);
		const itemName = nameElement
			? nameElement.textContent.trim()
			: "Unknown item";
		const checkbox = listItem.querySelector(CHECKBOX_SELECTOR);
		if (!checkbox) {
			console.log(`Couldn't find checkbox for: "${itemName}".`);
			return false;
		}

		if (!checkbox.checked) {
			checkbox.click();
			console.log(`Selected: "${itemName}".`);
			await sleep(500);
			return true;
		} else {
			console.log(`Item already selected: "${itemName}".`);
			return false;
		}
	}

	// Function to find all unavailable items
	function findUnavailableItems() {
		return document.querySelectorAll(INVALID_TEXT_CLASS);
	}

	// Function to scroll until 10 unavailable items are found or end of page is reached
	async function scrollUntilEnoughItemsFound() {
		let unavailableItems = findUnavailableItems();
		while (unavailableItems.length < MAX_ITEMS_TO_SELECT) {
			const previousHeight = document.body.scrollHeight;
			window.scrollTo(0, document.body.scrollHeight);
			await sleep(1000); // Wait for content to load
			if (document.body.scrollHeight === previousHeight) {
				// We've reached the end of the page
				break;
			}
			unavailableItems = findUnavailableItems();
		}
		return Array.from(unavailableItems).slice(0, MAX_ITEMS_TO_SELECT);
	}

	// Function to click the Edit button
	async function clickEditButton() {
		const rightContainer = document.querySelector(RIGHT_CONTAINER_CLASS);
		if (!rightContainer) {
			console.log("Couldn't find the right container.");
			return false;
		}

		rightContainer.click();
		console.log("Clicked the Edit button.");
    await sleep(1000);
		return true;
	}

	// Select unavailable items
	async function selectUnavailableItems() {
		console.log("Scrolling to find unavailable items...");
		const itemsToSelect = await scrollUntilEnoughItemsFound();
		console.log(
				`Found ${itemsToSelect.length} unavailable item(s). Starting selection...`
			);


    await clickEditButton();

		let selectedCount = 0;

		for (const item of itemsToSelect) {
			const success = await selectItem(item);
			if (success) {
				selectedCount++;
				console.log(`Selected ${selectedCount}/${itemsToSelect.length} items.`);
			}
			await sleep(500); // Short delay between selections
		}

		console.log(`Finished. Selected ${selectedCount} unavailable item(s).`);
	}

	// Run the selection process
	selectUnavailableItems();
})();
