# Twitter Sref Scraper

## Description

Twitter Sref Scraper is a browser-based tool designed to collect Midjourney style references (srefs) from Twitter/X. It's particularly useful for artists, designers, and AI enthusiasts who want to catalog and analyze style references used in Midjourney prompts.

## What it does

This script:
1. Adds a user interface to your Twitter feed for controlling the scraping process.
2. Automatically extracts sref codes, associated descriptions, and image URLs from tweets.
3. Handles both single srefs and weighted blends (e.g., "--sref 123456" and "--sref 123456:3 789012").
4. Saves the collected data in a CSV format for easy analysis and use in other tools.

## How to use

1. Open Twitter and navigate to a search or feed containing Midjourney sref posts.
2. Open your browser's developer tools (usually F12 or Ctrl+Shift+I).
3. Copy the entire script and paste it into the console.
4. Press Enter to run the script.
5. A small UI will appear in the top-right corner of your Twitter page.
6. Click "Start Recording" to begin collecting srefs as you scroll through tweets.
7. Click "Stop & Save" to download the collected data as a CSV file.

## Installation

This script runs directly in your browser and doesn't require installation. However, you'll need:

1. A modern web browser (Chrome, Firefox, or Safari recommended)
2. Access to the browser's developer console

Dependencies:
- No external libraries are required. The script uses vanilla JavaScript and runs in the browser environment.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/yourusername/twitter-sref-scraper/issues) if you want to contribute.

## Disclaimer

This tool is for educational and research purposes only. Be sure to comply with Twitter's terms of service and respect copyright and privacy when using collected data.
