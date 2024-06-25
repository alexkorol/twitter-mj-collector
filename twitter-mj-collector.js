// Part 1: Utility Functions
function initUtilityFunctions() {
    window.twitterSrefScraper = window.twitterSrefScraper || {};
    const tss = window.twitterSrefScraper;

    tss.sanitizeText = function(text) {
        return text.replace(/[\n\r]+/g, ' ').trim();
    };

    tss.extractSrefData = function(tweet) {
        const tweetText = tss.sanitizeText(tweet.querySelector('[data-testid="tweetText"]').textContent);
        const authorElement = tweet.querySelector('[data-testid="User-Name"]');
        const displayName = tss.sanitizeText(authorElement.querySelector('span').textContent);
        const username = tss.sanitizeText(authorElement.querySelectorAll('span')[1].textContent);
        
        const srefMatch = tweetText.match(/--sref\s+([\d\s:]+)/);
        if (!srefMatch) return null;
        
        const sref = srefMatch[1].trim();
        let description = tweetText.split('--sref')[0].trim();
        description = description.length > 100 ? description.substring(0, 100) + '...' : description;
        
        const tweetUrl = 'https://twitter.com' + tweet.querySelector('a[href*="/status/"]').getAttribute('href');
        
        const imageElement = tweet.querySelector('img[alt="Image"]');
        const imageUrl = imageElement ? imageElement.src : '';
        
        return { displayName, username, sref, description, tweetUrl, imageUrl };
    };

    tss.scrapeSrefs = function() {
        const tweets = document.querySelectorAll('[data-testid="tweet"]');
        const srefData = [];
        
        tweets.forEach(tweet => {
            const data = tss.extractSrefData(tweet);
            if (data) srefData.push(data);
        });
        
        return srefData;
    };

    tss.formatAsCSV = function(data) {
        const header = "Display Name,Username,Sref,Description,Tweet URL,Image URL\n";
        const rows = data.map(item => 
            `"${item.displayName}","${item.username}","${item.sref}","${item.description}","${item.tweetUrl}","${item.imageUrl}"`
        ).join('\n');
        return header + rows;
    };

    console.log("Utility functions initialized.");
}

// Part 2: UI Functions
function initUIFunctions() {
    const tss = window.twitterSrefScraper;
    tss.isRecording = false;
    tss.allSrefData = [];

    tss.createUI = function() {
        tss.uiContainer = document.createElement('div');
        tss.uiContainer.style.cssText = `
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
        recordButton.onclick = tss.toggleRecording;
        
        const stopButton = document.createElement('button');
        stopButton.textContent = 'Stop & Save';
        stopButton.onclick = tss.stopAndSave;
        
        const countDisplay = document.createElement('div');
        countDisplay.id = 'srefCount';
        countDisplay.textContent = 'Srefs captured: 0';
        
        tss.uiContainer.appendChild(recordButton);
        tss.uiContainer.appendChild(stopButton);
        tss.uiContainer.appendChild(countDisplay);
        document.body.appendChild(tss.uiContainer);
    };

    tss.toggleRecording = function() {
        tss.isRecording = !tss.isRecording;
        const recordButton = tss.uiContainer.querySelector('button');
        recordButton.textContent = tss.isRecording ? 'Pause Recording' : 'Resume Recording';
        if (tss.isRecording) {
            tss.runScraper();
        }
    };

    tss.stopAndSave = function() {
        tss.isRecording = false;
        const csv = tss.formatAsCSV(tss.allSrefData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sref_data.csv');
        link.click();
        tss.allSrefData = [];
        tss.updateSrefCount();
    };

    tss.updateSrefCount = function() {
        const countDisplay = document.getElementById('srefCount');
        countDisplay.textContent = `Srefs captured: ${tss.allSrefData.length}`;
    };

    console.log("UI functions initialized.");
}

// Part 3: Main Scraper Function
function initMainScraper() {
    const tss = window.twitterSrefScraper;

    tss.runScraper = function() {
        if (!tss.isRecording) return;
        
        const newSrefData = tss.scrapeSrefs();
        const newUniqueSrefs = newSrefData.filter(newItem => 
            !tss.allSrefData.some(existingItem => existingItem.sref === newItem.sref)
        );
        
        tss.allSrefData = [...tss.allSrefData, ...newUniqueSrefs];
        tss.updateSrefCount();
        
        setTimeout(tss.runScraper, 5000); // Run every 5 seconds while recording
    };

    console.log("Main scraper function initialized.");
}

// Part 4: Initialization
function initTwitterSrefScraper() {
    const tss = window.twitterSrefScraper;
    tss.createUI();

    // Run the scraper when scrolling stops
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!tss.isRecording) return;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(tss.runScraper, 1000); // Run 1 second after scrolling stops
    });

    console.log("Twitter Sref Scraper initialized. UI is now visible.");
}

// Execute each part
initUtilityFunctions();
initUIFunctions();
initMainScraper();
initTwitterSrefScraper();

console.log("All parts of Twitter Sref Scraper have been initialized.");
