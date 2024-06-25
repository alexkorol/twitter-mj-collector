(function() {
    // Utility functions
    function sanitizeText(text) {
        return text.replace(/[\n\r]+/g, ' ').trim();
    }

    function extractSrefData(tweet) {
        const tweetText = sanitizeText(tweet.querySelector('[data-testid="tweetText"]').textContent);
        const authorElement = tweet.querySelector('[data-testid="User-Name"]');
        const displayName = sanitizeText(authorElement.querySelector('span').textContent);
        const username = sanitizeText(authorElement.querySelectorAll('span')[1].textContent);
        
        // Capture both single srefs and weighted blends
        const srefMatch = tweetText.match(/--sref\s+([\d\s:]+)/);
        if (!srefMatch) return null;
        
        const sref = srefMatch[1].trim();
        let description = tweetText.split('--sref')[0].trim();
        description = description.length > 100 ? description.substring(0, 100) + '...' : description;
        
        const tweetUrl = 'https://twitter.com' + tweet.querySelector('a[href*="/status/"]').getAttribute('href');
        
        const imageElement = tweet.querySelector('img[alt="Image"]');
        const imageUrl = imageElement ? imageElement.src : '';
        
        return { displayName, username, sref, description    }

    function scrapeSrefs() {
        const tweets = document.querySelectorAll('[data-testid="tweet"]');
        const srefData = [];
        
        tweets.forEach(tweet => {
            const data = extractSrefData(tweet);
            if (        });
        
        return srefData;
    }

    function formatAsCSV(data) {
        const header = "Display Name,Username,Sref,Description,Tweet URL,Image URL\n";
        const rows = data.map(item => 
            `"${item.displayName}","${item.username}","${item.sref}","        ).join('\n');
        return header + rows;
    }

    // Variables and UI functions
    let isRecording = false;
    let allSrefData = [];
    let uiContainer;

    function create        uiContainer = document.createElement('div');
        uiContainer.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background-color: white;
            border: 1px solid black;
            padding: 10px;
            z-index: 9999;
        `;
                const recordButton = document.createElement('button');
        recordButton.textContent = 'Start Recording';
        recordButton.onclick = toggleRecording;
        
        const stopButton = document.createElement('button');
        stopButton.textContent = 'Stop & Save';
        stopButton.onclick = stopAndSave;
        
        const countDisplay        countDisplay.id = 'srefCount';
        countDisplay.textContent = 'Srefs captured: 0';
        
        uiContainer.appendChild(recordButton);
        uiContainer.appendChild(stopButton);
        uiContainer.appendChild(countDisplay);
        document.body.appendChild(uiContainer);
    }

    function toggleRecording() {        isRecording = !isRecording;
        const recordButton = uiContainer.querySelector('button');
        recordButton.textContent = isRecording ? 'Pause Recording' : 'Resume Recording';
        if (isRecording) {
            runScraper();
        }
    }
    function stopAndSave() {
        isRecording = false;
        const csv = formatAsCSV(allSrefData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 's        link.click();
        allSrefData = [];
        updateSrefCount();
    }

    function updateSrefCount() {
        const countDisplay = document.getElementById('srefCount');
        countDisplay.textContent = `Srefs captured: ${allSrefData.length}`;
    }

    // Main scraper function
    function runScraper() {        if (!isRecording) return;
        
        const newSrefData = scrapeSrefs();
        const newUniqueSrefs = newSrefData.filter(newItem => 
            !allSrefData.some(existingItem => existingItem.sref        );
        
        allSrefData = [...allSrefData, ...newUniqueSrefs];
        updateSrefCount();
        
        setTimeout(runScraper, 5000); // Run every 5 seconds while recording
    }

    // Initialize the script
    function init() {
        createUI();
        // Run the scraper when scrolling stops
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!isRecording) return;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(runScraper, 1000); // Run        });

        console.log("Twitter Sref Scraper initialized. UI is now visible.");
    }

    // Run the initialization
    init();
})();
