// When popup loads
document.addEventListener('DOMContentLoaded', () => {
    checkDrupalVersion();
});

// Function to detect Drupal version
function checkDrupalVersion() {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        try {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                func: () => {
                    
                    // Method 1: Check meta generator tag
                    const metaTag = document.querySelector('meta[name="Generator"], meta[name="generator"]');
                    if (metaTag && metaTag.content.includes('Drupal')) {
                        const match = metaTag.content.match(/Drupal (\d+)/);
                        if (match) return { detected: true, version: match[1] };
                    }
                    
                    // Method 2: Look for Drupal-specific CSS classes or IDs
                    const drupalBodyClass = document.body.classList.contains('drupal');
                    if (drupalBodyClass) return { detected: true, version: 'Unknown' };
                    
                    // Not detected
                    return { detected: false };
                }
            }).then(results => {
                const result = results[0]?.result;
                if (result && result.detected) {
                    document.getElementById('version-display').textContent = 
                        result.version !== 'Unknown' ? 
                        `Drupal ${result.version}` : 
                        'Drupal (version unknown)';
                } else {
                    document.getElementById('version-display').textContent = 'Not a Drupal site';
                }
            }).catch(err => {
                document.getElementById('version-display').textContent = 'Cannot access page';
                console.error(err);
            });
        } catch (err) {
            document.getElementById('version-display').textContent = 'Error: ' + err.message;
            console.error(err);
        }
    });
}