# AliExpress Wishlist Cleaner

This repository contains two JavaScript scripts designed to help clean up your AliExpress wishlist by removing unavailable items.

## Scripts

### 1. WishlistItemRemover.js

This script automatically deletes unavailable items from your AliExpress wishlist.

**Features:**
- Scrolls through the wishlist to find unavailable items
- Deletes up to 10 unavailable items
- Handles confirmation dialogs
- Provides console logging for progress tracking

**How to use:**
1. Open your AliExpress wishlist page
2. Open your browser's developer console (usually F12 or Ctrl+Shift+I)
3. Copy the entire contents of `WishlistItemRemover.js`
4. Paste the code into the console and press Enter to execute

### 2. WishlistEditItemRemover.js

This script selects unavailable items in your AliExpress wishlist while in edit mode, allowing for bulk deletion.

**Features:**
- Scrolls through the wishlist to find unavailable items
- Selects up to 10 unavailable items
- Automatically enters edit mode
- Provides console logging for progress tracking

**How to use:**
1. Open your AliExpress wishlist page
2. Open your browser's developer console (usually F12 or Ctrl+Shift+I)
3. Copy the entire contents of `WishlistEditItemRemover.js`
4. Paste the code into the console and press Enter to execute
5. After the script finishes, manually click the "Delete" button to remove the selected items

## Notes

- These scripts are designed to work with the AliExpress wishlist page structure as of the time of writing. If AliExpress changes their page layout, the scripts may need to be updated.
- Use these scripts at your own risk.
- The scripts include delays to avoid overloading the server. Please be patient while they run.
- You can modify the `MAX_ITEMS_TO_DELETE` (in WishlistItemRemover.js) or `MAX_ITEMS_TO_SELECT` (in WishlistEditItemRemover.js) constants to process more items at once. However, be cautious when increasing these values, as it may lead to increased server load or potential blocking of your account if you perform too many actions too quickly.

## Contributing

Feel free to submit issues or pull requests if you have suggestions for improvements or encounter any problems with the scripts.

## License

This project is open source and available under the [MIT License](LICENSE).
